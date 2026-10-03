"""Reconstruct the documentation from the retained plain-text DOCX extraction."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
base = root / 'specs/001-trilhas-ia'
source = (root / 'docs/documento-base.txt').read_text(encoding='utf-8-sig')
fr = re.findall(r'^(FR-\d+[a-z]?)\s+(.+)$', source, re.M)
sc = re.findall(r'^(SC-\d+)\s+(.+)$', source, re.M)
assert len(fr) == 39 and len(sc) == 9
def write(name, text):
    path = base / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip() + '\n', encoding='utf-8')

stories = [
('Nivelamento', 'P1', 'Receber recomendação que considera conhecimento e pensamento crítico.',
 'Responder dez questões; 5/2 e 8/3 recomendam Usuário; 5/1 e 4/3 recomendam Explorador. Diagnósticas não alteram os totais.',
 ['Dado diagnóstico parcial, ao retornar, respostas e posição são recuperadas quando a memória está disponível.',
  'Dada resposta anterior, ao editá-la antes de finalizar, somente a versão mais recente entra no cálculo.',
  'Dado resultado sem trilha iniciada, refazer exige confirmação; após iniciar, refazer fica bloqueado.']),
('Explorador', 'P1', 'Compreender IA, reconhecer limites e verificar evidências.',
 'Concluir cinco módulos em sequência e quatro decisões do desafio; três acertos e síntese não vazia liberam Usuário.',
 ['Dado erro numa atividade, recebe explicação da alternativa e pode tentar novamente.',
  'Dado acerto, feedback permanece até Continuar; módulo futuro permanece bloqueado.',
  'Dado desafio aprovado, voltar mostra resultado, produção e convite para Usuário, sem nova submissão.']),
('Usuário', 'P1', 'Estudar com IA e produzir com autoria.',
 'Concluir cinco módulos e desafio de cinco decisões com três acertos, cinco textos e rubrica de autoavaliação.',
 ['Dado rascunho, recarregar recupera textos quando o salvamento funciona.',
  'Dada estratégia preenchida, recebe confirmação de envio sem afirmar qualidade semântica.',
  'Dado desafio aprovado, a conclusão é liberada e o resultado permanece disponível.']),
('Progressão', 'P2', 'Saber onde está, revisar e preservar aprendizagem.',
 'Revisar módulos concluídos, bloquear acesso futuro e reiniciar somente ao final.',
 ['Dado acesso direto bloqueado, encaminhar à etapa permitida sem mudar progresso.',
  'Dado reinício cancelado, preservar todas as produções; confirmado, apagar somente este projeto.',
  'Dada memória indisponível, avisar que recarga ou outra página não conserva continuidade temporária.']),
('Entrada', 'P1', 'Entender proposta, público e cuidados antes de começar.',
 'Acessar início por teclado, identificar duas trilhas e iniciar sem cadastro.',
 ['Dado retorno ao início, a ação Retomar preserva os dados.',
  'Dada tela de 320 px ou zoom 200%, todas as ações e textos ficam disponíveis.'])]

text = '# Feature Specification: IA para Aprender\n\n**Feature Branch**: sem Git no workspace; contexto `001-trilhas-ia`\n\n**Created**: 2026-10-02\n\n**Status**: pronta para planejamento; aceite pedagógico pendente\n\n**Input**: pedido de executar o ciclo Spec Kit com base em Reconstrucao_do_Spec_Kit_IA_para_Aprender.docx.\n\n## User Scenarios & Testing *(mandatory)*\n'
for i,(name,p,value,test,ac) in enumerate(stories,1):
    text += f'\n### User Story {i} - {name} (Priority: {p})\n\n{value}\n\n**Why this priority**: viabiliza o percurso individual para Ensino Médio.\n\n**Independent Test**: {test}\n\n**Acceptance Scenarios**:\n\n'
    text += '\n'.join(f'{n}. {a}' for n,a in enumerate(ac,1)) + '\n'
text += '''
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
'''
text += '\n'.join(f'- **{key}**: {body}' for key,body in fr)
text += '''

### Key Entities

- Diagnóstico: dez respostas, posição, finalização, perfil e totais derivados.
- Módulo: objetivo, etapa, habilidade, explicação, exemplo, decisão e devolutivas.
- Progresso: trilhas iniciadas e sequência de módulos concluídos.
- Desafio: decisões, produção própria, rascunho e resultado verificável.

## Success Criteria *(mandatory)*

### Measurable Outcomes
'''
text += '\n'.join(f'- **{key}**: {body}' for key,body in sc)
text += '''

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
'''
write('spec.md', text)
checks = ['Sem escolhas de implementação nos requisitos', 'Valor e público definidos', 'Cinco histórias com cenários de aceitação', 'Seções obrigatórias completas', 'Nenhuma ambiguidade crítica sem decisão', '39 requisitos testáveis', 'Nove critérios mensuráveis', 'Critérios independentes de tecnologia', 'Casos extremos definidos', 'Escopo delimitado', 'Premissas e dependências identificadas', 'Aceitação detalhada por página', 'Fluxos principais cobertos', 'Metas com protocolo de medição', 'Sem confundir aprovação curricular com código', 'Sem confundir documentação com teste executado']
write('checklists/requirements.md', '# Specification Quality Checklist\n\nData: 2026-10-02. Revisão documental de spec.md, não aceite de implementação.\n\n' + '\n'.join('- [x] '+c for c in checks))
pages = [
('01-inicio.md','Início','FR-021, FR-023, FR-026','Propósito Ensino Médio; duas trilhas; exemplos simulados; dados e autoria; iniciar ou retomar sem apagar.','Entrada sempre permitida. Próximo passo deriva do progresso válido.'),
('02-nivelamento.md','Nivelamento','FR-001 a FR-008a, FR-019, FR-024, FR-033','Dez questões uma por vez; 1–2 diagnósticas; 3/5/8 críticas; sem correção antecipada; voltar, editar, retomar e resultado.','Usuário se total >=5 e críticos >=2. Refazer com confirmação antes de iniciar trilha.'),
('03-explorador.md','Explorador','FR-009, FR-010, FR-012 a FR-015, FR-017, FR-019a, FR-027, FR-029, FR-030','Cinco módulos: conceito, padrões, erros, V-E-R e responsabilidade. Objetivo, etapa e BNCC em cada atividade.','Perfil Explorador; módulos sequenciais revisáveis. Quatro decisões, >=3 acertos e síntese não vazia; liberar Usuário e manter convite.'),
('04-usuario.md','Usuário','FR-011, FR-016, FR-019, FR-028, FR-029, FR-034','Cinco módulos: pistas, solicitações, tutoria, verificação e autoria. Desafio com cinco decisões e cinco campos.','Perfil Usuário ou Explorador concluída. >=3 acertos e cinco textos não vazios. Rubrica orienta autoavaliação; não avalia qualidade automaticamente.'),
('05-conclusao.md','Conclusão','FR-018, FR-025, FR-031 a FR-033','Síntese, revisão e retorno ao início; reinício global confirmado.','Somente Usuário concluída. Cancelar preserva; confirmar remove somente chave do projeto e retorna à questão inicial.')]
for name,title,refs,body,rule in pages:
    write('paginas/'+name, f'# {title}\n\n{body}\n\n## Contrato de progressão\n\n{rule}\n\n## Aceitação\n\nRequisitos: {refs}. Testar entrada permitida/bloqueada, navegação por teclado, recarga, 320 px, zoom 200%, foco após mudança e aviso de memória. Campos devem preservar texto como texto, sem interpretar HTML.')
print('spec.md: 39 FR, 9 SC, 5 US; checklist: 16/16; 5 páginas documentadas')
