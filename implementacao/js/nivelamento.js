(function(IA) {
  'use strict';
  document.addEventListener('DOMContentLoaded',()=>{
    if(!IA.mount()) return;
    const app=document.getElementById('app'), a=IA.state.assessment, questions=IA.data.assessment;
    function result() {
      const totals=IA.classify(a.answers), name=IA.data.tracks[totals.profile].title;
      app.replaceChildren(IA.heading('Seu próximo passo: '+name),
        IA.element('p',`Você identificou ${totals.score} de 8 decisões pontuáveis e ${totals.critical} de 3 decisões de pensamento crítico.`,{class:'example'}),
        IA.element('p',totals.profile==='usuario'?'A recomendação Usuário exige pelo menos cinco decisões adequadas e duas críticas. Você atende aos dois critérios.':'Explorador ajuda a construir fundamentos e verificação. A trilha Usuário exige pelo menos cinco decisões adequadas e duas críticas; os dois critérios precisam ser atendidos.'),
        IA.element('p','Esse resultado recomenda um ponto de partida. Ele não é uma nota escolar nem compara você com outros estudantes.'),
        IA.link('Ir para trilha '+name,totals.profile));
      const started=Object.values(IA.state.tracks).some(t=>t.started);
      if(!started) app.append(IA.button('Refazer nivelamento',()=>{
        if(!confirm('Refazer o nivelamento? As respostas deste diagnóstico serão apagadas.')) return;
        IA.state=IA.fresh(); Object.assign(a,IA.state.assessment); IA.state.assessment=a; IA.save(); show();
      },true));
      else app.append(IA.element('p','Sua trilha já foi iniciada. O diagnóstico permanece disponível para consulta e não pode ser reiniciado.'));
      app.append(IA.element('h2','Revisão das respostas'));
      questions.forEach((q,i)=>{
        const section=IA.element('section',undefined,{class:'review'});
        section.append(IA.element('h3',`${i+1}. ${q.prompt}`),IA.element('p','Sua resposta: '+q.options[a.answers[i]]));
        section.append(IA.element('p',q.diagnostic?'Resposta diagnóstica, não pontuável. Hábitos pessoais não recebem certo ou errado.':
          (a.answers[i]===q.correct?'Decisão adequada. ':'Decisão a revisar. ')+q.feedback[a.answers[i]],{class:'feedback'})); app.append(section);
      }); IA.focus();
    }
    function show() {
      if(a.finalized) {result(); return;}
      const index=a.position, q=questions[index];
      app.replaceChildren(IA.element('p',`Nivelamento · questão ${index+1} de 10`,{class:'eyebrow'}),IA.heading('Conheça seu ponto de partida'),
        IA.element('p',q.diagnostic?'Esta questão é diagnóstica: descreve seus hábitos e não pontua.':'Escolha a decisão mais adequada. A revisão das respostas aparece somente ao finalizar.'),
        IA.element('p',index<9?'Próximo passo: registrar uma resposta e avançar. Você pode voltar e editar antes de finalizar.':'Próximo passo: finalizar para receber a recomendação e revisar as respostas.'));
      const form=IA.element('form'), status=IA.status();
      const field=IA.choices(q,'assessment',a.answers[index],value=>{
        a.answers[index]=value; IA.save();
      }); form.append(field);
      const actions=IA.element('div',undefined,{class:'actions'});
      if(index>0) actions.append(IA.button('Voltar',()=>{a.position--; IA.save(); show();},true));
      actions.append(IA.element('button',index===9?'Finalizar nivelamento':'Próxima questão',{type:'submit'}));
      form.append(actions,status); app.append(form);
      form.addEventListener('submit',event=>{
        event.preventDefault();
        if(a.answers[index]===null) {status.textContent='Escolha uma alternativa para avançar.'; field.querySelector('input').focus(); return;}
        if(index===9) a.finalized=true; else a.position++;
        IA.save(); show();
      });
      const answered=a.answers.filter(v=>v!==null).length;
      if(answered>1) {
        const nav=IA.element('nav',undefined,{'aria-label':'Questões já respondidas',class:'question-nav'});
        a.answers.forEach((value,i)=>{if(value!==null) nav.append(IA.button('Questão '+(i+1),()=>{a.position=i; IA.save(); show();},true));}); app.append(nav);
      } IA.focus();
    }
    show();
  });
})(globalThis.IA);
