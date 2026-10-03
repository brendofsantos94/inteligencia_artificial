(function(IA) {
  'use strict';
  document.addEventListener('DOMContentLoaded',()=>{
    if(!IA.mount()) return;
    const key=document.body.dataset.page, data=IA.data.tracks[key], track=IA.state.tracks[key];
    if (!track.started) {track.started=true; IA.save();}
    const app=document.getElementById('app'); let selected=null;
    const nav=()=>{
      const panel=IA.element('nav',undefined,{'aria-label':'Módulos da trilha',class:'module-nav'});
      data.modules.forEach((m,i)=>{
        const b=IA.button(`${i+1}. ${m.title}${i<track.completed?' · concluído':''}`,()=>showModule(i),true);
        b.disabled=i>track.completed; panel.append(b);
      });
      if(track.completed===5) panel.append(IA.button('Desafio final',showChallenge,true));
      app.append(panel);
    };
    function header(title,meta) {
      app.replaceChildren();
      app.append(IA.element('p',`Trilha ${data.title} · ${track.completed} de 5 módulos concluídos`,{class:'eyebrow'}),IA.heading(title));
      if(meta) app.append(IA.metadata(meta));
      nav();
    }
    function showModule(index) {
      if(index>track.completed) return;
      const m=data.modules[index], review=index<track.completed;
      selected=null; header(`${index+1}. ${m.title}`,m);
      app.append(IA.element('p',review?'Revisão: este módulo já foi concluído. Praticar não altera seu progresso.':`Próximo passo: responder à atividade e continuar para ${index<4?'o próximo módulo':'o desafio final'}.`),
        IA.element('p',m.content),IA.element('div','Exemplo: '+m.example,{class:'example'}));
      const form=IA.element('form');
      const field=IA.choices(m.activity,'activity',null,value=>{selected=value;});
      const submit=IA.element('button','Conferir minha decisão',{type:'submit'});
      const status=IA.status(); const actions=IA.element('div',undefined,{class:'actions'});
      form.append(field,submit,status,actions); app.append(form);
      form.addEventListener('submit',event=>{
        event.preventDefault();
        if(selected===null) {status.textContent='Escolha uma alternativa antes de conferir.'; field.querySelector('input').focus(); return;}
        const correct=selected===m.activity.correct;
        status.textContent=(correct?'Sua decisão atende ao objetivo. ':'Reveja sua decisão. ')+m.activity.feedback[selected];
        field.disabled=true; submit.hidden=true; actions.replaceChildren();
        if(correct) actions.append(IA.button(review?'Continuar revisão':'Continuar',()=>{
          if(!review) {track.completed=index+1; IA.save();}
          if(index<4) showModule(index+1); else showChallenge();
        }));
        else actions.append(IA.button('Tentar novamente',()=>{
          field.disabled=false; submit.hidden=false; actions.replaceChildren();
          // Keep the explanation visible while the student revises.
          field.querySelector('input:checked').focus();
        }));
        actions.querySelector('button').focus();
      }); IA.focus();
    }
    function showResult() {
      const c=data.challenge, result=track.result;
      header('Trilha '+data.title+' concluída',c);
      app.append(IA.element('p','Você concluiu os cinco módulos e o desafio. Os módulos continuam disponíveis para revisão.'),
        IA.element('p','Próximo passo: '+(key==='explorador'?'iniciar a trilha Usuário, agora ou depois.':'consultar a conclusão do percurso.')));
      const output=IA.element('section',undefined,{'aria-label':'Resultado e produção do desafio'});
      c.questions.forEach((q,i)=>output.append(IA.element('h2',q.prompt),
        IA.element('p',q.options[result.answers[i]]),IA.element('p',q.feedback[result.answers[i]],{class:'feedback'})));
      c.fields.forEach((f,i)=>output.append(IA.element('h2',f.label),IA.element('p',result.texts[i],{class:'production'})));
      app.append(output);
      app.append(IA.element('p','A produção foi registrada. Preenchimento e decisões atendem à regra de envio; a qualidade pedagógica não foi avaliada automaticamente.'));
      const actions=IA.element('div',undefined,{class:'actions'});
      actions.append(IA.link(key==='explorador'?'Iniciar Usuário agora':'Ver conclusão',key==='explorador'?'usuario':'conclusao'),IA.link('Voltar ao início','index',true)); app.append(actions); IA.focus();
    }
    function showChallenge() {
      if(track.completed!==5) return;
      if(track.result) {showResult(); return;}
      const c=data.challenge; header(c.title,c);
      app.append(IA.element('p',c.introduction,{class:'example'}),
        IA.element('p',`Próximo passo: responder às ${c.questions.length} decisões e preencher ${c.fields.length===1?'a síntese':'os cinco campos'}. A regra pede pelo menos três decisões adequadas.`),
        IA.element('p','Use apenas exemplos de estudo. Não inclua nomes, contatos ou outros dados pessoais. Seus textos não são enviados a serviços externos.'));
      const form=IA.element('form');
      c.questions.forEach((q,i)=>form.append(IA.choices(q,'challenge-'+i,track.draft.answers[i],value=>{
        track.draft.answers[i]=value; IA.save();
      })));
      c.fields.forEach((f,i)=>{
        const id='text-'+i, hint='hint-'+i;
        const label=IA.element('label',f.label,{for:id,class:'text-label'});
        const help=IA.element('p',f.hint,{id:hint,class:'hint'});
        const text=IA.element('textarea',undefined,{id,name:id,maxlength:4000,rows:4,'aria-describedby':hint});
        text.value=track.draft.texts[i]; text.addEventListener('input',()=>{track.draft.texts[i]=text.value; IA.save();});
        form.append(label,help,text);
      });
      const rubric=IA.element('section',undefined,{'aria-label':'Rubrica de autoavaliação',class:'example'});
      rubric.append(IA.element('h2','Revise sua produção'));
      const list=IA.element('ul'); c.rubric.forEach(item=>list.append(IA.element('li',item))); rubric.append(list,
        IA.element('p','Leia a rubrica antes de enviar. Preencher os campos não comprova a qualidade da estratégia.'));
      form.append(rubric);
      const status=IA.status(), explanations=IA.element('section',undefined,{'aria-label':'Devolutiva das decisões'});
      form.append(IA.element('button','Concluir desafio',{type:'submit'}),status,explanations); app.append(form);
      form.addEventListener('submit',event=>{
        event.preventDefault();
        const missing=track.draft.answers.indexOf(null), blank=track.draft.texts.findIndex(t=>!t.trim());
        if(missing!==-1 || blank!==-1) {
          status.textContent=missing!==-1?'Responda a todas as decisões antes de concluir.':'Preencha cada produção com texto; espaços não atendem ao pedido.';
          (missing!==-1?form.querySelector(`[name="challenge-${missing}"]`):document.getElementById('text-'+blank)).focus(); return;
        }
        const score=IA.challengeScore(key,track.draft.answers);
        explanations.replaceChildren();
        c.questions.forEach((q,i)=>explanations.append(IA.element('h2',`Decisão ${i+1}`),
          IA.element('p',q.feedback[track.draft.answers[i]],{class:'feedback'})));
        if(score<3) {
          status.textContent='Revise as explicações: pelo menos três decisões precisam atender aos conceitos. Seu rascunho foi mantido; você pode alterar e enviar novamente.';
          status.setAttribute('tabindex','-1'); status.focus(); IA.save(); return;
        }
        track.result={answers:[...track.draft.answers],texts:[...track.draft.texts]}; IA.save(); showResult();
      }); IA.focus();
    }
    if(track.result) showResult(); else if(track.completed===5) showChallenge(); else showModule(track.completed);
  });
})(globalThis.IA);
