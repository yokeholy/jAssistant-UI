/* global window: true, document: true */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Todo from "./Todo";
import Routine from "./Routine";
import Note from "./Note";
import Lifestyle from "./Lifestyle";

class MainAssistant extends React.Component {
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
            <div>
                <div className="row">
                    <section id="notes" className="col-12 col-lg-4">
                        <Todo dashboard />
                    </section>
                    <section id="notes" className="col-12 col-lg-4">
                        <Routine dashboard />
                    </section>
                    <section id="notes" className="col-12 col-lg-4">
                        <Note dashboard />
                    </section>
                </div>
                <Lifestyle dashboard />
            </div>
        );
    }
}

MainAssistant.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainAssistant);
