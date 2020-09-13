import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
export default class Comment extends Component {
  state = {
    text: "",
  };

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  addComment = (e) => {
    e.preventDefault();
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
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Comments</h1>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Leave a comment"
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
      </div>
    );
  }
}
