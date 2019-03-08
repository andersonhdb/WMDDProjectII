angular.module('positionController', []).controller('positionCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getPositions(){
      $http.get("/getAllPositions").then(function (response) {
        $scope.positions = response.data;
      });
    }

    getPositions();

  }]);
