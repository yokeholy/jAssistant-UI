import React from "react";
import PropTypes from "prop-types";

class EditInput extends React.Component {
    determinePress = e => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    }

    render () {
        return <input type="text"
            className="form-control hidingElement"
            defaultValue={ this.props.defaultValue }
            onKeyPress={ this.determinePress }
            onBlur={ this.props.action } />;
    }
}

EditInput.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired
};

export default EditInput;
