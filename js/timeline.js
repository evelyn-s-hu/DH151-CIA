let path = "data/fulldataset_apr29.csv";
let lat = 37;
let lon = -95;
let zl = 3;
var sliderControl = null;
var slider = null;
let alldata = [];

// initialize
$(document).ready(function () {
  createMap(lat, lon, zl);
  readCSV();
});

function createMap(lat, lon, zl) {
 var map = L.map("map").setView([lat, lon], zl);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

// // function to read csv data
function readCSV() {
  console.log("readCSV");
  Papa.parse(path, {
    header: true,
    download: true,
    complete: function (data) {
      // console.log(data);
      // put the data in a global variable
      csvdata = data;

      csvdata.data.forEach(function (item, index) {
        let obj = {};
        obj["type"] = "Feature";

        let geometry = {};
        geometry["type"] = "Point";
        let coordinates = [];
        coordinates.push(item.lng);
        coordinates.push(item.lat);
        geometry["coordinates"] = coordinates;

        obj["geometry"] = geometry;

        let properties = {};
        properties["GPSID"] = item.id;
        properties["total"] = item.total_cases;
        properties["DateStart"] = item.year;
        obj["properties"] = properties;

        alldata.push(obj);
      });
      console.log(alldata);
    createSlider();
    },
  });
}

function createSlider() {
  var slider = {
    type: "FeatureCollection",
    features: [alldata],
  };
  //Create a marker layer (in the example done via a GeoJSON FeatureCollection)
  var testlayer = L.geoJson(slider, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<h1>" + feature.properties.GPSUserName + "</h1><p>Other info</p>"
      );
    },
  });

  let sliderControl = L.control.sliderControl({
    position: "topright",
    layer: testlayer,
    range: true,
    timeAttribute: "DateStart",
  });

  //Make sure to add the slider to the map ;-)
  map.addControl(sliderControl);

  //And initialize the slider
  sliderControl.startSlider();
}
