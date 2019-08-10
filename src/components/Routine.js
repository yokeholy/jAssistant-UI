/* global window: true */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import API from "../services/api";
import RoutineConfig from "./RoutineConfig";
import Comment from "./Comment";
import EditInput from "./fragments/EditInput";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";

class Routine extends React.Component {
    state = {
        timerLapse: 0,
        routineList: [],
        newRoutineName: "",
        sortingItem: "routineCheckedIn",
        sortingDescending: true
    };

    _startTimer = () => {
        this.setState({ timerLapse: this.state.timerLapse + 1 });
    };

    _parseCountdown = seconds => {
        if (seconds !== 0) {
            // Don't apply countdown to routines that never has been checked in
            seconds = seconds - this.state.timerLapse;
        }
        momentDurationFormat(moment);
        if (seconds === 0) {
            return null;
        } else if (seconds < 0) {
            return <span className="text-danger">Past due</span>;
        } else if (seconds < 86400) {
            return <span className="text-danger">Due in { moment.duration(seconds, "seconds").format("hh:mm:ss") }</span>;
        } else {
            return <span className="text-info">Due in { moment.duration(seconds, "seconds").humanize() }</span>;
        }
    };

    componentDidMount = () => {
        if (this.props.loginStatus) {
            this.getRoutineList();
            window.setInterval(this._startTimer, 1000);
        }
    };

    setSort = field => {
        if (field === this.state.sortingItem) {
            this.setState({
                sortingDescending: !this.state.sortingDescending
            });
        } else {
            this.setState({
                sortingItem: field
            });
        }
    };

    sortedRoutineList = () =>
        this.state.routineList.sort((a, b) => {
            if (a[this.state.sortingItem] < b[this.state.sortingItem]) {
                return this.state.sortingDescending ? -1 : 1;
            } else if (a[this.state.sortingItem] > b[this.state.sortingItem]) {
                return this.state.sortingDescending ? 1 : -1;
            } else {
                return 0;
            }
        });

    showHideComment = routineItem => {
        routineItem.showingComment = !routineItem.showingComment;
        this.forceUpdate();
    };

    showHideRoutineConfig = routineItem => {
        routineItem.showingRoutineConfig = !routineItem.showingRoutineConfig;
        this.forceUpdate();
    };

    getRoutineList = () =>
        API.get("/routine/getRoutineList")
            .then(response => {
                this.setState({
                    timerLapse: 0,
                    // Sort by the Routine Status, put finished ones at the bottom
                    routineList: response.routineList
                });
            });

    updateNewRoutineName = e =>
        this.setState({ newRoutineName: e.target.value });

    enterEditing = routineItem => {
        routineItem.editing = true;
        this.forceUpdate();
    };

    checkInRoutine = routineItem => {
        routineItem.routineCheckedIn = true;
        this.forceUpdate();
        return API.post("/routine/checkInRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is done today!`);
                this.getRoutineList();
            });
    };

    createRoutine = e => {
        e.preventDefault();
        return API.post("/routine/createRoutine", { newRoutine: this.state.newRoutineName })
            .then(() => {
                toast.success(`${this.state.newRoutineName} is created successfully.`);
                this.setState({newRoutineName: ""});
                this.getRoutineList();
            });
    };

    updateRoutine = (e, routineItem) => {
        routineItem.editing = false;
        routineItem.routineName = e.target.value;
        this.forceUpdate();
        return API.post("/routine/updateRoutine", {
            routineId: routineItem.routineId,
            routineName: routineItem.routineName
        })
            .then(() => {
                toast.success(`${routineItem.routineName} is updated.`);
                this.getRoutineList();
            });
    };

    deleteRoutine = routineItem =>
        API.post("/routine/deleteRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is deleted.`);
                this.getRoutineList();
            });

    updateCommentCount = (todoItem, increase) => {
        if (increase) {
            todoItem.commentCount += 1;
        } else {
            todoItem.commentCount -= 1;
        }
        this.forceUpdate();
    };

    render () {
        const routineList = this.state.routineList.length
            ? this.sortedRoutineList().map(routineItem =>
                [<tr key={ routineItem.routineId }>
                    <td>
                        { !routineItem.routineCheckedIn
                            ? <i className="fas fa-circle clickable" onClick={ () => this.checkInRoutine(routineItem) } />
                            : <i className="fas fa-check-circle text-success" />
                        }
                    </td>
                    { !routineItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(routineItem) }
                            className="hidingElement">
                            { routineItem.routineName }<br />
                            { this._parseCountdown(routineItem.nextDueDayCountdown) }
                        </td>
                        : <td className="hidingElement">
                            <EditInput defaultValue={ routineItem.routineName }
                                action={ e => this.updateRoutine(e, routineItem) } />
                        </td>
                    }
                    <td className="hidingElement">
                        { routineItem.nextDueDayCountdown !== 0
                            && routineItem.routineConsecutive }
                    </td>
                    <td className="text-right">
                        <ConfirmationButton buttonType="danger"
                            buttonIcon="fas fa-trash-alt"
                            buttonLabel=""
                            buttonSize="sm"
                            action={ () => this.deleteRoutine(routineItem) } />
                        <Button variant="secondary"
                            size="sm"
                            className="ml-2"
                            onClick={ () => this.showHideRoutineConfig(routineItem) }>
                            <i className="fas fa-cog" />
                        </Button>
                        <Button variant="secondary"
                            size="sm"
                            className="ml-2"
                            onClick={ () => this.showHideComment(routineItem) }>
                            <i className="far fa-comment" /> { routineItem.commentCount || "" }
                        </Button>
                    </td>
                </tr>,
                routineItem.showingRoutineConfig
                && <tr key={ `commentList_${routineItem.routineId}` }>
                    <td colSpan="4">
                        <RoutineConfig routine={ routineItem }
                            getRoutineList={ this.getRoutineList } />
                    </td>
                </tr>,
                routineItem.showingComment
                && <tr key={ `commentList_${routineItem.routineId}` }>
                    <td colSpan="4">
                        <Comment commentType={2}
                            entityId={ routineItem.routineId }
                            updateCommentCount={ increase => this.updateCommentCount(routineItem, increase) } />
                    </td>
                </tr>]
            )
            : <tr>
                <td colSpan="4" className="bg-info">You have not set up any routines yet.</td>
            </tr>;

        const sortingIndicator = field => {
            if (field === this.state.sortingItem) {
                return this.state.sortingDescending
                    ? <i className="fas fa-long-arrow-alt-up" />
                    : <i className="fas fa-long-arrow-alt-down" />;
            } else {
                return null;
            }
        };

        return (
            <div id="routine" className="row">
                <div className="col-12">
                    <h3>Routines ({ this.state.routineList.filter(routine => !routine.routineCheckedIn).length })</h3>
                    <p className="text-muted">Things that repeat but essential.</p>
                    <Form>
                        <InputGroup>
                            <Form.Control type="text"
                                className="hidingElement"
                                value={ this.state.newRoutineName }
                                onChange={ this.updateNewRoutineName } />
                            <InputGroup.Append>
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create"
                                    inProgressLabel="Creating"
                                    action={ this.createRoutine } />
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Table hover>
                        <thead>
                            <tr>
                                <th className="clickable" onClick={ () => this.setSort("routineCheckedIn") }>Done { sortingIndicator("routineCheckedIn") }</th>
                                <th className="clickable" onClick={ () => this.setSort("routineName") }>Routine { sortingIndicator("routineName") }</th>
                                <th className="clickable" onClick={ () => this.setSort("routineConsecutive") }>Consecutive { sortingIndicator("routineConsecutive") }</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            { routineList }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

Routine.propTypes = {
    dashboard: PropTypes.bool,
    loginStatus: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Routine);
