/**
 * GAVAR - Galería de Arte Virtual
 * Script Principal
 * ------------------------------------------------------------------
 * Actualización: Base de datos sincronizada con los nuevos artistas.
 */

/* ==========================================================================
   1. BASE DE DATOS MAESTRA (SEARCH_DB)
   ========================================================================== */
const SEARCH_DB = [
    // --- SECCIÓN: GALERÍA (OBRAS NUEVAS) ---
    { 
        title: "Resiliencia", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "serigrafia grabado tinta papel arte grafico alix velasquez",
        src: "assets/img/resiliencia.jpg",
        autor: "Alix Velásquez",
        year: "2025",
        desc: "Técnica / Materia: Serigrafía.\nCantidad: 1 pieza.\nInstagram: @alix_v_art"
    },
    { 
        title: "Real", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "xilografia madera grabado relieve impresion arantza martinez",
        src: "assets/img/real.jpg",
        autor: "Arantza Martínez",
        year: "2025",
        desc: "Técnica / Materia: Xilografía.\nCantidad: 1 pieza."
    },
    { 
        title: "Solaria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "digital ilustracion diseño tablet computadora andrea blanco",
        src: "assets/img/solaria.jpg",
        autor: "Andrea Blanco",
        year: "2024",
        desc: "Técnica / Materia: Digital.\nCantidad: 1 pieza.\nInstagram: @anbndy22"
    },
    { 
        title: "The News", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "superposicion digital capas collage fotomontaje isabel figueroa",
        src: "assets/img/the_news.jpg",
        autor: "Isabel Figueroa",
        year: "2022",
        desc: "Técnica / Materia: Superposición digital.\nCantidad: 1 pieza."
    },
    { 
        title: "Antimateria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "ensamblaje hilograma hilos clavos madera escultura mixta koda efrain aguilera",
        src: "assets/img/antimateria.jpg",
        autor: "Efraín Aguilera (Koda)",
        year: "2024",
        desc: "Técnica / Materia: Ensamblaje e hilograma.\nCantidad: 1 pieza.\nInstagram: @6kodafree6"
    },
    { 
        title: "El Tapiz del Alma", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto 3d papel escultura cristian rojas",
        src: "assets/img/el_tapiz_del_alma.jpg",
        autor: "Cristian Rojas",
        year: "2025",
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza."
    },
    { 
        title: "Bodhiria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto plegable papel mariend romero",
        src: "assets/img/bodhiria.jpg",
        autor: "Mariend Romero",
        year: "2025",
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza."
    },
    { 
        title: "Fábrica de la Memoria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto memoria papel arquitectura ricardo suarez",
        src: "assets/img/fabrica_de_la_memoria.jpg",
        autor: "Ricardo Suarez",
        year: "2024",
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza.\nInstagram: @richyross_art"
    },
    
    // --- SECCIÓN: EXPOSICIONES (VIDEOS) ---
    { 
        title: "Recorrido Virtual 2024", 
        url: "exposiciones.html", 
        type: "Video", 
        keywords: "tour coleccion virtual introduccion video videos exposicion exposiciones cine",
        src: "", 
        autor: "Curaduría GAVAR",
        year: "2024",
        desc: "Video introductorio al espacio virtual y las nuevas colecciones."
    },

    // --- SECCIÓN: ARTISTA DE CAÑO AMARILLO ---
    { 
        title: "Armando Reverón (Perfil)", 
        url: "mencion-especial.html", 
        type: "Perfil", 
        keywords: "caño amarillo maestro luz castillete macuto muñecas blanco azul venezuela pintor perfil artista biografia",
    },
    
    // Obras de Reverón (Para que aparezcan en búsqueda)
    { 
        title: "La Cueva", 
        url: "mencion-especial.html", 
        type: "Obra", 
        keywords: "reveron azul oscuro misterio mujer desnudo obra obras galeria pintura",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/La_Cueva_-_Armando_Rever%C3%B3n.jpg/1200px-La_Cueva_-_Armando_Rever%C3%B3n.jpg",
        autor: "Armando Reverón",
        year: "1920",
        desc: "Obra maestra de su Período Azul."
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
    mobileSearchOverlay: document.getElementById('mobileSearchOverlay'), // Si decides implementarlo a futuro
    mobileInput: document.getElementById('mobileInput')
};

/* ==========================================================================
   3. AUTOCOMPLETADO INTELIGENTE
   ========================================================================== */
const AutocompleteManager = {
    init() {
        this.createSuggestionsBox('desktop-suggestions', DOM.searchBox);
        this.bindEvents();
    },

    createSuggestionsBox(id, parent) {
        if (!parent || document.getElementById(id)) return;
        const box = document.createElement('div');
        box.id = id;
        box.className = 'suggestions-list';
        // Estilos básicos inyectados para que funcione sin tocar mucho CSS
        box.style.cssText = "display:none; position:absolute; top:100%; left:0; width:100%; background:#fff; border:1px solid #ccc; border-radius:0 0 12px 12px; z-index:1000; box-shadow:0 4px 6px rgba(0,0,0,0.1); max-height:300px; overflow-y:auto;";
        parent.appendChild(box);
    },

    bindEvents() {
        DOM.searchInput?.addEventListener('input', (e) => {
            this.handleInput(e.target.value, 'desktop-suggestions');
            // También filtramos la grilla en tiempo real
            SearchManager.filterCardsOnPage(e.target.value);
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
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
            item.keywords.toLowerCase().includes(lowerQuery) ||
            item.type.toLowerCase().includes(lowerQuery) ||
            item.autor.toLowerCase().includes(lowerQuery)
        ).slice(0, 6); 
    },

    renderSuggestions(results, container) {
        if (!results.length) { container.style.display = 'none'; return; }
        container.innerHTML = '';
        container.style.display = 'block';

        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.style.cssText = "padding:10px; cursor:pointer; border-bottom:1px solid #eee; display:flex; align-items:center; gap:10px;";
            div.onmouseover = () => div.style.background = "#f9f9f9";
            div.onmouseout = () => div.style.background = "#fff";
            
            div.innerHTML = `
                <span class="suggestion-icon" style="font-size:1.2rem;">${this.getIcon(item.type)}</span>
                <div class="suggestion-info" style="display:flex; flex-direction:column;">
                    <span class="suggestion-title" style="font-weight:600; font-size:0.9rem;">${item.title}</span>
                    <span class="suggestion-type" style="font-size:0.8rem; color:#666;">${item.type} • ${item.autor || ''}</span>
                </div>
            `;
            div.addEventListener('click', () => this.goToResult(item));
            container.appendChild(div);
        });
    },

    getIcon(type) {
        if (type === 'Video') return '🎬';
        if (type === 'Perfil') return '🎨';
        return '🖼️';
    },

    goToResult(item) {
        if (item.type === 'Perfil') {
            window.location.href = item.url;
            return;
        }

        // Si estamos en la página correcta y tenemos el modal, lo abrimos directo
        if (window.location.pathname.includes(item.url) && DOM.modal) {
            this.clearSuggestions();
            // Simular estructura de datos para el ModalManager
            const modalData = {
                dataset: {
                    type: item.type,
                    src: item.src,
                    title: item.title,
                    autor: item.autor,
                    desc: item.desc,
                    year: item.year
                }
            };
            // Llamamos a abrirModal pero pasando un objeto simulado compatible
            ModalManager.openFromData(item); 
        } else {
            // Si estamos en otra página, redirigimos con parámetro de búsqueda
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
    init() { this.bindEvents(); },
    bindEvents() {
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
        DOM.modal?.addEventListener('click', (e) => { if (e.target === DOM.modal) this.close(); });
    },

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
        // Respetar saltos de línea para las nuevas fichas técnicas
        if (DOM.modalDesc) {
            DOM.modalDesc.textContent = data.desc || '';
            DOM.modalDesc.style.whiteSpace = 'pre-line'; 
        }
        if (DOM.modalYear) DOM.modalYear.textContent = data.year || '';
    },

    showContent(type, src) {
        const isVideo = type === 'Video' || type === 'video';
        
        if (DOM.modalImg) DOM.modalImg.style.display = isVideo ? 'none' : 'block';
        if (DOM.modalVideo) DOM.modalVideo.style.display = isVideo ? 'block' : 'none';
        
        // Manejo de YouTube
        let youtubeFrame = document.getElementById('mYoutube');
        if (youtubeFrame) youtubeFrame.style.display = 'none';

        if (isVideo) {
            if (src.includes('youtube.com') || src.includes('youtu.be')) {
                // Es YouTube
                if (!youtubeFrame) youtubeFrame = this.createYoutubeFrame();
                
                const videoId = src.split('v=')[1] ? src.split('v=')[1].split('&')[0] : src.split('/').pop();
                youtubeFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                youtubeFrame.style.display = 'block';
                if (DOM.modalVideo) DOM.modalVideo.style.display = 'none'; // Ocultar tag video normal
            } else {
                // Es MP4 Local
                if (DOM.modalVideo) {
                    DOM.modalVideo.src = src;
                    DOM.modalVideo.style.display = 'block';
                    DOM.modalVideo.play().catch(() => {});
                    this.currentVideo = DOM.modalVideo;
                }
            }
        } else if (DOM.modalImg) {
            DOM.modalImg.src = src;
            this.pauseCurrentVideo();
        }
    },

    createYoutubeFrame() {
        const frame = document.createElement('iframe');
        frame.id = 'mYoutube';
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.border = 'none';
        frame.allow = "autoplay; encrypted-media";
        frame.allowFullscreen = true;
        document.querySelector('.modal-media').appendChild(frame);
        return frame;
    },

    close() {
        if (DOM.modal) DOM.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.pauseCurrentVideo();
        if (DOM.modalVideo) DOM.modalVideo.src = '';
        const youtubeFrame = document.getElementById('mYoutube');
        if (youtubeFrame) youtubeFrame.src = ''; // Detener YouTube
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
            const title = (card.dataset.title || '').toLowerCase();
            const autor = (card.dataset.autor || '').toLowerCase();
            const keywords = (card.dataset.keywords || '').toLowerCase();
            const desc = (card.dataset.desc || '').toLowerCase();
            
            const isVisible = title.includes(searchText) || 
                              autor.includes(searchText) || 
                              keywords.includes(searchText) ||
                              desc.includes(searchText);
            
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
        const toggleBtn = document.querySelector('.menu-toggle');
        if(toggleBtn) toggleBtn.addEventListener('click', () => this.toggle());
    },
    toggle() { DOM.navLinks?.classList.toggle('active'); }
};

/* --- Funciones Globales para el HTML (onclick) --- */
function abrirModal(el) { ModalManager.open(el); }
function cerrarModalBtn() { ModalManager.close(); }
function cerrarModal(e) { if (e.target.id === 'modalVisualizador') ModalManager.close(); }
function toggleSearch() { SearchManager.toggleSearch(); }
function toggleMenu() { MobileNav.toggle(); }
function filtrarObras() { 
    // Esta función se llama desde el HTML onkeyup
    const val = document.getElementById('searchInput').value;
    SearchManager.filterCardsOnPage(val);
}

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
    SearchManager.init();
    MobileNav.init();
    AutocompleteManager.init();
    
    // Lazy Load & Animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('card-enter'); observer.unobserve(e.target); } });
    });
    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));
});