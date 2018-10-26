import axios from "axios";
import classnames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import React, { Component } from 'react';
import { registerUser } from "../../actions/auth";
import { withRouter } from "react-router-dom";

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
                <div className="form-group">
                  <input
                    className={
                      classnames(
                        "form-control form-control-lg",
                        {
                          "is-invalid": errors.name,
                        }
                      )
                    }
                    name="name"
                    onChange={this.onChange}
                    placeholder="Name"  
                    type="text"
                    value={this.state.name}
                  />

                  {
                    errors.name !== undefined
                      && (
                        <div className="invalid-feedback">
                          {errors.name}
                        </div>
                      )
                  }
                </div>

                <div className="form-group">
                  <input
                      className={
                        classnames(
                          "form-control form-control-lg",
                          {
                            "is-invalid": errors.email,
                          }
                        )
                      }
                      name="email"
                      onChange={this.onChange}
                      placeholder="Email address"  
                      value={this.state.email}
                    />

                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  
                  {
                    errors.email !== undefined
                      && (
                        <div className="invalid-feedback">
                          {errors.email}
                        </div>
                      )
                  }
                </div>

                <div className="form-group">
                  <input
                      className={
                        classnames(
                          "form-control form-control-lg",
                          {
                            "is-invalid": errors.pass,
                          }
                        )
                      }
                      name="pass"
                      onChange={this.onChange}
                      placeholder="Password"  
                      type="password"
                      value={this.state.pass}
                    />

                  {
                    errors.pass !== undefined
                      && (
                        <div className="invalid-feedback">
                          {errors.pass}
                        </div>
                      )
                  }
                </div>

                <div className="form-group">
                  <input
                    className={
                      classnames(
                        "form-control form-control-lg",
                        {
                          "is-invalid": errors.pass2,
                        }
                      )
                    }
                    name="pass2"
                    onChange={this.onChange}
                    placeholder="Confirm password"  
                    type="password"
                    value={this.state.pass2}
                  />

                  {
                    errors.pass2 !== undefined
                      && (
                        <div className="invalid-feedback">
                          {errors.pass2}
                        </div>
                      )
                  }
                </div>
                
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
