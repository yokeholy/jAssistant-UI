import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import StateButton from "./fragments/StateButton";

class Login extends React.Component {
    state = {
        accountEmail: "",
        accountPassword: ""
    };

    updateEmail = e => {
        this.setState({ accountEmail: e.target.value });
    }

    updatePassword = e => {
        this.setState({ accountPassword: e.target.value });
    }

    login = () => {
        if (!this.state.accountEmail || !this.state.accountPassword) {
            return Promise.reject("Please enter your Email and Password to login.");
        } else {
            return API.post("/account/login", {
                accountEmail: this.state.accountEmail,
                accountPassword: this.state.accountPassword
            })
                .then(response => {
                    toast.success(`Welcome back, ${response.data.data.userName}`);
                    if (response.data.data.authKey) {
                        // Store the returned auth key in localStorage
                        this.props.updateLoginStatus(true, response.data.data.authKey);
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
                                <div className="form-group">
                                    <label htmlFor="accountEmail">Email</label>
                                    <input type="text"
                                        className="form-control"
                                        value={ this.state.accountEmail }
                                        onChange={ this.updateEmail }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="accountPassword">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        value={ this.state.accountPassword }
                                        onChange={ this.updatePassword }/>
                                </div>
                                <StateButton buttonType="primary"
                                    buttonIcon="fas fa-sign-in-alt"
                                    buttonLabel="Login"
                                    inProgressLabel="Logging In"
                                    action={ this.login }>
                                </StateButton>
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
