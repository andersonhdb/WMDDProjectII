angular.module('dashboardController', []).controller('dashboardCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.selectWorkspace = function selectWorkspace(workspace){
    $rootScope.selectedWorkspace = workspace;
    getAllPositionsWorkspace();
  }

  function getAllPositionsWorkspace(){
    if($rootScope.selectedWorkspace != null){
      var req = {
        method: 'POST',
        url: '/getAllPositionsWorkspace',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $rootScope.selectedWorkspace
      }
      $http(req).then(function (response){
        $scope.positions = response.data;
        // console.log($scope.positions);
        getEmployeesPosition();
      });
    }else{
      $scope.loading = true;
    }
  }

  function getEmployeesPosition(){
    var counter = 0;
    if($scope.positions.length < 1){
      $scope.loading = true;
    }
    for (var i = 0; i < $scope.positions.length; i++) {
      $scope.loading = false;
      var req = {
        method: 'POST',
        url: '/postEmployeesPosition',
        headers: {
         'Content-Type': 'application/json'
        },
        data : {position: $scope.positions[i],
              index: i,
              workspace: $rootScope.selectedWorkspace,
              week: $scope.week}
      }
      $http(req).then(function(response2){
        $scope.loading = false;
        let index = response2.data[response2.data.length-1]['index'];
        response2.data.pop();
        $scope.positions[index]['employees'] = response2.data;
        // console.log($scope.positions[index]['employees']);
        console.log("success");
        // console.log(index +" - "+ $scope.positions.length);
        counter++;
        if(counter == $scope.positions.length){
          console.log($scope.positions);
          $scope.loading = true;
          graphs();
        }
      }, function(){
        console.log("failure");
      });
    }
  }


  getAllPositionsWorkspace();


  function graphs(){

    var graphWage = [];
    var graphHours = [];
    graphWage.push(['Task', 'Percentage']);
    graphHours.push(['Task', 'Hours']);
    for (var i = 0; i < $scope.positions.length; i++) {
      var totalHours = 0;
      for (var j = 0; j < $scope.positions[i].employees.length; j++) {
        for (var shift in $scope.positions[i].employees[j].shifts) {
          console.log($scope.positions[i].employees[j].shifts[shift]);
          if($scope.positions[i].employees[j].shifts[shift] != null){
            var hours = $scope.positions[i].employees[j].shifts[shift].shift_end.substring(0, 2) - $scope.positions[i].employees[j].shifts[shift].shift_start.substring(0, 2);
            totalHours += hours;
          }
        }
      }
      //ADDING TOTAL VALUE OF THE CATEGORY
      graphWage.push([$scope.positions[i].position_name,(totalHours * $scope.positions[i].wage)]);
      graphHours.push([$scope.positions[i].position_name,totalHours]);
    }

    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    // google.charts.setOnLoadCallback(drawChart);
    // Draw the chart and set the chart values
    google.charts.setOnLoadCallback(function(){
      var data = google.visualization.arrayToDataTable(graphWage);
      // Optional; add a title and set the width and height of the chart
      var options = {'title':'Weekly Payments per Position', 'width':550, 'height':400};
      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    });

    google.charts.setOnLoadCallback(function () {
      var data1 = google.visualization.arrayToDataTable(graphWage);
      var options = {'title':'Weekly Payments Per Position', 'width':550, 'height':400};
      var chart1 = new google.visualization.ColumnChart(document.getElementById('barchart'));
      chart1.draw(data1, options);
    });

    google.charts.setOnLoadCallback(function() {
      var data = google.visualization.arrayToDataTable(graphHours);
      var options = {'title':'Monthly hours per position', 'width':550, 'height':400};
      var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
      chart.draw(data, options);
    });

    google.charts.setOnLoadCallback(function() {
      var data1 = google.visualization.arrayToDataTable(graphHours);
      var options = {'title':'Year hours per position', 'width':550, 'height':400};
      var chart1 = new google.visualization.ColumnChart(document.getElementById('barchart1'));
      chart1.draw(data1, options);
    });
  }

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
