var XHR = require("/xhr");
var xhr = new XHR();
var loc1 = undefined;
var loc2 = undefined;

Ti.Geolocation.purpose = "Recieve User Location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = 10;

var providerPassive = Ti.Geolocation.Android.createLocationProvider({
	name : Ti.Geolocation.PROVIDER_PASSIVE,
	minUpdateDistance : 0.0,
	minUpdateTime : 0
});

var providerNetwork = Ti.Geolocation.Android.createLocationProvider({
	name : Ti.Geolocation.PROVIDER_NETWORK,
	minUpdateDistance : 0.0,
	minUpdateTime : 5
});

var providerGps = Ti.Geolocation.Android.createLocationProvider({
	name : Ti.Geolocation.PROVIDER_GPS,
	minUpdateDistance : 0.0,
	minUpdateTime : 0
});

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
	//Ti.API.info("lurrent lat long " + e.coords.latitude + '    ' + e.coords.longitude + ' '+JSON.stringify($.mapview.region));
	//$.mapview.setRegion(region);
	//Ti.Yahoo.yql('select * from yahoo.maps.findLocation where q="'+e.coords.latitude+','+e.coords.longitude+'" and gflags="R"',function(e) {
	//var woeid = e.data.ResultSet.Results.woeid;
	//Ti.API.info(JSON.stringify(e));
	//});
	//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=street_address&key
	//xhr.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.8550979,-74.4271461&result_type=street_address&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onSuccessCallback, onErrorCallback);

//http://open.mapquestapi.com/geocoding/v1/reverse?key=GTY9yamNvQY1AsFZuwH7dUSrfkcXzz8U&callback=renderReverse&location=40.053116,-76.313603

//	xhr.get("http://open.mapquestapi.com/geocoding/v1/reverse?key=GTY9yamNvQY1AsFZuwH7dUSrfkcXzz8U&callback=renderReverse&location=40.8550979,-74.4271461", onSuccessCallback, onErrorCallback);

	xhr.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+e.coords.latitude+","+e.coords.longitude+"&location_type=APPROXIMATE&sensor=false&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onSuccessCallback, onErrorCallback);
	//Ti.API.error(e.coords.longitude);
	//Ti.API.error(e.coords.latitude);
	
	//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
};

Ti.Geolocation.Android.addLocationProvider(providerPassive);
Ti.Geolocation.Android.addLocationProvider(providerNetwork);
Ti.Geolocation.Android.addLocationProvider(providerGps);
Ti.Geolocation.Android.manualMode = true;
Ti.Geolocation.addEventListener('location', locationCallback);
providerPassive = null;
providerNetwork = null;
providerGps = null;
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
//Titanium.Geolocation.addEventListener('location', function() {
//	getLocation();
//  Ti.API.info("map view"+JSON.stringify(map1));
//});

// Normal plain old request without caching

function onSuccessCallback(e) {
	// Handle your request in here
	// the module will return an object with two properties
	// data (the actual data retuned
	// status ('ok' for normal requests and 'cache' for requests cached
    //var rr= JSON.stringify(e);
	//var response = JSON.parse(rr);
	//var response = res.data;
	Ti.API.info("respons 55 data"+ e.status);
	var response = JSON.parse(e.data);
	Ti.API.info("respons data11"+ (JSON.parse(e.data)).results);

	Ti.API.info("respons data22"+ JSON.stringify(e.data));

	if (response.status == "OK") {
		var resLen = response.results[0].address_components.length;
		var address ="";
		for (var i = 0; i < resLen; i++) {
			switch (response.results[0].address_components[i].types[0]) {
			case "street_number":
				Ti.API.info("street number : " + response.results[0].address_components[i].long_name);
				address = address + response.results[0].address_components[i].long_name;
				break;
			case "route":
				Ti.API.info("street name : " + response.results[0].address_components[i].long_name);
				address = address +' '+ response.results[0].address_components[i].long_name;
				break;
			case "locality":
				Ti.API.info("city name : " + response.results[0].address_components[i].long_name);
				//address = address + response.results[0].address_components[i].long_name;
				break;
			case "administrative_area_level_1":
				Ti.API.info("state name : " + response.results[0].address_components[i].long_name);
				//address = address + response.results[0].address_components[i].long_name;
				break;
			case "postal_code":
				Ti.API.info("zip code : " + response.results[0].address_components[i].long_name);
				//address = address + response.results[0].address_components[i].long_name;
				break;
			case "country":
				Ti.API.info("country name : " + response.results[0].address_components[i].long_name);
				break;
			}
			$.txtSource.value = response.results[0].formatted_address ;
	Ti.API.info("maps reversegocode " + response.results[0].place_id +'  '+response.results[0].formatted_address);
	loc1=response.results[0].place_id;
		}
	} else {
		alert( 'Unable to find Address');
	}
	
};

function onErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps reversegocode error" + e);

};
//var baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
// var url=baseURL+encodeURIComponent(prepareAddress(_row.BillingStreet))+"&key="+googleMapAPIKey;

function doRequestClick(e) {
	Alloy.createController('bookingConfirmation',{source:loc1,destination:loc2}).getView().open();
};

$.tripBooking.addEventListener('focus', function() {
	//getLocation();
	//Ti.API.info("map view"+JSON.stringify($));
}); 


function onGeocodeErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode error" +e.status + e.data);

};

function onGeocodeSuccessCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode success" + e.status + e.data);
	
	Ti.API.info("respons 99 data"+ e.status);
	var response = JSON.parse(e.data);
	Ti.API.info("respons data100"+ (JSON.parse(e.data)).results);

	Ti.API.info("respons data150"+ JSON.stringify(e.data));
	Ti.API.info("maps reversegocode " + response.results[0].place_id +'  '+response.results[0].formatted_address);
	loc2=response.results[0].place_id;


};
function doReturn(e)
{
	var add = e.source.value.split(' ').join('+');
	Ti.API.info("destination address"+add);
	xhr.get("https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onGeocodeSuccessCallback, onGeocodeErrorCallback);	
	//1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

}
