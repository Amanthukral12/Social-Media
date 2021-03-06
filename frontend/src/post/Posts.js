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
            <div className="col-md-3" key={i}>
              <div>
                <Link to={`${posterId}`}>{posterName} </Link>
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "8px",
                      marginBottom:"10px",
                      border:"1px solid black"
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
    const { posts } = this.state;
    return (
      <div>
        <br />
        <br />
        
        {this.renderPosts(posts)}

        <br />
        <br />
      </div>
    );
  }
}

export default Posts;
