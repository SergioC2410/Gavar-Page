
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
    // --- NUEVAS INCORPORACIONES (2025) ---
    { 
        title: "Serie Orquídea", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "karen gonzalez serie orquidea grafito dibujo botanica", 
        images: [
            "assets/img/serie_orquidea_1.jpg", 
            "assets/img/serie_orquidea_2.jpg",
            "assets/img/serie_orquidea_3.jpg"
        ], 
        autor: "Karen González", 
        year: "2024", 
        desc: "Técnica / Materia: Grafito.\nCantidad: 1 pieza." 
    },
    { 
        title: "Calma", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "lennis lopez calma estampa agua fuerte grabado", 
        images: [
            "assets/img/calma_1.jpg", 
            "assets/img/calma_2.jpg"
        ], 
        autor: "Lennis López", 
        year: "2025", 
        desc: "Técnica / Materia: Estampa de agua fuerte.\nCantidad: 1 pieza." 
    },
    { 
        title: "Momo New Year 2025", 
        url: "galeria.html", 
        type: "Obra", 
        keywords: "jhonattan rovaina momo new year 2025 digital ilustracion saradragonil1", 
        images: ["assets/img/momo_new_year.jpg"], 
        autor: "Jhonattan Rovaina", 
        year: "2025", 
        desc: "Técnica: Digital.\nCantidad: 1 pieza.\nInstagram: @saradragonil1" 
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
   2. DOM GLOBAL
   ========================================================================== */
// Se inicializa vacío y se rellena tras la inyección
let DOM = {}; 

/* ==========================================================================
   3. INYECTOR DE HTML (COMPONENTES)
   ========================================================================== */
/* 3. INYECTOR DE HTML */
const ComponentInjector = {
    run: () => {
        // CORRECCIÓN: Quitamos el '!important' del display base para que el media query funcione
        const styleFix = `
            <style>
                .nav-arrow { 
                    display: flex; /* Se muestra por defecto, el JS lo ocultará si es necesario */
                    align-items: center !important; 
                    justify-content: center !important; 
                    padding-bottom: 2px !important; 
                }
                .modal-desc-block { font-size: 1.1rem !important; line-height: 1.6 !important; margin-top:15px; }
                .suggestion-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; background: #eee; }
                
                /* ESTO AHORA SÍ FUNCIONARÁ: Oculta flechas en móvil obligatoriamente */
                @media (max-width: 768px) { .nav-arrow { display: none !important; } }
            </style>`;
        
        // ... (El resto del HTML del modal y buscador sigue igual, no necesitas copiarlo todo si no quieres, 
        // pero asegúrate de que el styleFix sea el de arriba)
        
        // CÓDIGO DE INYECCIÓN COMPLETO PARA EVITAR ERRORES DE COPIA:
        if (!document.getElementById('modalVisualizador')) {
            const modalHTML = `
                <div id="modalVisualizador" class="modal-overlay" aria-hidden="true" style="display:none;">
                    <div class="modal-window">
                        <div class="modal-media">
                            <button id="btnModalPrev" class="nav-arrow modal-arrow left">&#10094;</button>
                            <div class="media-container" id="mediaContainer">
                                <img id="mImg" src="" style="display:none;" alt="Obra">
                                <video id="mVideo" controls style="display:none; width:100%;"></video>
                                <iframe id="mYoutube" style="display:none; width:100%; height:100%; border:none;"></iframe>
                            </div>
                            <button id="btnModalNext" class="nav-arrow modal-arrow right">&#10095;</button>
                            <div id="modalThumbnails" class="thumbnails-strip"></div>
                            <div id="mobileDots" class="mobile-dots"></div>
                        </div>
                        <div class="modal-details">
                            <button id="btnModalClose" class="close-modal">×</button>
                            <div id="modalTextContent"></div>
                        </div>
                    </div>
                </div>`;
            
            const searchHTML = `
                <div id="mobileSearchOverlay" class="search-modal-overlay" aria-hidden="true" style="display:none;">
                    <div class="search-modal-content">
                        <h3>¿Qué deseas buscar?</h3>
                        <input type="text" id="mobileInput" placeholder="Buscar..." autocomplete="off">
                        <div id="mobile-suggestions" class="suggestions-list"></div>
                        <button onclick="cerrarBusquedaMovil()" class="btn-cancel" style="margin-top:10px;">Cerrar</button>
                    </div>
                </div>`;

            document.body.insertAdjacentHTML('beforeend', styleFix + modalHTML + searchHTML);
        }
        
        const desktopBox = document.getElementById('searchBoxDesktop');
        if(desktopBox && !document.getElementById('desktopSuggestions')) {
            desktopBox.insertAdjacentHTML('beforeend', '<div id="desktopSuggestions" class="suggestions-list" style="display:none;"></div>');
        }
    }
};

/* ==========================================================================
   4. RENDERIZADOR DE TARJETAS (CORREGIDO: EVITA CRASH EN REVERÓN)
   ========================================================================== */
const ContentRenderer = {
    render: () => {
        // A. GALERÍA PRINCIPAL (Filtro: Es Obra Y NO es Reverón)
        const grid = document.getElementById('gridObras');
        if (grid) {
            // Aseguramos que i.autor existe antes de usar includes
            const items = SEARCH_DB.filter(i => i.type === 'Obra' && i.autor && !i.autor.includes('Reverón'));
            grid.innerHTML = items.map(ContentRenderer.cardTemplate).join('');
        }
        // B. EXPOSICIONES
        const gridVideos = document.getElementById('gridExposiciones');
        if (gridVideos) {
            const items = SEARCH_DB.filter(i => i.type === 'Video');
            gridVideos.innerHTML = items.map(ContentRenderer.cardTemplate).join('');
        }
        // C. CARRUSEL REVERÓN (SOLUCIÓN DEL ERROR DEL MENÚ AQUÍ)
        const track = document.getElementById('trackObras');
        if (track) {
            // Filtramos solo obras, evitando el 'Perfil' que rompía el código
            const items = SEARCH_DB.filter(i => i.type === 'Obra' && i.autor && i.autor.includes('Reverón'));
            track.innerHTML = items.map(ContentRenderer.cardTemplate).join('');
        }
        // Asignar clicks
        document.querySelectorAll('.file-card').forEach(card => {
            card.addEventListener('click', () => ModalManager.open(card));
        });
    },
    cardTemplate: (item) => {
        let tech = "";
        if (item.desc && item.desc.includes("Técnica")) {
            const match = item.desc.match(/Técnica \/ Materia: (.*?)\./);
            if(match) tech = match[1];
        } else if (item.keywords) {
            tech = item.keywords.split(' ')[0];
            tech = tech.charAt(0).toUpperCase() + tech.slice(1);
        }
        
        const img = item.images && item.images[0] ? item.images[0] : '';
        const preview = item.type === 'Video' 
            ? `<div class="card-preview" style="background:#e8f0fe; display:flex; align-items:center; justify-content:center; font-size:3rem;">▶</div>`
            : `<div class="card-preview"><img src="${img}" loading="lazy" alt="${item.title}"></div>`;

        return `
            <article class="file-card" data-title="${item.title}" data-autor="${item.autor}" data-type="${item.type}">
                ${preview}
                <div class="card-footer">
                    <div class="card-title-text">${item.title}</div>
                    <div class="card-author-text">${item.autor}</div>
                    <div style="font-size:0.8rem; color:#888; margin-top:2px;">${tech}</div>
                </div>
            </article>`;
    }
};

/* ==========================================================================
   5. AUTOCOMPLETADO
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
            const imgUrl = item.images && item.images[0] ? item.images[0] : 'assets/img/Logo GAVAR.png';
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.style.cssText = "padding:10px; cursor:pointer; border-bottom:1px solid #eee; display:flex; align-items:center; gap:10px; color: #333; background:white;";
            div.innerHTML = `
                <img src="${imgUrl}" class="suggestion-thumb" alt="Miniatura">
                <div style="display:flex; flex-direction:column; text-align:left;">
                    <span style="font-weight:600; font-size:0.9rem;">${item.title}</span>
                    <span style="font-size:0.75rem; color:#666;">${item.autor || ''}</span>
                </div>`;
            div.onmouseover = () => div.style.background = "#f9f9f9";
            div.onmouseout = () => div.style.background = "#fff";
            div.addEventListener('click', () => this.goToResult(item));
            container.appendChild(div);
        });
    },
    goToResult(item) {
        if (item.type === 'Perfil') { window.location.href = item.url; return; }
        if (document.getElementById('modalVisualizador')) {
            this.clearSuggestions();
            cerrarBusquedaMovil();
            ModalManager.openFromData(item); // Pasamos el ITEM completo de la DB
        } else {
            window.location.href = `${item.url}?search=${encodeURIComponent(item.title)}`;
        }
    },
    clearSuggestions() { document.querySelectorAll('.suggestions-list').forEach(el => el.style.display = 'none'); }
};

/* ==========================================================================
   6. GESTIÓN DE MODALES (CORREGIDO: FLECHAS)
   ========================================================================== */
/* ==========================================================================
   6. GESTIÓN DE MODALES (CORREGIDO: SWIPE TÁCTIL ROBUSTO)
   ========================================================================== */
const ModalManager = {
    currentVideo: null,
    currentImages: [],
    currentIndex: 0,
    touchStartX: 0,
    touchEndX: 0,

    init() { this.bindEvents(); },
    
    bindEvents() {
        // Teclado
        document.addEventListener('keydown', (e) => { 
            const m = document.getElementById('modalVisualizador');
            if (m && m.style.display === 'flex') {
                if (e.key === 'Escape') this.close(); 
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'ArrowLeft') this.prevImage();
            }
        });
        // Clicks en botones estáticos
        document.body.addEventListener('click', (e) => {
            if (e.target.id === 'modalVisualizador' || e.target.id === 'btnModalClose') this.close();
            if (e.target.id === 'btnModalPrev') this.prevImage();
            if (e.target.id === 'btnModalNext') this.nextImage();
        });
    },

    open(element) {
        const dbEntry = SEARCH_DB.find(item => normalizeText(item.title) === normalizeText(element.dataset.title));
        if (dbEntry) this.openFromData(dbEntry);
    },

    openFromData(data) {
        const modal = document.getElementById('modalVisualizador');
        if (!modal) return;
        
        this.currentImages = data.images || [];
        if (typeof this.currentImages === 'string') this.currentImages = [this.currentImages];
        
        this.currentIndex = 0;
        this.populateText(data);
        this.updateGalleryUI(data.type);
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // --- LÓGICA DE SWIPE MEJORADA ---
        const mediaContainer = document.getElementById('mediaContainer');
        if(mediaContainer) {
            // Limpiar eventos anteriores
            mediaContainer.ontouchstart = null;
            mediaContainer.ontouchmove = null;
            mediaContainer.ontouchend = null;

            // 1. Tocar pantalla
            mediaContainer.ontouchstart = (e) => { 
                this.touchStartX = e.changedTouches[0].screenX;
                this.touchEndX = this.touchStartX; // Reiniciar final para evitar saltos
            };
            
            // 2. Mover dedo (IMPORTANTE: Actualizar posición constantemente)
            mediaContainer.ontouchmove = (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
            };

            // 3. Soltar dedo
            mediaContainer.ontouchend = (e) => { 
                this.handleSwipe(); 
            };
        }
    },

    handleSwipe() {
        const limit = 50; // Mínimo de píxeles para considerar swipe
        // Deslizar a la izquierda (Siguiente)
        if (this.touchStartX - this.touchEndX > limit) {
            this.nextImage();
        }
        // Deslizar a la derecha (Anterior)
        if (this.touchEndX - this.touchStartX > limit) {
            this.prevImage();
        }
    },

    populateText(data) {
        const container = document.getElementById('modalTextContent');
        if (container) {
            container.innerHTML = `
                <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 5px; color: #000; line-height:1.2;">${data.title}</h2>
                <h3 style="font-size: 1.1rem; font-weight: 400; margin-bottom: 20px; color: #666;">${data.autor || ''}</h3>
                <span class="modal-year" style="display:block; font-size: 1.5rem; font-weight: 700; color: #000; margin-bottom: 10px;">${data.year || ''}</span>
                <div class="modal-desc-block">${data.desc || ''}</div>
            `;
        }
    },

    updateGalleryUI(type) {
        const isVideo = type === 'Video';
        const els = {
            prev: document.getElementById('btnModalPrev'),
            next: document.getElementById('btnModalNext'),
            thumbs: document.getElementById('modalThumbnails'),
            dots: document.getElementById('mobileDots'),
            img: document.getElementById('mImg'),
            vid: document.getElementById('mVideo'),
            yt: document.getElementById('mYoutube')
        };

        // Limpieza inicial
        if(els.img) els.img.style.display = 'none';
        if(els.vid) els.vid.style.display = 'none';
        if(els.yt) els.yt.style.display = 'none';
        
        // Ocultar controles
        [els.prev, els.next, els.thumbs, els.dots].forEach(e => { if(e) e.style.setProperty('display', 'none', 'important'); });

        if (isVideo) {
            const src = this.currentImages[0] || ""; 
            if (src.includes('youtube') || src.includes('youtu.be')) {
                if(els.yt) {
                    let vidId = src.split('v=')[1] || src.split('/').pop();
                    if(vidId.includes('&')) vidId = vidId.split('&')[0];
                    els.yt.src = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
                    els.yt.style.display = 'block';
                }
            } else if (els.vid) {
                els.vid.src = src; els.vid.style.display = 'block';
            }
        } else {
            // IMAGEN
            if(els.img) {
                els.img.style.display = 'block';
                els.img.draggable = false; // <--- ESTO ES VITAL: Evita que se arrastre la imagen en vez de hacer swipe
            }
            
            // Mostrar controles solo si hay > 1
            if (this.currentImages.length > 1) {
                if(els.prev) { els.prev.style.removeProperty('display'); els.prev.style.display = 'flex'; }
                if(els.next) { els.next.style.removeProperty('display'); els.next.style.display = 'flex'; }
                if(els.thumbs) { els.thumbs.style.removeProperty('display'); els.thumbs.style.display = 'flex'; }
                if(els.dots) { els.dots.style.removeProperty('display'); els.dots.style.display = 'flex'; }
            }
            
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
            // Auto-scroll de miniaturas
            if (i === index && t.parentNode) {
                t.parentNode.scrollLeft = t.offsetLeft - (t.parentNode.clientWidth / 2) + (t.clientWidth / 2);
            }
        });
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
    },

    renderControls() {
        const thumbs = document.getElementById('modalThumbnails');
        const dots = document.getElementById('mobileDots');
        if(thumbs) thumbs.innerHTML = ''; 
        if(dots) dots.innerHTML = '';

        if (this.currentImages.length < 2) return;

        this.currentImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src; img.className = 'thumb-img';
            if (index === this.currentIndex) img.classList.add('active');
            img.onclick = (e) => { e.stopPropagation(); this.currentIndex = index; this.showImage(index, 'next'); };
            if(thumbs) thumbs.appendChild(img);

            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === this.currentIndex) dot.classList.add('active');
            dot.onclick = (e) => { e.stopPropagation(); this.currentIndex = index; this.showImage(index, 'next'); }; 
            if(dots) dots.appendChild(dot);
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
        const modal = document.getElementById('modalVisualizador');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        const vid = document.getElementById('mVideo'); if (vid) { vid.pause(); vid.currentTime = 0; }
        const yt = document.getElementById('mYoutube'); if (yt) yt.src = '';
    }
};

/* ==========================================================================
   7. NAVEGACIÓN Y FILTROS
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
        const cleanText = normalizeText(text);
        document.querySelectorAll('.file-card').forEach(card => {
            const title = normalizeText(card.dataset.title);
            const autor = normalizeText(card.dataset.autor);
            // Re-chequear DB para keywords porque no están en el DOM
            const item = SEARCH_DB.find(i => normalizeText(i.title) === title);
            const keys = item ? normalizeText(item.keywords) : "";
            
            const isVisible = title.includes(cleanText) || autor.includes(cleanText) || keys.includes(cleanText);
            card.style.display = isVisible ? 'flex' : 'none';
        });
    },
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) setTimeout(() => DOM.searchInput.focus(), 400);
    }
};

const MobileNav = {
    init() {},
    toggle() { if (DOM.navLinks) DOM.navLinks.classList.toggle('active'); }
};

/* --- FUNCIONES HELPER GLOBALES --- */
function cerrarBusquedaMovil() { 
    const overlay = document.getElementById('mobileSearchOverlay');
    if (overlay) overlay.style.display = 'none';
    const input = document.getElementById('mobileInput');
    if (input) input.value = ''; 
    AutocompleteManager.clearSuggestions(); 
}

/* ==========================================================================
   8. BOOTSTRAP FINAL (SOLO UNO, AL FINAL)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. INYECTAR
    ComponentInjector.run();
    
    // 2. RENDERIZAR
    ContentRenderer.render();

    // 3. CAPTURAR ELEMENTOS (Ahora que existen)
    DOM.modal = document.getElementById('modalVisualizador');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.searchBox = document.querySelector('.search-box');
    DOM.navLinks = document.getElementById('navLinks');
    DOM.mobileInput = document.getElementById('mobileInput');
    DOM.mobileSearchOverlay = document.getElementById('mobileSearchOverlay');

    // 4. INICIAR LÓGICAS
    ModalManager.init(); 
    SearchManager.init(); 
    AutocompleteManager.init();

    // Eventos Navbar
    document.getElementById('btnMenuToggle')?.addEventListener('click', MobileNav.toggle);
    document.getElementById('btnSearchToggle')?.addEventListener('click', SearchManager.toggleSearch);
    document.getElementById('btnMobileSearch')?.addEventListener('click', (e) => {
        e.preventDefault();
        const overlay = document.getElementById('mobileSearchOverlay');
        if(overlay) overlay.style.display = 'flex';
        setTimeout(() => document.getElementById('mobileInput')?.focus(), 100);
    });

    // Animación entrada
    const observer = new IntersectionObserver((entries) => { 
        entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('card-enter'); observer.unobserve(e.target); } }); 
    });
    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));
});