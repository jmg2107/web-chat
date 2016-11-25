angular.module('app.login', [])
.controller('LoginController', function($scope, $location, ServicesFactory){
  $scope.user = '';

  $scope.login = function(user){
    var username = {username: user};
    ServicesFactory.loginUser(username)
    .then(function(data){
      console.log(data);
      $location.path('/');
    });
  };

});