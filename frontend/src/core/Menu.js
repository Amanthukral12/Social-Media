import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {
      color: "#ff9900",
      fontWeight: "bold",
      lineHeight: 2,
      paddingTop: "0rem",
      paddingBottom: "0rem",
      fontSize: 24,
    };
  else {
    return {
      color: "#ffffff",
      fontWeight: "bold",
    };
  }
};

function Menu({ history }) {
  return (
    <>
      <div>
        <ul
          className="nav nav-tabs bg-primary"
          style={{
            overflow: "hidden",
            position: "fixed",
            width: "100%",
            zIndex: "1",
            lineHeight: "0.7",
          }}
        >
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              Users
            </Link>
          </li> */}

          <li
            className="nav-item"
            style={{
              marginLeft: "39rem",
              marginRight: "23rem",
              fontSize: "20",
            }}
          >
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              KALASHALA
            </Link>
          </li>
          {!isAuthenticated() && (
            <>
              <li className="nav-item">
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
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                >
                  {`${isAuthenticated().user.name}'s profile`}{" "}
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
      <div>
        <ul
          className="nav nav-tabs bg-primary"
          style={{
            overflow: "hidden",
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: "1",
            textAlign: "center",
            marginTop: "20px",
            lineHeight: "0.7",
          }}
        >
          <li className="nav-item col-3">
            <Link
              className="nav-link"
              to={`/findpeople`}
              style={isActive(history, `/findpeople`)}
            >
              Dicover People
            </Link>
          </li>
          <li className="nav-item col-6">
            <Link
              className="nav-link center"
              to={`/post/create`}
              style={isActive(history, `/post/create`)}
            >
              New Post
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default withRouter(Menu);
