/**
 * GAVAR - Galería de Arte Virtual
 * Script Principal (Versión "Smart Modal")
 * ------------------------------------------------------------------
 * Novedad: Ahora el buscador puede abrir la ficha técnica directamente
 * sin recargar la página, usando los datos precargados en SEARCH_DB.
 */

/* ==========================================================================
   1. BASE DE DATOS MAESTRA (SEARCH_DB)
   --------------------------------------------------------------------------
   IMPORTANTE: Para que el modal abra directo, aquí debemos poner TODOS
   los datos de la obra (src, description, year, autor).
   ========================================================================== */
const SEARCH_DB = [
    // --- SECCIÓN: GALERÍA (OBRAS) ---
    { 
        title: "La Noche Estrellada", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "van gogh pintura impresionismo azul noche",
        // Datos para abrir el modal directo:
        src: "https://media.admagazine.com/photos/618a7dbc58ac69e38abb6c2c/16:9/w_1280,c_limit/43884.jpg",
        autor: "Vincent van Gogh",
        year: "1889",
        desc: "Obra maestra del postimpresionismo que representa la vista desde la ventana este de su habitación de asilo."
    },
    // (Puedes agregar más obras siguiendo este formato)

    // --- SECCIÓN: EXPOSICIONES (VIDEOS) ---
    { 
        title: "Recorrido Virtual 2024", 
        url: "exposiciones.html", 
        type: "Video", 
        keywords: "tour exposicion coleccion virtual introduccion",
        src: "", // ¡OJO! Pon aquí el link real del video (ej. assets/video.mp4)
        autor: "Curaduría GAVAR",
        year: "2024",
        desc: "Video introductorio al espacio virtual y las nuevas colecciones agregadas este año."
    },
    { 
        title: "Entrevista a Artista Invitado", 
        url: "exposiciones.html", 
        type: "Video", 
        keywords: "puntillismo charla entrevista",
        src: "", // Link del video aquí
        autor: "Canal GAVAR",
        year: "2023",
        desc: "Entrevista exclusiva sobre la técnica del puntillismo moderno."
    },

    // --- SECCIÓN: ARTISTA DEL MES (CAÑO AMARILLO) ---
    // Este tiene type: "Perfil" para que SI redirija a la página
    { 
        title: "Armando Reverón (Perfil)", 
        url: "mencion-especial.html", 
        type: "Perfil", 
        keywords: "caño amarillo maestro luz castillete macuto muñecas blanco azul sepia venezuela pintor",
        // No necesita src ni desc porque este redirige
    },
    
    // Obras de Reverón (Para que abran en modal)
    { 
        title: "La Cueva", 
        url: "mencion-especial.html", 
        type: "Obra", 
        keywords: "reveron azul oscuro misterio mujer desnudo",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/La_Cueva_-_Armando_Rever%C3%B3n.jpg/1200px-La_Cueva_-_Armando_Rever%C3%B3n.jpg",
        autor: "Armando Reverón",
        year: "1920",
        desc: "Obra maestra de su Período Azul. Reverón utiliza tonos oscuros y profundos para crear una atmósfera de misterio."
    },
    { 
        title: "Paisaje Blanco", 
        url: "mencion-especial.html", 
        type: "Obra", 
        keywords: "reveron luz caribe playa mar",
        src: "https://assets-global.website-files.com/604a80695420325d7335d886/6064cd5f5b5b2e5c8e2680e6_reveron-blanco.jpeg",
        autor: "Armando Reverón",
        year: "1934",
        desc: "El epítome de su Período Blanco. La luz del Caribe es tan intensa que disuelve las formas."
    }
];

/* ==========================================================================
   2. CACHÉ DEL DOM
   ========================================================================== */
const DOM = {
    modal: document.getElementById('modalVisualizador'),
    modalImg: document.getElementById('mImg'),
    modalVideo: document.getElementById('mVideo'),
    modalTitle: document.getElementById('mTitle'),
    modalAutor: document.getElementById('mAutor'),
    modalDesc: document.getElementById('mDesc'),
    modalYear: document.getElementById('mYear'),
    searchInput: document.getElementById('searchInput'),
    searchBox: document.querySelector('.search-box'),
    navLinks: document.getElementById('navLinks'),
    mobileSearchOverlay: document.getElementById('mobileSearchOverlay'),
    mobileInput: document.getElementById('mobileInput')
};

/* ==========================================================================
   3. AUTOCOMPLETADO INTELIGENTE
   ========================================================================== */
const AutocompleteManager = {
    init() {
        this.createSuggestionsBox('desktop-suggestions', DOM.searchBox);
        this.createSuggestionsBox('mobile-suggestions', document.querySelector('.search-modal-content'));
        this.bindEvents();
    },

    createSuggestionsBox(id, parent) {
        if (!parent || document.getElementById(id)) return;
        const box = document.createElement('div');
        box.id = id;
        box.className = 'suggestions-list';
        parent.appendChild(box);
    },

    bindEvents() {
        DOM.searchInput?.addEventListener('input', (e) => this.handleInput(e.target.value, 'desktop-suggestions'));
        DOM.mobileInput?.addEventListener('input', (e) => this.handleInput(e.target.value, 'mobile-suggestions'));
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && !e.target.closest('.search-modal-content')) {
                this.clearSuggestions();
            }
        });
    },

    handleInput(text, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (text.length < 2) { container.style.display = 'none'; return; }

        const matches = this.searchInDB(text);
        this.renderSuggestions(matches, container);
    },

    searchInDB(query) {
        const lowerQuery = query.toLowerCase();
        return SEARCH_DB.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.keywords.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    },

    renderSuggestions(results, container) {
        if (!results.length) { container.style.display = 'none'; return; }
        container.innerHTML = '';
        container.style.display = 'block';

        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <span class="suggestion-icon">${this.getIcon(item.type)}</span>
                <div class="suggestion-info">
                    <span class="suggestion-title">${item.title}</span>
                    <span class="suggestion-type">${item.type}</span>
                </div>
            `;
            // AQUÍ ESTÁ EL CAMBIO CLAVE:
            div.addEventListener('click', () => this.goToResult(item));
            container.appendChild(div);
        });
    },

    getIcon(type) {
        if (type === 'Video') return '🎬';
        if (type === 'Perfil') return '🎨';
        return '🖼️';
    },

    // --- FUNCIÓN CLAVE: DECIDE SI ABRIR MODAL O REDIRIGIR ---
    goToResult(item) {
        // 1. Si es el Perfil de Reverón, redirigimos siempre (como pediste)
        if (item.type === 'Perfil') {
            window.location.href = item.url;
            return;
        }

        // 2. Si es Obra o Video, intentamos abrir el modal AQUÍ MISMO
        if (DOM.modal) {
            // Cerramos sugerencias y buscador móvil si estuviera abierto
            this.clearSuggestions();
            cerrarBusquedaMovil();
            
            // Abrimos el modal con los datos del JSON
            ModalManager.openFromData(item);
        } else {
            // 3. Fallback: Si estamos en una página SIN modal (ej. Index sin código modal),
            // redirigimos a la página original de la obra.
            window.location.href = `${item.url}?search=${encodeURIComponent(item.title)}`;
        }
    },

    clearSuggestions() {
        document.querySelectorAll('.suggestions-list').forEach(el => el.style.display = 'none');
    }
};

/* ==========================================================================
   4. GESTIÓN DE MODALES
   ========================================================================== */
const ModalManager = {
    currentVideo: null,
    init() {
        this.bindEvents();
    },
    bindEvents() {
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
        DOM.modal?.addEventListener('click', (e) => { if (e.target === DOM.modal) this.close(); });
    },

    // Abrir desde el clic en tarjeta HTML
    open(element) {
        const data = {
            type: element.dataset.type,
            src: element.dataset.src,
            title: element.dataset.title,
            autor: element.dataset.autor,
            desc: element.dataset.desc,
            year: element.dataset.year
        };
        this.openFromData(data);
    },

    // Abrir desde datos JSON (Buscador)
    openFromData(data) {
        if (!DOM.modal) return;
        this.populateModal(data);
        this.showContent(data.type, data.src);
        DOM.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    populateModal(data) {
        if (DOM.modalTitle) DOM.modalTitle.textContent = data.title || 'Sin título';
        if (DOM.modalAutor) DOM.modalAutor.textContent = data.autor ? `Por: ${data.autor}` : '';
        if (DOM.modalDesc) DOM.modalDesc.textContent = data.desc || '';
        if (DOM.modalYear) DOM.modalYear.textContent = data.year || '';
    },

    showContent(type, src) {
        const isVideo = type === 'Video' || type === 'video'; // Aseguramos compatibilidad mayusc/minusc
        
        if (DOM.modalImg) DOM.modalImg.style.display = isVideo ? 'none' : 'block';
        if (DOM.modalVideo) DOM.modalVideo.style.display = isVideo ? 'block' : 'none';
        
        if (isVideo && DOM.modalVideo) {
            DOM.modalVideo.src = src;
            DOM.modalVideo.play().catch(() => {});
            this.currentVideo = DOM.modalVideo;
        } else if (DOM.modalImg) {
            DOM.modalImg.src = src;
            this.pauseCurrentVideo();
        }
    },

    close() {
        if (DOM.modal) DOM.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.pauseCurrentVideo();
        if (DOM.modalVideo) DOM.modalVideo.src = '';
    },

    pauseCurrentVideo() {
        if (this.currentVideo) {
            this.currentVideo.pause();
            this.currentVideo.currentTime = 0;
        }
    }
};

/* ==========================================================================
   5. BÚSQUEDA GENERAL & NAVEGACIÓN
   ========================================================================== */
const SearchManager = {
    init() { this.checkURLParams(); },
    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm && DOM.searchInput) {
            DOM.searchInput.value = searchTerm;
            DOM.searchBox?.classList.add('active');
            setTimeout(() => this.filterCardsOnPage(searchTerm), 100);
        }
    },
    filterCardsOnPage(text) {
        const searchText = text.toLowerCase();
        document.querySelectorAll('.file-card').forEach(card => {
            const title = card.dataset.title?.toLowerCase() || '';
            const autor = card.dataset.autor?.toLowerCase() || '';
            const isVisible = title.includes(searchText) || autor.includes(searchText);
            card.style.display = isVisible ? 'flex' : 'none';
        });
    },
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) setTimeout(() => DOM.searchInput.focus(), 400);
    }
};

const MobileNav = {
    init() {
        document.querySelectorAll('#navLinks a').forEach(link => {
            if (!link.getAttribute('onclick')) link.addEventListener('click', () => this.toggle());
        });
    },
    toggle() { DOM.navLinks?.classList.toggle('active'); }
};

/* --- Funciones Globales --- */
function abrirModal(el) { ModalManager.open(el); }
function cerrarModalBtn() { ModalManager.close(); }
function cerrarModal(e) { if (e.target.id === 'modalVisualizador') ModalManager.close(); }
function toggleSearch() { SearchManager.toggleSearch(); }
function toggleMenu() { MobileNav.toggle(); }
function filtrarObras() { /* Lógica en evento input */ }

function abrirBusquedaMovil() {
    MobileNav.toggle();
    if (DOM.mobileSearchOverlay) {
        DOM.mobileSearchOverlay.style.display = 'flex';
        setTimeout(() => DOM.mobileInput?.focus(), 100);
    }
}
function cerrarBusquedaMovil() {
    if (DOM.mobileSearchOverlay) DOM.mobileSearchOverlay.style.display = 'none';
    if (DOM.mobileInput) DOM.mobileInput.value = '';
    AutocompleteManager.clearSuggestions();
}
function ejecutarBusquedaMovil() {
    // Si dan Enter en el móvil sin seleccionar sugerencia, redirigimos
    const busqueda = DOM.mobileInput?.value;
    if (busqueda) {
         window.location.href = `galeria.html?search=${encodeURIComponent(busqueda)}`;
    }
}
DOM.mobileInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') ejecutarBusquedaMovil(); });

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
    SearchManager.init();
    MobileNav.init();
    AutocompleteManager.init();
    
    // Lazy Load e Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('card-enter'); observer.unobserve(e.target); } });
    });
    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src; img.removeAttribute('data-src');
    });
});