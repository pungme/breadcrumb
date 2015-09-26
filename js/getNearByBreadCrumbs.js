/**
 * Created by madhukar on 26.09.15.
 */

Parse.initialize("rddppjY9BaftUHY50Ze84iO4iSBB2tEmnyJvgwyf", "GwRsQZtgtLZSDtsokHW9hXeDBQq5pWCV1Se7EQRk");

var User  = Parse.Object.extend("User");
var BreadCrum  = Parse.Object.extend("BreadCrum");

function getNearByBreadCrumbs(userLatitude, userLongitude) {

    var currentUserGeoPoint = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

    var query = new Parse.Query(BreadCrum);

    query.near("geoPoint", currentUserGeoPoint);
//    query.limit(10);
    query.find({
        success: function(nearByBreadCrumbs) {

            for (var i=0; i< nearByBreadCrumbs.length; i++) {
                console.log("User" + i + ": " + nearByBreadCrumbs[i].get("geoPoint").latitude
                + "," + nearByBreadCrumbs[i].get("geoPoint").longitude);

                var latitude = nearByBreadCrumbs[i].get("geoPoint").latitude;
                var longitude = nearByBreadCrumbs[i].get("geoPoint").longitude;
            }
        }
    });
}

function getNearByUsers(userLatitude, userLongitude) {

    var currentUserGeoPoint = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

    var query = new Parse.Query(User);

    query.near("currentLocation", currentUserGeoPoint);
    query.limit(10);
    query.find({
        success: function(nearByUsers) {

            for (var i=0; i< nearByUsers.length; i++) {
                console.log("User" + i + ": " + nearByUsers[i].get("geoPoint").latitude
                + "," + nearByUsers[i].get("geoPoint").longitude);

                var latitude = nearByUsers[i].get("geoPoint").latitude;
                var longitude = nearByUsers[i].get("geoPoint").longitude;
            }
        }
    });
}