const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const serve=require('../scripts/serve.cjs');
const out=path.join(__dirname,'../specs/001-trilhas-ia/qa');fs.mkdirSync(out,{recursive:true});
const checks=[];
async function run(){
 const server=http.createServer(serve);await new Promise(r=>server.listen(4174,'127.0.0.1',r));
 let browser;
 try {browser=await chromium.launch({headless:true,channel:process.env.TEST_BROWSER||'chrome'});}
 catch(error){server.close();throw error;}
 const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const url=name=>`http://127.0.0.1:4174/implementacao/${name}.html`;
 async function check(name,fn){await fn();checks.push(name);console.log('PASS',name);}
 async function seed(profile='explorador',completed=0){
  await page.goto(url('index'));
  await page.evaluate(({profile,completed})=>{
   const s=IA.fresh();s.assessment={answers:IA.data.assessment.map(q=>q.diagnostic?0:profile==='usuario'?q.correct:1-q.correct),position:9,finalized:true};
   if(completed){s.tracks[profile].started=true;s.tracks[profile].completed=completed;}
   localStorage.setItem(IA.KEY,JSON.stringify(s));
  },{profile,completed});
 }
 try{
  await check('US5: entrada, subdiretório e primeiro foco por teclado',async()=>{
   await page.goto(url('index'));await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Ir para o conteúdo');
   await page.screenshot({path:path.join(out,'inicio-desktop.png'),fullPage:true});
  });
  await check('US1: bloqueio vazio, navegação, recarga, edição e diagnóstico neutro',async()=>{
   await page.getByRole('link',{name:'Iniciar nivelamento'}).click();
   await page.getByRole('button',{name:'Próxima questão'}).click();assert.match(await page.getByRole('status').last().innerText(),/Escolha/);
   for(let i=0;i<10;i++){
    await page.locator('input[type=radio]').first().check();
    if(i===1){await page.reload();assert.ok(await page.locator('input[type=radio]').first().isChecked());}
    await page.getByRole('button',{name:i===9?'Finalizar nivelamento':'Próxima questão',exact:true}).click();
   }
   assert.equal(await page.locator('.review').count(),10);assert.equal(await page.getByText('Resposta diagnóstica, não pontuável.',{exact:false}).count(),2);
   page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Refazer nivelamento'}).click();assert.equal(await page.locator('.review').count(),10);
   page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Refazer nivelamento'}).click();
   for(let i=0;i<3;i++){await page.locator('input[type=radio]').first().check();await page.getByRole('button',{name:'Próxima questão',exact:true}).click();}
   await page.getByRole('button',{name:'Questão 1',exact:true}).click();await page.locator('input[type=radio]').nth(2).check();
   await page.reload();assert.ok(await page.locator('input[type=radio]').nth(2).isChecked());
   assert.equal(await page.locator('.review').count(),0);
  });
  await check('US2: erro específico, tentativa, feedback >700ms, módulos sequenciais e revisão',async()=>{
   await seed();await page.goto(url('explorador'));assert.equal(await page.locator('.module-nav button:disabled').count(),4);
   const wrong=await page.evaluate(()=>1-IA.data.tracks.explorador.modules[0].activity.correct);
   await page.locator('input[type=radio]').nth(wrong).check();await page.getByRole('button',{name:'Conferir minha decisão'}).click();
   assert.match(await page.locator('.feedback').innerText(),/recomendação|objetivos/);
   await page.getByRole('button',{name:'Tentar novamente'}).click();
   for(let i=0;i<5;i++){
    const correct=await page.evaluate(i=>IA.data.tracks.explorador.modules[i].activity.correct,i);
    await page.locator('input[type=radio]').nth(correct).check();await page.getByRole('button',{name:'Conferir minha decisão'}).click();
    await page.waitForTimeout(850);assert.ok(await page.getByRole('button',{name:'Continuar',exact:true}).isVisible());
    assert.equal(await page.evaluate(()=>IA.state.tracks.explorador.completed),i);
    await page.getByRole('button',{name:'Continuar',exact:true}).click();
   }
   await page.locator('.module-nav button').first().click();assert.match(await page.locator('#app').innerText(),/Revisão:/);
   assert.equal(await page.evaluate(()=>IA.state.tracks.explorador.completed),5);
   await page.getByRole('button',{name:'Desafio final',exact:true}).click();
  });
  async function fillChallenge(key,correct=true){
   const values=await page.evaluate(({key,correct})=>IA.data.tracks[key].challenge.questions.map(q=>correct?q.correct:1-q.correct),{key,correct});
   for(let i=0;i<values.length;i++)await page.locator(`[name="challenge-${i}"]`).nth(values[i]).check();
   for(let i=0;i<await page.locator('textarea').count();i++)await page.locator('textarea').nth(i).fill('Minha produção: verifico a afirmação no livro e comparo evidências. <script>não executar</script>');
  }
  await check('US2: rascunho, reprovação, espaços rejeitados e aprovação recuperável',async()=>{
   await fillChallenge('explorador',false);await page.reload();assert.match(await page.locator('textarea').inputValue(),/Minha produção/);
   await page.getByRole('button',{name:'Concluir desafio'}).click();assert.match(await page.locator('.feedback[role=status]').innerText(),/Revise/);
   await fillChallenge('explorador');await page.locator('textarea').fill('   ');await page.getByRole('button',{name:'Concluir desafio'}).click();assert.equal(await page.locator('.production').count(),0);
   await page.locator('textarea').fill('Comparo o número de estados e capitais com uma fonte geográfica identificável.');
   await page.getByRole('button',{name:'Concluir desafio'}).click();await page.reload();assert.equal(await page.locator('textarea').count(),0);
   await page.getByRole('link',{name:'Voltar ao início',exact:true}).click();assert.match(await page.locator('#resume-note').innerText(),/liberada/);
   await page.getByRole('link',{name:'Retomar meu percurso'}).click();assert.match(await page.locator('h1').innerText(),/1\./);
  });
  await check('US1: diagnóstico não pode ser refeito após iniciar trilha',async()=>{
   await page.goto(url('nivelamento'));assert.equal(await page.getByRole('button',{name:'Refazer nivelamento'}).count(),0);
  });
  await check('US3: cinco módulos, cinco produções, rubrica e conclusão sem ressubmissão',async()=>{
   await page.goto(url('usuario'));
   for(let i=0;i<5;i++){
    const correct=await page.evaluate(i=>IA.data.tracks.usuario.modules[i].activity.correct,i);
    await page.locator('input[type=radio]').nth(correct).check();await page.getByRole('button',{name:'Conferir minha decisão'}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();
   }
   assert.equal(await page.locator('textarea').count(),5);assert.equal(await page.locator('[aria-label="Rubrica de autoavaliação"] li').count(),5);
   await fillChallenge('usuario');await page.reload();assert.match(await page.locator('textarea').nth(4).inputValue(),/Minha produção/);
   await page.getByRole('button',{name:'Concluir desafio'}).click();await page.reload();assert.equal(await page.locator('.production').count(),5);
   assert.match(await page.locator('.production').first().innerText(),/<script>/);
   await page.getByRole('link',{name:'Ver conclusão',exact:true}).click();assert.match(await page.locator('h1').innerText(),/leve essas práticas/);
  });
  await check('US4: reinício cancelado preserva; confirmado limpa somente projeto',async()=>{
   await page.evaluate(()=>localStorage.setItem('outro-projeto','preservar'));
   const before=await page.evaluate(()=>localStorage.getItem(IA.KEY));
   page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Reiniciar todo o percurso'}).click();assert.equal(await page.evaluate(()=>localStorage.getItem(IA.KEY)),before);
   page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Reiniciar todo o percurso'}).click();await page.waitForURL(url('nivelamento'));
   assert.equal(await page.evaluate(()=>localStorage.getItem(IA.KEY)),null);assert.equal(await page.evaluate(()=>localStorage.getItem('outro-projeto')),'preservar');
  });
  await check('US4: acesso direto e estado corrompido recuperam com aviso',async()=>{
   for(const name of ['explorador','usuario','conclusao']){await page.goto(url(name));await page.waitForURL(url('nivelamento'));}
   await page.evaluate(()=>localStorage.setItem(IA.KEY,'{'));
   await page.reload();assert.match(await page.locator('#storage-notice').innerText(),/inconsistentes/);
  });
  await check('FR-024: armazenamento indisponível mantém interação e explica limite',async()=>{
   const blocked=await browser.newContext();await blocked.addInitScript(()=>{
    Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});
   });const p=await blocked.newPage();await p.goto(url('nivelamento'));
   assert.match(await p.locator('#storage-notice').innerText(),/não passa entre documentos/);
   await p.locator('input[type=radio]').first().check();await p.getByRole('button',{name:'Próxima questão',exact:true}).click();
   assert.match(await p.locator('.eyebrow').innerText(),/questão 2/);await blocked.close();
  });
  await check('SC-009: cinco páginas em 320px e equivalente a zoom 200%, sem overflow',async()=>{
   await seed('usuario',5);
   for(const name of ['index','nivelamento','explorador','usuario','conclusao']){
    if(name==='explorador')await seed('explorador',5);
    if(name==='usuario')await seed('usuario',5);
    if(name==='conclusao')await page.evaluate(()=>{const t=IA.state.tracks.usuario,c=IA.data.tracks.usuario.challenge;t.result={answers:c.questions.map(q=>q.correct),texts:c.fields.map(()=> 'Produção')};IA.save();});
    await page.setViewportSize({width:320,height:800});await page.goto(url(name));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),name+' 320');
    await page.screenshot({path:path.join(out,name+'-mobile.png'),fullPage:true});
    const small=await page.locator('button,a.button,.option').evaluateAll(es=>es.filter(e=>!e.disabled && e.getBoundingClientRect().width>0).filter(e=>{const r=e.getBoundingClientRect();return r.height<44 || r.width<44}).map(e=>e.textContent));assert.deepEqual(small,[],name);
    await page.setViewportSize({width:640,height:900});await page.evaluate(()=>document.body.style.zoom='200%');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),name+' zoom');
   }
  });
  await check('FR-031: jornada Usuário inteira com teclado e foco após mudanças',async()=>{
   await page.setViewportSize({width:1280,height:900});await page.goto(url('index'));
   await page.evaluate(()=>localStorage.removeItem(IA.KEY));await page.reload();
   async function reach(locator){
    for(let i=0;i<70;i++){
     if(await locator.evaluate(e=>e===document.activeElement))return;
     await page.keyboard.press('Tab');
    }throw new Error('Teclado não alcançou '+await locator.innerText());
   }
   await reach(page.locator('#start'));await page.keyboard.press('Enter');
   for(let i=0;i<10;i++){
    assert.equal(await page.locator(':focus').getAttribute('data-focus'),'');
    await reach(page.locator('input[type=radio]').first());
    const correct=await page.evaluate(i=>IA.data.assessment[i].diagnostic?0:IA.data.assessment[i].correct,i);
    if(correct>0)await page.keyboard.press('ArrowDown');else await page.keyboard.press('Space');
    const next=page.getByRole('button',{name:i===9?'Finalizar nivelamento':'Próxima questão',exact:true});
    await reach(next);await page.keyboard.press('Enter');
   }
   await reach(page.getByRole('link',{name:'Ir para trilha Usuário'}));await page.keyboard.press('Enter');
   for(let i=0;i<5;i++){
    assert.equal(await page.locator(':focus').getAttribute('data-focus'),'');
    await reach(page.locator('input[type=radio]').first());
    const correct=await page.evaluate(i=>IA.data.tracks.usuario.modules[i].activity.correct,i);
    if(correct)await page.keyboard.press('ArrowDown');else await page.keyboard.press('Space');
    await reach(page.getByRole('button',{name:'Conferir minha decisão'}));await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').innerText(),'Continuar');await page.keyboard.press('Enter');
   }
   for(let i=0;i<5;i++){
    await reach(page.locator(`[name="challenge-${i}"]`).first());
    const correct=await page.evaluate(i=>IA.data.tracks.usuario.challenge.questions[i].correct,i);
    if(correct)await page.keyboard.press('ArrowDown');else await page.keyboard.press('Space');
   }
   for(let i=0;i<5;i++){
    await reach(page.locator('textarea').nth(i));await page.keyboard.type('Vou estudar, comparar uma fonte e explicar meu raciocinio.');
   }
   await reach(page.getByRole('button',{name:'Concluir desafio'}));await page.keyboard.press('Enter');
   assert.match(await page.locator(':focus').innerText(),/concluída/);
   await reach(page.getByRole('link',{name:'Ver conclusão',exact:true}));await page.keyboard.press('Enter');
   assert.match(await page.locator(':focus').innerText(),/leve essas práticas/);
  });
  await check('FR-032: estados de módulo e feedback em 320px e contraste de tokens',async()=>{
   await page.setViewportSize({width:320,height:800});await seed();await page.goto(url('explorador'));
   for(const correct of [false,true]){
    const answer=await page.evaluate(correct=>correct?IA.data.tracks.explorador.modules[0].activity.correct:1-IA.data.tracks.explorador.modules[0].activity.correct,correct);
    await page.locator('input[type=radio]').nth(answer).check();await page.getByRole('button',{name:'Conferir minha decisão'}).click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
    await page.screenshot({path:path.join(out,correct?'feedback-acerto-mobile.png':'feedback-erro-mobile.png'),fullPage:true});
    if(!correct)await page.getByRole('button',{name:'Tentar novamente'}).click();
   }
   function luminance(hex){const v=hex.match(/\w\w/g).map(h=>parseInt(h,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];}
   function ratio(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
   const pairs=[['173c35','f7f5ee'],['405a53','f7f5ee'],['173c35','e9eee5'],['405a53','e9eee5'],['ffffff','174f43'],['8a381f','f7f5ee'],['173c35','fff0d5']];
   const ratios=pairs.map(([a,b])=>({foreground:a,background:b,ratio:ratio(a,b)}));
   ratios.forEach(r=>assert.ok(r.ratio>=4.5,JSON.stringify(r)));
   assert.ok(ratio('77918a','ffffff')>=3);assert.ok(ratio('8a381f','f7f5ee')>=3);
   fs.writeFileSync(path.join(out,'contrast-results.json'),JSON.stringify(ratios,null,2));
  });
  assert.deepEqual(errors,[]);console.log('Browser errors: 0');
  fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({checks,errors,zoom:'CSS zoom 200%, viewport 640, equivalent logical width 320; not native browser Ctrl+'},null,2));
 }finally{await browser.close();await new Promise(r=>server.close(r));}
}
run().catch(e=>{console.error(e);process.exitCode=1;});
