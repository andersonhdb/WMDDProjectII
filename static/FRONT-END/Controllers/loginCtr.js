
angular.module('loginController', []).controller('loginCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.user = {};
  $scope.user.logged = false;
  $scope.user.manager = false;

  $scope.login = function login(){
    authenticateUser($scope.user);
    //console.log($scope.user);
  }

  function authenticateUser(user){

    if(user.manager){
      var req = {
        method: 'POST',
        url: '/authenticateUser',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      }

      $http(req).then((res)=>{
        //window.location = '/#!/requests'
        // console.log(res);
        if(res.data==""){
          $scope.signup_alert = {
            title: "Login error",
            info: `the email and password do not match`
          };
          jQuery('#signin_alert').modal('toggle');
        }
        else{
          $rootScope.logged = false;
          $rootScope.manager = true;
          $rootScope.userId = res.data[0];
          getWorkspacesManager();
        }
      }, ()=>{
        $scope.signup_alert = {
          title: "Internal server error",
          info: `your request could not be processed properly due to an internal server error, try again in 5 seconds`
        };
        jQuery('#signin_alert').modal('toggle');
      })
    }else{
      var req = {
        method: 'POST',
        url: '/authenticateEmployee',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      }

      $http(req).then((res)=>{
        //window.location = '/#!/requests'
        // console.log(res);
        if(res.data==""){
          $scope.signup_alert = {
            title: "Login error",
            info: `the email and password do not match`
          };
          jQuery('#signin_alert').modal('toggle');
        }
        else{
          $rootScope.logged = false;
          $rootScope.manager = false;
          $rootScope.userId = res.data[0];
          getWorkspacesEmployee();
        }
      }, ()=>{
        $scope.signup_alert = {
          title: "Internal server error",
          info: `your request could not be processed properly due to an internal server error, try again in 5 seconds`
        };
        jQuery('#signin_alert').modal('toggle');
      })
    }

  }

  function addEmployee(){
    var req = {
     method: 'POST',
     url: '/addEmployee',
     headers: {
       'Content-Type': 'application/json'
     },
     data : {
           name: $scope.name,
           company: $scope.company
           }
    }

    $http(req).then(function(){
      console.log("success");
      eraseFields();
    }, function(){
      console.log("failure");
    });
  }

  function getWorkspacesManager(){
    var req = {
      method: 'POST',
      url: '/getAllWorkspacesManager',
      headers: {
        'Content-Type': 'application/json'
      },
      data: $rootScope.userId
    }
    $http(req).then((res)=>{
      console.log("success");
      $rootScope.selectedWorkspace = res.data[0];
      $rootScope.workspaces = res.data;
      window.location = '/#!/schedule';
      // $rootScope.selectedWorkspace = $rootScope.workspaces[0];
    }, function(){
      console.log("failure");
    });
  }

  function getWorkspacesEmployee(){
    var req = {
      method: 'POST',
      url: '/getAllWorkspacesEmployee',
      headers: {
        'Content-Type': 'application/json'
      },
      data: $rootScope.userId
    }
    $http(req).then((res)=>{
      console.log("success");
      $rootScope.selectedWorkspace = res.data[0];
      $rootScope.workspaces = res.data;
      window.location = '/#!/employeeSchedule';
      // $rootScope.selectedWorkspace = $rootScope.workspaces[0];
    }, function(){
      console.log("failure");
    });
  }

}]);
