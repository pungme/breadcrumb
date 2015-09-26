/**
 * Created by akram on 9/26/2015.
 */
/**
 * Created by mahabubakram on 4/22/2015.
 */

//init the freaking app
Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV");

// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngMap']);


myApp.controller('AppController', function($scope) {
//    $scope.message = 'Contact us! JK. This is just a demo.';
//    console.log($scope.message);
    $scope.positions = [{lat:37.7699298,lng:-122.4469157}];

    $scope.cities = {
        chicago: {population:27, position: [41.878113, -87.629798]},
        newyork: {population:53, position: [40.714352, -74.005973]},
        losangeles: {population:82, position: [34.052234, -118.243684]},
        vancouver: {population:56, position: [49.25, -123.1]},
    }
    $scope.getRadius = function(num) {
        return Math.sqrt(num) * 100;
    }


    $scope.userLocation;
    //@pung get current location code
     $scope.getLocation = function(callback){
        var stillWaitForUserLocation = true;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
//                console.log("user accept location access");
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

     $scope.getLocation({
            success:function(userPosition){
                console.log(userPosition.coords.latitude);
                console.log(userPosition.coords.longitude);
                $scope.userLocation = userPosition;
                console.log($scope.userLocation)
                $scope.$apply();
            },
            fail:function(){
                //user denied the location
            }
    });
//    setInterval(function(){ alert("Hello"); }, 3000);
    setInterval( function () {
         $scope.getLocation({
            success:function(userPosition){
//              $scope.userLocation.coords.latitude = $scope.userLocation.coords.latitude + 1;
//                $scope.$apply();
//              console.log($scope.userLocation.coords.latitude);
//              console.log(userPosition.coords.longitude);
//                
//              $scope.userLocation = userPosition;
              $scope.userLocation = userPosition;
                console.log($scope.userLocation);
                $scope.$apply();
            },
            fail:function(){
                //user denied the location
         }
    });
    },
    1000 //check every 30 seconds
    );

});