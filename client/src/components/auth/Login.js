import classnames from "classnames";
import { connect } from "react-redux";
import propTypes from "prop-types";
import React, { Component } from 'react';

import { loginUser } from "../../actions/auth";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
    };
  }

  render() {
    const { email, errors, pass, } = this.state;

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    error={errors.email}
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

                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
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

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.auth.isAuthenticated)
      nextProps.history.push("/dashboard");
    if (nextProps.errors !== undefined)
      return { errors: nextProps.errors };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, pass } = this.state;
    const user = { email, pass };

    // console.log(user);
    this.props.loginUser(user);
  };
}

Login.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired,
};

const mapStateToProps = ({ auth, errors, }) => ({
  auth,
  errors,
});

const mapDispatchToProps = { loginUser, };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
