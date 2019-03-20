angular.module('editEmployeeProfileController', []).controller('editEmployeeProfileCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
  
  }]);
  
  