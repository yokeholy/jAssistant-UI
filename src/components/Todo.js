import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

import API from "../services/api";
import Comment from "./Comment";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";
import Form from "react-bootstrap/Form";
import Toggle from "react-bootstrap-toggle";

class Todo extends React.Component {
    state = {
        todoSettings: {
            todoAlertLevel: 7,
            todoDangerLevel: 14
        },
        todoCategoryList: [],
        doneTodoCategoryList: [],
        sortingItem: "todoDone",
        sortingDescending: true,
        displayingDoneTodos: false
    };

    componentDidMount () {
        if (this.props.loginStatus) {
            this.setState({
                todoSettings: {
                    todoAlertLevel: this.props.todoAlertLevel,
                    todoDangerLevel: this.props.todoDangerLevel
                }
            });
            this.getTodoList(false);
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

    sortedTodoList = list =>
        list.sort((a, b) => {
            if (a[this.state.sortingItem] < b[this.state.sortingItem]) {
                return this.state.sortingDescending ? -1 : 1;
            } else if (a[this.state.sortingItem] > b[this.state.sortingItem]) {
                return this.state.sortingDescending ? 1 : -1;
            } else {
                return 0;
            }
        });

    getTodoList = done =>
        API.get(done ? "/todo/getDoneTodoList" : "/todo/getTodoList")
            .then(response => {
                this.setState({
                    todoCategoryList: response.todoCategoryList
                });
            });

    enterEditing = todoItem => {
        todoItem.editing = true;
        this.forceUpdate();
    }

    enterCreatingSubTodo = todoItem => {
        todoItem.creatingSubTodo = true;
        this.forceUpdate();
    }

    showHideComment = todoItem => {
        todoItem.showingComment = !todoItem.showingComment;
        this.forceUpdate();
    }

    exitCreatingSubTodo = (e, todoItem) => {
        e.preventDefault();
        todoItem.creatingSubTodo = false;
        this.forceUpdate();
    }

    toggleTodoItemStatus = todoItem => {
        // TODO: Use non-destructive State update (don't use use setState() to update the todoItem)
        todoItem.todoDone = true;
        this.forceUpdate();
        return API.post("/todo/toggleTodoStatus", { todoId: todoItem.todoId })
            .then(() => {
                toast.success(`${todoItem.todoName} is now done!`);
                this.getTodoList();
            });
    }

    createTodoItem = (e, parentTodoId = null, todoCategoryId, entity) => {
        e.preventDefault();
        return API.post("/todo/createTodoItem", {
            itemName: entity.newTodoItemName,
            parentTodoId,
            todoCategoryId
        })
            .then(() => {
                toast.success(`${entity.newTodoItemName} is created successfully.`);
                entity.newTodoItemName = "";
                this.forceUpdate();
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

    toggleDisplayDoneTodos = () => {
        this.getTodoList(!this.state.displayingDoneTodos);
        this.setState({ displayingDoneTodos: !this.state.displayingDoneTodos });
    }

    render () {
        const sortingIndicator = field => {
            if (field === this.state.sortingItem) {
                return this.state.sortingDescending
                    ? <i className="fas fa-long-arrow-alt-up"></i>
                    : <i className="fas fa-long-arrow-alt-down"></i>;
            } else {
                return null;
            }
        };

        const todoColor = todoItem => {
            if (todoItem.todoDone) {
                return "todoDone";
            } else if (todoItem.parentTodoId) {
                return "subTodo";
            } else {
                let daysAgo = moment(new Date()).diff(moment(todoItem.todoCreatedDate), "days");
                if (daysAgo >= this.state.todoSettings.todoDangerLevel) {
                    return "table-danger";
                } else if (daysAgo >= this.state.todoSettings.todoAlertLevel) {
                    return "table-warning";
                } else {
                    return "";
                }
            }
        };

        const todoList = (thisTodoList, todoCategoryId) => {
            if (thisTodoList.length) {
                return this.sortedTodoList(thisTodoList).map(todoItem =>
                    [
                        <tr key={ `todoItem_${todoItem.todoId}` }
                            className={ todoColor(todoItem) }>
                            <td>
                                { !todoItem.todoDone
                                    ? <i className="fas fa-circle clickable" onClick={ () => this.toggleTodoItemStatus(todoItem) }></i>
                                    : <i className="fas fa-check-circle text-success"></i>
                                }
                            </td>
                            { !todoItem.editing
                                ? <td onDoubleClick={ () => this.enterEditing(todoItem) } className="hidingElement">{ todoItem.todoName }</td>
                                : <td className="hidingElement">
                                    <input type="text"
                                        className="form-control"
                                        defaultValue={ todoItem.todoName }
                                        onBlur={ e => this.updateTodoItem(e, todoItem) } />
                                </td>
                            }
                            <td className="hidingElement">{ moment(todoItem.todoCreatedDate).fromNow() }</td>
                            <td className="text-right">
                                <ConfirmationButton buttonType="danger"
                                    buttonIcon="fas fa-trash-alt"
                                    buttonLabel=""
                                    buttonSize="sm"
                                    action={ () => this.deleteTodoItem(todoItem) }>
                                </ConfirmationButton>
                                <button className="btn btn-secondary btn-sm ml-2"
                                    onClick={ () => this.enterCreatingSubTodo(todoItem) }>
                                    <i className="fas fa-plus"></i>
                                </button>
                                <button className="btn btn-secondary btn-sm ml-2"
                                    onClick={ () => this.showHideComment(todoItem) }>
                                    <i className="far fa-comment"></i> { todoItem.commentCount || "" }
                                </button>
                            </td>
                        </tr>,
                        todoItem.showingComment
                        && <tr key={ `commentList_${todoItem.todoId}` }>
                            <td colSpan="4">
                                <Comment commentType={1}
                                    entityId={ todoItem.todoId }>
                                </Comment>
                            </td>
                        </tr>,
                        todoItem.creatingSubTodo
                        && <tr key={ `creatingSubTodo_${todoItem.todoId}` }>
                            <td colSpan="4">
                                <form>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control hidingElement"
                                            value={ todoItem.newTodoItemName }
                                            onChange={ e => { todoItem.newTodoItemName = e.target.value; } } />
                                        <div className="input-group-append">
                                            <StateButton buttonType="primary"
                                                buttonIcon="fas fa-plus"
                                                buttonLabel="Create"
                                                inProgressLabel="Creating"
                                                action={ e => this.createTodoItem(e, todoItem.todoId, todoCategoryId, todoItem) }>
                                            </StateButton>
                                            <button type="button"
                                                className="btn btn-secondary"
                                                onClick={ e => this.exitCreatingSubTodo(e, todoItem) }>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>,
                        todoItem.subTodos.length
                            ? this.sortedTodoList(todoItem.subTodos).map(subTodoItem =>
                                [<tr key={ `todoItem_${todoItem.todoId}_${subTodoItem.todoId}` }
                                    className={ todoColor(subTodoItem) }>
                                    <td className="pl-4">
                                        { !subTodoItem.todoDone
                                            ? <i className="fas fa-circle clickable" onClick={ () => this.toggleTodoItemStatus(subTodoItem) }></i>
                                            : <i className="fas fa-check-circle text-success"></i>
                                        }
                                    </td>
                                    { !subTodoItem.editing
                                        ? <td colSpan="2"
                                            onDoubleClick={ () => this.enterEditing(subTodoItem) }
                                            className="hidingElement pl-4">
                                            { subTodoItem.todoName }
                                        </td>
                                        : <td colSpan="2"
                                            className="hidingElement">
                                            <input type="text"
                                                className="form-control"
                                                defaultValue={ subTodoItem.todoName }
                                                onBlur={ e => this.updateTodoItem(e, subTodoItem) } />
                                        </td>
                                    }
                                    <td className="text-right">
                                        <ConfirmationButton buttonType="danger"
                                            buttonIcon="fas fa-trash-alt"
                                            buttonLabel=""
                                            buttonSize="sm"
                                            action={ () => this.deleteTodoItem(subTodoItem) }>
                                        </ConfirmationButton>
                                        <button className="btn btn-secondary btn-sm ml-2"
                                            onClick={ () => this.showHideComment(subTodoItem) }>
                                            <i className="far fa-comment"></i> { subTodoItem.commentCount || "" }
                                        </button>
                                    </td>
                                </tr>,
                                subTodoItem.showingComment
                                && <tr key={ `commentList_${subTodoItem.todoId}` }>
                                    <td colSpan="4">
                                        <Comment commentType={1}
                                            entityId={ subTodoItem.todoId }>
                                        </Comment>
                                    </td>
                                </tr>])
                            : null
                    ]
                );
            } else {
                return <tr>
                    <td colSpan="4" className="bg-success">You&apos;ve finished everything! Yay!</td>
                </tr>;
            }
        };

        const categoryList = this.state.todoCategoryList.map(category =>
            <div key={ category.todoCategoryId }
                className={ this.props.dashboard ? "col-12" : "col-12 col-md-6"}>
                <h3 className="hidingElement">
                    { category.todoCategoryName }  ({ category.todoCount })
                </h3>
                <form>
                    <div className="input-group">
                        <input type="text"
                            className="form-control hidingElement"
                            value={ category.newTodoItemName }
                            onChange={ e => { category.newTodoItemName = e.target.value; } } />
                        <div className="input-group-append">
                            <StateButton buttonType="primary"
                                buttonIcon="fas fa-plus"
                                buttonLabel="Create"
                                inProgressLabel="Creating"
                                action={ e => this.createTodoItem(e, null, category.todoCategoryId, category) }>
                            </StateButton>
                        </div>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="clickable" onClick={ () => this.setSort("todoDone") }>Done { sortingIndicator("todoDone") }</th>
                            <th className="clickable" onClick={ () => this.setSort("todoName") }>Item { sortingIndicator("todoName") }</th>
                            <th className="clickable" onClick={ () => this.setSort("todoCreatedDate") }>Since { sortingIndicator("todoCreatedDate") }</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { todoList(category.todoList, category.todoCategoryId) }
                    </tbody>
                </table>
            </div>
        );

        return (
            <div id="todoList" className="row">
                <div className="col-12">
                    <div className="row">
                        <div className={ `col-12${this.props.dashboard ? "" : " col-md-6"} `}>
                            <h3>Todo Lists</h3>
                            <p className="text-muted">Everything you need to get done or got done today.</p>
                        </div>
                        { !this.props.dashboard
                        && <div className="col-12 col-md-6 text-right">
                            <Form.Group controlId="doneTodosToggle">
                                <Form.Label>Display Done Todos</Form.Label>
                                <Toggle
                                    onClick={ this.toggleDisplayDoneTodos }
                                    onstyle="success"
                                    offstyle="danger"
                                    active={ this.state.displayingDoneTodos } />
                            </Form.Group>
                            <p className="text-muted">
                                { this.state.displayingDoneTodos
                                    ? "All Todos are shown."
                                    : "Showing Todos that are either not done or created/done today."}
                            </p>
                        </div>
                        }
                    </div>
                    <div className="row">
                        { categoryList }
                    </div>
                </div>
            </div>
        );
    }
}

Todo.propTypes = {
    dashboard: PropTypes.bool,
    loginStatus: PropTypes.bool.isRequired,
    todoAlertLevel: PropTypes.number.isRequired,
    todoDangerLevel: PropTypes.number.isRequired,
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Todo);
