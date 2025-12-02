document.addEventListener('DOMContentLoaded', function() {
  // Coordenadas del salón (ejemplo: Puebla, México)
  var lat = 19.202744;
  var lng = -98.432813;

  // Asegurarse que exista el contenedor
  var mapEl = document.getElementById('map');
  if (!mapEl) {
    console.error('No se encontró el elemento #map en el DOM.');
    return;
  }

  // Crear mapa centrado en el salón
  var map = L.map('map').setView([lat, lng], 15);

  // Agregar capa base (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marcador en el salón
  L.marker([lat, lng]).addTo(map)
    .bindPopup('Salón Jardín Los Álamos')
    .openPopup();

  // Obtener ubicación del usuario y mostrar ruta
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;

      // Marcador del usuario
      L.marker([userLat, userLng]).addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();

      // Dibujar ruta con Leaflet Routing Machine
      L.Routing.control({
        waypoints: [
          L.latLng(userLat, userLng), // inicio: usuario
          L.latLng(lat, lng)          // destino: salón
        ],
        routeWhileDragging: true,
        language: 'es',
        showAlternatives: true,
        lineOptions: {
          styles: [{color: 'blue', opacity: 0.7, weight: 5}]
        }
      }).addTo(map);
    }, function(error) {
      console.error("Error de geolocalización:", error);
      alert("No se pudo obtener tu ubicación. Revisa permisos o prueba desde http://localhost");
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
});