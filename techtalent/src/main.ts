import './style.css';


interface Personaje {
  _id: string;
  Nombre?: string;
  Genero?: string;
  Estado?: string;
  Ocupacion?: string;
  Historia?: string;
  Imagen?: string;
}

let personajes: Personaje[] = [];
let paginaActual = 1;
const personajesPorPagina = 50;
const personajesFavoritos = new Set<string>();



const container = document.getElementById('simpsons-container')!;
const pagination = document.getElementById('pagination')!;
const inputFilter = document.getElementById('name-filter') as HTMLInputElement;
const generoFilter = document.getElementById('filter-gender') as HTMLSelectElement;
const estadoFilter = document.getElementById('filter-status') as HTMLSelectElement;
const ocupacionFilter = document.getElementById('filter-job') as HTMLInputElement;
const errorMessage = document.getElementById('error-message')!;

const detailSection = document.getElementById('character')!;
const detailImage = document.getElementById('character-image') as HTMLImageElement;
const detailTitle = document.getElementById('character-title')!;
const detailGenre = document.getElementById('character-genre')!;
const detailState = document.getElementById('character-state')!;
const detailEmployment = document.getElementById('character-employment')!;
const detailDescription = document.getElementById('character-description')!;
const btnCloseDetail = document.getElementById('btn-close-detail')!;



// Obtener personajes
async function obtenerPersonajes() {
  try {
    const response = await fetch('https://apisimpsons.fly.dev/api/personajes?limit=1000');
    const data = await response.json();
    personajes = data.docs;
    renderPersonajes();
    renderPaginacion();
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    errorMessage.classList.remove('hidden');
  }
}

// Aplicar filtros
function aplicarFiltros(): Personaje[] {
  const nombre = inputFilter.value.toLowerCase();
  const genero = generoFilter.value;
  const estado = estadoFilter.value;
  const ocupacion = ocupacionFilter.value.toLowerCase();

  return personajes.filter((p) => {
    const coincideNombre = (p.Nombre?.toLowerCase() ?? '').includes(nombre);
    const coincideGenero = genero === '' || p.Genero === genero;
    const coincideEstado = estado === '' || p.Estado === estado;
    const coincideOcupacion = (p.Ocupacion?.toLowerCase() ?? '').includes(ocupacion);

    return coincideNombre && coincideGenero && coincideEstado && coincideOcupacion;
  });
}

// Renderizar personajes
function renderPersonajes() {
  const filtrados = aplicarFiltros();
  const inicio = (paginaActual - 1) * personajesPorPagina;
  const fin = inicio + personajesPorPagina;
  const personajesPagina = filtrados.slice(inicio, fin);

  container.innerHTML = '';

  if (personajesPagina.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400 col-span-3">No se encontraron personajes.</p>';
    return;
  }

  personajesPagina.forEach((personaje) => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer';
    const ocupacionLimitada: string = (personaje.Ocupacion ?? 'Desconocida').slice(0, 50); // Limitar ocupación a 50 caracteres
    card.innerHTML = `
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <div class="w-full md:w-56 h-56 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
          <img src="${personaje.Imagen ?? ''}" alt="${personaje.Nombre ?? 'Sin nombre'}" class="object-contain w-full h-full" />
        </div>
        <div class="flex-1 text-left">
          <h3 class="text-xl font-bold text-yellow-500 mb-2">${personaje.Nombre ?? 'Desconocido'}</h3>
          <p class="text-white text-sm">Ocupación: <span class="text-cyan-400">${ocupacionLimitada}</span></p>
          <p class="text-white text-sm">Estado: <span class="text-pink-400">${personaje.Estado ?? 'Desconocido'}</span></p>
        </div>
        <button class="fav-button text-2xl self-start text-white hover:text-red-400 transition">
          ${personajesFavoritos.has(personaje._id) ? '❤️' : '🤍'}
        </button>
      </div>
    `;
  
    
    const botonFav = card.querySelector('.fav-button') as HTMLButtonElement;
    botonFav.addEventListener('click', (event) => {
      event.stopPropagation(); // Evita que el click en el botón se propague al card
      toggleFavorito(personaje._id, botonFav);
    });
  
    card.addEventListener('click', () => {
      mostrarDetalle(personaje);


       // Reproducir sonido según el género o grupo
       if (
        personaje.Genero && 
        sonidosPorGenero[personaje.Genero] && 
        !["Homero Simpson", "Marge Simpson", "Lisa Simpson", "Bart Simpson", "Maggie Simpson"].includes(personaje.Nombre ?? "")
      ) {
        // Si el género tiene asignados sonidos, reproducimos uno aleatorio
        reproducirSonido(sonidosPorGenero[personaje.Genero]);
      } else if (["Homero Simpson", "Marge Simpson", "Lisa Simpson", "Bart Simpson", "Maggie Simpson"].includes(personaje.Nombre ?? "")) {
        // Si el personaje pertenece a la familia Simpson
        reproducirSonido(sonidosFamiliaSimpson);
      }
    });
  


    
    container.appendChild(card);
  });
}

// Renderizar paginación
function renderPaginacion() {
  const totalFiltrados = aplicarFiltros().length;
  const totalPaginas = Math.ceil(totalFiltrados / personajesPorPagina);

  pagination.innerHTML = '';

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i.toString();
    btn.className = `px-4 py-2 rounded-lg ${
      i === paginaActual ? 'bg-cyan-500 text-white' : 'bg-white text-black'
    } hover:bg-cyan-600 transition`;
    btn.addEventListener('click', () => {
      paginaActual = i;
      renderPersonajes();
      renderPaginacion();
    });
    pagination.appendChild(btn);
  }
}

// Mostrar detalle
function mostrarDetalle(personaje: Personaje) {
  // Actualizamos los elementos de detalle
  detailImage.src = personaje.Imagen ?? '';
  detailTitle.textContent = personaje.Nombre ?? 'Sin nombre';
  detailGenre.textContent = `Género: ${personaje.Genero ?? 'Desconocido'}`;
  detailState.textContent = `Estado: ${personaje.Estado ?? 'Desconocido'}`;
  detailEmployment.textContent = `Ocupación: ${personaje.Ocupacion ?? 'Desconocida'}`;
 // Limitamos la descripción a 100 caracteres
 const descripcionLimitada = (personaje.Historia ?? 'Sin historia disponible.').substring(0, 200);
 const descripcionFinal = personaje.Historia && personaje.Historia.length > 200 ? descripcionLimitada + '...' : descripcionLimitada;
 detailDescription.textContent = descripcionFinal;
// Estilo para el título, más acorde a la temática de Los Simpsons
detailTitle.classList.add('text-4xl', 'font-bold', 'text-yellow-500', 'hover:text-yellow-700', 'hover:scale-110', 'transition-all', 'duration-300', 'drop-shadow-2xl');
  
// Estilo para el género, con un toque divertido
detailGenre.classList.add('text-2xl', 'text-blue-400', 'hover:text-blue-600', 'transition-all', 'duration-300', 'italic');

// Estilo para el estado, añadiendo un color más vivo
detailState.classList.add('text-2xl', 'text-pink-400', 'hover:text-pink-600', 'transition-all', 'duration-300');

// Estilo para la ocupación, con un toque brillante
detailEmployment.classList.add('text-2xl', 'text-green-400', 'hover:text-green-600', 'transition-all', 'duration-300', 'italic');

// Estilo para la descripción, haciéndolo más accesible y llamativo
detailDescription.classList.add('text-xl', 'text-gray-800', 'hover:text-gray-600', 'transition-all', 'duration-300', 'bg-yellow-100', 'p-4', 'rounded-lg', 'shadow-xl');

// Mostramos la sección de detalles
detailSection.classList.remove('hidden');

   // Aplicamos efectos al botón de cerrar
   btnCloseDetail.classList.add('text-5xl', 'text-red-900', 'hover:text-red-800', 'hover:scale-200', 'transition-all', 'duration-300', 'cursor-pointer', 'shadow-lg');
  
}


// Cerrar detalle
btnCloseDetail.addEventListener('click', () => {
  detailSection.classList.add('hidden');
});


// Listeners para filtros
[inputFilter, generoFilter, estadoFilter, ocupacionFilter].forEach((input) => {
  input.addEventListener('input', () => {
    paginaActual = 1;
    renderPersonajes();
    renderPaginacion();
  });
});

// Favoritos Funcionalidad
function toggleFavorito(id: string, boton: HTMLElement | null): void {
  if (personajesFavoritos.has(id)) {
    personajesFavoritos.delete(id);
    if (boton) boton.textContent = '🤍';
  } else {
    personajesFavoritos.add(id);
    if (boton) boton.textContent = '💖';
  }
}

// Botones para mostrar favoritos y limpiar pantalla
const showFavoritesButton = document.getElementById('show-favorites') as HTMLButtonElement;
const clearCharactersButton = document.getElementById('clear-characters') as HTMLButtonElement;

showFavoritesButton.addEventListener('click', () => {
  const personajesFavoritosArray = personajes.filter((p) => personajesFavoritos.has(p._id));
  personajes = personajesFavoritosArray;
  renderPersonajes();
  renderPaginacion();
  
});

clearCharactersButton.addEventListener('click', () => {
  personajes = [];
  personajesFavoritos.clear(); // Limpiar los favoritos
  renderPersonajes();
  renderPaginacion();
  obtenerPersonajes(); // Volver a cargar los personajes sin favoritos seleccionados
});


// SONIDOS // 

// Mapas de sonidos para diferentes filtros y grupos
const sonidosPorGenero: { [key: string]: string[] } = {
  "Masculino": ["assets/soundsFX/Chupete-de-Maggie.mp3"],
  "Femenino": ["assets/soundsFX/homero18.mp3"]
};

// Sonidos específicos para el grupo familiar
const sonidosFamiliaSimpson: string[] = [
  "assets/soundsFX/ay-caramba.mp3", 
  "assets/soundsFX/homero14.mp3"
];

// Función para reproducir sonido aleatorio
function reproducirSonido(sonidos: string[]): void {
  const sonidoAleatorio = sonidos[Math.floor(Math.random() * sonidos.length)];
  const audio = new Audio(sonidoAleatorio);
  audio.play();
}


// Inicializar
obtenerPersonajes();