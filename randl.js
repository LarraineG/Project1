var service;
var map;
var instance;

$("#findCity").on("click", function(event) {
  event.preventDefault();
  searchForCityByName();
});

$("input").keypress(event => {
  if (event.which == 13) {
    searchForCityByName();
  }
});



document.addEventListener('DOMContentLoaded', function() {
  var options = {
    dismissible: true,
    inDuration: 500,
    outDuration: 500
  }
  var elem = document.querySelector('.modal');
  instance = M.Modal.init(elem, options);
});

function convertToTitleCase(str) {
  let words = str.toLowerCase().split(" ");
  words.forEach(function(item, index) {
    words[index] = item[0].toUpperCase() + item.slice(1);
  })
  return words.join(" ");
}

function searchForCityByName() {
  var city = $("#search-input").val();
  var APIKey = "089100f1dce99fc69ca132b28b1e31ea";
  var queryURLWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURLWeather,
    method: "GET",
    error: (function(err) {
      return instance.open();
    })
  }).then(function(response) {
    $(".temp").text(
      "Current Temperature " +
        response.main.temp +
        String.fromCharCode(176) +
        "F in " +
        convertToTitleCase(city)
    );
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    map = myMap(lat, lon);
    var request = {
      query: city,
      fields: ["name", "geometry"]
    };





function get_travel_results(lat, long) {
    var city = $("#search-input").val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=${lat}&longitude=${long}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "618050ee8dmsh8ac10980b6e1b1ep15855ejsn20bf06554b3a"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
function get_lat_long(place) {
    $.ajax({
        method: "GET",
        url: `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=6323efca3a164fb586791264cf41e67b`
    }).then(response => {
        var geo = response.results[0].geometry;
        get_travel_results(geo.lat, geo.lng)
    })
}
get_lat_long(place)
});
};



function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, "click", function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  
  function myMap(lat, lon) {
    var mapProp = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 10
    };
    return new google.maps.Map(document.getElementById("map"), mapProp);
  }


// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&hotel_class=1%252C2%252C3&limit=30&adults=1&amenities=beach%252Cbar_lounge%252Cairport_transportation&rooms=1&child_rm_ages=7%252C10&currency=USD&checkin=2020-01-08&zff=4%252C6&subcategory=hotel%252Cbb%252Cspecialty&nights=2&latitude=12.91285&longitude=100.87808",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
// 		"x-rapidapi-key": "86ab16ea0bmsh0de1b97e1e75137p147204jsn8548d8143ee3"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });