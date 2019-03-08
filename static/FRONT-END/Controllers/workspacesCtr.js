
angular.module('workspacesController', []).controller('workspacesCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

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

}]);
