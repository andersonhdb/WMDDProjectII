
angular.module('freeTrialController', []).controller('freeTrialCtr', ['$scope', '$rootScope', '$http', '$route', '$window', function($scope, $rootScope, $http, $route, $window){
  $rootScope.css = $route.current.$$route.css;
  $rootScope.logged = true;
  $scope.account = {
    username: undefined,
    email: undefined,
    password: undefined
  };

  $scope.signIn = function signIn(){
    console.log($scope.account)
    const user = $scope.account;
    for(var element in user){
      if(user[element]== undefined){
        $scope.signup_alert = {
          title: "Form field not filled properly",
          info: `please fill up the ${element} field of the form`
        };
        jQuery('#signup_alert').modal('toggle');
        return;
      }
    };
    if($scope.confirmPassword == undefined){
      $scope.signup_alert = {
        title: "Form field not filled properly",
        info: `please fill up the confirm password field of the form`
      };
      jQuery('#signup_alert').modal('toggle');
      return;
    }
    else if($scope.confirmPassword != user.password){
      $scope.signup_alert = {
        title: "Passwords Do not match",
        info: `the confirmation of your password`
      };
      jQuery('#signup_alert').modal('toggle');
      return;
    }
    else{
      addUser(user);
      // $http.post('/signupManager',user)
    }
    // if(user.password == $scope.confirmPassword){
    //    window.location = "/#!/requests";
    //  }
    // else{

    // }
  };

  function addUser(user){
    var req = {
     method: 'POST',
     url: '/addUser',
     headers: {
       'Content-Type': 'application/json'
     },
     // data : {
     //       name: $scope.name,
     //       company: $scope.company
     //       }
     data : user
    }

    $http(req).then(function(res){
      console.log(res);
      console.log("success");
      window.alert("success");
      window.location = "/#!/requests";
    }, function(){
      $scope.signup_alert = {
        title: "Could not create the account",
        info: `the server faced an internal error`
      };
      jQuery('#signup_alert').modal('toggle');
      return;
    });
  }

}]);
