angular.module('app.chatbox', [])
.controller('ChatboxController', function($scope){

  $scope.messages = [ {user: 'Jen', message: 'Hello'}, {user: 'Fontip', message: 'Hi Honey'}];

});