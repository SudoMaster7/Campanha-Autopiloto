// Chama — simulador de chat interativo (etapa-05.html)
// Respostas por palavra-chave: cada uma reflete só fatos já escritos em outra
// parte do site (serviços e diagnóstico nas etapas 03, 06 e 11). Se um
// dado mudar lá, atualize aqui também. Sem resposta reconhecida -> FALLBACK,
// nunca uma resposta genérica inventada na hora.

(function () {
  var body = document.getElementById('chatBody');
  var input = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');
  var chips = document.getElementById('chatChips');
  var ctaBtn = document.getElementById('chatCtaBtn');

  if (!body || !input || !sendBtn || !chips || !ctaBtn) return;

  var KB = [
    {
      kws: ['servico', 'serviços', 'inclu', 'oferece', 'entrega', 'o que voces fazem', 'o que vocês fazem'],
      a: 'Planejamento de marketing e comunicação, identidade visual e design gráfico, produção de conteúdo, materiais digitais, landing page, tráfego pago no Google e na Meta, chatbot, SAC e suporte em todas as plataformas. Tudo com uma equipe só.',
    },
    {
      kws: ['preco', 'preço', 'valor', 'custa', 'investimento', 'quanto e', 'quanto é', 'mensalidade'],
      a: 'O investimento depende do que a sua empresa precisa hoje. Depois do diagnóstico gratuito, montamos uma proposta com o escopo certo para o seu momento.',
    },
    {
      kws: ['segmento', 'nicho', 'ramo', 'atendem', 'restaurante', 'gastronom', 'loja', 'meu tipo'],
      a: 'Atendemos empresas de diversos segmentos. A equipe tem mais de 5 anos de mercado e muita experiência no nicho gastronômico. No diagnóstico a gente avalia o seu caso.',
    },
    {
      kws: ['comeco', 'começo', 'comecar', 'começar', 'como faco', 'como faço', 'contato', 'diagnostico', 'diagnóstico'],
      a: 'É só preencher o formulário do diagnóstico gratuito. Nossa equipe entra em contato pelo WhatsApp e te passa todas as orientações.',
    },
    {
      kws: ['prazo', 'tempo', 'demora', 'resultado'],
      a: 'Depende do ponto de partida da sua empresa. No diagnóstico apresentamos o planejamento com as etapas e o que esperar de cada uma. Prefiro não te prometer um prazo genérico aqui.',
    },
    {
      kws: ['equipe', 'preciso de alguem', 'preciso de alguém', 'contratar', 'funcionario', 'funcionário', 'designer', 'social media'],
      a: 'Não precisa. Nossa equipe cuida do planejamento, do conteúdo, do design, dos anúncios e do atendimento. Você acompanha e aprova.',
    },
    {
      kws: ['trafego', 'tráfego', 'anuncio', 'anúncio', 'google', 'instagram', 'facebook', 'meta', 'views', 'visualiza'],
      a: 'Criamos e gerenciamos campanhas no Google e na Meta (Instagram e Facebook) para levar a sua empresa até o público certo, com acompanhamento e ajustes contínuos.',
    },
    {
      kws: ['chatbot', 'automacao', 'automação', 'sac', 'atendimento', 'whatsapp'],
      a: 'O chatbot responde seus clientes na hora, 24 horas por dia, e o SAC organiza o atendimento para nenhuma mensagem ficar sem resposta. Assim você converte mais e mantém o cliente por perto.',
    },
    {
      kws: ['contrato', 'cancelar', 'desistir', 'reembolso', 'fidelidade'],
      a: 'Isso é tratado direto com a equipe, junto com as condições da proposta. Prefiro ser preciso nesse ponto em vez de te dar uma resposta genérica aqui.',
    },
  ];

  var FALLBACK = 'Essa é uma ótima pergunta pra nossa equipe. No diagnóstico gratuito eles respondem tudo sobre o seu caso.';

  function norm(s) {
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(new RegExp('[̀-ͯ]', 'g'), '');
  }

  function findAnswer(text) {
    var t = norm(text);
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      for (var j = 0; j < entry.kws.length; j++) {
        if (t.indexOf(norm(entry.kws[j])) !== -1) return entry.a;
      }
    }
    return null;
  }

  function scrollToEnd() {
    body.scrollTop = body.scrollHeight;
  }

  function addBubble(text, who) {
    var el = document.createElement('div');
    el.className = 'bubble ' + who;
    el.textContent = text;
    body.appendChild(el);
    scrollToEnd();
    return el;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'bubble assistant typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(el);
    scrollToEnd();
    return el;
  }

  var ctaBubbleShown = false;

  // Manda o CTA como uma mensagem própria (bolha com botão de verdade), em vez
  // de embutir um <a> dentro do texto — addBubble() usa textContent, então um
  // link ali dentro apareceria como HTML cru pro usuário. Reaproveita o mesmo
  // link/rótulo do botão fixo (#chatCtaBtn) pra nunca ficar dessincronizado.
  function addCtaBubble() {
    if (ctaBubbleShown) return;
    ctaBubbleShown = true;

    var el = document.createElement('div');
    el.className = 'bubble assistant cta-bubble';
    var a = document.createElement('a');
    a.href = ctaBtn.getAttribute('href');
    a.textContent = ctaBtn.textContent;
    el.appendChild(a);
    body.appendChild(el);
    scrollToEnd();
  }

  var exchangeCount = 0;

  function respondTo(userText) {
    addBubble(userText, 'user');
    var typingEl = showTyping();
    var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 650 + Math.random() * 400;

    setTimeout(function () {
      typingEl.remove();
      var known = findAnswer(userText);
      addBubble(known || FALLBACK, 'assistant');
      exchangeCount++;
      if (!known || exchangeCount >= 3) {
        ctaBtn.classList.add('visible');
        addCtaBubble();
      }
    }, delay);
  }

  function handleSend() {
    var val = input.value.trim();
    if (!val) return;
    input.value = '';
    respondTo(val);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSend();
  });

  chips.addEventListener('click', function (e) {
    var btn = e.target.closest('.chat-chip');
    if (!btn) return;
    btn.disabled = true;
    respondTo(btn.dataset.q);
  });

  scrollToEnd();
})();
