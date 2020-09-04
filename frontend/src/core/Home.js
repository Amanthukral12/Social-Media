import React from "react";
import Posts from "../post/Posts";
function Home() {
  return (
    <div>
      <div className="jumbotron">
        <h2>Kalashala</h2>
        <p className="lead">Welcome to the Home page</p>
      </div>
      <div className="container">
        <Posts />
      </div>
    </div>
  );
}

export default Home;
