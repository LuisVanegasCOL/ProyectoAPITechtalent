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
  window.scrollTo({ top: detailSection.offsetTop - 100, behavior: 'smooth' });
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

// Inicializar
obtenerPersonajes();
// Referencias a elementos del DOM
const pantallaCarga = document.getElementById('pantalla-carga') as HTMLDivElement;
const contenido = document.getElementById('contenido') as HTMLDivElement;
const quiz = document.getElementById('quiz') as HTMLDivElement;

const btnEntrar = document.getElementById('btn-entrar') as HTMLButtonElement;
const btnQuiz = document.getElementById('btn-quiz') as HTMLButtonElement;
const themeSelector = document.getElementById('theme-selector') as HTMLSelectElement;

const questionElement = document.getElementById('question') as HTMLDivElement;
const answersElement = document.getElementById('answers') as HTMLDivElement;
const nextButton = document.getElementById('next-question') as HTMLButtonElement;

interface Character {
  Nombre: string;
  Ocupacion?: string;
  Genero?: string;
  Estado?: string;
}

let currentCharacter: Character | null = null;

btnEntrar.addEventListener('click', () => {
  pantallaCarga.classList.add('hidden');
  contenido.classList.remove('hidden');
  quiz.classList.add('hidden');
});

btnQuiz.addEventListener('click', () => {
  pantallaCarga.classList.add('hidden');
  contenido.classList.add('hidden');
  quiz.classList.remove('hidden');
  startQuiz();
});

themeSelector.addEventListener('change', (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  document.body.classList.remove('inverted', 'theme-3');
  if (value === '2') {
    document.body.classList.add('inverted');
  } else if (value === '3') {
    document.body.classList.add('theme-3');
  }
});

async function fetchRandomCharacter(): Promise<Character> {
  const skip = Math.floor(Math.random() * 550);
  const response = await fetch(`https://apisimpsons.fly.dev/api/personajes?limit=10&skip=${skip}`);
  const data = await response.json();
  const personajes: Character[] = data.docs;

  if (personajes.length === 0) {
    throw new Error('No se encontraron personajes');
  }

  const randomIndex = Math.floor(Math.random() * personajes.length);
  return personajes[randomIndex];
}

async function renderQuestion(): Promise<void> {
  currentCharacter = await fetchRandomCharacter();

  const preguntas = [
    {
      texto: `¿Cuál es la ocupación de ${currentCharacter.Nombre}?`,
      correcta: currentCharacter.Ocupacion || 'Desconocida',
      opcionesExtra: ['Estudiante', 'Amo de casa', 'Trabajador nuclear', 'Cantante', 'Policía', 'Doctor']
    },
    {
      texto: `¿Cuál es el género de ${currentCharacter.Nombre}?`,
      correcta: currentCharacter.Genero || 'Desconocido',
      opcionesExtra: ['Masculino', 'Femenino', 'Robot', 'Otro']
    },
    {
      texto: `¿Cuál es el estado de ${currentCharacter.Nombre}?`,
      correcta: currentCharacter.Estado || 'Desconocido',
      opcionesExtra: ['Vivo', 'Fallecido', 'Robot', 'Biblico', 'Estatua']
    }
  ];

  const preguntaElegida = preguntas[Math.floor(Math.random() * preguntas.length)];
  questionElement.textContent = preguntaElegida.texto;

  const opciones: string[] = [preguntaElegida.correcta];

  while (opciones.length < 4) {
    const extra = preguntaElegida.opcionesExtra[Math.floor(Math.random() * preguntaElegida.opcionesExtra.length)];
    if (!opciones.includes(extra)) {
      opciones.push(extra);
    }
  }

  opciones.sort(() => Math.random() - 0.5);
  answersElement.innerHTML = '';

  opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.textContent = opcion;
    btn.className = 'bg-gray-700 hover:bg-yellow-400 hover:text-gray-900 text-white px-4 py-2 rounded-md transition';
    btn.onclick = () => {
      Array.from(answersElement.children).forEach(b => (b as HTMLButtonElement).disabled = true);
      if (opcion === preguntaElegida.correcta) {
        btn.classList.remove('bg-gray-700');
        btn.classList.add('bg-green-500');
      } else {
        btn.classList.remove('bg-gray-700');
        btn.classList.add('bg-red-500');
      }
    };
    answersElement.appendChild(btn);
  });
}

function startQuiz(): void {
  renderQuestion();
}

nextButton.addEventListener('click', renderQuestion);
