var UserProfile = (function() {
    var full_name = "";
    var full_Type = "";
    var full_Email = "";
  
    var getName = function() {
      return full_name;    
      // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getType = function() {
      return full_Type;    
      // Or pull this from cookie/localStorage
    };
  
    var setType = function(type) {
      full_Type = type;     
      // Also set this in cookie/localStorage
    };

    var getEmail = function() {
      return full_Email;    
      // Or pull this from cookie/localStorage
    };
  
    var setEmail = function(email) {
      full_Email = email;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName,
      getType: getType,
      setType: setType,
      getEmail: getEmail,
      setEmail: setEmail
    }
  
})();
  
export default UserProfile;