import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";

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
                            <h2>Dashboard</h2>
                        </Tab>
                        <Tab eventKey="todo" title="Todo">
                            <h2>Todo</h2>
                        </Tab>
                        <Tab eventKey="routine" title="Routine">
                            <h2>Routine</h2>
                        </Tab>
                        <Tab eventKey="lifestyle" title="Lifestyle">
                            <h2>Lifestyle</h2>
                        </Tab>
                        <Tab eventKey="note" title="Note">
                            <h2>Note</h2>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <h2>Settings</h2>
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
