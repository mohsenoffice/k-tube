import React, { Component } from "react";
import axios from "axios";

import loginService from '../../services/LoginService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    const getLogin = async () => {
      let res = await loginService.login(email, password, false).catch(error => {
        alert ("Failed to login");
      });
     if(res === "OK"){  
      this.props.handleSuccessfulAuth(email,false);
     }
     if(res == "OK-Admin"){
      this.props.handleSuccessfulAuth(email,true);
     }
      console.log(res);
    }
    getLogin();

    event.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="login-field">
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            </div>

          <div className="login-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}