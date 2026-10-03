# IA para Aprender

Percurso individual para Ensino Médio, reconstruído do documento fornecido em 2 de outubro de
2026. A implementação técnica contém início, nivelamento, Explorador, Usuário e conclusão.

## Pergunta Norteadora
Como promover o uso ativo, crítico, responsável e autoral da Inteligência Artificial como ferramenta de aprendizagem entre estudantes do Ensino Médio?

## Público alvo
Alunos do Ensino Médio

## Habilidades da BNCC
EM13CO08: Entender como mudanças na tecnologia afetam a segurança, incluindo novas maneiras de preservar sua privacidade e dados pessoais on-line.  
EM13CO10: Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana, analisando suas potencialidades, riscos e limites.

## As habilidades acima, foram escolhidas para trabalhar em cima da dificuldade que o aluno tem para utilizar a I.A. Generativa de forma crítica e ativa dentro do ambiente escolar.
Resutado esperado: Ao término da trilha, espera-se que aluno desenvolva a habilidae de usá-la para o ajudar a aprender sobre assuntos de aula e até mesmo criar conteúdos que melhorem a sua compreensão acerca de um problema. 

## Abrir a aplicação

Site publicado: [IA para Aprender no GitHub Pages](https://brendofsantos94.github.io/inteligencia_artificial/).

Para executar localmente:

Na pasta deste README, execute:

```powershell
node scripts/serve.cjs
```

Abra [IA para Aprender](http://127.0.0.1:4173/implementacao/index.html).
Nenhuma instalação ou dependência de produção é necessária. Se Node não estiver no PATH,
use o executável disponível no seu ambiente ou sirva `implementacao/` com um servidor HTTP estático.
Abrir os HTML diretamente pode não compartilhar progresso entre páginas.

## O que está entregue

- Dez questões de nivelamento; duas diagnósticas neutras e oito pontuáveis.
- Classificação por dois critérios, cinco módulos por trilha e dois desafios autorais.
- Feedback por alternativa, sem avanço automático; revisão dos módulos concluídos.
- Progresso, rascunhos e produções no navegador, com aviso quando o salvamento falha.
- Proteção de etapas e reinício global confirmado somente após conclusão.
- Interface em português, controles por teclado e layout responsivo sem serviços externos.

## Documentação e validação

- [Passo a passo executado](specs/001-trilhas-ia/etapas-speckit.md)
- [Especificação](specs/001-trilhas-ia/spec.md)
- [Plano](specs/001-trilhas-ia/plan.md)
- [Tarefas](specs/001-trilhas-ia/tasks.md)
- [Rastreabilidade](specs/001-trilhas-ia/rastreabilidade.md)
- [Evidências e limites dos testes](specs/001-trilhas-ia/evidencias.md)

Testes de regras: `node --test tests/state.test.cjs`.
Testes de navegador: `node tests/browser.cjs`, com Playwright acessível via NODE_PATH e Chrome
instalado. Para Edge, defina TEST_BROWSER=msedge. Esses pacotes são usados só nos testes.

## Pendências para aceite pedagógico

T049 permanece pendente: aprovação dos códigos e objetivos curriculares, revisão da rubrica e
avaliação com ao menos dez estudantes. A data de ratificação da constituição não foi presumida.
As páginas originais, o histórico T001–T038 e o formato v1 real não foram entregues.
Migração foi testada somente com o contrato reconstruído e fixtures sintéticas.
O zoom de 200% foi verificado por simulação CSS; zoom nativo e leitores de tela precisam de
conferência manual. Não se declara conformidade integral WCAG nem metas pedagógicas atingidas.

Os scripts prepare-spec.py, prepare-plan.py, prepare-tasks.py e create-pages.py registram a
reconstrução inicial. Não os execute sobre documentos revisados: eles recriam artefatos e podem
substituir revisões e marcadores de conclusão.QEWFWEFWFWEWE
