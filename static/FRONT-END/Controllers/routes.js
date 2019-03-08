
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
  .when("/OLDLOG", {
    templateUrl : "FRONT-END/Pages/log.html",
    controller : "logCtr",
    css: ''
  });
});
