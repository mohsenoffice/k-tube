import React from "react";
import Stats from './Stats';
import UserProfile from './UserProfile';
import '../index.css';

const logout = function(){
  UserProfile.logout();
  window.location.href = '/';
};



const Admin = props => {
  return (
    <div>
      <div className="home-main">
          <h1>KTube Admin</h1>
          <button onClick={() => logout()}>Logout</button>
          {UserProfile.isAdmin() ?<Stats /> : null}
      </div>


    </div>
  );
};

export default Admin;