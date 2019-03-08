angular.module('scheduleController', []).controller('scheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;
  $rootScope.logged = false;

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
      getEmployees();
    },(res)=>{
      alert('could not complete invitation send\nError: ',res);
    });
    //console.log($scope.employee);
  }


//============================================================================== ADD NEW USER TO POSISTION SCHEDULE

  $scope.openAddEmployeePosition = function openAddEmployeePosition(position){
    // console.log(position);
    var modal = jQuery('#addEmployeePosition');
    modal.modal('toggle');
    modal.find('.modal-title').text("Add new employee to ");
    modal.find('.modal-title').text(modal.find('.modal-title').text() + " " + position.position_name + " position.");
    $scope.selectedPosition = position;
  }

  $scope.addEmployeePosition = function addEmployeePosition(selectedEmployee){
    var req = {
     method: 'POST',
     url: '/addEmployeePosition',
     headers: {
       'Content-Type': 'application/json'
     },
     data : {
           employee: selectedEmployee,
           position: $scope.selectedPosition
           }
    }

    $http(req).then(function(){
      console.log("success");
      getSchedules();
      jQuery('#addEmployeePosition').modal('toggle');
    }, function(){
      console.log("failure");
    });
  }

  function getEmployees(){
    $http.get("/getAllEmployees").then(function (response) {
      $scope.employees = response.data;
    });
  }

  getEmployees();

  function getSchedules(){
    $http.get("/getAllPositions").then(function (response) {
      $scope.tpositionsSchedules = response.data;
      for (var i = 0; i < $scope.tpositionsSchedules.length; i++) {
        var req = {
          method: 'POST',
          url: '/postEmployeesPosition',
          headers: {
           'Content-Type': 'application/json'
          },
          data : {position: $scope.tpositionsSchedules[i],
                index: i}
        }
        $http(req).then(function(response){
          let index = response.data[response.data.length-1]['index'];
          response.data.pop();
          $scope.tpositionsSchedules[index]['employees'] = response.data;
          console.log("success");
        }, function(){
          console.log("failure");
        });
      }
    });
  }

  getSchedules();


}]);
