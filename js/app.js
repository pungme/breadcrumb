/**
 * Created by akram on 9/26/2015.
 */
/**
 * Created by mahabubakram on 4/22/2015.
 */
// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngMap']);

// configure our routes
/*myApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'partials/home.html',
            controller  : 'MainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'partials/about.html',
            controller  : 'AboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'partials/contact.html',
            controller  : 'ContactController'
        });
});*/


myApp.controller('AppController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    console.log($scope.message);
});