angular.module('app.services', [])
.factory('ServicesFactory', function($http){

  var getMessages = function(){
    return $http({
      method: 'GET',
      url: '/api/getMessages'
    });
  }

  return {
    getMessages: getMessages
  }

});