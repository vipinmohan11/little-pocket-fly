/* ===== Start + Vor dem Abflug ===== */
function tripInfo(){var t=S.trip,d=daysBetween(today(),t.depart),back=daysBetween(today(),t.back);
 if(d>1)return{big:d,u:'Tage bis zum Abflug'};if(d===1)return{big:1,u:'Tag bis zum Abflug'};if(d===0)return{big:'HEUTE',u:'ist Abflugtag!'};
 if(back>=0)return{big:'TAG '+(-d+1),u:'der Reise'};return{big:'ZURÜCK',u:'schön war es'}}
function packApplies(w,person){return w==='alle'||w===person||(w==='eltern'&&(person==='papa'||person==='mama'))}
function packFor(person,r){var res=[];
 PACK.forEach(function(c,ci){c.items.forEach(function(i){if(r&&i.r.indexOf(r)<0)return;
  if(person==='haus'){if(i.w!=='haus')return;res.push({cat:ci,key:String(i.id),t:i.t,n:i.n,w:i.w,sh:1});return}
  if(i.w==='haus'||!packApplies(i.w,person))return;
  var sh=!!SHARED_PACK[i.id];res.push({cat:ci,key:sh?String(i.id):i.id+'@'+person,t:i.t,n:i.n,w:i.w,sh:sh,p:person})})});
 S.pack.custom.forEach(function(i){var w=i.who||'alle';
  if(person==='haus'){if(w!=='haus')return;res.push({cat:i.cat,key:'c'+i.id,t:i.t,n:'eigene Sache',w:w,cu:1,sh:1});return}
  if(w==='haus')return;
  if(w==='alle')res.push({cat:i.cat,key:'c'+i.id,t:i.t,n:'eigene Sache',w:w,cu:1,sh:1});
  else if(w===person)res.push({cat:i.cat,key:'c'+i.id,t:i.t,n:'eigene Sache',w:w,cu:1,p:person})});
 return res}
function packItems(person){var p=S.pack,r=p.allRegions?null:p.region;person=person||p.person;
 if(person!=='alle')return packFor(person,r);
 var seen={},res=[];['kind','mama','papa','haus'].forEach(function(x){packFor(x,r).forEach(function(i){if(seen[i.key])return;seen[i.key]=1;res.push(i)})});return res}
function packStats(person){var it=packItems(person||'alle'),d=it.filter(function(i){return S.pack.done[i.key]}).length;return{n:it.length,d:d}}
function dayProgress(i){var dates=tripDates(),d=dates[i];var m=S.mem.filter(function(x){return x.date===d}).length;var c=CITY[i];var v=c?c.stops.filter(function(s){return S.stadt.done[s.id]}).length:0;return Math.min(1,(m*1.5+v)/8)}

ROUTES.home=function(){var ps=packStats('alle'),ti=tripInfo(),n=earnedCount(),rk=rankOf(n);
 var win=WINDOWS.map(function(w,i){var s=winState(w.id),pa=s!=='open';var goal=nextGoals(1,w.id)[0];
  return '<button class="win'+(pa?' paused':'')+'" data-act="openWin" data-a="'+w.id+'" aria-label="'+esc(w.t)+'"><span class="bezel" id="bz-'+w.id+'"><span class="glass" style="--i:'+i+'"><span class="shade" style="--sh:'+(pa?'100%':'34%')+'"></span></span><span class="ic" style="background:'+w.c+'">'+ICON(w.ic)+'</span></span><span class="lb">'+esc(w.t)+'</span><span class="st">'+(pa?(s==='limit'?'Pause':'Rollo zu'):(w.id==='vor'?ps.d+' / '+ps.n+' gepackt':(goal?esc(goal.s.t)+' '+stampProg(goal.s)+'/'+goal.s.of:esc(w.s))))+'</span></button>'}).join('');
 var legs=S.trip.legs.map(function(l){return esc(l.code||l.city)}).join(' → ');
 var dates=tripDates(),td=tripDayOf(today());
 var track=dates.map(function(d,i){var p=dayProgress(i);return '<a href="#/tag/'+d+'" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px"><span style="position:relative;width:40px;height:40px;display:grid;place-items:center">'+ring(p,40,i===td?'#FF6A52':'#49C5B6',5)+'<b style="position:absolute;font-size:14px">'+(i+1)+'</b></span><span class="lab" style="font-size:9.5px;'+(i===td?'color:#FF6A52':'')+'">'+(i===td?'heute':'Tag '+(i+1))+'</span></a>'}).join('');
 var goals=nextGoals(2).map(function(g){return '<div class="row" style="gap:10px"><span style="width:34px;flex:none">'+stampSvg(g.s,false)+'</span><span style="flex:1;min-width:0"><b style="font-size:14px">'+esc(g.s.t)+'</b><span class="muted" style="font-size:12px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(g.s.d)+'</span></span><span class="lab">'+stampProg(g.s)+'/'+g.s.of+'</span></div>'}).join('');
 var pct=rk.next?Math.round((n-RANKS.filter(function(r){return r[1]===rk.name})[0][0])/(rk.next[0]-RANKS.filter(function(r){return r[1]===rk.name})[0][0])*100):100;
 return '<div class="scr"><div class="hd"><div class="t"><span class="lab">'+esc(S.names.mascot)+' ist startklar</span><h1 class="disp" style="font-size:44px">Kofferforscher</h1></div><div class="sp"></div><a class="b" href="#/freunde">'+muBuddyChip()+'Muya-Freunde · '+muOwned().length+'/'+SPEC.length+(questState().some(function(q){return q.ok&&!q.claimed})?' · Kiste bereit':'')+'</a><a class="b" href="#/samm"><span style="width:26px">'+ICON(IC.book)+'</span>Reisepass · '+esc(rk.name)+'</a></div><div class="bd" style="display:flex;flex-direction:column;gap:18px">'+
 '<div class="windows" id="windows">'+win+'</div>'+
 '<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:16px;flex:1;min-height:0;padding-top:10px">'+
 '<div class="dark" style="padding:20px 22px;display:flex;flex-direction:column"><span class="ftab">NÄCHSTER HALT</span><div class="row" style="align-items:flex-start"><div><div class="disp" style="font-size:clamp(38px,5vw,60px)">'+esc(S.trip.name)+'</div><div class="lab" style="margin-top:6px">'+legs+'</div></div><div class="sp"></div><div style="text-align:right"><div class="disp" style="font-size:clamp(40px,5.5vw,68px);color:#ECD06F">'+ti.big+'</div><div class="lab" style="color:#CFE0EA">'+ti.u+'</div></div></div><div class="sp"></div>'+homeStatus()+
 '<div class="row" style="margin-top:14px;flex-wrap:wrap"><a class="b" href="#/stadt" style="background:#fff;border-color:#fff;color:#13324A">'+arrow()+'Unsere Route · Stadtplan</a><a class="b" href="#/eltern" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.3)"><span style="width:20px">'+ICON(IC.gear,'#fff')+'</span>Für Eltern</a></div></div>'+
 '<div class="pn pad" style="display:flex;flex-direction:column;gap:12px"><div class="row"><span class="lab">Reisepass · '+n+' Stempel</span><div class="sp"></div><a class="b s" href="#/samm">Öffnen '+arrow()+'</a></div><div class="row"><b style="font-size:20px">'+esc(rk.name)+'</b><div class="bar" style="flex:1"><i style="width:'+pct+'%"></i></div><span class="muted" style="font-size:12px">'+(rk.next?'noch '+(rk.next[0]-n)+' bis '+rk.next[1]:'höchster Rang')+'</span></div><div class="row" style="gap:4px">'+track+'</div><div style="border-top:1.5px solid var(--line);padding-top:10px" class="col"><span class="lab">Nächste Ziele</span>'+goals+'</div></div></div>'+
 '</div></div>'};
ACT.openWin=function(id){var w=WINDOWS.filter(function(x){return x.id===id})[0],s=winState(id);
 if(s!=='open'){toast(s==='limit'?'Pause: Das Rollo ist heute zu.':'Dieses Fenster ruht gerade. Frag Mama oder Papa.');return}
 var bz=$('#bz-'+id),sh=bz&&$('.shade',bz);if(sh)sh.style.setProperty('--sh','4%');
 var r=bz.getBoundingClientRect(),cx=innerWidth/2-(r.left+r.width/2),cy=innerHeight/2-(r.top+r.height/2),sc=Math.max(innerWidth/r.width,innerHeight/r.height)*1.4;
 bz.style.zIndex=50;bz.style.transform='translate('+cx+'px,'+cy+'px) scale('+sc+')';
 var z=document.createElement('div');z.className='zoomer';z.style.background=w.c;document.body.appendChild(z);setTimeout(function(){z.classList.add('on')},350);
 setTimeout(function(){location.hash='#/'+id;setTimeout(function(){z.style.opacity=0;setTimeout(function(){z.remove()},350)},60)},850)};

/* ---------- Vor dem Abflug ---------- */
var PERSON=[['kind','Kind','K','#49C5B6'],['mama','Mama','M','#FFB288'],['papa','Papa','P','#B5D5FF'],['haus','Wohnung','H','#ECD06F'],['alle','Alle','★','#B1EAC4']];
var CATCOL=['#ECD06F','#49C5B6','#FF6A52','#B5D5FF','#B1EAC4','#FFB288','#2779A7','#9ACDEB'];
var PNAME={kind:'Kind',mama:'Mama',papa:'Papa'};var WHO={alle:'alle',kind:'Kind',eltern:'Eltern',papa:'Papa',mama:'Mama',haus:'Haus'};
ROUTES.vor=function(a){var sub=a[0]||'liste';var ps=packStats('alle');
 var tabs=seg([['liste','Packliste'],['brief','Briefing'],['vorher','Vorhersagen']],sub,'vorTab');
 var body=sub==='brief'?briefHtml():sub==='vorher'?vorherHtml():listHtml();
 return screen(head('VOR DEM ABFLUG · '+esc(S.trip.name).toUpperCase(),'Vor dem Abflug','/',tabs+'<span style="width:12px"></span><span style="position:relative;display:grid;place-items:center">'+ring(ps.n?ps.d/ps.n:0,46,'#49C5B6',6)+'<b style="position:absolute;font-size:12px">'+(ps.n?Math.round(ps.d/ps.n*100):0)+'%</b></span>'),body,sub==='liste'?'free':'')};
ACT.vorTab=function(t){location.hash='#/vor/'+t};
function listHtml(){var p=S.pack;var it=packItems();
 var people=PERSON.map(function(x){var st=packStats(x[0]);var on=p.person===x[0];return '<button class="tl'+(on?' on':'')+'" data-act="packWho" data-a="'+x[0]+'" style="flex-direction:row;align-items:center;gap:10px;padding:8px 14px 8px 8px;min-width:132px"><span style="position:relative;display:grid;place-items:center">'+ring(st.n?st.d/st.n:0,42,on?'#ECD06F':x[3],5)+'<b style="position:absolute;font-size:15px">'+x[2]+'</b></span><span><b style="font-size:16px">'+x[1]+'</b><span class="lab" style="display:block">'+st.d+' / '+st.n+'</span></span></button>'}).join('');
 var groups=PACK.map(function(c,ci){var g=it.filter(function(i){return i.cat===ci});if(!g.length)return '';var d=g.filter(function(i){return p.done[i.key]}).length;var full=d===g.length;var open=!full||S.pack['o'+ci];
  return '<section style="break-inside:avoid;margin:0 0 14px;padding:12px 12px 8px;border-radius:18px;background:'+(full?'rgba(177,234,196,.35)':'var(--paper)')+';border:1.5px solid '+(full?'#9FDDB5':'var(--line)')+'"><button class="row" data-act="packFold" data-a="'+ci+'" style="width:100%;padding:0 4px 6px"><span style="width:12px;height:12px;border-radius:4px;background:'+CATCOL[ci]+'"></span><b style="font-size:16px">'+c.name+'</b><div class="sp"></div>'+(full?'<span class="tag" style="background:#49C5B6">fertig ✓</span>':'<span class="lab">'+d+'/'+g.length+'</span>')+'</button>'+
  (open?'<div class="bar" style="height:5px;margin:0 4px 6px"><i style="width:'+(d/g.length*100)+'%;background:'+CATCOL[ci]+'"></i></div>'+g.map(function(i){var on=p.done[i.key];return '<button class="ck'+(on?' on':'')+'" data-act="packTick" data-a="'+i.key+'"><span class="bx">'+(on?CHECK:'')+'</span><span class="tx">'+esc(i.t)+(i.n?'<small>'+esc(i.n)+'</small>':'')+'</span>'+(p.person==='alle'?'<span class="tag">'+(i.sh?'gemeinsam':(PNAME[i.p]||''))+'</span>':(i.sh&&p.person!=='haus'?'<span class="tag">gemeinsam</span>':''))+'</button>'}).join(''):'')+'</section>'}).join('');
 var rn={DE:'Deutschland',EU:'EU',NonEU:'Nicht-EU',IN:'Indien',US:'USA',AF:'Afrika'};
 return '<div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:14px">'+people+'<div class="sp"></div><button class="chip'+(p.allRegions?' on':'')+'" data-act="packAll" title="Packliste nach Reiseziel">Ziel: '+(p.allRegions?'alle Regionen':rn[p.region])+'</button><button class="b s y" data-act="packAdd">+ Eigene Sache</button><button class="b s" data-act="packReset">Leeren</button></div>'+
 '<div style="columns:4 250px;column-gap:14px">'+(groups||'<p class="muted">Für diese Person gibt es hier nichts zu packen.</p>')+'</div>'}
ACT.packWho=function(w){S.pack.person=w;save();rerender()};
ACT.packFold=function(ci){S.pack['o'+ci]=!S.pack['o'+ci];save();rerender()};
ACT.packTick=function(k,el){var on=!S.pack.done[k];if(on){S.pack.done[k]=1;ev('pack')}else delete S.pack.done[k];save();
 /* update in place so the tick animation is visible, then refresh counters */
 el.classList.toggle('on',on);$('.bx',el).innerHTML=on?CHECK:'';setTimeout(rerender,on?380:0)};
ACT.packAll=function(){S.pack.allRegions=!S.pack.allRegions;save();rerender()};
ACT.packReset=function(){sheet('<h2 class="disp" style="font-size:32px">Alle Häkchen löschen?</h2><p class="muted" style="margin:10px 0 16px">Die Packliste ist dann bereit für die nächste Reise. Eigene Sachen und Stempel bleiben.</p><div class="row"><button class="b p" data-act="packResetGo">Ja, leeren</button><button class="b" data-act="closeSheet">Abbrechen</button></div>')};
ACT.packResetGo=function(){S.pack.done={};save();closeSheet();rerender()};
var NEWI={cat:0,who:'kind'};
ACT.packAdd=function(){NEWI.who=S.pack.person==='alle'?'alle':S.pack.person;NEWI.cat=0;drawAdd()};
function drawAdd(){var v=$('#ni')?$('#ni').value:'';sheet('<h2 class="disp" style="font-size:30px">Eigene Sache</h2><input id="ni" class="inp" style="margin:12px 0" placeholder="Was kommt mit?" maxlength="50" value="'+esc(v)+'"><div class="lab">Wohin?</div><div class="wrap" style="margin:6px 0 12px">'+PACK.map(function(c,i){return '<button class="chip'+(NEWI.cat===i?' on':'')+'" data-act="addCat" data-a="'+i+'">'+c.name+'</button>'}).join('')+'</div><div class="lab">Für wen?</div><div class="wrap" style="margin:6px 0 16px">'+PERSON.map(function(x){return '<button class="chip'+(NEWI.who===x[0]?' on':'')+'" data-act="addWho" data-a="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div><button class="b p" data-act="packAddGo">Hinzufügen</button>');setTimeout(function(){var i=$('#ni');if(i&&!v)i.focus()},50)}
ACT.addCat=function(i){NEWI.cat=+i;drawAdd()};ACT.addWho=function(w){NEWI.who=w;drawAdd()};
ACT.packAddGo=function(){var t=$('#ni').value.trim();if(!t)return;S.pack.custom.push({id:Date.now(),t:t,cat:NEWI.cat,who:NEWI.who});save();closeSheet();rerender()};

function briefHtml(){var i=Math.min(BRIEFING.length-1,S.brief.step||0),b=BRIEFING[i];
 var nodes=BRIEFING.map(function(x,j){var all=x[4].every(function(_,k){return S.brief.done[j+'-'+k]});var on=j===i;return '<button data-act="briefGo" data-a="'+j+'" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:1"><span style="width:'+(on?62:50)+'px;height:'+(on?62:50)+'px;border-radius:50%;display:grid;place-items:center;background:'+(on?'#13324A':all?'#49C5B6':'#FFFDF8')+';border:2px solid '+(on||all?'transparent':'var(--line)')+';transition:all .25s"><span style="width:'+(on?28:22)+'px">'+ICON(x[2],on?'#fff':'#13324A')+'</span></span><b style="font-size:13px">'+x[0]+'</b><span class="lab" style="font-size:9.5px">'+x[1]+'</span></button>'}).join('');
 var cps=b[4].map(function(x,k){var on=S.brief.done[i+'-'+k];return '<button class="ck'+(on?' on':'')+'" style="border:1.5px solid var(--line);background:#fff;padding:10px 12px" data-act="briefTick" data-a="'+i+'-'+k+'"><span class="bx">'+(on?CHECK:'')+'</span><span class="tx">'+esc(x)+'</span></button>'}).join('');
 return '<div style="display:flex;flex-direction:column;height:100%;gap:18px"><div style="position:relative;display:flex;padding:8px 0"><div style="position:absolute;left:6%;right:6%;top:36px;height:3px;background:repeating-linear-gradient(90deg,var(--ink3) 0 8px,transparent 8px 14px)"></div>'+nodes+'</div>'+
 '<div class="pn" style="flex:1;min-height:0;display:grid;grid-template-columns:1.2fr 1fr;gap:24px;padding:24px 28px"><div class="col" style="gap:12px"><span class="lab">Schritt '+(i+1)+' von '+BRIEFING.length+'</span><h2 class="disp" style="font-size:46px">'+esc(b[0])+'</h2><p style="font-size:19px;line-height:1.5">'+esc(b[3])+'</p><div class="sp" style="display:grid;place-items:center"><span style="width:120px;opacity:.18">'+ICON(b[2],'#13324A',1.5)+'</span></div><div class="row"><button class="b" data-act="briefGo" data-a="'+Math.max(0,i-1)+'"'+(i===0?' disabled':'')+'>Zurück</button><button class="b p" data-act="briefGo" data-a="'+Math.min(BRIEFING.length-1,i+1)+'"'+(i===BRIEFING.length-1?' disabled':'')+'>Nächster Schritt '+arrow('#fff')+'</button></div></div><div class="col" style="justify-content:center"><span class="lab">Das kannst du abhaken</span>'+cps+'</div></div></div>'}
ACT.briefGo=function(j){S.brief.step=+j;save();rerender()};
ACT.briefTick=function(k){S.brief.done[k]=!S.brief.done[k];if(!S.brief.done[k])delete S.brief.done[k];save();rerender()};

function predOpen(){return daysBetween(S.trip.depart,today())>=0}
function vorherHtml(){var open=predOpen();var hits=VORHER2.filter(function(v){var p=S.pred2[v.id];if(!p||p.p==null)return false;var ans=v.a!=null?v.a:p.r;return ans!=null&&ans===p.p}).length;
 var cards=VORHER2.map(function(v){var p=S.pred2[v.id]||{};var tipped=p.p!=null;var ans=v.a!=null?v.a:p.r;var reveal=open&&tipped&&(v.a!=null||p.r!=null);
  var opts=v.o.map(function(o,k){var cls='';if(reveal){cls=k===ans?' ok':(k===p.p?' no':' dim')}else if(tipped)cls=k===p.p?' on':' dim';
   return '<button class="chip'+cls.replace(' ok','').replace(' no','')+'" style="'+(reveal&&k===ans?'background:#B1EAC4;border-color:#7FD39E':reveal&&k===p.p?'background:#FFD5CC':'')+(cls.indexOf('dim')>-1?';opacity:.45':'')+'" data-act="predTap" data-a="'+v.id+'|'+k+'">'+esc(o)+'</button>'}).join('');
  var foot=!tipped?'<span class="muted" style="font-size:13px">Tippe deinen Tipp.</span>':(!open?'<span class="tag" style="background:#ECD06F">versiegelt bis zum Abflug</span>':(v.a==null&&p.r==null?'<span class="lab">Was war es wirklich?</span><div class="wrap">'+v.o.map(function(o,k){return '<button class="chip" data-act="predReal" data-a="'+v.id+'|'+k+'">'+esc(o)+'</button>'}).join('')+'</div>':'<b style="font-size:14px">'+(ans===p.p?'Volltreffer! ':'Knapp daneben. ')+'</b><span class="muted" style="font-size:13px">'+esc(v.w)+'</span>'));
  return '<div class="pn pad col" style="gap:8px"><b style="font-size:17px">'+esc(v.q)+'</b><div class="wrap">'+opts+'</div><div class="sp"></div>'+foot+'</div>'}).join('');
 return '<div class="row" style="margin-bottom:12px"><p class="muted">Gib jetzt deine Tipps ab. Sie werden versiegelt und am Abflugtag aufgelöst.</p><div class="sp"></div><span class="tag" style="background:#B1EAC4">'+hits+' Volltreffer</span></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">'+cards+'</div>'}
ACT.predTap=function(v){var x=v.split('|'),p=S.pred2[x[0]]||{};if(p.p!=null&&predOpen())return;p.p=+x[1];S.pred2[x[0]]=p;save();rerender()};
ACT.predReal=function(v){var x=v.split('|');S.pred2[x[0]].r=+x[1];save();rerender()};

function homeStatus(){var td=tripDayOf(today());function bar(l,v,of,h){var p=of?v/of:0;return '<a href="'+h+'" class="row" style="gap:10px;padding:5px 0"><span style="width:150px;font-size:14px;font-weight:700">'+l+'</span><div class="bar" style="flex:1;background:rgba(255,255,255,.14)"><i style="width:'+(p*100)+'%;background:'+(p>=1?'#49C5B6':'#ECD06F')+'"></i></div><span class="lab" style="color:#CFE0EA;width:56px;text-align:right">'+v+'/'+of+'</span></a>'}
 if(td>-1&&CITY[td]){var d=CITY[td],v=d.stops.filter(function(s){return S.stadt.done[s.id]}).length,m=memsOn(today()).length;
  return '<div style="margin-top:14px"><span class="lab">Heute · Tag '+(td+1)+'</span><div style="font-size:19px;font-weight:800;margin:4px 0 6px">'+esc(d.title)+'</div>'+bar('Orte besucht',v,d.stops.length,'#/stadt')+bar('Erinnerungen',Math.min(3,m),3,'#/tag')+bar('Such-Liste',d.spot.filter(function(_,k){return S.wes.spot[d.id+'-'+k]}).length,d.spot.length,'#/stadt')+'</div>'}
 var ps=packStats('alle'),bd=Object.keys(S.brief.done).length,bt=BRIEFING.reduce(function(a,b){return a+b[4].length},0),pr=Object.keys(S.pred2).filter(function(k){return S.pred2[k].p!=null}).length;
 return '<div style="margin-top:14px"><span class="lab">Startklar?</span>'+bar('Packliste',ps.d,ps.n,'#/vor')+bar('Briefing',bd,bt,'#/vor/brief')+bar('Vorhersagen',pr,VORHER2.length,'#/vor/vorher')+'</div>'}
