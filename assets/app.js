// Autopiloto — comportamento compartilhado entre as etapas do funil

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Revela os balões do chat (etapa-05) em sequência, sem simular digitação de humano real.
  var bubbles = document.querySelectorAll('.chat-body .bubble');
  if (bubbles.length) {
    bubbles.forEach(function (bubble, index) {
      var delay = reduceMotion ? 0 : index * 550;
      bubble.style.animationDelay = delay + 'ms';
    });
  }

  capturarOrigemDoLead();
  criarBotaoContato();
  ajustarVoltarDoFormulario();
  iniciarVideosAutomaticos();
});

// ---- Vídeos que começam sozinhos ao abrir a etapa (etapa-02 e etapa 10) ----
// Navegadores só deixam tocar sozinho COM som se a pessoa já interagiu com o
// site; senão bloqueiam. Então: tenta com som -> se bloquear, toca mudo e mostra
// "Toque para ativar o som", que volta o vídeo ao início já com áudio.
function iniciarVideosAutomaticos() {
  var videos = document.querySelectorAll('video[data-autoplay]');
  Array.prototype.forEach.call(videos, function (video) {
    var frame = video.parentElement;
    var botao = null;

    function mostrarBotaoSom() {
      if (botao || !frame) return;
      botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'unmute-btn';
      botao.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>' +
        '<span>Toque para ativar o som</span>';
      botao.addEventListener('click', ativarSom);
      frame.appendChild(botao);
    }

    function ativarSom() {
      video.currentTime = 0;
      video.muted = false;
      video.play();
      if (botao) { botao.remove(); botao = null; }
    }

    // Se a pessoa ligar o som pelos controles nativos, o aviso some.
    video.addEventListener('volumechange', function () {
      if (!video.muted && botao) { botao.remove(); botao = null; }
    });

    video.muted = false;
    var tentativa = video.play();
    if (!tentativa || !tentativa.then) return;
    tentativa.catch(function () {
      video.muted = true;
      video.play().then(mostrarBotaoSom).catch(function () {
        // Autoplay totalmente bloqueado (ex.: economia de dados): fica o play manual.
      });
    });
  });
}

// ---- Atalho discreto "Falar com a equipe" no topo de todas as etapas ----
// Leva direto ao formulário (que salva o lead e abre o WhatsApp). Não aparece
// na própria página do formulário. Guarda de qual etapa a pessoa saiu para o
// "voltar" do formulário devolvê-la ao mesmo ponto do funil.
var PAGINA_FORMULARIO = 'etapa-12.html';

function criarBotaoContato() {
  if (document.getElementById('lead-form')) return;

  // Chegou a uma etapa normal: esquece a origem antiga, para o "voltar" do
  // formulário só desviar quando a pessoa veio por este botão.
  try { sessionStorage.removeItem('chama_contato_origem'); } catch (err) { /* ignora */ }

  var link = document.createElement('a');
  link.className = 'contact-link';
  link.href = PAGINA_FORMULARIO;
  link.setAttribute('aria-label', 'Falar com a equipe agora');
  link.title = 'Falar com a equipe';
  link.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

  link.addEventListener('click', function () {
    try {
      sessionStorage.setItem('chama_contato_origem', location.pathname.split('/').pop() || 'index.html');
    } catch (err) {
      // sem sessionStorage o "voltar" do formulário só usa o padrão
    }
  });

  var topBar = document.querySelector('.top-bar');
  if (topBar) topBar.appendChild(link);
}

function ajustarVoltarDoFormulario() {
  if (!document.getElementById('lead-form')) return;
  var back = document.querySelector('.btn-back');
  if (!back) return;
  try {
    var origem = sessionStorage.getItem('chama_contato_origem');
    if (origem && /^[\w.-]+\.html$/.test(origem) && origem !== PAGINA_FORMULARIO) {
      back.setAttribute('href', origem);
    }
  } catch (err) {
    // mantém o href padrão (etapa anterior)
  }
}

function verificaropcao(selecionado) {
  var outroField = document.getElementById('outro-field');
  if (!outroField) return;
  if (selecionado.value === 'outro') {
    outroField.style.display = 'block';
  } else {
    outroField.style.display = 'none';
  }
}

// ---- Ripple + navegação suave em todos os CTAs (.btn-primary / .btn-secondary) ----
// Não intercepta cliques com modificadores (abrir em nova aba), links "#" (âncora na mesma
// página) nem botões de submit de formulário — nesses casos só mostra o efeito visual.
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-primary, .btn-secondary');
    if (!btn) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 2;
      var x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
      var y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
      var ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    }

    if (btn.tagName !== 'A') return;
    var href = btn.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    e.preventDefault();
    var delay = reduceMotion ? 0 : 240;
    setTimeout(function () { window.location.href = href; }, delay);
  });
})();

// ---- Atribuição do lead: guarda UTM + primeira página vista na sessão ----
// Usado para enviar contexto de origem junto com o formulário de captura (ver assets/supabase-lead.js).
function capturarOrigemDoLead() {
  try {
    if (!sessionStorage.getItem('sprint100k_landing_page')) {
      sessionStorage.setItem('sprint100k_landing_page', location.pathname.split('/').pop() || 'index.html');
      sessionStorage.setItem('sprint100k_landing_at', new Date().toISOString());
    }

    var params = new URLSearchParams(location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    utmKeys.forEach(function (key) {
      var value = params.get(key);
      if (value && !sessionStorage.getItem('sprint100k_' + key)) {
        sessionStorage.setItem('sprint100k_' + key, value);
      }
    });
  } catch (err) {
    // sessionStorage indisponível (modo privado restrito, etc.) — segue sem atribuição.
  }
} 