// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 10;
let path = '';
// put this in your global variables
let geojsonPath = 'data/race2010bystates_may11.geojson';
let geojson_data;
let geojson_layer;

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

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// GRAB & MAP GEOJSON DATA: function to get the geojson data (this is a jquery, similar to papaparse)
function getGeoJSON(){

	$.getJSON(geojsonPath,function(data){ // geojsonPath is the path to the geojson file
		// console.log(data)

		// put the data in a global variable
		geojson_data = data;

        console.log(geojson_data)
		// console.log (geojson_data)

		// call the map function
		mapGeoJSON('American_Indian_and_Alaska_Native') // add the field to be used!!!!
	})
}

function mapGeoJSON(field){

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
	brew.setColorCode('RdYlGn'); // brew color options 
	brew.classify('jenks'); // brew classification method 

	// create the layer and add to map
	geojson_layer = L.geoJson(geojson_data, {
		style: getStyle, //call a function to style each feature
        onEachFeature: onEachFeature // add this arg to implement actions on each feature
	}).addTo(map);

	map.fitBounds(geojson_layer.getBounds())

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
					Number(from).toFixed(2) + ' &ndash; ' + Number(to).toFixed(2));
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

// INFO PANEL
function createInfoPanel(){

	info_panel.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info_panel.update = function (properties) {
		// if feature is highlighted
		if(properties){
			this._div.innerHTML = `<b>${properties.State}</b><br>${fieldtomap}: ${properties[fieldtomap]}`;
		}
		// if feature is not highlighted
		else
		{
			this._div.innerHTML = 'Hover over a state';
		}
	};

	info_panel.addTo(map);
}