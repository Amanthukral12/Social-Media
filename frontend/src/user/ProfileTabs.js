import React, { Component } from "react";

export default class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;
    return (
      <div>
        <div>
          Following
          {JSON.stringify(following)}
        </div>
        <div>
          followers
          {JSON.stringify(followers)}
        </div>
      </div>
    );
  }
}
