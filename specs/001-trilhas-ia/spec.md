# Feature Specification: IA para Aprender

**Feature Branch**: sem Git no workspace; contexto `001-trilhas-ia`

**Created**: 2026-10-02

**Status**: pronta para planejamento; aceite pedagógico pendente

**Input**: pedido de executar o ciclo Spec Kit com base em Reconstrucao_do_Spec_Kit_IA_para_Aprender.docx.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nivelamento (Priority: P1)

Receber recomendação que considera conhecimento e pensamento crítico.

**Why this priority**: viabiliza o percurso individual para Ensino Médio.

**Independent Test**: Responder dez questões; 5/2 e 8/3 recomendam Usuário; 5/1 e 4/3 recomendam Explorador. Diagnósticas não alteram os totais.

**Acceptance Scenarios**:

1. Dado diagnóstico parcial, ao retornar, respostas e posição são recuperadas quando a memória está disponível.
2. Dada resposta anterior, ao editá-la antes de finalizar, somente a versão mais recente entra no cálculo.
3. Dado resultado sem trilha iniciada, refazer exige confirmação; após iniciar, refazer fica bloqueado.

### User Story 2 - Explorador (Priority: P1)

Compreender IA, reconhecer limites e verificar evidências.

**Why this priority**: viabiliza o percurso individual para Ensino Médio.

**Independent Test**: Concluir cinco módulos em sequência e quatro decisões do desafio; três acertos e síntese não vazia liberam Usuário.

**Acceptance Scenarios**:

1. Dado erro numa atividade, recebe explicação da alternativa e pode tentar novamente.
2. Dado acerto, feedback permanece até Continuar; módulo futuro permanece bloqueado.
3. Dado desafio aprovado, voltar mostra resultado, produção e convite para Usuário, sem nova submissão.

### User Story 3 - Usuário (Priority: P1)

Estudar com IA e produzir com autoria.

**Why this priority**: viabiliza o percurso individual para Ensino Médio.

**Independent Test**: Concluir cinco módulos e desafio de cinco decisões com três acertos, cinco textos e rubrica de autoavaliação.

**Acceptance Scenarios**:

1. Dado rascunho, recarregar recupera textos quando o salvamento funciona.
2. Dada estratégia preenchida, recebe confirmação de envio sem afirmar qualidade semântica.
3. Dado desafio aprovado, a conclusão é liberada e o resultado permanece disponível.

### User Story 4 - Progressão (Priority: P2)

Saber onde está, revisar e preservar aprendizagem.

**Why this priority**: viabiliza o percurso individual para Ensino Médio.

**Independent Test**: Revisar módulos concluídos, bloquear acesso futuro e reiniciar somente ao final.

**Acceptance Scenarios**:

1. Dado acesso direto bloqueado, encaminhar à etapa permitida sem mudar progresso.
2. Dado reinício cancelado, preservar todas as produções; confirmado, apagar somente este projeto.
3. Dada memória indisponível, avisar que recarga ou outra página não conserva continuidade temporária.

### User Story 5 - Entrada (Priority: P1)

Entender proposta, público e cuidados antes de começar.

**Why this priority**: viabiliza o percurso individual para Ensino Médio.

**Independent Test**: Acessar início por teclado, identificar duas trilhas e iniciar sem cadastro.

**Acceptance Scenarios**:

1. Dado retorno ao início, a ação Retomar preserva os dados.
2. Dada tela de 320 px ou zoom 200%, todas as ações e textos ficam disponíveis.

### Edge Cases

- Sem resposta: não avançar; explicar pendência. Texto só de espaços: não aprovar envio.
- Última resposta alterada: recalcular antes de finalizar; não antecipar gabarito.
- Estado corrompido: recuperar somente um percurso coerente e avisar reinício seguro.
- Falha de memória: interação atual continua, mas mudança de página ou recarga pode perder dados.
- Migração sem produção legada: não inventar texto nem resultado; requerer novo desafio.
- Desafio reprovado: manter rascunho e explicações; revisão disponível e nova tentativa.
- Perfil Usuário pode pular Explorador; conclusão depende somente de Usuário concluída.
- Nenhuma trilha em andamento pode ser zerada por navegação, revisão ou retorno ao início.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: O sistema deve permitir que estudantes iniciem o nivelamento e o refaçam somente após receberem a recomendação e antes de iniciarem a trilha recomendada.
- **FR-002**: O sistema deve apresentar um nivelamento com exatamente 10 questões, uma por vez.
- **FR-003**: O sistema deve identificar as duas primeiras questões como diagnósticas e excluí-las da pontuação de classificação.
- **FR-004**: O sistema deve registrar as respostas do nivelamento, permitir retomá-lo após interrupção e permitir ao estudante avançar e voltar livremente entre questões já respondidas.
- **FR-004a**: Até a finalização do nivelamento, o sistema deve permitir alterar qualquer resposta registrada e deve usar apenas a versão mais recente de cada resposta no cálculo da classificação.
- **FR-005**: O sistema deve calcular uma pontuação de 0 a 8 usando as oito questões pontuáveis.
- **FR-006**: O sistema deve avaliar três questões específicas de pensamento crítico.
- **FR-007**: O sistema deve classificar o estudante como Usuário somente se obtiver pelo menos 5 pontos e ao menos 2 acertos nas questões de pensamento crítico; nos demais casos, deve classificá-lo como Explorador.
- **FR-008**: O sistema deve apresentar o perfil obtido, uma explicação compreensível da recomendação, a trilha correspondente, acerto ou erro das oito questões pontuáveis e as duas respostas diagnósticas identificadas como não pontuáveis, sem gabarito de hábitos pessoais.
- **FR-008a**: Antes da finalização das 10 questões, o sistema deve não indicar acerto ou erro das respostas do nivelamento.
- **FR-009**: O sistema deve organizar as trilhas Explorador e Usuário em exatamente cinco módulos cada, com objetivo de aprendizagem explícito para cada módulo.
- **FR-010**: A trilha Explorador deve abranger conceito e exemplos de IA, geração por padrões, limitações e erros, verificação pelo método V-E-R e uso responsável.
- **FR-011**: A trilha Usuário deve abranger uso da IA para aprender, formulação de solicitações, IA como tutora, verificação e produção com autoria.
- **FR-012**: O sistema deve oferecer ao menos uma atividade em cada módulo e apresentar uma atividade por vez.
- **FR-013**: As atividades deve priorizar situações-problema, tomada de decisão, comparação, identificação de erros, reflexão ou aplicação prática; não podem se basear exclusivamente em memorização.
- **FR-014**: Toda atividade deve apresentar feedback imediato e formativo para respostas corretas e incorretas, incluindo oportunidade de nova tentativa após erro; o texto deve permanecer disponível até uma ação explícita do estudante e explicar o conceito ou evidência da alternativa.
- **FR-015**: O sistema deve incluir um desafio final na trilha Explorador que avalie a análise crítica de uma resposta simulada de IA.
- **FR-016**: O sistema deve incluir um desafio final na trilha Usuário que exija uma estratégia de estudo com solicitação para aprender, exemplos, teste de conhecimentos, verificação e produção própria.
- **FR-017**: O sistema deve liberar Usuário após o desafio Explorador e oferecer iniciar agora ou voltar ao início sem perder a liberação; o convite deve continuar disponível ao retornar.
- **FR-018**: O sistema deve apresentar a conclusão do percurso após o desafio da trilha Usuário.
- **FR-019**: O sistema deve mostrar posição e próximo passo no nivelamento; trilha, módulo atual, módulos concluídos, objetivo e próximo passo nas trilhas; e síntese de término na conclusão.
- **FR-019a**: Em cada trilha, o sistema deve liberar o próximo módulo somente após a conclusão do módulo atual e deve manter os módulos concluídos disponíveis para revisão.
- **FR-019b**: Após iniciada, uma trilha deve não poder ser reiniciada e o progresso do estudante deve ser preservado, exceto no reinício global confirmado após concluir o percurso (FR-025).
- **FR-020**: O sistema deve deixar claro que IA não é fonte automaticamente confiável e incorporar práticas de verificação nas duas trilhas.
- **FR-021**: O sistema deve incentivar privacidade, cuidado com dados pessoais, responsabilidade e respeito à autoria, sem solicitar dados pessoais não necessários à experiência.
- **FR-022**: O sistema deve alinhar cada atividade a um objetivo de aprendizagem, a uma etapa da progressão pedagógica e a uma habilidade da BNCC Computação previamente definida e aprovada para o projeto; conteúdo sem essa identificação não pode ser incluído na trilha.
- **FR-023**: O sistema deve evitar IA conversacional para estudantes, correção automática por IA, atribuição de notas, avaliações formais, rankings e comparação entre estudantes nesta versão.
- **FR-024**: O progresso deve ser recuperado após recarga quando o armazenamento estiver disponível. Estado inconsistente deve iniciar um percurso seguro. Falha de leitura ou gravação deve gerar aviso textual que explique os limites da retomada; a continuidade temporária não pode prometer salvamento.
- **FR-025**: Somente após concluir Usuário, o estudante deve poder reiniciar todo o percurso mediante confirmação. Cancelar deve preservar os dados; confirmar deve limpar somente o progresso deste projeto e retornar ao nivelamento inicial.
- **FR-026**: A entrada deve apresentar propósito, público Ensino Médio, duas trilhas, cuidados com dados e autoria e uma ação clara para iniciar o nivelamento, sem cadastro obrigatório.
- **FR-027**: O desafio Explorador deve exigir respostas às quatro questões e pelo menos três acertos. A devolutiva deve explicar cada decisão, permitir revisão após reprovação e incluir uma síntese própria não vazia do estudante sobre o que verificaria antes de usar a resposta simulada; texto só de espaços não atende ao preenchimento. A síntese é formativa, sem nota ou correção por IA.
- **FR-028**: O desafio Usuário deve exigir respostas às cinco questões, pelo menos três acertos e os cinco campos de estratégia preenchidos com texto não vazio. deve apresentar uma rubrica de autoavaliação: tema e objetivo; exemplo relacionado; teste com raciocínio próprio; fonte e comparação; produto e decisões autorais. Preenchimento não equivale a aprovação da qualidade pedagógica.
- **FR-029**: Após desafio concluído, retornar à trilha deve mostrar o resultado de conclusão e a ação seguinte sem exigir nova submissão; módulos concluídos deve continuar disponíveis para revisão.
- **FR-030**: O percurso deve evidenciar Conhecer → Compreender → Questionar → Verificar → Aprender → Criar, com a criação nos desafios. Cada desafio deve exibir objetivo, etapa e habilidade BNCC, assim como as atividades dos módulos.
- **FR-031**: Toda jornada deve funcionar por teclado, com foco visível, alternativas agrupadas e mensagens textuais. Após troca de questão, resultado, módulo ou desafio, o foco deve alcançar um título ou resumo correspondente; feedback deve ser anunciado sem avanço automático.
- **FR-032**: Texto comum deve ter contraste mínimo de 4,5:1; texto grande, 3:1; componentes e indicadores essenciais, 3:1. A interface deve funcionar em 320 px e zoom de 200%, sem perda de conteúdo ou ações; alvos de interação deve medir ao menos 44 × 44 px, incluindo área de rótulos.
- **FR-033**: Acesso direto a uma etapa bloqueada deve encaminhar à etapa permitida sem alterar progresso. Estado finalizado, perfil, pontuação e sequência de módulos deve ser coerentes.
- **FR-034**: Novos campos autorais deve orientar a não incluir dados pessoais e deve ser usados apenas nesta experiência. Rascunhos deve ser retomáveis quando o salvamento estiver disponível; nenhuma produção deve ser enviada a serviço externo ou avaliada automaticamente por IA.
- **FR-035**: Explicações e devolutivas deve usar de uma a três frases curtas por decisão, indicar a evidência ou conceito aplicável e orientar o próximo passo. Imagens informativas futuras deve ter descrição equivalente; imagens decorativas deve ser ignoráveis por tecnologias assistivas.

### Key Entities

- Diagnóstico: dez respostas, posição, finalização, perfil e totais derivados.
- Módulo: objetivo, etapa, habilidade, explicação, exemplo, decisão e devolutivas.
- Progresso: trilhas iniciadas e sequência de módulos concluídos.
- Desafio: decisões, produção própria, rascunho e resultado verificável.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Pelo menos 90% dos estudantes de teste conseguem iniciar, responder e concluir as 10 questões do nivelamento sem ajuda externa em até 12 minutos.
- **SC-002**: Em testes com casos de respostas predeterminados, 100% das classificações aplicam corretamente os dois critérios: mínimo de 5 pontos e mínimo de 2 acertos críticos.
- **SC-003**: Pelo menos 85% dos estudantes de teste identificam, ao final da trilha Explorador, ao menos três dos quatro elementos solicitados na análise da resposta simulada de IA.
- **SC-004**: Pelo menos 80% dos estudantes de teste que concluem a trilha Usuário entregam uma estratégia contendo os cinco elementos obrigatórios do desafio, após no máximo uma revisão guiada.
- **SC-005**: Pelo menos 90% dos estudantes de teste conseguem informar sua etapa atual e o próximo passo ao serem consultados durante qualquer módulo.
- **SC-006**: Nenhuma tela da versão inicial exibe notas, rankings, comparações entre estudantes ou funcionalidade de conversa livre com IA.
- **SC-007**: Em todos os dez módulos e dois desafios, a revisão encontra objetivo, etapa pedagógica e habilidade curricular; a sequência completa inclui uma produção do estudante em cada trilha.
- **SC-008**: Todos os cenários de retomada, acesso direto, revisão após desafio e cancelamento do reinício passam sem perda silenciosa de progresso, quando o salvamento está disponível.
- **SC-009**: As cinco páginas e suas ações podem ser usadas por teclado e em 320 px e zoom de 200%; os contrastes e alvos de interação atendem FR-032 em todos os estados habilitados.

## Assumptions

- Conteúdo e comportamento são reconstruídos do anexo; páginas originais não foram fornecidas.
- Histórico de tarefas e decisões anteriores é citado pelo documento, não observado localmente.
- Mapeamento EM13CO10/EM13CO08 provém do anexo; sua aprovação permanece pendente em T049.
- Produções permanecem no navegador. Não há conta, painel docente, sincronização, certificado,
  conversa livre com IA, notas escolares, ranking ou correção automática de qualidade textual.
- Avaliar ao menos dez estudantes sem identificação para SC-001/003/004/005; metas não são resultados.

## Clarifications

### Session 2026-10-02

Não foram necessárias perguntas: regras de alto impacto estão respondidas no documento.

| Decisão | Origem |
| --- | --- |
| Editar e voltar até finalizar, sem gabarito antecipado | Histórica relatada no anexo |
| Refazer somente após resultado e antes da trilha | Histórica relatada no anexo |
| Quatro decisões obrigatórias, três acertos e síntese na Explorador | Regra consolidada e correção proposta no anexo |
| Reinício global somente após Usuário | Comportamento relatado no anexo |
| Diagnósticas neutras e feedback persistente | Correções propostas no anexo |
| Revisão e resultados recuperáveis | Requisitos consolidados no anexo |
| Aprovação pedagógica e data de ratificação | Pendentes; nenhuma confirmação inventada |
