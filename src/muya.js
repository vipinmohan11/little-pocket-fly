/* ===== Muya-Freunde: Materialien sammeln, Eier basteln, Freunde entwickeln, Tagesaufträge ===== */
var MATS=['papier','wolken','kompass','mosaik','sterne'];
var MAT={papier:{n:'Papier',c:'#E9E1CC',h:'Tüftel-Hangar: werfen und falten'},wolken:{n:'Wolken',c:'#B5D5FF',h:'Wie fliegt das?: Aufgaben lösen'},kompass:{n:'Kompass',c:'#FF9E8C',h:'Kapitäns-Aufträge: Runden, Bordkarten, Bingo'},mosaik:{n:'Mosaik',c:'#49C5B6',h:'Wunderwesen und Stadtplan'},sterne:{n:'Sterne',c:'#ECD06F',h:'Tagebuch, Packliste, Rekord-Labor'}};
function matIcon(m,sz){sz=sz||22;var i={
 papier:'<path d="M5 3h10l4 4v14H5z" fill="#FFFDF8" stroke="#13324A" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 3v4h4" fill="#E9E1CC" stroke="#13324A" stroke-width="1.6" stroke-linejoin="round"/>',
 wolken:'<path d="M7 18a4 4 0 010-8 5 5 0 019.4-1A4.5 4.5 0 0117 18z" fill="#DCEEFF" stroke="#13324A" stroke-width="1.8" stroke-linejoin="round"/>',
 kompass:'<circle cx="12" cy="12" r="9" fill="#FFE6DF" stroke="#13324A" stroke-width="1.8"/><path d="M12 5l2.5 7-2.5 7-2.5-7z" fill="#FF6A52" stroke="#13324A" stroke-width="1.4" stroke-linejoin="round"/>',
 mosaik:'<rect x="3" y="3" width="8" height="8" fill="#49C5B6" stroke="#13324A" stroke-width="1.6"/><rect x="13" y="3" width="8" height="8" fill="#ECD06F" stroke="#13324A" stroke-width="1.6"/><rect x="3" y="13" width="8" height="8" fill="#FFB288" stroke="#13324A" stroke-width="1.6"/><rect x="13" y="13" width="8" height="8" fill="#B5D5FF" stroke="#13324A" stroke-width="1.6"/>',
 sterne:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="#ECD06F" stroke="#13324A" stroke-width="1.7" stroke-linejoin="round"/>'};
 return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" style="flex:none">'+i[m]+'</svg>'}

/* 12 eigene Freunde, je 3 Entwicklungsstufen */
var SPEC=[
 {id:'knick',m:'papier',n:['Knick','Knicker','Knickaro'],c:'#FFB288',c2:'#FFE2CF',sh:'round',ears:'tri',tail:'fox',mark:'fold',story:'Knick wohnt in einer Schublade voller Papier. Wenn es aufgeregt ist, faltet sich sein Schwanz von allein zu einem Fächer.'},
 {id:'gleit',m:'papier',n:['Gleitchen','Gleiter','Gleitaro'],c:'#B5D5FF',c2:'#E4F0FF',sh:'wide',ears:'fin',tail:'star',mark:'fold',story:'Gleitchen liebt Aufwind. Es breitet die Flügel aus und segelt, bis ihm die Puste ausgeht, und dann noch ein Stück weiter.'},
 {id:'woelk',m:'wolken',n:['Wölkli','Wolkino','Wolkano'],c:'#DCEEFF',c2:'#FFFFFF',sh:'round',ears:'round',tail:'puff',mark:'cloud',story:'Wölkli ist ganz weich und sieht aus wie ein Mini-Wölkchen. Bei Sonnenschein wird es ein bisschen rosa.'},
 {id:'nebbi',m:'wolken',n:['Nebbi','Nebulo','Nebelor'],c:'#C9C7E8',c2:'#EEEDFA',sh:'tall',ears:'ant',tail:'puff',mark:'cloud',story:'Nebbi kennt jeden Morgennebel persönlich. Es hüllt sich ein, wenn es schüchtern ist, und taucht dann wieder auf.'},
 {id:'kompi',m:'kompass',n:['Kompi','Kompaso','Kompanus'],c:'#FF9E8C',c2:'#FFE1DA',sh:'round',ears:'ant',tail:'star',mark:'rose',story:'Kompi findet immer Norden. Nur bei Eiscreme dreht sich seine Nase im Kreis.'},
 {id:'nordi',m:'kompass',n:['Nordi','Nordling','Nordikus'],c:'#8BC7D9',c2:'#DDF1F7',sh:'tall',ears:'tri',tail:'fox',mark:'rose',story:'Nordi hat ein feines Gespür für Richtungen. Es zeigt mit dem Ohr dorthin, wo das nächste Abenteuer wartet.'},
 {id:'mosi',m:'mosaik',n:['Mosi','Mosaiko','Mosaikus'],c:'#49C5B6',c2:'#CDF1EC',sh:'round',ears:'round',tail:'fox',mark:'tile',story:'Mosi ist aus bunten Scherben gemacht und glitzert in der Sonne. Es sammelt Farben wie andere Muscheln.'},
 {id:'scherb',m:'mosaik',n:['Scherbi','Scherbino','Scherbaro'],c:'#ECD06F',c2:'#FBF0C4',sh:'wide',ears:'tri',tail:'puff',mark:'tile',story:'Scherbi liegt gern in warmen Mosaikbänken und sonnt sich. Jeder Fleck auf seinem Fell ist eine kleine Geschichte.'},
 {id:'funki',m:'sterne',n:['Funki','Funkelo','Funkelion'],c:'#ECD06F',c2:'#FFF5CC',sh:'round',ears:'ant',tail:'star',mark:'star',story:'Funki funkelt, wenn jemand etwas Schönes erlebt. Je mehr Erinnerungen, desto heller wird es.'},
 {id:'mondi',m:'sterne',n:['Mondi','Mondo','Mondaro'],c:'#9AA9E8',c2:'#DDE3FA',sh:'tall',ears:'round',tail:'star',mark:'moon',story:'Mondi ist ein Nachtmensch. Es erzählt dir beim Einschlafen, was am Tag alles passiert ist.'},
 {id:'bunt',m:'sterne',n:['Bunti','Buntino','Buntaro'],c:'#FFB6C8',c2:'#FFE4EB',sh:'wide',ears:'round',tail:'puff',mark:'star',story:'Bunti steckt voller Farben. Packt man den Koffer ordentlich, wird es ganz hell vor Freude.'},
 {id:'rakki',m:'kompass',n:['Rakki','Rakko','Rakkator'],c:'#FF6A52',c2:'#FFD2C9',sh:'tall',ears:'fin',tail:'fox',mark:'rose',story:'Rakki ist ein kleiner Abenteurer mit großem Mut. Es will bei jedem Start ganz vorne mit dabei sein.'}];
var SPEC_BY={};SPEC.forEach(function(s){SPEC_BY[s.id]=s});
function mStar(x,y,r,f,s){var p='',i;for(i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;p+=(i?'L':'M')+(x+q*Math.cos(a)).toFixed(1)+','+(y+q*Math.sin(a)).toFixed(1)}return '<path d="'+p+'Z" fill="'+f+'" stroke="'+(s||'#13324A')+'" stroke-width="1.3" stroke-linejoin="round"/>'}
function cre(sp,st,sil){var I='#13324A',sc=[.84,.97,1.1][st-1],cx=50,cy=60,c=sp.c,c2=sp.c2,
 rx=24*sc*(sp.sh==='wide'?1.14:sp.sh==='tall'?.9:1),ry=22*sc*(sp.sh==='tall'?1.18:sp.sh==='wide'?.92:1),top=cy-ry,o='';
 var ln='stroke="'+I+'" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';
 if(st===3)o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rx+13)+'" fill="'+c+'" opacity=".2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(rx+9)+'" fill="none" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="3 5" opacity=".7"/>';
 /* Schwanz */
 if(sp.tail==='fox')o+='<g transform="rotate(-32 '+(cx+rx)+' '+(cy+ry*.3)+')"><ellipse cx="'+(cx+rx+7)+'" cy="'+(cy+ry*.3)+'" rx="'+(13*sc)+'" ry="'+(7*sc)+'" fill="'+c+'" '+ln+'/><circle cx="'+(cx+rx+7+11*sc)+'" cy="'+(cy+ry*.3)+'" r="'+(4.5*sc)+'" fill="#FFFDF8" stroke="'+I+'" stroke-width="1.4"/></g>';
 else if(sp.tail==='puff')o+=[[0,0,6],[7,-5,5],[7,6,5]].map(function(q){return '<circle cx="'+(cx+rx+q[0]*sc+2)+'" cy="'+(cy+ry*.35+q[1]*sc)+'" r="'+(q[2]*sc)+'" fill="'+c2+'" '+ln+'/>'}).join('');
 else if(sp.tail==='star')o+='<path d="M'+(cx+rx-2)+','+(cy+ry*.5)+' Q'+(cx+rx+10)+','+(cy+ry*.5)+' '+(cx+rx+12)+','+(cy+ry*.1)+'" fill="none" '+ln+'/>'+mStar(cx+rx+13,cy+ry*.05,6*sc,'#ECD06F');
 /* Flügel ab Stufe 2 */
 if(st>=2){var wl=(st===3?22:15)*sc;o+='<path d="M'+(cx-rx+3)+','+(cy-2)+' L'+(cx-rx-wl)+','+(cy-ry*.55)+' L'+(cx-rx+2)+','+(cy+9)+'Z" fill="#FFFDF8" '+ln+'/><path d="M'+(cx+rx-3)+','+(cy-2)+' L'+(cx+rx+wl)+','+(cy-ry*.55)+' L'+(cx+rx-2)+','+(cy+9)+'Z" fill="#FFFDF8" '+ln+'/>'}
 /* Füße */
 o+='<ellipse cx="'+(cx-rx*.5)+'" cy="'+(cy+ry-1)+'" rx="'+(7*sc)+'" ry="'+(4*sc)+'" fill="'+c2+'" '+ln+'/><ellipse cx="'+(cx+rx*.5)+'" cy="'+(cy+ry-1)+'" rx="'+(7*sc)+'" ry="'+(4*sc)+'" fill="'+c2+'" '+ln+'/>';
 /* Ohren / Fühler */
 if(sp.ears==='tri')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.78)+','+(cy-ry*.5)+' L'+(cx+d*rx*.5)+','+(top-13*sc)+' L'+(cx+d*rx*.08)+','+(cy-ry*.92)+'Z" fill="'+c+'" '+ln+'/><path d="M'+(cx+d*rx*.55)+','+(top-3*sc)+' L'+(cx+d*rx*.5)+','+(top-8*sc)+' L'+(cx+d*rx*.35)+','+(top-1)+'Z" fill="'+c2+'"/>'});
 else if(sp.ears==='round')[-1,1].forEach(function(d){o+='<circle cx="'+(cx+d*rx*.62)+'" cy="'+(top+2)+'" r="'+(8*sc)+'" fill="'+c+'" '+ln+'/><circle cx="'+(cx+d*rx*.62)+'" cy="'+(top+3)+'" r="'+(4*sc)+'" fill="'+c2+'"/>'});
 else if(sp.ears==='ant')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.3)+','+(top+2)+' Q'+(cx+d*rx*.5)+','+(top-8*sc)+' '+(cx+d*rx*.7)+','+(top-13*sc)+'" fill="none" '+ln+'/><circle cx="'+(cx+d*rx*.7)+'" cy="'+(top-14*sc)+'" r="'+(3.6*sc)+'" fill="#ECD06F" stroke="'+I+'" stroke-width="1.5"/>'});
 else if(sp.ears==='fin')[-1,1].forEach(function(d){o+='<ellipse cx="'+(cx+d*rx*.72)+'" cy="'+(top+4)+'" rx="'+(5*sc)+'" ry="'+(11*sc)+'" transform="rotate('+(d*28)+' '+(cx+d*rx*.72)+' '+(top+4)+')" fill="'+c2+'" '+ln+'/>'});
 /* Körper */
 o+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+c+'" '+ln+'/><ellipse cx="'+cx+'" cy="'+(cy+ry*.36)+'" rx="'+(rx*.62)+'" ry="'+(ry*.5)+'" fill="'+c2+'" opacity=".75"/>';
 /* Merkmal */
 var fy=cy-ry*.58;
 if(sp.mark==='fold')o+='<path d="M'+(cx-6)+','+(fy+2)+' L'+(cx+6)+','+(fy+2)+' L'+cx+','+(fy-8)+'Z" fill="#FFFDF8" stroke="'+I+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M'+cx+','+(fy-8)+' L'+cx+','+(fy+2)+'" stroke="'+I+'" stroke-width="1" opacity=".5"/>';
 else if(sp.mark==='cloud')o+=[[-7,1,5.5],[0,-3,6.5],[7,1,5.5]].map(function(q){return '<circle cx="'+(cx+q[0])+'" cy="'+(top+q[1]+1)+'" r="'+q[2]+'" fill="#FFFFFF" '+ln.replace('stroke-width="2"','stroke-width="1.5"')+'/>'}).join('');
 else if(sp.mark==='rose')o+=mStar(cx,fy-1,7*sc,'#FF6A52');
 else if(sp.mark==='tile')o+=[[-9,0,'#FF6A52'],[-1,2,'#ECD06F'],[7,-1,'#13324A']].map(function(q,k){return '<rect x="'+(cx+q[0]+(k?2:0))+'" y="'+(cy+ry*.3+q[1])+'" width="6.5" height="6.5" fill="'+q[2]+'" stroke="'+I+'" stroke-width="1.2" transform="rotate('+(k*14-8)+' '+(cx+q[0]+3)+' '+(cy+ry*.3+q[1]+3)+')"/>'}).join('');
 else if(sp.mark==='star')o+=mStar(cx,fy-1,6.5*sc,'#ECD06F');
 else if(sp.mark==='moon')o+='<path d="M'+(cx+4)+','+(fy-7)+' A7 7 0 1 0 '+(cx+4)+','+(fy+7)+' A5.5 5.5 0 1 1 '+(cx+4)+','+(fy-7)+'Z" fill="#FFF5CC" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 /* Gesicht */
 var ey=cy-ry*.12,ed=rx*.42;
 [-1,1].forEach(function(d){o+='<circle cx="'+(cx+d*ed)+'" cy="'+ey+'" r="'+(5.4*sc)+'" fill="#fff" stroke="'+I+'" stroke-width="1.7"/><circle cx="'+(cx+d*ed+d*.6)+'" cy="'+(ey+.6)+'" r="'+(3*sc)+'" fill="'+I+'"/><circle cx="'+(cx+d*ed+d*.6-1)+'" cy="'+(ey-.8)+'" r="1.1" fill="#fff"/><circle cx="'+(cx+d*rx*.68)+'" cy="'+(ey+9*sc)+'" r="'+(3.2*sc)+'" fill="#FF8F7E" opacity=".55"/>'});
 o+='<path d="M'+(cx-3.5)+','+(ey+8*sc)+' Q'+cx+','+(ey+12*sc)+' '+(cx+3.5)+','+(ey+8*sc)+'" fill="none" stroke="'+I+'" stroke-width="1.8" stroke-linecap="round"/>';
 /* Krone und Glitzer ab Stufe 3 / 2 */
 if(st===3){var ct=top-(sp.ears==='none'?2:7*sc);o+='<path d="M'+(cx-9)+','+(ct+5)+' L'+(cx-9)+','+(ct-3)+' L'+(cx-4.5)+','+(ct+1)+' L'+cx+','+(ct-6)+' L'+(cx+4.5)+','+(ct+1)+' L'+(cx+9)+','+(ct-3)+' L'+(cx+9)+','+(ct+5)+'Z" fill="#ECD06F" '+ln.replace('stroke-width="2"','stroke-width="1.6"')+'/>'}
 if(st>=2)o+=mStar(14,24,4,'#fff')+mStar(88,30,3.5,'#fff')+(st===3?mStar(20,86,3,'#fff')+mStar(84,84,4,'#fff'):'');
 return '<svg viewBox="6 8 90 90" style="width:100%;height:100%;display:block'+(sil?';filter:brightness(0);opacity:.14':'')+'" aria-hidden="true">'+o+'</svg>'}

/* ---- Zustand und Ereignisse ---- */
var EVT={throw:['papier',1],fold:['papier',3],chal:['wolken',1],chalok:['wolken',2],round:['kompass',2],pass:['kompass',3],bingo:['kompass',1],find:['mosaik',2],explore:['mosaik',1],stop:['mosaik',1],mem:['sterne',2],rek:['sterne',1],pack:['sterne',.2]};
function muDay(){var m=S.mu,d=today();return m.days[d]||(m.days[d]={c:{},done:{}})}
function ev(k,x){var e=EVT[k];if(!e||!S.mu)return;var m=S.mu,x1=x||1,n=e[1]*x1,D=muDay();m.cnt[k]=(m.cnt[k]||0)+x1;D.c[k]=(D.c[k]||0)+x1;if(k==='chalok'){m.cnt.chal=(m.cnt.chal||0)+1;D.c.chal=(D.c.chal||0)+1}
 var w=n;if(n<1){m.frac=(m.frac||0)+n;w=Math.floor(m.frac+1e-9);m.frac-=w}
 if(w>0){m.mat[e[0]]=(m.mat[e[0]]||0)+w;m.life[e[0]]=(m.life[e[0]]||0)+w;chip(e[0],w);muEvo()}
 save()}
function chip(mk,n){var h=document.getElementById('gainbox');if(!h){h=document.createElement('div');h.id='gainbox';h.style.cssText='position:fixed;left:16px;bottom:16px;display:flex;flex-direction:column;gap:6px;z-index:60;pointer-events:none';document.body.appendChild(h)}
 while(h.children.length>=3)h.removeChild(h.firstChild);var e=document.createElement('div');e.style.cssText='display:flex;align-items:center;gap:6px;background:#13324A;color:#fff;border-radius:18px;padding:5px 12px 5px 8px;font-weight:800;font-size:14px;animation:pop .35s both;box-shadow:0 4px 14px rgba(19,50,74,.25)';e.innerHTML=matIcon(mk,20)+'+'+n+' '+MAT[mk].n;h.appendChild(e);setTimeout(function(){e.style.transition='opacity .4s';e.style.opacity=0;setTimeout(function(){e.remove()},420)},1500)}
function petStage(id){var p=S.mu.pets[id];if(!p)return 0;var sp=SPEC_BY[id],g=(S.mu.life[sp.m]||0)-p.base;return g>=EVO[1]?3:g>=EVO[0]?2:1}
var EVO=[12,30];
function muEvo(){Object.keys(S.mu.pets).forEach(function(id){var p=S.mu.pets[id],st=petStage(id);if(st>(p.st||1)){p.st=st;S.mu.news.push({id:id,st:st});setTimeout(function(){toast(SPEC_BY[id].n[st-2]+' hat sich zu '+SPEC_BY[id].n[st-1]+' entwickelt!')},900)}})}
function muOwned(){return SPEC.filter(function(s){return S.mu.pets[s.id]})}
function eggCost(sp){var o=MATS[(MATS.indexOf(sp.m)+1)%MATS.length],c={};c[sp.m]=5;c[o]=3;return c}
function canAfford(c){return Object.keys(c).every(function(k){return (S.mu.mat[k]||0)>=c[k]})}
function costHtml(c){return Object.keys(c).map(function(k){var ok=(S.mu.mat[k]||0)>=c[k];return '<span class="tag" style="display:inline-flex;align-items:center;gap:4px;background:'+(ok?'#B1EAC4':'var(--paper)')+'">'+matIcon(k,14)+(S.mu.mat[k]||0)+'/'+c[k]+'</span>'}).join(' ')}
function hatch(id){var sp=SPEC_BY[id];S.mu.pets[id]={t:Date.now(),base:S.mu.life[sp.m]||0,st:1};if(!S.mu.buddy)S.mu.buddy=id;S.mu.sel=id;save();checkRewards&&checkRewards();
 var s=sheet('<div style="text-align:center;padding:6px 10px"><span class="lab">Ein Ei schlüpft!</span><div style="width:190px;height:190px;margin:6px auto;animation:pop .6s both">'+cre(sp,1)+'</div><h2 class="disp" style="font-size:40px">'+esc(sp.n[0])+'</h2><p class="muted" style="margin:8px auto 16px;max-width:340px">'+esc(sp.story)+'</p><button class="b p" data-act="closeSheetGo">Willkommen!</button></div>');rerender()}
ACT.closeSheetGo=function(){closeSheet();rerender()};
ACT.muCraft=function(id){var sp=SPEC_BY[id];if(!sp||S.mu.pets[id])return;var c=eggCost(sp);if(!canAfford(c))return toast('Dir fehlt noch etwas Material.');Object.keys(c).forEach(function(k){S.mu.mat[k]-=c[k]});hatch(id)};
ACT.muSurprise=function(){if(!S.mu.free)return;var left=SPEC.filter(function(s){return !S.mu.pets[s.id]});if(!left.length)return;S.mu.free--;hatch(left[Math.floor(Math.random()*left.length)].id)};
ACT.muSel=function(id){S.mu.sel=id;save();rerender()};
ACT.muBuddy=function(id){S.mu.buddy=id;save();rerender();toast(SPEC_BY[id].n[petStage(id)-1]+' begleitet dich jetzt.')};
ACT.muTab=function(t){S.mu.tab=t;save();rerender()};

/* ---- Tagesaufträge (5 bis 10 Minuten) ---- */
var QPOOL=[['throw',3,'Wirf 3 Papierflieger','/hgr','trip'],['fold',1,'Falte einen Flieger fertig','/hgr','trip'],['chal',3,'Löse 3 Aufgaben in „Wie fliegt das?“','/wie'],['round',1,'Spiele eine Runde bei den Kapitäns-Aufträgen','/auf'],['bingo',2,'Entdecke 2 Dinge im Flughafen-Bingo','/auf'],['find',1,'Entdecke ein Wunderwesen','/wes'],['rek',3,'Vergleiche 3 Rekorde im Rekord-Labor','/rek'],['mem',1,'Schreibe eine Erinnerung ins Tagebuch','/tag','in'],['stop',2,'Hake 2 Orte im Stadtplan ab','/stadt','in'],['pack',6,'Hake 6 Sachen auf der Packliste ab','/vor','pre']];
function questsToday(){var d=today(),inTrip=tripDayOf(d)>-1,pre=daysBetween(d,S.trip.depart)>0,pool=QPOOL.filter(function(q){return !q[4]||q[4]==='trip'||(q[4]==='in'&&inTrip)||(q[4]==='pre'&&pre)||(q[4]==='trip')});
 if(!inTrip)pool=pool.filter(function(q){return q[4]!=='in'});
 var h=0;for(var i=0;i<d.length;i++)h=(h*31+d.charCodeAt(i))>>>0;var out=[],used={},step=(h%5)*2+1;for(var j=0;out.length<3&&j<40;j++){var q=pool[(h+j*step)%pool.length];if(used[q[0]])continue;used[q[0]]=1;out.push(q)}
 return out}
function questState(){var D=muDay();return questsToday().map(function(q,i){var n=Math.min(q[1],D.c[q[0]]||0);return{k:q[0],g:q[1],n:n,t:q[2],go:q[3],ok:n>=q[1],claimed:!!D.done[q[0]]}})}
ACT.muClaim=function(k){var D=muDay(),q=questState().filter(function(x){return x.k===k})[0];if(!q||!q.ok||q.claimed)return;D.done[k]=1;S.mu.qdone=(S.mu.qdone||0)+1;
 var got={},n=3;for(var i=0;i<n;i++){var mk=MATS[Math.floor(Math.random()*MATS.length)],a=1+Math.floor(Math.random()*2);got[mk]=(got[mk]||0)+a}
 Object.keys(got).forEach(function(mk){S.mu.mat[mk]=(S.mu.mat[mk]||0)+got[mk];S.mu.life[mk]=(S.mu.life[mk]||0)+got[mk]});
 var all=questState().every(function(x){return x.claimed});if(all&&!D.bonus){D.bonus=1;S.mu.free=(S.mu.free||0)+1}
 muEvo();save();checkRewards&&checkRewards();
 sheet('<div style="text-align:center;padding:6px 10px"><span class="lab">Kiste geöffnet</span><div style="display:flex;gap:12px;justify-content:center;margin:16px 0">'+Object.keys(got).map(function(mk){return '<div style="animation:pop .5s both;display:flex;flex-direction:column;align-items:center;gap:4px">'+matIcon(mk,48)+'<b>+'+got[mk]+'</b><span class="lab">'+MAT[mk].n+'</span></div>'}).join('')+'</div>'+(all?'<p style="font-weight:800;color:#2779A7;margin-bottom:12px">Alle drei Aufträge geschafft! Du bekommst ein Überraschungs-Ei.</p>':'')+'<button class="b p" data-act="closeSheetGo">Super!</button></div>');rerender()};

/* ---- Seite ---- */
ROUTES.freunde=function(){var m=S.mu,tab=m.tab||'dex',own=muOwned().length;
 if(!m.sel||!SPEC_BY[m.sel])m.sel=(muOwned()[0]||SPEC[0]).id;
 var strip=MATS.map(function(k){return '<div class="pn" style="display:flex;align-items:center;gap:8px;padding:6px 12px;flex:1;min-width:0">'+matIcon(k,26)+'<span style="line-height:1.1"><b style="font-size:20px">'+(m.mat[k]||0)+'</b><span class="lab" style="display:block">'+MAT[k].n+'</span></span></div>'}).join('');
 var qs=questState(),open=qs.filter(function(q){return q.ok&&!q.claimed}).length;
 var tabs='<div class="row" style="gap:8px"><button class="chip'+(tab==='dex'?' on':'')+'" data-act="muTab" data-a="dex">Meine Freunde · '+own+'/'+SPEC.length+'</button><button class="chip'+(tab==='quest'?' on':'')+'" data-act="muTab" data-a="quest">Tagesaufträge'+(open?' · '+open+' bereit':'')+'</button><div class="sp"></div>'+(m.free?'<button class="b y s" data-act="muSurprise">Überraschungs-Ei öffnen ('+m.free+')</button>':'')+'</div>';
 var body=tab==='quest'?questHtml(qs):dexHtml();
 return screen(head('MUYA-FREUNDE','Sammelmappe der Freunde','/','<span class="lab" style="text-align:right">'+own+' von '+SPEC.length+'<br>Freunden gefunden</span>'),'<div class="col" style="height:100%;gap:10px"><div class="row" style="gap:8px">'+strip+'</div>'+tabs+'<div style="flex:1;min-height:0">'+body+'</div></div>')};
function dexHtml(){var m=S.mu,sel=SPEC_BY[m.sel],ps=m.pets[sel.id],st=ps?petStage(sel.id):0;
 var cards=SPEC.map(function(sp){var p=m.pets[sp.id],s=p?petStage(sp.id):1,on=sp.id===m.sel;return '<button class="pn" data-act="muSel" data-a="'+sp.id+'" style="padding:6px;display:flex;flex-direction:column;align-items:center;gap:2px;'+(on?'box-shadow:0 0 0 3px #FF6A52;':'')+(p?'':'background:rgba(255,255,255,.5)')+'"><div style="width:100%;aspect-ratio:1;max-height:104px">'+cre(sp,s,!p)+'</div><b style="font-size:13px;white-space:nowrap">'+(p?esc(sp.n[s-1]):'? ? ?')+'</b><span style="display:flex;gap:3px;height:8px">'+[1,2,3].map(function(k){return '<i style="width:8px;height:8px;border-radius:50%;background:'+(p&&s>=k?'#ECD06F':'var(--line)')+'"></i>'}).join('')+'</span></button>'}).join('');
 var g=ps?(m.life[sel.m]||0)-ps.base:0,next=st>=3?null:EVO[st-1],detail;
 if(ps){detail='<div style="width:190px;height:190px;margin:0 auto">'+cre(sel,st)+'</div><h2 class="disp" style="font-size:34px;text-align:center">'+esc(sel.n[st-1])+'</h2><div class="lab" style="text-align:center">Stufe '+st+' von 3 · '+(m.buddy===sel.id?'dein Begleiter':'Freund')+'</div><p class="muted" style="font-size:13.5px;margin:8px 0">'+esc(sel.story)+'</p>'+
  (next?'<div class="row" style="gap:8px">'+matIcon(sel.m,20)+'<div class="bar" style="flex:1"><i style="width:'+Math.min(100,g/next*100)+'%"></i></div><span class="lab">'+g+' / '+next+'</span></div><p class="muted" style="font-size:12px;margin-top:4px">Sammle '+MAT[sel.m].n+' ('+esc(MAT[sel.m].h)+'), dann entwickelt sich '+esc(sel.n[st-1])+'.</p>':'<p style="font-weight:800;color:#2779A7">Voll entwickelt!</p>')+
  '<div class="row" style="gap:6px;margin:8px 0">'+[1,2,3].map(function(k){return '<div style="flex:1;text-align:center"><div style="height:56px">'+cre(sel,k,st<k)+'</div><span class="lab" style="font-size:9.5px">'+(st>=k?esc(sel.n[k-1]):'?')+'</span></div>'}).join('')+'</div>'+
  (m.buddy===sel.id?'':'<button class="b s" data-act="muBuddy" data-a="'+sel.id+'" style="width:100%">Als Begleiter wählen</button>')}
 else{var c=eggCost(sel);detail='<div style="width:170px;height:170px;margin:0 auto">'+cre(sel,1,1)+'</div><h2 class="disp" style="font-size:34px;text-align:center">Unbekannter Freund</h2><p class="muted" style="font-size:13.5px;text-align:center;margin:6px 0 10px">Ein Freund aus der Welt von „'+esc(MAT[sel.m].n)+'“. Bastle ein Ei und schau, wer schlüpft!</p><div style="text-align:center;margin-bottom:10px">'+costHtml(c)+'</div><button class="b '+(canAfford(c)?'p':'')+'" data-act="muCraft" data-a="'+sel.id+'" style="width:100%"'+(canAfford(c)?'':' disabled')+'>Ei basteln</button><p class="muted" style="font-size:12px;margin-top:8px;text-align:center">Material findest du: '+esc(MAT[sel.m].h)+'</p>'}
 return '<div style="display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:12px;height:100%"><div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:8px;min-height:0">'+cards+'</div><div class="pn" style="padding:12px 14px;overflow:auto;min-height:0" data-keep="mudet">'+detail+'</div></div>'}
var QMAT={throw:'papier',fold:'papier',chal:'wolken',round:'kompass',bingo:'kompass',find:'mosaik',stop:'mosaik',mem:'sterne',rek:'sterne',pack:'sterne'};
function questHtml(qs){var D=muDay(),all=qs.every(function(q){return q.claimed});
 var cards=qs.map(function(q){var pct=q.n/q.g*100;return '<div class="pn" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;'+(q.claimed?'background:rgba(177,234,196,.35)':'')+'"><span class="lab">Auftrag</span><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center">'+matIcon(QMAT[q.k],72)+'<b style="font-size:19px;line-height:1.2">'+esc(q.t)+'</b><span class="muted" style="font-size:12.5px">Belohnung: eine Kiste mit 3 Materialien</span></div><div class="row" style="gap:8px"><div class="bar" style="flex:1"><i style="width:'+pct+'%"></i></div><b>'+q.n+'/'+q.g+'</b></div>'+(q.claimed?'<span class="tag" style="background:#B1EAC4;align-self:flex-start">Kiste geöffnet ✓</span>':q.ok?'<button class="b y" data-act="muClaim" data-a="'+q.k+'">Kiste öffnen</button>':'<a class="b s" href="#'+q.go+'">Los geht’s '+arrow()+'</a>')+'</div>'}).join('');
 var how=MATS.map(function(k){return '<div class="row" style="gap:8px">'+matIcon(k,22)+'<span style="font-size:13.5px"><b>'+MAT[k].n+'</b> · '+esc(MAT[k].h)+'</span></div>'}).join('');
 return '<div style="display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:12px;height:100%"><div class="col" style="gap:12px;min-height:0"><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;flex:1;min-height:0">'+cards+'</div><div class="pn" style="padding:10px 16px"><b>Alle drei geschafft?</b> <span class="muted">Dann gibt es heute ein Überraschungs-Ei.</span> '+(D.bonus?'<span class="tag" style="background:#B1EAC4">heute schon bekommen ✓</span>':'')+'</div></div><div class="pn" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px"><span class="lab">So sammelst du Material</span>'+how+'<p class="muted" style="font-size:12.5px;margin-top:auto">Jeder Auftrag dauert nur 5 bis 10 Minuten. Alle zählen mit, ganz ohne Druck. Neue Aufträge gibt es jeden Tag.</p></div></div>'}

function muBuddyChip(){var id=S.mu.buddy,sp=id&&SPEC_BY[id];return '<span style="width:30px;height:30px;display:inline-block">'+(sp?cre(sp,petStage(id)):cre(SPEC[0],1,1))+'</span>'}
