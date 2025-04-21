
// Mostrar el quiz seleccionado
document.getElementById('textQuizBtn').addEventListener('click', function() {
  document.getElementById('textQuizModal').style.display = 'flex';
  document.getElementById('audioQuizModal').style.display = 'none';
  loadTextQuiz();
});

document.getElementById('audioQuizBtn').addEventListener('click', function() {
  document.getElementById('audioQuizModal').style.display = 'flex';
  document.getElementById('textQuizModal').style.display = 'none';
  loadAudioQuiz();
});

// Cerrar los modales
document.getElementById('closeTextQuiz').addEventListener('click', function() {
  document.getElementById('textQuizModal').style.display = 'none';
});
document.getElementById('closeAudioQuiz').addEventListener('click', function() {
  document.getElementById('audioQuizModal').style.display = 'none';
});

// Función para cargar el Quiz de Texto
function loadTextQuiz() {
  const questions = [
    {
      question: "¿Cuál es el nombre completo de Homer Simpson?",
      options: ["Homer Jay Simpson", "Homer Abraham Simpson", "Homer John Simpson", "Homer James Simpson"],
      answer: 0
    },
    {
      question: "¿En qué planta nuclear trabaja Homer?",
      options: ["Planta Nuclear de Shelbyville", "Planta Nuclear de Ogdenville", "Planta Nuclear de Springfield", "Planta Nuclear de North Haverbrook"],
      answer: 2
    },
    {
      question: "¿Cuál es la bebida favorita de Homer?",
      options: ["Cerveza Duff", "Whisky", "Ron", "Vino"],
      answer: 0
    },
    {
      question: "¿Cómo se llama el vecino de Homer?",
      options: ["Ned Flanders", "Krusty", "Barney", "Apu"],
      answer: 0
    },
    {
      question: "¿Qué animal es el favorito de Homer?",
      options: ["Perro", "Gato", "Delfín", "Conejo"],
      answer: 0
    }
  ];

  const container = document.getElementById('textQuestions');
  container.innerHTML = '';
  
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <div class="options">
        ${q.options.map((opt, i) => `
          <div class="option">
            <input type="radio" name="q${index}" id="q${index}opt${i}" value="${i}">
            <label for="q${index}opt${i}">${opt}</label>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById('submitTextQuiz').onclick = function() {
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) score++;
    });
    const result = document.getElementById('textQuizResult');
    result.textContent = `Obtuviste ${score} de ${questions.length} correctas!`;
    result.style.color = score >= questions.length / 2 ? '#4ade80' : '#f87171';
  };

  document.getElementById('restartTextQuiz').onclick = function() {
    loadTextQuiz();
    document.getElementById('textQuizResult').textContent = '';
  };
}

// Función para cargar el Quiz de Audio
function loadAudioQuiz() {
  const questions = [
        { audio: "./assets/soundsFX/homer_doh.mp3", options: ["Homer Simpson", "Bart Simpson", "Moe Szyslak", "Krusty el Payaso"], answer: 0 },
        { audio: "./assets/soundsFX/bart_eat_my_shorts.mp3", options: ["Lisa Simpson", "Bart Simpson", "Nelson Muntz", "Milhouse Van Houten"], answer: 1 },
        { audio: "./assets/soundsFX/marge_mmm.mp3", options: ["Marge Simpson", "Patty Bouvier", "Selma Bouvier", "Edna Krabappel"], answer: 0 },
        { audio: "./assets/soundsFX/krusty_laugh.mp3", options: ["Barney Gumble", "Krusty el Payaso", "Troy McClure", "Reverendo Lovejoy"], answer: 1 },
        { audio: "./assets/soundsFX/nelson_haha.mp3", options: ["Jimbo Jones", "Dolph Starbeam", "Nelson Muntz", "Kearney Zzyzwicz"], answer: 2 }
    ];

  const container = document.getElementById('audioQuestions');
  container.innerHTML = '';

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <h3>${index + 1}. Escucha el audio y selecciona el personaje:</h3>
      <audio controls>
        <source src="${q.audio}" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
      </audio>
      <div class="options">
        ${q.options.map((opt, i) => `
          <div class="option">
            <input type="radio" name="q${index}" id="q${index}opt${i}" value="${i}">
            <label for="q${index}opt${i}">${opt}</label>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById('submitAudioQuiz').onclick = function() {
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) score++;
    });
    const result = document.getElementById('audioQuizResult');
    result.textContent = `Obtuviste ${score} de ${questions.length} correctas!`;
    result.style.color = score >= questions.length / 2 ? '#4ade80' : '#f87171';
  };

  document.getElementById('restartAudioQuiz').onclick = function() {
    loadAudioQuiz();
    document.getElementById('audioQuizResult').textContent = '';
  };
}
