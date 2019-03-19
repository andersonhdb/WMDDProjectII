
angular.module('employeeUnavailabilityController', []).controller('employeeUnavailabilityCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
  }]);
  