Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

function getLocation() {
	//Get the current position and set it to the mapview
	Titanium.Geolocation.getCurrentPosition(function(e) {
		Ti.API.info("geo location " + JSON.stringify(e));
		var region = {
			latitude : e.coords.latitude,
			longitude : e.coords.longitude,
			animate : true,
			latitudeDelta : 0.001,
			longitudeDelta : 0.001
		};
		//Ti.API.info("map view"+JSON.stringify($));
		//Ti.API.info("map view 2 "+JSON.stringify($.tripBooking.mapview));
		//$.mapview.setLocation(region);
	});
};

//getLocation();
Titanium.Geolocation.addEventListener('location', function() {
	getLocation();
	//  Ti.API.info("map view"+JSON.stringify(map1));
});

function doRequestClick(e) {
	Alloy.createController('bookingConfirmation').getView().open();
};

$.tripBooking.addEventListener('focus', function() {
  getLocation();
  Ti.API.info("map view"+JSON.stringify($));
});