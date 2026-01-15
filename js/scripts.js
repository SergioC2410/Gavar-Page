/**
 * GAVAR - Script Principal
 * Versión: Corregida (Menú Móvil Fix)
 */

/* ==========================================================================
   1. BASE DE DATOS MAESTRA
   ========================================================================== */
const SEARCH_DB = [
    // --- OBRAS NUEVAS ---
    { title: "Resiliencia", url: "galeria.html", type: "Obra", keywords: "serigrafia alix velasquez", src: "assets/img/resiliencia.jpg", autor: "Alix Velásquez", year: "2025", desc: "Técnica / Materia: Serigrafía.\nCantidad: 1 pieza.\nInstagram: @alix_v_art" },
    { title: "Real", url: "galeria.html", type: "Obra", keywords: "xilografia arantza martinez", src: "assets/img/real.jpg", autor: "Arantza Martínez", year: "2025", desc: "Técnica / Materia: Xilografía.\nCantidad: 1 pieza." },
    { title: "Solaria", url: "galeria.html", type: "Obra", keywords: "digital andrea blanco", src: "assets/img/solaria.jpg", autor: "Andrea Blanco", year: "2024", desc: "Técnica / Materia: Digital.\nCantidad: 1 pieza.\nInstagram: @anbndy22" },
    { title: "The News", url: "galeria.html", type: "Obra", keywords: "digital isabel figueroa", src: "assets/img/the_news.jpg", autor: "Isabel Figueroa", year: "2022", desc: "Técnica / Materia: Superposición digital.\nCantidad: 1 pieza." },
    { title: "Antimateria", url: "galeria.html", type: "Obra", keywords: "hilograma koda", src: "assets/img/antimateria.jpg", autor: "Efraín Aguilera (Koda)", year: "2024", desc: "Técnica / Materia: Ensamblaje e hilograma.\nCantidad: 1 pieza.\nInstagram: @6kodafree6" },
    { title: "El Tapiz del Alma", url: "galeria.html", type: "Obra", keywords: "pop-up cristian rojas", src: "assets/img/el_tapiz_del_alma.jpg", autor: "Cristian Rojas", year: "2025", desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza." },
    { title: "Bodhiria", url: "galeria.html", type: "Obra", keywords: "pop-up mariend romero", src: "assets/img/bodhiria.jpg", autor: "Mariend Romero", year: "2025", desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza." },
    { title: "Fábrica de la Memoria", url: "galeria.html", type: "Obra", keywords: "pop-up ricardo suarez", src: "assets/img/fabrica_de_la_memoria.jpg", autor: "Ricardo Suarez", year: "2024", desc: "Técnica / Materia: Pop-up. Libro objeto.\nCantidad: 1 pieza.\nInstagram: @richyross_art" },
    
    // --- EXPOSICIONES ---
    { title: "Recorrido Virtual 2024", url: "exposiciones.html", type: "Video", keywords: "tour virtual", src: "", autor: "Curaduría GAVAR", year: "2024", desc: "Video introductorio al espacio virtual." },
    
    // --- REVERÓN ---
    { title: "Armando Reverón (Perfil)", url: "mencion-especial.html", type: "Perfil", keywords: "reveron muñecas luz" },
    { title: "La Cueva", url: "mencion-especial.html", type: "Obra", keywords: "reveron azul", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/La_Cueva_-_Armando_Rever%C3%B3n.jpg/1200px-La_Cueva_-_Armando_Rever%C3%B3n.jpg", autor: "Armando Reverón", year: "1920", desc: "Obra maestra de su Período Azul." }
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
   3. AUTOCOMPLETADO
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
    searchInDB(query) {
        const lowerQuery = query.toLowerCase();
        return SEARCH_DB.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.keywords.toLowerCase().includes(lowerQuery) ||
            (item.autor && item.autor.toLowerCase().includes(lowerQuery))
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
    goToResult(item) {
        if (item.type === 'Perfil') { window.location.href = item.url; return; }
        if (DOM.modal) {
            this.clearSuggestions();
            cerrarBusquedaMovil();
            ModalManager.openFromData({ 
                title: item.title,
                autor: item.autor,
                year: item.year,
                desc: item.desc,
                src: item.src,
                type: item.type
            }); 
        } else {
            window.location.href = `${item.url}?search=${encodeURIComponent(item.title)}`;
        }
    },
    clearSuggestions() { document.querySelectorAll('.suggestions-list').forEach(el => el.style.display = 'none'); }
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
            title: element.dataset.title,
            autor: element.dataset.autor,
            year: element.dataset.year,
            desc: element.dataset.desc,
            src: element.dataset.src,
            type: element.dataset.type
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
        if (DOM.modalAutor) DOM.modalAutor.textContent = data.autor || '';

        const infoContainer = document.getElementById('mInfoContainer');
        if (infoContainer) {
            let htmlContent = '';
            if (data.year) htmlContent += `<span class="modal-year">${data.year}</span>`;
            if (data.desc) htmlContent += `<div class="modal-desc-block">${data.desc}</div>`;
            else htmlContent += `<div class="modal-desc-block">Sin descripción disponible.</div>`;
            infoContainer.innerHTML = htmlContent;
        }
    },

    showContent(type, src) {
        const isVideo = type === 'Video' || type === 'video';
        if (DOM.modalImg) DOM.modalImg.style.display = isVideo ? 'none' : 'block';
        if (DOM.modalVideo) DOM.modalVideo.style.display = isVideo ? 'block' : 'none';
        
        let youtubeFrame = document.getElementById('mYoutube');
        if (youtubeFrame) youtubeFrame.style.display = 'none';

        if (isVideo) {
            if (src && (src.includes('youtube.com') || src.includes('youtu.be'))) {
                if (!youtubeFrame) youtubeFrame = this.createYoutubeFrame();
                const videoId = src.split('v=')[1] ? src.split('v=')[1].split('&')[0] : src.split('/').pop();
                youtubeFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                youtubeFrame.style.display = 'block';
                if(DOM.modalVideo) DOM.modalVideo.style.display = 'none';
            } else if (DOM.modalVideo) {
                DOM.modalVideo.src = src;
                DOM.modalVideo.style.display = 'block';
                DOM.modalVideo.play().catch(() => {});
                this.currentVideo = DOM.modalVideo;
            }
        } else if (DOM.modalImg) {
            DOM.modalImg.src = src;
            this.pauseCurrentVideo();
        }
    },
    createYoutubeFrame() {
        const frame = document.createElement('iframe'); frame.id = 'mYoutube';
        frame.style.width = '100%'; frame.style.height = '100%'; frame.style.border = 'none';
        frame.allow = "autoplay; encrypted-media";
        document.querySelector('.modal-media').appendChild(frame);
        return frame;
    },
    close() {
        if (DOM.modal) DOM.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.pauseCurrentVideo();
        if (DOM.modalVideo) DOM.modalVideo.src = '';
        const youtubeFrame = document.getElementById('mYoutube');
        if (youtubeFrame) youtubeFrame.src = '';
    },
    pauseCurrentVideo() {
        if (this.currentVideo) { this.currentVideo.pause(); this.currentVideo.currentTime = 0; }
    }
};

/* ==========================================================================
   5. NAVEGACIÓN Y SEARCH
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
            const isVisible = title.includes(searchText) || autor.includes(searchText) || keywords.includes(searchText) || desc.includes(searchText);
            card.style.display = isVisible ? 'flex' : 'none';
        });
    },
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) setTimeout(() => DOM.searchInput.focus(), 400);
    }
};

/* --- AQUÍ ESTABA EL PROBLEMA DEL MENÚ --- */
const MobileNav = {
    init() {
        // CORRECCIÓN: Dejamos esto vacío.
        // Ya no agregamos 'addEventListener' aquí porque el HTML ya tiene onclick="toggleMenu()".
        // Antes se ejecutaba dos veces (abría y cerraba instantáneamente).
    },
    toggle() { 
        if (DOM.navLinks) DOM.navLinks.classList.toggle('active'); 
    }
};

/* --- Funciones Globales --- */
function abrirModal(el) { ModalManager.open(el); }
function cerrarModalBtn() { ModalManager.close(); }
function cerrarModal(e) { if (e.target.id === 'modalVisualizador') ModalManager.close(); }
function toggleSearch() { SearchManager.toggleSearch(); }
// Esta función es la que llama el HTML. Ahora solo ejecuta una vez la lógica.
function toggleMenu() { MobileNav.toggle(); } 
function filtrarObras() { const val = document.getElementById('searchInput').value; SearchManager.filterCardsOnPage(val); }
function abrirBusquedaMovil() { MobileNav.toggle(); if (DOM.mobileSearchOverlay) { DOM.mobileSearchOverlay.style.display = 'flex'; setTimeout(() => DOM.mobileInput?.focus(), 100); } }
function cerrarBusquedaMovil() { if (DOM.mobileSearchOverlay) DOM.mobileSearchOverlay.style.display = 'none'; if (DOM.mobileInput) DOM.mobileInput.value = ''; AutocompleteManager.clearSuggestions(); }
function ejecutarBusquedaMovil() { const busqueda = DOM.mobileInput?.value; if (busqueda) { window.location.href = `galeria.html?search=${encodeURIComponent(busqueda)}`; } }
DOM.mobileInput?.addEventListener('keyup', (e) => { if (e.key === 'Enter') ejecutarBusquedaMovil(); });

document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init(); SearchManager.init(); MobileNav.init(); AutocompleteManager.init();
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('card-enter'); observer.unobserve(e.target); } }); });
    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));
    document.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
});