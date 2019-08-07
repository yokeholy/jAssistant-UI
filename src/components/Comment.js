import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

import API from "../services/api";
import ConfirmationButton from "./fragments/ConfirmationButton";
import StateButton from "./fragments/StateButton";

class Comment extends React.Component {
    state = {
        commentList: [],
        newCommentContent: ""
    };

    componentDidMount () {
        this.getCommentList();
    }

    getCommentList = () =>
        API.post("/comment/getCommentList", {
            commentType: this.props.commentType,
            entityId: this.props.entityId
        })
            .then(response => {
                this.setState({
                    commentList: response.commentList
                });
            });

    updateNewComment = e => {
        this.setState({ newCommentContent: e.target.value });
    }

    createComment = e => {
        e.preventDefault();
        return API.post("/comment/createComment", {
            commentType: this.props.commentType,
            entityId: this.props.entityId,
            commentContent: this.state.newCommentContent
        })
            .then(() => {
                toast.success("New comment is created successfully.");
                this.setState({newCommentContent: ""});
                this.getCommentList();
                this.props.updateCommentCount(true);
            });
    }

    deleteComment = comment =>
        API.post("/comment/deleteComment", { commentId: comment.commentId })
            .then(() => {
                toast.success("Comment is deleted.");
                this.getCommentList();
                this.props.updateCommentCount(false);
            });

    render () {
        return (
            <div>
                { this.state.commentList.length
                    ? this.state.commentList.map(comment =>
                        <div key={ comment.commentId } className="row">
                            <div className="col-10">
                                <p className="hidingElement">
                                    <span className="text-muted">{ moment(comment.commentCreatedDate).fromNow() }</span><br/>
                                    { comment.commentContent }
                                </p>
                            </div>
                            <div className="col-2 text-right">
                                <ConfirmationButton buttonType="outline-danger"
                                    buttonIcon="far fa-trash-alt"
                                    buttonLabel=""
                                    buttonSize="sm"
                                    action={ () => this.deleteComment(comment) }>
                                </ConfirmationButton>
                            </div>
                        </div>)
                    : null
                }
                <form>
                    <div className="input-group">
                        <input type="text"
                            className="form-control hidingElement"
                            value={ this.state.newCommentContent }
                            onChange={ this.updateNewComment } />
                        <div className="input-group-append">
                            <StateButton buttonType="primary"
                                buttonIcon="fas fa-plus"
                                buttonLabel="Comment"
                                inProgressLabel="Commenting"
                                action={ this.createComment }>
                            </StateButton>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Comment.propTypes = {
    commentType: PropTypes.number.isRequired,
    entityId: PropTypes.number.isRequired,
    updateCommentCount: PropTypes.func.isRequired
};

// Map JData from Redux to this component
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);
