import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../../services/api";
import StateButton from "../fragments/StateButton";

// Bootstrap
import Form from "react-bootstrap/Form";

class Login extends React.Component {
    state = {
        accountEmail: "",
        accountPassword: ""
    };

    login = e => {
        e.preventDefault();
        if (!this.state.accountEmail || !this.state.accountPassword) {
            return Promise.reject("Please enter your Email and Password to login.");
        } else {
            return API.post("/account/login", {
                accountEmail: this.state.accountEmail,
                accountPassword: this.state.accountPassword
            })
                .then(response => {
                    toast.success(`Welcome back, ${response.userName}`);
                    if (response.authKey) {
                        // Store the returned auth key in jData
                        this.props.updateLoginStatus(true, response.authKey);
                    }
                }, error => {
                    toast.error(`Login was not successful: ${error.response.data.metadata.message}`);
                });
        }
    }

    render () {
        if (this.props.loginStatus && this.props.userAuthKey) {
            return <Redirect to="/" />;
        }

        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Login</h3>
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                <Form>
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
                                    <StateButton buttonType="primary"
                                        buttonIcon="fas fa-sign-in-alt"
                                        buttonLabel="Login"
                                        inProgressLabel="Logging In"
                                        action={ this.login } />
                                    <p>Need a new account?
                                        <Link to="/signUp">Sign Up</Link>
                                    </p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Login.propTypes = {
    loginStatus: PropTypes.bool.isRequired,
    userAuthKey: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
