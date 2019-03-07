
angular.module('freeTrialController', []).controller('freeTrialCtr', ['$scope', '$rootScope', '$http', '$route', '$window', function($scope, $rootScope, $http, $route, $window){
  $rootScope.css = $route.current.$$route.css;

  $scope.signIn = function signIn(){
    window.location = "/#!/requests";
  };
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
        //$http.post('/signupManager',user)
      }
      // if(user.password == $scope.confirmPassword){
      //    window.location = "/#!/requests";
      //  }
      // else{
  
      // }
    };
  
  }]);
  
}]);
