import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

class StateButton extends React.Component {
    constructor (props) {
        super();
        this.state = {
            disabled: props.preDisabled || false,
            currentLabel: props.buttonLabel
        };
    }

    enterInProgressState = e => {
        this.setState({
            currentLabel: `${this.props.inProgressLabel}...`,
            disabled: true
        });
        this.props.action(e).then(() => {
            this.exitInProgressState();
        }, errorMessage => {
            toast.warn(errorMessage);
            this.exitInProgressState();
        });
    }

    exitInProgressState = () => {
        this.setState({
            currentLabel: this.props.buttonLabel,
            disabled: false
        });
    }

    render () {
        return <button
            className={ `btn btn-${this.props.buttonType} ${this.props.buttonSize ? `btn-${this.props.buttonSize}` : ""}` }
            onClick={ this.enterInProgressState }
            disabled={ this.state.disabled }>
            <i className={ this.props.buttonIcon }></i> { this.state.currentLabel }
        </button>;
    }
}

StateButton.propTypes = {
    buttonType: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    buttonSize: PropTypes.string,
    inProgressLabel: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    preDisabled: PropTypes.bool
};

export default StateButton;
