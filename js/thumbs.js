// thumbs.js (versión corregida)

// Contenedor de miniaturas
const thumbsContainer = document.querySelector('.images');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const cerrar = document.getElementById('cerrar');

let thumbs = []; // declarar aquí para usarla globalmente
let currentIndex = 0;

if (thumbsContainer) {
  thumbs = Array.from(thumbsContainer.querySelectorAll('.thumb'));

  // hacer cada thumb focusable para accesibilidad
  thumbs.forEach(t => t.setAttribute('tabindex', '0'));

  // FUNCTION: limpiar clases active
  function clearActive() {
    thumbs.forEach(t => t.classList.remove('active'));
    thumbsContainer.classList.remove('has-active');
  }

  // --- Modal ---
  // seguridad: si no existe modal, no hacemos nada
  if (modal && modalImg && cerrar) {
    // abrir modal al hacer click en la imagen dentro de la thumb
    thumbs.forEach((thumb, index) => {
      const img = thumb.querySelector('img');
      if (!img) return;

      img.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Imagen ampliada';
        currentIndex = index; // guardar índice al abrir
      });

      // soporte teclado: Enter o Espacio para abrir modal
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
    });

    // cerrar modal con la X
    cerrar.addEventListener('click', () => {
      modal.style.display = "none";
      modalImg.src = '';
    });

    // cerrar al dar click en el fondo fuera de la imagen
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modalImg.src = '';
      }
    });

    // cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalImg.src = '';
      }
    });

    // --- Controlar flechas ---
    // función para actualizar la imagen modal
    function showImage(index) {
      const total = thumbs.length;
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;
      const img = thumbs[currentIndex].querySelector('img');
      modalImg.src = img.src;
    }

    // botones de flechas
    document.getElementById('prevBtn').addEventListener('click', () => {
      showImage(currentIndex - 1);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
      showImage(currentIndex + 1);
    });
  }
}