import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/default.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
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
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-md-2" key={i}>
              <div>
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      height: "auto",
                    }}
                  />
                </Link>
                <Link to={`${posterId}`}>{posterName} </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h2 className="mb-5">
          {!posts.length ? "Loading..." : "Recent Posts"}
        </h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
