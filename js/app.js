/**
 * Created by akram on 9/26/2015.
 */
/**
 * Created by mahabubakram on 4/22/2015.
 */

//init the freaking app
//Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV");
Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV1Se7EQRk");
// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngMap','ngDialog']);
var currentUserLocation;

myApp.controller('AppController', function($scope, ngDialog ) {
//    $scope.message = 'Contact us! JK. This is just a demo.';
//    console.log($scope.message);
//    $scope.positions = [{lat:37.7699298,lng:-122.4469157}];
//
//    $scope.cities = {
//        chicago: {population:27, position: [41.878113, -87.629798]},
//        newyork: {population:53, position: [40.714352, -74.005973]},
//        losangeles: {population:82, position: [34.052234, -118.243684]},
//        vancouver: {population:56, position: [49.25, -123.1]},
//    }
    $scope.getRadius = function(num) {
        return Math.sqrt(num) * 100;
    }

    $scope.fakeUserLocation = [48.124236, 11.598402];
    $scope.fakeOpponentUserLocation = [48.124979, 11.599054];
    $scope.userLocation;
    $scope.latit;
    $scope.longit;
    $scope.markerScale = 2;

    $scope.locationList = [
        [48.124236, 11.598402, true],
        [48.124247, 11.598503, true],
        [48.124302, 11.598636, true],
        [48.124297, 11.598772, true],
        [48.124249, 11.598884, true],
        [48.124206, 11.598950, true],
        [48.124132, 11.599025, true],
        [48.124061, 11.598993, true],
        [48.124007, 11.598912, true],
        [48.123968, 11.598859, true],
        [48.124154, 11.598772, true],
        [48.124124, 11.597461, true],
        [48.123655, 11.597796, true],
        [48.124557, 11.598196, true],
        [48.123767, 11.597369, true],
    ];


    $scope.opponentLocationList = [
        [48.124979, 11.599054],
        [48.124921, 11.598952],
        [48.124863, 11.598844],
        [48.124798, 11.598730],
        [48.124737, 11.598660],
        [48.124654, 11.598741],
        [48.124607, 11.598822],
        [48.124506, 11.598795],
        [48.124416, 11.598752],
        [48.124257, 11.598730],
        [48.124200, 11.598747],
    ]

    $scope.image = {
        url: 'img/beer.png',
        size: [150, 92],
        origin: [0,0],
        anchor: [0, 32]
    };



    setInterval(function () {
        if($scope.locationList.length > 5){
            $scope.locationList.shift();
            
//            if($scope.locationList.length > 4){
                $scope.fakeUserLocation = $scope.locationList[0];
//            }
            $scope.$apply();
        }
    },2000);
    
    setTimeout(function(){
        setInterval(function () {
//        if($scope.locationList.length > 5){
            $scope.opponentLocationList.shift();
            $scope.fakeOpponentUserLocation = $scope.opponentLocationList[0];
            $scope.$apply();
            if($scope.opponentLocationList.length == 0){
                $scope.markerScale = "0";
            }
//        }
        },1500);
    }, 9000);
//    setInterval(function () {
////        if($scope.locationList.length > 5){
//            $scope.opponentLocationList.shift();
//            $scope.fakeOpponentUserLocation = $scope.opponentLocationList[0];
//            $scope.$apply();
////        }
//    },1800);

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

    var count = 0;
     $scope.getLocation({
            success:function(userPosition){
                console.log(userPosition.coords.latitude);
                console.log(userPosition.coords.longitude);
                $scope.userLocation = userPosition;
                currentUserLocation = userPosition;
                console.log($scope.userLocation)
                $scope.$apply();
            },
            fail:function(){
                //user denied the location
            }
    });
    var gPos;
//    setInterval(function(){ alert("Hello"); }, 3000);
    setInterval( function () {
         $scope.getLocation({
            success:function(userPosition){
                userPosition.coords.latitude =userPosition.coords.latitude + count;
                var us = userPosition;
                //us.coords.latitude = us.coords.latitude + 1;
                gPos = userPosition.coords.latitude + count;
                count = count+0.00005;
                console.log(gPos);
                $scope.latit = gPos;
                $scope.longit = userPosition.coords.longitude;
                $scope.markerScale +=1;
                console.log($scope.latit);
                console.log($scope.longit);
                console.log($scope.image);
              $scope.userLocation = userPosition;
              currentUserLocation = userPosition;
              updateUserLocation(userPosition);
                $scope.getNearByUsers(userPosition.coords.latitude,userPosition.coords.longitude)
                $scope.$apply();
            },
            fail:function(){
                //user denied the location
         }
    });
    },3000);
    
    $scope.openRegisterDialog = function() {
        $scope.setMainViewBlur(true);
        ngDialog.open({
            template: 'templates/registerTemplate.html',
            controller: 'RegisterController',
            className: 'ngdialog-theme-default',
            showClose : false,
            preCloseCallback: function(value) {
                $scope.setMainViewBlur(false);
            }
        });
    };
    
    $scope.setMainViewBlur = function(isBlur){
        if(isBlur){
            $('#map-main').addClass("blur");
        }else{
            $('#map-main').removeClass("blur");
        }
    }
    
    //if no current user, open the register Dialog
//    if(!Parse.User.current()){
        $scope.openRegisterDialog()
//    }else{
//        $scope.getNearByUsers(userPosition.coords.latitude,userPosition.coords.longitude)
        // update user locations
//    }

    
    $scope.getNearByUsers = function (userLatitude, userLongitude) {

        var currentUserGeoPoint = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});
var User  = Parse.Object.extend("User");
        var query = new Parse.Query(User);

        query.near("currentLocation", currentUserGeoPoint);
        query.find({
            success: function(nearByUsers) {
                console.log(nearByUsers);
//                for (var i=0; i< nearByUsers.length; i++) {
//                    console.log("User" + i + ": " + nearByUsers[i].get("geoPoint").latitude
//                    + "," + nearByUsers[i].get("geoPoint").longitude);
//
//                    var latitude = nearByUsers[i].get("geoPoint").latitude;
//                    var longitude = nearByUsers[i].get("geoPoint").longitude;
//                }
            }
        });
    }
    
});


var updateUserLocation = function(location){
    var currentUser = Parse.User.current();
    var point = new Parse.GeoPoint({latitude: location.coords.latitude, longitude: location.coords.longitude});
//    console.log()
//    currentUser.set("currentLocation",point);
//    currentUser.save();
}

myApp.controller('RegisterController', function ($scope) {
	$scope.register = function(username, password) {

        var user = new Parse.User();
        user.set("username", username);
        user.set("password", "123");

        //user.set("userLevel", 0);

        user.signUp(null, {
            success : function(user) {
                // Hooray! Let them use the app now.
                // set user level to 0
                var UserDetails = Parse.Object.extend("UserDetails");
                var userDetails = new UserDetails();

                userDetails.set("userLevel", 0);
                userDetails.set("user", {__type: "Pointer", className: "_User", objectId:user.id});

                userDetails.save(null, {
                    success : function(userDetails) {
                        // Execute any logic that should take place after the object is saved.
                        console.log('New user created with objectId: ' + userDetails.id);
                        // start the game !
                    },
                    error : function(userDetails, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log('Failed to create new object, with error code: '
                                + error.message);

                    }
                });
            },
            error : function(user, error) {
                // Show the error message somewhere and let the user try again.
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }
	$scope.startButtonClick = function(){
		//alert($scope.username + $scope.password);
		$scope.register($scope.username, $scope.password);
        $scope.closeThisDialog();
	}
    
});


//function register(username, password) {
//
//	var user = new Parse.User();
//	user.set("username", username);
//	user.set("password", password);
//	
//	//user.set("userLevel", 0);
//
//	user.signUp(null, {
//		success : function(user) {
//			// Hooray! Let them use the app now.
//			// set user level to 0
//			var UserDetails = Parse.Object.extend("UserDetails");
//			var userDetails = new UserDetails();
//
//			userDetails.set("userLevel", 0);
//			userDetails.set("user", {__type: "Pointer", className: "_User", objectId:user.id});
//
//			userDetails.save(null, {
//				success : function(userDetails) {
//					// Execute any logic that should take place after the object is saved.
//					console.log('New user created with objectId: ' + userDetails.id);
//                    // start the game !
//				},
//				error : function(userDetails, error) {
//					// Execute any logic that should take place if the save fails.
//					// error is a Parse.Error with an error code and message.
//					console.log('Failed to create new object, with error code: '
//							+ error.message);
//                    
//				}
//			});
//		},
//		error : function(user, error) {
//			// Show the error message somewhere and let the user try again.
//			console.log("Error: " + error.code + " " + error.message);
//		}
//	});
//}
