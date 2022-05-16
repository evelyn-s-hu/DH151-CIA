let path = "data/fulldataset_apr29.csv";
let lat = 37;
let lon = -95;
let zl = 3;
var sliderControl = null;
var slider = null;
var alldata = [];

// initialize
$(document).ready(function () {
  // createMap(lat, lon, zl);
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

        if (typeof item.lng != 'undefined' ) {
          alldata.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [parseFloat(item.lng), parseFloat(item.lat)],
            },
            "properties": {
              "DateStart": item.year, 
              "DateClosed": item.year,
            }
          });
        }
        

        // let obj = {};
        // obj["type"] = "Feature";

        // let geometry = {};
        // geometry["type"] = "Point";
        // let coordinates = [];
        // coordinates.push(parseFloat(item.lng));
        // coordinates.push(parseFloat(item.lat));
        // geometry["coordinates"] = coordinates;

        // obj["geometry"] = geometry;

        // // let properties = {};
        // // properties["GPSUserName"] = item.id;
        // // properties["GPSId"] = item.id;
        // // properties["total"] = item.total_cases;
        // // properties["DateStart"] = item.year;
        // // properties["DateClosed"] = item.year;
        // // properties["GPSUserColor"]= "#FF5500";
        // // properties["Active"] = 1;
        // // obj["properties"] = properties;

        // if (item.id <2 && item.id > 0 ) {
        //   alldata.push(obj);
        // }
      });
      // console.log(alldata);
      createSlider();
    },
  });
}

function createSlider() {
  // var slider = {
  //   type: "FeatureCollection",
  //   features: [{
  //     "type": "Feature",
  //     "geometry": {
  //         "type": "Point",
  //         "coordinates": [35.1966, 31.7825]
  //     }
  // }],
  // };

  var slider = {
    type: "FeatureCollection",
    features: alldata,
  };

  // console.log(slider.features);

  var map = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5,
    minZoom: 2,
    maxZoom: 4,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var sliderControl = null;

  //Create a marker layer (in the example done via a GeoJSON FeatureCollection)
  var testlayer = L.geoJson(slider, {
    onEachFeature: function (feature, layer) {
      console.log("hello")
      layer.bindPopup(
        "<h1>" + "</h1><p>Other info</p>"
      );
    },
  });


  // console.log(slider);
  console.log(testlayer);

  var sliderControl = L.control.sliderControl({
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

// function createSlider() {
//   var sliderControl = null;

//   var slider = {
//     type: "FeatureCollection",
//     features: [alldata],
//   };

//   var testlayer = L.geoJson(slider, {
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup("<h1>" + feature.properties.GPSUserName + "</h1><p>Other info</p>");
//     }
// });

//   sliderControl = L.control.sliderControl({
//     position: "topright",
//     layer: testlayer,
//     range: true,
//     timeAttribute: "DateStart",
//   });

//   //Make sure to add the slider to the map ;-)
//   map.addControl(sliderControl);

//   //And initialize the slider
//   sliderControl.startSlider();
// }
