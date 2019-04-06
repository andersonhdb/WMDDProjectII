angular.module('headerController', [])
.controller('headerCtr', ['$scope', function($scope) {
  //SCOPE
  jQuery('.navbar a.nav-link').click(function() {
    var navbar_toggle = jQuery('.navbar-toggler');
    if (jQuery('.navbar-collapse.show').length>0) {
        navbar_toggle.trigger('click');
    }
  });
}])
.directive('headerDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/header.html',
    controller: 'headerCtr'
  };
});
