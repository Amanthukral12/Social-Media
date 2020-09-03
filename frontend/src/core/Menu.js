import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else {
    return { color: "#ffffff" };
  }
};

function Menu({ history }) {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/users")}
            to="/users"
          >
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/findpeople`}
            style={isActive(history, `/findpeople`)}
          >
            Dicover People
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item ml-auto">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item ml-auto">
              <Link
                className="nav-link"
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {`${isAuthenticated().user.name}'s profile`}{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/post/create`}
                style={isActive(history, `/post/create`)}
              >
                New Post
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={isActive(history, "/signup")}
                onClick={() => signout(() => history.push("/"))}
              >
                Sign Out
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
