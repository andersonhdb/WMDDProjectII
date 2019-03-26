
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

  }]);
