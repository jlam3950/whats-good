//In progress:
//https://developers.google.com/maps/documentation/javascript/places#place_search_requests
let map;
let service;
let infowindow;

function initialize() {
  let coordinates = new google.maps.LatLng(-33.8665433,151.1956316); //New

  map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 15
    });

  let request = {
    location: coordinates,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}