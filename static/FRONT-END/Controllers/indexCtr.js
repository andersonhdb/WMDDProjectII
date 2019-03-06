
angular.module('indexController', []).controller('indexCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  function getEmployees(){
    $http.get("/getEmployees").then(function (response) {
      $scope.employees = response.data;
    });
  }

  getEmployees();



}]);
