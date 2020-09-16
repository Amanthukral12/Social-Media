import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

export default class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };
  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0) {
      this.setState({ error: "comments can not be empty" });
      return false;
    }
    return true;
  };

  addComment = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          this.props.updateComments(data.comments);
        }
      });
    }
  };
  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };
  render() {
    const { comments } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Comments</h1>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Leave a comment"
              value={this.state.text}
              style={{
                borderRadius: "20px",
                lineHeight: "2",
                width: "100%",
                outlineWidth: "0px",
              }}
              onChange={this.handleChange}
            />
          </div>
        </form>

        <hr />
        <div className="col-md-12">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, i) => (
            <div key={i}>
              <Link to={`/user/${comment.postedBy._id}`}>
                <img
                  style={{
                    borderRadius: "50%",
                    border: "1px solid black",
                    height: "30px",
                    width: "30px",
                  }}
                  className="float-left mr-2"
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                  onError={(i) => (i.target.src = `${DefaultProfile}`)}
                  alt={comment.postedBy.name}
                />
              </Link>
              <p
                className="d-inline card-text"
                style={{ wordBreak: "break-word" }}
              >
                <Link to={`/user/${comment.postedBy._id}`}>
                  {comment.postedBy.name}
                </Link>{" "}
                {comment.text}
              </p>
              <span>
                {isAuthenticated().user &&
                  isAuthenticated().user._id === comment.postedBy._id && (
                    <>
                      <button
                        className="btn float-right"
                        onClick={() => this.deleteConfirmed(comment)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </>
                  )}
              </span>
              <p style={{ fontSize: "12px", color: "#8E8E8E" }}>
                {new Date(comment.created).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
