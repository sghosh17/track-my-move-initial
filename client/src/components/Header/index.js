import React from "react";
import { Link, NavLink } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="titleDiv">
          <img
            src="/logo.png"
            alt="Track My Move"
            className="header-logo mb-4"
          />
          <h1 className="mt-4">Track My Move</h1>

          <p className="m-0">
            One stop shop for all you need when buying a property.
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              {Auth.getProfile()?.data?.role === "Buyer" ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-lg btn-info m-2"
                        : "btn btn-lg btn-light m-2"
                    }
                    to="/"
                  >
                    Roadmap
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-lg btn-info m-2"
                        : "btn btn-lg btn-light m-2"
                    }
                    to="/me"
                  >
                    {Auth.getProfile().data.username}'s profile
                  </NavLink>
                </>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-lg btn-info m-2"
                      : "btn btn-lg btn-light m-2"
                  }
                  to="/"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-lg btn-info m-2"
                    : "btn btn-lg btn-light m-2"
                }
                to="/about"
              >
                About Us
              </NavLink>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
