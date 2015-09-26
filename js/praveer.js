Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf",
		"GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV1Se7EQRk");

var username = "Praveer";
var pass = "praveer";
var point = new Parse.GeoPoint({
	latitude : 43.0,
	longitude : -37.0
});

Parse.User.logIn(username, pass, {
	success : function(user) {
		var point = new Parse.GeoPoint({
			latitude : 41.0,
			longitude : -31.0
		});
		updateUserLocation(username, point);
	},
	error : function(user, error) {
		// The login failed. Check error to see why.
	}
});

function updateUserLocation(username, geoLocation) {

	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", username);
	query.find({
		success : function(results) {
			console.log("Successfully retrieved " + results.length + " user.");
			// Do something with the returned Parse.Object values
			user = results[0];
			console.log(user.id + ' - ' + user.get('username'));

			user.save(null, {
				success : function(user) {
					user.set("currentLocation", geoLocation);
					user.save();
				}
			});

		},
		error : function(error) {
			console.log("Error: " + error.code + " " + error.message);
		}
	});

}

function register(username, password) {

	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	
	//user.set("userLevel", 0);

	user.signUp(null, {
		success : function(user) {
			// Hooray! Let them use the app now.
			// set user level to 0
			var UserDetails = Parse.Object.extend("UserDetails");
			var userDetails = new UserDetails();

			userDetails.set("userLevel", 0);
			userDetails.set("user", user.id);

			userDetails.save(null, {
				success : function(userDetails) {
					// Execute any logic that should take place after the object is saved.
					console.log('New userDetails created with objectId: ' + userDetails.id);
				},
				error : function(bcVar, error) {
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

createBreadCrumb(username, point, "hallo");

function createBreadCrumb(user, geoPoint, note) {
	var BC = Parse.Object.extend("BreadCrum");
	var bcVar = new BC();

	bcVar.set("user", user.id);
	bcVar.set("note", note);
	bcVar.set("geoPoint", geoPoint);

	bcVar.save(null, {
		success : function(bcVar) {
			// Execute any logic that should take place after the object is saved.
			console.log('New breadcrumb created with objectId: ' + bcVar.id);
		},
		error : function(bcVar, error) {
			// Execute any logic that should take place if the save fails.
			// error is a Parse.Error with an error code and message.
			console.log('Failed to create new object, with error code: '
					+ error.message);
		}
	});
}

	function eatUser(user1, user2) {

	    var user1Id = user1.id;
	    var user2Id = user2.id;

	    var UserDetails = Parse.Object.extend("UserDetails");
	    var queryUserDetails = new Parse.Query(UserDetails);

	    queryUserDetails.equalTo("user", {__type: "Pointer", className: "_User", objectId:user1Id});
	    queryUserDetails.find({
	        success: function(results) {
	            console.log("Successfully retrieved " + results.length );
	            // Do something with the returned Parse.Object values
	            var user1Detail = results[0];

	            queryUserDetails.equalTo("user", {__type: "Pointer", className: "_User", objectId:user2Id});
	            queryUserDetails.find({
	                success: function(results) {
	                    console.log("Successfully retrieved " + results.length );
	                    // Do something with the returned Parse.Object values
	                    var user2Detail = results[0];

	                    var user1Level = user1Detail.get('userLevel');
	                    var user2Level = user2Detail.get('userLevel');

	                    if (user1Level > 0 && user2Level > 0) {
	                        if (user1Level > user2Level) {

	                            user2Detail.save(null, {
	                                success : function(userDetail) {
	                                    userDetail.set("userLevel", 0);
	                                    userDetail.save();
	                                }
	                            });

	                            user1Detail.save(null, {
	                                success : function(userDetail) {
	                                    userDetail.set("userLevel", user1Level + user2Level);
	                                    var eatenUserArray = userDetail.get("eatenUsers");
	                                    if (eatenUserArray !== undefined && eatenUserArray.indexOf(user2Id) == -1) {
	                                        eatenUserArray.push(user2Id);
	                                    }
	                                    userDetail.set("eatenUsers", eatenUserArray);
	                                    userDetail.save();
	                                }
	                            });



	                        } else if (user1Level < user2Level) {

	                            user2Detail.save(null, {
	                                success : function(userDetail) {
	                                    userDetail.set("userLevel", user1Level + user2Level);
	                                    var eatenUserArray = userDetail.get("eatenUsers");
	                                    if (eatenUserArray !== undefined && eatenUserArray.indexOf(user1Id) == -1) {
	                                        eatenUserArray.push(user1Id);
	                                    }
	                                    userDetail.set("eatenUsers", eatenUserArray);
	                                    userDetail.save();
	                                }
	                            });

	                            user1Detail.save(null, {
	                                success : function(userDetail) {
	                                    userDetail.set("userLevel", 0);
	                                    userDetail.save();
	                                }
	                            });
	                        }
	                    }


	                }
	            });

	        }
	    });
	}


function eatBreadCrumb(user, breadCrumLocation) {

	var UserDetails = Parse.Object.extend("UserDetails");
	var queryUserDetails = new Parse.Query(UserDetails);

	queryUserDetails.equalTo("user", {
		__type : "Pointer",
		className : "_User",
		objectId : user.id
	});
	queryUserDetails.find({
		success : function(results) {
			console.log("Successfully retrieved " + results.length);
			// Do something with the returned Parse.Object values
			var userDetail = results[0];
			var userLevel = userDetail.get('userLevel');

			userDetail.save(null, {
				success : function(userDetail) {
					userDetail.set("userLevel", userLevel + 1);
					var eatenUserBCs = userDetail.get("eatenBreadCrumbs");
					eatenUserBCs.push(breadCrumLocation);
					userDetail.set("eatenBreadCrumbs", eatenUserBCs);
					userDetail.save();
				}
			});
		}
	});

}
