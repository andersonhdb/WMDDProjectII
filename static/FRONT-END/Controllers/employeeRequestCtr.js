angular.module('employeeRequestController', []).controller('employeeRequestCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;

    $scope.selectWorkspace = function selectWorkspace(workspace){
      $rootScope.selectedWorkspace = workspace;
    }

    $scope.request = {
      content: undefined,
      status: undefined,
      date: undefined,
      from: undefined,
      to: undefined
    }

    $scope.AddRequest = function(){
      //console.log(jQuery("#inputDay").val());
      $scope.request.status = "pending";
      $scope.request.date = jQuery("#inputDay").val();
      var req = {
       method: 'POST',
       url: '/addRequest',
       headers: {
         'Content-Type': 'application/json'
       },
       data : {data: $scope.request,
         workspace: $rootScope.selectedWorkspace.id,
         employee: $rootScope.userId.id
       }
      }



      $http(req).then(function(data){
        console.log("success");
        getRequests();
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

    function getRequests(){
      var req = {
        method: 'POST',
        url: '/getEmployeeRequest',
        headers: {
          'Content-Type': 'application/json'
        },
        data : {
          employee_id: $rootScope.userId.id
        }
      }

      $http(req).then((data)=>{
        $scope.requests = data.data;
        $scope.requests.forEach((request) => {
          request.day = request.day.substring(0,10);
          request.time_start = request.time_start.substring(0,5);
          request.time_end = request.time_end.substring(0,5);
        });
      });
    }

    $scope.removeRequest = (req)=>{
      var req = {
        method: 'DELETE',
        url: '/removeRequest',
        headers: {
          'Content-Type': 'application/json'
        },
        data : {
          id: req.id
        }
      }

      $http(req).then((data)=>{
        getRequests();;
      });
    }

    getRequests();

  }]);
