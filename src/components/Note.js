import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

// Bootstrap
import Form from "react-bootstrap/Form";

import API from "../services/api";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";

class Note extends React.Component {
    state = {
        noteList: [],
        archivedNoteList: []
    };

    componentDidMount () {
        if (this.props.loginStatus) {
            this.getNotes();
        }

        // Get archived notes if not in dashboard mode
        if (!this.props.dashboard) {
            this.getArchivedNotes();
        }
    }

    getNotes = () =>
        API.get("/note/getNotes")
            .then(response => {
                this.setState({
                    noteList: response.noteList
                });
            });

    getArchivedNotes = () =>
        API.get("/note/getArchivedNotes")
            .then(response => {
                this.setState({
                    archivedNoteList: response.archivedNoteList
                });
            });

    watchNoteTitle = (e, noteItem) => {
        noteItem.noteTitle = e.target.value;
        this.forceUpdate();
    }

    watchNoteContent = (e, noteItem) => {
        noteItem.noteContent = e.target.value;
        this.forceUpdate();
    }

    checkToSave = (e, noteItem) => {
        if (e.keyCode === 83 && e.metaKey) {
            e.preventDefault();
            this.updateNote(noteItem);
        }
    }

    createNote = () =>
        API.post("/note/createNote")
            .then(() => {
                toast.success("A new Note is created.");
                this.getNotes();
            });

    updateNote = noteItem =>
        API.post("/note/updateNote", {
            noteId: noteItem.noteId,
            noteTitle: noteItem.noteTitle,
            noteContent: noteItem.noteContent
        })
            .then(() => {
                toast.success(`Note "${noteItem.noteTitle}" is updated.`);
                this.getNotes();
            });

    archiveNote = noteItem =>
        API.post("/note/archiveNote", { noteId: noteItem.noteId })
            .then(() => {
                toast.success(`Note "${noteItem.noteTitle}" is archived.`);
                this.getNotes();
            });

    render () {
        const noteList = this.state.noteList.length
            ? this.state.noteList.map(noteItem =>
                <div key={ noteItem.noteId }
                    className={ this.props.dashboard ? "col-12" : "col-12 col-md-6"}>
                    <Form.Control type="text"
                        className="hidingElement"
                        size="lg"
                        placeholder="Untitled"
                        value={ noteItem.noteTitle }
                        onChange={ e => this.watchNoteTitle(e, noteItem) }
                        onKeyDown={ e => this.checkToSave(e, noteItem) } />
                    <p className="text-muted hidingElement">
                        Created: { noteItem.noteCreatedDate }<br />
                        Last Updated: { noteItem.noteUpdatedDate }
                    </p>
                    <Form.Control as="textarea"
                        className="mt-3 mb-3 noteContent hidingElement"
                        value={ noteItem.noteContent }
                        onChange={ e => this.watchNoteContent(e, noteItem) }
                        onKeyDown={ e => this.checkToSave(e, noteItem) } />
                    <p className="text-right">
                        <ConfirmationButton buttonType="secondary"
                            buttonIcon="fas fa-archive"
                            buttonLabel="Archive"
                            action={ () => this.archiveNote(noteItem) }>
                        </ConfirmationButton>
                        <StateButton buttonType="primary"
                            buttonIcon="fas fa-save"
                            buttonLabel="Save"
                            inProgressLabel="Saving"
                            action={ () => this.updateNote(noteItem) }>
                        </StateButton>
                    </p>
                </div>
            )
            : <p className="alert alert-info">You don&apos;t have any notes.</p>;

        const archivedNoteList = this.state.archivedNoteList.length
            ? this.state.archivedNoteList.map(noteItem =>
                <div key={ noteItem.noteId }
                    className={ `col-12 hidingElement${this.props.dashboard ? "" : " col-md-6"}` }>
                    <h4>{ noteItem.noteTitle }</h4>
                    <p className="text-muted">
                        Created: { noteItem.noteCreatedDate }<br />
                        Archived: { noteItem.noteUpdatedDate }
                    </p>
                    <p>{ noteItem.noteContent }</p>
                </div>
            )
            : <p className="alert alert-info">You don&apos;t have any archived notes.</p>;

        return (
            <div id="notes" className="row">
                <div className="col-12">
                    <h3>Notes ({ this.state.noteList.length })</h3>
                    <p className="text-muted">You can use <span className="badge badge-secondary">Ctrl/Cmd + S</span> to save your Notes.</p>
                    <p className="text-right">
                        <StateButton buttonType="primary"
                            buttonIcon="fas fa-plus"
                            buttonLabel="New Note"
                            inProgressLabel="Creating Note"
                            action={ this.createNote }>
                        </StateButton>
                    </p>
                    <div className="row">
                        { noteList }
                    </div>
                    { !this.props.dashboard
                    && <div className="row">
                        <div className="col-12">
                            <h3>Archived Notes</h3>
                        </div>
                        { archivedNoteList }
                    </div>}
                </div>
            </div>
        );
    }
}

Note.propTypes = {
    dashboard: PropTypes.bool,
    loginStatus: PropTypes.bool.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Note);
