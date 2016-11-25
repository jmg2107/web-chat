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

  var sendMessage = function(msg){
    return $http({
      method: 'POST',
      url: '/api/createMessage',
      data: msg
    })
  };

  var connectLinkedIn = function(){
    return $http({
      method: 'GET',
      url: '/api/LinkedIn'
    });
  };

  return {
    getMessages: getMessages,
    loginUser: loginUser,
    sendMessage: sendMessage,
    connectLinkedIn: connectLinkedIn
  }

});