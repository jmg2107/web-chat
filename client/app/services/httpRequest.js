angular.module('app.services', [])
.factory('ServicesFactory', function($http){

  var getMessages = function(){
    return $http({
      method: 'GET',
      url: '/api/getMessages'
    });
  };

  var loginUser = function(usr){
    return $http({
      method: 'POST',
      data: usr,
      url: '/api/createUser'
    });
  };

  return {
    getMessages: getMessages,
    loginUser: loginUser
  }

});