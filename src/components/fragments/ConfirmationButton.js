import React from "react";
import PropTypes from "prop-types";

class ConfirmationButton extends React.Component {
    constructor () {
        super();
        this.state = {
            confirmingStatus: false
        };
    }

    enterConfirming = () => {
        this.setState({
            confirmingStatus: true
        });
    }

    exitConfirming = () => {
        this.setState({
            confirmingStatus: false
        });
    }

    takeAction = e =>
        this.props.action(e).then(() => {
            this.exitConfirming();
        }, () => {
            this.exitConfirming();
        });

    render () {
        return <span>
            <button className={ `btn btn-${this.props.buttonType} ${this.props.buttonSize ? `btn-${this.props.buttonSize}` : ""}` }
                onClick={ !this.state.confirmingStatus ? this.enterConfirming : e => this.takeAction(e) }>
                <i className={ this.props.buttonIcon } /> { this.props.buttonLabel }
            </button>
            { !this.state.confirmingStatus
                || <button className={ `btn btn-link ${this.props.buttonSize ? `btn-${this.props.buttonSize}` : ""}` }
                    onClick={ this.exitConfirming }>
                    Cancel
                </button>
            }
        </span>;
    }
}

ConfirmationButton.propTypes = {
    buttonType: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    buttonSize: PropTypes.string,
    action: PropTypes.func.isRequired
};

export default ConfirmationButton;
