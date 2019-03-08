angular.module('requestsController', []).controller('requestsCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;
  $rootScope.logged = false;
  // $rootScope.selectedWorkspace;

  function getWorkspaces(){
    $http.get("/getAllWorkspaces").then(function (response) {
      $rootScope.workspaces = response.data;
      $rootScope.selectedWorkspace = $rootScope.workspaces[0];
      // console.log(response.data);
    });
  }

  getWorkspaces();

  $scope.selectWorkspace = function selectWorkspace(workspace){
    $rootScope.selectedWorkspace = workspace;
  }

}]);
