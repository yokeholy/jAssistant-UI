import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";

import HelpDashboard from "./Help/Dashboard";
import HelpTodo from "./Help/Todo";
import HelpRoutine from "./Help/Routine";
import HelpLifestyle from "./Help/Lifestyle";
import HelpNote from "./Help/Note";
import HelpSettings from "./Help/Settings";
import HelpAbout from "./Help/About";

class Help extends React.Component {
    render () {
        const { page } = this.props.match.params;

        return (
            <div className="row">
                <div className="col-12" id="help">
                    <h1>Help</h1>
                    <p>Please select a topic below to learn more.</p>
                    <Tabs variant="pills"
                        defaultActiveKey={ page }
                        onSelect={ key => this.props.history.push(`/help/${key}`) }>
                        <Tab eventKey="dashboard" title="Dashboard">
                            <HelpDashboard />
                        </Tab>
                        <Tab eventKey="todo" title="Todo">
                            <HelpTodo />
                        </Tab>
                        <Tab eventKey="routine" title="Routine">
                            <HelpRoutine />
                        </Tab>
                        <Tab eventKey="lifestyle" title="Lifestyle">
                            <HelpLifestyle />
                        </Tab>
                        <Tab eventKey="note" title="Note">
                            <HelpNote />
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <HelpSettings />
                        </Tab>
                        <Tab eventKey="about" title="About">
                            <HelpAbout />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

Help.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Help;
