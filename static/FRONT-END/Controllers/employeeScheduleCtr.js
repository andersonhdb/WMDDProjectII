angular.module('employeeScheduleController', []).controller('employeeScheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
  
  }]);
  
  