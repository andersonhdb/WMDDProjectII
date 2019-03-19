angular.module('footerConsoleController', [])
.controller('footerConsoleCtr', ['$scope', function($scope) {
  //SCOPE
}])
.directive('footerConsoleDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/footerConsole.html'
  };
});
