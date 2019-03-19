angular.module('employeeRequestController', []).controller('employeeRequestCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
    }
  
  }]);
  