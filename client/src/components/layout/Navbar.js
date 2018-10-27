import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import React, { Component } from 'react';

import { logoutUser } from "../../actions/auth";

class Navbar extends Component {
  render () {
    const { isAuthenticated, user } = this.props.auth;
    
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={this.onLogoutClick}
          >
            <img
              alt={user.name}
              className="rounded-circle"
              src={user.avatar}
              style={{
                marginRight: "5px",
                width: "25px",
              }}
              title="You must ave a Gravatar connected to your email to display an image"
            />

            {" "}
            
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Profiles
                </Link>
              </li>
            </ul>

            { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    )
  }

  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
    console.log(this.props.history);
    // this.props.history.push("/");
  };
}

Navbar.propTypes = {
  auth: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
};

const mapStateToProps = ({ auth, }) => ({
  auth,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
