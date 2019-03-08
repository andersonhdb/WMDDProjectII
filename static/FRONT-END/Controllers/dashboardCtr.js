angular.module('dashboardController', []).controller('dashboardCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.selectWorkspace = function selectWorkspace(workspace){
    $rootScope.selectedWorkspace = workspace;
  }

}]);
