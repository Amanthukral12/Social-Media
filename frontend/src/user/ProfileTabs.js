import React, { Component } from "react";

export default class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-primary">Followers</h4>
            <p className="lead">{followers.length}</p>
          </div>
          <div className="col-md-6">
            <h4 className="text-primary">Following</h4>
            <p className="lead">{following.length}</p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <h4 className="text-primary">Posts</h4>
        </div>
      </div>
    );
  }
}
