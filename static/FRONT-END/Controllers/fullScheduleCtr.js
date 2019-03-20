angular.module('fullScheduleController', []).controller('fullScheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
  
  }]);
  
  