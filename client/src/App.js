import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from 'react';

import './App.css';
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/register" component={Register} />

            <Route exact path="/login" component={Login} />
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
