import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends React.Component {
    render () {
        if (!this.props.loginStatus && this.props.location.pathname !== "/login") {
            return <Redirect to="/login" />;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand header" to="/">{ this.props.appName }</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    { this.props.loginStatus
                        ? <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/"><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todo"><i className="fas fa-list-ul"></i> Todo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/routine"><i className="fas fa-clipboard-check"></i> Routine</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/note"><i className="fas fa-sticky-note"></i> Note</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/lifestyle"><i className="fas fa-walking"></i> Lifestyle</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings"><i className="fas fa-cog"></i> Settings</NavLink>
                            </li>
                        </ul>
                        : <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                            </li>
                        </ul>
                    }
                    <ul className="navbar-nav my-2">
                        <li className="nav-item">
                            <button className={`btn ${this.props.hideEverything ? "btn-outline-success" : "btn-danger"}`}
                                onClick={ this.props.showHideEverything }>
                                <i className={`fas ${this.props.hideEverything ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </li>
                    </ul>
                </div>
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
