angular.module('positionController', []).controller('positionCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getPositions(){
      $http.get("/getAllPositions").then(function (response) {
        $scope.positions = response.data;
      });
    }

    getPositionsWorkspace();

    function getPositionsWorkspace(){
      var req = {
        method: 'POST',
        url: '/getAllPositionsWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then((res)=>{
        console.log("success");
        console.log(res.data);
        $scope.positions = res.data;
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }


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
        getPositionsWorkspace();
      }, function(){
        console.log("failure");
      });
    }

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
      getPositionsWorkspace();
    }

    $scope.data = {
      positionName: undefined
    };

    $scope.addPosition = function signIn(){
      const data = $scope.data;
      savePosition(data);
    };

    function savePosition(data){
      var req = {
       method: 'POST',
       url: '/addPositionWorkspace',
       headers: {
         'Content-Type': 'application/json'
       },
       data : {data:data,
         workspace: $rootScope.selectedWorkspace}
      }

      $http(req).then(function(){
        console.log("success");
        jQuery('#addPositionModal').modal('toggle');
        getPositionsWorkspace();
      }, function(){
        console.log("failure");
      });
    }

  }]);
