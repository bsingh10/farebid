/*
Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

var MapModule = require('ti.map');
var mapview = MapModule.createView({mapType:MapModule.NORMAL_TYPE});
var rc = MapModule.isGooglePlayServicesAvailable();
switch (rc) {
    case MapModule.SUCCESS:
        Ti.API.info('Google Play services is installed.');
        break;
    case MapModule.SERVICE_MISSING:
        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
        break;
    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
        alert('Google Play services is out of date. Please update Google Play services.');
        break;
    case MapModule.SERVICE_DISABLED:
        alert('Google Play services is disabled. Please enable Google Play services.');
        break;
    case MapModule.SERVICE_INVALID:
        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
        break;
    default:
        alert('Unknown error.');
}

var win = Ti.UI.createWindow({backgroundColor: 'white'});
var map1 = MapModule.createView({
    userLocation: true,
    mapType: MapModule.NORMAL_TYPE,
    animate: true,
    region: {latitude: -33.87365, longitude: 151.20689, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    height: '70%',
    top: '10%'
    });
    
    function getLocation(){
//Get the current position and set it to the mapview
Titanium.Geolocation.getCurrentPosition(function(e){
	Ti.API.info("geo location "+JSON.stringify(e));
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.001,
            longitudeDelta:0.001
        };
       // map1.setLocation(region);
});
};
Ti.API.info("get location called ");
getLocation();
Titanium.Geolocation.addEventListener('location',function(){
    getLocation();
  //  Ti.API.info("map view"+JSON.stringify(map1));
});

var isAnnotationVisiable = false;
function createAnnotations ()
{
	if (isAnnotationVisiable)
	return ;
	var rg=map1.createAnnotations
    var annoatationData = [];
    for (var i=0; i < 10; i++) 
    {
            var mountainView = Titanium.Map.createAnnotation(
            {
                latitude:37.390749,
                longitude:-122.081651,
                title:"Appcelerator Headquarters",
                subtitle:'Mountain View, CA',
                pincolor: isAndroid ? "orange" : Titanium.Map.ANNOTATION_RED,
                animate:true,
                myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
            });

      annoatationData.push(mountainView);
    };  
   isAnnotationVisiable
    return annoatationData ;
}
win.add(map1);
Ti.API.info("logion started open");
win.open();

*/

function doDriveNowClick(e) {
   Alloy.createController('tripBooking').getView().open();
}

function doDriveLaterClick(e) {
    Alloy.createController('tripBooking').getView().open();
}

