angular.module('app.chatbox', [])
.controller('ChatboxController', function($scope, $rootScope, $timeout, $window, ServicesFactory){
  $scope.loggedIn = $rootScope.isLoggedIn;
  $scope.activeUser;
  $scope.fullIP = $rootScope.activeUser;
  $scope.mesg = '';
  $scope.userData = $rootScope.userData;

  $scope.messages = [ {username: 'Jen', message: 'Hello'}, {username: 'Fontip', message: 'Hi Honey'}];

  $scope.getAll = function(){

    console.log('get All');
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
      $timeout($scope.getAll, 1000);
    });

  };

  $timeout($scope.getAll, 1000);

  $scope.sendMessage = function(msg){
    var message = {message: msg};

    ServicesFactory.sendMessage(message)
    .then(function(data){
      console.log(data);
      $scope.mesg = '';
    });
  };

  $scope.connectLinkedIn = function(){
    console.log('hit LinkedIn');
    ServicesFactory.connectLinkedIn()
    .then(function(url){
      $window.location.href = url.data;
    });
  }

  $scope.getAll();


});