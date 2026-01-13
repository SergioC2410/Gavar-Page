/* ===== CONSTANTES Y CONFIGURACIÓN ===== */
const CONFIG = {
    animation: {
        cardDelay: 100,
        maxDelay: 2000
    }
};

/* ===== CACHE DE ELEMENTOS DEL DOM ===== */
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
    navLinks: document.getElementById('navLinks')
};

/* ===== MÓDULO DE MODAL ===== */
const ModalManager = {
    currentVideo: null,
    
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.modal.style.display === 'flex') {
                this.close();
            }
        });
        
        // Cerrar modal al hacer clic fuera
        DOM.modal?.addEventListener('click', (e) => {
            if (e.target === DOM.modal) {
                this.close();
            }
        });
    },
    
    open(element) {
        const data = this.extractData(element);
        this.populateModal(data);
        this.showContent(data.type, data.src);
        this.showModal();
    },
    
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
    
    populateModal(data) {
        DOM.modalTitle.textContent = data.title;
        DOM.modalAutor.textContent = `Por: ${data.autor}`;
        DOM.modalDesc.textContent = data.desc;
        DOM.modalYear.textContent = data.year;
    },
    
    showContent(type, src) {
        const isVideo = type === 'video';
        
        // Mostrar/ocultar elementos
        DOM.modalImg.style.display = isVideo ? 'none' : 'block';
        DOM.modalVideo.style.display = isVideo ? 'block' : 'none';
        
        if (isVideo) {
            DOM.modalVideo.src = src;
            DOM.modalVideo.play().catch(e => console.log('Auto-play bloqueado:', e));
            this.currentVideo = DOM.modalVideo;
        } else {
            DOM.modalImg.src = src;
            this.pauseCurrentVideo();
        }
    },
    
    showModal() {
        DOM.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previene scroll en fondo
    },
    
    close() {
        DOM.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.pauseCurrentVideo();
        this.resetVideoSource();
    },
    
    pauseCurrentVideo() {
        if (this.currentVideo) {
            this.currentVideo.pause();
            this.currentVideo.currentTime = 0;
        }
    },
    
    resetVideoSource() {
        if (DOM.modalVideo) {
            DOM.modalVideo.src = '';
        }
    }
};

/* ===== MÓDULO DE BÚSQUEDA ===== */
const SearchManager = {
    debounceTimer: null,
    
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        DOM.searchInput?.addEventListener('input', (e) => {
            this.debouncedFilter(e.target.value);
        });
    },
    
    debouncedFilter(text) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.filterWorks(text.toLowerCase());
        }, 300);
    },
    
    filterWorks(searchText) {
        document.querySelectorAll('.file-card').forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const autor = card.dataset.autor.toLowerCase();
            const isVisible = title.includes(searchText) || autor.includes(searchText);
            
            card.style.display = isVisible ? 'block' : 'none';
            card.style.animation = isVisible ? 'fadeIn 0.3s' : 'none';
        });
    },
    
    toggleSearch() {
        DOM.searchBox?.classList.toggle('active');
        if (DOM.searchBox?.classList.contains('active')) {
            DOM.searchInput.focus();
        }
    }
};

/* ===== MÓDULO DE ANIMACIONES ===== */
const AnimationManager = {
    init() {
        this.animateCardsOnLoad();
    },
    
    animateCardsOnLoad() {
        // Usar Intersection Observer para animación más eficiente
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = Math.min(index * 0.1, 2.0);
                    entry.target.style.animationDelay = `${delay}s`;
                    entry.target.classList.add('card-enter');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.file-card').forEach(card => {
            observer.observe(card);
        });
    }
};

/* ===== MÓDULO DE NAVEGACIÓN MÓVIL ===== */
const MobileNav = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                this.toggle();
            });
        });
        
        // Cerrar menú al redimensionar (si se cambia a escritorio)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && DOM.navLinks.classList.contains('active')) {
                this.toggle();
            }
        });
    },
    
    toggle() {
        DOM.navLinks?.classList.toggle('active');
        document.body.style.overflow = DOM.navLinks.classList.contains('active') 
            ? 'hidden' 
            : '';
    }
};

/* ===== FUNCIONES GLOBALES (backward compatibility) ===== */
function abrirModal(elemento) {
    ModalManager.open(elemento);
}

function cerrarModalBtn() {
    ModalManager.close();
}

function cerrarModal(event) {
    if (event.target.id === 'modalVisualizador') {
        ModalManager.close();
    }
}

function filtrarObras() {
    SearchManager.filterWorks(DOM.searchInput.value.toLowerCase());
}

function toggleSearch() {
    SearchManager.toggleSearch();
}

function toggleMenu() {
    MobileNav.toggle();
}

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar módulos
    ModalManager.init();
    SearchManager.init();
    AnimationManager.init();
    MobileNav.init();
    
    // Cargar imágenes de forma diferida
    this.lazyLoadImages();
});

/* ===== CARGA DIFERIDA DE IMÁGENES ===== */
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.file-card img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ===== FUNCIONES UTILITARIAS ===== */
// Helper para formatear texto (opcional)
function formatText(text, maxLength = 100) {
    if (!text) return '';
    return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
}