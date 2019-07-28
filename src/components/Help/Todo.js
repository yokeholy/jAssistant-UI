import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Toggle from "react-bootstrap-toggle";

const HelpTodo = () =>
    <div className="container">
        <h2 className="text-center">Todo</h2>
        <Card>
            <Card.Body>
                <p>
                    <Image src={ require("../../images/Help/todo_list_screen.png") }
                        alt="Todo List Screenshot"
                        fluid thumbnail />
                </p>
                <p>You may have many Todo Categories that manages different parts of your life. For each Todo List, there are many Todos. jAssistant has the ability to allow you create as many Todo Categories, Todo Items, Sub-Todo Items and Comments as possible.</p>
                <p>To manage your Todo Categories, go visit the <Link to="/settings">Settings</Link> page.</p>
            </Card.Body>
        </Card>
        <hr />
        <Accordion>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="createNewTodoItem">
                    <h4>Create a New Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="createNewTodoItem">
                    <Card.Body>
                        <ol>
                            <li>In the Todo List of your choice, click the input box next to the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button.<br />
                                <Image src={ require("../../images/Help/todo_create_todo.png") }
                                    alt="Todo Item Create Input"
                                    fluid thumbnail />
                            </li>
                            <li>Enter your new Todo Item content.</li>
                            <li>Press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button to finish creating the new Todo Item.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="markTodoItemDone">
                    <h4>Mark a Todo Item Done</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="markTodoItemDone">
                    <Card.Body>
                        <ol>
                            <li>On the left side of each Todo Item, there is a blank circle.<br />
                                <Image src={ require("../../images/Help/todo_not_done.png") }
                                    alt="Todo Item Not Done"
                                    fluid thumbnail />
                            </li>
                            <li>Click that circle to mark it as Done.<br />
                                <Image src={ require("../../images/Help/todo_done.png") }
                                    alt="Todo Item Not Done"
                                    fluid thumbnail /><br />
                                The blank circle will become a check mark and the Todo Item is colored green to indicate it is Done.
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="sortTodoItems">
                    <h4>Sort Todo Items</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="sortTodoItems">
                    <Card.Body>
                        <ol>
                            <li>On the top of each Todo List, the Done, Item, and Since headers are clickable.<br />
                                <Image src={ require("../../images/Help/todo_sorting.png") }
                                    alt="Todo Item Sorting Headers"
                                    fluid thumbnail />
                            </li>
                            <li>Click any header to sort by that column. Click again to reverse the sort order.<br />
                                <Image src={ require("../../images/Help/todo_sorted.png") }
                                    alt="Todo Item Sorted"
                                    fluid thumbnail /><br />
                                    The arrow will indicate which column is being sorted and in either ascending or descending order.
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateTodoItem">
                    <h4>Update a Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateTodoItem">
                    <Card.Body>
                        <ol>
                            <li>Double-click any Todo Item, it should become editable<br />
                                <Image src={ require("../../images/Help/todo_edit_todo.png") }
                                    alt="Todo Item Edit Input"
                                    fluid thumbnail />
                            </li>
                            <li>Make edit of the Todo Item content.</li>
                            <li>Click anywhere outside of the input field to update the Todo Item.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="createSubTodoItem">
                    <h4>Create a Sub-Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="createSubTodoItem">
                    <Card.Body>
                        <ol>
                            <li>For each Todo Item (except existing Sub-Todo Items), there will be a <Button variant="secondary" size="sm"><i className="fas fa-plus" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/todo_create_sub_todo.png") }
                                    alt="Sub Todo Item Create Input"
                                    fluid thumbnail />
                            </li>
                            <li>Like how you create a main Todo Item, enter the content of the new Sub-Todo Item and press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button.</li>
                            <li>If you decide not to create the Sub-Todo Item, click the <Button variant="secondary" size="sm"><i className="fas fa-times" /></Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="deleteTodoItem">
                    <h4>Delete a Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="deleteTodoItem">
                    <Card.Body>
                        <ol>
                            <li>For each Todo Item, there will be a <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/todo_delete.png") }
                                    alt="Todo Item Delete"
                                    fluid thumbnail /><br />
                                A confirmation will show up.
                            </li>
                            <li>To confirm deleting the Todo Item, click the <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button again.</li>
                            <li>Click the <Button variant="link" size="sm">Cancel</Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="viewComments">
                    <h4>View Comments of a Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="viewComments">
                    <Card.Body>
                        <ol>
                            <li>For each Todo Item, there will be a <Button variant="secondary" size="sm"><i className="far fa-comment" /></Button> button on the right side.<br />
                                If it has a number, like this:<Button variant="secondary" size="sm"><i className="far fa-comment" /> 10</Button>, the number represents how many comments are already made to this Todo Item.<br />
                                Click it to view all the comments.<br />
                                <Image src={ require("../../images/Help/todo_comments.png") }
                                    alt="Todo Item Comments"
                                    fluid thumbnail />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="addComment">
                    <h4>Add a Comment to a Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="addComment">
                    <Card.Body>
                        <ol>
                            <li>While the Todo Item&apos;s Comments section is shown, at the bottom, click the input box next to the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Comment</Button> button.<br />
                                <Image src={ require("../../images/Help/todo_new_comment.png") }
                                    alt="Todo Item Comments"
                                    fluid thumbnail />
                            </li>
                            <li>Enter your new Comment content.</li>
                            <li>Press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Comment</Button> button to finishg creating the Comment.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="deleteComment">
                    <h4>Delete a Comment of a Todo Item</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="deleteComment">
                    <Card.Body>
                        <ol>
                            <li>For each Comment, there will be a <Button variant="outline-danger" size="sm"><i className="far fa-trash-alt" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/todo_delete_comment.png") }
                                    alt="Todo Item Delete Comment"
                                    fluid thumbnail /><br />
                                A confirmation will show up.
                            </li>
                            <li>To confirm deleting the Comment, click the <Button variant="danger" size="sm"><i className="far fa-trash-alt" /></Button> button again.</li>
                            <li>Click the <Button variant="link" size="sm">Cancel</Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="toggleDoneTodoItems">
                    <h4>Toggle Done Todo Items</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="toggleDoneTodoItems">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>On the top-right corner of the page, there is a toggle button to show or hide Todo Items that are marked Done:<br />
                                <Image src={ require("../../images/Help/todo_not_show_done.png") }
                                    alt="Todo Item Not Show Done"
                                    fluid thumbnail /><br />
                            </li>
                            <li>To toggle the show/hide status, click the <Toggle onstyle="success" offstyle="danger" active={false} /> button. The button will now display:<br />
                                <Image src={ require("../../images/Help/todo_show_done.png") }
                                    alt="Todo Item Show Done"
                                    fluid thumbnail /><br />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>;

export default HelpTodo;
