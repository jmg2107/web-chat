angular.module('app.login', [])
.controller('LoginController', function($scope, $location, $rootScope, ServicesFactory){
  $scope.user = '';

  $scope.login = function(user){
    var username = {username: user};
    ServicesFactory.loginUser(username)
    .then(function(data){
      console.log(data);
      $rootScope.isLoggedIn = true;
      $rootScope.activeUser = data.data.username;
      $location.path('/');
    });
  };

});