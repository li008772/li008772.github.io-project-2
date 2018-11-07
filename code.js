var mymap;
var markerlayer = new L.LayerGroup();
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
	//const request = new XMLHttpRequest();
	var address = "https://us1.locationiq.com/v1/search.php?key="+token+"&q="+findplace+"&format=json";
    const request1 = new XMLHttpRequest();
  
  if ("withCredentials" in request1) {

    request1.open("GET", address, true);

  } 
  else
	  {

    xhr = null;

  }
  request1.onreadystatechange=function()
	{
		if(this.readyState==4&&this.status==200)
		{
			
			var theanswer = JSON.parse(request1.responseText);
	        mymap.panTo(new L.LatLng(theanswer[0].lat, theanswer[0].lon));
			var location1 = document.getElementById("latitude").value;
	        var location2 = document.getElementById("longtitude").value;
			if(location1 != null && location2 != null)
	        {
	         var center = mymap.getCenter();
	         location1 = center.lat;
	         location2 = center.lng;
	        }
			
		}
		else if(this.status>=400)
		{
			alert("invalid input, try again");
		}
	}
  
	/*
	request.open("GET",address,true);
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
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send();
	*/
	request1.send();
	

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
	var location3 = document.getElementById("goto");
	var token = "6352d14a272592";
	var lat = center.lat;
	var lon = center.lng;
	//const request = new XMLHttpRequest();
	var address = "https://us1.locationiq.com/v1/reverse.php?key="+token+"&lat="+lat+"&lon="+lon+"&format=json";
	console.log(address);
	const request1 = new XMLHttpRequest();
  
  if ("withCredentials" in request1) {

    request1.open("GET", address, true);

  } 
  else
	  {

    xhr = null;

  }
  request1.onreadystatechange=function()
	{
		if(this.readyState==4&&this.status==200)
		{
		
			var theanswer = JSON.parse(request1.responseText);
			console.log(theanswer);
			var thename = document.getElementById("name");
			console.log(thename.value);
			if(thename.value != null)
	        {
	           thename.value = theanswer.display_name.split(',')[0];
			   console.log(theanswer.display_name.indexOf(","));
	        }
			
		}
		else
		{
			var thename = document.getElementById("name").value;
			thename = "no match";
		}

	}
	request1.send();
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



function updateTable(){
	$("#mytable tbody tr").remove();
	var center = mymap.getCenter();
	var lat1 = center.lat;
	var long1 = center.lng;
	var count = 0;
	var store = [100];
	var i=0;
	var chemical =["pm25","pm10","so2","no2","o3","co","bc"];
	var hit = 0;
	var row;
	var cell;
	var trigger = false;
	var marker1;
	var lat;
	var log;
	var popup = "";
	var useful = false;
	var space;
	markerlayer.clearLayers();
	
	var checklist = [7];
	var num1 = 0;
	var check1 = document.getElementById("vehicle1");
	var check2 = document.getElementById("vehicle2");
	var check3 = document.getElementById("vehicle3");
	var check4 = document.getElementById("vehicle4");
	var check5 = document.getElementById("vehicle5");
	var check6 = document.getElementById("vehicle6");
	var check7 = document.getElementById("vehicle7");
	
	if(check1.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check2.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check3.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check4.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check5.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check6.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	if(check7.checked == true )
	{
		checklist[num1] = true;
		num1++;
	}
	else
	{
		checklist[num1] = false;
		num1++;
	}
	console.log("the state of the checklist" + checklist.length);
	
	var edgeNorth = mymap.getBounds().getNorth();
	var edgeEast = mymap.getBounds().getEast();
	var edgeSouth = mymap.getBounds().getSouth();
	var edgeWest = mymap.getBounds().getWest();
	
	var edgeNW = mymap.getBounds().getNorthWest();
	var lat2 = edgeNW.lat;
	var long2 = edgeNW.lng;
	
	//https://api.openaq.org/v1/measurements
	//https://api.openaq.org/v1/locations
	
	var R = haversine(lat1, long1, lat2, long2);
	//console.log(haversine(lat1, long1, lat2, long2));
	var table = document.getElementById("mybody");

	$.ajax({
		url: "https://api.openaq.org/v1/latest?coordinates="+lat1+","+long1+"&radius="+R,
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function(data){
			count = 0;
			space = 0;

			$(data.results).each(function(index, value){
				store[count] = value.measurements;
				popup = "";
				useful = false;
				
				console.log(lat + " " + log);
				row = table.insertRow(space);
				console.log("useful or not? " + useful);
				for(x=0;x<chemical.length;x++)
				{
				for(i=0;i<store[count].length;i++)
				{

				console.log(chemical[x] + " " + store[count][i].parameter + " " + checklist[x] + " "  +useful);
						if(store[count][i].parameter== chemical[x] && (checklist[x] == true))
					{
					cell = row.insertCell(x);
			        cell.innerHTML = store[count][i].value;
					trigger = true;
					useful = true;
					popup = popup + chemical[x] + ": " + store[count][i].value + " | ";
					break;

					}
				}
					
					    if(trigger == false)
						{
						cell = row.insertCell(x);
			            cell.innerHTML = "null";
						}
						trigger = false;
					
				}
				
				if(useful == true)
				{
				lat = value.coordinates.latitude;
				log = value.coordinates.longitude;
	            marker1 = L.marker([lat, log]);
				marker1.bindPopup(popup);
        marker1.on('mouseover', function (e) {
            this.openPopup();
        });
        marker1.on('mouseout', function (e) {
            this.closePopup();
        });
		markerlayer.addLayer(marker1);
		markerlayer.addTo(mymap);
		space++;
				}
				
				if(useful == false)
				{
					table.deleteRow(space);
					console.log("#something is deleated" + count);

				}
				count++;


				
			});
			
		}
		$(document).ready(function() {

$('table td').each(function() {
var num = $(this).text();

if ((num > 0) && (num < 51)) {
$(this).css('backgroundColor', '#00e400'); //green
}
else if((num > 50) && (num < 101)) {
$(this).css('backgroundColor', '#ffff00'); //yellow
}
else if((num > 100) && (num < 151)) {
$(this).css('backgroundColor', '#ff7e00'); //orange
}
else if((num > 150) && (num < 201)) {
$(this).css('backgroundColor', '#ff0000'); //red
}
else if((num > 200) && (num < 301)) {
$(this).css('backgroundColor', '#8f3f97'); //purple
}else {
$(this).css('backgroundColor', '#99faa0'); //maroon
}
});
return false;
});
	});
	/*
	for(i=0;i<store.length;i++)
	{
		console.log("row update" + store[0]);
		row = table.insertRow(i);
		for(l=0;l<store[i].length;l++)
		{
			cell = row.insertCell(l);
			cell.innerHTML = store[i][l].value;
		}
	}*/
	
}

function haversine(){ //haversine formula code borrowed from Rosetta Code https://rosettacode.org/wiki/Haversine_formula#Java
	var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
    var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
    var R = 6371e3; // meters
    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
}

