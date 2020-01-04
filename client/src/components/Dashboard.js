import React from "react";
import Search from './Search';

import '../index.css';

const Dashboard = props => {
  return (
    <div>
      <div>
        <div className="home-main">
          <h1>KTube Search</h1>
          <h1>Welcome{props.loggedInStatus}</h1>
        </div>
        {/* { props.loggedInStatus === "LOGGED_IN" ? <Search /> : null } */}
        <Search />
      </div>
    </div>
  );
};

export default Dashboard;