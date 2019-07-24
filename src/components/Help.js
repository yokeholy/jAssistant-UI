import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const Help = () =>
    <div className="row">
        <div className="col-12" id="help">
            <h1>Help</h1>
            <p>Please select a topic below to learn more.</p>
            <Tabs variant="pills" defaultActiveKey="dashboard">
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
            </Tabs>
        </div>
    </div>;

export default Help;
