import React, { Component } from "react";
import axios from "axios";

import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div className="home-main">
        <h1>Welcome to K-Tube App by Mohsen A.</h1>
        {/* <h1>Status: {this.props.loggedInStatus}</h1> */}
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        {/* <button onClick={() => this.handleLogoutClick()}>Logout</button> */}
      </div>
    );
  }
}