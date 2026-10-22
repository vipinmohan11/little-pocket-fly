/* ===== v1.7.0: Fang-Szene wie im Spiel: erscheinen → Muya-Kugel werfen → 3× wackeln → gefangen! → neu im Dex ===== */
SNDS.throw=function(){var a=actx();if(!a)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime;o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(1200,t+.35);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.08,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.4);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.45)};
SNDS.tock=function(){tone(220,0,.14,.14,'triangle');tone(180,.02,.12,.08,'triangle')};
SNDS.click=function(){tone(1760,0,.06,.12);tone(2637,.05,.18,.1)};
SNDS.appear=function(){[392,494,587].forEach(function(f,i){tone(f,i*.08,.3,.08)})};
function kugel(){return '<svg viewBox="0 0 100 100"><defs><radialGradient id="kg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#FFE7A0"/><stop offset="1" stop-color="#E3A600"/></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#kg)" stroke="#fff" stroke-width="3"/><path d="M50 26l6.4 13.2 14.5 2.1-10.5 10.2 2.5 14.4L50 59.1 37.1 65.9l2.5-14.4L29.1 41.3l14.5-2.1z" fill="#fff" opacity=".95"/><circle cx="34" cy="30" r="7" fill="#fff" opacity=".7"/></svg>'}
function catchNext(){if(document.getElementById('catch')||!CATCHQ.length)return;var c=CATCHQ.shift(),sp=SPEC_BY[c.id];if(!sp)return;
 var p=S.mu.pets[sp.id]||{},st=c.dupe?c.before:1,t=dtype(sp),col=DTYPES[t][1];
 var e=document.createElement('div');e.id='catch';e.className='catch k2';e.style.setProperty('--tc',col);
 e.innerHTML='<div class="kstage"><div class="kplace">'+(c.place?esc(c.place):(sp.src==='sky'?'Am Himmel':''))+'</div><div class="kfig" id="kfig">'+cre(sp,st,1,0)+'</div><div class="kball" id="kball">'+kugel()+'</div><div class="kstars" id="kstars"></div></div>'+
  '<div class="ktext" id="ktext"><b>'+(c.dupe?'Da ist wieder ein Freund!':sp.src==='sky'?'Ein Himmels-Freund erscheint!':'Ein wilder Freund erscheint!')+'</b><span>Wer ist das wohl?</span></div>'+
  '<button class="kthrow" id="kthrow" data-act="kThrow">'+kugel()+'<span>Muya-Kugel werfen!</span></button>';
 document.body.appendChild(e);KC=c;snd('appear');buzz(40);
 setTimeout(function(){var f=document.getElementById('kfig');if(f){f.innerHTML=cre(sp,st,0,c.shiny||p.shiny);f.classList.add('show')}var tx=document.getElementById('ktext');if(tx)tx.innerHTML='<b>'+(c.dupe?'Wieder '+esc(sp.n[st-1])+'!':'Ein wilder '+esc(sp.n[0])+'!')+'</b><span>'+(c.shiny?'✦ Ein Funkel-Freund! ':'')+'Tippe auf die Kugel und wirf!</span>'},500)}
var KC=null;
ACT.kThrow=function(){var c=KC;if(!c)return;var b=document.getElementById('kthrow');if(b)b.remove();var ball=document.getElementById('kball'),fig=document.getElementById('kfig'),tx=document.getElementById('ktext');
 snd('throw');ball.classList.add('fly');tx.innerHTML='<b>Muya-Kugel!</b><span>&nbsp;</span>';
 setTimeout(function(){fig.classList.add('suck');ball.classList.add('hit')},600);
 setTimeout(function(){ball.classList.add('land')},1000);
 [1500,2200,2900].forEach(function(t,i){setTimeout(function(){ball.classList.remove('wob');void ball.offsetWidth;ball.classList.add('wob');snd('tock');buzz(25);tx.innerHTML='<b>'+['Wackel …','Wackel … wackel …','Wackel … wackel … wackel …'][i]+'</b><span>&nbsp;</span>'},t)});
 setTimeout(function(){ball.classList.remove('wob');ball.classList.add('done');snd('click');buzz([60,40,60]);var s=document.getElementById('kstars');s.innerHTML=Array.apply(null,{length:14}).map(function(_,i){var a=i/14*Math.PI*2,r=90+Math.random()*60;return '<i style="--x:'+Math.round(Math.cos(a)*r)+'px;--y:'+Math.round(Math.sin(a)*r)+'px;--d:'+(Math.random()*.2).toFixed(2)+'s"></i>'}).join('');s.classList.add('go');tx.innerHTML='<b>Gefangen!</b><span>'+esc(SPEC_BY[c.id].n[(c.dupe?c.after:1)-1])+' ist jetzt dein Freund.</span>'},3700);
 setTimeout(kEntry,5200)};
function kEntry(){var c=KC;if(!c)return;var sp=SPEC_BY[c.id],p=S.mu.pets[sp.id]||{},t=dtype(sp),st=c.dupe?c.after:1,e=document.getElementById('catch');if(!e)return;snd('fanfare');
 var grow=c.dupe&&c.after>c.before;
 e.innerHTML='<div class="kentry"><div class="kehead"><span class="kneu">'+(c.dupe?(grow?'Gewachsen!':'Wieder gefunden'):'Neu im Muya-Dex!')+'</span><span class="nr" style="color:#fff">Nr. '+dnr(sp)+'</span>'+tyb(t,1)+(p.shiny?'<span class="tyb big" style="background:#B58AE8">✦ Funkel</span>':'')+'</div>'+
  (grow?'<div class="kgrow"><div>'+cre(sp,c.before,0,p.shiny)+'</div><span>›</span><div class="big">'+cre(sp,c.after,0,p.shiny)+'</div></div>':'<div class="kepic">'+cre(sp,st,0,p.shiny)+'</div>')+
  '<h1 class="disp kename">'+esc(sp.n[st-1])+'</h1><p class="kesub">'+(grow?esc(sp.n[c.before-1])+' wird zu '+esc(sp.n[c.after-1])+'! Stufe '+c.after+' von 3':c.dupe?(nextGrow(sp.id)?'Noch '+nextGrow(sp.id)+'× finden, dann wächst er.':'Ganz groß!'):esc(sp.story))+'</p>'+
  '<div class="kxp" id="kxp">+0 XP</div>'+(c.card?'<p class="kcard">✉ Neue Postkarte im Tagebuch: <b>'+esc(c.place)+'</b><button class="b" style="margin-left:8px;background:#ffffff26;border-color:#ffffff40;color:#fff;height:36px" data-act="catchSnd" data-a="'+c.card+'">🎙 Geräusch sammeln</button></p>':'')+
  '<div class="cbt"><button class="b" style="background:#fff;color:#13324A;border-color:#fff" data-act="catchClose">Weiter</button><button class="b" style="background:#ffffff26;border-color:#ffffff40;color:#fff" data-act="catchDex">Zum Muya-Dex</button>'+(S.mu.buddy===sp.id?'':'<button class="b" style="background:#ffffff26;border-color:#ffffff40;color:#fff" data-act="catchTeam" data-a="'+sp.id+'">Als Begleiter</button>')+'</div></div>';
 var x=c.xp||0,n=0,el=document.getElementById('kxp');if(x){var iv=setInterval(function(){n=Math.min(x,n+Math.max(1,Math.round(x/12)));if(el)el.textContent='+'+n+' XP';if(n>=x){clearInterval(iv);snd('coin')}},70)}else if(el)el.remove();
 if(x)addXP(x,'',true)}

ACT.catchSnd=function(id){var e=document.getElementById('catch');if(e)e.remove();CATCHQ=[];rerender();setTimeout(function(){ACT.sndRec(id)},200)};
