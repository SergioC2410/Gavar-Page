
/**
 * GAVAR - Script Principal
 * Versión: Corregida (Búsqueda Flexible + Galería Full)
 */

/* ==========================================================================
   0. UTILIDADES GLOBALES (NUEVO: Para ignorar acentos)
   ========================================================================== */
const normalizeText = (text) => {
    if (!text) return "";
    return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/* ==========================================================================
   1. BASE DE DATOS MAESTRA
   ========================================================================== */
const SEARCH_DB = [
    // --- OBRAS GRÁFICAS Y MIXTAS ---
    { 
        title: "Resiliencia", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "serigrafia grabado tinta papel arte grafico alix velasquez", 
        // 2 FOTOS
        images: [
            "assets/img/resiliencia.jpg",
            "assets/img/resiliencia_detalle1.jpg" 
        ], 
        autor: "Alix Velásquez", 
        year: "2025", 
        desc: "Técnica / Materia: Serigrafía.\nCantidad: 1 pieza.\nInstagram: @alix_v_art" 
    },
    { 
        title: "Real", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "xilografia madera grabado relieve impresion arantza martinez", 
        // 2 FOTOS
        images: [
            "assets/img/real.jpg",
            "assets/img/real_detalle1.jpg"
        ], 
        autor: "Arantza Martínez", 
        year: "2025", 
        desc: "Técnica / Materia: Xilografía.\nCantidad: 1 pieza." 
    },
    { 
        title: "Solaria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "digital ilustracion diseño tablet computadora andrea blanco", 
        // 1 FOTO
        images: ["assets/img/solaria.jpg"], 
        autor: "Andrea Blanco", 
        year: "2024", 
        desc: "Técnica / Materia: Digital.\nCantidad: 1 pieza.\nInstagram: @anbndy22" 
    },
    { 
        title: "The News", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "superposicion digital capas collage fotomontaje isabel figueroa", 
        // 1 FOTO
        images: ["assets/img/the_news.jpg"], 
        autor: "Isabel Figueroa", 
        year: "2022", 
        desc: "Técnica / Materia: Superposición digital.\nCantidad: 1 pieza." 
    },
    { 
        title: "Antimateria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "ensamblaje hilograma hilos clavos madera escultura mixta koda efrain aguilera", 
        // 3 FOTOS
        images: [
            "assets/img/antimateria.jpg",
            "assets/img/antimateria_detalle1.jpg",
            "assets/img/antimateria_detalle2.jpg"
        ], 
        autor: "Efraín Aguilera (Koda)", 
        year: "2024", 
        desc: "Técnica / Materia: Ensamblaje e hilograma.\nCantidad: 1 pieza.\nInstagram: @6kodafree6" 
    },

    // --- LIBROS OBJETO (POP-UP) ---
    { 
        title: "El Tapiz del Alma", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto 3d papel escultura cristian rojas", 
        // 9 FOTOS
        images: [
            "assets/img/el_tapiz_del_alma.jpg",
            "assets/img/el_tapiz_del_alma1.jpg",
            "assets/img/el_tapiz_del_alma2.jpg",
            "assets/img/el_tapiz_del_alma3.jpg",
            "assets/img/el_tapiz_del_alma4.jpg",
            "assets/img/el_tapiz_del_alma5.jpg",
            "assets/img/el_tapiz_del_alma6.jpg",
            "assets/img/el_tapiz_del_alma7.jpg",
            "assets/img/el_tapiz_del_alma8.jpg"
        ], 
        autor: "Cristian Rojas", 
        year: "2025", 
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza." 
    },
    { 
        title: "Bodhiria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto plegable papel mariend romero", 
        // 7 FOTOS
        images: [
            "assets/img/bodhiria.jpg",
            "assets/img/bodhiria_1.jpg",
            "assets/img/bodhiria_2.jpg",
            "assets/img/bodhiria_3.jpg",
            "assets/img/bodhiria_4.jpg",
            "assets/img/bodhiria_5.jpg",
            "assets/img/bodhiria_6.jpg"
        ], 
        autor: "Mariend Romero", 
        year: "2025", 
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza." 
    },
    { 
        title: "Fábrica de la Memoria", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "pop-up popup libro objeto memoria papel arquitectura ricardo suarez", 
        // 9 FOTOS
        images: [
            "assets/img/fabrica_de_la_memoria.jpg",
            "assets/img/fabrica_de_la_memoria_1.jpg",
            "assets/img/fabrica_de_la_memoria_2.jpg",
            "assets/img/fabrica_de_la_memoria3.jpg",
            "assets/img/fabrica_de_la_memoria4.jpg",
            "assets/img/fabrica_de_la_memoria5.jpg",
            "assets/img/fabrica_de_la_memoria6.jpg",
            "assets/img/fabrica_de_la_memoria7.jpg",
            "assets/img/fabrica_de_la_memoria8.jpg"
        ], 
        autor: "Ricardo Suarez", 
        year: "2024", 
        desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza.\nInstagram: @richyross_art" 
    },

    // --- EXPOSICIONES Y REVERÓN (SIN CAMBIOS) ---
    { 
        title: "Recorrido Virtual 2024", 
        url: "exposiciones.html", 
        type: "Video", 
        keywords: "tour virtual video recorrido", 
        images: [""], 
        autor: "Curaduría GAVAR", 
        year: "2024", 
        desc: "Video introductorio al espacio virtual." 
    },
    { 
        title: "Armando Reverón (Perfil)", 
        url: "mencion-especial.html", 
        type: "Perfil", 
        keywords: "reveron armando maestro luz castillete" 
    },
    { 
        title: "La Cueva", 
        url: "mencion-especial.html", 
        type: "Obra", 
        keywords: "reveron azul pintura clasica", 
        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/La_Cueva_-_Armando_Rever%C3%B3n.jpg/1200px-La_Cueva_-_Armando_Rever%C3%B3n.jpg"], 
        autor: "Armando Reverón", 
        year: "1920", 
        desc: "Obra maestra de su Período Azul." 
    }
];

/* ==========================================================================
   2. DOM & UTILS
   ========================================================================== */
const DOM = {
    modal: document.getElementById('modalVisualizador'),
    modalImg: document.getElementById('mImg'),
    modalVideo: document.getElementById('mVideo'),
    modalTitle: document.getElementById('mTitle'),
    modalAutor: document.getElementById('mAutor'),
    searchInput: document.getElementById('searchInput'),
    searchBox: document.querySelector('.search-box'),
    navLinks: document.getElementById('navLinks'),
    mobileSearchOverlay: document.getElementById('mobileSearchOverlay'),
    mobileInput: document.getElementById('mobileInput')
};

/* ==========================================================================
   3. AUTOCOMPLETADO (CORREGIDO ACENTOS Y DATA)
   ========================================================================== */
const AutocompleteManager = {
    init() {
        this.createSuggestionsBox('desktop-suggestions', DOM.searchBox);
        const mobileContainer = document.querySelector('.search-modal-content');
        if(mobileContainer) this.createSuggestionsBox('mobile-suggestions', mobileContainer);
        this.bindEvents();
    },
    createSuggestionsBox(id, parent) {
        if (!parent || document.getElementById(id)) return;
        const box = document.createElement('div');
        box.id = id; box.className = 'suggestions-list';
        box.style.cssText = "display:none; position:absolute; top:100%; left:0; width:100%; background:#fff; border:1px solid #ccc; border-radius:0 0 12px 12px; z-index:1000; box-shadow:0 4px 6px rgba(0,0,0,0.1); max-height:300px; overflow-y:auto;";
        parent.appendChild(box);
    },
    bindEvents() {
        DOM.searchInput?.addEventListener('input', (e) => {
            this.handleInput(e.target.value, 'desktop-suggestions');
            SearchManager.filterCardsOnPage(e.target.value); 
        });
        DOM.mobileInput?.addEventListener('input', (e) => {
            this.handleInput(e.target.value, 'mobile-suggestions');
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && !e.target.closest('.search-modal-content')) this.clearSuggestions();
        });
    },
    handleInput(text, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (text.length < 2) { container.style.display = 'none'; return; }
        const matches = this.searchInDB(text);
        this.renderSuggestions(matches, container);
    },
    
    // --- BÚSQUEDA INSENSIBLE A ACENTOS ---
    searchInDB(query) {
        const cleanQuery = normalizeText(query);
        return SEARCH_DB.filter(item => 
            normalizeText(item.title).includes(cleanQuery) || 
            normalizeText(item.keywords).includes(cleanQuery) ||
            (item.autor && normalizeText(item.autor).includes(cleanQuery))
        ).slice(0, 6);
    },

    renderSuggestions(results, container) {
        if (!results.length) { container.style.display = 'none'; return; }
        container.innerHTML = ''; container.style.display = 'block';
        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.style.cssText = "padding:10px; cursor:pointer; border-bottom:1px solid #eee; display:flex; align-items:center; gap:10px; color: #333;";
            div.onmouseover = () => div.style.background = "#f9f9f9";
            div.onmouseout = () => div.style.background = "#fff";
            div.innerHTML = `
                <span style="font-size:1.2rem;">${item.type === 'Video' ? '🎬' : '🖼️'}</span>
                <div style="display:flex; flex-direction:column; text-align:left;">
                    <span style="font-weight:600; font-size:0.9rem;">${item.title}</span>
                    <span style="font-size:0.75rem; color:#666;">${item.autor || ''}</span>
                </div>
            `;
            div.addEventListener('click', () => this.goToResult(item));
            container.appendChild(div);
        });
    },
    
    // --- AQUÍ ARREGLAMOS LA CARGA DESDE BÚSQUEDA ---
    goToResult(item) {
        if (item.type === 'Perfil') { window.location.href = item.url; return; }
        
        // Si estamos en una página con modal, lo abrimos directamente
        if (DOM.modal) {
            this.clearSuggestions();
            cerrarBusquedaMovil();
            
            // CORRECCIÓN: Pasamos el array 'images' en lugar de 'src'
            ModalManager.openFromData({ 
                title: item.title,
                autor: item.autor,
                year: item.year,
                desc: item.desc,
                images: item.images, // <--- ESTO ES LO IMPORTANTE
                type: item.type
            }); 
        } else {
            // Si estamos en Index y vamos a Galería
            window.location.href = `${item.url}?search=${encodeURIComponent(item.title)}`;
        }
    },
    clearSuggestions() { document.querySelectorAll('.suggestions-list').forEach(el => el.style.display = 'none'); }
};

/* ==========================================================================
   4. GESTIÓN DE MODALES (CON ARRAY DE IMÁGENES + DB LOOKUP)
   ========================================================================== */
const ModalManager = {
    currentVideo: null,
    currentImages: [],
    currentIndex: 0,
    touchStartX: 0,
    touchEndX: 0,

    init() { this.bindEvents(); },
    
    bindEvents() {
        document.addEventListener('keydown', (e) => { 
            if (e.key === 'Escape') this.close(); 
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'ArrowLeft') this.prevImage();
        });
        DOM.modal?.addEventListener('click', (e) => { if (e.target === DOM.modal) this.close(); });

        const mediaContainer = document.querySelector('.media-container');
        if (mediaContainer) {
            mediaContainer.addEventListener('touchstart', (e) => { this.touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            mediaContainer.addEventListener('touchend', (e) => { 
                this.touchEndX = e.changedTouches[0].screenX; 
                this.handleSwipe(); 
            }, { passive: true });
        }
    },

    handleSwipe() {
        if (this.touchEndX < this.touchStartX - 50) this.nextImage();
        if (this.touchEndX > this.touchStartX + 50) this.prevImage();
    },

    // --- CORRECCIÓN CRÍTICA PARA ABRIR DESDE TARJETAS HTML ---
    open(element) {
        let imgs = [];
        
        // 1. INTENTAR BUSCAR EN LA DB POR TÍTULO (Esto arregla si el HTML es viejo)
        const dbEntry = SEARCH_DB.find(item => normalizeText(item.title) === normalizeText(element.dataset.title));
        
        if (dbEntry && dbEntry.images && Array.isArray(dbEntry.images)) {
            imgs = dbEntry.images;
        } else if (element.dataset.src) {
            // Fallback: Si no está en DB, usa lo que tenga el HTML
            imgs = [element.dataset.src];
        }

        const data = {
            title: element.dataset.title,
            autor: element.dataset.autor,
            year: element.dataset.year,
            desc: element.dataset.desc,
            type: element.dataset.type,
            images: imgs
        };
        this.openFromData(data);
    },

    openFromData(data) {
        if (!DOM.modal) return;
        
        // Asegurar que siempre hay un array
        this.currentImages = data.images || [];
        if (typeof this.currentImages === 'string') this.currentImages = [this.currentImages];
        
        this.currentIndex = 0;
        this.populateText(data);
        this.updateGalleryUI(data.type);
        
        DOM.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    populateText(data) {
        if (DOM.modalTitle) DOM.modalTitle.textContent = data.title || 'Sin título';
        if (DOM.modalAutor) DOM.modalAutor.textContent = data.autor || '';
        const infoContainer = document.getElementById('mInfoContainer');
        if (infoContainer) {
            let htmlContent = '';
            if (data.year) htmlContent += `<span class="modal-year">${data.year}</span>`;
            if (data.desc) htmlContent += `<div class="modal-desc-block">${data.desc}</div>`;
            infoContainer.innerHTML = htmlContent;
        }
    },

    updateGalleryUI(type) {
        const isVideo = type === 'Video' || type === 'video';
        const uiElements = [
            document.getElementById('prevBtn'), 
            document.getElementById('nextBtn'), 
            document.getElementById('modalThumbnails'), 
            document.getElementById('mobileDots')
        ];
        const mImg = document.getElementById('mImg');
        const mVideo = document.getElementById('mVideo');
        const mYoutube = document.getElementById('mYoutube');

        if(mImg) { mImg.style.display = 'none'; mImg.className = ''; }
        if(mVideo) mVideo.style.display = 'none';
        if(mYoutube) mYoutube.style.display = 'none';

        if (isVideo) {
            uiElements.forEach(el => { if(el) el.style.display = 'none'; });
            const src = this.currentImages[0] || ""; 
            if (src.includes('youtube') || src.includes('youtu.be')) {
                if(mYoutube) {
                    const videoId = src.split('v=')[1] ? src.split('v=')[1].split('&')[0] : src.split('/').pop();
                    mYoutube.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    mYoutube.style.display = 'block';
                }
            } else if (mVideo) {
                mVideo.src = src; mVideo.style.display = 'block';
                mVideo.play().catch(() => {});
                this.currentVideo = mVideo;
            }
        } else {
            if(mImg) mImg.style.display = 'block';
            this.showImage(this.currentIndex, null);
            this.renderControls();
        }
    },

    showImage(index, direction) {
        const mImg = document.getElementById('mImg');
        if (this.currentImages.length > 0) {
            mImg.src = this.currentImages[index];
            if (direction) {
                mImg.classList.remove('anim-next', 'anim-prev');
                void mImg.offsetWidth;
                if (direction === 'next') mImg.classList.add('anim-next');
                if (direction === 'prev') mImg.classList.add('anim-prev');
            }
        }
        document.querySelectorAll('.thumb-img').forEach((t, i) => {
            t.classList.toggle('active', i === index);
            if (i === index && t.parentNode) {
                t.parentNode.scrollLeft = t.offsetLeft - (t.parentNode.clientWidth / 2) + (t.clientWidth / 2);
            }
        });
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
    },

    renderControls() {
        const thumbsContainer = document.getElementById('modalThumbnails');
        const dotsContainer = document.getElementById('mobileDots');
        const arrows = [document.getElementById('prevBtn'), document.getElementById('nextBtn')];
        
        if(thumbsContainer) thumbsContainer.innerHTML = '';
        if(dotsContainer) dotsContainer.innerHTML = '';

        if (this.currentImages.length < 2) {
            if(thumbsContainer) thumbsContainer.style.display = 'none';
            if(dotsContainer) dotsContainer.style.display = 'none';
            arrows.forEach(a => { if(a) a.style.display = 'none'; });
            return;
        }

        if(thumbsContainer) thumbsContainer.style.display = 'flex';
        if(dotsContainer) dotsContainer.style.display = 'flex'; 
        arrows.forEach(a => { if(a) a.style.display = ''; }); 

        this.currentImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src; img.className = 'thumb-img';
            if (index === this.currentIndex) img.classList.add('active');
            img.onclick = (e) => { e.stopPropagation(); this.currentIndex = index; this.showImage(index, index > this.currentIndex ? 'next' : 'prev'); };
            if(thumbsContainer) thumbsContainer.appendChild(img);

            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === this.currentIndex) dot.classList.add('active');
            dot.onclick = (e) => { e.stopPropagation(); this.currentIndex = index; this.showImage(index, 'next'); }; 
            if(dotsContainer) dotsContainer.appendChild(dot);
        });
    },

    nextImage() {
        if (this.currentImages.length < 2) return;
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        this.showImage(this.currentIndex, 'next');
    },

    prevImage() {
        if (this.currentImages.length < 2) return;
        this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
        this.showImage(this.currentIndex, 'prev');
    },

    close() {
        if (DOM.modal) DOM.modal.style.display = 'none';
        document.body.style.overflow = '';
        if (this.currentVideo) { this.currentVideo.pause(); this.currentVideo.currentTime = 0; }
        if (DOM.modalVideo) DOM.modalVideo.src = '';
        const youtubeFrame = document.getElementById('mYoutube');
        if (youtubeFrame) youtubeFrame.src = '';
    }
};

/* ==========================================================================
   5. NAVEGACIÓN Y FILTRADO (BÚSQUEDA CORREGIDA)
   ========================================================================== */
const SearchManager = {
    init() { this.checkURLParams(); },
    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm && DOM.searchInput) {
            DOM.searchInput.value = searchTerm;
            DOM.searchBox?.classList.add('active');
            // Esperar un poco para asegurar que las cartas existan
            setTimeout(() => this.filterCardsOnPage(searchTerm), 100);
        }
    },
    // --- FILTRADO INSENSIBLE A ACENTOS ---
    filterCardsOnPage(text) {
        const cleanText = normalizeText(text);
        document.querySelectorAll('.file-card').forEach(card => {
            // Buscamos en los atributos data del HTML, normalizándolos también
            const title = normalizeText(card.dataset.title);
            const autor = normalizeText(card.dataset.autor);
            const keywords = normalizeText(card.dataset.keywords);
            
            const isVisible = title.includes(cleanText) || autor.includes(cleanText) || keywords.includes(cleanText);
            card.style.display = isVisible ? 'flex' : 'none';
        });
    },
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) setTimeout(() => DOM.searchInput.focus(), 400);
    }
};

/* --- MOBILE NAV --- */
const MobileNav = {
    init() {},
    toggle() { if (DOM.navLinks) DOM.navLinks.classList.toggle('active'); }
};

/* --- FUNCIONES GLOBALES --- */
function abrirModal(el) { ModalManager.open(el); }
function cerrarModalBtn() { ModalManager.close(); }
function cerrarModal(e) { if (e.target.id === 'modalVisualizador') ModalManager.close(); }
function toggleSearch() { SearchManager.toggleSearch(); }
function toggleMenu() { MobileNav.toggle(); } 
function filtrarObras() { const val = document.getElementById('searchInput').value; SearchManager.filterCardsOnPage(val); }
function abrirBusquedaMovil() { MobileNav.toggle(); if (DOM.mobileSearchOverlay) { DOM.mobileSearchOverlay.style.display = 'flex'; setTimeout(() => DOM.mobileInput?.focus(), 100); } }
function cerrarBusquedaMovil() { if (DOM.mobileSearchOverlay) DOM.mobileSearchOverlay.style.display = 'none'; if (DOM.mobileInput) DOM.mobileInput.value = ''; AutocompleteManager.clearSuggestions(); }
function ejecutarBusquedaMovil() { const busqueda = DOM.mobileInput?.value; if (busqueda) { window.location.href = `galeria.html?search=${encodeURIComponent(busqueda)}`; } }
DOM.mobileInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') ejecutarBusquedaMovil(); });

document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init(); SearchManager.init(); MobileNav.init(); AutocompleteManager.init();
    
    // Animación de entrada de cartas
    const observer = new IntersectionObserver((entries) => { 
        entries.forEach(e => { 
            if(e.isIntersecting) { e.target.classList.add('card-enter'); observer.unobserve(e.target); } 
        }); 
    });
    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));

    // Lazy load para imágenes con data-src (si las hubiera)
    document.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
});