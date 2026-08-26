# Prompts para Geração das Páginas do Funil — Sprint 100k

## Como usar

- São 9 prompts, um por página/etapa. Use um de cada vez no seu agente de código (Claude Code, Cursor, v0, etc.), na ordem 01 → 09.
- Cada prompt é autocontido: já traz o sistema de design completo, então pode ser executado isoladamente sem precisar do contexto dos outros.
- Peça ao agente para nomear os arquivos exatamente como indicado em cada prompt (`etapa-01.html`, `etapa-02.html`...) — isso garante que os links "próxima etapa" funcionem entre as páginas.
- Estilo geral: telas leves, cards arredondados, formato de app mobile — seguindo a estrutura do funil de referência que você me enviou, com a paleta SUDO (marfim + dourado) no lugar do verde do exemplo.
- Regras éticas já embutidas em cada prompt (sem contador fake, sem chatbot fingindo ser humano, sem escassez inventada) — não remova essas instruções ao editar os prompts.

---

## Sistema de Design (já incluso em cada prompt abaixo)

```
PALETA
- Fundo base: #F7F4EE (marfim claro)
- Cards: #FFFFFF, borda 1px #E8E2D3, raio 20px, sombra suave (0 8px 24px rgba(20,16,8,0.06))
- Texto principal: #1B1912 (quase preto, não puro)
- Texto secundário: #6B6455
- Acento primário (CTA, destaques): #C9A227 (dourado SUDO)
- Acento escuro (botão primário, fundo de destaque): #1B1912
- Alerta/garantia: #8A5A3B (terracota suave)
- Sucesso/check: #3E6B4A (verde esverdeado discreto)

TIPOGRAFIA
- Títulos: 'Cormorant Garamond', serif (peso 500-600), tamanhos grandes, elegante
- Rótulos/eyebrows: 'Cinzel', serif, uppercase, letter-spacing 0.14em, tamanho pequeno (11-12px)
- Corpo/UI: 'Inter', sans-serif
- Importar via Google Fonts

LAYOUT
- Mobile-first, largura de conteúdo máxima ~420px centralizada (simula tela de app), mesmo em desktop
- Barra de progresso no topo: 9 segmentos finos, preenchidos até a etapa atual (dourado), o resto em cinza claro
- Botão "Voltar" discreto no canto superior esquerdo (seta), exceto na Página 01
- Um único CTA principal por página, fixo na parte inferior da tela (sticky), largura total, cantos arredondados (14px), fundo #1B1912, texto branco
- Sem popups, sem modais — cada etapa é uma página HTML própria

REGRAS OBRIGATÓRIAS (não fabricar dado nenhum)
- Nenhum contador de "pessoas online agora" ou "pessoas usando isso" — a menos que ligado a um dado real injetado depois
- Nenhuma alegação de ganho financeiro específico não comprovado
- Se houver simulação de chat/atendimento, identificar sempre como "Assistente automatizado", nunca como uma pessoa física digitando ao vivo
- Escassez (vagas, prazos) deve vir marcada como [PLACEHOLDER] até ter dado real — nunca um número fixo inventado
- Sem depoimentos ou áudios fabricados — usar bloco [PLACEHOLDER — case do piloto] até existir um real

ACESSIBILIDADE E QUALIDADE
- Contraste AA mínimo, foco de teclado visível (outline 2px #C9A227)
- Sem animação além de fade/slide suave; respeitar prefers-reduced-motion
- HTML semântico, responsivo, sem frameworks externos (CSS puro + JS vanilla se precisar de interação)
```

---

## Prompt — Página 01 · `etapa-01.html` (Hook de Entrada)

```
Crie uma página HTML standalone chamada etapa-01.html para a primeira tela de um funil de captação B2B (venda de um pacote de automação de vendas para donos de clínicas de estética/spas/odontologia).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Sem botão de voltar (é a primeira tela)
- Barra de progresso: segmento 1 de 9 preenchido
- Eyebrow: "SPRINT 100K"
- Headline (Cormorant Garamond, grande): "Sua agenda cheia com 20 procedimentos confirmados em 30 dias."
  (destaque em dourado nas palavras "20 procedimentos confirmados")
- Subtexto: "Sem depender de indicação. Sem mensalidade de agência tradicional. Um sistema turnkey de tráfego, triagem e atendimento — com garantia de risco reverso."
- Pequeno selo/nota abaixo do texto: "2 min de leitura · sem compromisso"
- CTA fixo inferior: "Quero entender como funciona" → ao clicar, vai para etapa-02.html
- Elemento visual: um ornamento geométrico discreto (círculos finos concêntricos em dourado, baixa opacidade) ao fundo, sem poluir o texto

Sem contador de pessoas online, sem prova social nesta tela — o gancho é só a promessa + a garantia.
```

---

## Prompt — Página 02 · `etapa-02.html` (VSL / Vídeo)

```
Crie uma página HTML standalone chamada etapa-02.html — segunda tela do mesmo funil (arquivo etapa-01.html já existe e leva até aqui).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" no topo → etapa-01.html
- Barra de progresso: segmento 2 de 9 preenchido
- Eyebrow: "COMO FUNCIONA"
- Título: "O mecanismo por trás da garantia, em 90 segundos."
- Bloco de vídeo: moldura vertical (proporção 9:16), fundo em gradiente escuro sutil dentro do card claro, botão de play circular dourado no centro, com legenda abaixo em texto pequeno: "Vídeo institucional — substituir pelo arquivo final"
  (é um placeholder visual de player, não precisa embutir vídeo real)
- Citação em destaque abaixo do vídeo (itálico, borda esquerda dourada): "A maioria das agências cobra mensalidade e entrega cliques. Eu vou te mostrar como clínicas estão preenchendo a agenda com pacientes confirmados, em 30 dias, com garantia."
- CTA fixo inferior: "Ver como funciona na prática" → etapa-03.html

Sem indicador de "você já começou a assistir" nem manipulação de estado do player — isso é enganoso e não deve ser incluído.
```

---

## Prompt — Página 03 · `etapa-03.html` (Quebra de Crença)

```
Crie uma página HTML standalone chamada etapa-03.html — terceira tela do funil (chegando de etapa-02.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-02.html
- Barra de progresso: segmento 3 de 9 preenchido
- Eyebrow: "O QUE VOCÊ NÃO PRECISA"
- Título: "Nada disso é pré-requisito." (destaque em dourado na palavra "pré-requisito")
- Lista de 4 cards empilhados, cada um com um ícone de "x" discreto à esquerda (círculo com borda terracota) e o texto:
  1. "Contratar um vendedor"
  2. "Aprender a rodar Meta Ads"
  3. "Assinar mensalidade fixa de agência"
  4. "Depender só de indicação de pacientes"
- CTA fixo inferior: "Entender mais" → etapa-04.html
```

---

## Prompt — Página 04 · `etapa-04.html` (Comparação de Modelos)

```
Crie uma página HTML standalone chamada etapa-04.html — quarta tela do funil (chegando de etapa-03.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-03.html
- Barra de progresso: segmento 4 de 9 preenchido
- Eyebrow: "COMPARAÇÃO"
- Título: "Três formas de captar pacientes. Uma delas tem garantia."
- Três cards empilhados verticalmente (mobile-first), o terceiro visualmente destacado (borda dourada 2px, leve elevação):
  1. "Agência Tradicional" — lista: "Mensalidade fixa" / "Entrega cliques, não pacientes" / "Sem garantia de resultado" (marcadores "–" em cinza)
  2. "Freelancer Avulso" — lista: "Depende de uma única pessoa" / "Sem processo padronizado" / "Instável mês a mês" (marcadores "–" em cinza)
  3. "Sprint 100k" (destacado) — lista: "Preço fechado, sem mensalidade" / "20 procedimentos confirmados" / "Garantia de risco reverso" (marcadores "✓" em dourado)
- CTA fixo inferior: "Ver na prática" → etapa-05.html
```

---

## Prompt — Página 05 · `etapa-05.html` (Conversa Guiada / Chat)

```
Crie uma página HTML standalone chamada etapa-05.html — quinta tela do funil (chegando de etapa-04.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-04.html
- Barra de progresso: segmento 5 de 9 preenchido
- Eyebrow: "TIRE SUAS DÚVIDAS"
- Título: "Prefere perguntar direto?"
- Subtexto: "Nossa assistente automatizada qualifica sua clínica em menos de um minuto — e te conecta com a equipe de verdade em seguida."
- Card de chat (dentro do card branco padrão), com:
  - Cabeçalho do chat: ponto verde "online" + texto "Assistente Sprint 100k" (NUNCA usar nome de pessoa física ou foto de perfil real)
  - Aviso fixo abaixo do cabeçalho, fundo levemente dourado: "Atendimento inicial automatizado — nossa equipe assume a conversa a partir daqui."
  - Sequência de balões de mensagem (JS simples: revelar um a um com pequeno delay ao carregar a página), alternando lado esquerdo (assistente, fundo cinza claro) e lado direito (usuário, fundo dourado):
    1. Assistente: "Oi! Antes de mais nada: esse atendimento inicial é automatizado, mas te conecta direto com nossa equipe assim que você responder algumas perguntas rápidas. Pode ser?"
    2. Usuário: "Pode sim"
    3. Assistente: "Ótimo. Sua clínica já investe em tráfego pago hoje?"
    4. Usuário: "Ainda não, só indicação"
    5. Assistente: "Perfeito — é justamente o cenário onde o Sprint 100k costuma fazer mais diferença. Vou te passar pra equipe pra combinar os próximos passos."
- CTA fixo inferior: "Falar com a equipe no WhatsApp" → etapa-06.html (neste protótipo, mantenha como link interno; depois será substituído pelo link real do WhatsApp)
```

---

## Prompt — Página 06 · `etapa-06.html` (Prova Real)

```
Crie uma página HTML standalone chamada etapa-06.html — sexta tela do funil (chegando de etapa-05.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-05.html
- Barra de progresso: segmento 6 de 9 preenchido
- Eyebrow: "PROVA"
- Título: "O processo por trás da garantia"
- Badge pequeno ao lado do título, texto vermelho/terracota: "SUBSTITUIR APÓS O PILOTO"
- Card com borda tracejada dourada (indicando placeholder), contendo:
  - Rótulo pequeno: "Case em andamento"
  - Texto: "Estamos rodando o primeiro sprint agora. Assim que o resultado for confirmado, o depoimento real do cliente — com nome, clínica e números — substitui este bloco."
- Abaixo, 3 blocos numerados (01, 02, 03) lado a lado (empilhados no mobile) explicando o processo:
  1. "Setup completo de página, chatbot e tráfego na Semana 1."
  2. "Atendimento direto aos leads qualificados nas Semanas 2 a 4."
  3. "Entrega dos ativos e treinamento da equipe da clínica."
- CTA fixo inferior: "Continuar" → etapa-07.html
```

---

## Prompt — Página 07 · `etapa-07.html` (Antes / Depois)

```
Crie uma página HTML standalone chamada etapa-07.html — sétima tela do funil (chegando de etapa-06.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-06.html
- Barra de progresso: segmento 7 de 9 preenchido
- Eyebrow: "A MUDANÇA"
- Título: "O que muda na sua agenda."
- Dois cards empilhados:
  1. "Sem o sistema" (cabeçalho em cinza) — lista com marcador "×" terracota:
     "Agenda instável, dependente de indicação" / "Leads perdidos no WhatsApp" / "Tempo gasto respondendo curioso" / "Nenhum ativo digital próprio"
  2. "Com o sistema" (cabeçalho em dourado, borda do card dourada) — lista com marcador "✓" dourado:
     "Agenda previsível, com meta confirmada" / "Triagem automática qualifica antes de chegar até você" / "Equipe treinada para continuar sozinha" / "Página, chatbot e conta de anúncios ficam com a clínica"
- CTA fixo inferior: "Continuar" → etapa-08.html
```

---

## Prompt — Página 08 · `etapa-08.html` (Capacidade / Escassez Real)

```
Crie uma página HTML standalone chamada etapa-08.html — oitava tela do funil (chegando de etapa-07.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-07.html
- Barra de progresso: segmento 8 de 9 preenchido
- Eyebrow: "CAPACIDADE"
- Título: "Vagas limitadas — de propósito."
- Elemento central: um mostrador circular (SVG), traço fino, estilo "dial" geométrico (não um contador digital genérico), mostrando "[X]/[Y]" no centro e o rótulo "vagas abertas" abaixo — os números X e Y devem ficar como variáveis/placeholder claramente marcadas para preenchimento posterior, não fixas
- Texto abaixo do dial: "Rodamos no máximo [N] sprints simultâneos por mês para manter a qualidade da garantia — cada cliente recebe atendimento direto, não terceirizado."
- Linha final: "Próxima janela de abertura:" seguido de badge "[DATA]" em destaque terracota (placeholder)
- CTA fixo inferior: "Ver a oferta" → etapa-09.html

Importante: os números de vaga e a data são placeholders de verdade (não invente um valor definitivo) — sinalize visualmente que são campos a preencher.
```

---

## Prompt — Página 09 · `etapa-09.html` (Oferta, Garantia e Preço)

```
Crie uma página HTML standalone chamada etapa-09.html — nona e última tela do funil (chegando de etapa-08.html).

[COLE AQUI O BLOCO "SISTEMA DE DESIGN" ACIMA]

CONTEÚDO DESTA PÁGINA:
- Botão "Voltar" → etapa-08.html
- Barra de progresso: segmento 9 de 9 preenchido (completo)
- Eyebrow: "A OFERTA"
- Título: "Dois jeitos de começar."
- Dois cards de plano empilhados (mobile-first):
  1. "Implementação" — preço "R$ 7.000 /projeto" — lista: "Landing page de alta velocidade" / "Chatbot de triagem no WhatsApp" / "Setup de tráfego pago local" / "Garantia de 20 clientes confirmados" — botão secundário "Quero o Plano Implementação"
  2. "Implementação + Acompanhamento" (destacado, borda dourada, badge "Recomendado" no canto) — preço "R$ 7.000 + acompanhamento" — lista: "Tudo do plano Implementação" / "Inside sales conduzido pela nossa equipe" / "Ajustes semanais de campanha" / "Treinamento completo da recepção" — botão primário "Quero o Plano Completo"
- Bloco de garantia (ícone de escudo simples em SVG, dourado): título "Garantia de risco reverso" + texto "Se não confirmarmos os 20 procedimentos combinados no prazo, continuamos operando sem custo de serviço adicional até atingir a meta — respeitadas as condições da clínica descritas em contrato."
- FAQ em acordeão (usar <details>/<summary>) com 3 perguntas:
  1. "Como funciona a garantia na prática?" → resposta sobre o que conta como conversão e que as regras completas ficam em contrato
  2. "O que está incluso no valor?" → resposta listando os entregáveis
  3. "Quanto tempo até os primeiros resultados?" → resposta sobre setup na semana 1 e atendimento a partir daí
- CTA fixo inferior: "Falar com a equipe no WhatsApp" (link placeholder, a ser substituído pelo número real)
- Sem botão de "próxima etapa" — é o fim do funil

Sem preço "de/por" riscado, a menos que o valor cheio já tenha sido cobrado de um cliente real antes — não incluir ancoragem de preço fabricada.
```
