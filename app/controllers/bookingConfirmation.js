var XHR = require("/xhr");
var xhr = new XHR();
var args = arguments[0] || {};

var MapModule = require('ti.map');
Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

function getLocation(e) {
	Ti.API.info("current position view" + JSON.stringify(e));
	//  LK.map_is_running = false;
	if (!e.success || e.error) {
		alert("Cannot get your location");
		return;
	}

	Ti.Geolocation.removeEventListener('location', getLocation);
	var region = {
		latitude : e.coords.latitude,
		longitude : e.coords.longitude,
		animate : true,
		latitudeDelta : 0.02,
		longitudeDelta : 0.02
	};
	// $.mapview.setLocation(region);
$.mapview.setRegion(region);
xhr.get("https://maps.googleapis.com/maps/api/directions/json?origin=place_id:"+args.source+"&destination=place_id:"+args.destination+"&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onGeocodeSuccessCallback, onGeocodeErrorCallback);
};

function onGeocodeErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode error" +e.status + e.data);

};

function onGeocodeSuccessCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode success" + e.status + e.data);


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
Ti.Geolocation.addEventListener('location', getLocation);

function doRequestClick(e) {
	alert("requesting");
};
$.mapview.addAnnotation(A1);
$.mapview.addAnnotation(A2);
$.mapview.addAnnotation(A3);


