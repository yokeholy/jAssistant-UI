import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class SettingsTodoCategories extends React.Component {
    state = {
        newTodoCategoryName: ""
    }

    updateNewTodoCategoryName = e => {
        this.setState({ newTodoCategoryName: e.target.value });
    }

    createTodoCategory = () =>
        API.post("/settings/createTodoCategory", {
            todoCategoryName: this.state.newTodoCategoryName
        })
            .then(() => {
                toast.success(`${this.state.newTodoCategoryName} is created.`);
                this.setState({
                    newTodoCategoryName: ""
                });
            });

    render () {
        return (
            <div className="card mt-3">
                <div className="card-body">
                    <h4 className="card-title">Todo Categories</h4>
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                value={ this.state.newTodoCategoryName }
                                onChange={ this.updateNewTodoCategoryName } />
                            <div className="input-group-append">
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create"
                                    inProgressLabel="Creating"
                                    action={ this.createTodoCategory }>
                                </StateButton>
                            </div>
                        </div>
                    </form>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Todo Category Name</th>
                                <th>Todo Count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

SettingsTodoCategories.propTypes = {
    todoCategories: PropTypes.array.isRequired
};

export default SettingsTodoCategories;
