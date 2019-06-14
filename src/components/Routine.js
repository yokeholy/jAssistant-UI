import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import API from "../services/api";

class Routine extends React.Component {
    state = {
        routineList: [],
        newRoutineName: ""
    };

    componentDidMount () {
        this.getRoutineList();
    }

    getRoutineList = () => {
        API.get("/routine/getRoutineList")
            .then(response => {
                this.setState({
                    // Sort by the Routine Status, put finished ones at the bottom
                    routineList: response.data.data.routineList.sort((a, b) => {
                        let modifier = 1;
                        if (a.routineCheckedIn < b.routineCheckedIn) return -1 * modifier;
                        if (a.routineCheckedIn > b.routineCheckedIn) return 1 * modifier;
                        return 0;
                    })
                });
            });
    }

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
        API.post("/routine/checkInRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is done today!`);
                this.getRoutineList();
            });
    }

    createRoutine = e => {
        e.preventDefault();
        API.post("/routine/createRoutine", { newRoutine: this.state.newRoutineName })
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
        API.post("/routine/updateRoutine", {
            routineId: routineItem.routineId,
            routineName: routineItem.routineName
        })
            .then(() => {
                toast.success(`${routineItem.routineName} is updated.`);
                this.getRoutineList();
            });
    }

    deleteRoutine = routineItem => {
        API.post("/routine/deleteRoutine", { routineId: routineItem.routineId })
            .then(() => {
                toast.success(`${routineItem.routineName} is deleted.`);
                this.getRoutineList();
            });
    }

    render () {
        const routineList = this.state.routineList.length
            ? this.state.routineList.map(routineItem =>
                <tr key={ routineItem.routineId }>
                    <td>
                        { !routineItem.routineCheckedIn
                            ? <i className="fas fa-circle clickable" onClick={ () => this.checkInRoutine(routineItem) }></i>
                            : <i className="fas fa-check-circle text-success"></i>
                        }
                    </td>
                    { !routineItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(routineItem) } className={ this.props.hideEverything ? "hidingElement" : "" }>{ routineItem.routineName }</td>
                        : <td className={ this.props.hideEverything ? "hidingElement" : "" }>
                            <input type="text"
                                className="form-control"
                                defaultValue={ routineItem.routineName }
                                onBlur={ e => this.updateRoutine(e, routineItem) } />
                        </td>
                    }
                    <td className={this.props.hideEverything ? "hidingElement" : ""}>{ routineItem.routineConsecutive } { routineItem.routineConsecutive !== 1 ? "days" : "day" }</td>
                    <td className="text-right">
                        <button className="btn btn-danger btn-sm" onClick={ () => this.deleteRoutine(routineItem) }>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            )
            : <tr>
                <td colSpan="4" className="bg-info">You have not set up any routines yet.</td>
            </tr>;

        return (
            <section id="routines" className="col-12 col-lg-4">
                <h3>Routines ({ this.state.routineList.filter(routine => !routine.routineCheckedIn).length })</h3>
                <p className="text-muted">Things that repeat but essential.</p>
                <form onSubmit={ this.createRoutine }>
                    <div className="input-group">
                        <input type="text"
                            className="form-control"
                            value={ this.state.newRoutineName }
                            onChange={ this.updateNewRoutineName } />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" disabled={ !this.state.newRoutineName }>
                                <i className="fas fa-plus"></i> Create
                            </button>
                        </div>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Routine</th>
                            <th>Consecutive</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { routineList }
                    </tbody>
                </table>
            </section>
        );
    }
}

Routine.propTypes = {
    hideEverything: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Routine);
