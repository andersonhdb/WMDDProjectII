
angular.module('loginController', []).controller('loginCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
  $rootScope.css = $route.current.$$route.css;

  $scope.login = function login(){
    authenticateUser($scope.user);
    //console.log($scope.user);
  }

  function authenticateUser(user){
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
      console.log(res);
      if(res.data==""){
        $scope.signup_alert = {
          title: "Login error",
          info: `the email and password do not match`
        };
        jQuery('#signin_alert').modal('toggle');
      }
      else{
        window.location = '/#!/requests';
      }
    }, ()=>{
      $scope.signup_alert = {
        title: "Internal server error",
        info: `your request could not be processed properly due to an internal server error, try again in 5 seconds`
      };
      jQuery('#signin_alert').modal('toggle');
    })
  }
}]);
