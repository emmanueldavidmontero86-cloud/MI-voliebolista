const balon = document.getElementById("balon");
const lineaPiso = document.getElementById("lineaPiso");
const btnAbrir = document.getElementById("btnAbrir");
const intro = document.getElementById("intro");
const carta = document.getElementById("carta");
const paginaMusica = document.getElementById("paginaMusica");
const paginaCollage = document.getElementById("paginaCollage");
const gatitoPortada = document.getElementById("gatitoPortada");

const btnRepetir = document.getElementById("btnRepetir");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnVolverCarta = document.getElementById("btnVolverCarta");
const btnIrACollage = document.getElementById("btnIrACollage");
const btnVolverMusica = document.getElementById("btnVolverMusica");
const btnInicioTotal = document.getElementById("btnInicioTotal");

const reproductorAudio = document.getElementById("reproductorAudio");
const iconoDisco = document.getElementById("iconoDisco");

function iniciarAnimacion() {
  if (!balon || !btnAbrir) return;

  btnAbrir.disabled = true;
  btnAbrir.classList.remove("visible");

  if (lineaPiso) {
    lineaPiso.classList.remove("desvanecer");
  }

  balon.classList.remove("animando");
  void balon.offsetWidth;
  balon.classList.add("animando");

  setTimeout(() => {
    if (lineaPiso) {
      lineaPiso.classList.add("desvanecer");
    }
  }, 1850);
}

if (balon) {
  balon.addEventListener("animationend", () => {
    if (btnAbrir) {
      btnAbrir.disabled = false;
      btnAbrir.classList.add("visible");
    }
  });
}

// 1. Abre primera nota y achica al gatito
if (btnAbrir) {
  btnAbrir.addEventListener("click", () => {
    intro.classList.add("oculta");
    carta.classList.remove("oculta");
    if (gatitoPortada) {
      gatitoPortada.classList.add("en-esquina");
    }
  });
}

// 2. Siguiente sorpresa -> Música
if (btnSiguiente) {
  btnSiguiente.addEventListener("click", () => {
    carta.classList.add("oculta");
    paginaMusica.classList.remove("oculta");
    if (reproductorAudio) {
      reproductorAudio.play().catch(() => {});
    }
  });
}

// 3. Volver atrás de Música -> Carta
if (btnVolverCarta) {
  btnVolverCarta.addEventListener("click", () => {
    paginaMusica.classList.add("oculta");
    carta.classList.remove("oculta");
  });
}

// 4. Ir a Collage -> Abre el collage final
if (btnIrACollage) {
  btnIrACollage.addEventListener("click", () => {
    paginaMusica.classList.add("oculta");
    paginaCollage.classList.remove("oculta");
  });
}

// 5. Volver atrás del Collage -> Música
if (btnVolverMusica) {
  btnVolverMusica.addEventListener("click", () => {
    paginaCollage.classList.add("oculta");
    paginaMusica.classList.remove("oculta");
  });
}

// 6. Volver a ver animación / Reinicios
function resetearTodo() {
  carta.classList.add("oculta");
  paginaMusica.classList.add("oculta");
  paginaCollage.classList.add("oculta");
  intro.classList.remove("oculta");

  if (gatitoPortada) {
    gatitoPortada.classList.remove("en-esquina");
  }

  // Pausa la música si estaba sonando
  if (reproductorAudio) {
    reproductorAudio.pause();
    reproductorAudio.currentTime = 0;
  }

  iniciarAnimacion();
}

if (btnRepetir) btnRepetir.addEventListener("click", resetearTodo);
if (btnInicioTotal) btnInicioTotal.addEventListener("click", resetearTodo);

// Efecto en el icono de disco
if (reproductorAudio && iconoDisco) {
  reproductorAudio.addEventListener("play", () => iconoDisco.classList.add("sonando"));
  reproductorAudio.addEventListener("pause", () => iconoDisco.classList.remove("sonando"));
  reproductorAudio.addEventListener("ended", () => iconoDisco.classList.remove("sonando"));
}

window.addEventListener("DOMContentLoaded", iniciarAnimacion);