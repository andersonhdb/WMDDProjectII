
angular.module('scheduleController', []).controller('scheduleCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.data = {
    positionName: undefined
  };

  $scope.addPosition = function signIn(){
    console.log($scope.data)
    const data = $scope.data;
    // for(var element in data){
    //   if(user[element]== undefined){
    //     $scope.signup_alert = {
    //       title: "Form field not filled properly",
    //       info: `please fill up the ${element} field of the form`
    //     };
    //     jQuery('#signup_alert').modal('toggle');
    //     return;
    //   }
    // };
    // if($scope.confirmPassword == undefined){
    //   $scope.signup_alert = {
    //     title: "Form field not filled properly",
    //     info: `please fill up the confirm password field of the form`
    //   };
    //   jQuery('#signup_alert').modal('toggle');
    //   return;
    // }
    // else if($scope.confirmPassword != user.password){
    //   $scope.signup_alert = {
    //     title: "Passwords Do not match",
    //     info: `the confirmation of your password`
    //   };
    //   jQuery('#signup_alert').modal('toggle');
    //   return;
    // }
    // else{
      savePosition(data);
      // $http.post('/signupManager',user)
    // }
    // if(user.password == $scope.confirmPassword){
    //    window.location = "/#!/requests";
    //  }
    // else{

    // }
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



}]);
