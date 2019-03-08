angular.module('employeesController', []).controller('employeesCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getEmployees(){
      $http.get("/getAllEmployees").then(function (response) {
        $scope.employees = response.data;
      });
    }
    getEmployees();


    $scope.removeEmployee = function removeEmployee(employee){
      var req = {
        method: 'DELETE',
        url: '/removeEmployee',
        headers: {
          'Content-Type': 'application/json'
        },
        data: employee
      }
      $http(req).then((res)=>{
        console.log("success");
        getEmployees();
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
    }

}]);
