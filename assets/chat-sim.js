// Autopiloto — simulador de chat interativo (etapa-05.html)
// Respostas por palavra-chave: cada uma reflete só fatos já escritos em outra
// parte do site (preço, garantia, prazo etc. em sprint-100k-vsl.html). Se um
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
      kws: ['preco', 'preço', 'valor', 'custa', 'investimento', 'quanto e', 'quanto é'],
      a: 'O investimento é de R$ 6.590, pago uma única vez por ciclo. Dá uma olhada na seção "O investimento" mais abaixo pra ver tudo que está incluso.',
    },
    {
      kws: ['garantia', 'nao funcionar', 'não funcionar', 'se nao der', 'se não der', 'risco'],
      a: 'Garantimos 20 pacientes confirmados, agendados e realizados, em até 45 dias. Se não atingirmos esse número, continuamos trabalhando sem custo adicional até entregar, respeitadas as condições descritas em contrato.',
    },
    {
      kws: ['prazo', 'tempo', 'dias', 'quando comeca', 'quando começa', 'demora'],
      a: 'A instalação completa (página, chatbot, tráfego e inside sales) leva de 30 a 45 dias. Os primeiros agendamentos costumam começar antes do ciclo estar 100% instalado.',
    },
    {
      kws: ['recorrente', 'mensalidade', 'mensal', 'todo mes', 'todo mês', 'assinatura'],
      a: 'Não é mensalidade. É um investimento único de R$ 6.590 por ciclo contratado. Continuidade depois disso é combinada à parte, na conversa de diagnóstico.',
    },
    {
      kws: ['equipe', 'vendedor', 'preciso de alguem', 'preciso de alguém', 'recepcao', 'recepção', 'contratar'],
      a: 'Não precisa contratar ninguém. O chatbot faz a triagem e o inside sales dedicado conduz o lead até o agendamento, sua equipe só recebe o paciente já pronto pro atendimento.',
    },
    {
      kws: ['vaga', 'disponibilidade', 'quando posso comecar', 'quando posso começar', 'ciclo atual'],
      a: 'As vagas desse ciclo são limitadas porque o atendimento é 1 a 1 com o sócio operador. Vale garantir sua conversa de diagnóstico o quanto antes.',
    },
    {
      kws: ['cancelar', 'desistir', 'reembolso'],
      a: 'Isso é tratado na conversa de diagnóstico, junto com as condições completas do contrato. Prefiro ser preciso nesse ponto em vez de te dar uma resposta genérica aqui.',
    },
    {
      kws: ['chatbot', 'automacao', 'automação', 'como funciona o sistema', 'como funciona'],
      a: 'O sistema tem três partes: tráfego pago qualificado, um chatbot que faz a triagem e agenda sozinho, e nossa equipe conduzindo o paciente quente até o agendamento confirmado.',
    },
  ];

  var FALLBACK = 'Entre em contato com a nossa equipe pra tirar essa dúvida na conversa de diagnóstico.';

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
