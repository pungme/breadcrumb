Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV1Se7EQRk");

var username = "Praveer";
var pass = "praveer";

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
