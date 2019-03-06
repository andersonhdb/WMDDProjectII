angular.module('headerController', [])
.controller('headerCtr', ['$scope', function($scope) {
  //SCOPE
}])
.directive('headerDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/header.html'
  };
});
