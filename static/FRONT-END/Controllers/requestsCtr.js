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
    getWorkSpaceRequests();
  }


  function getWorkSpaceRequests(){
    var req = {
      method: 'POST',
      url: '/getWorkspaceRequest',
      headers: {
        'Content-Type': 'application/json'
      },
      data : {
        workspace_id: $rootScope.selectedWorkspace.id
      }
    }

    $http(req).then((data)=>{
      $scope.requests = data.data;
    });
  }

  getWorkSpaceRequests();

  $scope.acceptRequest = (req)=>{

    var req = {
      method: 'POST',
      url: '/updateRequestStatus',
      headers: {
        'Content-Type': 'application/json'
      },
      data : {
        req_id: req.id,
        req_status: 'accepted'
      }
    }

    $http(req).then((data)=>{
      req.status = 'accepted';
      getWorkSpaceRequests();
    });

  }

  $scope.rejectRequest = (req)=>{
    var req = {
      method: 'POST',
      url: '/updateRequestStatus',
      headers: {
        'Content-Type': 'application/json'
      },
      data : {
        req_id: req.id,
        req_status: 'denied'
      }
    }

    $http(req).then((data)=>{
      req.status = 'denied';
      getWorkSpaceRequests();
    });
  }

  $scope.removeRequest = (req)=>{
    var req = {
      method: 'DELETE',
      url: '/removeRequest',
      headers: {
        'Content-Type': 'application/json'
      },
      data : {
        id: req.id
      }
    }

    $http(req).then((data)=>{
      getWorkSpaceRequests();
    });
  }

}]);
