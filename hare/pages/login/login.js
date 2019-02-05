app.controller("loginController", ($scope,userAuthentication)=>{
    $scope.submit = ()=>{
        alert("sent");
        alert($scope.user);
        alert($scope.user.email);
        userAuthentication.Validate($scope.user);
    }
})
.factory("userAuthentication",['$http', ($http)=>{
    let fac = {};

    fac.Validate = (user)=>{
        alert("sending");
        $http.post("/user/authenticateUser", user).then((response)=>{
            alert(response.status);
        })
    }

    return fac;
}])