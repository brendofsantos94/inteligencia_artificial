from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
base = root / 'specs/001-trilhas-ia'
def write(name,text):
 p=base/name; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(text.strip()+'\n',encoding='utf-8')
write('plan.md','''# Implementation Plan: IA para Aprender

**Branch**: contexto 001-trilhas-ia, sem repositório Git | **Date**: 2026-10-02 | **Spec**: [spec.md](spec.md)

## Summary
Construir cinco documentos HTML em implementacao/, preservando toda infraestrutura recebida.
Conteúdo reconstruído do anexo; sem alegar comparação com páginas originais ausentes.

## Technical Context
Language/Version: HTML5, CSS, JavaScript moderno com scripts clássicos e namespace IA.
Primary Dependencies: nenhuma em produção. Testes usam Node e Playwright já disponíveis no ambiente.
Storage: localStorage, chave ia-para-aprender, envelope v2; fallback somente no documento atual.
Testing: node:test, browser Chromium e cenários de quickstart.md.
Target Platform: navegador moderno em origem HTTP local ou hospedagem estática com subdiretório.
Project Type: aplicação web estática sem backend ou chamadas externas.
Performance Goals: conteúdo local, sem espera de rede após carregar os arquivos da página.
Constraints: cinco páginas; dez questões; dez módulos; dois desafios; nenhuma dependência remota.
Scale/Scope: percurso individual em um navegador/aba. Não oferece sincronização entre dispositivos.

## Constitution Check
Antes e após design: dez princípios atendidos pelo plano. Metadados em todas as atividades;
Criar nos dois desafios; feedback persistente; produção própria; nenhuma conversa livre ou nota.
Ratificação e validação pedagógica em T049 são pendentes explícitas, não aprovações presumidas.

## Project Structure
Documentação em specs/001-trilhas-ia: spec, plan, research, data-model, quickstart, tasks,
contracts/contrato-interface.md, paginas/, rastreabilidade e evidencias.
Aplicação em implementacao/: index.html, nivelamento.html, explorador.html, usuario.html,
conclusao.html; css/style.css; js/data.js, storage.js, nivelamento.js, trilhas.js, conclusao.js.
Testes em tests/: state.test.cjs, browser.cjs. Servidor local em scripts/serve.cjs.

## Phases
0: pesquisar memória, migração e foco. 1: definir contratos e modelo.
2: T039 documentação. 3: T040–T041 estado e proteção.
4: T042–T046 conteúdos, diagnóstico, revisão, rascunhos e desafios.
5: T047 acessibilidade; T048 validar aplicação. T049 avaliação pedagógica externa.
As tarefas compartilham arquivos e serão executadas sequencialmente.

## Design decisions
- Recalcular perfil e totais a partir de respostas, validar sequência contígua e permissões.
- Conclusão de desafio requer decisões, limiar e textos; rascunho não libera etapa.
- Migração v1 aceita somente o envelope reconstruído descrito no modelo. Resultado sem texto
  perde conclusão do desafio, preserva módulos válidos e requer nova produção. Compatibilidade
  com formato histórico desconhecido não pode ser demonstrada sem o original.
- Armazenamento indisponível mantém somente a página atual e avisa perda ao mudar documento.
- Feedback em região de status e botão Continuar; foco no título após transição.
- Reinício e refazer usam diálogo nativo de confirmação; cancelar não altera estado.
- Texto autoral usa textContent/valor de textarea e nunca innerHTML.
- Caminhos relativos; sem parâmetros de URL contendo produção.

## Complexity Tracking
Sem exceções arquiteturais à constituição. Riscos restantes: aprovação pedagógica, formato v1
histórico não disponível e comportamento assistivo a validar com leitores de tela reais.
''')
write('research.md','''# Pesquisa e decisões

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
''')
write('data-model.md','''# Modelo de dados

Chave exclusiva: ia-para-aprender. Envelope:
version: 2; assessment: {answers: dez inteiros ou null, position: inteiro 0–9,
finalized: boolean}; tracks: {explorador, usuario}.
Cada trilha: started boolean, completed inteiro 0–5, draft {answers: inteiros/null,
texts: strings}, result null ou {answers, texts}. Explorador usa 4 decisões e 1 texto;
Usuário usa 5 decisões e 5 textos. Textos limitados a 4000 caracteres por campo.
Perfil, escore e acertos críticos são derivados; não confiar em números armazenados.

## Invariantes
Finalizar exige dez respostas válidas. Questões 1–2 não pontuam; críticas 3/5/8.
Usuário = total >=5 E críticos >=2. completed >0 implica started.
Trilha iniciada implica assessment finalized. Explorador só existe para perfil Explorador.
Usuário iniciado requer perfil Usuário ou resultado Explorador válido.
Resultado exige completed=5, todas as respostas, >=3 acertos e textos trim() não vazios.
Módulos concluídos são prefixo contínuo. Rascunho não concede autorização.
Position não ultrapassa primeira resposta ainda ausente; respostas válidas devem ser prefixo.

## Transições
Início → diagnóstico parcial → resultado → trilha recomendada iniciada → módulos 1–5 → desafio.
Explorador aprovado → Usuário disponível; Usuário aprovado → conclusão.
Revisão não muda completed. Refazer só no resultado antes de started.
Reinício só após resultado Usuário válido, confirmação, removeItem da chave exclusiva.

## Migração v1 reconstruída
Mesmo envelope estrutural com version=1; draft/result podem faltar. Legacy challengeCompleted
sem textos não concede aprovação; preservar started/completed e requerer desafio novamente.
Campos opcionais score/critical/profile não são fonte de verdade; recalcular.
Este contrato é hipótese de integração, não identificação do formato histórico ausente.
Versões não reconhecidas ficam intactas no armazenamento, com uso temporário seguro sem gravação.
Formato v2 incoerente é preservado até ação de progresso válida sobrescrever; aviso explícito.
''')
write('contracts/contrato-interface.md','''# Contrato de interface

Namespace IA: data, classify(answers), fresh(), normalize(raw), load(), save(), canAccess(page),
nextPage(), mount() e notice(). Scripts clássicos são carregados com defer na ordem data, storage,
controlador. Não há API externa. Estado e textos não trafegam pela URL.

| Página | Entrada permitida | Saída |
| --- | --- | --- |
| index | sempre | Retomar a etapa válida ou iniciar diagnóstico |
| nivelamento | sempre | resultado e trilha; refazer só antes de qualquer started |
| explorador | diagnóstico Explorador | módulos sequenciais, desafio, liberar Usuário |
| usuario | diagnóstico Usuário ou Explorador aprovada | módulos, desafio, conclusão |
| conclusao | Usuário aprovada | revisão, início, reinício confirmado |

classify retorna {score, critical, profile}; diagnósticas nunca julgadas.
normalize rejeita estado incoerente; load explica recuperação sem apagar silenciosamente.
save retorna boolean e nunca promete memória em caso de falha.
Transições focam h1/h2 tabindex=-1; feedback status permanece sem temporizador.
Alternativas em fieldset/legend e labels; novos textos orientam privacidade.
Resultado reprovado mantém decisões, rascunho e explicações; aprovado é recuperável e imutável.
Revisão de módulo concluído permite praticar sem reduzir progresso.
''')
write('quickstart.md','''# Executar e validar

Na raiz interna inteligencia_artificial, execute node scripts/serve.cjs e abra
http://127.0.0.1:4173/implementacao/index.html. Use Node disponível no ambiente.
Também pode servir a pasta com qualquer servidor HTTP estático. file:// não garante retomada.
Testes: node --test tests/state.test.cjs; node tests/browser.cjs.
Browser tests localizam Playwright pelos pacotes do runtime ou NODE_PATH.

## Cenários de aceitação
1. Início: público, propósito, duas trilhas, cuidados e iniciar sem cadastro (US5).
2. Diagnóstico: dez questões; avançar vazio bloqueado; voltar, alterar e recarregar preservam;
   nenhuma correção antes do fim; diagnósticas neutras; 5/2, 5/1, 4/3 e 8/3 (US1).
3. Trilhas: cinco módulos cada, metadados; futuros bloqueados; erro específico, tentar novamente;
   acerto persistente mesmo após 700 ms; continuar explícito; revisar sem zerar (US2/US3).
4. Explorador: quatro decisões obrigatórias, síntese sem espaços, três acertos; reprovação preserva
   rascunho e feedback; aprovação mantém convite após voltar e recarregar (US2).
5. Usuário: cinco decisões, três acertos, cinco textos e rubrica; recarga preserva produção;
   resultado aprovado permanece; conclusão não exige nova submissão (US3).
6. Proteção: cada acesso direto bloqueado retorna ao próximo passo válido; estado impossível
   inicia percurso seguro com aviso. Refazer após início bloqueado (US4).
7. Reinício: cancelar preserva chave; confirmar remove somente chave do projeto e mostra questão 1.
8. Falha de getter/leitura/gravação: aviso explícito de perda ao mudar página; interação atual funciona.
9. Migração: fixture v1 documentada preserva módulos; sem texto não inventa desafio; versão futura intacta.
10. Interface: teclado, foco após transições, status sem avanço, todos os estados em 320 px e
    zoom 200%, contraste 4.5:1/3:1, alvos 44 px e links relativos no subdiretório.

## Avaliação pedagógica T049
Revisar EM13CO10/EM13CO08, objetivos e rubrica com responsável pedagógico. Observar ao menos dez
estudantes e registrar apenas amostra agregada, contagens, percentuais, tempo e número de revisões.
SC-001: >=90% em <=12 minutos sem ajuda; SC-003 >=85% identificam 3/4 elementos;
SC-004 >=80% entregam 5 elementos após no máximo uma revisão; SC-005 >=90% identificam próximo passo.
Não declarar esses percentuais atingidos sem observação real.
''')
print('Plano, pesquisa, modelo, contrato e quickstart preparados')
