import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/default.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page:1
    };
  }

  loadPosts = page => {
    list(page).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ posts: data });
        }
    });
};

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
};

loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
};

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";

          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-md-3" key={i}>
              <div>
                <Link to={`${posterId}`}>{posterName} </Link>
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Link>
              </div>
              
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts,page } = this.state;
    return (
      <div>
        <br />
        <br />
        <h2 className="mt-5 mb-5">
                    {!posts.length ? "No more posts!" : "Recent Posts"}
                </h2>
        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
              className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
              onClick={() => this.loadLess(1)}
          >
              Previous ({this.state.page - 1})
          </button>
      ) : (
          ""
      )}

      {posts.length ? (
          <button
              className="btn btn-raised btn-success mt-5 mb-5"
              onClick={() => this.loadMore(1)}
          >
              Next ({page + 1})
          </button>
      ) : (
          ""
      )}
      </div>
    );
  }
}

export default Posts;
