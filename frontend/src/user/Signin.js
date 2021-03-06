import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    signin(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <br /> <br />
        <h2 className="mb-5">Signin</h2>
        <hr />
        <SocialLogin/>
        <hr />
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <form action="">
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={this.state.password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
        <p>
          <Link to="/forgot-password"> Forgot Password</Link>
        </p>
      </div>
    );
  }
}
