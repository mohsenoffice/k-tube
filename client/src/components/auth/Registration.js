import React, { Component } from "react";
import axios from "axios";

import registerService from '../../services/RegisterService';

import UserProfile from '../UserProfile';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      isAdmin: false,
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //alert(event.target.name +"----"+event.target.value);
    //alert(this.state.isAdmin);

  }

  toggleChange = () => {
    this.setState({
      isAdmin: !this.state.isAdmin,
    });
  }

  handleSubmit(event) {
    const { email, password, password_confirmation, isAdmin } = this.state;
    if(password === password_confirmation){
      const postRegisteration = async () => {
        let res = await registerService.register(email, password, isAdmin).catch(error =>{
          alert("Failed to register user!");
        });
        if(res === "OK"){
          UserProfile.setName(email);
          
          this.props.handleSuccessfulAuth(email, isAdmin);
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
      
      <div className="login">
        <h2>Register</h2>
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

          <div className="login-field">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Password confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="login-field">
            <input
              type="checkbox"
              name="isAdmin"
              placeholder="isAdmin"
              checked={this.state.isAdmin}
              onChange={this.toggleChange}
            />
            <label >Is admin</label>
          </div>
          
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}