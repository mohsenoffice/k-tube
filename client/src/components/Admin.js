import React from "react";
import Stats from './Stats';
import UserProfile from './UserProfile';

const logout = function(){
  UserProfile.logout();
  window.location.href = '/';
};



const Admin = props => {
  return (
    <div>
      <div className="home-main">
          <h1>KTube Admin</h1>
          <div className="logout"><button onClick={() => logout()}>Logout</button></div>
          {UserProfile.isAdmin() && UserProfile.isLogedIn() ?<Stats /> : null}

      </div>


    </div>
  );
};

export default Admin;