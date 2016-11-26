angular.module('app', ['ngRoute', 'app.services', 'app.login', 'app.chatbox'])
  .run(function($rootScope){
    if(window.localStorage.getItem('isLoggedIn') === 'null' ||
      window.localStorage.getItem('isLoggedIn') === 'false' ||
      window.localStorage.getItem('isLoggedIn') === null){
      $rootScope.isLoggedIn = false;
    } else {
      $rootScope.isLoggedIn = true;
    }
    var linkedin = window.localStorage.getItem('linkedin') === null ? null : window.localStorage.getItem('linkedin') === 'false' ? false : true;
    $rootScope.activeUser = 'default';
    $rootScope.userData = '';
    $rootScope.linkedin = linkedin;

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