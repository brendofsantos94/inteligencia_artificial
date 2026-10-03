const test=require('node:test'), assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs'),path=require('node:path');
function context(storage={getItem:()=>null,setItem(){},removeItem(){}}){
 const c=vm.createContext({localStorage:storage});
 for(const name of ['data','storage']) vm.runInContext(fs.readFileSync(path.join(__dirname,'../implementacao/js/'+name+'.js'),'utf8'),c);
 return c.IA;
}
const IA=context();
function assessment(bits=255){return IA.data.assessment.map((q,i)=>q.diagnostic?0:((bits>>(i-2))&1)?q.correct:1-q.correct);}
function withProfile(profile){const s=IA.fresh();s.assessment={answers:assessment(profile==='usuario'?255:0),position:9,finalized:true};return s;}
function complete(s,key){const t=s.tracks[key],c=IA.data.tracks[key].challenge;t.started=true;t.completed=5;t.result={answers:c.questions.map(q=>q.correct),texts:c.fields.map(()=>'<texto próprio>')};return s;}
test('SC-002: todas as 256 combinações e variações diagnósticas aplicam os dois limites',()=>{
 for(let bits=0;bits<256;bits++)for(let d=0;d<9;d++){
  const a=assessment(bits);a[0]=d%3;a[1]=Math.floor(d/3);
  const expected=a.slice(2).filter((v,i)=>v===IA.data.assessment[i+2].correct).length;
  const critical=[2,4,7].filter(i=>a[i]===IA.data.assessment[i].correct).length;
  const got=IA.classify(a);assert.equal(got.score,expected);assert.equal(got.critical,critical);
  assert.equal(got.profile,expected>=5 && critical>=2?'usuario':'explorador');
 }
});
test('estado novo e parcialmente respondido válido',()=>{const s=IA.fresh();IA.normalize(s);s.assessment.answers[0]=1;IA.normalize(s);});
test('rejeita diagnóstico final incompleto, posição impossível, resposta fora da faixa e lacunas',()=>{
 const changes=[s=>s.assessment.finalized=true,s=>s.assessment.position=4,s=>s.assessment.answers[0]=9,s=>s.assessment.answers[2]=1];
 for(const change of changes){const s=IA.fresh();change(s);assert.throws(()=>IA.normalize(s));}
});
test('rejeita perfil/progressão/acesso incoerentes',()=>{
 const changes=[s=>s.tracks.usuario.started=true,s=>s.tracks.explorador.completed=2,s=>s.tracks.explorador.completed=6];
 for(const change of changes){const s=withProfile('explorador');change(s);assert.throws(()=>IA.normalize(s));}
 const s=withProfile('usuario');s.tracks.explorador.started=true;assert.throws(()=>IA.normalize(s));
});
test('desafios exigem todas as decisões, limiar e textos não vazios',()=>{
 for(const key of ['explorador','usuario']){
  const c=IA.data.tracks[key].challenge, draft={answers:c.questions.map(q=>q.correct),texts:c.fields.map(()=> 'Minha produção')};
  assert.ok(IA.challengeValid(key,draft));draft.texts[0]='   ';assert.ok(!IA.challengeValid(key,draft));
  draft.texts[0]='Texto';draft.answers[0]=null;assert.ok(!IA.challengeValid(key,draft));
  draft.answers=c.questions.map(q=>1-q.correct);assert.ok(!IA.challengeValid(key,draft));
  draft.answers[0]=c.questions[0].correct;draft.answers[1]=c.questions[1].correct;assert.ok(!IA.challengeValid(key,draft));
  draft.answers[2]=c.questions[2].correct;assert.ok(IA.challengeValid(key,draft));
 }
});
test('resultado adulterado e produção excessiva rejeitados',()=>{
 const s=complete(withProfile('usuario'),'usuario');s.tracks.usuario.result.texts[0]=' ';assert.throws(()=>IA.normalize(s));
 s.tracks.usuario.result.texts[0]='a'.repeat(4001);assert.throws(()=>IA.normalize(s));
});
test('permissões de cada etapa e revisão após conclusão',()=>{
 IA.state=IA.fresh();assert.equal(IA.nextPage(),'nivelamento');assert.ok(!IA.canAccess('conclusao'));assert.ok(!IA.canAccess('usuario'));
 IA.state=withProfile('explorador');assert.ok(IA.canAccess('explorador'));assert.ok(!IA.canAccess('usuario'));
 complete(IA.state,'explorador');assert.ok(IA.canAccess('usuario'));assert.equal(IA.nextPage(),'usuario');
 complete(IA.state,'usuario');assert.ok(IA.canAccess('conclusao'));assert.ok(IA.canAccess('explorador'));assert.equal(IA.nextPage(),'conclusao');
 IA.normalize(IA.state);
});
test('migração v1 sintética preserva módulos sem inventar resultado',()=>{
 const s=withProfile('explorador');s.version=1;s.tracks.explorador.started=true;s.tracks.explorador.completed=5;
 s.tracks.explorador.challengeCompleted=true;delete s.tracks.explorador.draft;
 const migrated=IA.normalize(s);assert.equal(migrated.version,2);assert.equal(migrated.tracks.explorador.completed,5);
 assert.equal(migrated.tracks.explorador.result,null);assert.equal(migrated.tracks.explorador.draft.texts[0],'');
});
test('migração v1 preserva resultado completo verificável',()=>{
 const s=complete(withProfile('usuario'),'usuario');s.version=1;const migrated=IA.normalize(s);
 assert.equal(migrated.tracks.usuario.result.texts[0],'<texto próprio>');
});
test('T050: resultado v1 sem texto preserva módulos e não inventa produção/pontuação',()=>{
 const s=withProfile('usuario');s.version=1;s.tracks.usuario.started=true;s.tracks.usuario.completed=5;
 s.tracks.usuario.result={answers:[0,0,1,0,1],score:5};delete s.tracks.usuario.draft;
 const migrated=IA.normalize(s);assert.equal(migrated.tracks.usuario.completed,5);
 assert.equal(migrated.tracks.usuario.result,null);assert.ok(migrated.tracks.usuario.draft.texts.every(t=>t===''));
});
test('versão futura preservada sem sobrescrita',()=>{
 let writes=0;const c=context({getItem:()=>'{"version":99}',setItem(){writes++},removeItem(){}});
 c.state=c.load();assert.equal(c.readOnly,true);assert.equal(c.save(),false);assert.equal(writes,0);
});
test('JSON corrompido recupera percurso com aviso, sem limpar armazenamento',()=>{
 let writes=0;const c=context({getItem:()=>'{',setItem(){writes++},removeItem(){writes++}});
 const s=c.load();assert.equal(s.assessment.finalized,false);assert.ok(c.messages.length);assert.equal(writes,0);
});
test('falha de getter/leitura e gravação tem aviso e memória temporária',()=>{
 const c=context({getItem(){throw Error('SecurityError')},setItem(){throw Error('QuotaExceededError')},removeItem(){}});
 c.state=c.load();assert.equal(c.save(),false);assert.ok(c.messages.join(' ').includes('não passa entre documentos'));
});
test('conteúdo contém exatamente 10 módulos e 2 desafios com metadados e feedback específico',()=>{
 assert.equal(IA.data.assessment.length,10);assert.equal(IA.data.assessment.filter(q=>q.diagnostic).length,2);
 assert.equal(IA.data.assessment.filter(q=>q.critical).length,3);
 for(const t of Object.values(IA.data.tracks)){
  assert.equal(t.modules.length,5);assert.equal(t.challenge.stage,'Criar');
  for(const m of [...t.modules,t.challenge]){assert.ok(m.objective);assert.ok(m.stage);assert.match(m.bncc,/EM13CO/);}
  for(const q of [...t.modules.map(m=>m.activity),...t.challenge.questions]){
   assert.equal(q.feedback.length,q.options.length);assert.notEqual(q.feedback[0],q.feedback[1]);
  }
 }
});
