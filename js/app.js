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
    
    
    //@pung get current location code 
     $scope.getLocation = function(callback){
        var stillWaitForUserLocation = true;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log("user accept location access");
                stillWaitForUserLocation = false;
                callback.success(position);
            },function(){
                callback.fail();
            });
        } else {
           callback.fail();
           console.log("Geolocation is not supported by this browser.");
        }
        setTimeout(function(){
            //make sure that after success, do not call fail again..
            if(stillWaitForUserLocation == true){
                console.log("set callback fail.");
                callback.fail();
            }
        }, 6000);
        //TODO: timeout call fail
    }
     
    // todo: time interval getting user location
    $scope.getLocation({
            success:function(userPosition){
              console.log(userPosition);
              $scope.userLocation = userPosition;
            },
            fail:function(){
                //user denied the location
            }
    });
    
});