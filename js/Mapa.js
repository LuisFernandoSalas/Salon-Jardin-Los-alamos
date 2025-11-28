
  // Coordenadas de tu ubicación predeterminada (ejemplo: Puebla, México)
  var lat = 19.202744;
  var lng = -98.432813;

  // Crear mapa centrado en tu ubicación
  var map = L.map('map').setView([lat, lng], 15);

  // Agregar capa de mapa (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Agregar marcador en tu ubicación
  L.marker([lat, lng]).addTo(map)
    .bindPopup('Salon Jardín Los Álamos')
    .openPopup();