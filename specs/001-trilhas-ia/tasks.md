# Tasks: IA para Aprender

Input: spec.md, plan.md, data-model.md, contracts/contrato-interface.md e quickstart.md.
Testes são solicitados pelo anexo. Organização por fundamentos, histórias e validação.

## Histórico preservado
T001 a T038 são IDs reservados do histórico citado, cujas descrições e marcadores originais
não foram entregues. Não são recriados nem declarados concluídos. Ver docs/documento-base.txt.

| ID histórico | Situação |
| --- | --- |
| T001 | Não fornecido; reservado |
| T002 | Não fornecido; reservado |
| T003 | Não fornecido; reservado |
| T004 | Não fornecido; reservado |
| T005 | Não fornecido; reservado |
| T006 | Não fornecido; reservado |
| T007 | Não fornecido; reservado |
| T008 | Não fornecido; reservado |
| T009 | Não fornecido; reservado |
| T010 | Não fornecido; reservado |
| T011 | Não fornecido; reservado |
| T012 | Não fornecido; reservado |
| T013 | Não fornecido; reservado |
| T014 | Não fornecido; reservado |
| T015 | Não fornecido; reservado |
| T016 | Não fornecido; reservado |
| T017 | Não fornecido; reservado |
| T018 | Não fornecido; reservado |
| T019 | Não fornecido; reservado |
| T020 | Não fornecido; reservado |
| T021 | Não fornecido; reservado |
| T022 | Não fornecido; reservado |
| T023 | Não fornecido; reservado |
| T024 | Não fornecido; reservado |
| T025 | Não fornecido; reservado |
| T026 | Não fornecido; reservado |
| T027 | Não fornecido; reservado |
| T028 | Não fornecido; reservado |
| T029 | Não fornecido; reservado |
| T030 | Não fornecido; reservado |
| T031 | Não fornecido; reservado |
| T032 | Não fornecido; reservado |
| T033 | Não fornecido; reservado |
| T034 | Não fornecido; reservado |
| T035 | Não fornecido; reservado |
| T036 | Não fornecido; reservado |
| T037 | Não fornecido; reservado |
| T038 | Não fornecido; reservado |

## Phase 1: Setup

- [x] T039 Organizar constituição, spec, plan, paginas e rastreabilidade em specs/001-trilhas-ia/. Cobertura: governança e todas as histórias.

## Phase 2: Foundational

- [x] T040 Implementar persistência com aviso de memória limitada em implementacao/js/storage.js. Cobertura: FR-024.
- [x] T041 Validar estado, perfil derivado, sequência e acesso em implementacao/js/storage.js; dez respostas inteiros/null, posição 0–9, completed 0–5. Cobertura: FR-004, FR-004a, FR-005, FR-006, FR-007, FR-019a, FR-019b, FR-033.

## Phase 3: US2 e US4 — feedback e revisão

- [x] T042 [US2] Implementar feedback específico e persistente em implementacao/js/data.js e implementacao/js/trilhas.js; também atende US3. Cobertura: FR-012, FR-013, FR-014, FR-020, FR-035.
- [x] T043 [US4] Implementar revisão, resultado permanente, convite e reinício confirmado em implementacao/js/trilhas.js e implementacao/js/conclusao.js. Cobertura: FR-017, FR-018, FR-019, FR-019a, FR-019b, FR-025, FR-029.

## Phase 4: US5, US2 e US3 — entrada e conteúdos

- [x] T044 [US5] Construir cinco HTML e conteúdo das duas trilhas em implementacao/js/data.js; metadados e criação nos desafios; também atende US2/US3. Cobertura: FR-009, FR-010, FR-011, FR-015, FR-016, FR-020, FR-021, FR-022, FR-023, FR-026, FR-027, FR-028, FR-030, FR-034.

## Phase 5: US3 e US2 — produção recuperável

- [x] T045 [US3] Salvar rascunhos e resultados e migrar v1 reconstruído em implementacao/js/storage.js e implementacao/js/trilhas.js; textos strings <=4000, trim() não vazio; também US2. Cobertura: FR-024, FR-027, FR-028, FR-029, FR-034.

## Phase 6: US1 — nivelamento e rubrica

- [x] T046 [US1] Construir nivelamento e rubrica em implementacao/js/nivelamento.js e implementacao/js/trilhas.js; diagnósticas neutras, dois limites, dez questões e refazer condicionado. Cobertura: FR-001, FR-002, FR-003, FR-004, FR-004a, FR-005, FR-006, FR-007, FR-008, FR-008a, FR-028.

## Phase 7: Polish e validação

- [x] T047 Implementar foco, mensagens, contraste e responsividade em implementacao/css/style.css e implementacao/js/*.js. Cobertura: FR-031, FR-032, FR-035.
- [x] T048 Executar tests/state.test.cjs e tests/browser.cjs; registrar casos e limitações em specs/001-trilhas-ia/evidencias.md. Cobertura: SC-002, SC-006, SC-007, SC-008, SC-009.
- [ ] T049 Revisar currículo e rubrica e observar >=10 estudantes segundo specs/001-trilhas-ia/quickstart.md; registrar aprovação e métricas em specs/001-trilhas-ia/avaliacao-pedagogica.md. Cobertura: FR-022, SC-001, SC-003, SC-004, SC-005, SC-007.

## Dependencies & Execution Order
T039 → T040 → T041 → T042 → T043 → T044 → T045 → T046 → T047 → T048 → T049.
Nenhuma tarefa paralela: arquivos compartilhados. Plano completo solicitado; MVP isolado é US1
com entrada e fundamentos. US2/US3 dependem de diagnóstico ou fixture válida para teste independente.
Testes independentes das cinco histórias estão em spec.md e quickstart.md.
T049 depende de responsável pedagógico e estudantes; código e testes técnicos não encerram essa tarefa.


## Phase 8: Convergence

- [x] T050 Preservar módulos válidos na migração v1 quando result existe sem textos em implementacao/js/storage.js e cobrir com tests/state.test.cjs, conforme FR-024, FR-034 e plan: migração (partial, HIGH).

