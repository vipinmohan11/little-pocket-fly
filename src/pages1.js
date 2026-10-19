/* ===== Home, Packliste/Briefing, Stadtplan ===== */
function tripInfo(){var t=S.trip,d=daysBetween(today(),t.depart),back=daysBetween(today(),t.back);
 if(d>1)return{big:d,u:'Tage bis zum Abflug'};if(d===1)return{big:1,u:'Tag bis zum Abflug'};if(d===0)return{big:'HEUTE',u:'ist Abflugtag!'};
 if(back>=0)return{big:'TAG '+(-d+1),u:'der Reise'};return{big:'ZURÜCK',u:'schön war es'}}
function packStats(){var r=S.pack.allRegions?null:S.pack.region,n=0,d=0;
 PACK.forEach(function(c){c.items.forEach(function(i){if(!r||i.r.indexOf(r)>-1){n++;if(S.pack.done[i.id])d++}})});
 S.pack.custom.forEach(function(i){n++;if(S.pack.done['c'+i.id])d++});return{n:n,d:d}}

ROUTES.home=function(){var st=tripInfo(),ps=packStats(),ts=tripInfo();
 var win=WINDOWS.map(function(w,i){var s=winState(w.id),pa=s!=='open';
  return '<button class="win'+(pa?' paused':'')+'" data-act="openWin" data-a="'+w.id+'" aria-label="'+esc(w.t)+'"><span class="bezel" id="bz-'+w.id+'"><span class="glass" style="--i:'+i+'"><span class="shade" style="--sh:'+(pa?'100%':'34%')+'"></span></span><span class="ic" style="background:'+w.c+'">'+ICON(w.ic)+'</span></span><span class="lb">'+esc(w.t)+'</span><span class="st">'+(pa?(s==='limit'?'Pause':'Rollo zu'):(w.id==='vor'?ps.d+' / '+ps.n+' gepackt':esc(w.s)))+'</span></button>'}).join('');
 var legs=S.trip.legs.map(function(l){return esc(l.code||l.city)}).join(' → ');
 return '<div class="top"><div><div class="mono">'+esc(S.names.mascot)+' ist startklar</div><h1 class="disp" style="font-size:clamp(34px,5vw,56px)">Kofferforscher</h1></div><div class="sp"></div><a class="pill l" href="#/samm"><i>'+ICON('M5 4h12a2 2 0 012 2v14H7a2 2 0 01-2-2V4z')+'</i>Entdecker-Buch</a></div>'+
 '<div class="windows" id="windows">'+win+'</div>'+
 '<div class="dark" style="margin-top:34px"><span class="tab">NÄCHSTER HALT</span><div class="row" style="flex-wrap:wrap;gap:22px">'+
 '<div><div class="disp" style="font-size:clamp(38px,5.5vw,64px)">'+esc(S.trip.name)+'</div><div class="mono" style="color:#B1EAC4;margin-top:6px">'+legs+'</div></div><div class="sp"></div>'+
 '<div style="text-align:right"><div class="disp" style="font-size:clamp(44px,6vw,76px);color:#ECD06F">'+ts.big+'</div><div class="mono" style="color:#CFE0EA">'+ts.u+'</div></div></div>'+
 '<div class="wrap" style="margin-top:16px"><a class="pill" href="#/stadt" style="background:#fff;color:#13324A"><i>'+arrow()+'</i>Unsere Route · Stadtplan</a><a class="pill" href="#/eltern" style="background:rgba(255,255,255,.14)"><i style="background:#49C5B6">'+ICON('M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 00-1.7-1L14.5 3h-4l-.4 3.1a7 7 0 00-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 000 2l-2 1.5 2 3.4 2.3-1a7 7 0 001.7 1l.4 3.1h4l.4-3.1a7 7 0 001.7-1l2.3 1 2-3.4-2-1.5a7 7 0 00.1-1z')+'</i>Für Eltern</a></div></div>'+
 '<p class="muted" style="text-align:center;margin-top:18px;font-size:13px">Tippe auf ein Fenster. Ist das Rollo ganz zu, haben Mama und Papa eine Pause eingelegt.</p>'};
ACT.openWin=function(id){var w=WINDOWS.filter(function(x){return x.id===id})[0],s=winState(id);
 if(s!=='open'){toast(s==='limit'?'Pause: Das Rollo ist heute zu.':'Dieses Fenster ruht gerade. Frag Mama oder Papa.');return}
 var bz=$('#bz-'+id),sh=bz&&$('.shade',bz);if(sh)sh.style.setProperty('--sh','4%');
 var r=bz.getBoundingClientRect(),cx=innerWidth/2-(r.left+r.width/2),cy=innerHeight/2-(r.top+r.height/2),sc=Math.max(innerWidth/r.width,innerHeight/r.height)*1.4;
 bz.style.position='relative';bz.style.zIndex=50;bz.style.transform='translate('+cx+'px,'+cy+'px) scale('+sc+')';
 var z=document.createElement('div');z.className='zoomer';z.style.background=w.c;document.body.appendChild(z);setTimeout(function(){z.classList.add('on')},350);
 setTimeout(function(){location.hash='#/'+id;setTimeout(function(){z.style.opacity=0;setTimeout(function(){z.remove()},350)},60)},850)};

/* ---------- Vor dem Abflug ---------- */
var PERSON=[['alle','Alle'],['papa','Papa'],['mama','Mama'],['kind','Kind'],['haus','Haus']];
var CATCOL=['#ECD06F','#49C5B6','#FF6A52','#B5D5FF','#B1EAC4','#FFB288','#2779A7','#9ACDEB'];
function visibleItems(ci){var p=S.pack,res=[];var r=p.allRegions?null:p.region;
 var c=PACK[ci];c.items.forEach(function(i){if(r&&i.r.indexOf(r)<0)return;
  if(p.person!=='alle'){var ok=i.w==='alle'||(i.w==='eltern'&&(p.person==='papa'||p.person==='mama'))||i.w===p.person;if(!ok)return}
  res.push({id:i.id,key:i.id,t:i.t,n:i.n,w:i.w})});
 p.custom.forEach(function(i){if(i.cat===ci)res.push({id:i.id,key:'c'+i.id,t:i.t,n:'eigene Sache',w:i.who||'alle',cu:1})});return res}
ROUTES.vor=function(a){var sub=a[0]||'liste';var seg=[['liste','Packliste'],['brief','Briefing'],['vorher','Vorhersagen']].map(function(x){return '<a class="chip'+(sub===x[0]?' on':'')+'" href="#/vor/'+x[0]+'">'+x[1]+'</a>'}).join('');
 var ps=packStats();var body=sub==='brief'?briefHtml():sub==='vorher'?vorherHtml():listHtml();
 return topbar('VOR DEM ABFLUG · '+esc(S.trip.name).toUpperCase(),'Packliste als Album','/','<div class="mono" style="text-align:right">'+ps.d+' / '+ps.n+'<br>gepackt</div>')+'<div class="chips" style="margin-bottom:16px">'+seg+'</div>'+body};
function listHtml(){var p=S.pack,ci=p.cat;var tabs=PACK.map(function(c,i){var v=visibleItems(i),d=v.filter(function(x){return p.done[x.key]}).length;
  return '<button class="ctab'+(i===ci?' on':'')+'" style="--c:'+CATCOL[i]+'" data-act="packCat" data-a="'+i+'"><span>'+c.name+'</span><small>'+d+'/'+v.length+'</small></button>'}).join('');
 var items=visibleItems(ci).map(function(i){var d=p.done[i.key];
  return '<button class="item'+(d?' done':'')+'" data-act="packTick" data-a="'+i.key+'"><span class="bx">'+(d?'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#13324A" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':'')+'</span><span class="tx">'+esc(i.t)+(i.n?'<small>'+esc(i.n)+'</small>':'')+'</span><span class="who">'+({alle:'Alle',kind:'Kind',eltern:'Eltern',papa:'Papa',mama:'Mama',haus:'Haus'}[i.w]||i.w)+'</span></button>'}).join('');
 var ps=packStats();var pct=ps.n?Math.round(ps.d/ps.n*100):0;
 var reg=['DE','EU','NonEU','IN','US','AF'];var rn={DE:'Deutschland',EU:'EU',NonEU:'Nicht-EU',IN:'Indien',US:'USA',AF:'Afrika'};
 return '<div class="card" style="margin-bottom:16px"><div class="row" style="flex-wrap:wrap;gap:14px"><div style="flex:1;min-width:200px"><div class="mono">Familie · eine gemeinsame Liste</div><div class="bar" style="margin:8px 0 6px"><i style="width:'+pct+'%"></i></div><b>'+pct+' % gepackt</b> <span class="muted">· '+(p.allRegions?'alle Reiseziele':'Ziel: '+rn[p.region])+'</span></div>'+
 '<div class="chips">'+PERSON.map(function(x){return '<button class="chip'+(p.person===x[0]?' on':'')+'" data-act="packWho" data-a="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'+
 '<div class="row" style="margin-top:12px;flex-wrap:wrap"><span class="mono">Region</span><select class="inp" style="width:auto;height:44px" data-ch="packReg">'+reg.map(function(r){return '<option value="'+r+'"'+(p.region===r?' selected':'')+'>'+rn[r]+'</option>'}).join('')+'</select><button class="chip'+(p.allRegions?' on':'')+'" data-act="packAll">Alle Regionen zeigen</button></div></div>'+
 '<div class="album"><div class="tabs">'+tabs+'</div><div class="paper"><div class="row" style="padding:6px 0"><h2 class="disp" style="font-size:34px;border-bottom:5px solid '+CATCOL[ci]+'">'+PACK[ci].name+'</h2><div class="sp"></div><button class="btn s" data-act="packAdd">+ Eigene Sache</button></div>'+(items||'<p class="muted" style="padding:20px 0">Hier ist nichts zu packen. Wechsle Person oder Region.</p>')+'</div></div>'+
 '<div class="row" style="margin-top:16px;flex-wrap:wrap"><button class="btn g" data-act="packReset">Für nächste Reise leeren</button><span class="muted">Alle Häkchen weg, deine eigenen Sachen bleiben.</span></div>'}
ACT.packCat=function(i){S.pack.cat=+i;save();rerender()};
ACT.packTick=function(k){S.pack.done[k]=!S.pack.done[k];if(!S.pack.done[k])delete S.pack.done[k];save();rerender()};
ACT.packWho=function(w){S.pack.person=w;save();rerender()};
ACT.packReg=function(v){S.pack.region=v;save();rerender()};
ACT.packAll=function(){S.pack.allRegions=!S.pack.allRegions;save();rerender()};
ACT.packReset=function(){var s=sheet('<h2 class="disp" style="font-size:32px">Alle Häkchen löschen?</h2><p class="muted" style="margin:10px 0 16px">Die Packliste ist dann wieder leer, bereit für die nächste Reise. Eigene Sachen bleiben.</p><div class="row"><button class="btn d" data-act="packResetGo">Ja, leeren</button><button class="btn g" data-act="closeSheet">Abbrechen</button></div>')};
ACT.packResetGo=function(){S.pack.done={};save();closeSheet();rerender()};
ACT.closeSheet=closeSheet;
ACT.packAdd=function(){sheet('<h2 class="disp" style="font-size:32px">Eigene Sache</h2><div class="col" style="margin-top:12px"><input id="ni" class="inp" placeholder="Was kommt in den Koffer?" maxlength="60"><select id="nc" class="inp">'+PACK.map(function(c,i){return '<option value="'+i+'"'+(i===S.pack.cat?' selected':'')+'>'+c.name+'</option>'}).join('')+'</select><select id="nw" class="inp"><option value="alle">Für alle</option><option value="papa">Papa</option><option value="mama">Mama</option><option value="kind">Kind</option></select><button class="btn d" data-act="packAddGo">Hinzufügen</button></div>')};
ACT.packAddGo=function(){var t=$('#ni').value.trim();if(!t)return;S.pack.custom.push({id:Date.now(),t:t,cat:+$('#nc').value,who:$('#nw').value});save();closeSheet();rerender()};
function briefHtml(){return '<p class="muted" style="margin-bottom:12px">Der Weg von der Haustür bis zum Gate, Schritt für Schritt. Tippe Schritte ab, wenn du sie kennst.</p><div class="col">'+BRIEFING.map(function(b,i){var cnt=b[2].filter(function(_,j){return S.brief.done[i+'-'+j]}).length;
  return '<details class="acc"'+(i===0?' open':'')+'><summary><span class="disp" style="font-size:30px;color:#2779A7">'+(i+1)+'</span>'+esc(b[0])+'<span class="tag">'+cnt+'/'+b[2].length+'</span></summary><div class="c"><p>'+esc(b[1])+'</p>'+b[2].map(function(x,j){var d=S.brief.done[i+'-'+j];return '<button class="item'+(d?' done':'')+'" data-act="briefTick" data-a="'+i+'-'+j+'"><span class="bx">'+(d?'✓':'')+'</span><span class="tx">'+esc(x)+'</span></button>'}).join('')+'</div></details>'}).join('')+'</div>'}
ACT.briefTick=function(k){S.brief.done[k]=!S.brief.done[k];save();var d=document.querySelectorAll('details.acc');var open=[];$$('details.acc').forEach(function(x,i){if(x.open)open.push(i)});rerender();$$('details.acc').forEach(function(x,i){x.open=open.indexOf(i)>-1})};
function vorherHtml(){return '<p class="muted" style="margin-bottom:12px">Was glaubst du? Schreibe deine Tipps jetzt auf und vergleiche sie nach dem Flug. Es gibt kein Richtig oder Falsch.</p><div class="col">'+VORHER.map(function(q,i){return '<div class="card"><div class="mono">Tipp '+(i+1)+'</div><b>'+esc(q)+'</b><input class="inp" style="margin-top:8px" data-in="predSet" data-a="'+i+'" value="'+esc(S.pred[i]||'')+'" placeholder="Mein Tipp …"></div>'}).join('')+'</div>'}
ACT.predSet=function(v,el){S.pred[el.getAttribute('data-a')]=v;save()};

/* ---------- Stadtplan (integrierter Familien-Plan) ---------- */
function allStops(d){return d.stops}
function kmd(a,b){var r=Math.PI/180,dl=(b.lat-a.lat)*r,dn=(b.lng-a.lng)*r;var x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dn/2)*Math.sin(dn/2);return 12742*Math.asin(Math.sqrt(x))}
function walkKm(a,b){return kmd(a,b)*1.3}
function minsOf(k){return Math.max(1,Math.round(k/4.3*60))}
function fmtKm(k){return k<1?Math.round(k*100)*10+' m':fmt(k.toFixed(1))+' km'}
function mapsUrl(n){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(n.replace(/\s*\(.*?\)/g,'')+', Barcelona')}
function dayKm(d){var t=0;for(var i=1;i<d.stops.length;i++){if(!TRANSIT[d.id+':'+d.stops[i].id])t+=walkKm(d.stops[i-1],d.stops[i])}return t}
function stadtMap(d,sel){var pts=d.stops.concat(S.stadt.showX?d.extras:[]);var la=pts.map(function(p){return p.lat}),lo=pts.map(function(p){return p.lng});
 var minLa=Math.min.apply(0,la),maxLa=Math.max.apply(0,la),minLo=Math.min.apply(0,lo),maxLo=Math.max.apply(0,lo);var k=Math.cos(41.39*Math.PI/180);var W=640,H=360,pad=34;
 var sx=(W-2*pad)/Math.max(.002,(maxLo-minLo)*k),sy=(H-2*pad)/Math.max(.002,(maxLa-minLa));var sc=Math.min(sx,sy);
 var ox=(W-(maxLo-minLo)*k*sc)/2,oy=(H-(maxLa-minLa)*sc)/2;
 function X(p){return ox+(p.lng-minLo)*k*sc}function Y(p){return oy+(maxLa-p.lat)*sc}
 var line=d.stops.map(function(p){return X(p).toFixed(1)+','+Y(p).toFixed(1)}).join(' ');
 var dots=d.stops.map(function(p,i){var on=p.id===sel,dn=S.stadt.done[p.id];return '<g data-act="stadtSel" data-a="'+p.id+'" style="cursor:pointer"><circle cx="'+X(p).toFixed(1)+'" cy="'+Y(p).toFixed(1)+'" r="'+(on?19:15)+'" fill="'+(dn?'#49C5B6':on?'#FF6A52':'#13324A')+'" stroke="#fff" stroke-width="3"/><text x="'+X(p).toFixed(1)+'" y="'+(Y(p)+5).toFixed(1)+'" text-anchor="middle" font-size="14" font-weight="800" fill="'+(dn?'#13324A':'#fff')+'">'+(i+1)+'</text></g>'}).join('');
 var ex=S.stadt.showX?d.extras.map(function(p){return '<g data-act="stadtSel" data-a="'+p.id+'" style="cursor:pointer"><circle cx="'+X(p).toFixed(1)+'" cy="'+Y(p).toFixed(1)+'" r="9" fill="#ECD06F" stroke="#13324A" stroke-width="2"/></g>'}).join(''):'';
 return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;border-radius:20px;background:linear-gradient(180deg,#EAF3F3,#F7F1DF)"><polyline points="'+line+'" fill="none" stroke="#2779A7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9"/>'+ex+dots+'</svg>'}
ROUTES.stadt=function(a){var di=Math.min(CITY.length-1,Math.max(0,S.stadt.day)),d=CITY[di],sel=S.stadt.sel||null;var P={};d.stops.concat(d.extras).forEach(function(s){P[s.id]=s});
 var done=d.stops.filter(function(s){return S.stadt.done[s.id]}).length;
 var days=CITY.map(function(x,i){return '<button class="chip'+(i===di?' on':'')+'" data-act="stadtDay" data-a="'+i+'">Tag '+(i+1)+'<small class="mono" style="margin-left:6px;color:inherit;letter-spacing:0">'+x.dow+'</small></button>'}).join('');
 var list=d.stops.map(function(s,i){var tr=TRANSIT[d.id+':'+s.id],leg=i>0?'<div class="leg">'+(tr?esc(tr):'Zu Fuß '+minsOf(walkKm(d.stops[i-1],s))+' Min. · '+fmtKm(walkKm(d.stops[i-1],s)))+'</div>':'';
  var dn=S.stadt.done[s.id],open=sel===s.id;
  return leg+'<div class="stop'+(dn?' done':'')+'" id="st-'+s.id+'"><button class="no" data-act="stadtDone" data-a="'+s.id+'" aria-label="besucht">'+(dn?'✓':(i+1))+'</button><div style="flex:1"><button data-act="stadtSel" data-a="'+(open?'':s.id)+'" style="text-align:left;width:100%"><b style="font-size:18px">'+esc(s.n)+'</b><div class="mono">'+KIND[s.k]+' · '+esc(s.t)+' · '+esc(s.c)+'</div></button>'+(open?stopDetail(s):'')+'</div></div>'}).join('');
 var extras=S.stadt.showX?'<div class="card" style="margin-top:12px"><div class="mono">Wenn noch Zeit ist</div>'+d.extras.map(function(s){return '<div class="stop"><span class="no" style="background:#ECD06F;color:#13324A">+</span><div><b>'+esc(s.n)+'</b> <span class="tag">'+esc(s.cat)+'</span>'+stopDetail(s)+'</div></div>'}).join('')+'</div>':'';
 var spot=d.spot.map(function(s,i){var k=d.id+'-'+i,on=S.wes.spot[k];return '<button class="item'+(on?' done':'')+'" data-act="spotTick" data-a="'+k+'"><span class="bx">'+(on?'✓':'')+'</span><span class="tx">'+esc(s)+'</span></button>'}).join('');
 var tips=STADT_TIPS.map(function(t){return '<details class="acc"'+(t[2]?' open':'')+'><summary>'+t[0]+'</summary><div class="c">'+t[1]+'</div></details>'}).join('');
 return topbar('STADTPLAN · '+esc(S.trip.name).toUpperCase(),'Unsere Route','/','<button class="chip'+(S.stadt.showX?' on':'')+'" data-act="stadtX">Mehr entdecken</button>')+
 '<div class="chips" style="margin-bottom:14px">'+days+'</div>'+
 '<div class="grid2" style="align-items:start"><div class="col"><div class="dark"><span class="tab">TAG '+(di+1)+' · '+d.area.toUpperCase()+'</span><h2 class="disp" style="font-size:36px">'+esc(d.title)+'</h2><p style="margin:8px 0">'+esc(d.lede)+'</p><div class="wrap"><span class="tag">'+dayKm(d).toFixed(1).replace('.',',')+' km zu Fuß</span><span class="tag">'+d.stops.length+' Stopps</span><span class="tag">'+esc(d.budget)+'</span><span class="tag" style="background:#ECD06F">Beste Wochentage: '+d.dow+'</span></div><p class="muted" style="color:#CFE0EA;font-size:13px;margin-top:8px">Start: '+esc(d.start)+'. '+esc(d.budgetNote)+'</p></div>'+
 stadtMap(d,sel)+
 '<div class="card"><div class="mono">Such-Liste des Tages</div>'+spot+'</div>'+
 '<details class="acc"><summary>Wenn es regnet</summary><div class="c"><ul>'+d.rain.map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul></div></details>'+
 '<details class="acc"><summary>Wusstest du?</summary><div class="c"><ul>'+d.facts.map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul></div></details></div>'+
 '<div class="col"><div class="card"><div class="row"><b>Heute besucht</b><div class="sp"></div><span class="mono">'+done+' von '+d.stops.length+'</span></div><div class="bar" style="margin:8px 0"><i style="width:'+(done/d.stops.length*100)+'%"></i></div>'+list+'</div>'+extras+'</div></div>'+
 '<h2 class="disp" style="font-size:34px;margin:26px 0 12px">Vor der Reise</h2><div class="col">'+tips+'</div><p class="muted" style="margin-top:12px;font-size:13px">Preise und Zeiten Oktober 2026. Nur auf offiziellen Seiten buchen. Karte und Texte funktionieren ohne Internet, die Google-Maps-Links brauchen WLAN.</p>'};
function stopDetail(s){return '<div style="margin-top:6px"><p>'+esc(s.why)+'</p>'+(s.kid?'<div class="kid">Für dich: '+esc(s.kid)+'</div>':'')+(s.tip?'<p class="muted" style="margin-top:6px"><b>Tipp:</b> '+esc(s.tip)+'</p>':'')+(s.h?'<p class="muted"><b>Öffnungszeiten:</b> '+esc(s.h)+'</p>':'')+'<a class="chip" style="display:inline-block;line-height:44px;margin-top:8px" href="'+mapsUrl(s.n)+'" target="_blank" rel="noopener">In Google Maps</a></div>'}
ACT.stadtDay=function(i){S.stadt.day=+i;S.stadt.sel=null;save();rerender()};
ACT.stadtSel=function(id){S.stadt.sel=id||null;rerender();if(id){var e=$('#st-'+id);if(e)e.scrollIntoView({block:'center'})}};
ACT.stadtDone=function(id){S.stadt.done[id]=!S.stadt.done[id];if(!S.stadt.done[id])delete S.stadt.done[id];save();rerender()};
ACT.stadtX=function(){S.stadt.showX=!S.stadt.showX;save();rerender()};
ACT.spotTick=function(k){S.wes.spot[k]=!S.wes.spot[k];save();rerender()};
