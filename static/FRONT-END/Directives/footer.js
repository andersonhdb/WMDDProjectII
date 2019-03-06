angular.module('footerController', [])
.controller('footerCtr', ['$scope', function($scope) {
  //SCOPE
}])
.directive('footerDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/footer.html'
  };
});
