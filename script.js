// HERO SLIDES
const titles = [
  "Portfólio<br>Audiovizual",
  "Vídeos que Conectam<br>Pessoas",
  "Marketing com<br>Criatividade",
  "Excelência do Roteiro<br>à Entrega Final"
];

const descriptions = [
  "Uma produção que vai além da estética!<br>Conteúdo com intenção, técnica e propósito.",
  "Porque cada história bem contada aproxima<br>marcas, inspira confiança e gera resultados.",
  "Seu negócio precisa ser lembrado e criatividade<br>é o que faz isso acontecer.",
  "Do planejamento à pós-produção, tudo é feito<br>para entregar um resultado impecável."
];

const images = [
  "assets/img/Eu Profi.png",
  "assets/img/Carrosel/image2.png",
  "assets/img/Carrosel/image3.png",
  "assets/img/Carrosel/image4.png"
];

let currentIndex = 0;
const titleElement = document.getElementById("hero-title");
const descElement = document.getElementById("hero-description");
const imageElement = document.getElementById("hero-image");

function changeSlide(index = null) {
  currentIndex = index !== null ? index : (currentIndex + 1) % titles.length;

  titleElement.classList.add("fade-out");
  descElement.classList.add("fade-out");
  imageElement.classList.add("fade-out");

  setTimeout(() => {
    titleElement.innerHTML = titles[currentIndex];
    descElement.innerHTML = descriptions[currentIndex];
    imageElement.src = images[currentIndex];

    titleElement.classList.remove("fade-out");
    descElement.classList.remove("fade-out");
    imageElement.classList.remove("fade-out");
  }, 700);
} 

setInterval(changeSlide, 5000);

// ----------------------------
// EXPANSÃO DAS CAIXAS DE SERVIÇO
// ----------------------------
const caixas = document.querySelectorAll(".caixa.expandivel");

// Cria um contêiner global para o conteúdo expandido
const containerExpandido = document.createElement("div");
containerExpandido.classList.add("conteudo-expandido-global");
document.body.appendChild(containerExpandido);

caixas.forEach((caixa) => {
  const conteudoOriginal = caixa.querySelector(".conteudo-expandido");

  caixa.addEventListener("click", (e) => {
    e.stopPropagation();

    // Fecha qualquer conteúdo aberto
    containerExpandido.innerHTML = "";
    document.querySelectorAll(".caixa.expandivel").forEach(c => c.classList.remove("aberta"));
    document.body.classList.remove("no-scroll");

    // Pega a posição do clique
    const rect = caixa.getBoundingClientRect();
    const startTop = rect.top + window.scrollY + rect.height / 2;
    const startLeft = rect.left + rect.width / 2;

    // Clona e mostra o conteúdo fora da .caixa
    const conteudoClone = conteudoOriginal.cloneNode(true);
    conteudoClone.style.setProperty('--start-top', `${startTop}px`);
    conteudoClone.style.setProperty('--start-left', `${startLeft}px`);
    conteudoClone.classList.add("expandido-externo");
    containerExpandido.appendChild(conteudoClone);
    document.body.classList.add("no-scroll");

    // Ativa animação após próximo frame
    requestAnimationFrame(() => {
      conteudoClone.classList.add("ativo");
    });

    // Fecha com botão interno
    conteudoClone.querySelector(".btn-fechar")?.addEventListener("click", (e) => {
      e.stopPropagation();
      conteudoClone.classList.remove("ativo");
      setTimeout(() => {
        containerExpandido.innerHTML = "";
        document.body.classList.remove("no-scroll");
      }, 300);
    });
  });
});

// Fecha ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".expandido-externo")) {
    containerExpandido.innerHTML = "";
    document.body.classList.remove("no-scroll");
  }
});


function expandirVideo(element) {
  const video = element.querySelector("video");
  const descricaoCompleta = element.getAttribute("data-descricao");

  // Cria o overlay
  const overlay = document.createElement("div");
  overlay.classList.add("video-overlay");

  // Clona o vídeo
  const videoClone = video.cloneNode(true);
  videoClone.controls = true;
  videoClone.muted = false;
  videoClone.autoplay = true;

  // Adiciona descrição
  const descricao = document.createElement("p");
  descricao.classList.add("descricao-detalhada");
  descricao.textContent = descricaoCompleta;

  // Botão de fechar
  const fechar = document.createElement("span");
  fechar.classList.add("fechar-overlay");
  fechar.textContent = "✕";
  fechar.onclick = () => document.body.removeChild(overlay);

  overlay.appendChild(fechar);
  overlay.appendChild(videoClone);
  overlay.appendChild(descricao);
  document.body.appendChild(overlay);
}

function fecharExpandido() {
  const overlay = document.getElementById("overlay-video");
  const videoEl = document.getElementById("videoExpandidoEl");

  videoEl.pause();
  videoEl.src = "";
  overlay.classList.remove("ativo");
}