/* ===== Wie fliegt das? – fixed-screen chapters: steps + live simulation + challenges ===== */
var WZ={ch:0,step:0,q:null,ans:null,fact:0,last:null},SIMV=null;
function chMastery(w){var n=w.qs.filter(function(q){return S.wissen.ok[q.id]}).length;return{n:n,of:w.qs.length}}
ROUTES.wie=function(a){if(a[0]){for(var i=0;i<WISSEN.length;i++)if(WISSEN[i].id===a[0])return chapterHtml(i)}
 var tot=0,ok=0;WISSEN.forEach(function(w){var m=chMastery(w);tot+=m.of;ok+=m.n});
 var CHIC={auftrieb:IC.wing,kraefte:IC.plane,steuern:IC.compass,triebwerk:IC.gear,innen:IC.suitcase,start:IC.flag,wetter:IC.cloud,wege:IC.map};
 var tiles=WISSEN.map(function(w,i){var m=chMastery(w),done=S.earned['wis-'+w.id],nq=w.qs.filter(function(q){return !S.wissen.ok[q.id]})[0],col=w.c==='#B5D5FF'?'#2779A7':w.c;
  return '<a class="tl" href="#/wie/'+w.id+'" style="padding:14px 16px;gap:6px;overflow:hidden;background:linear-gradient(160deg,'+w.c+'55,var(--paper) 65%)"><span style="position:absolute;right:-14px;bottom:-14px;width:120px;opacity:.13">'+ICON(CHIC[w.id],'#13324A',1.6)+'</span><div class="row"><span class="disp" style="font-size:40px;color:'+col+'">'+(i+1)+'</span><b style="font-size:19px;flex:1">'+esc(w.t)+'</b><span style="position:relative;display:grid;place-items:center">'+ring(m.n/m.of,42,done?'#49C5B6':'#13324A',5)+'<b style="position:absolute;font-size:11px">'+m.n+'/'+m.of+'</b></span></div>'+
  '<div class="wrap" style="gap:4px">'+w.steps.map(function(st){return '<span class="tag" style="background:rgba(255,255,255,.7)">'+esc(st[0])+'</span>'}).join('')+'</div><div class="sp"></div>'+
  (done?'<span class="tag" style="background:#B1EAC4;align-self:flex-start">Kapitel-Meister ✓</span>':'<div style="font-size:13px;line-height:1.3"><span class="lab">Nächste Herausforderung</span><br><b>'+esc(nq?nq.q:'Alles gemeistert')+'</b></div>')+'</a>'}).join('');
 return screen(head('WIE FLIEGT DAS?','Flug-Labor','/','<span class="lab" style="text-align:right">'+ok+' von '+tot+'<br>Aufgaben gemeistert</span>'),
 '<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:14px;height:100%">'+tiles+'</div>')};
function chapterHtml(i){var w=WISSEN[i];if(WZ.ch!==i){WZ={ch:i,step:0,q:null,ans:null,fact:Math.floor(Math.random()*w.facts.length),last:null}}S.wissen.read[w.id]=1;save();
 var m=chMastery(w);
 var right='<span id="mast" style="position:relative;display:grid;place-items:center">'+ring(m.n/m.of,46,'#49C5B6',6)+'<b style="position:absolute;font-size:11px">'+m.n+'/'+m.of+'</b></span>'+(i>0?'<a class="ib" href="#/wie/'+WISSEN[i-1].id+'" aria-label="Vorheriges Kapitel">‹</a>':'')+(i<WISSEN.length-1?'<a class="ib" href="#/wie/'+WISSEN[i+1].id+'" aria-label="Nächstes Kapitel">›</a>':'');
 return screen(head('KAPITEL '+(i+1)+' VON '+WISSEN.length+' · WIE FLIEGT DAS?',esc(w.t),'/wie',right),
 '<div style="display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:14px;height:100%">'+
 '<div style="display:flex;flex-direction:column;gap:10px;min-height:0"><div id="steps" class="scroll" style="display:flex;gap:6px;overflow-x:auto;flex:none;padding-bottom:2px"></div>'+
 '<div class="pn" id="stage" style="flex:1;min-height:0;position:relative;overflow:hidden;display:flex;flex-direction:column"></div>'+
 '<div class="dark" id="stext" style="padding:12px 18px;flex:none;min-height:74px"></div></div>'+
 '<div style="display:flex;flex-direction:column;gap:10px;min-height:0"><div class="pn scroll" id="chal" style="flex:1;min-height:0;padding:16px"></div><div class="pn" id="fact" style="padding:12px 14px;flex:none"></div></div></div>')}
ROUTES['post:wie']=function(a){if(!a[0]){SIMV=null;return}var w=WISSEN[WZ.ch];SIMV=SIMS[w.sim]($('#stage'));drawSteps();setStep(WZ.step);drawChal();drawFact()};
function drawSteps(){var w=WISSEN[WZ.ch];$('#steps').innerHTML=w.steps.map(function(s,j){return '<button class="chip'+(j===WZ.step?' on':'')+'" data-act="wStep" data-a="'+j+'"><b>'+(j+1)+'</b> '+esc(s[0])+'</button>'}).join('')}
function stepText(j){var w=WISSEN[WZ.ch],s=w.steps[j];if(!s||!$('#stext'))return;WZ.step=j;drawSteps();$('#stext').innerHTML='<span class="lab">'+esc(S.names.mascot)+' erklärt · Schritt '+(j+1)+' von '+w.steps.length+'</span><p style="font-size:16px;margin-top:4px"><b>'+esc(s[0])+':</b> '+esc(s[1])+'</p>'}
function setStep(j){var w=WISSEN[WZ.ch],s=w.steps[j];WZ.step=j;drawSteps();$('#stext').innerHTML='<span class="lab">'+esc(S.names.mascot)+' erklärt · Schritt '+(j+1)+' von '+w.steps.length+'</span><p style="font-size:16px;margin-top:4px"><b>'+esc(s[0])+':</b> '+esc(s[1])+'</p>';if(SIMV)SIMV.set(s[2])}
ACT.wStep=function(j){setStep(+j)};
function drawFact(){var w=WISSEN[WZ.ch];$('#fact').innerHTML='<div class="row"><span class="lab">Wusstest du?</span><div class="sp"></div><button class="b s" data-act="wFact">Noch eins</button></div><p style="font-size:14px;margin-top:6px">'+esc(w.facts[WZ.fact%w.facts.length])+'</p>'}
ACT.wFact=function(){WZ.fact++;drawFact()};
/* ---------- challenges ---------- */
function pickQ(){WZ.hint=0;WZ.g0=null;WZ.touched=0;WZ.gc=0;var w=WISSEN[WZ.ch];var c=w.qs.filter(function(q){return !S.wissen.ok[q.id]&&q.id!==WZ.last});if(!c.length)c=w.qs.filter(function(q){return q.id!==WZ.last});
 c.sort(function(a,b){return((S.wissen.seen[a.id]||0)-(S.wissen.seen[b.id]||0))||(Math.random()-.5)});return c[0]}
function drawChal(){var w=WISSEN[WZ.ch];if(!WZ.q){WZ.q=pickQ();WZ.ans=null;WZ.seq=[];WZ.mis=0;WZ.mt={};WZ.ml=null;WZ.sh=shuffle(rnd(Date.now()),WZ.q.o||[]);WZ.shr=shuffle(rnd(Date.now()+7),(WZ.q.p||[]).map(function(x){return x[1]}))}
 var q=WZ.q,done=WZ.ans!=null,h='<div class="row"><span class="lab">Herausforderung</span><div class="sp"></div>'+(S.wissen.ok[q.id]?'<span class="tag" style="background:#B1EAC4">schon gemeistert</span>':'<span class="tag">'+({mc:'Wissen',tf:'Stimmt das?',order:'Sortieren',match:'Verbinden',tap:'Im Bild tippen',goal:'Experiment',pred:'Vorhersage'}[q.t])+'</span>')+'</div><p style="font-size:18px;font-weight:800;margin:10px 0 8px;line-height:1.3">'+esc(q.q)+'</p>';
 if(q.t==='mc'||q.t==='pred')h+=q.o.map(function(o,k){var c=!done?'':k===q.a?' ok':k===WZ.ans?' no':' dim';return '<button class="qo'+c+'" data-act="qAns" data-a="'+k+'">'+esc(o)+'</button>'}).join('');
 if(q.t==='tf')h+=[[true,'Stimmt'],[false,'Stimmt nicht']].map(function(o){var c=!done?'':o[0]===q.a?' ok':o[0]===WZ.ans?' no':' dim';return '<button class="qo'+c+'" data-act="qAns" data-a="'+o[0]+'">'+o[1]+'</button>'}).join('');
 if(q.t==='order')h+='<div class="wrap" style="min-height:44px;padding:8px;border-radius:14px;background:var(--soft);margin-bottom:8px">'+WZ.seq.map(function(x,k){return '<span class="chip on">'+(k+1)+'. '+esc(x)+'</span>'}).join('')+'</div><div class="wrap">'+WZ.sh.filter(function(x){return WZ.seq.indexOf(x)<0}).map(function(x){return '<button class="chip" data-act="qOrd" data-a="'+esc(x)+'">'+esc(x)+'</button>'}).join('')+'</div>';
 if(q.t==='match'){h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+'<div class="col" style="gap:6px">'+q.p.map(function(p,k){var m=WZ.mt[k];return '<button class="qo'+(m?' ok':'')+'" style="margin:0;'+(WZ.ml===k?'border-color:#13324A;border-width:3px':'')+'" data-act="qML" data-a="'+k+'">'+esc(p[0])+'</button>'}).join('')+'</div><div class="col" style="gap:6px">'+WZ.shr.map(function(r){var used=q.p.some(function(p,k){return WZ.mt[k]&&p[1]===r});return '<button class="qo'+(used?' ok':'')+'" style="margin:0" data-act="qMR" data-a="'+esc(r)+'">'+esc(r)+'</button>'}).join('')+'</div></div>'}
 if(q.t==='tap')h+='<p class="muted">Tippe direkt im Bild links.</p>';
 if(q.t==='goal'&&!done)h+='<p class="muted">Benutze die Regler im Experiment. Sobald es klappt, merkt '+esc(S.names.mascot)+' es sofort.</p>'+(WZ.hint?'<p class="okmsg" style="margin:8px 0;padding:8px 12px;border-radius:12px;background:#E4F0FF"><b>Tipp:</b> Ändere immer nur einen Regler und schau, was im Bild passiert. Dann stell ihn so ein, dass es passt.</p><button class="b s" data-act="qGive">Lösung zeigen</button>':'<button class="b s" data-act="qGive">Ich brauche einen Tipp</button>');
 if(done){var ok=WZ.res;h+='<div class="okmsg" style="margin-top:10px;padding:10px 12px;border-radius:14px;background:'+(ok?'#B1EAC4':'#FFF1CC')+'"><b>'+(ok?['Richtig!','Stark!','Genau!','Super gemacht!'][Math.floor(Math.random()*4)]:'Gut probiert! So ist es: ')+'</b> '+esc(q.w)+'</div><button class="b p" style="margin-top:12px;width:100%" data-act="qNext">Nächste Herausforderung '+arrow('#fff')+'</button>'}
 var m=chMastery(w);h+='<div style="margin-top:14px"><div class="row"><span class="lab">Kapitel-Meister</span><div class="sp"></div><span class="lab">'+m.n+' / '+m.of+'</span></div><div class="bar" style="margin-top:6px"><i style="width:'+(m.n/m.of*100)+'%"></i></div></div>';
 $('#chal').innerHTML=h;
 if(q.t==='goal'&&!done){clearInterval(WZ.gi);WZ.gi=setInterval(function(){if(!SIMV||WZ.ans!=null){clearInterval(WZ.gi);return}var cur=SIMV.get(),sg={};Object.keys(cur).forEach(function(k){if(k!=='off'&&k!=='rot'&&k!=='t'&&k!=='hl')sg[k]=cur[k]});var j=JSON.stringify(sg);if(WZ.g0==null)WZ.g0=j;else if(j!==WZ.g0)WZ.touched=1;if(WZ.touched&&GOALS[q.chk]&&GOALS[q.chk](cur))WZ.gc=(WZ.gc||0)+1;else WZ.gc=0;if(WZ.gc>=3)finishQ(true,'ok')},400);CLEAN.push(function(){clearInterval(WZ.gi)})}}
function finishQ(ok,ans){var q=WZ.q;WZ.ans=ans;WZ.res=ok;S.wissen.seen[q.id]=(S.wissen.seen[q.id]||0)+1;if(ok)S.wissen.ok[q.id]=1;ev(ok?'chalok':'chal',1,q.id);save();
 if(q.t==='pred'&&q.set&&SIMV)SIMV.set(q.set);drawChal();var w=WISSEN[WZ.ch],m=chMastery(w);var mm=$('#mast');if(mm)mm.innerHTML=ring(m.n/m.of,46,'#49C5B6',6)+'<b style="position:absolute;font-size:11px">'+m.n+'/'+m.of+'</b>'}
ACT.qAns=function(v){if(WZ.ans!=null)return;var q=WZ.q;var a=q.t==='tf'?v==='true':+v;finishQ(a===q.a,a)};
ACT.qNext=function(){WZ.last=WZ.q.id;WZ.q=null;drawChal()};
ACT.qGive=function(){if(!WZ.hint){WZ.hint=1;drawChal();return}finishQ(false,'give')};
ACT.qOrd=function(x){var q=WZ.q;if(WZ.ans!=null)return;if(q.o[WZ.seq.length]===x){WZ.seq.push(x);if(WZ.seq.length===q.o.length){finishQ(WZ.mis<=1,'ok');return}}else{WZ.mis++;toast('Fast! Probier eine andere Karte.')}drawChal()};
ACT.qML=function(k){if(WZ.ans!=null)return;WZ.ml=+k;drawChal()};
ACT.qMR=function(r){var q=WZ.q;if(WZ.ans!=null||WZ.ml==null)return;if(q.p[WZ.ml][1]===r){WZ.mt[WZ.ml]=1;WZ.ml=null;if(Object.keys(WZ.mt).length===q.p.length){finishQ(WZ.mis<=1,'ok');return}}else{WZ.mis++;toast('Fast! Probier ein anderes Paar.')}drawChal()};
ACT.simHit=function(z){if(!SIMV)return;if(SIMV.hit)SIMV.hit(z);var q=WZ.q;if(q&&q.t==='tap'&&WZ.ans==null)finishQ(z===q.hit,z)};
var GOALS={
 liftHover:function(s){return s.v>=400&&s.v<=500&&s.L>=92&&s.L<=108},liftSlow:function(s){return s.v<=320&&s.L>=95&&s.L<=120&&s.a<=15},
 forceClimb:function(s){return s.climb>3},forceLevel:function(s){return Math.abs(s.L-s.W)<5&&s.T>15},
 steerRight:function(s){return s.r>=15},steerUp:function(s){return s.p>=10},steerYawL:function(s){return s.y<=-15},
 engFull:function(s){return s.thr>=90},inAlt:function(s){return s.alt>=10},wxTrail:function(s){return s.alt>=8},
 cEast:function(s){return angDiff(s.h,90)<=10},cSouth:function(s){return angDiff(s.h,180)<=10},cBcn:function(s){return angDiff(s.h,BRG_BCN)<=8}};
function angDiff(a,b){return Math.abs(((a-b+540)%360)-180)}

/* ---------- shared drawings (nose to the right / up) ---------- */
function planeSide(o){o=o||{};var el=o.el||0,sp=o.sp?1:0;
 return '<g><path d="M-120,-24 L-158,-84 L-136,-84 L-80,-24 Z" fill="#FF6A52" stroke="#13324A" stroke-width="2.5" stroke-linejoin="round"/>'+
 '<path data-act="simHit" data-a="rudder" d="M-120,-24 L-158,-84 L-147,-84 L-109,-24 Z" fill="'+(o.ru?'#ECD06F':'#E04F3A')+'" stroke="#13324A" stroke-width="1.5"/>'+
 '<path d="M-165,-16 L-150,-24 L110,-24 C145,-24 165,-12 172,0 C165,12 145,16 115,16 L-80,16 C-115,16 -145,4 -165,-16 Z" fill="#fff" stroke="#13324A" stroke-width="2.5"/>'+
 '<path d="M-140,-6 L172,-6" stroke="#2779A7" stroke-width="3"/>'+
 Array.apply(null,{length:16}).map(function(_,i){return '<circle cx="'+(-108+i*13)+'" cy="-13" r="3.2" fill="#9ACDEB" stroke="#13324A" stroke-width="1"/>'}).join('')+
 '<path d="M141,-18 L160,-13 L163,-6 L143,-9 Z" fill="#13324A"/><rect x="118" y="-21" width="9" height="22" rx="2" fill="none" stroke="#13324A" stroke-width="1.2"/>'+
 '<path d="M-112,-15 L-150,-15 L-150,-11 L-112,-11 Z" fill="#CBD1D5" stroke="#13324A" stroke-width="1.5"/>'+
 '<g transform="rotate('+(el*1.4)+' -150 -13)"><rect data-act="simHit" data-a="elevator" x="-170" y="-15.5" width="20" height="5" rx="2" fill="'+(el?'#ECD06F':'#49C5B6')+'" stroke="#13324A" stroke-width="1.5"/></g>'+
 '<path d="M-34,4 C-10,-3 44,-3 66,2 C44,9 -10,11 -34,4 Z" fill="#CBD1D5" stroke="#13324A" stroke-width="2"/>'+(sp?'<path d="M10,-1 L30,-14" stroke="#FF6A52" stroke-width="5" stroke-linecap="round"/>':'')+
 '<path d="M24,12 L38,12 L36,20 L26,20 Z" fill="#9AA3A8"/><rect x="6" y="18" width="62" height="22" rx="11" fill="#E9ECEE" stroke="#13324A" stroke-width="2"/><ellipse cx="66" cy="29" rx="4" ry="10" fill="#13324A"/>'+
 (o.gear?'<g stroke="#13324A" stroke-width="3"><line x1="-6" y1="16" x2="-6" y2="40"/><line x1="140" y1="12" x2="140" y2="38"/></g><circle cx="-6" cy="44" r="7" fill="#13324A"/><circle cx="140" cy="41" r="5.5" fill="#13324A"/>':'')+'</g>'}
function planeTop(o){o=o||{};var ail=o.r||0,el=o.p||0,ru=o.y||0;function cAil(s){return ail===0?'#49C5B6':((ail>0)===(s>0)?'#ECD06F':'#FF6A52')}
 var w='';[1,-1].forEach(function(s){w+='<path d="M'+(18*s)+',-30 L'+(190*s)+',40 L'+(190*s)+',58 L'+(120*s)+',52 L'+(18*s)+',30 Z" fill="#E9ECEE" stroke="#13324A" stroke-width="2.5" stroke-linejoin="round"/>'+
  '<path data-act="simHit" data-a="aileron" d="M'+(125*s)+',43 L'+(186*s)+',48 L'+(186*s)+',58 L'+(125*s)+',53 Z" fill="'+cAil(s)+'" stroke="#13324A" stroke-width="1.5"/>'+
  '<path d="M'+(22*s)+',22 L'+(116*s)+',42 L'+(116*s)+',51 L'+(22*s)+',31 Z" fill="'+(o.sp?'#FF6A52':'#CBD1D5')+'" stroke="#13324A" stroke-width="1.2"/>'+
  '<rect x="'+(s>0?62:-80)+'" y="-22" width="18" height="50" rx="8" fill="#fff" stroke="#13324A" stroke-width="2"/>'+
  '<path d="M'+(18*s)+',122 L'+(78*s)+',150 L'+(78*s)+',162 L'+(18*s)+',152 Z" fill="#E9ECEE" stroke="#13324A" stroke-width="2"/>'+
  '<path data-act="simHit" data-a="elevator" d="M'+(18*s)+',146 L'+(78*s)+',156 L'+(78*s)+',162 L'+(18*s)+',152 Z" fill="'+(el?'#ECD06F':'#49C5B6')+'" stroke="#13324A" stroke-width="1.2"/>'});
 return '<g>'+w+'<path d="M0,-170 C14,-160 18,-130 18,-100 L18,130 C18,150 8,165 0,172 C-8,165 -18,150 -18,130 L-18,-100 C-18,-130 -14,-160 0,-170 Z" fill="#fff" stroke="#13324A" stroke-width="2.5"/><path d="M-9,-150 Q0,-158 9,-150 L8,-142 Q0,-147 -8,-142 Z" fill="#13324A"/>'+
 '<rect x="-4" y="128" width="8" height="44" rx="3" fill="#FF6A52" stroke="#13324A" stroke-width="1.5"/><g transform="rotate('+(-ru*1.5)+' 0 158)"><rect data-act="simHit" data-a="rudder" x="-4" y="158" width="8" height="20" rx="3" fill="'+(ru?'#ECD06F':'#E04F3A')+'" stroke="#13324A" stroke-width="1.5"/></g></g>'}
function planeRear(o){o=o||{};var r=o.r||0;var k=Math.max(-1,Math.min(1,r/25));
 return '<g><path d="M-26,4 L-215,-16 L-215,-8 L-26,14 Z M26,4 L215,-16 L215,-8 L26,14 Z" fill="#E9ECEE" stroke="#13324A" stroke-width="2.5" stroke-linejoin="round"/>'+
 '<g data-act="simHit" data-a="aileron"><rect x="-205" y="'+(-12+k*9)+'" width="50" height="6" rx="2" fill="'+(k?'#FF6A52':'#49C5B6')+'" stroke="#13324A" stroke-width="1.5" transform="rotate('+(-k*14)+' -180 -9)"/><rect x="155" y="'+(-12-k*9)+'" width="50" height="6" rx="2" fill="'+(k?'#ECD06F':'#49C5B6')+'" stroke="#13324A" stroke-width="1.5" transform="rotate('+(-k*14)+' 180 -9)"/></g>'+
 '<rect x="-72" y="-34" width="144" height="6" rx="3" fill="#E9ECEE" stroke="#13324A" stroke-width="2"/><path d="M-5,-30 L-5,-108 L5,-108 L5,-30 Z" fill="#FF6A52" stroke="#13324A" stroke-width="2"/>'+
 '<circle r="30" fill="#fff" stroke="#13324A" stroke-width="2.5"/><circle cx="-80" cy="24" r="15" fill="#fff" stroke="#13324A" stroke-width="2.5"/><circle cx="-80" cy="24" r="7" fill="#13324A"/><circle cx="80" cy="24" r="15" fill="#fff" stroke="#13324A" stroke-width="2.5"/><circle cx="80" cy="24" r="7" fill="#13324A"/></g>'}
function svgStage(vb,inner){return '<svg viewBox="'+vb+'" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">'+inner+'</svg>'}
function ctlRow(inner){return '<div style="flex:none;display:flex;gap:16px;align-items:center;padding:10px 16px;border-top:1.5px solid var(--line);flex-wrap:wrap">'+inner+'</div>'}
function rng(id,min,max,val,label,unit,step){return '<label style="flex:1;min-width:190px"><span class="row"><b style="font-size:14px">'+label+'</b><div class="sp"></div><span class="lab" id="'+id+'v">'+val+' '+unit+'</span></span><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'" value="'+val+'"></label>'}
function bindRange(id,unit,fn){var e=$('#'+id);if(!e)return;e.addEventListener('input',function(){$('#'+id+'v').textContent=fmt(e.value)+' '+unit;fn(+e.value)})}
function setRange(id,v,unit){var e=$('#'+id);if(e){e.value=v;$('#'+id+'v').textContent=fmt(v)+' '+unit}}
function loop(fn){var on=true,t0=performance.now();function f(t){if(!on)return;var dt=Math.min(.05,(t-t0)/1000);t0=t;fn(dt,t/1000);requestAnimationFrame(f)}requestAnimationFrame(f);CLEAN.push(function(){on=false})}
var SIMS={};

/* 1 · Auftrieb: particle airflow around a wing */
SIMS.lift=function(st){var s={v:450,a:6,f:0,L:100,alt:0.5};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative"><canvas id="lc" style="position:absolute;inset:0;width:100%;height:100%"></canvas><div id="lread" style="position:absolute;left:14px;top:12px" class="tag"></div></div>'+ctlRow(rng('lv',100,900,450,'Tempo','km/h',10)+rng('la',-4,20,6,'Anstellwinkel','°')+'<button class="b s" id="lf">Klappen: aus</button>');
 var cv=$('#lc'),cx=cv.getContext('2d'),W=0,H=0,P=[];function size(){var r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)}size();
 var ro=new ResizeObserver(size);ro.observe(cv);CLEAN.push(function(){ro.disconnect()});
 for(var i=0;i<170;i++)P.push({x:Math.random(),y:Math.random(),age:Math.random()});
 function calc(){var cl=s.a<=15?0.1*(s.a+2):0.1*17*Math.max(.35,1-(s.a-15)/7);cl+=s.f?0.5:0;s.L=Math.round(Math.pow(s.v/450,2)*cl/0.8*100);s.cl=cl}
 calc();
 bindRange('lv','km/h',function(v){s.v=v;calc()});bindRange('la','°',function(v){s.a=v;calc()});
 $('#lf').addEventListener('click',function(){s.f=s.f?0:1;$('#lf').textContent='Klappen: '+(s.f?'aus­gefahren':'aus');$('#lf').className='b s'+(s.f?' y':'');calc()});
 function wingPath(ox,oy,ch,ang){var pts=[];for(var k=0;k<=24;k++){var t=k/24,x=1-t,th=0.12*ch*(2.97*Math.sqrt(x)-1.26*x-3.52*x*x+2.84*x*x*x-1.015*x*x*x*x);var cam=0.05*ch*4*x*(1-x);pts.push([x*ch,-(cam+th)])}
  for(k=24;k>=0;k--){t=k/24;x=1-t;th=0.12*ch*(2.97*Math.sqrt(x)-1.26*x-3.52*x*x+2.84*x*x*x-1.015*x*x*x*x);cam=0.05*ch*4*x*(1-x);pts.push([x*ch,-(cam-th)])}
  var c=Math.cos(ang),sn=Math.sin(ang);return pts.map(function(p){var x=p[0]-ch*0.35,y=p[1];return[ox-(x*c+y*sn),oy+(-x*sn+y*c)]})}
 loop(function(dt,t){var cxW=W*0.5,cyW=H*0.52,ch=Math.min(W*0.42,H*0.9),ang=s.a*Math.PI/180,stall=s.a>15;
  s.alt=Math.max(0,Math.min(1,s.alt+(s.L-100)/100*dt*0.25));
  cx.clearRect(0,0,W,H);var g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#DCEEFF');g.addColorStop(1,'#F5F0E6');cx.fillStyle=g;cx.fillRect(0,0,W,H);
  var spd=s.v/450*0.38;
  P.forEach(function(p){var x=p.x*W,y=p.y*H;var dx=x-cxW,dy=y-cyW;var r=Math.sqrt(dx*dx+dy*dy)/ch;
   var vy=0,vx=-spd;var near=Math.exp(-Math.pow(dy/(ch*0.28),2));
   if(dx>ch*0.15)vy+=-s.cl*0.06*near*Math.exp(-(dx-ch*0.15)/(ch*0.5));
   if(dx<ch*0.2){vy+=s.cl*0.11*near*(stall?0.35:1)}
   if(Math.abs(dx)<ch*0.6&&dy<0&&dy>-ch*0.3)vx*=1+0.6*near*(stall?0.2:1);
   if(stall&&dx<ch*0.25&&dy<0&&dy>-ch*0.35){vx*=0.4;vy+=(Math.sin(t*9+p.age*20))*0.25;}
   p.x+=vx*dt;p.y+=vy*dt;
   var wy=cyW-Math.tan(ang)*(dx);if(Math.abs(dx)<ch*0.6&&Math.abs(y-wy)<ch*0.04){p.y+=(y<wy?-1:1)*0.004}
   if(p.x<0||p.y<0||p.y>1){p.x=1+Math.random()*0.05;p.y=Math.random();}
   cx.strokeStyle=(dy<0&&Math.abs(dx)<ch*0.6)?'rgba(39,121,167,.85)':'rgba(39,121,167,.45)';cx.lineWidth=2.4;cx.lineCap='round';cx.beginPath();cx.moveTo(x,y);cx.lineTo(x-vx*W*0.07,y-vy*H*0.07);cx.stroke()});
  var wp=wingPath(cxW,cyW,ch,ang);cx.beginPath();wp.forEach(function(p,k){if(k)cx.lineTo(p[0],p[1]);else cx.moveTo(p[0],p[1])});cx.closePath();cx.fillStyle='#13324A';cx.fill();
  if(s.f){var te=wp[0];cx.save();cx.translate(te[0],te[1]);cx.rotate(-ang-0.5);cx.fillStyle='#ECD06F';cx.fillRect(-ch*0.16,-3,ch*0.16,7);cx.restore()}
  function arr(x,y,len,col,lab,up){cx.strokeStyle=col;cx.fillStyle=col;cx.lineWidth=9;cx.lineCap='round';cx.beginPath();cx.moveTo(x,y);cx.lineTo(x,y+(up?-len:len));cx.stroke();cx.beginPath();var ty=y+(up?-len-12:len+12);cx.moveTo(x-12,ty+(up?12:-12));cx.lineTo(x+12,ty+(up?12:-12));cx.lineTo(x,ty);cx.fill();cx.font='800 15px Figtree';cx.fillStyle='#13324A';cx.fillText(lab,x+16,ty+(up?8:0))}
  arr(cxW,cyW-ch*0.08,Math.min(H*0.38,s.L/100*H*0.2),'#49C5B6','Auftrieb '+s.L+' %',true);arr(cxW+ch*0.12,cyW+ch*0.06,H*0.2,'#FF6A52','Gewicht',false);
  var bx=W-34,top=H*0.12,bot=H*0.88;cx.fillStyle='rgba(19,50,74,.08)';cx.fillRect(bx-4,top,8,bot-top);var py=bot-(bot-top)*s.alt;cx.fillStyle='#13324A';cx.beginPath();cx.moveTo(bx+14,py);cx.lineTo(bx-14,py-7);cx.lineTo(bx-14,py+7);cx.fill();cx.font='500 10px DM Mono';cx.fillText('HÖHE',bx-16,top-8);
  $('#lread').textContent=stall?'Strömungsabriss! Auftrieb bricht ein':s.L>108?'Auftrieb > Gewicht: es steigt ↑':s.L<92?'Auftrieb < Gewicht: es sinkt ↓':'Auftrieb = Gewicht: es schwebt'});
 return{get:function(){return s},set:function(o){if(o.v!=null){s.v=o.v;setRange('lv',o.v,'km/h')}if(o.a!=null){s.a=o.a;setRange('la',o.a,'°')}if(o.f!=null){s.f=o.f;$('#lf').textContent='Klappen: '+(s.f?'aus­gefahren':'aus');$('#lf').className='b s'+(s.f?' y':'')}calc()}}};

/* 2 · Vier Kräfte: thrust & load -> speed -> lift -> climb */
SIMS.forces=function(st){var s={T:60,W:100,v:850,L:100,climb:0,hl:'',alt:0.5,off:0};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="fbox"></div>'+ctlRow(rng('fT',0,100,60,'Schub (Gas)','%')+'<div><span class="lab">Beladung</span><div class="seg" id="fW"><button data-w="85">leicht</button><button data-w="100" class="on">normal</button><button data-w="120">schwer</button></div></div>');
 var box=$('#fbox');box.innerHTML=svgStage('0 0 800 400','<defs><linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ACDEB"/><stop offset="1" stop-color="#E6F2F7"/></linearGradient></defs><rect width="800" height="400" fill="url(#fsky)"/><g id="fcl"></g><g id="fpl" transform="translate(400 200)"><g id="frot">'+planeSide()+'</g><g id="far"></g></g><g id="fgau"></g>');
 bindRange('fT','%',function(v){s.T=v});
 $$('#fW button').forEach(function(b){b.addEventListener('click',function(){s.W=+b.getAttribute('data-w');$$('#fW button').forEach(function(x){x.classList.toggle('on',x===b)})})});
 var clouds=[[100,80,1],[420,60,.8],[680,120,1.2],[250,300,.9],[560,330,1.1]];
 function arrow(x1,y1,x2,y2,c,lab,id,hl){var dim=hl&&hl!==id;return '<g data-act="simHit" data-a="'+id+'" opacity="'+(dim?.25:1)+'" style="cursor:pointer"><line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="transparent" stroke-width="40"/><line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="11" stroke-linecap="round"/>'+head2(x1,y1,x2,y2,c)+'<text x="'+(x2+(x2>x1?10:x2<x1?-10:14))+'" y="'+(y2+(y2>y1?22:y2<y1?-8:-14))+'" text-anchor="'+(x2>x1?'start':x2<x1?'end':'start')+'" font-family="Figtree" font-weight="800" font-size="16" fill="#13324A">'+lab+'</text></g>'}
 function head2(x1,y1,x2,y2,c){var a=Math.atan2(y2-y1,x2-x1),l=16;return '<path d="M'+(x2+Math.cos(a)*10)+','+(y2+Math.sin(a)*10)+' L'+(x2-Math.cos(a-0.6)*l)+','+(y2-Math.sin(a-0.6)*l)+' L'+(x2-Math.cos(a+0.6)*l)+','+(y2-Math.sin(a+0.6)*l)+' Z" fill="'+c+'"/>'}
 loop(function(dt){var veq=450+400*Math.sqrt(s.T/60);s.v+=(veq-s.v)*Math.min(1,dt*0.8);s.L=Math.round(Math.pow(s.v/850,2)*100);s.climb=(s.L-s.W)*0.25;s.off=(s.off+s.v*dt*0.12)%800;s.alt=Math.max(0.05,Math.min(0.95,s.alt+s.climb*dt*0.004));
  var D=Math.pow(s.v/850,2)*60,pitch=Math.max(-12,Math.min(12,s.climb*0.9));
  $('#fcl').innerHTML=clouds.map(function(c){var x=((c[0]-s.off*c[2])%900+900)%900-60,y=c[1]+(s.alt-0.5)*160*c[2];return '<g transform="translate('+x+' '+y+') scale('+c[2]+')" opacity=".9"><ellipse rx="46" ry="16" fill="#fff"/><ellipse cx="-18" cy="-10" rx="22" ry="16" fill="#fff"/><ellipse cx="14" cy="-14" rx="26" ry="20" fill="#fff"/></g>'}).join('');
  $('#frot').setAttribute('transform','rotate('+(-pitch)+')');
  $('#far').innerHTML=arrow(0,-30,0,-30-s.L*1.1,'#49C5B6','Auftrieb','lift',s.hl)+arrow(0,20,0,20+s.W*1.1,'#FF6A52','Gewicht','weight',s.hl)+arrow(185,0,185+s.T*1.5,0,'#2779A7','Schub','thrust',s.hl)+arrow(-175,0,-175-D*1.5,0,'#9AA3A8','Widerstand','drag',s.hl);
  $('#fgau').innerHTML='<g transform="translate(20 22)"><rect width="260" height="64" rx="14" fill="#fff" opacity=".9"/><text x="14" y="26" font-family="DM Mono" font-size="11" fill="#55677A">TEMPO</text><text x="14" y="52" font-family="Big Shoulders Display" font-weight="900" font-size="26" fill="#13324A">'+Math.round(s.v)+' km/h</text><text x="150" y="26" font-family="DM Mono" font-size="11" fill="#55677A">HÖHE</text><text x="150" y="52" font-family="Figtree" font-weight="800" font-size="16" fill="'+(s.climb>2?'#2BA594':s.climb<-2?'#FF6A52':'#13324A')+'">'+(s.climb>2?'steigt ↑':s.climb<-2?(s.T<5?'gleitet ↓':'sinkt ↓'):'hält →')+'</text></g>'});
 return{get:function(){return s},set:function(o){if(o.T!=null){s.T=o.T;setRange('fT',o.T,'%')}if(o.W!=null){s.W=o.W;$$('#fW button').forEach(function(x){x.classList.toggle('on',+x.getAttribute('data-w')===o.W)})}if(o.hl!=null)s.hl=o.hl},hit:function(z){s.hl=s.hl===z?'':z}}};

/* 3 · Steuern: three views + joystick + pedals */
SIMS.steer=function(st){var s={r:0,p:0,y:0,sp:0,hit:''};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="sbox"></div>'+ctlRow('<div class="row" style="gap:14px"><div id="joy" style="width:118px;height:118px;border-radius:50%;background:var(--soft);border:1.5px solid var(--line);position:relative;touch-action:none;flex:none"><span style="position:absolute;left:50%;top:6px;transform:translateX(-50%)" class="lab">drücken</span><span style="position:absolute;left:50%;bottom:6px;transform:translateX(-50%)" class="lab">ziehen</span><div id="knob" style="position:absolute;width:44px;height:44px;border-radius:50%;background:#13324A;left:37px;top:37px;border:4px solid #fff"></div></div><span class="muted" style="font-size:13px;max-width:130px">Steuerknüppel: links/rechts = rollen, ziehen = Nase hoch</span></div>'+rng('sy',-30,30,0,'Pedale (Seitenruder)','°')+'<button class="b s" id="ssp">Spoiler</button><button class="b s" id="s0">Mitte</button>');
 function draw(){var r=s.r,p=s.p,y=s.y;
  $('#sbox').innerHTML=svgStage('0 0 900 380',
  '<g transform="translate(10 10)"><rect width="280" height="300" rx="18" fill="#DCEEFF"/><rect y="200" width="280" height="100" rx="0" fill="#CFE8C8" transform="rotate('+(-r*0.0)+')"/><text x="16" y="28" font-family="DM Mono" font-size="12" fill="#55677A">VON HINTEN · ROLLEN</text><g transform="translate(140 150) scale(.58) rotate('+r+')">'+planeRear({r:r})+'</g><text x="140" y="290" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="15" fill="#13324A">'+(r>3?'neigt sich nach rechts':r<-3?'neigt sich nach links':'Flügel waagerecht')+'</text></g>'+
  '<g transform="translate(305 10)"><rect width="290" height="300" rx="18" fill="#DCEEFF"/><text x="16" y="28" font-family="DM Mono" font-size="12" fill="#55677A">VON DER SEITE · NICKEN</text><g transform="translate(150 160) scale(.72) rotate('+(-p)+')">'+planeSide({el:p,sp:s.sp})+'</g>'+(p?'<path d="M'+(p>0?'230,120 q20,-30 40,-40':'230,200 q20,30 40,40')+'" stroke="#2779A7" stroke-width="4" fill="none" stroke-dasharray="4 6"/>':'')+'<text x="145" y="290" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="15" fill="#13324A">'+(p>3?'Nase hoch: steigt':p<-3?'Nase runter: sinkt':'gerade')+'</text></g>'+
  '<g transform="translate(610 10)"><rect width="280" height="300" rx="18" fill="#E6EEF2"/><text x="16" y="28" font-family="DM Mono" font-size="12" fill="#55677A">VON OBEN · GIEREN</text><g transform="translate(140 158) scale(.58) rotate('+(y+r*0.4)+')">'+planeTop({r:r,p:p,y:y,sp:s.sp})+'</g>'+(r||y?'<path d="M140,48 A110,110 0 0 '+((r+y)>0?1:0)+' '+((r+y)>0?230:50)+',90" stroke="#2779A7" stroke-width="4" fill="none" stroke-dasharray="4 6"/>':'')+'<text x="140" y="290" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="15" fill="#13324A">'+((y+r*0.4)>4?'Kurve nach rechts':(y+r*0.4)<-4?'Kurve nach links':'geradeaus')+'</text></g>'+
  '<g font-family="Figtree" font-size="14" font-weight="700" fill="#13324A" transform="translate(10 330)"><rect width="16" height="16" rx="4" fill="#49C5B6"/><text x="24" y="13">Ruder in Ruhe</text><rect x="150" width="16" height="16" rx="4" fill="#ECD06F"/><text x="174" y="13">Ruder hoch / ausgeschlagen</text><rect x="400" width="16" height="16" rx="4" fill="#FF6A52"/><text x="424" y="13">Ruder runter</text><text x="600" y="13" fill="#55677A">Tippe auf ein Ruder, um es zu benennen</text></g>'+
  (s.hit?'<g transform="translate(450 362)"><rect x="-160" y="-16" width="320" height="30" rx="15" fill="#13324A"/><text text-anchor="middle" y="5" fill="#fff" font-family="Figtree" font-weight="800" font-size="15">'+({aileron:'Querruder: rollen',elevator:'Höhenruder: nicken',rudder:'Seitenruder: gieren'}[s.hit])+'</text></g>':''))}
 draw();
 var joy=$('#joy'),kn=$('#knob'),drag=false;function jm(e){var r=joy.getBoundingClientRect(),x=e.clientX-r.left-59,y=e.clientY-r.top-59,d=Math.sqrt(x*x+y*y),R=40;if(d>R){x=x/d*R;y=y/d*R}kn.style.left=(37+x)+'px';kn.style.top=(37+y)+'px';s.r=Math.round(x/R*30);s.p=Math.round(y/R*20);draw()}
 joy.addEventListener('pointerdown',function(e){drag=true;joy.setPointerCapture(e.pointerId);jm(e)});joy.addEventListener('pointermove',function(e){if(drag)jm(e)});joy.addEventListener('pointerup',function(){drag=false});
 bindRange('sy','°',function(v){s.y=v;draw()});
 $('#ssp').addEventListener('click',function(){s.sp=s.sp?0:1;$('#ssp').className='b s'+(s.sp?' c':'');draw()});
 $('#s0').addEventListener('click',function(){api.set({r:0,p:0,y:0,sp:0})});
 function knobTo(){kn.style.left=(37+s.r/30*40)+'px';kn.style.top=(37+s.p/20*40)+'px'}
 var api={get:function(){return s},set:function(o){['r','p','y','sp'].forEach(function(k){if(o[k]!=null)s[k]=o[k]});setRange('sy',s.y,'°');knobTo();$('#ssp').className='b s'+(s.sp?' c':'');draw()},hit:function(z){s.hit=z;draw()}};return api};

/* 4 · Triebwerk: animated cutaway with throttle */
SIMS.engine=function(st){var s={thr:60,z:'fan',rot:0};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="ebox"></div>'+ctlRow(rng('eT',0,100,60,'Gashebel','%')+'<span class="lab" id="erd" style="min-width:160px"></span>');
 var Z={fan:[120,90,90,250,'Fan: saugt Luft an'],bypass:[200,95,450,60,'Nebenstrom: Luft außen herum'],comp:[210,165,190,120,'Verdichter: presst die Luft'],comb:[400,160,80,130,'Brennkammer: Treibstoff brennt'],turb:[480,165,80,120,'Turbine: dreht die Welle'],nozzle:[560,150,170,150,'Düse: Strahl nach hinten']};
 var P=[];for(var i=0;i<90;i++)P.push({x:Math.random()*800,lane:Math.random()<0.6?'b':'c',o:Math.random()});
 $('#ebox').innerHTML=svgStage('0 0 800 420','<rect width="800" height="420" fill="#EEF4F7"/><g id="eflow"></g>'+
  '<path d="M90,110 C110,92 150,86 200,86 L640,96 L740,130 L740,140 L640,118 L200,112 C160,112 120,118 100,130 Z" fill="#CBD1D5" stroke="#13324A" stroke-width="2.5"/><path d="M90,330 C110,348 150,354 200,354 L640,344 L740,310 L740,300 L640,322 L200,328 C160,328 120,322 100,310 Z" fill="#CBD1D5" stroke="#13324A" stroke-width="2.5"/>'+
  '<path d="M205,165 L640,175 L700,205 L700,235 L640,265 L205,275 Z" fill="#fff" stroke="#13324A" stroke-width="2" opacity=".9"/>'+
  '<g id="efan"></g><path d="M118,220 m-34,0 a34,34 0 0 1 34,-26 l0,52 a34,34 0 0 1 -34,-26 Z" fill="#13324A"/>'+
  Array.apply(null,{length:9}).map(function(_,k){var x=222+k*19,h=48-k*3.2;return '<rect x="'+x+'" y="'+(220-h)+'" width="8" height="'+h*2+'" rx="3" fill="#49C5B6" stroke="#13324A" stroke-width="1.2"/>'}).join('')+
  '<rect x="405" y="180" width="70" height="80" rx="18" fill="#FFB288" stroke="#13324A" stroke-width="2"/><g id="eflame"></g>'+
  Array.apply(null,{length:4}).map(function(_,k){var x=488+k*18,h=26+k*5;return '<rect x="'+x+'" y="'+(220-h)+'" width="9" height="'+h*2+'" rx="3" fill="#ECD06F" stroke="#13324A" stroke-width="1.2"/>'}).join('')+
  '<line x1="150" y1="220" x2="560" y2="220" stroke="#13324A" stroke-width="4"/><path d="M560,205 L690,220 L560,235 Z" fill="#9AA3A8" stroke="#13324A" stroke-width="1.5"/>'+
  '<g id="ezones"></g><g transform="translate(40 40)"><text font-family="DM Mono" font-size="12" fill="#55677A">FLUGRICHTUNG</text><path d="M120,-4 L10,-4" stroke="#13324A" stroke-width="3" transform="translate(0 14)"/><path d="M10,10 L22,4 L22,16 Z" fill="#13324A"/></g><g id="ethr"></g><g id="elab"></g>');
 bindRange('eT','%',function(v){s.thr=v});
 function zones(){$('#ezones').innerHTML=Object.keys(Z).map(function(k){var z=Z[k],on=s.z===k;return '<rect data-act="simHit" data-a="'+k+'" x="'+z[0]+'" y="'+z[1]+'" width="'+z[2]+'" height="'+z[3]+'" rx="16" fill="'+(on?'rgba(255,106,82,.10)':'transparent')+'" stroke="'+(on?'#FF6A52':'transparent')+'" stroke-width="3" stroke-dasharray="8 6" style="cursor:pointer"/>'}).join('');
  $('#elab').innerHTML=s.z&&Z[s.z]?'<g transform="translate(400 392)"><rect x="-190" y="-18" width="380" height="34" rx="17" fill="#13324A"/><text text-anchor="middle" y="5" fill="#fff" font-family="Figtree" font-weight="800" font-size="16">'+Z[s.z][4]+'</text></g>':''}
 zones();
 loop(function(dt,t){var sp=0.2+s.thr/100;s.rot=(s.rot+dt*sp*900)%60;
  $('#efan').innerHTML=Array.apply(null,{length:7}).map(function(_,k){var y=100+((k*34+s.rot*1.13)%238);return '<rect x="132" y="'+y+'" width="14" height="22" rx="5" fill="#2779A7" stroke="#13324A" stroke-width="1.2"/>'}).join('');
  $('#eflame').innerHTML=s.thr>3?'<path d="M418,'+(220-14-s.thr*0.12+Math.sin(t*30)*3)+' Q450,220 418,'+(220+14+s.thr*0.12+Math.cos(t*27)*3)+' Q470,220 418,'+(220-14-s.thr*0.12)+'" fill="#FF6A52" opacity=".9"/>':'';
  P.forEach(function(p){var v=(60+s.thr*4)*(p.lane==='b'?1:p.x>480?1.8:p.x>220&&p.x<400?0.7:1);p.x+=v*dt;if(p.x>800){p.x=40+Math.random()*20;p.o=Math.random()}});
  $('#eflow').innerHTML=P.map(function(p){var y,c;if(p.lane==='b'){y=124+p.o*36+(p.o>0.5?166:0);if(p.x>640)y+=(p.o>0.5?-1:1)*(p.x-640)*0.25;c='#2779A7'}else{y=196+p.o*48;c=p.x<220?'#2779A7':p.x<400?'#49C5B6':p.x<480?'#FF6A52':'#FFB288'}
   if(p.x<200)y=110+p.o*220;return '<circle cx="'+p.x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+(p.lane==='b'?3:3.6)+'" fill="'+c+'" opacity=".8"/>'}).join('');
  var tl=s.thr*1.6;$('#ethr').innerHTML='<line x1="90" y1="375" x2="'+(90-0)+'" y2="375" stroke="none"/><g transform="translate(600 40)"><text font-family="DM Mono" font-size="12" fill="#55677A">SCHUB</text><rect y="12" width="160" height="14" rx="7" fill="rgba(19,50,74,.1)"/><rect y="12" width="'+tl+'" height="14" rx="7" fill="#49C5B6"/></g>';
  $('#erd').textContent='Fan: '+Math.round(800+s.thr*42)+' U/min'});
 return{get:function(){return s},set:function(o){if(o.thr!=null){s.thr=o.thr;setRange('eT',o.thr,'%')}if(o.z!=null){s.z=o.z;zones()}},hit:function(z){s.z=z;zones()}}};

/* 5 · Im Inneren: detailed cutaway, tap to zoom */
SIMS.inside=function(st){var s={z:'',alt:0};var Z={cockpit:[860,110,120,130,'Cockpit','Zwei Piloten, viele Bildschirme. Durch die Frontscheibe sehen sie die Startbahn.'],cabin:[190,110,640,120,'Kabine','Bis zu 180 Plätze. Über dir die Gepäckfächer, unter dir der Frachtraum.'],cargo:[190,232,640,58,'Frachtraum','Koffer und Fracht in Containern. Auch hier ist es belüftet.'],tank:[400,262,220,58,'Tank im Flügel','Der Treibstoff schwappt in den Flügeln. Ein A320 fasst über 20 000 Liter.'],gear:[480,290,140,90,'Fahrwerk','Zwei Räder vorne, vier hinten. Nach dem Start klappen sie ein.'],galley:[800,120,62,108,'Bordküche','Trolleys, Öfen und Kaffeemaschinen.'],apu:[30,130,110,90,'APU','Kleine Turbine im Heck für Strom und Klimaanlage am Boden.']};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="ibox"></div>'+ctlRow(rng('iA',0,12,0,'Flughöhe','km',0.5)+'<div id="ipr" style="flex:1.2;min-width:260px"></div><button class="b s" id="iov">Übersicht</button>');
 var seats='',heads='',cols=['#8D5524','#C68642','#E0AC69','#F1C27D','#FFDBAC','#5C3A21'];for(var x=205;x<790;x+=27){seats+='<path d="M'+x+',226 L'+x+',196 Q'+x+',190 '+(x+5)+',190 L'+(x+8)+',190 L'+(x+8)+',214 L'+(x+20)+',214 L'+(x+20)+',226 Z" fill="#2779A7" stroke="#13324A" stroke-width="1"/>';if((x*7)%3)heads+='<circle cx="'+(x+12)+'" cy="186" r="7" fill="'+cols[(x*13)%6]+'"/><rect x="'+(x+6)+'" y="192" width="12" height="16" rx="5" fill="'+['#FF6A52','#ECD06F','#49C5B6','#B5D5FF'][(x*3)%4]+'"/>'}
 var bags='';[[205,240],[260,240],[315,240],[640,240],[695,240],[750,240]].forEach(function(b,k){bags+='<rect x="'+b[0]+'" y="'+b[1]+'" width="50" height="44" rx="6" fill="#E9ECEE" stroke="#13324A" stroke-width="1.5"/>'+'<rect x="'+(b[0]+6)+'" y="'+(b[1]+18)+'" width="16" height="22" rx="3" fill="'+['#FF6A52','#49C5B6','#ECD06F','#2779A7','#B1EAC4','#FFB288'][k]+'"/><rect x="'+(b[0]+26)+'" y="'+(b[1]+12)+'" width="18" height="28" rx="3" fill="'+['#2779A7','#FFB288','#FF6A52','#ECD06F','#49C5B6','#B5D5FF'][k]+'"/>'});
 var wins='';for(x=210;x<820;x+=27)wins+='<rect x="'+(x+8)+'" y="150" width="9" height="13" rx="4" fill="#9ACDEB" stroke="#13324A" stroke-width="1"/>';
 var body='<rect x="-600" y="-300" width="2200" height="1000" fill="#E6F2F7"/><rect x="-600" y="380" width="2200" height="400" fill="#CFE8C8" id="ignd"/>'+
 '<path d="M110,110 L860,110 C920,110 965,170 970,215 C965,255 925,290 860,290 L170,290 C130,290 80,250 40,170 L40,150 C60,125 85,110 110,110 Z" fill="#FFFDF8" stroke="#13324A" stroke-width="3"/>'+
 '<path d="M40,150 L20,40 L70,40 L150,110" fill="#FF6A52" stroke="#13324A" stroke-width="2.5" stroke-linejoin="round"/>'+
 '<rect x="190" y="116" width="640" height="22" rx="4" fill="#E9ECEE" stroke="#13324A" stroke-width="1.2"/>'+Array.apply(null,{length:12}).map(function(_,k){return '<line x1="'+(190+k*53)+'" y1="116" x2="'+(190+k*53)+'" y2="138" stroke="#13324A" stroke-width="1"/>'}).join('')+wins+
 '<line x1="150" y1="230" x2="905" y2="230" stroke="#13324A" stroke-width="3"/>'+seats+heads+
 '<rect x="800" y="140" width="56" height="86" rx="4" fill="#E9ECEE" stroke="#13324A" stroke-width="1.5"/><rect x="806" y="160" width="20" height="30" rx="2" fill="#CBD1D5"/><rect x="830" y="160" width="20" height="30" rx="2" fill="#CBD1D5"/><rect x="806" y="196" width="44" height="26" rx="3" fill="#9AA3A8"/>'+
 '<rect x="140" y="140" width="46" height="86" rx="4" fill="#E9ECEE" stroke="#13324A" stroke-width="1.5"/><text x="163" y="188" text-anchor="middle" font-size="12" font-family="DM Mono">WC</text>'+
 '<path d="M905,150 L948,170 L958,196 L912,190 Z" fill="#13324A"/><path d="M895,226 L900,200 L935,206 L944,226 Z" fill="#9AA3A8" stroke="#13324A" stroke-width="1.2"/><circle cx="912" cy="182" r="9" fill="#C68642"/><rect x="903" y="190" width="18" height="24" rx="6" fill="#13324A"/><rect x="900" y="196" width="10" height="30" rx="3" fill="#2779A7"/>'+
 bags+'<rect x="400" y="238" width="220" height="48" rx="6" fill="#E9ECEE" stroke="#13324A" stroke-width="1.5"/><text x="510" y="268" text-anchor="middle" font-size="12" font-family="DM Mono" fill="#55677A">MITTELTANK</text>'+
 '<path d="M390,288 C430,270 600,270 640,288 C600,312 430,316 390,288 Z" fill="#CBD1D5" stroke="#13324A" stroke-width="2.5"/><path id="ifuel" d="M405,292 C450,282 580,282 625,292 C580,306 450,308 405,292 Z" fill="#2779A7" opacity=".7"/>'+
 '<rect x="440" y="300" width="90" height="38" rx="18" fill="#fff" stroke="#13324A" stroke-width="2.5"/><ellipse cx="530" cy="319" rx="6" ry="16" fill="#13324A"/>'+
 '<g id="igear"><line x1="560" y1="290" x2="560" y2="352" stroke="#13324A" stroke-width="7"/><circle cx="548" cy="360" r="17" fill="#13324A"/><circle cx="574" cy="360" r="17" fill="#13324A"/><line x1="880" y1="285" x2="880" y2="352" stroke="#13324A" stroke-width="5"/><circle cx="880" cy="362" r="13" fill="#13324A"/></g>'+
 '<rect x="50" y="160" width="40" height="26" rx="5" fill="#9AA3A8" stroke="#13324A" stroke-width="1.5"/><path d="M50,173 L30,173" stroke="#13324A" stroke-width="4"/>'+
 '<g id="ihot">'+Object.keys(Z).map(function(k,n){var z=Z[k];var cx=z[0]+z[2]/2,cy=z[1]+z[3]/2;return '<g data-act="simHit" data-a="'+k+'" style="cursor:pointer"><rect x="'+z[0]+'" y="'+z[1]+'" width="'+z[2]+'" height="'+z[3]+'" fill="transparent"/><circle cx="'+cx+'" cy="'+cy+'" r="15" fill="#FF6A52" stroke="#fff" stroke-width="3"/><text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="Figtree">'+(n+1)+'</text></g>'}).join('')+'</g>';
 $('#ibox').innerHTML='<svg id="isvg" viewBox="0 30 1000 380" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">'+body+'</svg><div id="ilab" style="position:absolute;left:14px;top:12px;max-width:62%"></div>';
 var vb=[0,30,1000,380],tg=vb.slice();loop(function(dt){for(var k=0;k<4;k++)vb[k]+=(tg[k]-vb[k])*Math.min(1,dt*6);$('#isvg').setAttribute('viewBox',vb.map(function(v){return v.toFixed(1)}).join(' '))});
 function zoomTo(k){s.z=k;if(k&&Z[k]){var z=Z[k],pad=60,w=Math.max(z[2]+pad*2,(z[3]+pad*2)*2.5),h=w/2.5;tg=[z[0]+z[2]/2-w/2,z[1]+z[3]/2-h/2,w,h];$('#ilab').innerHTML='<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:14px;padding:10px 14px"><b>'+Z[k][4]+'</b><br><span style="font-size:14px">'+Z[k][5]+'</span></div>'}else{tg=[0,30,1000,380];$('#ilab').innerHTML=''}}
 function press(){var h=s.alt,po=Math.round(1013*Math.exp(-h/8.4)),ca=Math.min(h,h*0.19),pc=Math.round(1013*Math.exp(-ca/8.4));$('#igear').style.display=h>0?'none':'';$('#ignd').setAttribute('y',380+h*30);
  $('#ipr').innerHTML='<div class="row" style="gap:8px"><span class="lab" style="width:60px">draußen</span><div class="bar" style="flex:1"><i style="width:'+(po/10.13)+'%;background:#FF6A52"></i></div><b style="font-size:13px;width:70px">'+po+' hPa</b></div><div class="row" style="gap:8px;margin-top:4px"><span class="lab" style="width:60px">Kabine</span><div class="bar" style="flex:1"><i style="width:'+(pc/10.13)+'%"></i></div><b style="font-size:13px;width:70px">'+pc+' hPa</b></div><span class="muted" style="font-size:12px">'+(h>=8?'Kabine wie auf '+fmt((Math.round(ca*10)/10))+' km Höhe – darum knacken die Ohren':h>0?'Fahrwerk eingefahren':'Am Boden: Fahrwerk draußen')+'</span>'}
 press();bindRange('iA','km',function(v){s.alt=v;press()});$('#iov').addEventListener('click',function(){zoomTo('')});
 return{get:function(){return s},set:function(o){if(o.alt!=null){s.alt=o.alt;setRange('iA',o.alt,'km');press()}if(o.z!=null)zoomTo(o.z)},hit:function(z){zoomTo(z)}}};

/* 6 · Start und Landung: whole flight profile */
var PHASES=[['Rollen',0,'20 km/h','kleine Kurven, leises Rumpeln',[[20,360],[80,360]]],['Startlauf',0,'0 → 270 km/h','du wirst in den Sitz gedrückt',[[80,360],[175,360]]],['Abheben',0.1,'280 km/h','die Nase hebt sich, das Rumpeln hört auf',[[175,360],[215,332]]],['Steigflug',5,'300 → 800 km/h','Ohren knacken, Fahrwerk fährt ein',[[215,332],[335,110]]],['Reiseflug',11,'850 km/h','ruhig, oft ohne Anschnallzeichen',[[335,110],[565,110]]],['Sinkflug',6,'700 → 400 km/h','Triebwerke leiser, Ohren knacken',[[565,110],[672,290]]],['Anflug',1,'300 km/h','Klappen und Fahrwerk kommen raus',[[672,290],[728,352]]],['Landung',0,'250 → 30 km/h','kleiner Ruck, dann kräftiges Bremsen',[[728,352],[765,360]]],['Zum Gate',0,'20 km/h','erst aufstehen, wenn das Zeichen aus ist',[[765,360],[792,360]]]];
SIMS.phases=function(st){var s={ph:0,play:false,t:0};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="pbox"></div>'+ctlRow('<button class="b p s" id="pplay">▶ Ganzen Flug abspielen</button><div class="seg" id="pseg" style="overflow-x:auto;max-width:100%">'+PHASES.map(function(p,i){return '<button data-p="'+i+'">'+(i+1)+'</button>'}).join('')+'</div>');
 function pos(i,f){var a=PHASES[i][4][0],b=PHASES[i][4][1];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI]}
 function draw(f){var i=s.ph,p=PHASES[i],P=pos(i,f==null?0.5:f);var gear=[0,1,2,6,7,8].indexOf(i)>-1;
  $('#pbox').innerHTML=svgStage('0 0 810 420','<defs><linearGradient id="psk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DB8DE"/><stop offset=".7" stop-color="#E6F2F7"/></linearGradient></defs><rect width="810" height="420" fill="url(#psk)"/>'+
  '<path d="M380,370 L420,300 L445,325 L475,270 L505,318 L530,292 L565,370 Z" fill="#B8C2C9"/><path d="M466,286 L475,270 L484,286 Z" fill="#fff"/><text x="472" y="395" text-anchor="middle" font-family="DM Mono" font-size="11" fill="#55677A">PYRENÄEN</text>'+
  '<rect y="360" width="810" height="60" fill="#CFE8C8"/><rect x="740" y="360" width="70" height="60" fill="#9ACDEB"/><rect x="60" y="356" width="130" height="8" rx="2" fill="#55677A"/><rect x="690" y="356" width="90" height="8" rx="2" fill="#55677A"/>'+
  '<text x="30" y="395" font-family="Big Shoulders Display" font-weight="900" font-size="22" fill="#13324A">HAJ</text><text x="760" y="345" font-family="Big Shoulders Display" font-weight="900" font-size="22" fill="#13324A">BCN</text>'+
  [[120,60],[300,200],[620,70],[700,190]].map(function(c){return '<g transform="translate('+c[0]+' '+c[1]+')" opacity=".85"><ellipse rx="40" ry="12" fill="#fff"/><ellipse cx="-12" cy="-8" rx="18" ry="12" fill="#fff"/><ellipse cx="12" cy="-10" rx="20" ry="14" fill="#fff"/></g>'}).join('')+
  PHASES.map(function(q,k){var a=q[4][0],b=q[4][1],on=k===i;return '<g data-act="simHit" data-a="p'+k+'" style="cursor:pointer"><line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="transparent" stroke-width="34"/><line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+(on?'#FF6A52':'#13324A')+'" stroke-width="'+(on?8:3)+'" stroke-linecap="round" '+(on?'':'stroke-dasharray="6 7" opacity=".55"')+'/></g>'}).join('')+
  '<g transform="translate('+P[0]+' '+(P[1]-(gear?14:6))+') rotate('+P[2]+') scale(.28)">'+planeSide({gear:gear})+'</g>'+
  '<g transform="translate(20 20)"><rect width="300" height="98" rx="16" fill="#fff" opacity=".95"/><text x="16" y="30" font-family="DM Mono" font-size="11" fill="#55677A">ABSCHNITT '+(i+1)+' VON 9</text><text x="16" y="60" font-family="Big Shoulders Display" font-weight="900" font-size="30" fill="#13324A">'+p[0].toUpperCase()+'</text><text x="170" y="30" font-family="DM Mono" font-size="11" fill="#55677A">HÖHE</text><text x="170" y="52" font-family="Figtree" font-weight="800" font-size="16" fill="#13324A">'+(p[1]?'ca. '+fmt(p[1])+' km':'am Boden')+'</text><text x="16" y="84" font-family="Figtree" font-weight="700" font-size="13" fill="#2779A7">'+p[2]+' · '+p[3]+'</text></g>');
  $$('#pseg button').forEach(function(b){b.classList.toggle('on',+b.getAttribute('data-p')===i)});if(WZ.step!==i&&WISSEN[WZ.ch].sim==='phases')stepText(i)}
 draw();
 $$('#pseg button').forEach(function(b){b.addEventListener('click',function(){s.play=false;s.ph=+b.getAttribute('data-p');draw()})});
 $('#pplay').addEventListener('click',function(){s.play=!s.play;s.t=s.play?0:s.t;$('#pplay').textContent=s.play?'■ Stopp':'▶ Ganzen Flug abspielen'});
 loop(function(dt){if(!s.play)return;var dur=[1.5,1.8,1,2.4,4,2.4,1.5,1.2,1];s.t+=dt;var acc=0;for(var k=0;k<9;k++){if(s.t<acc+dur[k]){s.ph=k;draw((s.t-acc)/dur[k]);return}acc+=dur[k]}s.play=false;$('#pplay').textContent='▶ Ganzen Flug abspielen'});
 return{get:function(){return s},set:function(o){if(o.ph!=null){s.play=false;s.ph=o.ph;draw()}},hit:function(z){s.play=false;s.ph=+z.slice(1);draw()}}};

/* 7 · Wolken und Wetter */
SIMS.weather=function(st){var s={alt:2,z:''};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="wbox"></div>'+ctlRow(rng('wA',0,12,2,'Flughöhe','km',0.5)+'<span class="lab" id="wrd" style="min-width:180px"></span>');
 function Y(a){return 400-a*29}
 function draw(){var a=s.alt,T=Math.round(15-6.5*Math.min(a,11)-(a>11?1:0)),trail=a>=8;function hl(k){return s.z===k?' stroke="#FF6A52" stroke-width="3" stroke-dasharray="7 5"':''}
  $('#wbox').innerHTML=svgStage('0 0 800 420','<defs><linearGradient id="wsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E6FA0"/><stop offset=".6" stop-color="#8CC3E6"/><stop offset="1" stop-color="#E6F2F7"/></linearGradient></defs><rect width="800" height="420" fill="url(#wsk)"/>'+
  [0,2,4,6,8,10,12].map(function(k){return '<line x1="40" y1="'+Y(k)+'" x2="720" y2="'+Y(k)+'" stroke="#fff" stroke-opacity=".25"/><text x="34" y="'+(Y(k)+4)+'" text-anchor="end" font-family="DM Mono" font-size="11" fill="#fff">'+k+' km</text>'}).join('')+
  '<path d="M470,400 L515,'+Y(8.849)+' L560,400 Z" fill="#9AA3A8"/><path d="M505,'+(Y(8.849)+22)+' L515,'+Y(8.849)+' L525,'+(Y(8.849)+22)+' Z" fill="#fff"/><text x="515" y="'+(Y(8.849)-8)+'" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="12" fill="#fff">Mount Everest 8 849 m</text>'+
  '<g data-act="simHit" data-a="cu" style="cursor:pointer"><rect x="90" y="'+Y(2.3)+'" width="200" height="'+(Y(0.6)-Y(2.3))+'" rx="20" fill="transparent"'+hl('cu')+'/>'+[[130,1.2],[200,1.5],[255,1.1]].map(function(c){return '<g transform="translate('+c[0]+' '+Y(c[1])+')"><ellipse rx="34" ry="14" fill="#fff"/><ellipse cx="-12" cy="-12" rx="18" ry="16" fill="#fff"/><ellipse cx="10" cy="-18" rx="20" ry="20" fill="#fff"/></g>'}).join('')+'</g>'+
  '<g data-act="simHit" data-a="st" style="cursor:pointer"><rect x="300" y="'+Y(3.3)+'" width="200" height="'+(Y(2.5)-Y(3.3))+'" rx="12" fill="#fff" opacity=".75"'+hl('st')+'/></g>'+
  '<g data-act="simHit" data-a="ci" style="cursor:pointer"><rect x="80" y="'+Y(10.8)+'" width="260" height="'+(Y(8.6)-Y(10.8))+'" rx="16" fill="transparent"'+hl('ci')+'/>'+[[100,10],[160,9.4],[230,10.2],[280,9.1]].map(function(c){return '<path d="M'+c[0]+','+Y(c[1])+' q30,-14 60,-6 t40,-10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>'}).join('')+'</g>'+
  '<g data-act="simHit" data-a="cb" style="cursor:pointer"><path d="M600,'+Y(0.8)+' C590,'+Y(4)+' 610,'+Y(8)+' 620,'+Y(11)+' L560,'+Y(11.6)+' L780,'+Y(11.6)+' L720,'+Y(11)+' C730,'+Y(8)+' 750,'+Y(4)+' 740,'+Y(0.8)+' Z" fill="#E9ECEE"'+(s.z==='cb'?' stroke="#FF6A52" stroke-width="3" stroke-dasharray="7 5"':' stroke="#CBD1D5" stroke-width="2"')+'/><text x="670" y="'+Y(5)+'" text-anchor="middle" font-family="DM Mono" font-size="11" fill="#55677A">GEWITTER</text></g>'+
  (trail?'<path d="M'+(380-260)+','+(Y(a)-2)+' L370,'+(Y(a)-2)+'" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/>':'')+
  '<g transform="translate(400 '+(Y(a)-4)+') scale(.2)">'+planeSide({gear:a<0.3})+'</g>'+
  '<g transform="translate(760 40)"><rect x="-10" width="20" height="320" rx="10" fill="#fff"/><rect x="-6" y="'+(4+(1-(T+60)/80)*312)+'" width="12" height="'+(312-(1-(T+60)/80)*312)+'" rx="6" fill="'+(T<0?'#2779A7':'#FF6A52')+'"/><circle cy="334" r="16" fill="'+(T<0?'#2779A7':'#FF6A52')+'" stroke="#fff" stroke-width="4"/><text y="-10" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="16" fill="#fff">'+T+' °C</text></g>');
  $('#wrd').textContent=(a>=8?'Kondensstreifen entsteht':'kein Kondensstreifen')+' · '+T+' °C'}
 draw();bindRange('wA','km',function(v){s.alt=v;draw()});
 return{get:function(){return s},set:function(o){if(o.alt!=null){s.alt=o.alt;setRange('wA',o.alt,'km')}if(o.z!=null)s.z=o.z==='trail'?'':o.z;draw()},hit:function(z){s.z=z;draw()}}};

/* 8 · Kompass: rotate the plane, watch needle and compass card */
var CITIES=[['Hannover',52.37,9.73],['Berlin',52.52,13.40],['Hamburg',53.55,9.99],['München',48.14,11.58],['Frankfurt',50.11,8.68],['Paris',48.86,2.35],['London',51.51,-0.13],['Amsterdam',52.37,4.90],['Madrid',40.42,-3.70],['Barcelona',41.39,2.17],['Rom',41.90,12.50],['Wien',48.21,16.37],['Zürich',47.38,8.54],['Lissabon',38.72,-9.14],['Kopenhagen',55.68,12.57],['Marseille',43.30,5.37],['Toulouse',43.60,1.44]];
function brg(a,b){var r=Math.PI/180,y=Math.sin((b[1]-a[1])*r)*Math.cos(b[0]*r),x=Math.cos(a[0]*r)*Math.sin(b[0]*r)-Math.sin(a[0]*r)*Math.cos(b[0]*r)*Math.cos((b[1]-a[1])*r);return(Math.atan2(y,x)/r+360)%360}
var BRG_BCN=Math.round(brg([52.37,9.73],[41.39,2.17]));
var DIRS=['Norden','Nordosten','Osten','Südosten','Süden','Südwesten','Westen','Nordwesten'];
SIMS.compass=function(st){var s={h:0};
 st.innerHTML='<div style="flex:1;min-height:0;position:relative" id="cbox"></div>'+ctlRow('<button class="b s" id="cl">⟲ 15°</button><button class="b s" id="cr">15° ⟳</button><span class="muted" style="font-size:13px">oder rechts am Kompass im Kreis ziehen</span><div class="sp"></div><b id="crd" style="font-size:18px"></b>');
 function MXc(lon){return 34+(lon+10)*14.4}function MYc(lat){return 44+(56.5-lat)*18.4}
 var ha=CITIES[0],hx=MXc(ha[2]),hy=MYc(ha[1]),bc=CITIES[9];
 $('#cbox').innerHTML=svgStage('0 0 860 400','<rect x="10" y="10" width="440" height="380" rx="18" fill="#EAF3F7"/><text x="26" y="36" font-family="DM Mono" font-size="11" fill="#55677A">KARTE · NORDEN IST OBEN</text>'+
  CITIES.map(function(c,k){var x=MXc(c[2]),y=MYc(c[1]);var hb=c[0]==='Barcelona';return '<circle '+(hb?'id="cbd" ':'')+'cx="'+x+'" cy="'+y+'" r="'+(k===0||hb?7:4)+'" fill="'+(hb?'#FF6A52':k===0?'#13324A':'#8796A3')+'"/><text x="'+(x+9)+'" y="'+(y+4)+'" font-family="Figtree" font-size="'+(k===0||hb?14:11)+'" font-weight="'+(k===0||hb?800:600)+'" fill="#13324A">'+c[0]+'</text>'}).join('')+
  '<circle id="cbr" cx="'+MXc(bc[2])+'" cy="'+MYc(bc[1])+'" r="16" fill="none" stroke="#2BA594" stroke-width="3" opacity="0"/>'+
  '<clipPath id="cclip"><rect x="10" y="10" width="440" height="380" rx="18"/></clipPath><line clip-path="url(#cclip)" id="cray" x1="'+hx+'" y1="'+hy+'" x2="'+hx+'" y2="'+(hy-420)+'" stroke="#2779A7" stroke-width="3" stroke-dasharray="6 7"/>'+
  '<g transform="translate('+hx+' '+hy+')"><g id="cpl" style="transition:transform .25s"><g transform="scale(.12)">'+planeTop()+'</g></g></g>'+
  '<g transform="translate(400 340)"><circle r="32" fill="#fff" stroke="#13324A" stroke-width="2"/><text y="-18" text-anchor="middle" font-size="11" font-weight="800" font-family="Figtree">N</text><path d="M0,-22 L6,0 L0,4 L-6,0 Z" fill="#FF6A52"/><path d="M0,22 L6,0 L0,-4 L-6,0 Z" fill="#13324A"/><text y="50" text-anchor="middle" font-family="DM Mono" font-size="10" fill="#55677A">NADEL</text></g>'+
  '<g transform="translate(650 200)"><circle id="cdial" r="175" fill="#13324A" style="cursor:grab"/><g id="ccard" style="pointer-events:none"><circle r="160" fill="#FFFDF8"/>'+Array.apply(null,{length:72}).map(function(_,k){var a=k*5,l=a%30===0?18:a%10===0?11:6;return '<line x1="0" y1="-160" x2="0" y2="'+(-160+l)+'" stroke="#13324A" stroke-width="'+(a%30===0?3:1.5)+'" transform="rotate('+a+')"/>'}).join('')+
  [['N',0],['O',90],['S',180],['W',270]].map(function(d){return '<text transform="rotate('+d[1]+') translate(0 -115)" text-anchor="middle" font-family="Big Shoulders Display" font-weight="900" font-size="34" fill="'+(d[0]==='N'?'#FF6A52':'#13324A')+'" dy="12">'+d[0]+'</text>'}).join('')+
  [30,60,120,150,210,240,300,330].map(function(d){return '<text transform="rotate('+d+') translate(0 -125)" text-anchor="middle" font-family="DM Mono" font-size="12" fill="#55677A" dy="4">'+d+'</text>'}).join('')+
  '<g transform="rotate('+BRG_BCN+')"><path d="M0,-160 L-8,-144 L8,-144 Z" fill="#2BA594"/></g></g><path d="M0,-172 L-10,-188 L10,-188 Z" fill="#ECD06F"/><g transform="scale(.22)" style="pointer-events:none">'+planeTop()+'</g><text y="200" text-anchor="middle" font-family="DM Mono" font-size="11" fill="#55677A">KOMPASS IM COCKPIT · GRÜN = BARCELONA</text></g>');
 function upd(){var h=s.h,ok=angDiff(h,BRG_BCN)<=8,rad=h*Math.PI/180;$('#ccard').setAttribute('transform','rotate('+(-h)+')');$('#cpl').style.transform='rotate('+h+'deg)';
  var r=$('#cray');r.setAttribute('x2',hx+Math.sin(rad)*420);r.setAttribute('y2',hy-Math.cos(rad)*420);r.setAttribute('stroke',ok?'#2BA594':'#2779A7');$('#cbr').setAttribute('opacity',ok?1:0);$('#cbd').setAttribute('fill',ok?'#2BA594':'#FF6A52');
  $('#crd').innerHTML=Math.round(h)+'° · '+DIRS[Math.round(h/45)%8]+(ok?' <span style="color:#2BA594">→ Kurs auf Barcelona!</span>':'')}
 upd();
 var dial=$('#cdial'),sv=dial.ownerSVGElement,dragging=false,a0=0,h0=0;
 function ang(e){var r=sv.getBoundingClientRect(),sc=Math.min(r.width/860,r.height/400),ox=r.left+(r.width-860*sc)/2,oy=r.top+(r.height-400*sc)/2;return Math.atan2(e.clientX-(ox+650*sc),-(e.clientY-(oy+200*sc)))*180/Math.PI}
 dial.addEventListener('pointerdown',function(e){dragging=true;dial.setPointerCapture(e.pointerId);a0=ang(e);h0=s.h});
 dial.addEventListener('pointermove',function(e){if(!dragging)return;s.h=((h0-(ang(e)-a0))%360+360)%360;upd()});
 dial.addEventListener('pointerup',function(){dragging=false});
 $('#cl').addEventListener('click',function(){s.h=(s.h+345)%360;upd()});$('#cr').addEventListener('click',function(){s.h=(s.h+15)%360;upd()});
 return{get:function(){return s},set:function(o){if(o.h!=null){s.h=o.h;upd()}}}};
