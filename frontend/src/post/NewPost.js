import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { body, fileSize } = this.state;
    if (fileSize > 10240) {
      this.setState({ error: "File size should be less than 10mb" });
      return false;
    }

    if (body.length === 0) {
      this.setState({ error: "Body is required" });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize =
      name === "photo" ? Math.round(event.target.files[0].size / 1024) : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      // console.log(user);
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({ photo: "", body: "", redirectToProfile: true });
        }
      });
    }
  };

  newPostForm = (body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post image</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Post
      </button>
    </form>
  );

  render() {
    const { body, photo, user, error, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="container">
        <h2 className=" mb-5">Create a new post</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {this.newPostForm(body)}
      </div>
    );
  }
}

export default NewPost;
