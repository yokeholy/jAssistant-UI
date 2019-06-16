import React from "react";
import PropTypes from "prop-types";

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
        });
    }

    exitInProgressState = () => {
        this.setState({
            currentLabel: this.props.buttonLabel,
            disabled: false
        });
    }

    render () {
        return <button className={ `btn btn-${this.props.buttonType}` }
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
    inProgressLabel: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    preDisabled: PropTypes.bool
};

export default StateButton;
