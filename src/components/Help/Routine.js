import React from "react";

// Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const HelpRoutine = () =>
    <div className="container">
        <h2 className="text-center">Routine</h2>
        <Card>
            <Card.Body>
                <p>
                    <Image src={ require("../../images/Help/routine_screen.png") }
                        alt="Routine Screenshot"
                        fluid thumbnail />
                </p>
                <p>Routines are tasks you do repeatly over time. You can set up Routines with different frequencies, like monthly, weekly, or daily.</p>
                <p>jAssistant helps you keep track of your Routine completion. If you keep finishing on time, you get higher number Consecutives.</p>
                <p>The countdown indicator below every Routine serves as a nice reminder of how much time left to complete it.</p>
            </Card.Body>
        </Card>
        <hr />
        <Accordion>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="createNewRoutine">
                    <h4>Create a New Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="createNewRoutine">
                    <Card.Body>
                        <ol>
                            <li>In the Routine List of your choice, click the input box next to the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button.<br />
                                <Image src={ require("../../images/Help/routine_create_routine.png") }
                                    alt="Routine Create Input"
                                    fluid thumbnail />
                            </li>
                            <li>Enter your new Routine content.</li>
                            <li>Press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button to finish creating the new Routine.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="markRoutineDone">
                    <h4>Mark a Routine as Done Today</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="markRoutineDone">
                    <Card.Body>
                        <ol>
                            <li>On the left side of each Routine, there is a blank circle.<br />
                                <Image src={ require("../../images/Help/routine_not_done.png") }
                                    alt="Routine Not Done"
                                    fluid thumbnail />
                            </li>
                            <li>Click that circle to mark it as Done.<br />
                                <Image src={ require("../../images/Help/routine_done.png") }
                                    alt="Routine Done"
                                    fluid thumbnail /><br />
                                The blank circle will become a check mark and the Routine is colored green to indicate it is Done today.
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="sortRoutines">
                    <h4>Sort Routines</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="sortRoutines">
                    <Card.Body>
                        <ol>
                            <li>On the top of the Routine list, the Done, Routine, and Consecutive headers are clickable.<br />
                                <Image src={ require("../../images/Help/routine_sorting.png") }
                                    alt="Routine Sorting Headers"
                                    fluid thumbnail />
                            </li>
                            <li>Click any header to sort by that column. Click again to reverse the sort order.<br />
                                <Image src={ require("../../images/Help/routine_sorted.png") }
                                    alt="Routine Sorted"
                                    fluid thumbnail /><br />
                                    The arrow will indicate which column is being sorted and in either ascending or descending order.
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateRoutine">
                    <h4>Update a Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateRoutine">
                    <Card.Body>
                        <ol>
                            <li>Double-click any Routine, it should become editable<br />
                                <Image src={ require("../../images/Help/routine_edit_routine.png") }
                                    alt="Routine Edit Input"
                                    fluid thumbnail />
                            </li>
                            <li>Make edit of the Routine content.</li>
                            <li>Click anywhere outside of the input field to update the Routine.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="configureRoutine">
                    <h4>Configure Routine Frequency</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="configureRoutine">
                    <Card.Body>
                        <ol>
                            <li>For each Routine, there will be a <Button variant="secondary" size="sm"><i className="fas fa-cog" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/routine_configure.png") }
                                    alt="Routine Configure Frequency"
                                    fluid thumbnail /><br />
                                The Routine Frequency Cofigurator will show up.
                            </li>
                            <li>Select from Monthly, Weekly, or Daily.
                                <ul>
                                    <li>For Monthly, you may select which day of each month to begin the Routine.<br />
                                        <Image src={ require("../../images/Help/routine_configure_monthly.png") }
                                            alt="Routine Configure Frequency - Monthly"
                                            fluid thumbnail /><br />
                                        <p className="text-info"><strong>Note:</strong> if you select the 29th, 30th, or 31st to be your day, for months that do not have those days, the last day of those months will be used instead.</p>
                                    </li>
                                    <li>For Weekly, you may select which day of each week to begin the Routine.<br />
                                        <Image src={ require("../../images/Help/routine_configure_weekly.png") }
                                            alt="Routine Configure Frequency - Weekly"
                                            fluid thumbnail />
                                    </li>
                                    <li>For Daily, you may pick which day(s) of each week that the Routine needs to be done.<br />
                                        <Image src={ require("../../images/Help/routine_configure_daily.png") }
                                            alt="Routine Configure Frequency - Daily"
                                            fluid thumbnail />
                                    </li>
                                </ul>
                            </li>
                            <li>Click the <Button variant="primary" size="sm"><i className="fas fa-save" /> Save</Button> button to save the Routine&apos;s Frequency Configuration.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="deleteRoutine">
                    <h4>Delete a Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="deleteRoutine">
                    <Card.Body>
                        <ol>
                            <li>For each Routine, there will be a <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/routine_delete.png") }
                                    alt="Routine Delete"
                                    fluid thumbnail /><br />
                                A confirmation will show up.
                            </li>
                            <li>To confirm deleting the Routine, click the <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button again.</li>
                            <li>Click the <Button variant="link" size="sm">Cancel</Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="viewComments">
                    <h4>View Comments of a Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="viewComments">
                    <Card.Body>
                        <ol>
                            <li>For each Routine, there will be a <Button variant="secondary" size="sm"><i className="far fa-comment" /></Button> button on the right side.<br />
                                If it has a number, like this:<Button variant="secondary" size="sm"><i className="far fa-comment" /> 10</Button>, the number represents how many comments are already made to this Routine.<br />
                                Click it to view all the comments.<br />
                                <Image src={ require("../../images/Help/routine_comments.png") }
                                    alt="Routine Comments"
                                    fluid thumbnail />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="addComment">
                    <h4>Add a Comment to a Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="addComment">
                    <Card.Body>
                        <ol>
                            <li>While the Routine&apos;s Comments section is shown, at the bottom, click the input box next to the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Comment</Button> button.<br />
                                <Image src={ require("../../images/Help/routine_new_comment.png") }
                                    alt="Routine Comments"
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
                    <h4>Delete a Comment of a Routine</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="deleteComment">
                    <Card.Body>
                        <ol>
                            <li>For each Comment, there will be a <Button variant="outline-danger" size="sm"><i className="far fa-trash-alt" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/routine_delete_comment.png") }
                                    alt="Routine Delete Comment"
                                    fluid thumbnail /><br />
                                A confirmation will show up.
                            </li>
                            <li>To confirm deleting the Comment, click the <Button variant="danger" size="sm"><i className="far fa-trash-alt" /></Button> button again.</li>
                            <li>Click the <Button variant="link" size="sm">Cancel</Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>;

export default HelpRoutine;
