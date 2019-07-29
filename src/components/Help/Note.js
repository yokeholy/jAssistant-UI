import React from "react";

// Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const HelpNote = () =>
    <div className="container">
        <h2 className="text-center">Note</h2>
        <Card>
            <Card.Body>
                <p>
                    <Image src={ require("../../images/Help/note_screen.png") }
                        alt="Note Screenshot"
                        fluid thumbnail />
                </p>
                <p>Notes are pretty self-explanatory: they are your personal notes that you want to access anywhere there is Internet.</p>
            </Card.Body>
        </Card>
        <hr />
        <Accordion>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="createNewNote">
                    <h4>Create a New Note</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="createNewNote">
                    <Card.Body>
                        <ol>
                            <li>Click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> New Note</Button> button on the top-right corner of the page.</li>
                            <li>A new Note will appear with empty Title and Content for you to start writing.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="saveNote">
                    <h4>Save a Note</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="saveNote">
                    <Card.Body>
                        <ol>
                            <li>Whenever you are at a point wanting to save the current Note, click the <Button variant="primary" size="sm"><i className="fas fa-save" /> Save</Button> button.<br />
                                You may also use the shortcut <span className="badge badge-secondary">Ctrl/Cmd + S</span> to save the Note. The shortcut only works on the current Note you are editing.<br />
                                <Image src={ require("../../images/Help/note_save.png") }
                                    alt="Save Note"
                                    fluid thumbnail />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="archiveNote">
                    <h4>Archive a Note</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="archiveNote">
                    <Card.Body>
                        <ol>
                            <li>Whenever you are at a point wanting to Archive the current Note, click the <Button variant="secondary" size="sm"><i className="fas fa-archive" /> Archive</Button> button.<br />
                                <Image src={ require("../../images/Help/note_save.png") }
                                    alt="Archive Note"
                                    fluid thumbnail />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="viewArchiveNote">
                    <h4>View Archived Notes</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="viewArchiveNote">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <p>In the Note page, below your currently active Notes, you will be able to view all archived Notes.<br />
                            <Image src={ require("../../images/Help/note_archived.png") }
                                alt="Archived Note"
                                fluid thumbnail />
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>;

export default HelpNote;
