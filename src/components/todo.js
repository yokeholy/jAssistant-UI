import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import API from "../services/api";

class Todo extends React.Component {
    state = {
        todoList: [],
        newTodoItemName: ""
    };

    componentDidMount () {
        this.getTodoList();
    }

    getTodoList = () => {
        API.get("/todo/getTodoList")
            .then(response => {
                this.setState({
                    // Sort by the Todo Item Status, put finished ones at the bottom
                    todoList: response.data.data.todoList.sort((a, b) => {
                        let modifier = 1;
                        if (a.todoStatus < b.todoStatus) return -1 * modifier;
                        if (a.todoStatus > b.todoStatus) return 1 * modifier;
                        return 0;
                    })
                });
            });
    }

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
        API.post("/todo/toggleTodoStatus", { todoId: todoItem.todoId })
            .then(() => {
                toast.success(`${todoItem.todoName} is now done!`);
                this.getTodoList();
            });
    }

    createTodoItem = e => {
        e.preventDefault();
        API.post("/todo/createTodoItem", { itemName: this.state.newTodoItemName })
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

    deleteTodoItem = todoItem => {
        API.post("/todo/deleteTodo", { todoId: todoItem.todoId })
            .then(() => {
                toast.success(`${todoItem.todoName} is deleted.`);
                this.getTodoList();
            });
    }

    render () {
        const todoList = this.state.todoList.length
            ? this.state.todoList.map(todoItem =>
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
                    <td className="{'hidingElement': props.hideEverything}">{ moment(todoItem.todoCreatedDate).fromNow() }</td>
                    <td className="text-right">
                        <button className="btn btn-danger btn-sm" onClick={ () => this.deleteTodoItem(todoItem) }>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            )
            : <tr>
                <td colSpan="4" className="bg-success">You&apos;ve finished everything! Yay!</td>
            </tr>;

        return (
            <section id="todoList" className="col-12 col-lg-4">
                <h3>Todo List</h3>
                <p className="text-muted">Everything you need to get done or got done today.</p>
                <form onSubmit={ this.createTodoItem }>
                    <div className="input-group">
                        <input type="text"
                            className="form-control"
                            value={ this.state.newTodoItemName }
                            onChange={ this.updateNewTodoItemName } />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" disabled={ !this.state.newTodoItemName }>
                                <i className="fas fa-plus"></i>
                                Create
                            </button>
                        </div>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Since</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { todoList }
                    </tbody>
                </table>
            </section>
        );
    }
}

Todo.propTypes = {
    hideEverything: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Todo);
