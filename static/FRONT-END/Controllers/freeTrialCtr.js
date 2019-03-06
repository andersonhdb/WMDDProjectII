
angular.module('freeTrialController', []).controller('freeTrialCtr', ['$scope', '$rootScope', '$http', '$route', '$window', function($scope, $rootScope, $http, $route, $window){
  $rootScope.css = $route.current.$$route.css;

  $scope.signIn = function signIn(){
    window.location = "/#!/requests";
  };

}]);
