
angular.module('loginController', []).controller('loginCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.login = function login(){
    console.log($scope.user);
    $scope.signup_alert = {
      title: "Login error",
      info: `the email and password do not match`
    };
    jQuery('#signup_alert').modal('toggle');
  }

}]);
