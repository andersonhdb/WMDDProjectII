angular.module('employeeUnavailabilityController', []).controller('employeeUnavailabilityCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
    $scope.unavailability = undefined;

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
      getWorkSpaceEmployeeUnavailability();
    }

    getWorkSpaceEmployeeUnavailability();

    function getWorkSpaceEmployeeUnavailability(){
      if($rootScope.selectedWorkspace != null){
        var req = {
          method: 'POST',
          url: '/getWorkSpaceEmployeeUnavailability',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
          selectedWorkspace: $rootScope.selectedWorkspace,
          employee: $rootScope.userId
          }
        }
        $http(req).then(function (response1){
          console.log(response1);
          $scope.unavailabilityDays = response1.data;
        });
      }
    }

    // ADD Unavailability

    $scope.data = {
      shift: undefined,
      shift_start: undefined,
      shift_end: undefined
    };

    $scope.openAddUnavailability = function openAddUnavailability(shift, key){
      $scope.data = {
        key: key,
        shift: shift,
        shift_start: undefined,
        shift_end: undefined
      };
      jQuery('#addUnavailabilityModal').modal('toggle');
    }

    $scope.addUnavailability = function addUnavailability(){
      const data = $scope.data;
      saveUnavailability(data);
    };

    function saveUnavailability(data){
      var req = {
       method: 'POST',
       url: '/updateUnavailability',
       headers: {
         'Content-Type': 'application/json'
       },
       data : {data:data,
         workspace: $rootScope.selectedWorkspace,
         employee: $rootScope.userId}
      }

      $http(req).then(function(){
        console.log("success");
        jQuery('#addUnavailabilityModal').modal('toggle');
        setTimeout(function(){
            getWorkSpaceEmployeeUnavailability();
        }, 1000);
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
