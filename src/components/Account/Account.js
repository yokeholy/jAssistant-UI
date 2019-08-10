import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import API from "../../services/api";
import StateButton from "../fragments/StateButton";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class Account extends React.Component {
    state = {
        userName: "",
        accountEmail: "",
        editingProfile: false
    };

    componentDidMount = () => {
        if (this.props.loginStatus) {
            this.getAccount();
        }
    };

    getAccount = () =>
        API.get("/account/getAccount")
            .then(response => {
                this.setState({
                    userName: response.userName,
                    accountEmail: response.accountEmail
                });
            });

    updateAccount = e => {
        e.preventDefault();
        if (!this.state.userName || !this.state.accountEmail) {
            return Promise.reject("Please enter your Name and Email to update your account.");
        } else {
            return API.post("/account/updateAccount", {
                userName: this.state.userName,
                accountEmail: this.state.accountEmail
            })
                .then(response => {
                    toast.success(`Your account is updated, ${response.userName}`);
                    this.setState({ editingProfile: false });
                }, error => {
                    toast.error(`Updating your account was not successful: ${error.response.data.metadata.message}`);
                });
        }
    };

    logout = () =>
        API.post("/account/logout")
            .then(() => {
                toast.success("You've successfully logged out.");
                this.props.updateLoginStatus(false);
            }, error => {
                toast.error(`Logging out was not successful: ${error.response.data.metadata.message}`);
            });

    render () {
        return (
            <section className="container-fluid pt-3 mb-5 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h3>Account</h3>
                        <div className="row">
                            { !this.state.editingProfile
                                ? <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Name</Card.Title>
                                            <Card.Text className="pl-3">{ this.state.userName }</Card.Text>
                                            <Card.Title>Email</Card.Title>
                                            <Card.Text className="pl-3">{ this.state.accountEmail }</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="primary"
                                                onClick={ () => this.setState({ editingProfile: true }) }>
                                                <i className="fas fa-pencil-alt" /> Edit Account
                                            </Button>
                                            <Link className="float-right" to="/password">
                                                <i className="fas fa-key" /> Change Password
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                    <Button variant="outline-danger"
                                        className="mt-3"
                                        onClick={ this.logout }>
                                        <i className="fas fa-sign-out-alt" /> Log Out
                                    </Button>
                                </div>
                                : <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
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
                                        <StateButton buttonType="primary"
                                            buttonIcon="fas fa-save"
                                            buttonLabel="Save"
                                            inProgressLabel="Saving"
                                            action={ this.updateAccount } />
                                    </Form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Account.propTypes = {
    loginStatus: PropTypes.bool.isRequired,
    updateLoginStatus: PropTypes.func.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

// Map JData dispatch methods
const mapDispatchToProps = dispatch => ({
    updateLoginStatus: newStatus =>
        dispatch({
            type: "UPDATE_LOGIN_STATUS",
            newStatus
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
