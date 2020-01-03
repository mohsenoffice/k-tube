import React, { Component } from "react";
import axios from "axios";

import registerService from '../../services/RegisterService';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const { email, password, password_confirmation } = this.state;
    if(password === password_confirmation){
      const postRegisteration = async () => {
        let res = await registerService.register(email, password, false).catch(error =>{
          alert("Failed to register user!");
        });
        if(res === "OK"){
          alert("Welcome " + email)
          this.props.handleSuccessfulAuth(email);
        }
      };
      postRegisteration();
    }else{
      alert("Those passwords didn't match!");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}