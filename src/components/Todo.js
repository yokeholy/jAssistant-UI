import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

import API from "../services/api";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";

class Todo extends React.Component {
    state = {
        todoList: [],
        newTodoItemName: "",
        sortingItem: "todoStatus",
        sortingDescending: true
    };

    componentDidMount () {
        this.getTodoList();
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

    sortedTodoList = () =>
        this.state.todoList.sort((a, b) => {
            if (a[this.state.sortingItem] < b[this.state.sortingItem]) {
                return this.state.sortingDescending ? -1 : 1;
            } else if (a[this.state.sortingItem] > b[this.state.sortingItem]) {
                return this.state.sortingDescending ? 1 : -1;
            } else {
                return 0;
            }
        });

    getTodoList = () =>
        API.get("/todo/getTodoList")
            .then(response => {
                this.setState({
                    // Sort by the current sorting item and current corting direction
                    todoList: response.data.data.todoList
                });
            });

    updateNewTodoItemName = e => {
        this.setState({ newTodoItemName: e.target.value });
    }

    enterEditing = todoItem => {
        todoItem.editing = true;
        this.forceUpdate();
    }

    toggleTodoItemStatus = todoItem => {
        // TODO: Use non-destructive State update (don't use use setState() to update the todoItem)
        todoItem.todoStatus = true;
        this.forceUpdate();
        return API.post("/todo/toggleTodoStatus", { todoId: todoItem.todoId })
            .then(() => {
                toast.success(`${todoItem.todoName} is now done!`);
                this.getTodoList();
            });
    }

    createTodoItem = e => {
        e.preventDefault();
        return API.post("/todo/createTodoItem", { itemName: this.state.newTodoItemName })
            .then(() => {
                toast.success(`${this.state.newTodoItemName} is created successfully.`);
                this.setState({newTodoItemName: ""});
                this.getTodoList();
            });
    }

    updateTodoItem = (e, todoItem) => {
        todoItem.editing = false;
        todoItem.todoName = e.target.value;
        this.forceUpdate();
        API.post("/todo/updateTodoItem", {
            todoId: todoItem.todoId,
            todoName: todoItem.todoName
        })
            .then(() => {
                toast.success(`${todoItem.todoName} is updated.`);
                this.getTodoList();
            });
    }

    deleteTodoItem = todoItem =>
        API.post("/todo/deleteTodo", { todoId: todoItem.todoId })
            .then(() => {
                toast.success(`${todoItem.todoName} is deleted.`);
                this.getTodoList();
            });

    render () {
        const todoList = this.state.todoList.length
            ? this.sortedTodoList().map(todoItem =>
                <tr key={ todoItem.todoId }>
                    <td>
                        { !todoItem.todoStatus
                            ? <i className="fas fa-circle clickable" onClick={ () => this.toggleTodoItemStatus(todoItem) }></i>
                            : <i className="fas fa-check-circle text-success"></i>
                        }
                    </td>
                    { !todoItem.editing
                        ? <td onDoubleClick={ () => this.enterEditing(todoItem) } className={ this.props.hideEverything ? "hidingElement" : "" }>{ todoItem.todoName }</td>
                        : <td className={ this.props.hideEverything ? "hidingElement" : "" }>
                            <input type="text"
                                className="form-control"
                                defaultValue={ todoItem.todoName }
                                onBlur={ e => this.updateTodoItem(e, todoItem) } />
                        </td>
                    }
                    <td className={this.props.hideEverything ? "hidingElement" : ""}>{ moment(todoItem.todoCreatedDate).fromNow() }</td>
                    <td className="text-right">
                        <ConfirmationButton buttonType="danger"
                            buttonIcon="fas fa-trash-alt"
                            buttonLabel=""
                            buttonSize="sm"
                            action={ () => this.deleteTodoItem(todoItem) }>
                        </ConfirmationButton>
                    </td>
                </tr>
            )
            : <tr>
                <td colSpan="4" className="bg-success">You&apos;ve finished everything! Yay!</td>
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
            <div id="todoList" className="row">
                <div className="col-12">
                    <h3>Todo List ({ this.state.todoList.filter(todo => !todo.todoStatus).length })</h3>
                    <p className="text-muted">Everything you need to get done or got done today.</p>
                    <form>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                value={ this.state.newTodoItemName }
                                onChange={ this.updateNewTodoItemName } />
                            <div className="input-group-append">
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-plus"
                                    buttonLabel="Create"
                                    inProgressLabel="Creating"
                                    action={ this.createTodoItem }>
                                </StateButton>
                            </div>
                        </div>
                    </form>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="clickable" onClick={ () => this.setSort("todoStatus") }>Done { sortingIndicator("todoStatus") }</th>
                                <th className="clickable" onClick={ () => this.setSort("todoName") }>Item { sortingIndicator("todoName") }</th>
                                <th className="clickable" onClick={ () => this.setSort("todoCreatedDate") }>Since { sortingIndicator("todoCreatedDate") }</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { todoList }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Todo.propTypes = {
    hideEverything: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Todo);
