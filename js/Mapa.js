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

  // Control de ruta (para poder quitarlo si se solicita otra vez)
  var routingControl = null;

  function drawRoute(userLat, userLng) {
    // Añadir marcador del usuario
    L.marker([userLat, userLng]).addTo(map)
      .bindPopup("Tu ubicación")
      .openPopup();

    // Si ya hay un routingControl, removerlo
    if (routingControl) {
      map.removeControl(routingControl);
    }

    // Dibujar ruta con Leaflet Routing Machine
    routingControl = L.Routing.control({
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
  }

  function requestRoute() {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;
      drawRoute(userLat, userLng);
      // ocultar el botón si la ruta se muestra correctamente
      var btn = document.getElementById('routeBtn');
      if (btn) btn.style.display = 'none';
    }, function(error) {
      console.error("Error de geolocalización:", error);
      // Mostrar mensaje más útil según el error
      if (error.code === error.PERMISSION_DENIED) {
        alert("Permiso de ubicación denegado. Activa la ubicación para mostrar la ruta.");
      } else {
        alert("No se pudo obtener tu ubicación. Revisa permisos o prueba desde http://localhost");
      }
      // dejar visible el botón para que el usuario pueda intentarlo manualmente
      var btn = document.getElementById('routeBtn');
      if (btn) btn.style.display = 'inline-block';
    });
  }

  // Conectar el botón Mostrar ruta
  var routeBtn = document.getElementById('routeBtn');
  if (routeBtn) {
    routeBtn.addEventListener('click', function() {
      routeBtn.disabled = true;
      requestRoute();
      // reactivar el botón en 5s por si falla
      setTimeout(function(){ if(routeBtn) routeBtn.disabled = false; }, 5000);
  
    });
  }

  // Intento automático al cargar (puede pedir permiso). Si falla, el botón permitirá reintento.
  requestRoute();
});