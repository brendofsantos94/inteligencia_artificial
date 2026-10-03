# Implementation Plan: IA para Aprender

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
