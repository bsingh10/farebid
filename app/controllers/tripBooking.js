var geo = require('geo');
var XHR = require("/xhr");
var xhr = new XHR();
var loc1 = undefined;
var loc2 = undefined;

$.wordTV.addEventListener('click', function(e) {
	Ti.API.info("index: $.wordTV.addEventListener(click)");

	alert("row clicked, word = " + e.row.word);
});

function resetTable(table) {
	Ti.API.info("index: resetTable()");

	var rd = [];
	table.data = rd;
}

function processInput(e) {

	//Ti.API.info("destination address"+e.source.value);
	//geo.forwardGeocode();
	Ti.API.info("index: processInput()");

	if (e.source.value == "" || e.source.value == null) {
		resetTable($.wordTV);
	} else {
		geo.forwardGeocode(e.source.value, function(e) {
			Ti.API.info('Recieved data = ' + e);
			loadTable(e, $.wordTV);
		});
	}
}

function loadTable(e, table) {
	Ti.API.info("index: loadTable()");

	var reply = e;
	var rows = [];
	var tt = [];
	var i = 0;

	Ti.API.info("index: reply = " + reply);

	if (reply.length > 0) {

		_.each(reply, function(item) {
			rows.push(Alloy.createController('wordRow', {
				word : item.formatted_address,
			}).getView());
			//	tt.push(item.formatted_address);
		});

	} else {
		alert("No words found.");
	}

	//$.wordTV.setData(rows);
	//table.setData(rows);
	//table.top="83%";
}

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

	xhr.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + e.coords.latitude + "," + e.coords.longitude + "&location_type=APPROXIMATE&sensor=false&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onSuccessCallback, onErrorCallback);
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
	Ti.API.info("respons 55 data" + e.status);
	var response = JSON.parse(e.data);
	Ti.API.info("respons data11" + (JSON.parse(e.data)).results);

	Ti.API.info("respons data22" + JSON.stringify(e.data));

	if (response.status == "OK") {
		var resLen = response.results[0].address_components.length;
		var address = "";
		for (var i = 0; i < resLen; i++) {
			switch (response.results[0].address_components[i].types[0]) {
			case "street_number":
				Ti.API.info("street number : " + response.results[0].address_components[i].long_name);
				address = address + response.results[0].address_components[i].long_name;
				break;
			case "route":
				Ti.API.info("street name : " + response.results[0].address_components[i].long_name);
				address = address + ' ' + response.results[0].address_components[i].long_name;
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
			$.txtSource.value = response.results[0].formatted_address;
			
			$.txtSource.indx=response.results[0].geometry.location;
			Ti.API.info("maps reversegocode " + response.results[0].place_id + '  ' + response.results[0].formatted_address);
			Ti.API.info("maps reversegocode " + JSON.stringify(response));
			loc1 = response.results[0].place_id;
			$.txtSource.place_id=response.results[0].place_id;
		}
	} else {
		alert('Unable to find Address');
	}

};

function onErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps reversegocode error" + e);

};
//var baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
// var url=baseURL+encodeURIComponent(prepareAddress(_row.BillingStreet))+"&key="+googleMapAPIKey;

function doRequestClick(e) {
	if ($.txtDestination.value == "" || $.txtSource.value == "") {
		alert("Enter source and destination address");
		return;
	}
	$.txtDestination.blur();
	$.txtSource.blur();
	showIndicator(e);

};

$.tripBooking.addEventListener('focus', function() {
	//getLocation();
	//Ti.API.info("map view"+JSON.stringify($));
});

function onGeocodeErrorCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode error" + e.status + e.data);

};

function onGeocodeSuccessCallback(e) {
	// Handle your errors in here
	Titanium.API.info("maps gocode success" + e.status + e.data);

	Ti.API.info("respons 99 data" + e.status);
	var response = JSON.parse(e.data);
	Ti.API.info("respons data100" + (JSON.parse(e.data)).results);

	Ti.API.info("respons data150" + JSON.stringify(e.data));
	Ti.API.info("maps reversegocode " + response.results[0].place_id + '  ' + response.results[0].formatted_address);
	loc2 = response.results[0].place_id;

};
function doReturn(e) {
	var add = e.source.value.split(' ').join('+');
	Ti.API.info("destination address" + add);
	xhr.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + add + "&key=AIzaSyAl7zrQ1cB9Zw-3iMEqq6Gg3llze5tWuxk", onGeocodeSuccessCallback, onGeocodeErrorCallback);
	//1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

}

function doSearchsource(e) {

	//processInput(e);

	//Ti.API.info("destination address"+e.source.value);
	geo.forwardGeocode(e.source.value, function(data) {
		var tt = [];
		var geoLoc=[];
		var place_id=[];

		if (data.length > 0) {

			for (var index = 0; index < data.length; index++) {

				tt.push(data[index].formatted_address);
				geoLoc.push(data[index].location)
				place_id.push(data[index].place_id);
			};

		};
		var opts = {
			cancel : 2,
			options : tt,
			selectedIndex : 1,
			destructive : 0,
			title : 'Select Location'
		};
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.addEventListener('click', function(e) {
			$.txtSource.value = tt[e.index];
			Ti.API.info(JSON.stringify(geoLoc[e.index]));
			$.txtSource.indx=geoLoc[e.index];
			$.txtSource.place_id=place_id[e.index];

		});
		dialog.show();
	});

}

function doSearchDest(e) {
	geo.forwardGeocode(e.source.value, function(data) {
		var tt = [];
		var geoLoc=[];
		var place_id=[];
		if (data.length > 0) {
			Ti.API.info("destination "+JSON.stringify(data))

			for (var index = 0; index < data.length; index++) {

				tt.push(data[index].formatted_address);
				geoLoc.push(data[index].location)
				place_id.push(data[index].place_id);
				Ti.API.info("destination "+data[index].location)
			};

		};
		var opts = {
			cancel : 2,
			options : tt,
			selectedIndex : 1,
			destructive : 0,
			title : 'Select Location'
		};
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.addEventListener('click', function(e) {
			$.txtDestination.value = tt[e.index];
			Ti.API.info(JSON.stringify(geoLoc[e.index]));
			$.txtDestination.indx=geoLoc[e.index];
			$.txtDestination.place_id=place_id[e.index];
		});
		dialog.show();
	});
}

function showIndicator(e) {

	var view = Titanium.UI.createView({
		// borderRadius:10,
		backgroundColor : '#80FFFFFF',
		//width:50,
		top : "76%"
	});
	var progressIndicator = Ti.UI.Android.createProgressIndicator({
		message : 'Bidding in Progress....',
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
		cancelable : false,
		backgroundColor : 'white',
		top : '65%'

	});
	//view.add(progressIndicator);
	$.tripBooking.add(progressIndicator);
	progressIndicator.show();
	//$.activityIndicator.show();
	// do some work that takes 6 seconds
	// ie. replace the following setTimeout block with your code
	setTimeout(function() {
		//e.source.close();

		Alloy.createController('bookingConfirmation', {
			source : $.txtSource.value,
			rpoints:[{latitude:$.txtSource.indx.lat, longitude:$.txtSource.indx.lng},
		{latitude:$.txtDestination.indx.lat, longitude:$.txtDestination.indx.lng}
	],
	placeId:[$.txtSource.place_id,$.txtDestination.place_id],
			destination : $.txtDestination.value
		}).getView().open();
		$.tripBooking.close();
	}, 10000);
	
}