// Autopiloto — configuração do Supabase + WhatsApp
//
// Preencha os valores abaixo com os dados do SEU projeto Supabase:
//   Project Settings > API > Project URL           -> SUPABASE_URL
//   Project Settings > API > Project API keys (anon public) -> SUPABASE_ANON_KEY
//
// A chave "anon public" é segura para expor aqui: ela só consegue inserir leads
// (ver supabase/schema.sql), nunca ler ou apagar dados. NUNCA use a chave
// "service_role" neste arquivo.
//
// WHATSAPP_NUMBER: número real da equipe, só dígitos, com código do país e DDD
// (ex.: "5511999999999" para +55 11 99999-9999). Sem espaço, "+", "-" ou "(", ")".
// Depois que o lead é salvo no Supabase, o site abre o WhatsApp nesse número já
// com uma mensagem pronta com os dados que a pessoa preencheu no formulário.
window.SPRINT100K_CONFIG = {
  SUPABASE_URL: 'https://girwtqxsifkjdfxuexec.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_B1P24Ea6e3ciFQvLeU79aQ_6en_xL6J',
  WHATSAPP_NUMBER: '5521995871999',
};
