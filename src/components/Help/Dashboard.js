import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

const HelpDashboard = () =>
    <div className="container">
        <h2 className="text-center">Dashboard</h2>
        <div className="card">
            <div className="card-body">
                <p>
                    <Image src={ require("../../images/Help/dashboard_screen.png") }
                        alt="Todo List Screenshot"
                        fluid thumbnail />
                </p>
                <p>The Dashboard consists of an overview of <Link to="/todo">Todo</Link>, <Link to="/routine">Routine</Link>, <Link to="/note">Note</Link>, and <Link to="/lifestyle">Lifestyle</Link> components.</p>
                <p>Please check their corresponding documentation for more information.</p>
            </div>
        </div>
        <hr />
        <Alert variant="info">
            <p><i className="fas fa-info-circle" /> <strong>Note</strong></p>
            <p>The Dashboard does <i>not</i> provide all functionalities of each component. Its purpose is to provide a snapshot of each component&apos;s state.</p>
            <p>Please use individual component&apos;s page for their full functionalities.</p>
        </Alert>
    </div>;

export default HelpDashboard;
