import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/default.jpg";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = (posts) => {
    return (
      <div className="row d-flex align-items-center justify-content-center display-flex">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="bg-white col-md-7 mb-5 mt-5 border" key={i}>
              <h6 className="text-primary mb-3 mt-3">
                <Link to={`${posterId}`}>{posterName}</Link>
              </h6>
              <img
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                style={{ height: "614px", width: "614px" }}
                onError={(i) => (i.target.src = `${DefaultPost}`)}
              />
              <p className="card-text">{post.body}</p>
              {new Date(post.created).toDateString()}
              {/* <Link
                to={`/posts/${post._id}`}
                className="btn btn-primary btn-raised"
              >
                Read More
              </Link> */}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        {/* <h2 className="mt-5 mb-5">Recent Posts</h2> */}

        {this.renderPosts(posts)}
      </div>
    );
  }
}
