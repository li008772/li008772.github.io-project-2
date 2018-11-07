var mymap;
var markerlayer = new L.LayerGroup();
var heatmark = new L.LayerGroup();
var heat = 0;
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
	var allnumbers;
	var placeholder;
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
			    placeholder = theanswer.display_name.split(',')[0];
				allnumbers = /^\d+$/.test(placeholder);
				if(allnumbers!=true)
				{
	           thename.value = theanswer.display_name.split(',')[0];
				}
				else
				{
					thename.value = theanswer.display_name.split(',')[0]+" " + theanswer.display_name.split(',')[1];
				}
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
	var userinput = ["","","","","","",""];
	var holder1;
	var holder2;
	var holder3;
	var heattarget;
	var intensity;
	
	var greater;
	var equal;
	var lesser;
	
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
	heatmark.clearLayers();
	
	
	var checklist = [7];
	var num1 = 0;
	var check1 = document.getElementById("vehicle1");
	var check2 = document.getElementById("vehicle2");
	var check3 = document.getElementById("vehicle3");
	var check4 = document.getElementById("vehicle4");
	var check5 = document.getElementById("vehicle5");
	var check6 = document.getElementById("vehicle6");
	var check7 = document.getElementById("vehicle7");
	var checkheat = document.getElementById("heatmap");
	
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
	console.log(checklist);
	if(checkheat.checked == true)
	{
	      for(y =0;y<checklist.length;y++)
		  {
			  if(checklist[y]==true)
			  {
				  heattarget = true;
				  break;
			  }
		  }
	}
	console.log("the state of the checklist" + checklist.length);
	
	var pm25in = document.getElementById("pm25");
	var pm25gr = document.getElementById("greater1");
	var pm25eq = document.getElementById("equal1");
	var pm25le = document.getElementById("lesser1");
	if(pm25gr.checked == true)
	{
		holder1 = pm25in.value;
	}
	else
	{
		holder1 = 10000000;
	}
	if(pm25eq.checked == true)
	{
		holder2 = pm25in.value;
	}
	else
	{
		holder2 = -1;
	}
	if(pm25le.checked == true)
	{
		holder3 = pm25in.value;
	}
	else
	{
		holder3 = -1;
	}
	userinput[0]=[holder1,holder2,holder3];
	
	var pm10in = document.getElementById("pm10");
	var pm10gr = document.getElementById("greater2");
	var pm10eq = document.getElementById("equal2");
	var pm10le = document.getElementById("lesser2");
	if(pm10gr.checked == true)
	{
		holder1 = pm10in.value;
	}
	else
	{
		holder1 = 10000000;
	}
	if(pm10eq.checked == true)
	{
		holder2 = pm10in.value;
	}
	else
	{
		holder2 = -1;
	}
	if(pm10le.checked == true)
	{
		holder3 = pm10in.value;
	}
	else
	{
		holder3 = 0;
	}
	userinput[1]=[holder1,holder2,holder3];
	var so2in = document.getElementById("so2");
	var so2gr = document.getElementById("greater3");
	var so2eq = document.getElementById("equal3");
	var so2le = document.getElementById("lesser3");
	if(so2gr.checked == true)
	{
		holder1= so2in.value;
	}
	else
	{
		holder1= 10000000;
	}
	if(so2eq.checked == true)
	{
		holder2= so2in.value;
	}
	else
	{
		holder2= -1;
	}
	if(so2le.checked == true)
	{
		holder3= so2in.value;
	}
	else
	{
		holder3= 0;
	}
	userinput[2]=[holder1,holder2,holder3];
	
	var no2in = document.getElementById("no2");
	var no2gr = document.getElementById("greater4");
	var no2eq = document.getElementById("equal4");
	var no2le = document.getElementById("lesser4");
	if(no2gr.checked == true)
	{
		holder1= no2in.value;
	}
	else
	{
		holder1= 10000000;
	}
	if(no2eq.checked == true)
	{
		holder2= no2in.value;
	}
	else
	{
		holder2= -1;
	}
	if(no2le.checked == true)
	{
		holder3= no2in.value;
	}
	else
	{
		holder3= 0;
	}
	userinput[3]=[holder1,holder2,holder3];
	
	var o3in = document.getElementById("o3");
	var o3gr = document.getElementById("greater5");
	var o3eq = document.getElementById("equal5");
	var o3le = document.getElementById("lesser5");
	if(o3gr.checked == true)
	{
		holder1= o3in.value;
	}
	else
	{
		holder1= 10000000;
	}
	if(o3eq.checked == true)
	{
		holder2= o3in.value;
	}
	else
	{
		holder2= -1;
	}
	if(o3le.checked == true)
	{
		holder3= o3in.value;
	}
	else
	{
		holder3= 0;
	}
	userinput[4]=[holder1,holder2,holder3];
	
	var coin = document.getElementById("co");
	var cogr = document.getElementById("greater6");
	var coeq = document.getElementById("equal6");
	var cole = document.getElementById("lesser6");
	if(cogr.checked == true)
	{
		holder1=coin.value;
	}
	else
	{
		holder1= 10000000;
	}
	if(coeq.checked == true)
	{
		holder2= coin.value;
	}
	else
	{
		holder2= -1;
	}
	if(cole.checked == true)
	{
		holder3= coin.value;
	}
	else
	{
		holder3= 0;
	}
	userinput[5]=[holder1,holder2,holder3];
	
	var bcin = document.getElementById("bc");
	var bcgr = document.getElementById("greater7");
	var bceq = document.getElementById("equal7");
	var bcle = document.getElementById("lesser7");
	if(bcgr.checked == true)
	{
		holder1= bcin.value;
	}
	else
	{
		holder1= 10000000;
	}
	if(bceq.checked == true)
	{
		holder2= bcin.value;
	}
	else
	{
		holder2=-1;
	}
	if(bcle.checked == true)
	{
		holder3= bcin.value;
	}
	else
	{
		holder3= 0;
	}
	userinput[6]=[holder1,holder2,holder3];
	console.log("input lot "+ userinput);
	
	
	
	
	var edgeNorth = mymap.getBounds().getNorth();
	var edgeEast = mymap.getBounds().getEast();
	var edgeSouth = mymap.getBounds().getSouth();
	var edgeWest = mymap.getBounds().getWest();
	var time1;
	var time2;
	var thetime1;
	var thetime2;
	
	var edgeNW = mymap.getBounds().getNorthWest();
	var lat2 = edgeNW.lat;
	var long2 = edgeNW.lng;
	
	//https://api.openaq.org/v1/measurements
	//https://api.openaq.org/v1/locations
	
	var R = haversine(lat1, long1, lat2, long2);
	//console.log(haversine(lat1, long1, lat2, long2));
	var table = document.getElementById("mybody");
	var time = "2018-11-7";
	var webaddress;
	if(document.getElementById("timespecific").value == "")
	{
	webaddress = "https://api.openaq.org/v1/latest?coordinates="+lat1+","+long1+"&radius="+R;
	}
	else
	{
		thetime1 = document.getElementById("timespecific").value;
		thetime2 = document.getElementById("timespecific").value;
		time1 = parseInt(thetime1.charAt(thetime1.length-1),10)-1;
		if(time1 == -1)
		{
			time1=9;
		}
		time2 = parseInt(thetime1.charAt(thetime1.length-1),10)+1;
		thetime1 = thetime1.replace(/.$/,time1)
		thetime2 = thetime2.replace(/.$/,time2)
		webaddress = "https://api.openaq.org/v1/measurements?coordinates="+lat1+","+long1+"&radius="+R+"&date_to="+thetime2+"&date_from="+thetime1;
	}

	$.ajax({
		url: webaddress,
		
		//url: "https://api.openaq.org/v1/measurements?coordinates="+lat1+","+long1+"&radius="+R+"&date_to="+time,
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function(data){
			count = 0;
			space = 0;

			$(data.results).each(function(index, value){
				console.log(value);
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

				console.log(chemical[x] + " " + store[count][i].parameter + " " + checklist[x] + " "  +useful + ": " +store[count][i].value);
				console.log(value);
				if(document.getElementById(chemical[x]).checked == true)
				{
					greater = store[count][i].value>userinput[x][0];
				}
				
				if(store[count][i].parameter== chemical[x] && (checklist[x] == true) && (store[count][i].value>userinput[x][0]|| store[count][i].value==userinput[x][1]||store[count][i].value<userinput[x][2]))
					{
					console.log("updating");
					cell = row.insertCell(x);
			        cell.innerHTML = store[count][i].value;
					trigger = true;
					useful = true;
					popup = popup + chemical[x] + ": " + store[count][i].value + " | ";
					intensity = store[count][i].value/150;
					if(intensity>200)
					{
						intensity = 200;
					}
					
					if(store[count][i].value > 0 && store[count][i].value < 51)
					{
						cell.style.background = '#00e400';
						
					}
					else if(store[count][i].value > 50 && store[count][i].value < 100)
					{
						cell.style.background = '#ffff00';
					}
					else if(store[count][i].value > 100 && store[count][i].value < 151)
					{
						cell.style.background = '#ff7e00';
						if(chemical[x] == "o3")
						{
				
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with lung disease, children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients are the groups most at risk ");       
						}		
                        if(chemical[x] == "pm25" || chemical[x] == "pm10")
						{
		
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart or lung disease, older adults, children, and people of lower socioeconomic status are the groups most at risk ");     
						}	
if(chemical[x] == "co")
						{
				
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart disease is the group most at risk ");       
						}
if(chemical[x] == "no2" || chemical[x] == "so2")
						{
					
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with asthma, children, and older adults are the groups most at risk ");      	
						
					}
					}
					else if(store[count][i].value > 150 && store[count][i].value < 201)
					{
						cell.style.background = '#ff0000';
						if(chemical[x] == "o3")
						{
				
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with lung disease, children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients are the groups most at risk ");      
						}		
                        if(chemical[x] == "pm25" || chemical[x] == "pm10")
						{
	
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart or lung disease, older adults, children, and people of lower socioeconomic status are the groups most at risk ");
						}	
if(chemical[x] == "co")
						{
				
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart disease is the group most at risk ");       
						}
if(chemical[x] == "no2" || chemical[x] == "so2")
						{
	
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with asthma, children, and older adults are the groups most at risk ");  
						}	
					}
					else if(store[count][i].value > 200 && store[count][i].value < 301)
					{
						cell.style.background = '#8f3f97';
						if(chemical[x] == "o3")
						{
		
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with lung disease, children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients are the groups most at risk ");      

						}		
                        if(chemical[x] == "pm25" || chemical[x] == "pm10")
						{
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart or lung disease, older adults, children, and people of lower socioeconomic status are the groups most at risk ");       

						}	
if(chemical[x] == "co")
						{
						
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart disease is the group most at risk ");       
						}
if(chemical[x] == "no2" || chemical[x] == "so2")
						{
						alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with asthma, children, and older adults are the groups most at risk ");       // 
						}	
					}
					else 
					{
						cell.style.background = '#99faa0';
						if(chemical[x] == "o3")
						{
					
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with lung disease, children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients are the groups most at risk ");     
						}		
                        if(chemical[x] == "pm25" || chemical[x] == "pm10")
						{
		
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart or lung disease, older adults, children, and people of lower socioeconomic status are the groups most at risk ");    
						}	
if(chemical[x] == "co")
						{
						
                        var t = document.alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with heart disease is the group most at risk ");       
						}
if(chemical[x] == "no2" || chemical[x] == "so2")
						{
					
                        alert(value.coordinates.latitude+ ""+value.coordinates.longitude+ ": People with asthma, children, and older adults are the groups most at risk ");      
						}	
					}
					
					
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
		console.log("i need the color: "+ heattarget);
		if(heattarget==true)
		{
		 heat = L.heatLayer([
	[lat, log, intensity]// lat, lng, intensi
],
	{
		radius: 40,
		minOpacity: 0.3,
		blur:20,
		gradient: {
                    0.1: '#f9f345',
                    0.3: '#ff9d00',
                    0.5: '#ff6100',
					0.7:'#ff0000',
					0.9: '#ff00c7'
                }
	
	}
);
heatmark.addLayer(heat);
heatmark.addTo(mymap);
		}
				}
				
				if(useful == false)
				{
					table.deleteRow(space);
					console.log("#something is deleated" + count);

				}
				count++;


				
			});
			
		}
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
/*
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
*/
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

