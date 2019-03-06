angular.module('headerConsoleController', [])
.controller('headerConsoleCtr', ['$scope', function($scope) {
  //SCOPE
}])
.directive('headerConsoleDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/headerConsole.html'
  };
});
