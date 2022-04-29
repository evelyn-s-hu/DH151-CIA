// Global variables
let map;
let lat = 37;
let lon = -95;
let zl = 3;
let path = "data/bias.csv";
// let markers = L.featureGroup();
let csvdata;
let lastdate;
let alldata = [];
let race = []; //go thru less data this way each time
let racefilter = []; //each city has a total count of the cases, count for each anti race

//FeatureGroup for each layer
let antiRace = L.featureGroup();
let antiGender = L.featureGroup();
let antiAble = L.featureGroup();
let antiReligion = L.featureGroup();
let antiSex = L.featureGroup();

// define layers
let layers = {
  "Anti Race": antiRace,
  "Anti Gender": antiGender,
};

// initialize
$(document).ready(function () {
  createMap(lat, lon, zl);
  readCSV();
});

// create the map
function createMap(lat, lon, zl) {
  map = L.map("map").setView([lat, lon], zl);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.control.layers(null, layers).addTo(map);
}


// function to read csv data
function readCSV() {
  console.log("readCSV")
  Papa.parse(path, {
    header: true,
    download: true,
    complete: function (data) {
      // console.log(data);
      // put the data in a global variable
      csvdata = data;

      csvdata.data.forEach(function (item, index) {
        if (item.lat != undefined) {
          alldata.push(item);
        }
      });
      //get list of unique city names
      //   const unique = [...new Set(alldata.map((item) => item.city))];
      let unique = [
        ...new Map(alldata.map((item) => [item.city, item])).values(),
      ];
      // console.log(unique);

      //initialize the values
      unique.forEach(function (item, index) {
        let obj = {};
        obj["city"] = item.city;
        obj["total"] = 0;
        obj["black"] = 0;
        obj["amind"] = 0;
        obj["asian"] = 0;
        obj["mult"] = 0;
        obj["hisp"] = 0;
        obj["lat"] = parseFloat(item.lat);
        obj["long"] = parseFloat(item.lng);
        racefilter.push(obj); //add it
      });

      csvdata.data.forEach(function (item, index) {
        //find index of the city in racefilter
        const number = racefilter.findIndex((x) => x.city === item.city);

        if (item["BIAS_DESC_1"] == "Anti-Black or African American") {
          racefilter[number].black++; //add 1 to the total number of anti black cases
          racefilter[number].total++;
        } else if (
          item["BIAS_DESC_1"] == "Anti-American Indian or Alaska Native"
        ) {
          racefilter[number].amind++; //add 1 to the total number of anti american indian cases
          racefilter[number].total++;
        } else if (item["BIAS_DESC_1"] == "Anti Asian") {
          racefilter[number].asian++; //add 1 to the total number of anti asian cases
          racefilter[number].total++;
        } else if (item["BIAS_DESC_1"] == "Anti-Multiple Races, Group") {
          racefilter[number].mult++; //add 1 to the total number of anti mult races cases
          racefilter[number].total++;
        } else if (item["BIAS_DESC_1"] == "Anti-Hispanic or Latino") {
          racefilter[number].hisp++;
          racefilter[number].total++;
        }
      });
      plotMap();
    },
  });
}

function plotMap() {
  // loop through data
  console.log(racefilter.length);

  console.log(racefilter);
  racefilter.forEach(function (item) {
    // create marker
    let circleOptions = {
      radius: item.total/50,
      weight: 1,
      color: 'white',
      fillColor: 'red',
      fillOpacity: 0.5
    }

    let marker = L.circleMarker([item.lat, item.long], circleOptions)
      .bindPopup(
        `<h3>${item.city}</h3><p><strong>Anti Asian: </strong>${item.asian}</p><p><strong>Anti-Black or African American: </strong>${item.black}</p><p><strong>Anti-American Indian or Alaska Native: </strong>${item.amind}</p><p><strong>Anti-Multiple Races, Group: </strong>${item.mult}</p><p><strong>Anti-Hispanic or Latino: </strong>${item.hisp}</p>`
      )
      .openPopup();
    // add marker to featuregroup
    antiRace.addLayer(marker);
  });

  // after loop, add the FeatureGroup to map
  antiRace.addTo(map);
  
  // fit map to markers
	map.fitBounds(antiRace.getBounds())
}
