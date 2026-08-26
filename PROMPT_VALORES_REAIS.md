# Prompt de Edição — Substituir por Valores Reais de Pesquisa

## Como usar
Cole no seu agente junto com o arquivo atual da página (a versão mais recente que você já tem rodando). Este prompt substitui números fabricados por dados reais de pesquisa de mercado (2026) e por benchmarks de estudos do setor, devidamente atribuídos.

---

```
Atualize a página de oferta com os seguintes números reais, substituindo qualquer estatística ou preço fabricado que ainda esteja no arquivo.

=====================================================
1. SEÇÃO "POR QUE NÃO CONTRATAR CADA PARTE SEPARADA"
=====================================================
Substitua o conteúdo desta seção (mantendo a estrutura de .card e .plain-list já usada) pelo seguinte, com estes dados reais de pesquisa de mercado 2026:

Título: "Contratar cada parte separada custa o mesmo — ou mais — sem ninguém responder pelo conjunto"

Texto de abertura: "Levantamos o preço médio de mercado de cada frente que compõe a Sprint 100k. A conta não fecha a seu favor contratando separado — e ainda sobra a coordenação de cinco profissionais que nunca trabalharam juntos."

Tabela ou lista (usar o padrão visual de .offer-item):
- Página de alta conversão (design + copy): R$500 a R$7.100 — valor de mercado 2026
- Chatbot de automação WhatsApp (setup + 45 dias de plataforma): a partir de R$650
- Gestão de tráfego pago (fee, 45 dias, pequena empresa): a partir de R$900/ciclo
- Inside sales dedicado (referência salarial de mercado, 45 dias): R$5.250 a R$10.500
- Treinamento da equipe: a partir de R$997 (investimento médio de capacitação por colaborador no Brasil)

Linha de total (estilo .offer-total):
"Total mínimo contratando separado: a partir de R$8.297 — já maior que o valor do Sprint 100k, considerando só os pisos de mercado."

Nota de rodapé (estilo .roi-note): "Valores de referência de mercado brasileiro, 2026 (pesquisa de preços em plataformas de freelancer, agências de tráfego pago, provedores de automação WhatsApp e salários de SDR/inside sales). Não incluem o tempo de coordenação entre profissionais nem o risco de cada um trabalhar de forma desalinhada."

Fechamento da seção: "Na Sprint 100k, essas cinco frentes saem de um único responsável, com garantia sobre o conjunto — não just cada parte isolada."

=====================================================
2. SEÇÃO "AGITAÇÃO" (você não perde pacientes por falta de habilidade...)
=====================================================
Mantenha a dor específica de cada bloco (já está boa e sem fabricação), mas se quiser reforçar com dado real, adicione UMA linha com estatística citada nos blocos I ou III — nunca apresentando como resultado da Sprint 100k:

Bloco I (sobre demora no atendimento) pode incluir: "Segundo estudo do MIT/InsideSales.com, com mais de 15 mil leads analisados, a chance de qualificar um lead cai até 21 vezes quando o contato demora mais de 30 minutos."

Bloco III (sobre processo de vendas) pode incluir: "Dados da Forrester (2024) mostram que a taxa média de conversão de lead para cliente em operações B2B fica entre 1% e 5% — e chega a 8-10% só nas equipes mais bem estruturadas."

Use no máximo uma estatística por bloco, sempre com a fonte citada na própria frase (não em nota de rodapé separada) — isso deixa claro que não é alegação sobre a Sprint 100k.

=====================================================
3. SEÇÃO "MÉTODO" (Três etapas...)
=====================================================
Mantém o texto já corrigido (sem os "reduz 50%", "3x", "70% mais vendas" antigos). Se quiser adicionar um dado real na Etapa 02 (Triagem 24/7), pode incluir: "Estudos do setor mostram que 78% dos compradores tendem a fechar com a empresa que responde primeiro (HubSpot)." — sempre como dado do setor, não como resultado interno.

=====================================================
REGRAS QUE CONTINUAM VALENDO
=====================================================
- Toda estatística de performance precisa ter fonte citada na mesma frase (ex.: "segundo estudo X", "dados da Y").
- Nenhum número pode ser atribuído a "clientes da Sprint 100k" ou "clínicas parceiras" — o piloto ainda não terminou.
- A garantia continua sendo "20 pacientes confirmados (agendados e realizados)", nunca valor de faturamento.
- O bloco de simulação de ROI (com ticket médio de R$1.000 → R$20.000 de faturamento potencial) continua como está, rotulado como simulação.
- Se o agente quiser adicionar qualquer outro dado de mercado além dos listados aqui, ele deve vir acompanhado da fonte — não invente números "parecidos" com os de pesquisa.
```
