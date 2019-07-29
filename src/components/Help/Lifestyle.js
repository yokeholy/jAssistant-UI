import React from "react";

// Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const HelpLifestyle = () =>
    <div className="container">
        <h2 className="text-center">Lifestyle</h2>
        <Card>
            <Card.Body>
                <p>
                    <Image src={ require("../../images/Help/lifestyle_screen.png") }
                        alt="Lifestyle Screenshot"
                        fluid thumbnail />
                </p>
                <p>Lifestyles are smaller and more frequent tasks you may set up for yourself in order to form behaviors. For example, regularly standing up during your 8-hour work is recommended. You can easily set up a Lifestyle just to track that multiple times a day.</p>
                <p>What sets Lifestyles apart from Lifestyles is that it provides a more direct visual appearance of your progress.</p>
            </Card.Body>
        </Card>
        <hr />
        <Accordion>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="createNewLifestyle">
                    <h4>Create a New Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="createNewLifestyle">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>Click the input box next to the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create New Lifestyle</Button> button.<br />
                                <Image src={ require("../../images/Help/lifestyle_create_lifestyle.png") }
                                    alt="Lifestyle Create Input"
                                    fluid thumbnail />
                            </li>
                            <li>Enter your new Lifestyle content.</li>
                            <li>Press <span className="badge badge-secondary">Enter</span> or click the <Button variant="primary" size="sm"><i className="fas fa-plus" /> Create New Lifestyle</Button> button to finish creating the new Lifestyle.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="checkInLifestyle">
                    <h4>Check In on a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="checkInLifestyle">
                    <Card.Body>
                        <ol>
                            <li>When you move your mouse over a Lifestyle, you will see it being highlighed and a big plus sign appears.<br />
                                <Image src={ require("../../images/Help/lifestyle_check_in.png") }
                                    alt="Lifestyle Check In"
                                    fluid thumbnail />
                            </li>
                            <li>Click on it to Check In. The Lifestyle will indicate the updated count of today&apos;s Check In.<br />
                                <Image src={ require("../../images/Help/lifestyle_checked_in.png") }
                                    alt="Lifestyle Checked In"
                                    fluid thumbnail />
                            </li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateLifestyleName">
                    <h4>Update the Name a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateLifestyleName">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>Click on the input field of the Lifestyle Name of your choice.<br />
                                <Image src={ require("../../images/Help/lifestyle_edit_name.png") }
                                    alt="Lifestyle Edit Name Input"
                                    fluid thumbnail />
                            </li>
                            <li>Make edit of the Lifestyle Name.</li>
                            <li>Click anywhere outside of the input field to update the Lifestyle Name.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateLifestyleCaption">
                    <h4>Update the Caption a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateLifestyleCaption">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>Click on the input field of the Lifestyle Caption of your choice.<br />
                                <Image src={ require("../../images/Help/lifestyle_edit_caption.png") }
                                    alt="Lifestyle Edit Caption Input"
                                    fluid thumbnail />
                            </li>
                            <li>Make edit of the Lifestyle Caption.</li>
                            <li>Click anywhere outside of the input field to update the Lifestyle Caption.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateLifestyleIcon">
                    <h4>Update the Icon a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateLifestyleIcon">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>Click on current Icon selection of the Lifestyle Icon of your choice. A dropdown should appear.<br />
                                <Image src={ require("../../images/Help/lifestyle_edit_icon.png") }
                                    alt="Lifestyle Edit Icon Dropdown"
                                    fluid thumbnail />
                            </li>
                            <li>Select the new Lifestyle Icon from the dropdown to update the Lifestyle Icon.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateLifestyleColor">
                    <h4>Update the Color a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateLifestyleColor">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <ol>
                            <li>Click on current Color selection of the Lifestyle Color of your choice. A dropdown should appear.<br />
                                <Image src={ require("../../images/Help/lifestyle_edit_color.png") }
                                    alt="Lifestyle Edit Color Dropdown"
                                    fluid thumbnail />
                            </li>
                            <li>Select the new Lifestyle Color from the dropdown to update the Lifestyle Color.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="updateLifestyleDailyValue">
                    <h4>Update the Daily Value a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="updateLifestyleDailyValue">
                    <Card.Body>
                        <p className="text-info"><i className="fas fa-info-circle" /> <strong>Note:</strong> This functionis not available in Dashboard mode.</p>
                        <p>Daily Value means how many times you want to complete on this Lifestyle.</p>
                        <ol>
                            <li>Click on the input field of the Lifestyle Daily Value of your choice.<br />
                                <Image src={ require("../../images/Help/lifestyle_edit_daily_value.png") }
                                    alt="Lifestyle Edit Daily Value Input"
                                    fluid thumbnail />
                            </li>
                            <li>Make edit of the Lifestyle Daily Value.</li>
                            <li>Click anywhere outside of the input field to update the Lifestyle Daily Value.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={ Card.Header } eventKey="deleteLifestyle">
                    <h4>Delete a Lifestyle</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="deleteLifestyle">
                    <Card.Body>
                        <ol>
                            <li>For each Lifestyle, there will be a <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button on the right side, click it.<br />
                                <Image src={ require("../../images/Help/lifestyle_delete.png") }
                                    alt="Lifestyle Delete"
                                    fluid thumbnail /><br />
                                A confirmation will show up.
                            </li>
                            <li>To confirm deleting the Lifestyle, click the <Button variant="danger" size="sm"><i className="fas fa-trash-alt" /></Button> button again.</li>
                            <li>Click the <Button variant="link" size="sm">Cancel</Button> button to cancel.</li>
                        </ol>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>;

export default HelpLifestyle;
