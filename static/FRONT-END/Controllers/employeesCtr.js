angular.module('employeesController', []).controller('employeesCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getEmployees(){
      $http.get("/getAllEmployees").then(function (response) {
        $scope.employees = response.data;
      });
    }
    getEmployees();

}]);
