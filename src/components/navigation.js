import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends React.Component {
    state = {
        hideEverything: this.props.hideEverything
    };

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand header" to="/">jAssistant</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/settings"><i className="fas fa-cog"></i> Settings</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://projects.wangjin.me" rel="noopener noreferrer" target="_blank"><i className="fas fa-external-link-alt"></i> Projects</a>
                        </li>
                    </ul>
                    <button className={`btn my-2 ${this.props.hideEverything ? "btn-outline-success" : "btn-danger"}`}
                        onClick={ this.props.showHideEverything }
                    >
                        <i className={`fas ${this.props.hideEverything ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {
    hideEverything: PropTypes.bool.isRequired,
    showHideEverything: PropTypes.func.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

// Map JData dispatch methods
const mapDispatchToProps = dispatch => ({
    showHideEverything: () => {
        dispatch({ type: "SHOW_HIDE_EVERYTHING" });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
