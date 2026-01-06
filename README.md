# 🎨 GAVAR - Galería de Arte Virtual

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-success?style=for-the-badge)
![Tecnología](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Estilo](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Lógica](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Una experiencia web minimalista inspirada en interfaces de almacenamiento en la nube (Cloud Storage) y e-commerce modernos para la exhibición de arte digital.

---

## 📋 Descripción

**GAVAR** (Galería de Arte Virtual Armando Reverón) es una aplicación web estática diseñada para modernizar la forma en que interactuamos con exposiciones de arte online. 

A diferencia de las galerías tradicionales (estáticas y pesadas), este proyecto implementa una interfaz familiar tipo **"Sistema de Archivos"** (similar a Google Drive) combinada con modales de detalle tipo **Marketplace**, ofreciendo una experiencia de usuario (UX) fluida, intuitiva y responsive.

## ✨ Características Principales

* **Diseño Minimalista & Clean:** Uso de espacios en blanco y tipografías Sans-Serif (Montserrat) para resaltar las obras.
* **Interfaz Familiar:** Grid de tarjetas inspirado en sistemas de gestión de archivos.
* **Visualizador Modal Híbrido:**
    * Soporte nativo para **Imágenes** y **Videos**.
    * Diseño "Split-View" (Media a la izquierda, Metadatos a la derecha).
* **Búsqueda en Tiempo Real:** Filtrado instantáneo de obras por título o autor mediante JavaScript (DOM Manipulation).
* **Micro-Interacciones:** Animaciones CSS (Fade-in, Hover effects) para una sensación "Premium".
* **Totalmente Responsive:** Adaptable desde monitores 4K hasta dispositivos móviles.

## 🚀 Instalación y Uso

Este proyecto no requiere dependencias de backend ni compiladores (Node.js/Python). Es **Vanilla Web**.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/gavar-gallery.git](https://github.com/TU_USUARIO/gavar-gallery.git)
    ```
2.  **Abrir el proyecto:**
    Navega a la carpeta y abre el archivo `index.html` en tu navegador favorito.

## 📂 Estructura del Proyecto

```text
GAVAR/
├── assets/          # Recursos multimedia (img, videos)
├── css/             # Estilos (CSS Variables, Grid, Flexbox)
├── js/              # Lógica (Modales, Buscador, Slider)
├── index.html       # Landing Page
├── galeria.html     # Grid de Imágenes
├── exposiciones.html# Grid de Videos
└── mencion-especial.html # Página de Artista Destacado