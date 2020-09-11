import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DefaultPost from "../images/default.jpg";
import Dropdown from "react-bootstrap/Dropdown";
export default class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    like: false,
    likes: 0,
  };

  checkLike = (likes) => {
    const userId = isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
        });
      }
    });
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;
    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ like: !this.state.like, likes: data.likes.length });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : "Unknown";
    const { like, likes } = this.state;

    return (
      <div className="row d-flex align-items-center justify-content-center display-flex">
        <div className="bg-white col-md-7 mb-5 mt-5 border">
          <h6 className="d-inline text-primary mb-3 mt-3">
            <Link to={`${posterId}`}>{posterName}</Link>
          </h6>

          <Dropdown className="d-inline float-right mr-1">
            <Dropdown.Toggle variant="success"></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/post/edit/${post._id}`}>Update</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={this.deleteConfirmed}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            style={{ height: "614px", width: "614px" }}
            onError={(i) => (i.target.src = `${DefaultPost}`)}
          />
          <div onClick={this.likeToggle}>{likes} Like</div>
          <p className="card-text">{post.body}</p>
          <p>{new Date(post.created).toDateString()}</p>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={"/"} />;
    }
    const { post } = this.state;
    return <div className="container">{this.renderPost(post)}</div>;
  }
}
