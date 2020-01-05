import React, { useState, useEffect } from "react";

import activitiesService from '../services/ActivitiesService';

import UserProfile from './UserProfile';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activities: []};
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }


  getAllActivities() {
    const getActivities = async () => {
      let res = await activitiesService.getAll().then(res => {
        this.setState({activities: res});
        
        console.log(res);
      });
    }
    getActivities();
  }


  render() {
    const searchResults = this.state.activities;
      
    return (
      <div>
        <button onClick={() =>this.getAllActivities()} >Get All Activities</button>
        {/* {this.state.activities} */}

      </div>

      


     
    );
  }
}


export default Stats;
