angular.module('app.chatbox', [])
.controller('ChatboxController', function($scope, $rootScope, $timeout, $window, ServicesFactory){
  $scope.loggedIn = $rootScope.isLoggedIn;
  $scope.activeUser;
  $scope.fullIP = window.localStorage.getItem('activeUser');
  $scope.mesg = '';
  $scope.userData = window.localStorage.getItem('userData') === 'false' ? false :  window.localStorage.getItem('userData') ;

  $scope.messages = [];

  $scope.getAll = function(){
    var usr = $rootScope.activeUser.split('.');
    $scope.activeUser = usr[0];


    ServicesFactory.getMessages()
    .then(function(data){
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
    ServicesFactory.connectLinkedIn()
    .then(function(url){
    console.log('hit LinkedIn');
      window.localStorage.setItem('linkedin', 'true');
      window.localStorage.setItem('isLoggedIn', 'false');
      $window.location.href = url.data;
    });
  }



});