import React from "react";
import { Link } from "react-router-dom";

const HelpDashboard = () =>
    <div>
        <h2 className="text-center">Dashboard</h2>
        <p>The Dashboard consists of an overview of
            <Link to="/todo">Todo</Link>,
            <Link to="/routine">Routine</Link>,
            <Link to="/note">Note</Link>, and
            <Link to="/lifestyle">Lifestyle</Link>.
        </p>
        <p>Please check their corresponding documentation for more information.</p>
    </div>;

export default HelpDashboard;
