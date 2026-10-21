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
function packStats(person){var it=packItems(person||'alle').filter(function(i){return !S.pack.na[i.key]}),d=it.filter(function(i){return S.pack.done[i.key]}).length;return{n:it.length,d:d}}
function dayProgress(i){var dates=tripDates(),d=dates[i];var m=S.mem.filter(function(x){return x.date===d}).length;var c=CT(i);var v=c?c.stops.filter(function(s){return S.stadt.done[s.id]}).length:0;return Math.min(1,(m*1.5+v)/8)}

/* ---------- Vor dem Abflug ---------- */
var PERSON=[['kind','Kind','K','#49C5B6'],['mama','Mama','M','#FFB288'],['papa','Papa','P','#B5D5FF'],['haus','Wohnung','H','#ECD06F'],['alle','Alle','★','#B1EAC4']];
var CATCOL=['#ECD06F','#49C5B6','#FF6A52','#B5D5FF','#B1EAC4','#FFB288','#2779A7','#9ACDEB'];
var PNAME={kind:'Kind',mama:'Mama',papa:'Papa'};var WHO={alle:'alle',kind:'Kind',eltern:'Eltern',papa:'Papa',mama:'Mama',haus:'Haus'};
ROUTES.vor=function(a){var sub=a[0]||'liste';var ps=packStats('alle');
 var tabs=seg([['liste','Packliste'],['brief','Briefing'],['vorher','Vorhersagen']],sub,'vorTab');
 var body=sub==='brief'?briefHtml():sub==='vorher'?vorherHtml():listHtml();
 return screen(head('VOR DEM ABFLUG · '+esc(S.trip.name).toUpperCase(),'Vor dem Abflug','/',tabs+'<span style="width:12px"></span><span style="position:relative;display:grid;place-items:center">'+ring(ps.n?ps.d/ps.n:0,46,'#49C5B6',6)+'<b style="position:absolute;font-size:14px">'+(ps.n?Math.round(ps.d/ps.n*100):0)+'%</b></span>'),body,'')};
ACT.vorTab=function(t){location.hash='#/vor/'+t};
function listHtml(){var p=S.pack;var it=packItems();
 var people=PERSON.map(function(x){var st=packStats(x[0]);var on=p.person===x[0];return '<button class="tl'+(on?' on':'')+'" data-act="packWho" data-a="'+x[0]+'" style="flex-direction:row;align-items:center;gap:10px;padding:8px 14px 8px 8px;min-width:110px;padding:4px 10px 4px 6px"><span style="position:relative;display:grid;place-items:center">'+ring(st.n?st.d/st.n:0,42,on?'#ECD06F':x[3],5)+'<b style="position:absolute;font-size:17px">'+x[2]+'</b></span><span><b style="font-size:18px">'+x[1]+'</b><span class="lab" style="display:block">'+st.d+' / '+st.n+'</span></span></button>'}).join('');
 var rn={DE:'Deutschland',EU:'EU',NonEU:'Nicht-EU',IN:'Indien',US:'USA',AF:'Afrika'};
 var cats=PACK.map(function(c,ci){var g=it.filter(function(x){return x.cat===ci});if(!g.length)return null;var ga=g.filter(function(x){return !p.na[x.key]}),d=ga.filter(function(x){return p.done[x.key]}).length;return{ci:ci,name:c.name,g:g,n:ga.length,d:d}}).filter(Boolean);
 if(!cats.length)return '<div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:10px">'+people+'</div><p class="muted">Für diese Person gibt es hier nichts zu packen.</p>';
 var cur=cats.filter(function(c){return c.ci===p.cat})[0]||cats[0];
 var chips='<div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:10px">'+cats.map(function(c){var full=c.n>0&&c.d===c.n;return '<button class="chip s'+(c.ci===cur.ci?' on':'')+'" data-act="packCat" data-a="'+c.ci+'"><i style="width:9px;height:9px;border-radius:3px;background:'+CATCOL[c.ci]+';display:inline-block;margin-right:6px"></i>'+c.name+' · '+(full?'✓':c.d+'/'+c.n)+'</button>'}).join('')+'</div>';
 var avW=Math.max(300,innerWidth-130-36),cols=Math.max(1,Math.min(4,Math.floor(avW/290))),rows=Math.max(2,Math.floor((innerHeight-(innerHeight<600?340:300))/46)),per=cols*rows,pages=Math.max(1,Math.ceil(cur.g.length/per)),pg=Math.min(S.pack.pg||0,pages-1);
 var items=cur.g.slice(pg*per,(pg+1)*per).map(function(i){var on=p.done[i.key],na=p.na[i.key];return '<div style="display:flex;gap:4px;align-items:stretch'+(na?';opacity:.45':'')+'"><button class="ck'+(on?' on':'')+'" style="flex:1;min-width:0;background:#fff;border:1px solid var(--line)'+(na?';text-decoration:line-through':'')+'" data-act="'+(na?'packNa':'packTick')+'" data-a="'+i.key+'"><span class="bx">'+(on?CHECK:'')+'</span><span class="tx">'+esc(i.t)+(i.n?'<small>'+esc(i.n)+'</small>':'')+'</span>'+(p.person==='alle'?'<span class="tag">'+(i.sh?'gemeinsam':(PNAME[i.p]||''))+'</span>':(i.sh&&p.person!=='haus'?'<span class="tag">gemeinsam</span>':''))+'</button><button data-act="packNa" data-a="'+i.key+'" title="'+(na?'Wieder nötig':'Nicht nötig')+'" aria-label="'+(na?'Wieder nötig':'Nicht nötig')+'" style="width:40px;flex:none;border-radius:12px;border:1px solid var(--line);background:#fff;font-size:13px;font-weight:800;color:var(--ink2)">'+(na?'↺':'∅')+'</button></div>'}).join('');
 var pager=pages>1?'<div class="row" style="justify-content:center;gap:10px;margin-top:8px"><button class="b s" data-act="packPg" data-a="'+(pg-1)+'"'+(pg?'':' disabled')+'>‹ Zurück</button><span class="lab">Seite '+(pg+1)+' von '+pages+'</span><button class="b s" data-act="packPg" data-a="'+(pg+1)+'"'+(pg<pages-1?'':' disabled')+'>Weiter ›</button></div>':'';
 return '<div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:10px">'+people+'<div class="sp"></div><button class="chip s'+(p.allRegions?' on':'')+'" data-act="packAll" title="Packliste nach Reiseziel">Ziel: '+(p.allRegions?'alle Regionen':rn[p.region])+'</button><button class="b s y" data-act="packAdd">+ Eigene Sache</button><button class="b s" data-act="packReset">Leeren</button></div>'+chips+
 '<div class="pn" style="padding:10px"><div style="display:grid;grid-template-columns:repeat('+cols+',minmax(0,1fr));gap:6px 10px">'+items+'</div>'+pager+'</div>'}
ACT.packCat=function(c){S.pack.cat=+c;S.pack.pg=0;save();rerender()};
ACT.packPg=function(n){S.pack.pg=Math.max(0,+n);save();rerender()};
ACT.packNa=function(k){if(S.pack.na[k])delete S.pack.na[k];else{S.pack.na[k]=1;delete S.pack.done[k]}save();rerender()};
ACT.packWho=function(w){S.pack.person=w;S.pack.pg=0;save();rerender()};
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
 var nodes=BRIEFING.map(function(x,j){var all=x[4].every(function(_,k){return S.brief.done[j+'-'+k]});var on=j===i;return '<button data-act="briefGo" data-a="'+j+'" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:1"><span style="width:'+(on?62:50)+'px;height:'+(on?62:50)+'px;border-radius:50%;display:grid;place-items:center;background:'+(on?'#13324A':all?'#49C5B6':'#FFFDF8')+';border:2px solid '+(on||all?'transparent':'var(--line)')+';transition:all .25s"><span style="width:'+(on?28:22)+'px">'+ICON(x[2],on?'#fff':'#13324A')+'</span></span><b style="font-size:15px">'+x[0]+'</b><span class="lab" style="font-size:13px">'+x[1]+'</span></button>'}).join('');
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
  var foot=!tipped?'<span class="muted" style="font-size:15px">Tippe deinen Tipp.</span>':(!open?'<span class="tag" style="background:#ECD06F">versiegelt bis zum Abflug</span>':(v.a==null&&p.r==null?'<span class="lab">Was war es wirklich?</span><div class="wrap">'+v.o.map(function(o,k){return '<button class="chip" data-act="predReal" data-a="'+v.id+'|'+k+'">'+esc(o)+'</button>'}).join('')+'</div>':'<b style="font-size:16px">'+(ans===p.p?'Volltreffer! ':'Knapp daneben. ')+'</b><span class="muted" style="font-size:15px">'+esc(v.w)+'</span>'));
  return '<div class="pn pad col" style="gap:8px"><b style="font-size:17px">'+esc(v.q)+'</b><div class="wrap">'+opts+'</div><div class="sp"></div>'+foot+'</div>'}).join('');
 return '<div class="row" style="margin-bottom:12px"><p class="muted">Gib jetzt deine Tipps ab. Sie werden versiegelt und am Abflugtag aufgelöst.</p><div class="sp"></div><span class="tag" style="background:#B1EAC4">'+hits+' Volltreffer</span></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">'+cards+'</div>'}
ACT.predTap=function(v){var x=v.split('|'),p=S.pred2[x[0]]||{};if(p.p!=null&&predOpen())return;p.p=+x[1];S.pred2[x[0]]=p;save();rerender()};
ACT.predReal=function(v){var x=v.split('|');S.pred2[x[0]].r=+x[1];save();rerender()};

function homeStatus(){var td=tripDayOf(today());function bar(l,v,of,h){var p=of?v/of:0;return '<a href="'+h+'" class="row" style="gap:10px;padding:5px 0"><span style="width:150px;font-size:16px;font-weight:700">'+l+'</span><div class="bar" style="flex:1;background:rgba(255,255,255,.14)"><i style="width:'+(p*100)+'%;background:'+(p>=1?'#49C5B6':'#ECD06F')+'"></i></div><span class="lab" style="color:#CFE0EA;width:56px;text-align:right">'+v+'/'+of+'</span></a>'}
 if(td>-1&&CT(td)){var d=CT(td),v=d.stops.filter(function(s){return S.stadt.done[s.id]}).length,m=memsOn(today()).length;
  return '<div class="hm-stat" style="margin-top:14px"><span class="lab">Heute · Tag '+(td+1)+'</span><div style="font-size:19px;font-weight:800;margin:4px 0 6px">'+esc(d.title)+'</div>'+bar('Orte besucht',v,stopsAct(d).length,'#/stadt')+bar('Erinnerungen',Math.min(3,m),3,'#/tag')+bar('Such-Liste',d.spot.filter(function(_,k){return S.wes.spot[d.id+'-'+k]}).length,d.spot.length,'#/stadt')+'</div>'}
 var ps=packStats('alle'),bd=Object.keys(S.brief.done).length,bt=BRIEFING.reduce(function(a,b){return a+b[4].length},0),pr=Object.keys(S.pred2).filter(function(k){return S.pred2[k].p!=null}).length;
 return '<div class="hm-stat" style="margin-top:14px"><span class="lab">Startklar?</span>'+bar('Packliste',ps.d,ps.n,'#/vor')+bar('Briefing',bd,bt,'#/vor/brief')+bar('Vorhersagen',pr,VORHER2.length,'#/vor/vorher')+'</div>'}
