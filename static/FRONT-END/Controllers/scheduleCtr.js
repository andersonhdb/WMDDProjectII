angular.module('scheduleController', []).controller('scheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;
  $rootScope.logged = false;


  $scope.selectWorkspace = function selectWorkspace(workspace){
    $rootScope.selectedWorkspace = workspace;
    getSchedules();
    getEmployeesWorkspace();
  }


//==============================================================================POSITION
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
      getSchedules();
    }, function(){
      console.log("failure");
    });
  }

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
      $scope.positions = res.data;
    }, function(){
      console.log("failure");
    });
  }


  function getPositionSchedules(){
    $http.get("/getAllPositions").then(function (response) {
      $scope.positionShcedules = response.data;
    });
  }

  getPositionSchedules();


//==============================================================================EMPLOYEE
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
      url: '/addEmployeeWorkspace',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {employee: $scope.employee,
        workspace: $rootScope.selectedWorkspace}
    }

    $http(req).then((res)=>{
      alert('invitation send successfully');
      jQuery('#addEmplyeeModal').modal('toggle');
      getEmployeesWorkspace();
    },(res)=>{
      alert('could not complete invitation send\nError: ',res);
    });
    //console.log($scope.employee);
  }


  function getEmployeesWorkspace(){

    if($rootScope.selectedWorkspace != null){
      var req = {
        method: 'POST',
        url: '/getAllEmployeesWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then((res)=>{
        console.log("success");
        // console.log(res.data);
        $scope.employees = res.data;
      }, function(){
        console.log("failure");
      });
      //console.log($scope.employee);
    }

  }

  getEmployeesWorkspace();


//==============================================================================EMPLOYEE POSISTION

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

  $scope.removeEmployeePosition = function removeEmployeePosition(employee, position){
    var req = {
      method: 'DELETE',
      url: '/removeEmployeePosition',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {employee:employee,
            position : position}
    }
    $http(req).then((res)=>{
      console.log("success");
      getEmployeesPosition();
    }, function(){
      console.log("failure");
    });
    //console.log($scope.employee);
  }


//==============================================================================SHIFT

  function getShiftsWorkspace(){
    if($rootScope.selectedWorkspace != null){
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
  }

  getShiftsWorkspace();

//==============================================================================EDIT SHIFT_EMPLOYEE_POSITION

  $scope.editShiftData = {
    shift:undefined,
    employee: undefined,
    position: undefined,
    new_shift: undefined
  }

  $scope.editShift = function editShift(shift,employee,position,key){
    $scope.editShiftData = {
      shift:shift,
      employee: employee,
      position: position,
      key: key
    }
    getShiftsWorkspace();
    jQuery('#addShiftEmployeeModal').modal('toggle');
  }

  $scope.addShift = function addShift(){
    var req = {
     method: 'POST',
     url: '/addShiftEmployeePosition',
     headers: {
       'Content-Type': 'application/json'
     },
     data : {shiftData: $scope.editShiftData,
             week: $scope.week}
    }

    $http(req).then(function(){
      console.log("success");
      getEmployeesPosition();
      jQuery('#addShiftEmployeeModal').modal('toggle');
    }, function(){
      console.log("failure");
    });
  }

//==============================================================================SCHEDULE LOGIC - CORE

  // function getSchedules(){
  //   if($rootScope.selectedWorkspace != null){
  //     var req = {
  //       method: 'POST',
  //       url: '/getAllPositionsWorkspace',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       data: $rootScope.selectedWorkspace
  //     }
  //     $http(req).then(function (response1){
  //       $scope.tpositionsSchedules = response1.data;
  //       for (var i = 0; i < $scope.tpositionsSchedules.length; i++) {
  //         // console.log($scope.tpositionsSchedules[i]);
  //         var req = {
  //           method: 'POST',
  //           url: '/postEmployeesPosition',
  //           headers: {
  //            'Content-Type': 'application/json'
  //           },
  //           data : {position: $scope.tpositionsSchedules[i],
  //                 index: i,
  //                 workspace: $rootScope.selectedWorkspace,
  //                 week: $scope.week}
  //         }
  //         $http(req).then(function(response2){
  //           // console.log(response2.data);
  //           let index = response2.data[response2.data.length-1]['index'];
  //           response2.data.pop();
  //           $scope.tpositionsSchedules[index]['employees'] = response2.data;
  //           console.log($scope.tpositionsSchedules[index]['employees']);
  //           console.log("success");
  //         }, function(){
  //           console.log("failure");
  //         });
  //       }
  //     });
  //   }
  // }
  function getSchedules(){
    if($rootScope.selectedWorkspace != null){
      var req = {
        method: 'POST',
        url: '/getAllPositionsWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then(function (response1){
        $scope.tpositionsSchedules = response1.data;
        getEmployeesPosition();
      });
    }
  }

  function getEmployeesPosition(){
    var counter = 0;
    for (var i = 0; i < $scope.tpositionsSchedules.length; i++) {
      $scope.loading = false;
      var req = {
        method: 'POST',
        url: '/postEmployeesPosition',
        headers: {
         'Content-Type': 'application/json'
        },
        data : {position: $scope.tpositionsSchedules[i],
              index: i,
              workspace: $rootScope.selectedWorkspace,
              week: $scope.week}
      }
      $http(req).then(function(response2){
        $scope.loading = false;
        // console.log(response2.data);
        let index = response2.data[response2.data.length-1]['index'];
        response2.data.pop();
        $scope.tpositionsSchedules[index]['employees'] = response2.data;
        console.log($scope.tpositionsSchedules[index]['employees']);
        console.log("success");
        console.log(index +" - "+ $scope.tpositionsSchedules.length);
        counter++;
        if(counter == $scope.tpositionsSchedules.length){
          $scope.loading = true;
        }
      }, function(){
        console.log("failure");
      });
    }
  }


  getSchedules();

//============================================================================== WEEKs

  $scope.week = {
    week_number : getCurrentWeekNumber(),
    year_number : new Date().getWeekYear(),
    lastDay : formatDate(getLastDayOfTheWeek(new Date())),
    firstDay : formatDate(getFirstDayOfTheWeek(new Date())),
  }

  $scope.nextWeek = function loadNextWeek(){
    $scope.week.week_number =  $scope.week.week_number + 1;
    $scope.week.lastDay = formatDate(getLastDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    $scope.week.firstDay = formatDate(getFirstDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    getEmployeesPosition();
  }

  $scope.previousWeek = function loadPreviousWeek(){
    $scope.week.week_number =  $scope.week.week_number - 1;
    $scope.week.lastDay = formatDate(getLastDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    $scope.week.firstDay = formatDate(getFirstDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    getEmployeesPosition();
  }

}]);
