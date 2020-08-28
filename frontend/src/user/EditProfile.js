import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      redirectToProfile: false,
      error: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
        });
      }
    });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    if (this.state.name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      this.setState({ error: "A Valid Email is required" });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, email } = this.state;
      const user = {
        name,
        email,
      };
      //console.log(user);
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, user).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            redirectToProfile: true,
          });
      });
    }
  };

  render() {
    if (this.state.redirectToProfile) {
      return <Redirect to={`/user/${this.state.id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              value={this.state.email}
            />
          </div>

          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}
