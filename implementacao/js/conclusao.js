(function(IA) {
  document.addEventListener('DOMContentLoaded',()=>{
    if(!IA.mount()) return;
    document.getElementById('reset').addEventListener('click',()=>{
      if(!confirm('Reiniciar todo o percurso? Suas respostas, rascunhos e produções deste projeto serão apagados.')) return;
      try {localStorage.removeItem(IA.KEY);} catch(error) {
        IA.notice('Não foi possível apagar o progresso salvo. O reinício foi cancelado para evitar uma falsa confirmação.'); return;
      }
      IA.state=IA.fresh(); location.href='nivelamento.html';
    }); IA.focus();
  });
})(globalThis.IA);
