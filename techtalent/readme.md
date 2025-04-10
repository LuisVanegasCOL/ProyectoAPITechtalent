# Los Simpsons App

Una aplicación web que muestra información sobre los personajes de la serie *Los Simpsons*, utilizando **Tailwind CSS**, **TypeScript**, y **Vite** como herramientas principales. La app permite filtrar personajes por nombre, género, estado y ocupación, mostrando detalles al seleccionar un personaje.

## Estructura del proyecto

```
techtalent/
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── readme.md
├── tailwind.config.ts
├── tsconfig.json
├── assets/
│   ├── icono.png
│   └── Logo.png
├── public/
│   └── vite.svg
├── src/
│   ├── counter.ts
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   └── vite-env.d.ts
```

## Funcionalidades

- **Visualización de personajes:** Muestra una lista de personajes de Los Simpsons obtenidos desde una API.
- **Filtros dinámicos:** Permite filtrar personajes por nombre, género, estado y ocupación.
- **Detalle de personajes:** Al hacer clic en un personaje, se muestra información detallada como su imagen, género, estado, ocupación y descripción.
- **Paginación:** Navegación entre páginas para explorar todos los personajes disponibles.

## Tecnologías utilizadas

- **HTML5:** Estructura básica del documento.
- **Tailwind CSS:** Framework de diseño para estilizar la aplicación.
- **TypeScript:** Lenguaje de programación para añadir tipado y mejorar el mantenimiento del código.
- **Vite:** Herramienta de construcción para acelerar el proceso de desarrollo.
- **API externa:** Datos obtenidos desde `https://apisimpsons.fly.dev`.

## Instalación

### Requisitos previos

- Node.js (preferentemente la última versión LTS).
- NPM o Yarn para gestionar dependencias.

### Pasos para ejecutar el proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/los-simpsons-app.git
   cd los-simpsons-app
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre la aplicación en tu navegador:**
   - Ve a `http://localhost:5173` (o el puerto indicado en la consola).

### Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Previsualiza la aplicación construida.

## Configuración

### Tailwind CSS

El archivo de configuración de Tailwind se encuentra en `tailwind.config.ts`. Puedes personalizar los estilos extendiendo el tema o añadiendo plugins.

### TypeScript

La configuración de TypeScript está definida en `tsconfig.json`. Incluye opciones como `strict` para garantizar un código más seguro y mantenible.

## Archivos principales

### `index.html`

El archivo principal que define la estructura de la aplicación y enlaza los estilos y scripts.

### `src/main.ts`

Contiene la lógica principal de la aplicación, incluyendo:

- Obtención de datos desde la API.
- Aplicación de filtros.
- Renderizado de personajes y paginación.
- Manejo de eventos para mostrar detalles de los personajes.

### `src/style.css`

Define los estilos personalizados utilizando Tailwind CSS.

### `src/counter.ts`

Un archivo de ejemplo que implementa un contador interactivo.

## Recursos

- **API utilizada:** [Simpsons API](https://apisimpsons.fly.dev)
- **Framework CSS:** [Tailwind CSS](https://tailwindcss.com)
- **Herramienta de construcción:** [Vite](https://vitejs.dev)

## Autor

Creado por **Luis Ricardo Vanegas** - 2025 &copy;

---

¡Gracias por usar esta aplicación! Si tienes alguna sugerencia o encuentras un problema, no dudes en abrir un issue o contribuir al proyecto.