angular.module('app.login', [])
.controller('LoginController', function($scope, $location, $rootScope, ServicesFactory){
  $scope.user = '';

  $scope.login = function(user){
    var username = {username: user};
    ServicesFactory.loginUser(username)
    .then(function(data){
      $rootScope.isLoggedIn = true;
      $rootScope.userData = data.data;
      $rootScope.activeUser = data.data.username;
      $rootScope.linkedin = false;
      window.localStorage.setItem('isLoggedIn', 'true');
      window.localStorage.setItem('linkedin', 'false');
      if(data.data.linkedin){
        window.localStorage.setItem('userData', data.data.linkedin.pictureUrl);
      }
      window.localStorage.setItem('activeUser', data.data.username);
      $location.path('/');
    });
  };

});