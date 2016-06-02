var MapModule = require('ti.map');
var args = arguments[0] || {};
s_place=args.placeId[0];
d_place=args.placeId[1];



var locationCallback = function(e) {
	Ti.API.info("current position view" + JSON.stringify(e));
	//  LK.map_is_running = false;
	if (!e.success || e.error) {
		alert("Cannot get your location");
		return;
	}

	Ti.Geolocation.removeEventListener('location', locationCallback);
	var region = {
		latitude : e.coords.latitude,
		longitude : e.coords.longitude,
		animate : true,
		latitudeDelta : 0.02,
		longitudeDelta : 0.02
	};
	// $.mapview.setLocation(region);
$.mapview.setRegion(region);
	
		};
	
	Ti.Geolocation.addEventListener('location', locationCallback);

//var url = "http://maps.googleapis.com/maps/api/directions/json?origin=Luz-Saint-Sauveur,+France&destination=42.908655,0.145054&sensor=false";

var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=place_id:'+s_place+'&destination=place_id:'+d_place+'&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk'
//https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJ1UF7VIO4w4kReB1HYVDPmrY&destination=place_id:ChIJLXKVioinw4kRq8vOUb_Yyes&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk
Ti.API.info('url '+url);
xhr = Titanium.Network.createHTTPClient();
xhr.open('GET',url);
xhr.onload = function() {
    Ti.API.info('inside the xhr-->' + this.responseText);
    var xml = this.responseText;
    var points = [];
 
    // Bellow Variable have the step of the current location to destination  Location. Using the Steps we going to create a route.
 
       var position = JSON.parse(this.responseText).routes[0].legs[0].steps;
    if (position[0] != null) {
 
        points.push({
            latitude : position[0].start_location.lat,
            longitude : position[0].start_location.lng,
        });
 
         // Here we use the for loop to collect all the steps and push it to the array and use this array to form the route in android.
 
        for (var i = 0; i < position.length; i++) {
 
        points.push({
            latitude : position[i].end_location.lat,
            longitude : position[i].end_location.lng,
        });
    }
    } else {
        alert('no route');
    }
 
    var theData = {
        name : "india",
        points : points,
        color : "red",
        width : 5
    };
 	var route = MapModule.createRoute(theData);
    $.mapview.addRoute(route);
};
/* function(){
  // Now parse the XML 

  var theData = JSON.parse(this.responseText);
  Ti.API.info('url 2 '+this.responseText);
  //addRouteToMap(theData);
  var route = MapModule.createRoute(theData);
  $.mapview.addRoute(theData);
};*/
xhr.send();

/*
var _points = []; // The array used to contain the points in a route
//Your coordinates
var cord1= {
    latitude:29.078685,
    longitude:-110.971205,
};
_points.push(cord1);

var cord2= { 
     latitude:29.081496, 
     longitude:-110.959232, 
};
_points.push(cord2);

// Create your route 
var route = MapModule.createRoute({ 
      points : _points, 
      color : "#f00", 
      width : 5.0 
 });
// Add route to map!
*/
// Create your route 
/*var route = MapModule.createRoute({ 
      points : args.rpoints, 
      color : "#f00", 
      width : 5.0 
 });
$.mapview.addRoute(routeip);
*/