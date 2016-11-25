angular.module('app.chatbox', [])
.controller('ChatboxController', function($scope, $rootScope, $location, ServicesFactory){
  $scope.loggedIn = $rootScope.isLoggedIn;
  $scope.activeUser;
  $scope.fullIP = $rootScope.activeUser;
  $scope.mesg = '';

  $scope.messages = [ {username: 'Jen', message: 'Hello'}, {username: 'Fontip', message: 'Hi Honey'}];

  $scope.getAll = function(){

    var usr = $rootScope.activeUser.split('.');
    $scope.activeUser = usr[0];

    ServicesFactory.getMessages()
    .then(function(data){
      console.log(data);
      data.data.forEach(function(chat){
        var name = chat.username.split('.');
        chat.name = name[0];
      });
      $scope.messages = data.data;
    });
  };

  $scope.sendMessage = function(msg){
    var message = {message: msg};

    ServicesFactory.sendMessage(message)
    .then(function(data){
      console.log(data);
      $scope.mesg = '';
      $scope.getAll();
    });
  };

  $scope.connectLinkedIn = function(){
    console.log('hit LinkedIn');
    ServicesFactory.connectLinkedIn()
    .then(function(url){
      $location.path = url.data;
    });
  }

  $scope.getAll();


});