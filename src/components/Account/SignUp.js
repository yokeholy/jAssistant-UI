import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../../services/api";
import StateButton from "../fragments/StateButton";

// Bootstrap
import Form from "react-bootstrap/Form";

class SignUp extends React.Component {
    state = {
        userName: "",
        accountEmail: "",
        accountPassword: "",
        confirmPassword: ""
    };

    signUp = e => {
        e.preventDefault();
        if (!this.state.userName || !this.state.accountEmail || !this.state.accountPassword || !this.state.confirmPassword) {
            return Promise.reject("Please enter your Name, Email and Password to sign up.");
        } else if (this.state.accountPassword !== this.state.confirmPassword) {
            return Promise.reject("Passwords don't match.");
        } else {
            return API.post("/account/signUp", {
                userName: this.state.userName,
                accountEmail: this.state.accountEmail,
                accountPassword: this.state.accountPassword
            })
                .then(response => {
                    toast.success(`Welcome, ${response.userName}`);
                    if (response.authKey) {
                        // Store the returned auth key in jData
                        this.props.updateLoginStatus(true, response.authKey);
                    }
                }, error => {
                    toast.error(`Sign up was not successful: ${error.response.data.metadata.message}`);
                });
        }
    }

    render () {
        if (this.props.loginStatus) {
            return <Redirect to="/" />;
        }

        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Sign Up</h3>
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                <Form>
                                    <Form.Group>
                                        <Form.Label htmlFor="userName">Name</Form.Label>
                                        <Form.Control value={ this.state.userName }
                                            onChange={ e => this.setState({ userName: e.target.value }) } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="accountEmail">Email</Form.Label>
                                        <Form.Control value={ this.state.accountEmail }
                                            onChange={ e => this.setState({ accountEmail: e.target.value }) } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="accountPassword">Password</Form.Label>
                                        <Form.Control type="password"
                                            value={ this.state.accountPassword }
                                            onChange={ e => this.setState({ accountPassword: e.target.value }) } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="confirmPassword">Confirm</Form.Label>
                                        <Form.Control type="password"
                                            value={ this.state.confirmPassword }
                                            onChange={ e => this.setState({ confirmPassword: e.target.value }) } />
                                    </Form.Group>
                                    <StateButton buttonType="primary"
                                        buttonIcon="fas fa-user-plus"
                                        buttonLabel="Sign Up"
                                        inProgressLabel="Signing Up"
                                        action={ this.signUp } />
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

SignUp.propTypes = {
    loginStatus: PropTypes.bool.isRequired,
    updateLoginStatus: PropTypes.func.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

// Map JData dispatch methods
const mapDispatchToProps = dispatch => ({
    updateLoginStatus: (newStatus, newAuthKey) => {
        dispatch({
            type: "UPDATE_LOGIN_STATUS",
            newStatus,
            newAuthKey
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
