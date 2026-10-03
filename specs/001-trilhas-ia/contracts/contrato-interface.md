# Contrato de interface

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
