# 🎨 GAVAR - Galería de Arte Virtual Armando Reverón

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n-success?style=for-the-badge)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Edge%20Native%202026-6A0dad?style=for-the-badge)
![Color Space](https://img.shields.io/badge/Color-OKLCH%20%2B%20P3-FF69B4?style=for-the-badge)
![A11Y](https://img.shields.io/badge/Accesibilidad-WCAG%203.0%20Ready-00A6CE?style=for-the-badge)

> Una experiencia web minimalista inspirada en interfaces de almacenamiento en la nube (Cloud Storage) y e-commerce modernos para la exhibición de arte digital, optimizada para la percepción humana y el alto rendimiento.

---

## 📋 Descripción

**GAVAR** es una aplicación web estática diseñada para modernizar la forma en que interactuamos con exposiciones de arte online. 

A diferencia de las galerías tradicionales (estáticas, pesadas y difíciles de navegar), este proyecto implementa una interfaz familiar tipo **"Sistema de Archivos"** combinada con un motor de renderizado de vanguardia. La experiencia de usuario (UX) es fluida, intuitiva y abstracta la carga cognitiva mediante interacciones táctiles y tiempos de respuesta biológicamente optimizados (Cronocepción).

## ✨ Características Arquitectónicas (Estándar 2026)

* **CSS Grid-3 Masonry Nativo:** Cuadrícula unidimensional asimétrica generada por la GPU del navegador. Elimina el *layout thrashing* y prescinde totalmente de librerías JavaScript pesadas.
* **View Transitions API:** Micro-interacciones de interpolación gráfica nativa. Las obras de arte fluyen visualmente desde la cuadrícula hasta el modal sin destellos blancos ni recargas del DOM (Preservación del *Flow State*).
* **Colorimetría Perceptual (OKLCH):** Uso del espacio de color biológico humano `oklch()` con mejora progresiva a `Display-P3`, garantizando legibilidad perfecta (Contraste APCA) en cualquier monitor moderno.
* **Motor de Datos Tipado:** Base de datos estructurada en JSON puro y estricto, separando metadatos (Técnica, Cantidad, Instagram) de la descripción para evitar errores de renderizado.
* **Accesibilidad Semántica (WCAG 3.0):** Implementación del elemento `<dialog>` nativo con gestión automática de foco (Focus Trapping), soporte de teclado y regiones `aria-live` para anunciar resultados de búsqueda a lectores de pantalla.
* **Delegación de Eventos:** Rendimiento de memoria ultra-eficiente mediante la centralización de escuchas de eventos (*Event Bubbling*), asegurando que la interfaz jamás se congele tras filtrados masivos.

## 🚀 Instalación y Uso

Este proyecto es un producto de ingeniería **Vanilla Web Pureza**. No requiere dependencias de backend, Node.js, compiladores ni bundlers. Listo para ser servido desde un Edge CDN.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/gavar-gallery.git](https://github.com/TU_USUARIO/gavar-gallery.git)
    ```
2.  **Despliegue Local:**
    Navega a la carpeta y abre el archivo `index.html` en tu navegador favorito, o sírvelo mediante Live Server.

## 📂 Estructura del Proyecto

```text
GAVAR/
├── assets/          # Recursos multimedia (img, videos)
├── css/             # Estilos (OKLCH, Masonry nativo, View Transitions)
├── js/              # Motor Lógico (Buscador, Modales, Event Delegation)
├── index.html       # Landing Page principal
├── galeria.html     # Grid Dinámico de Obras
├── exposiciones.html# Grid Dinámico de Exposiciones Multimedia
└── mencion-especial.html # Página de Artista Destacado (Armando Reverón)