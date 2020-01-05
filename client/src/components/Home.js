import React, { Component } from "react";
import axios from "axios";

import Registration from "./auth/Registration";
import Login from "./auth/Login";

import UserProfile from './UserProfile';



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data, isAdmin) {
    this.props.handleLogin(data);
    UserProfile.setName(data);
    UserProfile.setAdmin(isAdmin);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div className="home-main">
        <h1>Welcome to KTube App by Mohsen A.</h1>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}