import React, { useState, useEffect } from "react";

import activitiesService from '../services/ActivitiesService';

import UserProfile from './UserProfile';

import '../KTube.css';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activities: []};
  }



  getAllActivities() {
    const getActivities = async () => {
      let res = await activitiesService.getAll().then(res => {
        this.setState({activities: res});
        
        console.log(this.state.activities);
      });
    }
    getActivities();
  }


  renderActivitiesTable(){
    return this.state.activities.map((activity, index) => {
      const { user, searches, watched, duration } = activity //destructuring
      return (
         <tr key={user}>
            <td className="activities-data">{user}</td>
            <td className="activities-data">{searches.map((search)=>{return search +", "})}</td>
            <td className="activities-data">{watched.map((video)=>{return <li className="watched">{video.videoId} : {video.title} </li>})}</td>
            <td className="activities-data">{duration}</td>
         </tr>
      )
   })
  }

  renderActivitiesHeader() {
       return (<tr >
                <th key="user" className="table-title">User</th>
                <th key="searches" className="table-title">Searches</th>
                <th key="watched" className="table-title">Warched</th>
                <th key="duration" className="table-title">Duration (sec.)</th>
              </tr>
       );
 }
 

  render() {
    const searchResults = this.state.activities;
      
    return (
      <div>
        <div className="activities-button"><button onClick={() =>this.getAllActivities()} >Get All Activities</button></div>
        <table id='activities' className="activities-table">
               <tbody>
               {this.renderActivitiesHeader()}
                  {this.renderActivitiesTable()}
               </tbody>
        </table>
      </div>
    );
  }
}


export default Stats;
