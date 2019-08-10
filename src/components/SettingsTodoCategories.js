import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import API from "../services/api";
import EditInput from "./fragments/EditInput";
import StateButton from "./fragments/StateButton";
import ConfirmationButton from "./fragments/ConfirmationButton";

class SettingsTodoCategories extends React.Component {
    state = {
        newTodoCategoryName: ""
    }

    updateNewTodoCategoryName = e =>
        this.setState({ newTodoCategoryName: e.target.value });

    createTodoCategorySetting = () =>
        API.post("/settings/saveTodoCategorySetting", {
            todoCategoryName: this.state.newTodoCategoryName
        })
            .then(() => {
                toast.success(`${this.state.newTodoCategoryName} is created.`);
                this.setState({
                    newTodoCategoryName: ""
                });
            })
            .then(() => {
                this.props.getAllSettings();
            });

    updateTodoCategorySetting = (e, todoCategoryId) => {
        let newTodoCategoryName = e.target.value;
        return API.post("/settings/saveTodoCategorySetting", {
            todoCategoryName: newTodoCategoryName,
            todoCategoryId
        })
            .then(() => {
                toast.success(`${newTodoCategoryName} is updated.`);
            })
            .then(() => {
                this.props.getAllSettings();
            });
    };

    deleteTodoCategory = todoCategoryItem => {
        if (todoCategoryItem.todoCount > 0) {
            toast.warn(`The Category ${todoCategoryItem.todoCategoryName} has more than 0 unfinished Todo items. Thus it cannot be deleted.`);
            return Promise.reject();
        } else {
            return API.post("/settings/deleteTodoCategorySetting", {
                todoCategoryId: todoCategoryItem.todoCategoryId
            })
                .then(() => {
                    toast.success(`${todoCategoryItem.todoCategoryName} is deleted.`);
                    this.props.getAllSettings();
                });
        }
    };

    render () {
        const todoCategoryList = this.props.todoCategorySettings.length
            ? this.props.todoCategorySettings.map(todoCategoryItem =>
                <tr key={ todoCategoryItem.todoCategoryId }>
                    <td>
                        <EditInput defaultValue={ todoCategoryItem.todoCategoryName }
                            action={ e => this.updateTodoCategorySetting(e, todoCategoryItem.todoCategoryId) } />
                    </td>
                    <td className="hidingElement">
                        { todoCategoryItem.todoCount }
                    </td>
                    <td className="text-right">
                        <ConfirmationButton buttonType="danger"
                            buttonIcon="fas fa-trash-alt"
                            buttonLabel=""
                            action={ () => this.deleteTodoCategory(todoCategoryItem) } />
                    </td>
                </tr>)
            : null;
        return (
            <div className="card mt-3">
                <div className="card-body">
                    <h4 className="card-title">Todo Categories</h4>
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control hidingElement"
                                value={ this.state.newTodoCategoryName }
                                onChange={ this.updateNewTodoCategoryName } />
                            <div className="input-group-append">
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create"
                                    inProgressLabel="Creating"
                                    action={ this.createTodoCategorySetting } />
                            </div>
                        </div>
                    </form>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Todo Category Name</th>
                                <th>Todo Count</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            { todoCategoryList }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

SettingsTodoCategories.propTypes = {
    todoCategorySettings: PropTypes.array.isRequired,
    getAllSettings: PropTypes.func.isRequired
};

export default SettingsTodoCategories;
