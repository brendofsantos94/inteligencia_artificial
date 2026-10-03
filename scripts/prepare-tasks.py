from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]; base=root/'specs/001-trilhas-ia'
groups={
'T040':['FR-024'],
'T041':['FR-004','FR-004a','FR-005','FR-006','FR-007','FR-019a','FR-019b','FR-033'],
'T042':['FR-012','FR-013','FR-014','FR-020','FR-035'],
'T043':['FR-017','FR-018','FR-019','FR-019a','FR-019b','FR-025','FR-029'],
'T044':['FR-009','FR-010','FR-011','FR-015','FR-016','FR-020','FR-021','FR-022','FR-023','FR-026','FR-027','FR-028','FR-030','FR-034'],
'T045':['FR-024','FR-027','FR-028','FR-029','FR-034'],
'T046':['FR-001','FR-002','FR-003','FR-004','FR-004a','FR-005','FR-006','FR-007','FR-008','FR-008a','FR-028'],
'T047':['FR-031','FR-032','FR-035'],
'T048':['SC-002','SC-006','SC-007','SC-008','SC-009'],
'T049':['FR-022','SC-001','SC-003','SC-004','SC-005','SC-007']}
tasks=[
('T039','','Organizar constituição, spec, plan, paginas e rastreabilidade em specs/001-trilhas-ia/.'),
('T040','','Implementar persistência com aviso de memória limitada em implementacao/js/storage.js.'),
('T041','','Validar estado, perfil derivado, sequência e acesso em implementacao/js/storage.js; dez respostas inteiros/null, posição 0–9, completed 0–5.'),
('T042','US2','Implementar feedback específico e persistente em implementacao/js/data.js e implementacao/js/trilhas.js; também atende US3.'),
('T043','US4','Implementar revisão, resultado permanente, convite e reinício confirmado em implementacao/js/trilhas.js e implementacao/js/conclusao.js.'),
('T044','US5','Construir cinco HTML e conteúdo das duas trilhas em implementacao/js/data.js; metadados e criação nos desafios; também atende US2/US3.'),
('T045','US3','Salvar rascunhos e resultados e migrar v1 reconstruído em implementacao/js/storage.js e implementacao/js/trilhas.js; textos strings <=4000, trim() não vazio; também US2.'),
('T046','US1','Construir nivelamento e rubrica em implementacao/js/nivelamento.js e implementacao/js/trilhas.js; diagnósticas neutras, dois limites, dez questões e refazer condicionado.'),
('T047','','Implementar foco, mensagens, contraste e responsividade em implementacao/css/style.css e implementacao/js/*.js.'),
('T048','','Executar tests/state.test.cjs e tests/browser.cjs; registrar casos e limitações em specs/001-trilhas-ia/evidencias.md.'),
('T049','','Revisar currículo e rubrica e observar >=10 estudantes segundo specs/001-trilhas-ia/quickstart.md; registrar aprovação e métricas em specs/001-trilhas-ia/avaliacao-pedagogica.md.')]
text='''# Tasks: IA para Aprender

Input: spec.md, plan.md, data-model.md, contracts/contrato-interface.md e quickstart.md.
Testes são solicitados pelo anexo. Organização por fundamentos, histórias e validação.

## Histórico preservado
T001 a T038 são IDs reservados do histórico citado, cujas descrições e marcadores originais
não foram entregues. Não são recriados nem declarados concluídos. Ver docs/documento-base.txt.
'''
text+='\n| ID histórico | Situação |\n| --- | --- |\n'
text+='\n'.join(f'| T{i:03} | Não fornecido; reservado |' for i in range(1,39))+'\n'
phases={'T039':'Phase 1: Setup','T040':'Phase 2: Foundational','T042':'Phase 3: US2 e US4 — feedback e revisão','T044':'Phase 4: US5, US2 e US3 — entrada e conteúdos','T045':'Phase 5: US3 e US2 — produção recuperável','T046':'Phase 6: US1 — nivelamento e rubrica','T047':'Phase 7: Polish e validação'}
for id,us,desc in tasks:
 if id in phases:text+='\n## '+phases[id]+'\n\n'
 refs=', '.join(groups.get(id, ['governança e todas as histórias']))
 text+=f'- [ ] {id} '+(f'[{us}] ' if us else '')+desc+f' Cobertura: {refs}.\n'
text+='''
## Dependencies & Execution Order
T039 → T040 → T041 → T042 → T043 → T044 → T045 → T046 → T047 → T048 → T049.
Nenhuma tarefa paralela: arquivos compartilhados. Plano completo solicitado; MVP isolado é US1
com entrada e fundamentos. US2/US3 dependem de diagnóstico ou fixture válida para teste independente.
Testes independentes das cinco histórias estão em spec.md e quickstart.md.
T049 depende de responsável pedagógico e estudantes; código e testes técnicos não encerram essa tarefa.
'''
(base/'tasks.md').write_text(text,encoding='utf-8')
spec=(base/'spec.md').read_text(encoding='utf-8'); ids=re.findall(r'- \*\*((?:FR|SC)-\d+[a-z]?)\*\*',spec)
trace='# Rastreabilidade\n\nCobertura planejada não é evidência de implementação.\n\n| Requisito | Tarefas | Verificação |\n| --- | --- | --- |\n'
for id in ids:
 linked=[t for t,req in groups.items() if id in req]
 assert linked,id
 trace+=f'| {id} | '+', '.join(linked)+' | '+('Avaliação pedagógica T049' if id in ['SC-001','SC-003','SC-004','SC-005'] else 'quickstart.md e evidencias.md')+' |\n'
(base/'rastreabilidade.md').write_text(trace,encoding='utf-8')
(base/'avaliacao-pedagogica.md').write_text('# Avaliação pedagógica\n\nPendente T049. Sem estudantes observados, sem aprovação curricular e sem percentuais medidos.\n\nRegistrar responsável, data, revisão de objetivos/BNCC/rubrica, amostra agregada >=10, contagens,\npercentuais, tempos e revisões. Não coletar identificação pessoal.\n',encoding='utf-8')
print('11 tarefas atuais; 38 IDs históricos reservados; 39/39 FR e 9/9 SC com cobertura')
