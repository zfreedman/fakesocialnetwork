import axios from "axios";
import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      pass: "",
      pass2: "",
      errors: {},
    };
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>

              <p className="lead text-center">Create your DevConnector account</p>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    name="name"
                    onChange={this.onChange}
                    placeholder="Name"  
                    type="text"
                    value={this.state.name}
                  />
                </div>

                <div className="form-group">
                  <input
                      className="form-control form-control-lg"
                      name="email"
                      onChange={this.onChange}
                      placeholder="Email address"  
                      value={this.state.email}
                    />

                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>

                <div className="form-group">
                  <input
                      className="form-control form-control-lg"
                      name="pass"
                      onChange={this.onChange}
                      placeholder="Password"  
                      type="password"
                      value={this.state.pass}
                    />
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    name="pass2"
                    onChange={this.onChange}
                    placeholder="Confirm password"  
                    type="password"
                    value={this.state.pass2}
                  />
                </div>
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
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

    axios.post("/api/users/register", newUser).then(result => {
      console.log(result);
    })
    .catch(err => {
      // console.log(err);
      console.log(err.response);
    });
    // console.log(newUser);
  };
}

export default Register;
