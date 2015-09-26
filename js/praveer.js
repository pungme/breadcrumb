Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV1Se7EQRk");

var username = "Praveer";
var pass = "praveer";
var point = new Parse.GeoPoint({latitude: 43.0, longitude: -37.0});

createBreadCrumb(username,point, "hallo" );

Parse.User.logIn(username, pass, {
  success: function(user) {
   var point = new Parse.GeoPoint({latitude: 41.0, longitude: -31.0});
	updateUserLocation("Praveer", point);
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});


function updateUserLocation(username, geoLocation) {
	
	
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", username);
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " user.");
	    // Do something with the returned Parse.Object values
	       user = results[0];
	      console.log(user.id + ' - ' + user.get('username'));
		
		user.save(null, {
		  success: function(user) {
		    user.set("currentLocation",geoLocation);
		    user.save();
		  }
		});

	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});

}

function register(username, password){
	
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function createBreadCrumb(username, geoPoint, note){
	var BC = Parse.Object.extend("BreadCrum");
	var bcVar = new BC();

	bcVar.set("username", username);
	bcVar.set("note", note);
	bcVar.set("geoPoint", geoPoint);

	bcVar.save(null, {
	  success: function(bcVar) {
	    // Execute any logic that should take place after the object is saved.
	    alert('New breadcrumb created with objectId: ' + bcVar.id);
	  },
	  error: function(bcVar, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    alert('Failed to create new object, with error code: ' + error.message);
	  }
	});

}
