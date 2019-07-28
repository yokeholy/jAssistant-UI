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
                <p>About routines.</p>
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
                                <Image src={ require("../../images/Help/todo_create_todo.png") }
                                    alt="Routine Create Input"
                                    fluid thumbnail />
                            </li>
                            <li>Enter your new Routine content.</li>
                            <li>Press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create</Button> button to finish creating the new Routine.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>;

export default HelpRoutine;
