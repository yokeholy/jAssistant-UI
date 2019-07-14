/* global window: true, document: true */
import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

import Navigation from "./components/Navigation";
import MainAssistant from "./components/MainAssistant";
import Todo from "./components/Todo";
import Routine from "./components/Routine";
import Note from "./components/Note";
import Lifestyle from "./components/Lifestyle";
import Settings from "./components/Settings";
import Login from "./components/Login";

class JAssistant extends React.Component {
    state = {
        timer: null
    }

    componentDidMount () {
        this.resetTimer();
        // DOM Events
        document.onmousemove = this.resetTimer;
        document.onkeypress = this.resetTimer;
        document.onscroll = this.resetTimer;
        document.onclick = this.resetTimer;
        document.ondblclick = this.resetTimer;
        document.onkeypress = this.resetTimer;
    }

    componentWillUnmount () {
        window.clearTimeout(this.state.timer);
        this.setState({
            timer: null
        });
    }

    resetTimer = () => {
        window.clearTimeout(this.state.timer);
        // Set the timer to be 180 seconds
        this.setState({
            timer: window.setTimeout(() => {
                if (!this.props.hideEverything) {
                    this.props.showHideEverything();
                }
                this.resetTimer();
            }, 180000)
        });
    }

    render () {
        return (
            <BrowserRouter>
                <div id="jAssistant"
                    className={ this.props.hideEverything ? "hidingEverything" : ""}>
                    <Navigation />
                    <section className="container-fluid pt-3 mb-5 pb-5">
                        <Route exact path="/" component={ MainAssistant } />
                        <Route exact path="/todo" component={ Todo } />
                        <Route exact path="/routine" component={ Routine } />
                        <Route exact path="/note" component={ Note } />
                        <Route exact path="/lifestyle" component={ Lifestyle } />
                        <Route exact path="/settings" component={ Settings } />
                        <Route exact path="/login" component={ Login } />
                    </section>
                    <ToastContainer />
                </div>
                <Helmet>
                    <title>{ this.props.appName }</title>
                </Helmet>
            </BrowserRouter>
        );
    }
}

JAssistant.propTypes = {
    appName: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(JAssistant);
