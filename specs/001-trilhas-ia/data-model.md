# Modelo de dados

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
