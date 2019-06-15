import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import API from "../services/api";

class Note extends React.Component {
    state = {
        note: ""
    };

    componentDidMount () {
        this.getNote();
    }

    getNote = () => {
        API.get("/note/getNote")
            .then(response => {
                this.setState({
                    note: response.data.data.note
                });
            });
    }

    updateNoteContent = e => {
        this.setState({ note: e.target.value });
    }

    checkToSave = e => {
        if (e.keyCode === 83 && e.metaKey) {
            e.preventDefault();
            this.updateNote();
        }
    }

    updateNote = () => {
        API.post("/note/updateNote", { noteContent: this.state.note })
            .then(() => {
                toast.success("Note is updated.");
                this.getNote();
            });
    }

    archiveNote = () => {
        API.post("/note/archiveNote")
            .then(() => {
                toast.success("Note is archived.");
                this.setState({ note: "" });
            });
    }

    render () {
        return (
            <section id="notes" className="col-12 col-lg-4">
                <h3>Notes</h3>
                <p className="text-muted">Access it anywhere.</p>
                <textarea className={`form-control mb-3 h-50 ${this.props.hideEverything ? "hidingElement" : ""}`}
                    value={ this.state.note }
                    onChange={ this.updateNoteContent }
                    onKeyDown={ this.checkToSave }></textarea>
                <p className="text-right text-muted">*You can use <span className="badge badge-secondary">Ctrl/Cmd + S</span> to save the Note.</p>
                <p className="text-right">
                    <button className="btn btn-secondary" onClick={ this.archiveNote }>
                        <i className="fas fa-archive"></i> Archive
                    </button>
                    <button className="btn btn-primary" onClick={ this.updateNote }>
                        <i className="fas fa-save"></i> Save
                    </button>
                </p>
            </section>
        );
    }
}

Note.propTypes = {
    hideEverything: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Note);
