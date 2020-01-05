import { get } from "mongoose";

var UserProfile = (function() {
  
    var getName = function() {
      return localStorage.getItem('name');
    };
  
    var setName = function(name) {
        localStorage.setItem('name', name);
    };
  
    var isLogedIn = function(){
        return !!getName();
    };

    var logout = function(){
          setName("");
          setAdmin(false);          
    };

    var setAdmin = function(isAdmin) {
        localStorage.setItem('isAdmin', isAdmin);
    };

    var isAdmin = function(isAdmin) {
        return localStorage.getItem('isAdmin') === "true";
    };

    return {
      getName: getName,
      setName: setName,
      isLogedIn: isLogedIn,
      logout: logout,
      setAdmin: setAdmin,
      isAdmin: isAdmin
    }
  
  })();
  
  export default UserProfile;