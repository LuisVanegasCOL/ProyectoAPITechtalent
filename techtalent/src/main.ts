import './style.css';

interface Personaje {
  _id: string;
  Nombre?: string;
  Genero?: string;
  Estado?: string;
  Ocupacion?: string;
  Historia?: string;
  Imagen?: string;
  favorito?: boolean; // Nueva propiedad para marcar si es favorito
}

let personajes: Personaje[] = [];
let paginaActual = 1;
const personajesPorPagina = 9;

// Elementos del DOM
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
const showFavoritesBtn = document.getElementById('show-favorites')!;
const clearButton = document.getElementById('clear-characters')!;

// Obtener personajes
async function obtenerPersonajes() {
  try {
    const response = await fetch('https://apisimpsons.fly.dev/api/personajes?limit=1000');
    const data = await response.json();
    personajes = data.docs;
    // Inicializar favoritos como falso
    personajes.forEach(personaje => {
      personaje.favorito = false;
    });
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
    card.className = 'bg-[#1a1a2e] p-4 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition cursor-pointer';
    card.innerHTML = `
      <img src="${personaje.Imagen ?? ''}" alt="${personaje.Nombre ?? 'Sin nombre'}" class="w-500% h-64 object-cover rounded-lg mb-4">
      <h3 class="text-xl font-bold text-cyan-300 mb-2">${personaje.Nombre ?? 'Desconocido'}</h3>
      <p class="text-sm">Ocupación: ${personaje.Ocupacion ?? 'Desconocida'}</p>
      <p class="text-sm">Estado: ${personaje.Estado ?? 'Desconocido'}</p>
      <button class="favorite-btn ${personaje.favorito ? 'bg-yellow-500' : 'bg-gray-500'} text-white px-2 py-1 rounded-full mt-2">
        ${personaje.favorito ? '★ ' : '☆'}
      </button>
    `;

    // Evento para marcar o desmarcar favorito
    const btnFavorite = card.querySelector('.favorite-btn')!;
    btnFavorite.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevenir que se abra el detalle del personaje al hacer clic en el botón
      personaje.favorito = !personaje.favorito;
      renderPersonajes(); // Re-renderizar para actualizar el estado del botón
    });

    card.addEventListener('click', () => mostrarDetalle(personaje));
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
  detailImage.src = personaje.Imagen ?? '';
  detailTitle.textContent = personaje.Nombre ?? 'Sin nombre';
  detailGenre.textContent = `Género: ${personaje.Genero ?? 'Desconocido'}`;
  detailState.textContent = `Estado: ${personaje.Estado ?? 'Desconocido'}`;
  detailEmployment.textContent = `Ocupación: ${personaje.Ocupacion ?? 'Desconocida'}`;
  detailDescription.textContent = personaje.Historia ?? 'Sin historia disponible.';
  detailSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cerrar ventana de detalle
btnCloseDetail.addEventListener('click', () => {
  detailSection.classList.add('hidden');
});

// Mostrar favoritos
showFavoritesBtn.addEventListener('click', () => {
  const favoritos = personajes.filter((personaje) => personaje.favorito);
  if (favoritos.length === 0) {
    alert('No tienes personajes favoritos');
    return;
  }
  // Limpiar contenedor y mostrar solo los personajes favoritos
  container.innerHTML = '';
  favoritos.forEach((personaje) => {
    const card = document.createElement('div');
    card.className = 'bg-[#1a1a2e] p-4 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition cursor-pointer';
    card.innerHTML = `
      <img src="${personaje.Imagen ?? ''}" alt="${personaje.Nombre ?? 'Sin nombre'}" class="w-500% h-64 object-cover rounded-lg mb-4">
      <h3 class="text-xl font-bold text-cyan-300 mb-2">${personaje.Nombre ?? 'Desconocido'}</h3>
      <p class="text-sm">Ocupación: ${personaje.Ocupacion ?? 'Desconocida'}</p>
      <p class="text-sm">Estado: ${personaje.Estado ?? 'Desconocido'}</p>
    `;
    card.addEventListener('click', () => mostrarDetalle(personaje));
    container.appendChild(card);
  });
});

// Limpiar la pantalla
clearButton.addEventListener('click', () => {
  // Resetear los personajes y sus favoritos
  personajes.forEach((personaje) => {
    personaje.favorito = false;
  });

  // Limpiar el contenedor y la paginación
  container.innerHTML = '';
  pagination.innerHTML = '';

  // Recargar los personajes sin filtros aplicados
  paginaActual = 1; // Volver a la primera página
  renderPersonajes();
  renderPaginacion();
});


// Inicializar la aplicación
obtenerPersonajes();
