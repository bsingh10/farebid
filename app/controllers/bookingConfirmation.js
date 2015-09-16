var MapModule = require('ti.map');
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

var A1 = MapModule.createAnnotation({
    latitude: 33.74411,
	longitude: -84.38773,
    pincolor: MapModule.ANNOTATION_GREEN,
    // Even though we are creating a button, it does not respond to Button events or animates.
    // Use the Map View's click event and monitor the clicksource property for 'leftPane'.
    //leftView: Ti.UI.createButton({title: 'Detail'}),
    // For eventing, use the Map View's click event
    // and monitor the clicksource property for 'rightPane'.
    //rightButton: 'SydneyHarbourBridge.jpg',    
    title: 'Car 1',
    subtitle: '30 min'
});
var A2 = MapModule.createAnnotation({
    latitude: 33.74511,
	longitude: -84.38883,
    pincolor: MapModule.ANNOTATION_VIOLET,
    // Even though we are creating a label, it does not respond to Label events.
    // Use the Map View's events instead.    
    /*customView: Ti.UI.createLabel({
        text: 'MOVE ME!',
        opacity: '80%',
        color: 'red',
        backgroundColor: 'gray',
        font: {
            fontSize: '16dp',
            fontWeight: 'bold'
        }
    }),*/
   title: 'Car 2',
    subtitle: '35 min',
    draggable: true
});
var A3 = MapModule.createAnnotation({
     latitude: 33.74411,
	longitude: -84.38663,
    pincolor: MapModule.ANNOTATION_RED,
    // Even though we are creating a label, it does not respond to Label events.
    // Use the Map View's events instead.    
   /* customView: Ti.UI.createLabel({
        text: 'MOVE ME!',
        opacity: '80%',
        color: 'red',
        backgroundColor: 'gray',
        font: {
            fontSize: '16dp',
            fontWeight: 'bold'
        }
    }),*/
   title: 'Car 3',
    subtitle: '20 min',
    draggable: true
});
//getLocation();
Titanium.Geolocation.addEventListener('location', function() {
	getLocation();
	//  Ti.API.info("map view"+JSON.stringify(map1));
});

function doRequestClick(e) {
	alert("requesting");
};
$.mapview.addAnnotation(A1);
$.mapview.addAnnotation(A2);
$.mapview.addAnnotation(A3);
$.bookingConfirmation.addEventListener('focus', function() {
  //getLocation();
 // $.mapview.addAnnotation(random);
});