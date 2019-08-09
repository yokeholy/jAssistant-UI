import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Bootstrap
import Image from "react-bootstrap/Image";

class Navigation extends React.Component {
    render () {
        if (!this.props.loginStatus
            && this.props.location.pathname !== "/login"
            && this.props.location.pathname !== "/signUp"
            && this.props.location.pathname !== "/help") {
            return <Redirect to="/login" />;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand header" to="/">
                    { this.props.appName === "jAssistant"
                        ? <Image src={ require("../images/logo_right_120.png") }
                            alt="jAssistant"
                            fluid />
                        : this.props.appName
                    }
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    { this.props.loginStatus
                        ? <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/"><i className="fas fa-tachometer-alt" /> Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todo"><i className="fas fa-list-ul" /> Todo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/routine"><i className="fas fa-clipboard-check" /> Routine</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/note"><i className="fas fa-sticky-note" /> Note</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/lifestyle"><i className="fas fa-walking" /> Lifestyle</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings"><i className="fas fa-cog" /> Settings</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/help"><i className="fas fa-question-circle" /> Help</NavLink>
                            </li>
                        </ul>
                        : <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login"><i className="fas fa-sign-in-alt" /> Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signUp"><i className="fas fa-user-plus" /> Sign Up</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/help"><i className="fas fa-question-circle" /> Help</NavLink>
                            </li>
                        </ul>
                    }
                    <ul className="navbar-nav my-2">
                        <li className="nav-item">
                            <button className={`btn ${this.props.hideEverything ? "btn-success" : "btn-danger"}`}
                                onClick={ this.props.showHideEverything }>
                                <i className={`fas ${this.props.hideEverything ? "fa-eye" : "fa-eye-slash"}`} />
                            </button>
                        </li>
                    </ul>
                </div>
                <button className={`btn ${this.props.hideEverything ? "btn-success" : "btn-danger"}`}
                    id="floatingShowHideButton"
                    onClick={ this.props.showHideEverything }>
                    <i className={`fas ${this.props.hideEverything ? "fa-eye" : "fa-eye-slash"}`} />
                </button>
            </nav>
        );
    }
}

Navigation.propTypes = {
    appName: PropTypes.string.isRequired,
    hideEverything: PropTypes.bool.isRequired,
    showHideEverything: PropTypes.func.isRequired,
    loginStatus: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

// Map JData dispatch methods
const mapDispatchToProps = dispatch => ({
    showHideEverything: () => {
        dispatch({ type: "SHOW_HIDE_EVERYTHING" });
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
