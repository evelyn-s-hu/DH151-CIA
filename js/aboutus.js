// console.log("called")
// let data = [
//     {
//       title: "Audrey",
//       lat: 30.2655,
//       lon: 120.1536,
//     },

//     {
//         title: "Laura Lu",
//         lat: 30.2655,
//         lon: 120.1536,
//       }
// ]
// var map = L.map("map").setView([3, 3], 10);

// L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     className: 'map-tiles'
// }).addTo(map);


// // function to fly to a location by a given id number
// function flyToIndex(index){
// 	map.flyTo([data[index].lat,data[index].lon],12)
// }

// // loop through data
// data.forEach(function(item){
// 	// add marker to map
//     console.log("hello")
// 	L.marker([item.lat,item.lon]).addTo(map)
// 		.bindPopup(item.title)
//         .openPopup();	
// })


var map = L.map('map').setView([34.0697,-118.4432], 17);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		var marker = L.marker([34.0697,-118.4432]).addTo(map)
				.bindPopup('The Technology Sandbox<br> Where Yoh is sitting this very moment')
				.openPopup();