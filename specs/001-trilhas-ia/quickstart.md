# Executar e validar

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
