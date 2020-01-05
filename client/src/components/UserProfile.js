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
    };

    return {
      getName: getName,
      setName: setName,
      isLogedIn: isLogedIn,
      logout: logout
    }
  
  })();
  
  export default UserProfile;