import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import './KTube.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {      
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin(data) {
    this.setState({
      user: data
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path={"/admin"}
              render={props => (
                <Admin
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            />

            
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}