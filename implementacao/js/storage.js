/* Shared state, permissions and safe rendering. No network calls. */
globalThis.IA = globalThis.IA || {};
(function (IA) {
  'use strict';
  IA.KEY = 'ia-para-aprender';
  const emptyTrack = (n, t) => ({started:false, completed:0,
    draft:{answers:Array(n).fill(null), texts:Array(t).fill('')}, result:null});
  IA.fresh = () => ({version:2, assessment:{answers:Array(10).fill(null), position:0, finalized:false},
    tracks:{explorador:emptyTrack(4,1), usuario:emptyTrack(5,5)}});
  IA.classify = answers => {
    let score=0, critical=0;
    IA.data.assessment.forEach((q,i) => {if (!q.diagnostic && answers[i] === q.correct) {
      score++; if (q.critical) critical++;
    }});
    return {score, critical, profile:score>=5 && critical>=2 ? 'usuario' : 'explorador'};
  };
  function validAnswers(answers, questions, complete=false) {
    return Array.isArray(answers) && answers.length===questions.length && answers.every((a,i) =>
      (!complete && a===null) || (Number.isInteger(a) && a>=0 && a<questions[i].options.length));
  }
  function draft(raw, key) {
    const challenge=IA.data.tracks[key].challenge;
    if (!raw || !validAnswers(raw.answers,challenge.questions) || !Array.isArray(raw.texts) ||
      raw.texts.length!==challenge.fields.length || !raw.texts.every(t=>typeof t==='string' && t.length<=4000))
      throw new Error('Rascunho inválido');
    return {answers:[...raw.answers], texts:[...raw.texts]};
  }
  IA.challengeScore = (key,answers) => IA.data.tracks[key].challenge.questions.reduce(
    (sum,q,i)=>sum+(answers[i]===q.correct ? 1:0),0);
  IA.challengeValid = (key,value) => {
    const c=IA.data.tracks[key].challenge;
    return value && validAnswers(value.answers,c.questions,true) &&
      Array.isArray(value.texts) && value.texts.length===c.fields.length &&
      value.texts.every(t=>typeof t==='string' && t.length<=4000 && t.trim().length>0) &&
      IA.challengeScore(key,value.answers)>=3;
  };
  IA.normalize = raw => {
    if (!raw || ![1,2].includes(raw.version)) throw new Error('Versão desconhecida');
    const a=raw.assessment;
    if (!a || !validAnswers(a.answers,IA.data.assessment) || typeof a.finalized!=='boolean' ||
      !Number.isInteger(a.position) || a.position<0 || a.position>9 ||
      (a.finalized && (a.position!==9 || a.answers.some(v=>v===null)))) throw new Error('Diagnóstico inválido');
    const missing=a.answers.indexOf(null);
    if (missing>=0 && (a.position>missing || a.answers.slice(missing).some(v=>v!==null)))
      throw new Error('Sequência inválida');
    const state=IA.fresh();
    state.assessment={answers:[...a.answers], position:a.position, finalized:a.finalized};
    for (const key of ['explorador','usuario']) {
      const t=raw.tracks?.[key];
      if (!t || typeof t.started!=='boolean' || !Number.isInteger(t.completed) ||
        t.completed<0 || t.completed>5 || (t.completed>0 && !t.started)) throw new Error('Trilha inválida');
      if (t.started && !a.finalized) throw new Error('Trilha antes do diagnóstico');
      if (raw.version===2 && t.result!==null && (typeof t.result!=='object' || Array.isArray(t.result)))
        throw new Error('Resultado inválido');
      state.tracks[key].started=t.started; state.tracks[key].completed=t.completed;
      if (t.draft) state.tracks[key].draft=draft(t.draft,key);
      else if (raw.version===2) throw new Error('Rascunho ausente');
      if (t.completed<5 && (state.tracks[key].draft.answers.some(v=>v!==null) ||
        state.tracks[key].draft.texts.some(v=>v!==''))) throw new Error('Rascunho antes do desafio');
      if (t.result) {
        try {
          const result=draft(t.result,key);
          if (t.completed!==5 || !IA.challengeValid(key,result)) throw new Error('Resultado inconsistente');
          state.tracks[key].result=result;
        } catch(error) {
          // An old completion without authorship is not proof of the new challenge.
          // Preserve its validated module progress and ask for a new production.
          if(raw.version===2) throw error;
        }
      }
    }
    const profile=IA.classify(a.answers).profile;
    if (profile==='usuario' && state.tracks.explorador.started) throw new Error('Perfil inconsistente');
    if (state.tracks.usuario.started && profile!=='usuario' && !state.tracks.explorador.result) {
      if (raw.version===1) state.tracks.usuario=emptyTrack(5,5);
      else throw new Error('Usuário bloqueada');
    }
    return state;
  };
  IA.messages=[]; IA.storageAvailable=true; IA.readOnly=false;
  const memoryMessage='O progresso continua somente nesta página. Não foi possível salvar: ao recarregar ou abrir outra página, respostas e produções podem se perder. A memória temporária não passa entre documentos.';
  IA.notice = message => {
    if (!IA.messages.includes(message)) IA.messages.push(message);
    const el=typeof document!=='undefined' && document.getElementById('storage-notice');
    if (el) {el.hidden=false; el.textContent=IA.messages.join(' ');}
  };
  IA.load = () => {
    try {
      const json=localStorage.getItem(IA.KEY);
      if (!json) return IA.fresh();
      const raw=JSON.parse(json);
      if (raw.version!==1 && raw.version!==2) {
        IA.readOnly=true; IA.storageAvailable=false;
        IA.notice('Os dados têm versão não reconhecida e foram preservados. '+memoryMessage);
        return IA.fresh();
      }
      const state=IA.normalize(raw);
      if (raw.version===1) IA.notice('Progresso migrado do formato v1 compatível. Desafios antigos sem produção salva precisam ser feitos novamente.');
      return state;
    } catch(error) {
      if (error instanceof SyntaxError || /inválid|inconsistente|bloqueada|Sequência|ausente|antes/.test(error.message))
        IA.notice('Encontramos dados inconsistentes. Um percurso seguro foi iniciado; os dados anteriores não foram apagados na leitura.');
      else {IA.storageAvailable=false; IA.notice(memoryMessage);}
      return IA.fresh();
    }
  };
  IA.save = () => {
    if (IA.readOnly) {IA.notice(memoryMessage); return false;}
    try {const normalized=IA.normalize(IA.state); localStorage.setItem(IA.KEY,JSON.stringify(normalized));
      IA.storageAvailable=true; return true;
    } catch(error) {IA.storageAvailable=false; IA.notice(memoryMessage); return false;}
  };
  IA.canAccess = page => {
    const s=IA.state, profile=IA.classify(s.assessment.answers).profile;
    if (page==='index' || page==='nivelamento') return true;
    if (!s.assessment.finalized) return false;
    if (page==='explorador') return profile==='explorador';
    if (page==='usuario') return profile==='usuario' || !!s.tracks.explorador.result;
    if (page==='conclusao') return !!s.tracks.usuario.result;
    return false;
  };
  IA.nextPage = () => {
    if (!IA.state.assessment.finalized) return 'nivelamento';
    if (IA.state.tracks.usuario.result) return 'conclusao';
    if (IA.canAccess('usuario')) return 'usuario';
    return 'explorador';
  };
  IA.focus = () => {const title=document.querySelector('[data-focus]'); if(title) title.focus();};
  IA.element = (tag,text,attrs={}) => {
    const e=document.createElement(tag); if(text!==undefined) e.textContent=text;
    for(const [key,value] of Object.entries(attrs)) e.setAttribute(key,value);
    return e;
  };
  IA.button = (text,action,secondary=false) => {
    const b=IA.element('button',text,{type:'button',class:secondary?'secondary':''});
    b.addEventListener('click',action); return b;
  };
  IA.link = (text,page,secondary=false) => IA.element('a',text,{href:page+'.html',class:'button'+(secondary?' secondary':'')});
  IA.heading = (text,level='h1') => IA.element(level,text,{tabindex:'-1','data-focus':''});
  IA.status = () => IA.element('p','',{role:'status','aria-live':'polite','aria-atomic':'true',class:'feedback'});
  IA.metadata = item => IA.element('p',`Objetivo: ${item.objective} · Etapa: ${item.stage} · BNCC Computação: ${item.bncc}`,{class:'metadata'});
  IA.choices = (question,name,selected,change) => {
    const field=IA.element('fieldset'); field.append(IA.element('legend',question.prompt));
    question.options.forEach((option,i) => {
      const label=IA.element('label',undefined,{class:'option'});
      const input=IA.element('input',undefined,{type:'radio',name,value:i}); input.checked=selected===i;
      input.addEventListener('change',()=>change(i)); label.append(input,IA.element('span',option)); field.append(label);
    }); return field;
  };
  IA.mount = () => {
    IA.state=IA.load();
    // Probe real persistence, including an unavailable getter, without clearing unrelated data.
    if (!IA.readOnly) try {const probe=IA.KEY+'-probe'; localStorage.setItem(probe,'1'); localStorage.removeItem(probe);}
      catch(error) {IA.storageAvailable=false; IA.notice(memoryMessage);}
    IA.messages.forEach(IA.notice);
    const page=document.body.dataset.page;
    if (!IA.canAccess(page)) {location.replace(IA.nextPage()+'.html'); return false;}
    return true;
  };
  if (typeof document!=='undefined') document.addEventListener('DOMContentLoaded',()=>{
    if(document.body.dataset.page!=='index' || !IA.mount()) return;
    const action=document.getElementById('start');
    action.href=IA.nextPage()+'.html';
    action.textContent=IA.state.assessment.answers.some(v=>v!==null)?'Retomar meu percurso':'Iniciar nivelamento';
    if(IA.state.tracks.explorador.result && !IA.state.tracks.usuario.result)
      document.getElementById('resume-note').textContent='Explorador concluída. A trilha Usuário está liberada e seu convite continua disponível.';
  });
})(globalThis.IA);
