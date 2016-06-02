var XHR = require("/xhr");
var xhr = new XHR();
var args = arguments[0] || {};
Ti.API.info(JSON.stringify(args))
var lat = undefined;
var lng = undefined;
var driverAccountNo=0

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
	var A1 = MapModule.createAnnotation({
		latitude : e.coords.latitude,
		longitude : e.coords.longitude,
		//pincolor : MapModule.ANNOTATION_GREEN,
		image: '/images/car1.jpg',
		myid:1,
		// Even though we are creating a button, it does not respond to Button events or animates.
		// Use the Map View's click event and monitor the clicksource property for 'leftPane'.
		//leftView: Ti.UI.createButton({title: 'Detail'}),
		// For eventing, use the Map View's click event
		// and monitor the clicksource property for 'rightPane'.
		//rightButton: 'SydneyHarbourBridge.jpg',
		title : 'Car 1',
		subtitle : '30 min'
	});
	
	
	var innerview = Titanium.UI.createView({
    height:'auto',
    width:'100auto',
    backgroundColor:'#FFDDEE',
    layout:'vertcal'
});



var innerButton = Titanium.UI.createButton({
    height:'auto',
    width:'80',
    title:'centered',
    verticalAlign:'center',
});

innerview.add(innerButton);
	var A2 = MapModule.createAnnotation({
		latitude : parseFloat(e.coords.latitude) - 0.01,
		longitude : e.coords.longitude,
		//pincolor : MapModule.ANNOTATION_VIOLET,
		rightButton: '/images/car2.jpg',
		image: '/images/car2.jpg',
		myid:2,
		// Even though we are creating a label, it does not respond to Label events.
		// Use the Map View's events instead.
		leftView: Ti.UI.createLabel({
			text: 'MOVE ME!',
		 backgroundImage: '/images/3start.png'

		 }),
		title : 'Car 2',
		subtitle : '35 min',
		draggable : true
	});
	var A3 = MapModule.createAnnotation({
		latitude : e.coords.latitude,
		longitude : parseFloat(e.coords.longitude) - 0.01,
		//pincolor : MapModule.ANNOTATION_RED,
		image: '/images/car3.jpg',
		myid:3,
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
		title : 'Car 3',
		subtitle : '20 min',
		draggable : true
	});
	$.mapview.addAnnotation(A1);
	$.mapview.addAnnotation(A2);
	$.mapview.addAnnotation(A3);
	//xhr.get("https://maps.googleapis.com/maps/api/directions/json?origin=place_id:"+args.source+"&destination=place_id:"+args.destination+"&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onGeocodeSuccessCallback, onGeocodeErrorCallback);
};

$.mapview.addEventListener('click', function(e){
	if (e.clicksource == "pin")
	{
		Ti.API.info(e.annotation.myid);
		driverAccountNo=e.annotation.myid;
	}
    //Ti.API.info(e.type);
    //Ti.API.info(JSON.stringify(e.clicksource));
});
function onGeocodeErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode error" + e.status + e.data);

};

function onGeocodeSuccessCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode success" + e.status + e.data);

};
var A1 = MapModule.createAnnotation({
	latitude : 33.74411,
	longitude : -84.38773,
	pincolor : MapModule.ANNOTATION_GREEN,
	// Even though we are creating a button, it does not respond to Button events or animates.
	// Use the Map View's click event and monitor the clicksource property for 'leftPane'.
	//leftView: Ti.UI.createButton({title: 'Detail'}),
	// For eventing, use the Map View's click event
	// and monitor the clicksource property for 'rightPane'.
	//rightButton: 'SydneyHarbourBridge.jpg',
	title : 'Car 1',
	subtitle : '30 min'
});

//getLocation();
Ti.Geolocation.addEventListener('location', getLocation);

function doRequestClick(e) {
	Alloy.createController('driverDetails', {
			source : driverAccountNo,
			rpoints:args.rpoints,
			placeId:args.placeId
		}).getView().open();
};

