angular.module('requestsController', []).controller('requestsCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;
  // $rootScope.logged = true;
  // $rootScope.selectedWorkspace;

  // function getWorkspaces(){
  //   $http.get("/getAllWorkspaces").then(function (response) {
  //     $rootScope.workspaces = response.data;
  //     $rootScope.selectedWorkspace = $rootScope.workspaces[0];
  //     // console.log(response.data);
  //   });
  // }

  // function getWorkspacesManager(){
  //   var req = {
  //     method: 'POST',
  //     url: '/getAllWorkspacesManager',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: $rootScope.userId
  //   }
  //   $http(req).then((res)=>{
  //     console.log("success");
  //     $rootScope.workspaces = res.data;
  //     $rootScope.selectedWorkspace = $rootScope.workspaces[0];
  //     // console.log(response.data);
  //   }, function(){
  //     console.log("failure");
  //   });
  //   //console.log($scope.employee);
  // }
  //
  // getWorkspacesManager();

  $scope.selectWorkspace = function selectWorkspace(workspace){
    $rootScope.selectedWorkspace = workspace;
  }

}]);
