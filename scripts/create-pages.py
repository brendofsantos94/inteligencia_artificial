from pathlib import Path
root=Path(__file__).resolve().parents[1]/'implementacao'
pages={
'index':('Comece a aprender','', '''
<section class="hero">
 <p class="eyebrow">ENSINO MÉDIO · PERCURSO INDIVIDUAL</p>
 <h1>IA para <em>Aprender</em></h1>
 <p class="lead">Faça perguntas melhores.<br>Verifique respostas.<br>Crie com suas próprias ideias.</p>
 <p>Um percurso para usar a inteligência artificial como apoio ao estudo, com pensamento crítico, responsabilidade e autoria.</p>
 <a class="button" id="start" href="nivelamento.html">Iniciar nivelamento</a>
 <p class="hint">10 questões para encontrar seu ponto de partida. Sem cadastro.</p>
 <p id="resume-note" role="status"></p>
</section>
<section class="path" aria-labelledby="path-title">
 <h2 id="path-title">Duas trilhas. Um objetivo: aprender.</h2>
 <div class="cards">
 <article><p class="eyebrow">01 · FUNDAMENTOS</p><h3>Explorador</h3><p>Entenda o que é IA, reconheça limites e aprenda a verificar informações.</p><p class="hint">5 módulos + desafio de análise e síntese própria</p></article>
 <article><p class="eyebrow">02 · ESTUDO ATIVO</p><h3>Usuário</h3><p>Planeje pedidos, pratique seu raciocínio e produza sem perder sua autoria.</p><p class="hint">5 módulos + estratégia de estudo autoral</p></article>
 </div>
</section>
<section class="care"><h2>Antes de começar</h2><p>Você trabalhará com exemplos simulados. Não há conversa com IA nesta experiência. Uma resposta bem escrita pode estar errada: compare fontes e evidências.</p><p>Não inclua nomes, contatos ou dados pessoais. Suas produções ficam neste navegador quando o salvamento está disponível; não são enviadas a serviços externos. Você decide o que escrever e como revisar.</p></section>
<p class="journey">Conhecer → Compreender → Questionar → Verificar → Aprender → Criar</p>
'''),
'nivelamento':('Nivelamento','nivelamento','<div id="app"></div>'),
'explorador':('Explorador','trilhas','<div id="app"></div>'),
'usuario':('Usuário','trilhas','<div id="app"></div>'),
'conclusao':('Conclusão','conclusao','''
<p class="eyebrow">PERCURSO CONCLUÍDO</p><h1 tabindex="-1" data-focus>Agora, leve essas práticas para seus estudos.</h1>
<p class="lead">Pergunte. Verifique. Crie.</p>
<p>Você concluiu a trilha Usuário e criou uma estratégia de estudo. Continue praticando com autonomia.</p>
<div class="cards"><article><h2>Pergunte com propósito</h2><p>Defina o que quer aprender, peça pistas e explique seu raciocínio antes de comparar respostas.</p></article>
<article><h2>Examine as evidências</h2><p>Confira fontes, busque contraexemplos e registre as dúvidas que permanecem.</p></article>
<article><h2>Preserve sua autoria</h2><p>Escreva com suas palavras, justifique escolhas e cuide dos dados pessoais.</p></article></div>
<p>Próximo passo: aplicar a estratégia nos estudos ou revisar os módulos e sua produção.</p>
<div class="actions"><a class="button" href="usuario.html">Revisar Usuário e minha produção</a><a class="button secondary" href="index.html">Voltar ao início</a></div>
<section class="care"><h2>Um novo começo</h2><p>Reiniciar apaga respostas, rascunhos e produções deste projeto. A confirmação permite cancelar e preservar tudo.</p><button id="reset" class="secondary" type="button">Reiniciar todo o percurso</button></section>
''')}
for page,(title,script,body) in pages.items():
 html=f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Aprenda a usar IA com pensamento crítico, verificação e autoria no Ensino Médio.">
<title>{title} · IA para Aprender</title><link rel="stylesheet" href="css/style.css">
<script src="js/data.js" defer></script><script src="js/storage.js" defer></script>
{f'<script src="js/{script}.js" defer></script>' if script else ''}
</head><body data-page="{page}">
<a class="skip" href="#main">Ir para o conteúdo</a>
<header class="site-header"><a href="index.html" class="brand">IA <span>para Aprender</span></a><span class="header-note">Pensamento crítico · Autoria</span></header>
<main id="main" tabindex="-1"><p id="storage-notice" role="status" aria-live="polite" class="notice" hidden></p>
<noscript><p>Esta experiência precisa de JavaScript para registrar respostas e orientar o percurso.</p></noscript>
{body}</main>
<footer>Aprender é construir seu próprio raciocínio. <a href="index.html">Início</a></footer>
</body></html>'''
 (root/(page+'.html')).write_text(html,encoding='utf-8')
print('Cinco páginas HTML criadas')
