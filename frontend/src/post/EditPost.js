import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/default.jpg";

export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      body: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
    };
  }
  init = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          body: data.body,
          error: "",
        });
      }
    });
  };

  

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  isValid = () => {
    const { fileSize, body } = this.state;
    if (fileSize > 10240) {
      this.setState({ error: "File size should be less than 10mb" });
      return false;
    }
    if (body.length === 0) {
      this.setState({ error: "can't be empty" });
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
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({ body: "", redirectToProfile: true });
        }
      });
    }
  };

  editPostForm = (body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
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
        Update Post
      </button>
    </form>
  );

  render() {
    const { id, body, redirectToProfile, error } = this.state;
    console.log(id);
    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    const photoUrl=id
    ? `${
      process.env.REACT_APP_API_URL
  }/post/photo/${id}?${new Date().getTime()}`
  : DefaultPost; 
    return (
      <div className="container">
        <br />
        <br />
        <h2 className="mb-5">Edit Post</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    
                />
        {isAuthenticated().user.role === "admin" &&
            this.editPostForm( body)}

        {isAuthenticated().user.id === id &&
            this.editPostForm( body)}               
      </div>
    );
  }
}
