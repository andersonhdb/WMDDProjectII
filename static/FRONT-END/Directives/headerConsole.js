angular.module('headerConsoleController', [])
.controller('headerConsoleCtr', ['$scope', function($scope) {
  //SCOPE
  jQuery('.navbar a.nav-link').click(function() {
    var navbar_toggle = jQuery('.navbar-toggler');
    if (jQuery('.navbar-collapse.show').length>0) {
        navbar_toggle.trigger('click');
    }
  });
}])
.directive('headerConsoleDirective', function() {
  return {
    restrict: 'AEC',
    templateUrl: 'FRONT-END/Pages/headerConsole.html',
    controller: 'headerConsoleCtr'
  };
});
