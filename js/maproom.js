// Global variables
let map;
let lat = 37;
let lon = -95;
let zl = 5;
let path = "data/fulldataset_may4.csv";
// let markers = L.featureGroup();
let csvdata;
let lastdate;
let alldata = [];
let filter = []; //go thru less data this way each time
var slideIndex = 1;

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
  "Anti Sexual Orientation": antiSex,
  "Anti Ableism": antiAble,
  "Anti Religion": antiReligion,
};

// initialize
$(document).ready(function () {
  createMap(lat, lon, zl);
  readCSV();
  showSlides(slideIndex);

});

// create the map
function createMap(lat, lon, zl) {
  map = L.map("map").setView([lat, lon], zl);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ).addTo(map); // CartoDB.Voyager base map layer

  L.control.layers(null, layers).addTo(map);
}

function flyToIndex(lat, lon) {
  map.flyTo([lat, lon], 8);
  console.log("clicked!");
}

// function to read csv data
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
        if (item.lat != undefined) {
          alldata.push(item);
        }
      });
      //initialize the values
      alldata.forEach(function (item, index) {
        let obj = {};
        obj["city"] = item.city;
        obj["racetotal"] = item["Anti_Race"];
        obj["black"] = item["Anti_Black_or_African_American"];
        obj["amind"] = item["Anti_American_Indian_or_Alaska_Native"];
        obj["asian"] = item["Anti_Asian"];
        obj["multrace"] = item["Anti_Multiple_Races__Group"];
        obj["hisp"] = item["Anti_Hispanic_or_Latino"];
        obj["arab"] = item["Anti_Arab"];
        obj["hawaii"] = item["Anti_Native_Hawaiian_or_Other_Pacific_Islander"];
        obj["otherrace"] = item["Anti_Other_Race_Ethnicity_Ancestry"];
        obj["white"] = item["Anti_White"];

        obj["gendertotal"] = item["Anti_Gender"];
        obj["female"] = item["Anti_Female"];
        obj["male"] = item["Anti_Male"];
        obj["nonconform"] = item["Anti_Gender_Non_Conforming"];

        obj["sextotal"] = item["Anti_Sexual_Orientation"];
        obj["bi"] = item["Anti_Bisexual"];
        obj["gay"] = item["Anti_Gay_Male"];
        obj["hetero"] = item["Anti_Heterosexual"];
        obj["lesbian"] = item["Anti_Lesbian_Female"];
        obj["lestrans"] =
          item["Anti_Lesbian__Gay__Bisexual__or_Transgender_Mixed_Group"];
        obj["trans"] = item["Anti_Transgender"];

        obj["abletotal"] = item["Anti_Ableism"];
        obj["mental"] = item["Anti_Mental_Disability"];
        obj["physical"] = item["Anti_Physical_Disability"];

        obj["religiontotal"] = item["Anti_Religion"];
        obj["athiest"] = item["Anti_Atheism_Agnosticism"];
        obj["buddhist"] = item["Anti_Buddhist"];
        obj["catholic"] = item["Anti_Catholic"];
        obj["ortho"] = item["Anti_Eastern_Orthodox_Russian__Greek__Other"];
        obj["hindu"] = item["Anti_Hindu"];
        obj["muslim"] = item["Anti_Islamic_Muslim"];
        obj["jehovah"] = item["Anti_Jehovahs_Witness"];
        obj["jewish"] = item["Anti_Jewish"];
        obj["mormon"] = item["Anti_Mormon"];
        obj["multreligion"] = item["Anti_Multiple_Religions__Group"];
        obj["otherchrist"] = item["Anti_Other_Christian"];
        obj["otherreligion"] = item["Anti_Other_Religion"];
        obj["protestant"] = item["Anti_Protestant"];
        obj["sikh"] = item["Anti_Sikh"];
        obj["lat"] = parseFloat(item.lat);
        obj["long"] = parseFloat(item.lng);
        filter.push(obj);
      });
      plotMap();
    },
  });
}

function plotMap() {
  // loop through data
  console.log(filter);

  // Sex filter
  filter.forEach(function (item) {
    if (item.sextotal > 0) {
      // create marker
      let temp = radius(item.sextotal);
      let circleOptions = {
        radius: temp,
        weight: 1,
        color: 'white',
        fillColor: "blue",
        fillOpacity: 0.5,
      };
      let sexmarker = L.circleMarker([item.lat, item.long], circleOptions)
        .bindPopup(
          `<h3>${item.city}</h3>
     <p><strong>Anti-Bisexual: </strong>${item.bi}</p>
     <p><strong>Anti-Gay Male: </strong>${item.gay}</p>
     <p><strong>Anti-Heterosexual: </strong>${item.hetero}</p>
     <p><strong>Anti-Arab: </strong>${item.arab}</p>
     <p><strong>Anti-Lesbian-Female: </strong>${item.lesbian}</p>
     <p><strong>Anti-Lesbian Gay Bisexual or Transgender Mixed Group: </strong>${item.lestrans}</p>
     <p><strong>Anti-Transgender: </strong>${item.trans}</p>`
        )
        .openPopup();
      // add marker to featuregroup
      antiSex.addLayer(sexmarker);
    }
    
    if (item.racetotal > 0) {
      // create marker
      let temp = radius(item.racetotal);
      let circleOptions = {
        radius: temp,
        weight: 1,
        color: 'white',
        fillColor: "red",
        fillOpacity: 0.5,
      };
      let racemarker = L.circleMarker([item.lat, item.long], circleOptions)
        .bindPopup(
          `<h3>${item.city}</h3>
     <p><strong>Anti-Asian: </strong>${item.asian}</p>
     <p><strong>Anti-Black or African American: </strong>${item.black}</p>
     <p><strong>Anti-American Indian or Alaska Native: </strong>${item.amind}</p>
     <p><strong>Anti-Arab: </strong>${item.arab}</p>
     <p><strong>Anti-White: </strong>${item.white}</p>
     <p><strong>Anti-Native Hawaiian or Other Pacific Islander: </strong>${item.hawaii}</p>
     <p><strong>Anti-Other Race Ethnicity Ancestry: </strong>${item.otherrace}</p>`
        )
        .openPopup();
      // add marker to featuregroup
      antiRace.addLayer(racemarker);
    }

    if (item.gendertotal > 0) {
      let temp = radius(item.gendertotal);

      let circleOptions = {
        radius: temp,
        weight: 1,
        color: 'white',
        fillColor: "green",
        fillOpacity: 0.5,
      };
      let gendermarker = L.circleMarker([item.lat, item.long], circleOptions)
        .bindPopup(
          `<h3>${item.city}</h3>
        <p><strong>Anti-Female: </strong>${item.female}</p>
        <p><strong>Anti-Male: </strong>${item.male}</p>
        <p><strong>Anti-Gender Non-Conforming: </strong>${item.nonconform}</p>`
        )
        .openPopup();
      // add marker to featuregroup
      antiGender.addLayer(gendermarker);
    }

    if (item.abletotal > 0) {
      let temp = radius(item.abletotal);

      let circleOptions = {
        radius: temp,
        weight: 1,
        color: 'white',
        fillColor: "pink",
        fillOpacity: 0.5,
      };
      let ablemarker = L.circleMarker([item.lat, item.long], circleOptions)
        .bindPopup(
          `<h3>${item.city}</h3>
        <p><strong>Anti-Ableism: </strong>${item.abletotal}</p>
        <p><strong>Anti-Mental Disability: </strong>${item.mental}</p>
        <p><strong>Anti-Physical Disability: </strong>${item.physical}</p>`
        )
        .openPopup();
      // add marker to featuregroup
      antiAble.addLayer(ablemarker);
    }

    if (item.religiontotal > 0) {
      let temp = radius(item.religiontotal);

      let circleOptions = {
        radius: temp,
        weight: 1,
        color: 'white',
        fillColor: "purple",
        fillOpacity: 0.5,
      };
      let religionmarker = L.circleMarker([item.lat, item.long], circleOptions)
        .bindPopup(
          `<h3>${item.city}</h3>
        <p><strong>Anti-Atheism Agnosticism: </strong>${item.female}</p>
        <p><strong>Anti-Buddhist: </strong>${item.buddhist}</p>
        <p><strong>Anti-Catholic: </strong>${item.catholic}</p>
        <p><strong>Anti-Eastern Orthodox Russian Greek Other: </strong>${item.ortho}</p>
        <p><strong>Anti-Hindu: </strong>${item.hindu}</p>
        <p><strong>Anti-Islamic Muslim: </strong>${item.muslim}</p>
        <p><strong>Anti-Jehovahs Witness: </strong>${item.jehovah}</p>
        <p><strong>Anti-Jewish: </strong>${item.jewish}</p>
        <p><strong>Anti-Mormon: </strong>${item.mormon}</p>
        <p><strong>Anti-Multiple Religions Group: </strong>${item.multreligion}</p>
        <p><strong>Anti-Other Christian: </strong>${item.otherchrist}</p>
        <p><strong>Anti-Other Religion: </strong>${item.otherreligion}</p>
        <p><strong>Anti-Protestant: </strong>${item.protestant}</p>
        <p><strong>Anti-Sikh: </strong>${item.sikh}</p>
        `
        )
        .openPopup();
      // add marker to featuregroup
      antiReligion.addLayer(religionmarker);
    }
  });

  // after loop, add the FeatureGroup to map
  antiRace.addTo(map);
  antiGender.addTo(map);
  antiSex.addTo(map);
  antiAble.addTo(map); 
  antiReligion.addTo(map); 

  // fit map to markers
  map.fitBounds(antiRace.getBounds());
  map.fitBounds(antiGender.getBounds());
  map.fitBounds(antiSex.getBounds());
  map.fitBounds(antiAble.getBounds());
  map.fitBounds(antiReligion.getBounds());

}

function radius(number) {

  if (number < 3) {
    return 3;
  }
  if (number < 10 & number > 3 ){
    return number*1.2;
  }

  else if (number>10) {
    return 13;
  }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}