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
});

function verificaropcao(selecionado) {
  var outroField = document.getElementById('outro-field');
  if (!outroField) return;
  if (selecionado.value === 'outro') {
    outroField.style.display = 'block';
  } else {
    outroField.style.display = 'none';
  }
}

// ---- Ripple dourado + navegação suave em todos os CTAs (.btn-primary / .btn-secondary) ----
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