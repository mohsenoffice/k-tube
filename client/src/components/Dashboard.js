import React from "react";
import Search from './Search';
import UserProfile from './UserProfile';
import '../index.css';

const logout = function(){
  UserProfile.logout();
  window.location.href = '/';
};
const Dashboard = props => {
  return (
    <div>
      <div>
        <div className="home-main">
          <h1>KTube Search</h1>
          { UserProfile.isLogedIn() ? <h1>Welcome {UserProfile.getName()}  <button onClick={() => logout()}>Logout</button> </h1> :
           <a href="/">Login please!  </a> }
        </div>
        { UserProfile.isLogedIn() ? <Search /> : null }
      </div>
    </div>
  );
};

export default Dashboard;