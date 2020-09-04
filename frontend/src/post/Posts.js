import React, { Component } from "react";
import { list } from "./apiPost";

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
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="card col-md-12 mb-5 border" key={i}>
              <h6 className="text-primary">
                <Link to={`${posterId}`}>{posterName}</Link>
              </h6>
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
