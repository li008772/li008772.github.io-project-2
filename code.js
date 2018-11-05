var mymap;

function createMap()
{
	var mymap = L.map('mymap').setView([51.505, -0.09], 13);
	mymap.on("moveend",alert());
}

function searchMap(map,lat,longti)
{
	map.setView([lat,longti], 13);
}

function updateMap()
{
	var location1 = document.getElementById("latitude").value;
	var location2 = document.getElementById("longtitude").value;
	mymap.panTo(new L.LatLng(location1, location2));
}

function updateBox()
{
	var location1 = document.getElementById("latitude");
	var location2 = document.getElementById("longtitude");
	if(location1 != null && location2 != null)
	{
	var center = mymap.getCenter();
	location1.value = center.lat;
	location2.value = center.lng;
	}
}

function test()
{
	alert();
}

function fullscreen()
{
	var elem = document.body;
	var full = elem.webkitRequestFullScreen ;
	if(full)
	{
	full.call(elem);
	}
	
}

