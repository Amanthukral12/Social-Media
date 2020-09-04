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

  renderPosts = (posts) => (
    <div className="row">
      {posts.map((post, i) => (
        <div className="card col-md-12 mb-3 border" key={i}>
          {/* <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${process.env.REACT_APP_API_URL}/user/photo/${
              user._id
            }?${new Date().getTime()}`}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          /> */}

          <p className="card-text">{post.body}</p>
          <Link
            to={`/posts/${post._id}`}
            className="btn btn-primary btn-raised"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );

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
