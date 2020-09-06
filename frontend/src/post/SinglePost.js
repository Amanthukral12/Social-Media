import React, { Component } from "react";
import { singlePost } from "./apiPost";
import { Link } from "react-router-dom";
export default class SinglePost extends Component {
  state = {
    post: "",
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ post: data });
      }
    });
  };

  renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : "Unknown";
    return (
      <div className="row d-flex align-items-center justify-content-center display-flex">
        <div className="bg-white col-md-7 mb-5 mt-5 border">
          <h6 className="text-primary mb-3 mt-3">
            <Link to={`${posterId}`}>{posterName}</Link>
          </h6>

          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            style={{ height: "614px", width: "614px" }}
          />
          <p className="card-text">{post.body}</p>
          <p>{new Date(post.created).toDateString()}</p>
          <div className="inline-block">
            <Link
              to={`${posterId}`}
              className="btn btn-primary btn-raised mr-5"
            >
              Back to Profile
            </Link>
            <button className="btn btn-raised btn-warning mr-5">Update</button>
            <button className="btn btn-raised btn-danger">Delete</button>
          </div>
          <DropdownButton title="Dropdown">
            <MenuItem href="#books">Books</MenuItem>
            <MenuItem href="#podcasts">Podcasts</MenuItem>
            <MenuItem href="#">Tech I Like</MenuItem>
            <MenuItem href="#">About me</MenuItem>
            <MenuItem href="#addBlog">Add a Blog</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  };

  render() {
    const { post } = this.state;
    return <div className="container">{this.renderPost(post)}</div>;
  }
}
