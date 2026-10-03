# Pesquisa e decisões

## Cinco documentos e memória
Decisão: servir na mesma origem HTTP. Racional: localStorage é comum na origem; file:// não
garante compartilhamento. Alternativas: página única contrariaria a estrutura; backend excederia escopo.
Fonte: [HTML Standard Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html).

## Falhas e limpeza
Decisão: proteger getter, leitura, JSON, gravação e remoção; avisar de forma persistente e usar
memória apenas na página atual. Não usar clear(). Alternativas: sessionStorage também pode falhar;
exportação/importação não é requisito e não será acrescentada. Não prometer retomada entre documentos.

## Migração
Decisão: contrato v1 reconstruído, validado e testado com fixture sintética. Racional: faltam código
e amostra reais. Nenhuma pontuação ou autoria será inventada. Versão futura não é sobrescrita;
estado inconsistente recebe percurso seguro e aviso. Compatibilidade histórica real permanece não demonstrada.

## Acessibilidade
Decisão: controles nativos, fieldsets, rótulos grandes, foco visível, região status e foco no título
após transição. Alternativa de avanço automático viola feedback persistente.
Fontes: [Mensagens de status](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
e [Foco visível](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

Pesquisa técnica delegada por instrução da skill speckit-plan. Nenhuma aprovação BNCC efetuada.
