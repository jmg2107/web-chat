angular.module('app', ['ngRoute', 'app.services', 'app.login', 'app.chatbox'])
  .run(function($rootScope){
    var localStorage = window.localStorage.getItem('isLoggedIn') === 'false' ? false : true;
    var linkedin = window.localStorage.getItem('linkedin') === 'false' ? false : true;
    $rootScope.isLoggedIn = localStorage;
    $rootScope.activeUser = 'default';
    $rootScope.userData = '';
    $rootScope.linkedin = linkedin;

    $rootScope.logout = function(){
      $rootScope.isLoggedIn = false;
      window.localStorage.setItem('isLoggedIn', 'false');
      window.localStorage.setItem('userData', 'false');
      window.localStorage.setItem('activeUser', 'false');
      window.localStorage.setItem('linkedin', 'false');
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