export function setupVoiceSearch(
    inputFilter: HTMLInputElement,
    renderPersonajes: () => void,
    renderPaginacion: () => void
  ) {
    const voiceSearchBtn = document.getElementById('voice-search');
  
    if (!voiceSearchBtn) return;
  
    voiceSearchBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('Tu navegador no soporta reconocimiento de voz');
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      recognition.start();
  
      recognition.onresult = (event) => {
        const nombreReconocido = event.results[0][0].transcript;
        inputFilter.value = nombreReconocido;
        renderPersonajes();
        renderPaginacion();
      };
  
      recognition.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
      };
    });
  }