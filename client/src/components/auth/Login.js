import React, { Component } from 'react';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
    };
  }

  render() {
    const { email, pass } = this.state;

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChange}
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChange}
                      placeholder="Password"
                      name="pass"
                      type="password"
                      value={pass}
                    />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, pass } = this.state;
    const user = { email, pass };
    console.log(user);
  };
}

export default Login;
