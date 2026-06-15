/**
 * @fileoverview GAVAR Core Engine 2026
 * @description Sistema modular orientado a objetos con View Transitions, tipado estricto implícito y Delegación de Eventos.
 */

const TextEngine = {
    /**
     * Normaliza cadenas de texto eliminando diacríticos y homogeneizando a minúsculas.
     * @param {string} text - Cadena de entrada.
     * @returns {string} Cadena normalizada.
     */
    normalize: (text) => text ? text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ""
};

/**
 * Base de Datos Maestra Refactorizada a Objetos JSON Tipados
 * @constant {Array<Object>}
 */
const ART_DATABASE = [
// --- OBRAS GRÁFICAS Y MIXTAS ---
    { 
        id: "art-001", title: "Sin título", url: "galeria.html", type: "Obra",
        keywords: ["maria ferreira", "mixta", "tiza", "escarcha", "pintura"],
        images: ["assets/img/maria.webp", "assets/img/maria_1.webp", "assets/img/maria_2.webp", "assets/img/maria_3.webp", "assets/img/maria_4.webp", "assets/img/maria_5.webp"], 
        autor: "María Ferreira", year: 2024, technique: "Mixta (Tiza, escarcha y pintura)", quantity: 3, instagram: null, desc: ""
    },
    { 
        id: "art-002", title: "Sin título 2", url: "galeria.html", type: "Obra",
        keywords: ["camila martinez"], 
        images: ["assets/img/camila.webp", "assets/img/camila_1.webp"], 
        autor: "Camila Martínez", year: 2025, technique: "Mixta (Tiza, escarcha y pintura)", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-003", title: "Resiliencia", url: "galeria.html", type: "Obra",
        keywords: ["serigrafia", "grabado", "tinta", "papel", "arte grafico", "alix velasquez"],
        images: ["assets/img/resiliencia.webp", "assets/img/resiliencia_detalle1.webp"], 
        autor: "Alix Velásquez", year: 2025, technique: "Serigrafía", quantity: 1, instagram: "@alix_v_art", desc: ""
    },
    { 
        id: "art-004", title: "Real", url: "galeria.html", type: "Obra",
        keywords: ["xilografia", "madera", "grabado", "relieve", "impresion", "arantza martinez"],
        images: ["assets/img/real.webp", "assets/img/real_detalle1.webp"], 
        autor: "Arantza Martínez", year: 2025, technique: "Xilografía", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-005", title: "Solaria", url: "galeria.html", type: "Obra",
        keywords: ["digital", "ilustracion", "diseño", "tablet", "computadora", "andrea blanco"],
        images: ["assets/img/solaria.webp"], 
        autor: "Andrea Blanco", year: 2024, technique: "Digital", quantity: 1, instagram: "@anbndy22", desc: ""
    },
    { 
        id: "art-006", title: "The News", url: "galeria.html", type: "Obra",
        keywords: ["superposicion", "digital", "capas", "collage", "fotomontaje", "isabel figueroa"],
        images: ["assets/img/the_news.webp"], 
        autor: "Isabel Figueroa", year: 2022, technique: "Superposición digital", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-007", title: "Antimateria", url: "galeria.html", type: "Obra",
        keywords: ["ensamblaje", "hilograma", "hilos", "clavos", "madera", "escultura", "mixta", "koda", "efrain aguilera"],
        images: ["assets/img/antimateria.webp", "assets/img/antimateria_detalle1.webp", "assets/img/antimateria_detalle2.webp"], 
        autor: "Efraín Aguilera (Koda)", year: 2024, technique: "Ensamblaje e hilograma", quantity: 1, instagram: "@6kodafree6", desc: ""
    },

    // --- LIBROS OBJETO (POP-UP) ---
    { 
        id: "art-008", title: "El Tapiz del Alma", url: "galeria.html", type: "Obra",
        keywords: ["pop-up", "popup", "libro objeto", "3d", "papel", "escultura", "cristian rojas"],
        images: ["assets/img/el_tapiz_del_alma.webp", "assets/img/el_tapiz_del_alma1.webp", "assets/img/el_tapiz_del_alma2.webp", "assets/img/el_tapiz_del_alma3.webp", "assets/img/el_tapiz_del_alma4.webp", "assets/img/el_tapiz_del_alma5.webp", "assets/img/el_tapiz_del_alma6.webp", "assets/img/el_tapiz_del_alma7.webp", "assets/img/el_tapiz_del_alma8.webp"], 
        autor: "Cristian Rojas", year: 2025, technique: "Pop-up (Libro objeto)", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-009", title: "Bodhiria", url: "galeria.html", type: "Obra",
        keywords: ["pop-up", "popup", "libro objeto", "plegable", "papel", "mariend romero"],
        images: ["assets/img/bodhiria.webp", "assets/img/bodhiria_1.webp", "assets/img/bodhiria_2.webp", "assets/img/bodhiria_3.webp", "assets/img/bodhiria_4.webp", "assets/img/bodhiria_5.webp", "assets/img/bodhiria_6.webp"], 
        autor: "Mariend Romero", year: 2025, technique: "Pop-up (Libro objeto)", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-010", title: "Fábrica de la Memoria", url: "galeria.html", type: "Obra",
        keywords: ["pop-up", "popup", "libro objeto", "memoria", "papel", "arquitectura", "ricardo suarez"],
        images: ["assets/img/fabrica_de_la_memoria.webp", "assets/img/fabrica_de_la_memoria_1.webp", "assets/img/fabrica_de_la_memoria_2.webp", "assets/img/fabrica_de_la_memoria3.webp", "assets/img/fabrica_de_la_memoria4.webp", "assets/img/fabrica_de_la_memoria5.webp", "assets/img/fabrica_de_la_memoria6.webp", "assets/img/fabrica_de_la_memoria7.webp", "assets/img/fabrica_de_la_memoria8.webp"], 
        autor: "Ricardo Suarez", year: 2024, technique: "Pop-up (Libro objeto)", quantity: 1, instagram: "@richyross_art", desc: ""
    },
    { 
        id: "art-011", title: "Serie Orquídea", url: "galeria.html", type: "Obra",
        keywords: ["karen gonzalez", "serie orquidea", "grafito", "dibujo", "botanica"],
        images: ["assets/img/serie_orquidea_1.webp", "assets/img/serie_orquidea_2.webp", "assets/img/serie_orquidea_3.webp"], 
        autor: "Karen González", year: 2024, technique: "Grafito", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-012", title: "Calma", url: "galeria.html", type: "Obra",
        keywords: ["lennis lopez", "calma", "estampa", "agua fuerte", "grabado"],
        images: ["assets/img/calma_1.webp", "assets/img/calma_2.webp"], 
        autor: "Lennis López", year: 2025, technique: "Estampa de agua fuerte", quantity: 1, instagram: null, desc: ""
    },
    { 
        id: "art-013", title: "Momo New Year 2025", url: "galeria.html", type: "Obra",
        keywords: ["jhonattan rovaina", "momo new year 2025", "digital", "ilustracion", "saradragonil1"],
        images: ["assets/img/momo_new_year.webp"], 
        autor: "Jhonattan Rovaina", year: 2025, technique: "Digital", quantity: 1, instagram: "@saradragonil1", desc: ""
    },

    // --- EXPOSICIONES Y REVERÓN ---
    { 
        id: "vid-001", title: "Recorrido Virtual 2024", url: "exposiciones.html", type: "Video",
        keywords: ["tour virtual", "video", "recorrido"], 
        images: [""], // Nota: Si tienes link de youtube, colócalo aquí, ej: "https://www.youtube.com/embed/..."
        autor: "Curaduría GAVAR", year: 2024, technique: "Multimedia", quantity: 1, instagram: null, desc: "Video introductorio al espacio virtual." 
    },
    { 
        id: "rev-001", title: "Armando Reverón (Perfil)", url: "mencion-especial.html", type: "Perfil", 
        keywords: ["reveron", "armando", "maestro", "luz", "castillete"],
        images: [], autor: "", year: null, technique: "", quantity: 0, instagram: null, desc: ""
    },
    { 
        id: "rev-002", title: "La Cueva", url: "mencion-especial.html", type: "Obra",
        keywords: ["reveron", "azul", "pintura clasica"], 
        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/La_Cueva_-_Armando_Rever%C3%B3n.jpg/1200px-La_Cueva_-_Armando_Rever%C3%B3n.jpg"], 
        autor: "Armando Reverón", year: 1920, technique: "Óleo", quantity: 1, instagram: null, desc: "Obra maestra de su Período Azul." 
    },
    { 
        id: "art-014", title: "Reino Fungi", url: "galeria.html", type: "Obra",
        keywords: ["isadora parada", "reino fungi", "mixta", "folielolie", "2023", "hongos"], 
        images: ["assets/img/reino_fungi_1.avif", "assets/img/reino_fungi_2.avif", "assets/img/reino_fungi_3.avif", "assets/img/reino_fungi_4.avif", "assets/img/reino_fungi_5.avif", "assets/img/reino_fungi_6.avif"], 
        autor: "Isadora Parada", year: 2023, technique: "Mixta", quantity: 3, instagram: "@folielolie", desc: "" 
    },
    { 
        id: "art-015", title: "Cotidianidad", url: "galeria.html", type: "Obra",
        keywords: ["nelyireh mejias", "cotidianidad", "acrilico sobre lienzo", "artes graficas", "nelyire"], 
        images: ["assets/img/cotidianidad_1.avif", "assets/img/cotidianidad_2.avif"], 
        autor: "Nelyireh Mejias", year: "N/D", technique: "Acrílico sobre lienzo", quantity: 1, instagram: "@nelyire", desc: "Mención: Artes gráficas." 
    },
    { 
        id: "art-016", title: "Hombre en penumbras", url: "galeria.html", type: "Obra",
        keywords: ["orissa liendo", "lyu venus", "hombre en penumbras", "mixta", "el_lienzo.devenus", "2023"], 
        images: ["assets/img/hombre_en_penumbras_1.avif", "assets/img/hombre_en_penumbras_2.avif"], 
        autor: "Orissa Liendo (Lyu Venus)", year: 2023, technique: "Mixta", quantity: 1, instagram: "@el_lienzo.devenus", desc: "" 
    }
];
class ComponentInjector {
    /**
     * Inyecta el modal semántico de forma segura en el DOM
     */
    static run() {
        if (document.getElementById('modalVisualizador')) return;
        const modalHTML = `
            <dialog id="modalVisualizador" class="modal-overlay" aria-labelledby="mTitle">
                <div class="modal-window">
                    <div class="modal-media">
                        <button id="btnModalPrev" class="nav-arrow modal-arrow left" aria-label="Anterior">&#10094;</button>
                        <div class="media-container" id="mediaContainer">
                            <img id="mImg" src="" alt="Visualización de obra">
                            <iframe id="mYoutube" src="" style="display:none; width:100%; height:100%; border:none;" title="Video de la exposición"></iframe>
                        </div>
                        <button id="btnModalNext" class="nav-arrow modal-arrow right" aria-label="Siguiente">&#10095;</button>
                        <div id="modalThumbnails" class="thumbnails-strip"></div>
                        <div id="mobileDots" class="mobile-dots"></div>
                    </div>
                    <div class="modal-details">
                        <button id="btnModalClose" class="close-modal" aria-label="Cerrar modal">×</button>
                        <div id="modalTextContent"></div>
                    </div>
                </div>
            </dialog>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

class ViewTransitionEngine {
    /**
     * Coordina la transición de la API GPU nativa
     * @param {HTMLElement} cardElement 
     * @param {Object} dataItem 
     */
    static async trigger(cardElement, dataItem) {
        const targetImg = cardElement.querySelector('img');
        if (targetImg) targetImg.style.viewTransitionName = 'active-artwork';

        if (!document.startViewTransition) {
            ModalManager.open(dataItem);
            if (targetImg) targetImg.style.viewTransitionName = '';
            return;
        }

        const transition = document.startViewTransition(() => {
            ModalManager.open(dataItem);
            const dialogImg = document.getElementById('mImg');
            if (dialogImg) dialogImg.style.viewTransitionName = 'active-artwork';
        });

        await transition.finished;
        if (targetImg) targetImg.style.viewTransitionName = '';
        const dialogImg = document.getElementById('mImg');
        if (dialogImg) dialogImg.style.viewTransitionName = '';
    }
}

class ModalManager {
    static state = { currentItem: null, index: 0, touchX: 0 };

    static init() {
        const dialog = document.getElementById('modalVisualizador');
        if (!dialog) return;

        // Delegación de eventos maestra para el Modal
        dialog.addEventListener('click', (e) => {
            // Cierre del modal (Clic fuera o en la X)
            if (e.target.id === 'modalVisualizador' || e.target.closest('#btnModalClose')) {
                dialog.close();
            }
            // Controles de navegación
            if (e.target.closest('#btnModalPrev')) this.navigate(-1);
            if (e.target.closest('#btnModalNext')) this.navigate(1);
        });

        // Limpieza de memoria (Gobernanza de recursos)
        dialog.addEventListener('close', () => {
            document.body.style.overflow = '';
            const ytEl = document.getElementById('mYoutube');
            if (ytEl) ytEl.src = '';
        });

        document.addEventListener('keydown', (e) => {
            if (!dialog.open) return;
            if (e.key === 'ArrowRight') this.navigate(1);
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'Escape') dialog.close();
        });

        const mediaContainer = document.getElementById('mediaContainer');
        if (mediaContainer) {
            mediaContainer.addEventListener('touchstart', e => {
                this.state.touchX = e.changedTouches[0].screenX;
            }, { passive: true });

            mediaContainer.addEventListener('touchend', e => {
                const delta = this.state.touchX - e.changedTouches[0].screenX;
                if (Math.abs(delta) > 60) this.navigate(Math.sign(delta));
            }, { passive: true });
        }
    }

    static open(item) {
        this.state.currentItem = item;
        this.state.index = 0;
        
        const dialog = document.getElementById('modalVisualizador');
        const txtContainer = document.getElementById('modalTextContent');
        const imgEl = document.getElementById('mImg');
        const ytEl = document.getElementById('mYoutube');
        const btnPrev = document.getElementById('btnModalPrev');
        const btnNext = document.getElementById('btnModalNext');

        txtContainer.innerHTML = `
            <h2 id="mTitle" style="font-size:2rem; font-weight:700; margin-bottom:5px; color:var(--text-main);">${item.title}</h2>
            <h3 style="font-size:1.1rem; font-weight:400; margin-bottom:20px; color:var(--text-light);">${item.autor || ''}</h3>
            <span class="modal-year" style="display:block; font-size:1.5rem; font-weight:700; color:var(--text-main); margin-bottom:10px;">${item.year || ''}</span>
            <div class="modal-desc-block">
                <strong>Técnica:</strong> ${item.technique || 'No especificada'}<br>
                <strong>Cantidad de piezas:</strong> ${item.quantity || 1}<br>
                ${item.instagram ? `<strong>Instagram:</strong> ${item.instagram}<br>` : ''}
                ${item.desc ? `<p style="margin-top:15px;">${item.desc}</p>` : ''}
            </div>`;

        if (item.type === "Video") {
            imgEl.style.display = 'none';
            ytEl.style.display = 'block';
            ytEl.src = item.images[0];
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        } else {
            ytEl.style.display = 'none';
            imgEl.style.display = 'block';
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
            this.updateImage();
        }

        dialog.showModal();
        document.body.style.overflow = 'hidden';
    }

    static updateImage() {
        const images = this.state.currentItem.images || [];
        if (!images.length) return;
        document.getElementById('mImg').src = images[this.state.index];
        this.renderThumbs();
    }

    static navigate(dir) {
        const images = this.state.currentItem.images || [];
        if (images.length < 2) return;
        this.state.index = (this.state.index + dir + images.length) % images.length;
        this.updateImage();
    }

    static renderThumbs() {
        const strip = document.getElementById('modalThumbnails');
        const dots = document.getElementById('mobileDots');
        strip.innerHTML = ''; dots.innerHTML = '';
        const images = this.state.currentItem.images || [];

        if (images.length < 2) return;

        images.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = `thumb-img ${idx === this.state.index ? 'active' : ''}`;
            img.addEventListener('click', () => { this.state.index = idx; this.updateImage(); });
            strip.appendChild(img);

            const dot = document.createElement('div');
            dot.className = `dot ${idx === this.state.index ? 'active' : ''}`;
            dots.appendChild(dot);
        });
    }
}

class ContentRenderer {
    static init(containerId, filterType = 'Obra') {
        const grid = document.getElementById(containerId);
        if (!grid) return;

        this.renderSkeleton(grid);

        // Delegación de eventos para la grilla (Solo se asigna una vez, independientemente del renderizado)
        if (!grid.dataset.bound) {
            grid.addEventListener('click', this.handleGridInteraction.bind(this));
            grid.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleGridInteraction(e);
                }
            });
            grid.dataset.bound = "true";
        }

        const sortSelect = document.getElementById('sortSelect');
        const criteria = sortSelect ? sortSelect.value : 'title-asc';

        let items = ART_DATABASE.filter(i => {
            if (filterType === 'Obra') return i.type === 'Obra' && i.autor && !i.autor.includes('Reverón');
            if (filterType === 'Video') return i.type === 'Video';
            if (filterType === 'Reveron') return i.type === 'Obra' && i.autor && i.autor.includes('Reverón');
            return false;
        });

        items = this.sortItems(items, criteria);

        // Se usa tabindex="0" y role="button" para WCAG 3.0
        grid.innerHTML = items.map((item, index) => `
            <article class="file-card fade-scale-in" tabindex="0" role="button" aria-label="Ver detalles de ${item.title}" style="animation-delay: ${index * 0.03}s" data-id="${item.id}">
                <div class="card-preview">
                    ${item.type === 'Video' ? '<div style="font-size:3rem;">▶</div>' : `<img src="${item.images[0]}" loading="lazy" alt="${item.title}">`}
                </div>
                <div class="card-footer">
                    <div class="card-title-text">${item.title}</div>
                    <div class="card-author-text">${item.autor}</div>
                    <div style="font-size:0.8rem; color:var(--text-light); margin-top:4px;">${item.technique || ''}</div>
                </div>
            </article>`).join('');
    }

    static handleGridInteraction(e) {
        const card = e.target.closest('.file-card');
        if (!card) return;

        const item = ART_DATABASE.find(db => db.id === card.dataset.id);
        if (item) ViewTransitionEngine.trigger(card, item);
    }

    static sortItems(items, criteria) {
        let sorted = [...items];
        const locale = 'es';
        const opts = { sensitivity: 'base' };
        
        switch (criteria) {
            case 'title-asc': return sorted.sort((a, b) => a.title.localeCompare(b.title, locale, opts));
            case 'title-desc': return sorted.sort((a, b) => b.title.localeCompare(a.title, locale, opts));
            case 'artist-asc': return sorted.sort((a, b) => (a.autor || "").localeCompare((b.autor || ""), locale, opts));
            case 'year-desc': return sorted.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
            case 'year-asc': return sorted.sort((a, b) => parseInt(a.year || 0) - parseInt(b.year || 0));
            default: return sorted;
        }
    }

    static renderSkeleton(grid) {
        grid.innerHTML = Array(8).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-box sk-img"></div>
                <div class="sk-content">
                    <div class="skeleton-box sk-text sk-title"></div>
                    <div class="skeleton-box sk-text sk-meta"></div>
                </div>
            </div>`).join('');
    }
}

class SearchController {
    static init() {
        const input = document.getElementById('searchInput');
        input?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    static handleSearch(value) {
        const clean = TextEngine.normalize(value);
        const cards = document.querySelectorAll('.file-card');
        let counter = 0;

        cards.forEach(card => {
            const item = ART_DATABASE.find(db => db.id === card.dataset.id);
            if (!item) return;

            const targetStr = TextEngine.normalize(`${item.title} ${item.autor} ${item.keywords ? item.keywords.join(' ') : ''}`);
            const visible = targetStr.includes(clean);
            card.style.display = visible ? 'flex' : 'none';
            if (visible) counter++;
        });

        const announcer = document.getElementById('announcer');
        if (announcer) announcer.textContent = `Filtrado completado. ${counter} elementos visibles.`;
    }
}

/**
 * Bootstrap de la Aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    ComponentInjector.run();
    ModalManager.init();
    SearchController.init();

    if (document.getElementById('gridObras')) {
        ContentRenderer.init('gridObras', 'Obra');
        document.getElementById('sortSelect')?.addEventListener('change', () => ContentRenderer.init('gridObras', 'Obra'));
    } else if (document.getElementById('gridExposiciones')) {
        ContentRenderer.init('gridExposiciones', 'Video');
    } else if (document.getElementById('trackObras')) {
        ContentRenderer.init('trackObras', 'Reveron');
    }
});