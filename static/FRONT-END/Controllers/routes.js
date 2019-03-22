
angular.module('routes', ["ngRoute"]).config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "FRONT-END/Pages/home.html",
    controller : "homeCtr",
    css: 'FRONT-END/Styles/home.css'
  })
  .when("/contact", {
    templateUrl : "FRONT-END/Pages/contact.html",
    controller : "contactCtr",
    css: 'FRONT-END/Styles/contact.css'
  })
  .when("/feature", {
    templateUrl : "FRONT-END/Pages/feature.html",
    controller : "featureCtr",
    css: 'FRONT-END/Styles/feature.css'
  })
  .when("/freeTrial", {
    templateUrl : "FRONT-END/Pages/freeTrial.html",
    controller : "freeTrialCtr",
    css: 'FRONT-END/Styles/freeTrial.css'
  })
  .when("/login", {
    templateUrl : "FRONT-END/Pages/login.html",
    controller : "loginCtr",
    css: 'FRONT-END/Styles/login.css'
  })
  .when("/pricing", {
    templateUrl : "FRONT-END/Pages/pricing.html",
    controller : "pricingCtr",
    css: 'FRONT-END/Styles/pricing.css'
  })
  .when("/requests", {
    templateUrl : "FRONT-END/Pages/requests.html",
    controller : "requestsCtr",
    css: 'FRONT-END/Styles/requests.css'
  })
  .when("/dashboard", {
    templateUrl : "FRONT-END/Pages/dashboard.html",
    controller : "dashboardCtr",
    css: 'FRONT-END/Styles/dashboard.css'
  })
  .when("/schedule", {
    templateUrl : "FRONT-END/Pages/schedule.html",
    controller : "scheduleCtr",
    css: 'FRONT-END/Styles/schedule.css'
  })
  .when("/employees", {
    templateUrl : "FRONT-END/Pages/employees.html",
    controller : "employeesCtr",
    css: 'FRONT-END/Styles/employees.css'
  })
  .when("/workspaces", {
    templateUrl : "FRONT-END/Pages/workspaces.html",
    controller : "workspacesCtr",
    css: 'FRONT-END/Styles/workspaces.css'
  })
  .when("/OLDMAIN", {
    templateUrl : "FRONT-END/Pages/main.html",
    controller : "indexCtr",
    css: 'FRONT-END/Styles/main.css'
  })
  .when("/position", {
    templateUrl : "FRONT-END/Pages/position.html",
    controller : "positionCtr",
    css: 'FRONT-END/Styles/position.css'
  })
  .when("/newshift", {
    templateUrl : "FRONT-END/Pages/newshift.html",
    controller : "newshiftCtr",
    css: 'FRONT-END/Styles/newshift.css'
  })
  .when("/constraints", {
    templateUrl : "FRONT-END/Pages/constraints.html",
    controller : "constraintsCtr",
    css: 'FRONT-END/Styles/constraints.css'
  })
  .when("/shift", {
    templateUrl : "FRONT-END/Pages/shift.html",
    controller : "shiftCtr",
    css: 'FRONT-END/Styles/shift.css'
  })
  .when("/employeeRequest", {
    templateUrl : "FRONT-END/Pages/employeeRequest.html",
    controller : "employeeRequestCtr",
    css: 'FRONT-END/Styles/employeeRequest.css'
  })
  .when("/employeeProfile", {
    templateUrl : "FRONT-END/Pages/employeeProfile.html",
    controller : "employeeProfileCtr",
    css: 'FRONT-END/Styles/employeeProfile.css'
  })
  .when("/employeeUnavailability", {
    templateUrl : "FRONT-END/Pages/employeeUnavailability.html",
    controller : "employeeUnavailabilityCtr",
    css: 'FRONT-END/Styles/employeeUnavailability.css'
  })
  .when("/employeeSchedule", {
    templateUrl : "FRONT-END/Pages/employee_schedule.html",
    controller : "employeeScheduleCtr",
    css: 'FRONT-END/Styles/schedule.css'
  })
  .when("/fullSchedule", {
    templateUrl : "FRONT-END/Pages/fullSchedule.html",
    controller : "fullScheduleCtr",
    css: 'FRONT-END/Styles/fullSchedule.css'
  })
  .when("/editEmployeeProfile", {
    templateUrl : "FRONT-END/Pages/editEmployeeProfile.html",
    controller : "editEmployeeProfileCtr",
    css: 'FRONT-END/Styles/editEmployeeProfile.css'
  })
  .when("/OLDLOG", {
    templateUrl : "FRONT-END/Pages/log.html",
    controller : "logCtr",
    css: ''
  });
});
