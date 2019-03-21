
angular.module('workspacesController', []).controller('workspacesCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  // =====================AUTO FILL INPUT INIT
  function getUsers(){
    $http.get("/getUsers").then(function (response) {
      $scope.userList = response.data;
      console.log($scope.userList);
    });
  }

  $scope.complete=function(string){
    getUsers();
  	var output=[];
  	angular.forEach($scope.userList,function(value, key){
  		if(value.email.toLowerCase().indexOf(string.toLowerCase())>=0){
  			output.push(value.email + "/" + value.user_name);
  		}
  	});
  	$scope.filterUser=output;
  }
  $scope.fillTextbox=function(string){
  	$scope.emailUserSearch=string;
  	$scope.filterUser=null;
  }
  // =====================AUTO FILL INPUT END



  $scope.data = {
    workspaceName: undefined,
    userId: $rootScope.userId
  };

  $scope.addWorkspace = function addWorkspace(){
    const data = $scope.data;
      saveWorkspace(data);
  };

  function saveWorkspace(data){
    var req = {
     method: 'POST',
     url: '/addWorkspace',
     headers: {
       'Content-Type': 'application/json'
     },
     data : data
    }

    $http(req).then(function(){
      console.log("success");
      getWorkspaces();
      jQuery('#addWorkspaceModal').modal('toggle');
    }, function(){
      console.log("failure");
    });
  }

  // ===========================================================================Position Schedules


  function getWorkspaces(){
    if($rootScope.manager = true){
      var req = {
        method: 'POST',
        url: '/getAllWorkspacesManager',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.userId
      }
      $http(req).then((res)=>{
        console.log("success");
        $rootScope.workspaces = res.data;
        $rootScope.selectedWorkspace = $rootScope.workspaces[0];
        // console.log(response.data);
      }, function(){
        console.log("failure");
      });
    }else{
      var req = {
        method: 'POST',
        url: '/getAllEmployeesWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.userId
      }
      $http(req).then((res)=>{
        console.log("success");
        $rootScope.workspaces = res.data;
        $rootScope.selectedWorkspace = $rootScope.workspaces[0];
        // console.log(response.data);
      }, function(){
        console.log("failure");
      });
    }
  }

  getWorkspaces();




}]);
