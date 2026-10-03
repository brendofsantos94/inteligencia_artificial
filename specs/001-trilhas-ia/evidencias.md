# Evidências da implementação

Validação técnica executada nesta sessão, 2026-10-02. As metas pedagógicas não foram medidas.

## Regras e estado

14 testes em tests/state.test.cjs, 14 aprovados, zero falhas. Incluem 256 combinações pontuáveis
com nove variações diagnósticas: 2.304 vetores. Todos aplicam total >=5 e críticos >=2;
as diagnósticas não alteram classificação. Cobertos estado parcial, integridade, permissões,
limiar dos desafios, espaços rejeitados, versão futura preservada, JSON corrompido,
falha de armazenamento e migração sintética sem autoria inventada.
T050 acrescenta resultado v1 sem texto com preservação dos módulos.

## Jornadas no navegador

12 grupos de testes em tests/browser.cjs, todos aprovados no Chrome headless; zero erros de página.
Registro estruturado: qa/browser-results.json. Testes efetivamente cobrem:

- Início e links sob subdiretório, primeiro foco por teclado.
- Dez questões, avanço vazio bloqueado, recarga, edição, diagnósticas neutras e refazer condicionado.
- Duas trilhas com cinco módulos, futuro bloqueado, erro específico, nova tentativa, feedback
  presente após 850 ms e avanço somente pelo botão Continuar.
- Rascunhos após recarga, reprovação com explicações, produção sem espaços e resultado permanente.
- Convite Usuário preservado no início, revisão de módulos e conclusão sem nova submissão.
- Texto com marcação HTML exibido como texto, sem execução.
- Reinício cancelado mantém estado; confirmado limpa só ia-para-aprender e preserva outra chave.
- Acesso direto bloqueado, recuperação de estado corrompido e getter localStorage indisponível.
- Jornada completa até Usuário/conclusão usando Tab, setas, Espaço e Enter, com foco nos títulos.
- Cinco páginas em 320 px e CSS zoom 200% em viewport 640 px, sem transbordamento horizontal.
- Alvos habilitados de botões, links de ação e rótulos >=44 px nas telas examinadas.

## Visual e contraste

Inspecionadas capturas de início desktop, cinco páginas mobile e feedback correto/incorreto.
Sem sobreposição, cortes de conteúdo ou ações inacessíveis nos estados examinados.
qa/contrast-results.json registra sete pares de texto; menor razão medida: 6,35:1.
Contraste de borda de controles em branco >=3:1; foco possui contraste >=3:1.
Conteúdo usa dez módulos e dois desafios, todos com objetivo, etapa e habilidade curricular.
Não há fetch, XMLHttpRequest, innerHTML, temporizadores de avanço ou localStorage.clear na aplicação.

## Limites e aceite pendente

- SC-001, SC-003, SC-004 e SC-005: pendentes; nenhum estudante observado, nenhum percentual obtido.
- SC-007: presença técnica dos metadados confirmada; adequação e aprovação curricular pendentes.
- SC-009: teclado, dimensões e contraste dos estados amostrados verificados. Zoom nativo de
  navegador, leitores de tela reais e auditoria completa de todos os estados ainda requerem
  validação manual. CSS zoom equivalente não é evidência de Ctrl+ no navegador.
- Migração v1: validada apenas para envelope reconstruído em data-model.md com fixtures sintéticas.
  Não demonstra compatibilidade com a versão original desconhecida nem todas as chaves legadas.
- Páginas originais não fornecidas: não há comparação visual ou comportamental com o original.
- Ratificação da constituição, revisão de BNCC e rubrica dependem do responsável em T049.

T039–T048 e T050 representam trabalho técnico executado; T049 não está concluída.
