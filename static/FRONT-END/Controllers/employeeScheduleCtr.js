angular.module('employeeScheduleController', []).controller('employeeScheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
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

//==============================================================================SCHEDULE LOGIC - CORE

  function getSchedules(){
    if($rootScope.selectedWorkspace != null){
      var req = {
        method: 'POST',
        url: '/getAllSinglePositionsWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {selectedWorkspace : $rootScope.selectedWorkspace,
                user: $rootScope.userId
              }
      }
      $http(req).then(function (response1){
        $scope.tpositionsSchedules = response1.data;
        for (var i = 0; i < $scope.tpositionsSchedules.length; i++) {
          // console.log($scope.tpositionsSchedules[i]);
          var req = {
            method: 'POST',
            url: '/postSingleEmployeesPosition',
            headers: {
             'Content-Type': 'application/json'
            },
            data : {position: $scope.tpositionsSchedules[i],
                  index: i,
                  workspace: $rootScope.selectedWorkspace,
                  week: $scope.week,
                  user: $rootScope.userId }
          }
          $http(req).then(function(response2){
            // console.log(response2.data);
            let index = response2.data[response2.data.length-1]['index'];
            response2.data.pop();
            $scope.tpositionsSchedules[index]['employees'] = response2.data;
            // console.log($scope.tpositionsSchedules[index]['employees']);
            console.log("success");
          }, function(){
            console.log("failure");
          });
        }
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
    getSchedules();
  }

  $scope.previousWeek = function loadPreviousWeek(){
    $scope.week.week_number =  $scope.week.week_number - 1;
    $scope.week.lastDay = formatDate(getLastDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    $scope.week.firstDay = formatDate(getFirstDayOfTheWeekByYearWeek($scope.week.year_number, $scope.week.week_number));
    getSchedules();
  }



}]);
