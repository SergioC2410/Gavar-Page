/* Función para abrir el Modal tipo MercadoLibre */
function abrirModal(elemento) {
    // 1. Obtener datos del elemento clickeado (data-Attributes)
    const type = elemento.getAttribute('data-type');
    const src = elemento.getAttribute('data-src');
    const title = elemento.getAttribute('data-title');
    const autor = elemento.getAttribute('data-autor');
    const desc = elemento.getAttribute('data-desc');
    const year = elemento.getAttribute('data-year');

    // 2. Referencias a los elementos dentro del Modal
    const modal = document.getElementById('modalVisualizador');
    const imgTag = document.getElementById('mImg');
    const videoTag = document.getElementById('mVideo');
    
    // 3. Llenar textos
    document.getElementById('mTitle').innerText = title;
    document.getElementById('mAutor').innerText = "Por: " + autor;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mYear').innerText = year;

    // 4. Mostrar Imagen o Video según corresponda
    if (type === 'video') {
        imgTag.style.display = 'none';
        videoTag.style.display = 'block';
        videoTag.src = src;
        videoTag.play(); // Auto-reproducir video
    } else {
        videoTag.style.display = 'none';
        videoTag.pause();
        imgTag.style.display = 'block';
        imgTag.src = src;
    }

    // 5. Mostrar el modal con animación flex
    modal.style.display = 'flex';
}

/* Cerrar Modal desde el botón X */
function cerrarModalBtn() {
    const modal = document.getElementById('modalVisualizador');
    const videoTag = document.getElementById('mVideo');
    
    modal.style.display = 'none';
    videoTag.pause(); // Importante: Pausar video al cerrar
    videoTag.src = ""; 
}

/* Cerrar Modal al hacer click afuera (en el fondo oscuro) */
function cerrarModal(event) {
    if (event.target.id === 'modalVisualizador') {
        cerrarModalBtn();
    }
}

/* Buscador en tiempo real */
function filtrarObras() {
    const texto = document.getElementById('searchInput').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.file-card');

    tarjetas.forEach(card => {
        const titulo = card.getAttribute('data-title').toLowerCase();
        const autor = card.getAttribute('data-autor').toLowerCase();
        
        if (titulo.includes(texto) || autor.includes(texto)) {
            card.style.display = 'block'; // Mostrar
        } else {
            card.style.display = 'none';  // Ocultar
        }
    });
}
/* --- ANIMACIÓN DE ENTRADA (CASCADA) --- */
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todas las tarjetas (Gallery, Expo, Artist)
    const cards = document.querySelectorAll('.file-card');
    
    cards.forEach((card, index) => {
        // Agregamos la clase de animación
        card.classList.add('card-enter');
        
        // Calculamos el retraso: cada tarjeta espera 100ms más que la anterior
        // Limitamos a 20 tarjetas para que no tarde años si hay muchas
        const delay = Math.min(index * 0.1, 2.0); 
        
        card.style.animationDelay = `${delay}s`;
    });
});