// Chama — envia o formulário de captura (etapa-12.html) direto para o
// Supabase via REST (PostgREST), sem precisar carregar o SDK completo do supabase-js.
// Depende de: assets/config.js (window.SPRINT100K_CONFIG) e supabase/schema.sql aplicado.

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('lead-form');
    if (!form) return;

    var statusEl = document.getElementById('lead-form-status');
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      enviarLead(form, statusEl, submitBtn, submitLabel);
    });
  });

  function enviarLead(form, statusEl, submitBtn, submitLabel) {
    var config = window.SPRINT100K_CONFIG || {};
    var url = config.SUPABASE_URL || '';
    var key = config.SUPABASE_ANON_KEY || '';

    if (!url || !key || url.indexOf('SEU-PROJETO') !== -1 || key.indexOf('SUA_CHAVE') !== -1) {
      mostrarStatus(statusEl, 'error', 'Formulário ainda não conectado ao CRM. Configure assets/config.js com os dados do seu projeto Supabase.');
      console.error('[Autopiloto] assets/config.js não foi preenchido com SUPABASE_URL / SUPABASE_ANON_KEY.');
      return;
    }

    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var tipo = String(data.get('tipo') || '');

    var payload = {
      nome: String(data.get('nome') || '').trim(),
      email: String(data.get('email') || '').trim(),
      whatsapp: String(data.get('whatsapp') || '').trim(),
      localizacao: String(data.get('localizacao') || '').trim(),
      tipo_clinica: tipo,
      tipo_clinica_outro: tipo === 'outro' ? String(data.get('outro') || '').trim() : null,
      ticket_medio: String(data.get('ticket') || ''),
      capacidade_ociosa: String(data.get('capacidade') || ''),
      utm_source: sessionStorage.getItem('sprint100k_utm_source') || null,
      utm_medium: sessionStorage.getItem('sprint100k_utm_medium') || null,
      utm_campaign: sessionStorage.getItem('sprint100k_utm_campaign') || null,
      utm_content: sessionStorage.getItem('sprint100k_utm_content') || null,
      utm_term: sessionStorage.getItem('sprint100k_utm_term') || null,
      landing_page: sessionStorage.getItem('sprint100k_landing_page') || null,
      landing_at: sessionStorage.getItem('sprint100k_landing_at') || null,
      page_url: location.href,
      user_agent: navigator.userAgent,
    };

    setEnviando(submitBtn, true);
    mostrarStatus(statusEl, null, '');

    fetch(url.replace(/\/$/, '') + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: 'Bearer ' + key,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) {
          return res.text().then(function (text) {
            throw new Error('Supabase respondeu ' + res.status + ': ' + text);
          });
        }
        form.reset();
        var outroField = document.getElementById('outro-field');
        if (outroField) outroField.style.display = 'none';

        var waNumber = String(config.WHATSAPP_NUMBER || '');
        var waConfigured = waNumber && waNumber.indexOf('SEU_NUMERO') === -1;

        if (waConfigured) {
          mostrarStatus(statusEl, 'success', 'Recebemos seus dados! Te levando pro WhatsApp para continuar a conversa…');
          var waUrl = montarLinkWhatsApp(waNumber, payload);
          setTimeout(function () { location.href = waUrl; }, 900);
        } else {
          mostrarStatus(statusEl, 'success', 'Recebemos seus dados! Nossa equipe entra em contato pelo WhatsApp informado em até 1 dia útil.');
          console.warn('[Autopiloto] WHATSAPP_NUMBER não configurado em assets/config.js — redirecionamento pulado.');
        }
      })
      .catch(function (err) {
        console.error('[Autopiloto] Falha ao enviar lead para o Supabase:', err);
        mostrarStatus(statusEl, 'error', 'Não foi possível enviar agora. Verifique sua conexão e tente novamente — se o problema continuar, chame no WhatsApp.');
      })
      .finally(function () {
        setEnviando(submitBtn, false, submitLabel);
      });
  }

  function montarLinkWhatsApp(waNumber, payload) {
    var tipoDisplay = payload.tipo_clinica === 'outro' && payload.tipo_clinica_outro
      ? payload.tipo_clinica_outro
      : payload.tipo_clinica;

    var linhas = [
      'Olá! Vim pelo site da Chama e quero meu diagnóstico gratuito.',
      '',
      'Nome: ' + payload.nome,
      'Segmento: ' + tipoDisplay,
      'Cidade/UF: ' + payload.localizacao,
      'Ticket médio: ' + payload.ticket_medio,
      'Consegue atender mais clientes: ' + payload.capacidade_ociosa,
    ];

    var digits = waNumber.replace(/\D/g, '');
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(linhas.join('\n'));
  }

  function setEnviando(submitBtn, enviando, submitLabel) {
    if (!submitBtn) return;
    submitBtn.disabled = enviando;
    submitBtn.style.opacity = enviando ? '0.7' : '';
    submitBtn.textContent = enviando ? 'Enviando…' : submitLabel || submitBtn.textContent;
  }

  function mostrarStatus(el, type, message) {
    if (!el) return;
    el.className = 'form-status' + (type ? ' is-visible ' + type : '');
    el.textContent = message;
  }
})();
