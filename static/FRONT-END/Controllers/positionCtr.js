angular.module('positionController', []).controller('positionCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getPositions(){
      $http.get("/getAllPositions").then(function (response) {
        $scope.positions = response.data;
      });
    }

    getPositions();


    $scope.removePosition = function removePosition(position){
      var req = {
        method: 'DELETE',
        url: '/removePosition',
        headers: {
          'Content-Type': 'application/json'
        },
        data: position
      }
      $http(req).then((res)=>{
        console.log("success");
        getPositions();
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }

  }]);
