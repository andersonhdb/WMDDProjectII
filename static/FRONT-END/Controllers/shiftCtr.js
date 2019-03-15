angular.module('shiftController', []).controller('shiftCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    function getWorkspaces(){
      $http.get("/getAllWorkspaces").then(function (response) {
        $rootScope.workspaces = response.data;
        $rootScope.selectedWorkspace = $rootScope.workspaces[0];
        getShiftsWorkspace();
      });
    }

    getWorkspaces();

    // FUNCTIONS

    function getShiftsWorkspace(){
      var req = {
        method: 'POST',
        url: '/getAllShiftsWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then((res)=>{
        console.log("success");
        console.log(res.data);
        $scope.shifts = res.data;
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }


    $scope.removeShift = function removeShift(shift){
      var req = {
        method: 'DELETE',
        url: '/removeShift',
        headers: {
          'Content-Type': 'application/json'
        },
        data: shift
      }
      $http(req).then((res)=>{
        console.log("success");
        getShiftsWorkspace();
      }, function(){
        console.log("failure");
      });
    }

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
      getShiftsWorkspace();
    }

    $scope.data = {
      shift_start: undefined,
      shift_end: undefined
    };

    $scope.addShift = function addShift(){
      const data = $scope.data;
      saveShift(data);
    };

    function saveShift(data){
      var req = {
       method: 'POST',
       url: '/addShiftWorkspace',
       headers: {
         'Content-Type': 'application/json'
       },
       data : {data:data,
         workspace: $rootScope.selectedWorkspace}
      }

      $http(req).then(function(){
        console.log("success");
        jQuery('#addShiftModal').modal('toggle');
        getShiftsWorkspace();
      }, function(){
        console.log("failure");
      });
    }

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

  }]);
