## Nome da aplicação: IA para Aprender
Aplicação desenvolvida pelos mestrandos: Brendo Furtado Santos e Rodrigo do Nascimento Dinelly, para a disciplina de Desenvolvimento Assistido por IA.
Ministrada pelo Professor Doutor: João da Mata Libório Filho.
Curso de Mestrado Profissional em Ensino de Computação (ProfComp) - 2026

## Justificativa pedagógica
Incialmente foi discutido em que problema iriamos trabalhar. E decidimos por trabalhar em cima da dificuldade que o estudante tem para utilizar a I.A. generativa de forma crítica e ativa dentro do ambiente escolar. Com o objetivo de usá-la para ajudá-lo a aprender sobre assuntos de aula e até mesmo criar conteúdos que melhorem a sua compreensão acerca de um problema.

## Objetivo
Criar uma aplicação web que possibilite ao estudante aprender, a como fazer uso da I.A. Generativa de forma crítica, ativa e pedagógica, dentro do ambiente escolar.

## Como funciona
A aplicação conta um sistema de nivelamento, que tem o objetivo de direcionar o estudante para uma trilha de aprendizado.

•	O nivelamento é constituído de 10 questões, sendo as Questões 1 e 2 apenas diagnósticas, Questões 3 a 10 valendo 1 ponto e Questões 6, 7 e 8 compondo a pontuação crítica.

•	Existem duas trilhas:

1.	Explorador: que mostra como os modelos generativos funcionam, quais são suas limitações, como identificar alucinações, aplicar o método V.E.R. de checagem e proteção de dados. 
2.	Usuário: que mostra como transformar a IA em uma tutora de estudos, para elaborar solicitações ativas com objetivo e contexto, receber revisões sem perder a autoria do estudante e checar respostas divergentes.

## Pergunta Norteadora
Como promover o uso ativo, crítico, responsável e autoral da Inteligência Artificial como ferramenta de aprendizagem entre estudantes do Ensino Médio?

## Público alvo
Alunos do Ensino Médio

## Habilidades da BNCC
EM13CO08: Entender como mudanças na tecnologia afetam a segurança, incluindo novas maneiras de preservar sua privacidade e dados pessoais on-line.  
EM13CO10: Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana, analisando suas potencialidades, riscos e limites.

As habilidades acima, foram escolhidas para trabalhar em cima da dificuldade que o aluno tem para utilizar a I.A. Generativa de forma crítica e ativa dentro do ambiente escolar.

## Resultado esperado
Ao término da trilha, espera-se que aluno desenvolva a habilidade de usá-la para o ajudar a aprender sobre assuntos de aula e até mesmo criar conteúdos que melhorem a sua compreensão acerca de um problema. 

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

## Principais decisões registradas no Spec Kit:

o	No constitution, foram criadas 10 regras que englobasse: aprendizagem, uso crítico, autonomia, progressão, feedback e segurança.

o	O clarify, encontrou 5 questões que não ficaram claras:

1.	Durante o nivelamento, o estudante pode voltar a questões já respondidas e alterar a resposta antes de finalizar?
2.	Quando o estudante responde a uma questão do nivelamento, ele deve receber indicação de acerto ou erro antes de concluir as 10 questões?
3.	Ao escolher refazer o nivelamento, como o sistema deve tratar a tentativa atual e o progresso já concluído nas trilhas?
4.	Dentro de cada trilha, quando o estudante deve poder acessar os módulos seguintes?
5.	Depois de iniciar uma trilha, o estudante deve poder reiniciá-la do começo?

o	No plan, foi definido que o site deveria rodar em: desktop, tablet e celular.

o	No checklist, foi priorizada a experiência do estudante e as regras da constituição.

o	O tasks, gerou 31 tarefas:

US1: 6 tarefas — MVP de nivelamento
US2: 5 tarefas — trilha Explorador
US3: 4 tarefas — trilha Usuário
US4: 4 tarefas — progresso e conclusão
12 tarefas de configuração, fundamentos e validação transversal

o	O analyze, relatou 5 identificadores de severidade: CRÍTICA, ALTA e MÉDIA. Foram feitas a devidas correções.

•	Uso do agente de codificação:
Foi utilizado o agente de codificação CODEX, da OpenAI.

•	Alterações feitas após a revisão:
o	Despois de concluir tudo, crie um botão que permita reiniciá-lo por completo;
o	Na página inicial, mostre as habilidades da BNCC COMPUTAÇÃO que serão trabalhadas;
o	Descreva o que cada trilha pretende abordar e ensinar para o aluno.
o	A implementação da constituição, quais regras ela incluiria;
o	Mude o título de: "Aprenda com IA sem perder sua autoria." para "O uso da IA Generativa de forma produtiva no Ensino Médio";

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

Os scripts prepare-spec.py, prepare-plan.py, prepare-tasks.py e create-pages.py registram a
reconstrução inicial. Não os execute sobre documentos revisados: eles recriam artefatos e podem
substituir revisões e marcadores de conclusão.
