/* ===== v1.6.0: „Wo ist mein Freund?“ (GPS beim Öffnen), Kalt/Warm/Heiß, Fangen mit Frage, XP & Level bis Muya-Meister, Abzeichen, Klänge ===== */

/* ---------- Klänge: weich, kurz, wie Marimba/Glocke (keine Dateien, alles offline) ---------- */
var AC=null;
function sndOn(){return !(S.snd&&S.snd.off)}
function actx(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){AC=null}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,t0,dur,vol,type){var a=actx();if(!a)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=type||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+0.05);
 if(type!=='triangle'){var o2=a.createOscillator(),g2=a.createGain();o2.type='sine';o2.frequency.setValueAtTime(f*4,t);g2.gain.setValueAtTime(0.0001,t);g2.gain.exponentialRampToValueAtTime(vol*0.18,t+0.008);g2.gain.exponentialRampToValueAtTime(0.0001,t+dur*0.35);o2.connect(g2);g2.connect(a.destination);o2.start(t);o2.stop(t+dur)}}
var SNDS={
 tap:function(){tone(880,0,.06,.035)},
 tick:function(){tone(1046,0,.12,.07);tone(1318,.09,.14,.06)},
 ding:function(){tone(1046,0,.25,.12);tone(1568,.1,.35,.1)},
 soft:function(){tone(392,0,.22,.06,'triangle')},
 coin:function(){tone(988,0,.08,.1);tone(1319,.07,.28,.1)},
 found:function(){[523,659,784,1046].forEach(function(f,i){tone(f,i*.11,.45,.11)})},
 fanfare:function(){[523,659,784,659,784,1046].forEach(function(f,i){tone(f,i*.12,.5,.12)})},
 level:function(){[392,523,659,784,1046,1318].forEach(function(f,i){tone(f,i*.1,.6,.11)});tone(1568,.65,.9,.09)},
 badge:function(){[1319,1568,2093].forEach(function(f,i){tone(f,i*.09,.7,.08)})}};
function snd(k){if(!sndOn()||!SNDS[k])return;try{SNDS[k]()}catch(e){}}
function buzz(p){try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}}
document.addEventListener('click',function(e){var t=e.target.closest('button,a,[data-act]');if(!t)return;actx();var a=t.getAttribute('data-act')||'';if(a==='pqPick'||a==='geoCatch')return;snd('tap')},true);
ACT.sndTgl=function(){S.snd=S.snd||{};S.snd.off=!S.snd.off;save();if(sndOn())snd('ding');rerender()};

/* ---------- Materialien, Eier, Basis und Aufträge sind für das Kind ausgeblendet (Daten bleiben gespeichert) ---------- */
function chip(){}
function bchip(){}

/* ---------- Orte: Thema bestimmt, welche Freunde dort leben ---------- */
var PTHEME={sagrada:'kunst',pgaudi:'kunst',avgaudi:'kunst',santpau:'kunst',honest:'essen',milla:'kunst',batllo:'kunst',amatller:'kunst',pcat:'stadt',
 rambla:'stadt',boq:'essen',reial:'kunst',pallaresa:'essen',cath:'stadt',felip:'stadt',bisbe:'stadt',conesa:'essen',august:'stadt',rei:'stadt',smm:'stadt',bornccm:'stadt',pizza:'essen',
 tres:'park',guell:'park',picnic3:'park',bunkers:'hoch',vicens:'kunst',vila:'stadt',sol:'stadt',virreina:'stadt',tapeo:'essen',
 cosmo:'hoch',arc:'stadt',cascada:'park',lake:'meer',mammoth:'park',picasso:'kunst',paradeta:'essen',
 colom:'meer',ramblamar:'meer',bmarket:'essen',cova:'essen',estel:'meer',beach:'meer',peix:'meer',bogatell:'meer',
 funic:'hoch',castle:'hoch',alcalde:'hoch',brossa:'park',anella:'hoch',mnac:'kunst',blai:'essen',fountain:'meer'};
var THEMES_N={meer:'am Meer und am Wasser',park:'in Parks und Gärten',kunst:'an Kunst- und Gaudí-Häusern',stadt:'in alten Gassen und auf Plätzen',essen:'auf Märkten und beim Essen',hoch:'auf Hügeln und Aussichtspunkten'};
var TPOOL={meer:['plansch','muschi','regenb','eisi'],park:['blatti','pilzi','felsi','schlumm'],kunst:['drachi','kristo','goldi','felsi'],stadt:['felsi','schatti','schlumm','blitzi'],essen:['flamm','eisi','pilzi','goldi'],hoch:['blitzi','regenb','schatti','kristo']};
(function(){var eg=SPEC.filter(function(s){return s.src==='egg'}),ts=['meer','park','kunst','stadt','essen','hoch'];eg.forEach(function(s,i){TPOOL[ts[i%ts.length]].push(s.id)})})();
function themeOf(id){return PTHEME[id]||'stadt'}
function speciesThemes(spid){return Object.keys(TPOOL).filter(function(t){return TPOOL[t].indexOf(spid)>-1})}

/* ---------- Wachsen: denselben Freund wieder finden ---------- */
function petStage(id){var p=S.mu.pets[id];if(!p)return 0;var sp=SPEC_BY[id],g=(S.mu.life[sp.m]||0)-(p.base||0),a=g>=EVO[1]?3:g>=EVO[0]?2:1,n=p.n||1,b=n>=4?3:n>=2?2:1;return Math.max(a,b,p.st||1)}
function nextGrow(id){var p=S.mu.pets[id],st=petStage(id),n=p.n||1;if(st>=3)return 0;return (st===1?2:4)-n}

/* ---------- XP, Level, Abzeichen ---------- */
var LEVELS=[[0,'Anfänger'],[40,'Spurenleser'],[100,'Entdecker'],[180,'Abenteurer'],[280,'Profi'],[400,'Champion'],[550,'Muya-Meister']];
function lvlOf(x){var i=0;for(var k=0;k<LEVELS.length;k++)if(x>=LEVELS[k][0])i=k;return i}
function xpInit(){var m=S.mu;if(m.xp==null){m.xp=muOwned().length*20;m.lv=lvlOf(m.xp);m.bd=m.bd||{};badgeCheck(true)}}
function lvlBar(){var m=S.mu,i=lvlOf(m.xp||0),a=LEVELS[i][0],b=LEVELS[i+1]?LEVELS[i+1][0]:a,p=b>a?((m.xp-a)/(b-a))*100:100;return{i:i,name:LEVELS[i][1],next:LEVELS[i+1]?LEVELS[i+1][1]:null,need:b-m.xp,p:p}}
function addXP(n,why,quiet){var m=S.mu,before=lvlOf(m.xp||0);m.xp=(m.xp||0)+n;save();if(!quiet){xpChip(n,why);setTimeout(function(){snd('coin')},120)}
 var after=lvlOf(m.xp);if(after>before){m.lv=after;save();setTimeout(function(){levelUp(after)},1600)}}
function xpChip(n,why){var h=document.getElementById('xpbox');if(!h){h=document.createElement('div');h.id='xpbox';document.body.appendChild(h)}var e=document.createElement('div');e.className='xpc';e.innerHTML='<b>+'+n+' XP</b>'+(why?'<span>'+esc(why)+'</span>':'');h.appendChild(e);setTimeout(function(){e.remove()},2200)}
function levelUp(i){if(document.getElementById('catch')){setTimeout(function(){levelUp(i)},1200);return}snd('level');buzz([60,40,60]);sheet('<div style="text-align:center;padding:8px"><span class="lab">Neuer Rang</span><div class="lvlbig">'+(i+1)+'</div><h2 class="disp" style="font-size:38px">'+esc(LEVELS[i][1])+'</h2><p class="muted" style="margin:8px 0 16px">'+(LEVELS[i+1]?'Nächster Rang: '+esc(LEVELS[i+1][1])+'. Finde weiter Freunde!':'Du bist Muya-Meister! Super gemacht!')+'</p><button class="b p" data-act="closeSheetGo">Juhu!</button></div>')}
var BADGES=[
 ['first','Erster Fang','Deinen ersten Freund gefangen',function(c){return c.own>=1}],
 ['f5','Fünfer-Team','5 verschiedene Freunde',function(c){return c.own>=5}],
 ['f10','Zehn Freunde','10 verschiedene Freunde',function(c){return c.own>=10}],
 ['f20','Große Bande','20 verschiedene Freunde',function(c){return c.own>=20}],
 ['grow','Gewachsen','Ein Freund hat Stufe 2',function(c){return c.st2>=1}],
 ['grow3','Ganz groß','Ein Freund hat Stufe 3',function(c){return c.st3>=1}],
 ['shiny','Funkel-Fund','Einen Funkel-Freund gefunden',function(c){return c.shiny>=1}],
 ['rare','Selten!','Einen seltenen ★★★ Freund gefunden',function(c){return c.rare>=1}],
 ['day3','Fleißiger Tag','3 Orte an einem Tag',function(c){return c.bestDay>=3}],
 ['day6','Super-Tag','6 Orte an einem Tag',function(c){return c.bestDay>=6}],
 ['p10','Weltenbummler','10 Orte besucht',function(c){return c.places>=10}],
 ['p25','Stadtkenner','25 Orte besucht',function(c){return c.places>=25}],
 ['q10','Schlaukopf','10 Fragen gleich richtig',function(c){return c.qok>=10}],
 ['meer','Meeres-Freund','3 Orte am Meer',function(c){return c.th.meer>=3}],
 ['park','Park-Freund','3 Orte im Grünen',function(c){return c.th.park>=3}],
 ['kunst','Kunst-Freund','3 Kunst-Orte',function(c){return c.th.kunst>=3}],
 ['essen','Feinschmecker','3 Orte mit Essen',function(c){return c.th.essen>=3}],
 ['hoch','Gipfelstürmer','3 Orte ganz oben',function(c){return c.th.hoch>=3}],
 ['alle','Alle Welten','An Orten aller 6 Arten',function(c){return Object.keys(c.th).filter(function(k){return c.th[k]>0}).length>=6}]];
function badgeCtx(){var m=S.mu,own=muOwned(),c={own:own.length,st2:0,st3:0,shiny:0,rare:0,places:0,bestDay:0,qok:m.qok||0,th:{meer:0,park:0,kunst:0,stadt:0,essen:0,hoch:0}},days={};
 own.forEach(function(s){var st=petStage(s.id);if(st>=2)c.st2++;if(st>=3)c.st3++;if(m.pets[s.id].shiny)c.shiny++;if(s.rar===3)c.rare++});
 Object.keys(m.met).forEach(function(id){var x=m.met[id];c.places++;c.th[themeOf(id)]++;var d=new Date(x.t||0).toDateString();days[d]=(days[d]||0)+1});
 Object.keys(days).forEach(function(d){c.bestDay=Math.max(c.bestDay,days[d])});return c}
function badgeCheck(silent){var m=S.mu;m.bd=m.bd||{};var c=badgeCtx(),nw=[];BADGES.forEach(function(b){if(!m.bd[b[0]]&&b[3](c)){m.bd[b[0]]=today();nw.push(b)}});if(!nw.length)return;save();if(silent)return;
 nw.forEach(function(b,i){setTimeout(function(){badgeToast(b)},2600+i*1600)})}
function badgeToast(b){if(document.getElementById('catch')){setTimeout(function(){badgeToast(b)},1500);return}snd('badge');var e=document.createElement('div');e.className='bdgt';e.innerHTML='<span class="bdgi">'+ICON(IC.star,'#fff',2.4)+'</span><span><span class="lab">Neues Abzeichen</span><b>'+esc(b[1])+'</b><small>'+esc(b[2])+'</small></span>';document.body.appendChild(e);setTimeout(function(){e.remove()},3200)}

/* ---------- Fangen an einem Ort ---------- */
function pickFor(stopId){var pool=TPOOL[themeOf(stopId)].map(function(id){return SPEC_BY[id]}).filter(Boolean),un=pool.filter(function(s){return !S.mu.pets[s.id]});
 var from=(un.length&&Math.random()<0.65)?un:pool,t=0,w=function(s){return s.rar===3?1:s.rar===2?3:6};from.forEach(function(s){t+=w(s)});var r=Math.random()*t;for(var i=0;i<from.length;i++){r-=w(from[i]);if(r<=0)return from[i]}return from[0]}
function catchAt(stopId,firstTry){var m=S.mu,stp=STOPID[stopId];if(!stp||m.met[stopId])return;var place=pname(stopId),sp=pickFor(stopId),shiny=Math.random()<0.05;
 m.met[stopId]={t:Date.now(),sp:sp.id};if(GEO.found===stopId)GEO.found=null;setTimeout(geoCalc,100);if(!S.stadt.done[stopId]){S.stadt.done[stopId]=1;ev('stop',1,stopId)}if(firstTry)m.qok=(m.qok||0)+1;
 var p=m.pets[sp.id],xp=0;
 if(!p){m.pets[sp.id]={t:Date.now(),base:m.life[sp.m]||0,st:1,shiny:shiny?1:0,how:'wild',n:1,where:place};if(!m.buddy)m.buddy=sp.id;m.sel=sp.id;xp=20+(shiny?15:0)+(firstTry?5:0);
  save();checkRewards&&checkRewards();CATCHQ.push({id:sp.id,shiny:shiny,place:place,got:[],xp:xp,first:firstTry});setTimeout(catchNext,150)}
 else{var before=petStage(sp.id);p.n=(p.n||1)+1;if(shiny&&!p.shiny)p.shiny=1;var after=petStage(sp.id);if(after>before)p.st=after;m.sel=sp.id;xp=10+(shiny?15:0)+(firstTry?5:0);save();
  CATCHQ.push({id:sp.id,shiny:shiny,place:place,got:[],xp:xp,first:firstTry,dupe:1,before:before,after:after});setTimeout(catchNext,150)}
 badgeCheck(false);rerender()}

/* ---------- GPS: beim Öffnen prüfen, Kalt/Warm/Heiß ---------- */
var GEO={last:0,st:'off',lat:0,lng:0,acc:0,watch:null,near:null,lvl:-1,found:null,shown:{},t0:0,weakSince:0};
var RAD=100,HEAT=[[100,'Hier!','#E8590C'],[200,'Heiß','#F07A2E'],[400,'Warm','#F3A43B'],[800,'Lauwarm','#E3C35A'],[1500,'Kühl','#7FB8D9'],[1e12,'Kalt','#5B8FC8']];
function hav(a,b,c,d){var R=6371000,r=Math.PI/180,x=(c-a)*r,y=(d-b)*r,h=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(h))}
function planStops(){var o=[],seen={};tripDates().forEach(function(d,i){dayStops(i).forEach(function(s){var x=STOPID[s.id]||s;if(!seen[s.id]&&x&&x.lat&&x.lng){seen[s.id]=1;o.push(x)}})});return o}
function geoStops(){return planStops().filter(function(s){return !S.mu.met[s.id]})}
function geoStart(){if(GEO.watch!=null)return;if(!('geolocation' in navigator)){GEO.st='err';geoPaint();return}GEO.st='wait';GEO.t0=Date.now();geoPaint();
 try{GEO.watch=navigator.geolocation.watchPosition(geoFix,geoErr,{enableHighAccuracy:true,maximumAge:0,timeout:20000})}catch(e){GEO.st='err';geoPaint()}}
function geoErr(e){if(e&&e.code===1){GEO.st='deny';try{navigator.geolocation.clearWatch(GEO.watch)}catch(x){}GEO.watch=null}else if(!GEO.last)GEO.st='err';geoPaint()}
setInterval(function(){if(document.hidden||GEO.st==='deny'||GEO.st==='off'||GEO.st==='ask')return;if(Date.now()-GEO.last>20000)geoRefresh()},15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&GEO.st!=='off'&&GEO.st!=='ask'&&GEO.st!=='deny')geoRefresh()});
function geoFix(p){GEO.last=Date.now();GEO.lat=p.coords.latitude;GEO.lng=p.coords.longitude;GEO.acc=p.coords.accuracy||999;GEO.st='ok';geoCalc()}
function geoCalc(){if(GEO.st!=='ok')return;
 if(GEO.acc>150){if(!GEO.weakSince)GEO.weakSince=Date.now()}else GEO.weakSince=0;
 var best=null,any=null;planStops().forEach(function(s){var d=hav(GEO.lat,GEO.lng,s.lat,s.lng);if(!any||d<any.d)any={id:s.id,d:d};if(!S.mu.met[s.id]&&(!best||d<best.d))best={id:s.id,d:d}});GEO.near=best;GEO.any=any;
 var lv=best?HEAT.findIndex(function(h){return best.d<=h[0]}):5;
 if(GEO.lvl>-1&&lv<GEO.lvl&&lv>0){snd('tick');buzz(30)}GEO.lvl=lv;
 if(best&&best.d<=RAD+Math.min(GEO.acc,100)&&GEO.acc<=250){if(GEO.found!==best.id){GEO.found=best.id;if(!GEO.shown[best.id]){GEO.shown[best.id]=1;snd('found');buzz([80,60,80,60,120])}}}else GEO.found=null;
 geoPaint()}
function fmtD(d){return d<1000?Math.round(d/10)*10+' m':(d/1000).toFixed(1)+' km'}
ACT.geoInfo=function(){var SK=Object.keys(S.stadt.skip||{}).filter(function(id){return STOPID[id]&&!S.mu.met[id]}),L=planStops().map(function(x){return{id:x.id,d:GEO.lat?hav(GEO.lat,GEO.lng,x.lat,x.lng):0}}).sort(function(a,b){return a.d-b.d}).slice(0,6);
 sheet('<h2 class="disp" style="font-size:26px">GPS-Details</h2><p class="muted" style="margin:6px 0 10px;font-size:14px">Position '+(GEO.lat?GEO.lat.toFixed(5)+', '+GEO.lng.toFixed(5):'–')+' · Genauigkeit ±'+Math.round(GEO.acc||0)+' m · vor '+Math.round((Date.now()-GEO.last)/1000)+' s</p><div class="col" style="gap:6px">'+L.map(function(x){return '<div class="row" style="padding:6px 0;border-top:1px solid var(--line);font-size:15px;gap:8px;flex-wrap:wrap"><b style="flex:1;min-width:120px">'+esc(pname(x.id))+'</b><span>'+fmtD(x.d)+'</span>'+(S.mu.met[x.id]?'<span class="tag">✓ gefunden</span>':'<button class="gskip" data-act="geoSkip" data-a="'+x.id+'">Auslassen</button>')+'</div>'}).join('')+'</div>'+(SK.length?'<div class="lab" style="margin-top:12px">Ausgelassen</div><div class="col" style="gap:4px;margin-top:4px">'+SK.map(function(id){return '<div class="row" style="font-size:15px;gap:8px;flex-wrap:wrap"><span style="flex:1;min-width:120px;color:var(--ink2)">'+esc(pname(id))+'</span><button class="gskip" data-act="geoUnskip" data-a="'+id+'">Zurückholen</button></div>'}).join('')+'</div>':'')+(GEO.acc>150?'<p class="gwarn" style="margin-top:10px"><b>Standort ungenau</b><span>Android: Einstellungen → Apps → Chrome → Berechtigungen → Standort → „Genauen Standort verwenden“ einschalten.</span></p>':'')+'<div class="row" style="margin-top:12px;gap:8px"><button class="b p" data-act="geoInfoRef">Neu suchen</button><button class="b" data-act="closeSheet">Schließen</button></div>')};
ACT.geoSkip=function(id){S.stadt.skip[id]=1;save();geoCalc();ACT.geoInfo();toast(pname(id)+' wird ausgelassen.')};
ACT.geoUnskip=function(id){delete S.stadt.skip[id];save();geoCalc();ACT.geoInfo()};
ACT.geoSkip1=function(id){S.stadt.skip[id]=1;save();geoCalc();toast(pname(id)+' wird ausgelassen. Zurückholen: Details antippen.')};
ACT.geoInfoRef=function(){closeSheet();geoRefresh()};
function geoWeak(){return GEO.st==='err'||GEO.st==='deny'||(GEO.st==='wait'&&Date.now()-GEO.t0>25000)||(GEO.weakSince&&Date.now()-GEO.weakSince>20000)}
function geoInit(){if(!('geolocation' in navigator)){GEO.st='err';return}
 try{navigator.permissions.query({name:'geolocation'}).then(function(r){if(r.state==='granted')geoStart();else if(r.state==='denied'){GEO.st='deny';geoPaint()}else{GEO.st='ask';geoPaint()}}).catch(function(){GEO.st='ask';geoPaint()})}catch(e){GEO.st='ask'}}
ACT.geoGo=function(){geoRefresh()};
function geoStale(){return GEO.st!=='ok'||Date.now()-GEO.last>30000}
function geoRefresh(){if(GEO.watch!=null){try{navigator.geolocation.clearWatch(GEO.watch)}catch(e){}GEO.watch=null}GEO.spin=Date.now();geoStart();
 try{navigator.geolocation.getCurrentPosition(geoFix,function(){},{enableHighAccuracy:true,maximumAge:0,timeout:20000})}catch(e){}geoPaint()}
function rbtn(){var sp=GEO.spin&&Date.now()-GEO.spin<6000;return '<button class="grf'+(sp?' spin':'')+'" data-act="geoGo" aria-label="Standort neu suchen">'+ICON('M20 11a8 8 0 10-2.3 5.7M20 4v7h-7','currentColor',2.4)+'</button>'}
document.addEventListener('visibilitychange',function(){if(!document.hidden&&GEO.st==='ok'){GEO.shown={}}});
function geoPaint(){var b=document.getElementById('geobox');if(b)b.innerHTML=geoInner(b.getAttribute('data-big')==='1');var f=document.getElementById('geofab');var show=GEO.found&&!document.getElementById('geobox')&&!document.querySelector('.sheet')&&!document.getElementById('catch');
 if(show&&!f){f=document.createElement('button');f.id='geofab';f.setAttribute('data-act','geoCatch');document.body.appendChild(f)}if(f){if(show)f.innerHTML='<span class="gfs">'+silh()+'</span><b>Ein Freund ist hier!</b><span>Antippen</span>';else f.remove()}}
function silh(){var sp=SPEC_BY[TPOOL[themeOf(GEO.found||'x')][0]]||SPEC[0];return cre(sp,1,1)}
function heat(){if(!GEO.near)return HEAT[5];return HEAT[Math.max(0,GEO.lvl)]}
function geoInner(big){var h=heat(),bud=S.mu.buddy&&S.mu.pets[S.mu.buddy]?creP(S.mu.buddy,petStage(S.mu.buddy)):cre(SPEC_BY.nordi||SPEC[0],1,0);
 if(GEO.found){var place=pname(GEO.found);return '<div class="gfound'+(big?' big':'')+'"><div class="gshake">'+silh()+'</div><div><b>Ein Freund ist hier!</b><span>'+esc(place)+'</span></div><button class="b p" data-act="geoCatch">Fangen!</button></div>'}
 if(GEO.st==='off'||GEO.st==='ask')return '<div class="gmeter'+(big?' big':'')+'"><div class="gbud">'+bud+'</div><div class="gtx"><b>Wo ist mein Freund?</b><span>Tippe auf ↻. Muya sagt dir: kalt, warm oder heiß.</span></div>'+rbtn()+'</div>';
 var steps=HEAT.slice().reverse().map(function(x,i){var on=(5-Math.max(0,GEO.lvl))>=i;return '<i style="background:'+(on&&GEO.st==='ok'?x[2]:'var(--fill)')+'"></i>'}).join('');
 var msg=GEO.st==='ok'&&geoStale()?'Standort ist nicht neu. Tippe auf ↻.':GEO.st==='ok'?(GEO.near?(h[1]==='Kalt'?'Hier ist es noch kalt. Weiter laufen!':h[1]==='Kühl'?'Ein bisschen wärmer…':h[1]==='Lauwarm'?'Es wird wärmer!':h[1]==='Warm'?'Warm! Ein Freund ist nicht weit.':'Heiß! Ganz nah!'):'Alle Freunde hier gefunden!'):GEO.st==='wait'?'Suche Signal …':'Kein GPS-Signal';
 var word=GEO.st==='ok'?(GEO.near?h[1]:'Fertig'):'…';
 return '<div class="gwrap"><div class="gmeter'+(big?' big':'')+'"><div class="gbud">'+bud+'</div><div class="gtx"><b style="color:'+(GEO.st==='ok'?h[2]:'var(--ink2)')+'">'+word+'</b><span>'+msg+'</span><div class="gsteps">'+steps+'</div>'+(GEO.st==='ok'&&GEO.any&&GEO.any.d<=150&&S.mu.met[GEO.any.id]?'<span class="gdone">Bei '+esc(pname(GEO.any.id))+' hast du schon einen Freund gefunden.</span>':'')+(GEO.st==='ok'&&GEO.near?'<button class="ginfo" data-act="geoInfo">Nächster Freund: <b>'+esc(pname(GEO.near.id))+'</b> · ca. '+fmtD(GEO.near.d)+'<br>GPS ±'+Math.round(GEO.acc)+' m · vor '+Math.max(0,Math.round((Date.now()-GEO.last)/1000))+' s</button>'+'<button class="gskip sm" data-act="geoSkip1" data-a="'+GEO.near.id+'">Anderer Ort? Diesen auslassen</button>':'')+'</div>'+(geoStale()?rbtn():'')+'</div>'+
  (geoWeak()?'<div class="gwarn"><b>'+ICON('M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z','currentColor',2.2).replace('<svg','<svg class="gwi"')+(GEO.st==='deny'?'Standort ist nicht erlaubt':GEO.st==='ok'&&GEO.acc>150?'Standort ungenau (±'+Math.round(GEO.acc)+' m)':'Kein GPS-Signal')+'</b><span>'+(GEO.st==='deny'?'Erlaube den Standort in Chrome und tippe dann auf ↻.':(GEO.st==='ok'&&GEO.acc>150?'Android: Einstellungen → Apps → Chrome → Berechtigungen → Standort → „Genauen Standort verwenden“ einschalten.':'Ist der Standort am Handy an? Tippe auf ↻ oder geh ein paar Schritte ins Freie.'))+'</span><button class="gwbtn" data-act="geoParent">Eltern: Wir sind da</button></div>':'')+'</div>'}
ACT.geoCatch=function(){var id=GEO.found;if(!id||S.mu.met[id])return;var f=document.getElementById('geofab');if(f)f.remove();ACT.here(id)};
ACT.geoParent=function(){var st=dayStops(curSlot()).filter(function(s){return !S.mu.met[s.id]});sheet('<h2 class="disp" style="font-size:26px">Wo seid ihr?</h2><p class="muted" style="margin:6px 0 10px">Nur für Eltern, wenn GPS nicht geht.</p><div class="col" style="gap:6px;max-height:50vh;overflow:auto">'+(st.length?st.map(function(s){return '<button class="qo" data-act="geoParentGo" data-a="'+s.id+'">'+esc(pname(s.id))+'</button>'}).join(''):'<p class="muted">Heute sind alle Orte geschafft.</p>')+'</div><button class="b" style="margin-top:10px" data-act="closeSheet">Abbrechen</button>')};
ACT.geoParentGo=function(id){closeSheet();setTimeout(function(){ACT.here(id)},100)};
setInterval(function(){if(document.getElementById('geobox'))geoPaint()},5000);

/* ---------- Fangen startet immer mit der Frage (p_quiz), danach catchAt ---------- */
HERE_REAL=function(id){var stp=id?STOPID[id]:null;if(!stp)return toast('Öffne die App an einem Ort.');if(S.mu.met[stp.id])return toast('Hier warst du schon. Dein Freund wartet im Dex.');catchAt(stp.id,!!PQ_FIRST)};
var PQ_FIRST=true;
ACT.hereAt=function(id){if(S.mu.met[id])return toast('Hier warst du schon. Dein Freund wartet im Dex.');toast('Geh mit Mama oder Papa hin und öffne dort die App.')};

/* ---------- Seite „Suchen“ ---------- */
ROUTES.suchen=function(){return ROUTES.home()};
function _oldSuchen(){xpInit();var L=lvlBar(),m=S.mu,ps=planStops(),met=ps.filter(function(x){return m.met[x.id]}).length,all=ps.length;
 return '<div class="scr"><div class="hd"><div class="t"><span class="lab">Wo ist mein Freund?</span><h1 class="disp">Suchen</h1></div><div class="sp"></div><button class="icb" data-act="sndTgl" aria-label="Ton">'+ICON(sndOn()?'M4 9v6h4l5 4V5L8 9H4zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11':'M4 9v6h4l5 4V5L8 9H4zM16 9l5 6M21 9l-5 6','currentColor',2)+'</button></div>'+
 '<div class="bd" style="display:flex;flex-direction:column;gap:14px;min-height:0"><div id="geobox" data-big="1" class="hcard sbig">'+geoInner(true)+'</div>'+
 '<div class="sgrid2"><div class="hcard">'+meisterHtml()+'</div><div class="hcard"><div class="row"><span class="h2t">Orte</span><div class="sp"></div><span class="lab">'+met+' von '+all+'</span></div><p class="muted" style="font-size:15px;margin-top:8px">Laufe mit Mama und Papa zu den Orten der Reise. Wenn es heiß wird, ist ein Freund ganz nah. Öffne dann die App.</p></div></div></div></div>'};
function meisterHtml(){xpInit();var L=lvlBar(),m=S.mu,got=Object.keys(m.bd||{}).length,nx=BADGES.filter(function(b){return !(m.bd||{})[b[0]]}).slice(0,2);
 return '<div class="row" style="gap:12px"><span class="lvlc">'+(L.i+1)+'</span><div style="flex:1;min-width:0"><span class="lab">Dein Rang</span><div class="h2t">'+esc(L.name)+'</div></div><span class="lab">'+(m.xp||0)+' XP</span></div><div class="bar" style="margin:10px 0 6px"><i style="width:'+L.p+'%"></i></div><span class="muted" style="font-size:14px">'+(L.next?'Noch '+L.need+' XP bis '+esc(L.next):'Höchster Rang erreicht!')+'</span>'+
 '<div class="row" style="margin-top:12px;gap:8px;font-size:15px"><span>Orte besucht: <b>'+planStops().filter(function(x){return m.met[x.id]}).length+' von '+planStops().length+'</b></span><div class="sp"></div><button class="icb" style="width:34px;height:34px" data-act="sndTgl" aria-label="Ton">'+ICON(sndOn()?'M4 9v6h4l5 4V5L8 9H4zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11':'M4 9v6h4l5 4V5L8 9H4zM16 9l5 6M21 9l-5 6','currentColor',2)+'</button></div>'+
 '<div style="margin-top:8px"><a href="#/freunde" class="row" style="gap:8px;font-weight:700;font-size:15px" data-act="muTab" data-a="badges">'+ICON(IC.star,'#E3A600',2.2).replace('<svg','<svg style="width:20px;height:20px"')+'Abzeichen: '+got+' von '+BADGES.length+'</a>'+nx.map(function(b){return '<div class="muted" style="font-size:14px;margin-top:4px">Als Nächstes: <b>'+esc(b[1])+'</b> · '+esc(b[2])+'</div>'}).join('')+'</div>'}
function badgesHtml(){var m=S.mu;m.bd=m.bd||{};return '<div class="bdgrid">'+BADGES.map(function(b){var on=!!m.bd[b[0]];return '<div class="pn bdg'+(on?' on':'')+'"><span class="bdgi">'+ICON(IC.star,on?'#fff':'var(--ink3)',2.4)+'</span><b>'+esc(b[1])+'</b><small>'+esc(b[2])+'</small>'+(on?'<span class="lab" style="font-size:12px">'+esc(m.bd[b[0]].split('-').reverse().join('.'))+'</span>':'')+'</div>'}).join('')+'</div>'}

/* ---------- Start ---------- */
window.addEventListener('DOMContentLoaded',function(){xpInit();geoInit()});
window.addEventListener('hashchange',function(){setTimeout(geoPaint,50)});
