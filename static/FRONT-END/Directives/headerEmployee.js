angular.module('headerEmployeeController', [])
.controller('headerEmployeeCtr', ['$scope', function($scope) {
  //SCOPE
  jQuery('.navbar a.nav-link').click(function() {
    var navbar_toggle = jQuery('.navbar-toggler');
    if (jQuery('.navbar-collapse.show').length>0) {
        navbar_toggle.trigger('click');
    }
  });
}])
.directive('headerEmployeeDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/headerEmployee.html',
    controller: 'headerEmployeeCtr'
  };
});
