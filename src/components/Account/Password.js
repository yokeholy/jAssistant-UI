import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import API from "../../services/api";
import StateButton from "../fragments/StateButton";

// Bootstrap
import Form from "react-bootstrap/Form";

class Password extends React.Component {
    state = {
        newPassword: "",
        confirmPassword: ""
    };


    updatePassword = e => {
        e.preventDefault();
        if (
            !this.state.newPassword
            || !this.state.confirmPassword
            || this.state.newPassword !== this.state.confirmPassword
        ) {
            return Promise.reject("Password cannot be empty and they need to match.");
        } else {
            return API.post("/account/updatePassword", {
                newPassword: this.state.newPassword
            })
                .then(() => {
                    toast.success("Your password is updated successfully.");
                    this.setState({
                        newPassword: "",
                        confirmPassword: ""
                    });
                }, error => {
                    toast.error(`Updating your password was not successful: ${error.response.data.metadata.message}`);
                });
        }
    }

    render () {
        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Account</h3>
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                <Form>
                                    <Form.Group>
                                        <Form.Label htmlFor="newPassword">New Password</Form.Label>
                                        <Form.Control type="password"
                                            value={ this.state.newPassword }
                                            onChange={ e => this.setState({ newPassword: e.target.value }) } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                                        <Form.Control type="password"
                                            value={ this.state.confirmPassword }
                                            onChange={ e => this.setState({ confirmPassword: e.target.value }) } />
                                    </Form.Group>
                                    <StateButton buttonType="primary"
                                        buttonIcon="fas fa-key"
                                        buttonLabel="Update"
                                        inProgressLabel="Updating"
                                        action={ this.updatePassword } />
                                    <Link to="/account"><i className="fas fa-times" /> Cancel</Link>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Password.propTypes = {
    loginStatus: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Password);
