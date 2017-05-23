"use strict";

var app = angular.module("MachineGuessing", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider.
  when('/Home',{
    templateUrl: "partials/Home.html",
    controller: 'GeneralCtrl'
  }).
  when('/HowItWorks', {
  	templateUrl: "partials/HowItWorks.html",
  	controller: 'HowItWorksCtrl'
  }).
  when('/Contact', {
    templateUrl: "partials/Contact.html",
    controller: 'GeneralCtrl'
  }).
  when('/Demonstration', {
    templateUrl: "partials/Demo.html",
    controller: 'DemonstrationCtrl'
  }).
  otherwise('/Home');
});

// app.run(() => {
 
// });
