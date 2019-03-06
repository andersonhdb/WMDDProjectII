
angular.module('logController', []).controller('logCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  function addEmployee(){
    var req = {
     method: 'POST',
     url: '/addEmployee',
     headers: {
       'Content-Type': 'application/json'
     },
     data : {
           name: $scope.name,
           company: $scope.company
           }
    }

    $http(req).then(function(){
      console.log("success");
      eraseFields();
    }, function(){
      console.log("failure");
    });
  }

  function eraseFields(){
    $scope.name = '';
    $scope.company = '';
  }

  eraseFields();
  $scope.addEmployee = addEmployee;

}]);
