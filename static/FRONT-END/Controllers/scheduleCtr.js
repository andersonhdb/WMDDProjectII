angular.module('scheduleController', []).controller('scheduleCtr', ['$scope', '$rootScope', '$http', '$route',
function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.data = {
    positionName: undefined
  };

  $scope.addPosition = function signIn(){
    console.log($scope.data)
    const data = $scope.data;
    savePosition(data);
  };

  function savePosition(data){
    var req = {
     method: 'POST',
     url: '/addPosition',
     headers: {
       'Content-Type': 'application/json'
     },
     data : data
    }

    $http(req).then(function(){
      console.log("success");
      jQuery('#addPositionModal').modal('toggle');
    }, function(){
      console.log("failure");
    });
  }

  // ===========================================================================Position Schedules

  function getPositionSchedules(){
    $http.get("/getAllPositions").then(function (response) {
      $scope.positionShcedules = response.data;
    });
  }

  getPositionSchedules();


//==============================================Add Employees
  $scope.employee = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phone: undefined,
    password: undefined
  }

  $scope.AddEmployeeClick = function AddEmployeeClick(){
    jQuery('#addEmplyeeModal').modal('toggle');
  }

  $scope.AddEmployee = function AddEmployee(){
    $scope.employee.password = $scope.employee.firstname;
    var req = {
      method: 'POST',
      url: '/addEmployee',
      headers: {
        'Content-Type': 'application/json'
      },
      data: $scope.employee
    }

    $http(req).then((res)=>{
      alert('invitation send successfully');
      jQuery('#addEmplyeeModal').modal('toggle');
    },(res)=>{
      alert('could not complete invitation send\nError: ',res);
    });
    //console.log($scope.employee);
  }







}]);
