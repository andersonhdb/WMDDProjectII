angular.module('employeesController', []).controller('employeesCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getEmployees(){
      $http.get("/getAllEmployees").then(function (response) {
        $scope.employees = response.data;
      });
    }
    getEmployeesWorkspace();


    function getEmployeesWorkspace(){
      var req = {
        method: 'POST',
        url: '/getAllEmployeesWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then((res)=>{
        console.log("success");
        console.log(res.data);
        $scope.employees = res.data;
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }


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
        getEmployeesWorkspace();
      }, function(){
        console.log("failure");
      });
    }

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
      getEmployeesWorkspace();
    }

    $scope.employee = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      phone: undefined,
      password: undefined
    }

    $scope.AddEmployeeClick = function AddEmployeeClick(){
      jQuery('#addEmplyeeModal').modal('toggle');
    }

    $scope.AddEmployee = function AddEmployee(){
      $scope.employee.password = $scope.employee.firstname;
      var req = {
        method: 'POST',
        url: '/addEmployeeWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {employee: $scope.employee,
          workspace: $rootScope.selectedWorkspace}
      }

      $http(req).then((res)=>{
        alert('invitation send successfully');
        jQuery('#addEmplyeeModal').modal('toggle');
        getEmployeesWorkspace();
      },(res)=>{
        alert('could not complete invitation send\nError: ',res);
      });
      //console.log($scope.employee);
    }

}]);
