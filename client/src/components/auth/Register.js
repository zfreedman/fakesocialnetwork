import axios from "axios";
import classnames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import React, { Component } from 'react';
import { registerUser } from "../../actions/auth";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: {},
      name: "",
      pass: "",
      pass2: "",
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>

              <p className="lead text-center">Create your DevConnector account</p>

              <form
                onSubmit={this.onSubmit}
                noValidate
              >
                <TextFieldGroup
                  error={errors.name}
                  onChange={this.onChange}
                  name="name"
                  placeholder="Name"
                  type="string"
                  value={this.state.name}
                />

                <TextFieldGroup
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email address"
                  type="email"
                  value={this.state.email}
                />

                <TextFieldGroup
                  error={errors.pass}
                  onChange={this.onChange}
                  name="pass"
                  placeholder="Password"
                  type="password"
                  value={this.state.pass}
                />

                <TextFieldGroup
                  error={errors.pass2}
                  onChange={this.onChange}
                  name="pass2"
                  placeholder="Confirm password"
                  type="password"
                  value={this.state.pass2}
                />
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // UNSAFE_componentWillReceiveProps (nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.errors !== undefined) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }
  static getDerivedStateFromProps (nextProps) {
    // console.log(nextProps);
    if (nextProps.errors === undefined) return;

    return { errors: nextProps.errors };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, name, pass, pass2 } = this.state;
    const newUser = {
      email,
      name,
      pass,
      pass2
    };
    
    const { history, registerUser } = this.props;
    
    return registerUser(newUser, history);
    // console.log(newUser);
  };
}

Register.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  registerUser: propTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { auth, errors } = state;

  return {
    auth,
    errors,
  };
};

const mapDispatchToProps = {
  registerUser,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Register);
