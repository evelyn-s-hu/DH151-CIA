// Global variables
let map;
let lat = 35;
let lon = -100;
let zl = 4;
let path = '';
// put this in your global variables
let geojsonPath = 'data/statemapdata_may21.geojson';
let geojson_data;
let geojson_layer;
let newsPath = 'data/HateNewsArticles.csv';
let state;

let brew = new classyBrew();

let legend = L.control({position: 'bottomright'});

let info_panel = L.control();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    // here you have to run all functions that you create later on 
    getGeoJSON();

});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// GRAB & MAP GEOJSON DATA: function to get the geojson data (this is a jquery, similar to papaparse)
function getGeoJSON(){

	$.getJSON(geojsonPath,function(data){ // geojsonPath is the path to the geojson file
		// console.log(data)

		// put the data in a global variable
		geojson_data = data;

		// console.log (geojson_data)

		// call the map function
		mapGeoJSON('total_cases'); // add the field to be used!!!!
	})
}

function mapGeoJSON(field,num_classes,color,scheme){

	// clear layers in case it has been mapped already
	if (geojson_layer){
		geojson_layer.clearLayers()
	}
	
	// globalize the field to map
	fieldtomap = field;

	// create an empty array
	let values = [];

	// based on the provided field, enter each value into the array
	geojson_data.features.forEach(function(item,index){
		values.push(item.properties[field])
	})

	// set up the "brew" options
	brew.setSeries(values);
	brew.setNumClasses(9); // between 3 - 9 (or maybe depends on the variable)
	brew.setColorCode('OrRd'); // brew color options 
	brew.classify('jenks'); // brew classification method 

	// create the layer and add to map
	geojson_layer = L.geoJson(geojson_data, {
		style: getStyle, //call a function to style each feature
        onEachFeature: onEachFeature // add this arg to implement actions on each feature
	}).addTo(map);

    // create the legend
	createLegend();

    // create the infopanel
	createInfoPanel();
}

function getStyle(feature){
	return {
		stroke: true,
		color: 'white',
		weight: 1,
		fill: true,
		fillColor: brew.getColorInRange(Number(feature.properties[fieldtomap])),
		fillOpacity: 0.8
	}
}

// LEGEND
function createLegend(){
	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
		breaks = brew.getBreaks(),
		labels = [],
		from, to;
		
		for (var i = 0; i < breaks.length; i++) {
			from = breaks[i];
			to = breaks[i + 1];
			if(to) {
				labels.push(
					'<i style="background:' + brew.getColorInRange(Number(from)) + '"></i> ' +
					Number(from).toFixed(0) + ' &ndash; ' + Number(to).toFixed(0));
				}
			}
			
			div.innerHTML = labels.join('<br>');
			return div;
		};
		
		legend.addTo(map);
}

// onEachFeature ACTIONS: Functions that defines what will happen on user interactions with each feature
function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

// on mouse over, highlight the feature
function highlightFeature(e) {
	var layer = e.target;
	// console.log(layer);
	// style to use on mouse over
	layer.setStyle({
		weight: 2,
		color: '#666',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

    info_panel.update(layer.feature.properties); // add info panel when a user hovers over a feature

	createDashboard(layer.feature.properties)
}

// on mouse out, reset the style, otherwise, it will remain highlighted
function resetHighlight(e) {
	geojson_layer.resetStyle(e.target);
    info_panel.update(); // resets infopanel
}

// on mouse click on a feature, zoom in to it
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

// INFO PANEL (top right, when hovering over state)
function createInfoPanel(){

	info_panel.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info_panel.update = function (properties) {
		this._div.innerHTML = 'Hover over a state to get information on the total crimes committed.';
		
		/* since we have the chart, do without the hover-action showing the total number of cases. code for that: 
		// if feature is highlighted
		if(properties){
			this._div.innerHTML = `<b>${properties.NAME}</b><br>${'Total Number of Crimes'}: ${properties[fieldtomap]}`;
		}
		// if feature is not highlighted
		else
		{
			this._div.innerHTML = 'Hover over a state to get information on the total crimes committed.';
		}
		*/
	};

	info_panel.addTo(map);
	newsArticles();

}

function createDashboard(properties){
	console.log(properties)
	// state = properties.NAME
}

// CHART
// createDashboard function
function createDashboard(properties){

	// clear dashboard
	$('.dashboard').empty();

	console.log(properties)

	// chart title: can put variable name !!!
	let title = `${properties.NAME} (${properties.total_cases} hate crimes)`; // city name variable in dataset

	// data values: insert values OR variable names here !!!
	// let data = [27,17,17,20]; 
    let data = [properties['anti_race_total'], properties['anti_religion_total'], properties['anti_gender_total'], properties['anti_sexual_orientation_total'], properties['anti_ableism_total']]

	// data fields: labels for the pie chart !!!
	let fields = ['Anti-race','Anti-religion','Anti-gender', 'Anti-sexual orientation', 'Anti-ableism'];

	// set chart options: see documentation here (https://apexcharts.com/)

	// for a bar chart:
	let options = {
		chart: {
			type: 'bar',
			height: 300,
			animations: {
				enabled: false,
			},
			fontFamily: 'Poppins'
		},
		title: {
			text: title,
			style: {
				fontSize: '30px'
			}
		},
		
		plotOptions: {
			bar: {
				horizontal: true
			}
		},
		series: [
			{
				data: data
			}
		],
		xaxis: {
			categories: fields
		},
		fill: {
			colors: ['#F84F4F']
		}

    
    /* for a pie chart:
    let options = {
	    chart: {
		    type: 'pie',
		    height: 600, // size of pie chart
		    width: 600,	// size of pie chart
		    animations: {
			    enabled: false,
		    }
	    },
	    title: {
		    text: title,
	    },
	    series: data,
	    labels: fields,
	    legend: {
	    position: 'right',
		    offsetY: 0,
		    height: 230,
	    }
    */
   
	};
	
	// create the chart
	let chart = new ApexCharts(document.querySelector('.dashboard'), options)
	chart.render()
	
}

// function getNewsArticles()
// {
// }

function newsArticles(){
	var myDiv = document.getElementsByClassName("info");
	console.log(myDiv[2]);
	var articleTitle = "Hate Crime Charges Filed In Attack on California Sikh Man"
	var articleImage = "<img src=https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2016_41/1744096/maansinghkhalsa1.jpg>"
	var articleLink = "<a href=https://www.nbcnews.com/news/asian-america/hate-crime-charges-filed-attack-california-sikh-man-n666651>"
	var articleDate = " October 14, 2016"
	var article2 = "Man Charged With Hate Crime After Allegedly Threatening Muslim NYPD Officer"
	var article2Image = "<img src=https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1120w,f_auto,q_auto:best/newscms/2016_49/1821006/161205_muslim_cop_attacked.jpg>"
	var article2Link = "<a href=https://www.nbcnews.com/news/asian-america/man-charged-hate-crime-after-allegedly-threatening-muslim-nypd-officer-n692171>"
	var article2Date = "December 5, 2016"
	var article3 = "Kansas man charged with hate crime in fatal shooting of Indian engineer"
	var article3Image = "<img src=https://cbsnews1.cbsistatic.com/hub/i/2017/06/09/4b4c8012-a5ac-4171-9abc-4d8aadc434a4/ap-17160763141630.jpg>"
	var article3Link = "<a href=https://www.cbsnews.com/news/adam-purinton-faces-hate-crime-charges-in-fatal-shooting-of-indian-engineer/>"
	var article3Date = "June 9, 2017"
	var paragraph1 ="<u>" + articleLink + articleTitle + "</a>"+"</u>" + "<br>" + articleDate + "<br><br>" + articleImage;
	var paragraph2 = "<u>" + article2Link + article2 + "</a>"+"</u>" + "<br>" + article2Date + "<br><br>" + article2Image;
	var paragraph3 ="<u>" + article3Link + article3 + "</a>"+"</u>" + "<br>" + article3Date + "<br><br>" + article3Image;
	
	// articledata = [""]

	// var article = `${properties.NAME} (${properties.total_cases} hate crimes)`
	/*whatever u want to change inside the info tab content u can just do it here by changing what is inside the content to show*/
	myDiv[2].innerHTML = "<h2>Hate Crimes News Articles: </h2>" + paragraph1 + "<br><br>" + paragraph2 + "<br><br>" + paragraph3;

	/*https://stackoverflow.com/questions/36859062/how-to-set-image-via-innerhtml just search stuff related to innerhtml if u need help*/

}