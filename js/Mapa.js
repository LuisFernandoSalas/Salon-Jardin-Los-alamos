function initMap() {
  var location = { lat: 19.0413, lng: -98.2062 }; // Puebla, México

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: location,
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Ubicación predeterminada"
  });
}

window.onload = initMap;
