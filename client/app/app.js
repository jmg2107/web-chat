angular.module('app', ['ngRoute', 'app.services', 'app.login', 'app.chatbox'])
  .run(function($rootScope){
    $rootScope.isLoggedIn = false;
    $rootScope.activeUser = 'default';
    $rootScope.userData = {};

    $rootScope.logout = function(){
      $rootScope.isLoggedIn = false;
    };
  })
  .config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/Login.html',
        controller: 'LoginController'
      })
      .otherwise({
        templateUrl: 'app/chatbox/Chatbox.html',
        controller: 'ChatboxController'
      });
  });