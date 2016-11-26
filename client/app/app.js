angular.module('app', ['ngRoute', 'app.services', 'app.login', 'app.chatbox'])
  .run(function($rootScope){
    if(window.localStorage.getItem('isLoggedIn') === 'null' ||
      window.localStorage.getItem('isLoggedIn') === 'false' ||
      window.localStorage.getItem('isLoggedIn') === null){
      $rootScope.isLoggedIn = false;
    } else {
      $rootScope.isLoggedIn = true;
    }

    if(window.localStorage.getItem('linkedin') === 'null' ||
      window.localStorage.getItem('linkedin') === 'false' ||
      window.localStorage.getItem('linkedin') === null){
      $rootScope.linkedin = false;
    } else {
      $rootScope.linkedin = true;
    }

    $rootScope.activeUser = 'default';
    $rootScope.userData = '';

    $rootScope.logout = function(){
      $rootScope.isLoggedIn = false;
      window.localStorage.setItem('isLoggedIn', 'false');
      window.localStorage.setItem('userData', 'false');
      window.localStorage.setItem('activeUser', 'false');
      window.localStorage.setItem('linkedin', 'false');
      window.location.reload();
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