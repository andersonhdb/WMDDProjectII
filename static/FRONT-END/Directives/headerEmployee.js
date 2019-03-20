angular.module('headerEmployeeController', [])
.controller('headerEmployeeCtr', ['$scope', function($scope) {
  //SCOPE
}])
.directive('headerEmployeeDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/headerEmployee.html'
  };
});
