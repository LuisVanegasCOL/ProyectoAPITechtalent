# 🌟 Los Simpsons App 🌟

**Los Simpsons App** es una aplicación web interactiva que permite a los usuarios explorar personajes de la serie *"Los Simpsons"*, realizar quizzes (texto y audio), escuchar sonidos temáticos y disfrutar de una experiencia inmersiva con un diseño moderno y responsivo.

ProyectoAPITechtalent/
├── techtalent/
│   ├── .gitignore
│   ├── home.html
│   ├── home.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── readme.md
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── assets/
│   │   ├── bart-removebg-preview_1.png
│   │   ├── cargando.jpg
│   │   ├── cargando.png
│   │   ├── Homer2.png
│   │   ├── icono.png
│   │   ├── Logo.png
│   │   ├── Pianogame.html
│   │   ├── soundsFX/
│   │   │   ├── ay-caramba.mp3
│   │   │   ├── bart_eat_my_shorts.mp3
│   │   │   ├── Chupete-de-Maggie.mp3
│   │   │   ├── homer_doh.mp3
│   │   │   └── ...
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── counter.ts
│   │   ├── main.ts
│   │   ├── style.css
│   │   ├── voiceSearch.ts
│   │   ├── vite-env.d.ts
│   └── index.txt

## 📂 Estructura del Proyecto

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura de las páginas.
- **CSS3 (TailwindCSS)**: Framework para estilización moderna y responsiva.
- **JavaScript**: Lógica de interacción y manejo de eventos.
- **TypeScript**: Tipado estático para un código más seguro y mantenible.

### Herramientas
- **Vite**: Herramienta de construcción rápida para desarrollo web.
- **PostCSS**: Procesador de CSS para optimizar estilos.
- **Node.js**: Gestión de dependencias y scripts de desarrollo.

### Multimedia
- **Sonidos**: Archivos de audio para efectos y sonidos de personajes.
- **Imágenes**: Recursos visuales de personajes y elementos temáticos.

### APIs
- **Simpsons API**: Datos de personajes obtenidos desde [https://apisimpsons.fly.dev](https://apisimpsons.fly.dev).
- **Web Speech API**: Reconocimiento de voz para búsquedas interactivas.

---

## ✨ Características Principales

### 🎮 Quizzes Interactivos

#### Quiz de Texto
- Preguntas relacionadas con la serie.
- Botones para enviar respuestas y reiniciar el quiz.

#### Quiz de Audio
- Preguntas en formato de audio.
- Botones para enviar respuestas y reiniciar el quiz.

### 🔍 Exploración de Personajes
- **Filtros**: Por nombre, género, estado y ocupación.
- **Paginación**: Navegación entre páginas con un límite de 50 personajes por página.
- **Favoritos**: Los usuarios pueden marcar personajes como favoritos y visualizarlos en una lista separada.

### 🎤 Búsqueda por Voz
- Uso de la Web Speech API para buscar personajes mediante comandos de voz.

### 🎵 Sonidos Temáticos
- **Sonidos por Género**: Reproducción de sonidos específicos según el género del personaje.
- **Sonidos Familiares**: Efectos de audio exclusivos para los miembros de la familia Simpson.

### 🌗 Modo Oscuro/Claro
- Alternancia entre temas oscuro y claro.
- Persistencia del tema seleccionado mediante `localStorage`.

### 🎹 Piano Interactivo
- Mini-juego de piano integrado en un modal.

---

## 📜 Archivos Clave

### HTML
- `home.html`: Página principal con botones para quizzes y navegación.
- `index.html`: Página de exploración de personajes.

### CSS
- `style.css`: Estilos personalizados utilizando TailwindCSS.

### JavaScript/TypeScript
- `main.ts`: Lógica principal para la exploración de personajes, filtros, favoritos y reconocimiento de voz.
- `home.js`: Lógica para los modales de quizzes y navegación.
- `voiceSearch.ts`: Configuración del reconocimiento de voz.

### Multimedia
- `assets/`: Carpeta con imágenes y sonidos temáticos.

---

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js (preferentemente la última versión LTS).
- NPM o Yarn para gestionar dependencias.

### Pasos

```bash
# Clonar el repositorio:
git clone <url-del-repositorio>

# Entrar al directorio:
cd los-simpsons-app

# Instalar dependencias:
npm install

# Iniciar el servidor de desarrollo:
npm run dev
