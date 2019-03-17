angular.module('constraintsController', []).controller('constraintsCtr', ['$scope', '$rootScope', '$http', '$route', function($scope, $rootScope, $http, $route){
    $rootScope.css = $route.current.$$route.css;
  
  }]);
  