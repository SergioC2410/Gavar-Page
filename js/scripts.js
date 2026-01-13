/**
 * GAVAR - Galería de Arte Virtual
 * Script Principal
 * ------------------------------------------------------------------
 * Este archivo maneja toda la interactividad del sitio:
 * 1. Base de datos local (Búsqueda).
 * 2. Sistema de Ventanas Modales (Visualizador de obras).
 * 3. Autocompletado inteligente.
 * 4. Navegación móvil y menús.
 * 5. Optimizaciones (Lazy Load y Animaciones).
 */

/* ==========================================================================
   1. BASE DE DATOS LOCAL (SEARCH_DB)
   --------------------------------------------------------------------------
   Aquí simulamos una base de datos. Si Ignacio quiere agregar una obra 
   nueva al buscador, solo debe agregar una línea aquí.
   ========================================================================== */
const SEARCH_DB = [
    // --- SECCIÓN: GALERÍA ---
    { title: "La Noche Estrellada", url: "galeria.html", type: "Obra", keywords: "van gogh pintura impresionismo azul noche" },
    { title: "Obra Pendiente 1", url: "galeria.html", type: "Obra", keywords: "futura archivo vacio" },
    { title: "Obra Pendiente 2", url: "galeria.html", type: "Obra", keywords: "futura archivo vacio" },
    
    // --- SECCIÓN: EXPOSICIONES ---
    { title: "Recorrido Virtual 2024", url: "exposiciones.html", type: "Video", keywords: "tour exposicion coleccion virtual introduccion" },
    { title: "Entrevista a Artista Invitado", url: "exposiciones.html", type: "Video", keywords: "puntillismo charla entrevista" },
    { title: "Documental: Armando Reverón", url: "exposiciones.html", type: "Video", keywords: "biografia historia vida cine" },
    { title: "Video Exposición 4", url: "exposiciones.html", type: "Video", keywords: "pendiente" },

    // --- SECCIÓN: ARTISTA DEL MES (CAÑO AMARILLO) ---
    { 
        title: "Armando Reverón (Perfil)", 
        url: "mencion-especial.html", 
        type: "Perfil", 
        keywords: "caño amarillo maestro luz castillete macuto muñecas blanco azul sepia venezuela pintor" 
    },
    { title: "La Cueva", url: "mencion-especial.html", type: "Obra", keywords: "reveron azul oscuro misterio mujer desnudo" },
    { title: "Paisaje Blanco", url: "mencion-especial.html", type: "Obra", keywords: "reveron luz caribe playa mar" },
    { title: "Fiesta en Caraballeda", url: "mencion-especial.html", type: "Obra", keywords: "reveron baile cultura folklore" },
    { title: "Autorretrato con Muñecas", url: "mencion-especial.html", type: "Obra", keywords: "reveron locura arte psicologico" },
    { title: "El Playón", url: "mencion-especial.html", type: "Obra", keywords: "reveron paisaje mar" }
];

/* ==========================================================================
   2. CACHÉ DEL DOM & CONFIGURACIÓN
   --------------------------------------------------------------------------
   Guardamos las referencias a los elementos HTML para no buscarlos 
   repetidamente (mejora el rendimiento).
   ========================================================================== */
const DOM = {
    // Modal Visualizador
    modal: document.getElementById('modalVisualizador'),
    modalImg: document.getElementById('mImg'),
    modalVideo: document.getElementById('mVideo'),
    modalTitle: document.getElementById('mTitle'),
    modalAutor: document.getElementById('mAutor'),
    modalDesc: document.getElementById('mDesc'),
    modalYear: document.getElementById('mYear'),
    
    // Búsqueda Escritorio
    searchInput: document.getElementById('searchInput'),
    searchBox: document.querySelector('.search-box'),
    
    // Navegación
    navLinks: document.getElementById('navLinks'),
    
    // Búsqueda Móvil
    mobileSearchOverlay: document.getElementById('mobileSearchOverlay'),
    mobileInput: document.getElementById('mobileInput')
};

/* ==========================================================================
   3. MÓDULO: AUTOCOMPLETADO (AutocompleteManager)
   --------------------------------------------------------------------------
   Maneja las sugerencias que aparecen mientras escribes.
   ========================================================================== */
const AutocompleteManager = {
    init() {
        // Crea las cajitas de sugerencias (ocultas por defecto) en el HTML
        this.createSuggestionsBox('desktop-suggestions', DOM.searchBox);
        this.createSuggestionsBox('mobile-suggestions', document.querySelector('.search-modal-content'));
        this.bindEvents();
    },

    // Crea el div HTML donde irán las sugerencias
    createSuggestionsBox(id, parent) {
        if (!parent) return;
        // Evitamos duplicados
        if (document.getElementById(id)) return;
        
        const box = document.createElement('div');
        box.id = id;
        box.className = 'suggestions-list';
        parent.appendChild(box);
    },

    bindEvents() {
        // Escuchar teclado en Escritorio
        DOM.searchInput?.addEventListener('input', (e) => {
            const text = e.target.value;
            this.handleInput(text, 'desktop-suggestions');
            
            // Si estamos en galería, filtramos las tarjetas en tiempo real
            if (this.isGalleryPage()) {
                SearchManager.filterCardsOnPage(text);
            }
        });

        // Escuchar teclado en Móvil
        DOM.mobileInput?.addEventListener('input', (e) => {
            this.handleInput(e.target.value, 'mobile-suggestions');
        });

        // Cerrar sugerencias si hacen clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && !e.target.closest('.search-modal-content')) {
                this.clearSuggestions();
            }
        });
    },

    // Lógica principal: Busca coincidencias y muestra resultados
    handleInput(text, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // No buscar si hay menos de 2 letras
        if (text.length < 2) {
            container.style.display = 'none';
            return;
        }

        const matches = this.searchInDB(text);
        this.renderSuggestions(matches, container);
    },

    // Filtra el array SEARCH_DB
    searchInDB(query) {
        const lowerQuery = query.toLowerCase();
        return SEARCH_DB.filter(item => {
            return item.title.toLowerCase().includes(lowerQuery) || 
                   item.keywords.toLowerCase().includes(lowerQuery) ||
                   item.type.toLowerCase().includes(lowerQuery);
        }).slice(0, 5); // Limitamos a 5 resultados para no llenar la pantalla
    },

    // Dibuja las sugerencias en pantalla
    renderSuggestions(results, container) {
        if (results.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = ''; // Limpiar anteriores
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
            // Al hacer clic, ir al resultado
            div.addEventListener('click', () => {
                this.goToResult(item);
            });
            container.appendChild(div);
        });
    },

    getIcon(type) {
        if (type === 'Video') return '🎬';
        if (type === 'Perfil') return '🎨';
        return '🖼️';
    },

    goToResult(item) {
        // Si es un perfil, vamos directo
        if (item.type === 'Perfil') {
            window.location.href = item.url;
        } else {
            // Si es obra/video, vamos a la URL y pasamos el nombre para filtrar
            window.location.href = `${item.url}?search=${encodeURIComponent(item.title)}`;
        }
    },

    clearSuggestions() {
        document.querySelectorAll('.suggestions-list').forEach(el => el.style.display = 'none');
    },

    isGalleryPage() {
        return window.location.pathname.includes('galeria.html') || 
               window.location.pathname.includes('exposiciones.html') ||
               window.location.pathname.includes('mencion-especial.html');
    }
};

/* ==========================================================================
   4. MÓDULO: GESTIÓN DE MODALES (ModalManager)
   --------------------------------------------------------------------------
   Abre la ventana emergente con la imagen o video en grande.
   ========================================================================== */
const ModalManager = {
    currentVideo: null,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
        // Cerrar haciendo clic en el fondo oscuro
        DOM.modal?.addEventListener('click', (e) => {
            if (e.target === DOM.modal) this.close();
        });
    },

    // Función principal para abrir
    open(element) {
        const data = this.extractData(element);
        this.populateModal(data);
        this.showContent(data.type, data.src);
        DOM.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    },

    // Extrae los datos (data-title, data-src, etc.) del HTML
    extractData(element) {
        return {
            type: element.dataset.type,
            src: element.dataset.src,
            title: element.dataset.title,
            autor: element.dataset.autor,
            desc: element.dataset.desc,
            year: element.dataset.year
        };
    },

    // Rellena los textos del modal
    populateModal(data) {
        if (!DOM.modalTitle) return;
        DOM.modalTitle.textContent = data.title || 'Sin título';
        DOM.modalAutor.textContent = data.autor ? `Por: ${data.autor}` : '';
        DOM.modalDesc.textContent = data.desc || '';
        DOM.modalYear.textContent = data.year || '';
    },

    // Muestra Video o Imagen según corresponda
    showContent(type, src) {
        const isVideo = type === 'video';
        
        if (DOM.modalImg) DOM.modalImg.style.display = isVideo ? 'none' : 'block';
        if (DOM.modalVideo) DOM.modalVideo.style.display = isVideo ? 'block' : 'none';
        
        if (isVideo && DOM.modalVideo) {
            DOM.modalVideo.src = src;
            DOM.modalVideo.play().catch(e => console.warn('Autoplay bloqueado por navegador'));
            this.currentVideo = DOM.modalVideo;
        } else if (DOM.modalImg) {
            DOM.modalImg.src = src;
            this.pauseCurrentVideo(); // Detener video si había uno sonando
        }
    },

    close() {
        if (!DOM.modal) return;
        DOM.modal.style.display = 'none';
        document.body.style.overflow = ''; // Reactivar scroll
        this.pauseCurrentVideo();
        if (DOM.modalVideo) DOM.modalVideo.src = ''; // Limpiar fuente
    },

    pauseCurrentVideo() {
        if (this.currentVideo) {
            this.currentVideo.pause();
            this.currentVideo.currentTime = 0;
        }
    }
};

/* ==========================================================================
   5. MÓDULO: BÚSQUEDA GENERAL (SearchManager)
   --------------------------------------------------------------------------
   Maneja la lógica de filtrar tarjetas y leer parámetros URL.
   ========================================================================== */
const SearchManager = {
    init() {
        // Verificar si venimos de otra página buscando algo
        this.checkURLParams();
    },

    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        
        if (searchTerm && DOM.searchInput) {
            // Rellenar el input y filtrar automáticamente
            DOM.searchInput.value = searchTerm;
            DOM.searchBox?.classList.add('active');
            
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
                this.filterCardsOnPage(searchTerm);
            }, 100);
        }
    },

    // Oculta/Muestra tarjetas según el texto
    filterCardsOnPage(text) {
        const searchText = text.toLowerCase();
        const cards = document.querySelectorAll('.file-card');

        cards.forEach(card => {
            const title = card.dataset.title?.toLowerCase() || '';
            const autor = card.dataset.autor?.toLowerCase() || '';
            
            // Coincide si el texto está en el título O en el autor
            const isVisible = title.includes(searchText) || autor.includes(searchText);
            
            card.style.display = isVisible ? 'flex' : 'none';
            
            // Reiniciar animación si se muestra
            if (isVisible) {
                card.classList.remove('card-enter');
                void card.offsetWidth; // Trigger reflow (reinicio de animación CSS)
                card.classList.add('card-enter');
            }
        });
    },

    // Expande/Contrae la lupa en PC
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) {
            setTimeout(() => DOM.searchInput.focus(), 400);
        }
    }
};

/* ==========================================================================
   6. MÓDULO: NAVEGACIÓN MÓVIL (MobileNav)
   --------------------------------------------------------------------------
   Maneja el menú hamburguesa.
   ========================================================================== */
const MobileNav = {
    init() {
        // Cerrar menú al hacer clic en un enlace normal
        document.querySelectorAll('#navLinks a').forEach(link => {
            // Ignoramos el botón de búsqueda para que no parpadee
            if (!link.getAttribute('onclick')) {
                link.addEventListener('click', () => this.toggle());
            }
        });
    },
    toggle() {
        DOM.navLinks?.classList.toggle('active');
    }
};

/* ==========================================================================
   7. FUNCIONES GLOBALES (ACCESIBLES DESDE HTML)
   --------------------------------------------------------------------------
   Estas funciones se llaman desde los 'onclick="..."' en el HTML.
   Las mantenemos simples y delegamos la lógica a los módulos.
   ========================================================================== */

// -- Modales --
function abrirModal(el) { ModalManager.open(el); }
function cerrarModalBtn() { ModalManager.close(); }
function cerrarModal(e) { 
    if (e.target.id === 'modalVisualizador') ModalManager.close(); 
}

// -- Navegación y Búsqueda --
function toggleMenu() { MobileNav.toggle(); }
function toggleSearch() { SearchManager.toggleSearch(); }
function filtrarObras() { 
    // Esta función existe por compatibilidad, pero la lógica real 
    // la maneja AutocompleteManager en el evento 'input'.
}

// -- Lógica específica de la Búsqueda Móvil --
function abrirBusquedaMovil() {
    MobileNav.toggle(); // Cerrar menú primero
    if (DOM.mobileSearchOverlay) {
        DOM.mobileSearchOverlay.style.display = 'flex';
        setTimeout(() => DOM.mobileInput?.focus(), 100);
    }
}

function cerrarBusquedaMovil() {
    if (DOM.mobileSearchOverlay) {
        DOM.mobileSearchOverlay.style.display = 'none';
        if (DOM.mobileInput) DOM.mobileInput.value = ''; // Limpiar
        AutocompleteManager.clearSuggestions();
    }
}

function ejecutarBusquedaMovil() {
    const busqueda = DOM.mobileInput?.value;
    if (busqueda) {
        // 1. Intentar encontrar coincidencia exacta en la "Base de Datos"
        const match = SEARCH_DB.find(i => i.title.toLowerCase() === busqueda.toLowerCase());
        
        if (match) {
            // Si existe exacto, ir directo (ej. si eligió de sugerencia)
            AutocompleteManager.goToResult(match);
        } else {
            // 2. Si es texto libre, buscar en Galería
            window.location.href = `galeria.html?search=${encodeURIComponent(busqueda)}`;
        }
    }
}

// Permitir presionar "Enter" en el input móvil
DOM.mobileInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') ejecutarBusquedaMovil();
});

/* ==========================================================================
   8. INICIALIZACIÓN (MAIN)
   --------------------------------------------------------------------------
   Cuando la página termina de cargar, arrancamos todos los sistemas.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
    SearchManager.init();
    MobileNav.init();
    AutocompleteManager.init();
    
    // --- EFECTOS VISUALES ADICIONALES ---

    // 1. Animación de entrada en cascada para las tarjetas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-enter');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.file-card').forEach(c => observer.observe(c));
    
    // 2. Lazy Load (Carga diferida de imágenes) para velocidad
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }
});