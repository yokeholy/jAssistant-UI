import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import API from "../services/api";
import Comment from "./Comment";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";

class Routine extends React.Component {
    state = {
        routineList: [],
        newRoutineName: "",
        sortingItem: "routineCheckedIn",
        sortingDescending: true
    };

    componentDidMount () {
        if (this.props.loginStatus) {
            this.getRoutineList();
        }
    }

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
    }

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
    }

    getRoutineList = () =>
        API.get("/routine/getRoutineList")
            .then(response => {
                this.setState({
                    // Sort by the Routine Status, put finished ones at the bottom
                    routineList: response.routineList
                });
            });

    updateNewRoutineName = e => {
        this.setState({ newRoutineName: e.target.value });
    }

    enterEditing = routineItem => {
        routineItem.editing = true;
        this.forceUpdate();
    }

    checkInRoutine = routineItem => {
        routineItem.routineCheckedIn = true;
        this.forceUpdate();
        return API.post("/routine/checkInRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is done today!`);
                this.getRoutineList();
            });
    }

    createRoutine = e => {
        e.preventDefault();
        return API.post("/routine/createRoutine", { newRoutine: this.state.newRoutineName })
            .then(() => {
                toast.success(`${this.state.newRoutineName} is created successfully.`);
                this.setState({newRoutineName: ""});
                this.getRoutineList();
            });
    }

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
    }

    deleteRoutine = routineItem =>
        API.post("/routine/deleteRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is deleted.`);
                this.getRoutineList();
            });

    render () {
        const routineList = this.state.routineList.length
            ? this.sortedRoutineList().map(routineItem =>
                [<tr key={ routineItem.routineId }>
                    <td>
                        { !routineItem.routineCheckedIn
                            ? <i className="fas fa-circle clickable" onClick={ () => this.checkInRoutine(routineItem) }></i>
                            : <i className="fas fa-check-circle text-success"></i>
                        }
                    </td>
                    { !routineItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(routineItem) } className="hidingElement">{ routineItem.routineName }</td>
                        : <td className="hidingElement">
                            <input type="text"
                                className="form-control"
                                defaultValue={ routineItem.routineName }
                                onBlur={ e => this.updateRoutine(e, routineItem) } />
                        </td>
                    }
                    <td className="hidingElement">{ routineItem.routineConsecutive } { routineItem.routineConsecutive !== 1 ? "days" : "day" }</td>
                    <td className="text-right">
                        <ConfirmationButton buttonType="danger"
                            buttonIcon="fas fa-trash-alt"
                            buttonLabel=""
                            buttonSize="sm"
                            action={ () => this.deleteRoutine(routineItem) }>
                        </ConfirmationButton>
                        <button className="btn btn-secondary btn-sm ml-2"
                            onClick={ () => this.showHideComment(routineItem) }>
                            <i className="far fa-comment"></i> { routineItem.commentCount || "" }
                        </button>
                    </td>
                </tr>,
                routineItem.showingComment
                && <tr key={ `commentList_${routineItem.routineId}` }>
                    <td colSpan="4">
                        <Comment commentType={2}
                            entityId={ routineItem.routineId }>
                        </Comment>
                    </td>
                </tr>]
            )
            : <tr>
                <td colSpan="4" className="bg-info">You have not set up any routines yet.</td>
            </tr>;

        const sortingIndicator = field => {
            if (field === this.state.sortingItem) {
                return this.state.sortingDescending
                    ? <i className="fas fa-long-arrow-alt-up"></i>
                    : <i className="fas fa-long-arrow-alt-down"></i>;
            } else {
                return null;
            }
        };

        return (
            <div id="routines" className="row">
                <div className="col-12">
                    <h3>Routines ({ this.state.routineList.filter(routine => !routine.routineCheckedIn).length })</h3>
                    <p className="text-muted">Things that repeat but essential.</p>
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control hidingElement"
                                value={ this.state.newRoutineName }
                                onChange={ this.updateNewRoutineName } />
                            <div className="input-group-append">
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create"
                                    inProgressLabel="Creating"
                                    action={ this.createRoutine }>
                                </StateButton>
                            </div>
                        </div>
                    </form>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="clickable" onClick={ () => this.setSort("routineCheckedIn") }>Done { sortingIndicator("routineCheckedIn") }</th>
                                <th className="clickable" onClick={ () => this.setSort("routineName") }>Routine { sortingIndicator("routineName") }</th>
                                <th className="clickable" onClick={ () => this.setSort("routineConsecutive") }>Consecutive { sortingIndicator("routineConsecutive") }</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { routineList }
                        </tbody>
                    </table>
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
