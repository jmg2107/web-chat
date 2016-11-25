angular.module('app.chatbox', [])
.controller('ChatboxController', function($scope, $rootScope, ServicesFactory){
  $scope.loggedIn = $rootScope.isLoggedIn;

  $scope.messages = [ {username: 'Jen', message: 'Hello'}, {username: 'Fontip', message: 'Hi Honey'}];

  $scope.getAll = function(){
    ServicesFactory.getMessages()
    .then(function(data){
      console.log(data);
      $scope.messages = data.data;
    });
  };

  $scope.getAll();

});