(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var app = angular.module("MachineGuessing", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider.
  when('/',{
    templateUrl: "partials/Home.html",
    controller: 'HomeCtrl'
  }).
  when('/info', {
  	templateUrl: "partials/Information.html",
  	controller: 'InfoCtrl'
  }).
  when('/ML', {
  	templateUrl: "partials/MachineGuessing.html",
  	controller: 'MachineGuessingCtrl'
  }).
  otherwise('/');
});


// let angular = require("../lib/node_modules/angular/"),
//   app = angular.module("MachineGuessing", ["ngRoute"]);

// require("../lib/node_modules/angular-route/angular-route.min.js");
// require("./factories/");
// require("./controllers/");

},{}]},{},[1]);
