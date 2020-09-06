import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h4 className="text-primary">Posts</h4>
            <p className="lead">{posts.length}</p>
          </div>
          <div className="col-md-4">
            <h4 className="text-primary">Followers</h4>
            <p className="lead">{followers.length}</p>
          </div>
          <div className="col-md-4">
            <h4 className="text-primary">Following</h4>
            <p className="lead">{following.length}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          {posts.map((post, i) => {
            return (
              <div className="card col-md-4 mb-2 border-darken-3" key={i}>
                <div className="card-body">
                  <Link to={`/post/${post._id}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                      alt=""
                      className="img-thunbnail"
                      style={{ height: "200px", width: "100%" }}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
