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

function updatelocation()
{
	var token = "6352d14a272592";
	var type = "geocoding";
	var textInput = document.getElementById("name").value;
	var findplace = textInput.replace(/ /g,"%20");
	const request = new XMLHttpRequest();
	const address = "https://us1.unwiredlabs.com/v2/address.php?type="+type+"&token="+token+"&formate=json&q="+findplace;
	request.open("GET",address);
	request.send();
	request.onreadystatechange=function()
	{
		if(this.readyState==4&&this.status==200)
		{
			alert(request.responseText);
		}
		else if(this.status>=500)
		{
			alert("error");
		}
	}
	

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
	var elem1 = document.getElementById("mymap");
	if(elem1.webkitRequestFullscreen)
	{
	elem1.webkitRequestFullscreen();
	}

	
	
}

