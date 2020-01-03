import React from "react";
import Search from './Search';

const Dashboard = props => {
  return (
    <div>
      <div>
        <h1>KTube Search</h1>
        <h1>Welcome{props.loggedInStatus}</h1>
        { props.loggedInStatus === "LOGGED_IN" ? <Search /> : null }

      </div>
    </div>
  );
};

export default Dashboard;