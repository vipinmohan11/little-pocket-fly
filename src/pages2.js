/* ===== Eltern, Reise, Wunderwesen, Rekorde, Tagebuch, Entdecker-Buch ===== */
var pinBuf='',pinStep=0,pinTmp='';
function keypad(){return '<div class="dots">'+[0,1,2,3].map(function(i){return '<i class="'+(i<pinBuf.length?'f':'')+'"></i>'}).join('')+'</div><div class="pin">'+[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(function(k){return k===''?'<span></span>':'<button data-act="pinKey" data-a="'+k+'">'+k+'</button>'}).join('')+'</div>'}
ACT.pinKey=function(k){if(k==='⌫')pinBuf=pinBuf.slice(0,-1);else if(pinBuf.length<4)pinBuf+=k;
 if(pinBuf.length<4){rerender();return}
 var buf=pinBuf;pinBuf='';
 if(!S.pin){if(pinStep===0){pinTmp=buf;pinStep=1;rerender();return}
  if(buf===pinTmp){sha(buf).then(function(h){S.pin=h;save();unlocked=true;pinStep=0;pinTmp='';rerender();toast('PIN gespeichert')})}else{pinStep=0;pinTmp='';toast('Die PINs waren nicht gleich. Nochmal.');rerender()}return}
 sha(buf).then(function(h){if(h===S.pin){unlocked=true;rerender()}else{toast('Falsche PIN');rerender()}})};
function stepper(id,v,u,dec,inc){return '<div class="row"><button class="round" aria-label="weniger" data-act="'+dec+'" data-a="'+id+'">−</button><b style="min-width:76px;text-align:center" class="mono">'+v+' '+u+'</b><button class="round" aria-label="mehr" data-act="'+inc+'" data-a="'+id+'">+</button></div>'}
ROUTES.eltern=function(){
 if(!S.pin||!unlocked){var head=!S.pin?(pinStep===0?'Neue Eltern-PIN festlegen (4 Ziffern)':'PIN noch einmal eingeben'):'Eltern-PIN eingeben';
  return topbar('FÜR ELTERN','Bitte PIN','/')+'<div class="card" style="max-width:420px;margin:20px auto;text-align:center"><b>'+head+'</b>'+keypad()+(!S.pin?'<p class="muted" style="font-size:13px;margin-top:12px">Du kannst dieselbe PIN wie bei Denkzauber nehmen.</p>':'')+'</div>'}
 var usedPct=S.lim?Math.min(100,Math.round(usedToday()/S.lim*100)):0;
 var wins=WINDOWS.map(function(w){var p=!!S.wpaused[w.id];return '<div class="row" style="padding:10px 0;border-top:1px solid rgba(19,50,74,.08);flex-wrap:wrap"><span style="width:12px;height:12px;border-radius:50%;background:'+w.c+'"></span><b style="flex:1;min-width:140px">'+esc(w.t)+'</b>'+stepper(w.id,S.mins[w.id],'Min','minDec','minInc')+'<span class="mono">heute '+Math.round(winUsed(w.id))+'</span><button class="tgl'+(p?'':' on')+'" data-act="winTgl" data-a="'+w.id+'" aria-label="'+esc(w.t)+(p?' freigeben':' pausieren')+'"></button></div>'}).join('');
 var pu=S.pauseUntil&&Date.now()<S.pauseUntil;
 return topbar('PIN BESTÄTIGT','Für Eltern','/','<a class="pill" href="#/reise"><i>'+arrow()+'</i>Reise planen</a>')+
 '<div class="grid2" style="align-items:start"><div class="col">'+
 '<div class="dark"><span class="tab">HEUTE</span><div class="row" style="align-items:flex-end"><span class="disp" style="font-size:72px">'+usedToday()+'</span><span class="disp" style="font-size:26px;color:#9FB6C6;padding-bottom:6px">/ '+(S.lim||'∞')+' MIN</span></div><div class="bar" style="margin:10px 0 14px;background:rgba(255,255,255,.14)"><i style="width:'+usedPct+'%"></i></div><div class="row"><span style="flex:1;font-weight:700">Zeit pro Tag (0 = ohne Limit)</span>'+stepper('lim',S.lim,'Min','limDec','limInc').replace(/class="round"/g,'class="round" style="background:rgba(255,255,255,.14);color:#fff"')+'</div></div>'+
 '<div class="card"><div class="mono">Alles pausieren</div><div class="row" style="margin-top:10px">'+[['15 Min',15],['30 Min',30],['Bis morgen',-1]].map(function(x){return '<button class="btn g" style="flex:1" data-act="pauseAll" data-a="'+x[1]+'">'+x[0]+'</button>'}).join('')+'</div><p class="muted" style="margin-top:8px">'+(pu?'Alle Rollos sind zu bis '+new Date(S.pauseUntil).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+'. <button class="chip" data-act="pauseAll" data-a="0">Aufheben</button>':'Schließt alle Rollos auf einmal.')+'</p></div>'+
 '<div class="card"><div class="mono">Namen &amp; Anzeige</div><div class="col" style="margin-top:8px"><label class="muted">Kuscheltier<input class="inp" data-in="setName" data-a="mascot" value="'+esc(S.names.mascot)+'" maxlength="20"></label><label class="muted">Name für Wunderwesen<input class="inp" data-in="setName" data-a="wesen" value="'+esc(S.names.wesen)+'" maxlength="24"></label><label class="muted">Name des Kindes (optional)<input class="inp" data-in="setName" data-a="kind" value="'+esc(S.names.kind)+'" maxlength="20"></label><div class="row"><span class="muted">Schriftgröße</span>'+[[1,'Normal'],[1.15,'Groß'],[1.3,'Sehr groß']].map(function(x){return '<button class="chip'+(S.ts===x[0]?' on':'')+'" data-act="setTs" data-a="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div></div>'+
 '</div><div class="col">'+
 '<div class="card"><div class="mono">Fenster · Rollo zu = Pause · Minuten pro Tag</div>'+wins+'</div>'+
 '<div class="card"><div class="mono">App &amp; Updates</div><div id="updstate" style="margin:8px 0">'+(UPD.waiting?updHtml('ready',UPD.info):updHtml())+'</div><button class="btn d" data-act="checkUpdate">Nach Updates suchen</button><p class="muted" style="font-size:13px;margin-top:8px">Updates ändern nur die App. Gepacktes, Tagebuch, Sterne und alle Einstellungen bleiben auf dem Tablet erhalten.</p></div>'+
 '<div class="card"><div class="mono">Daten sichern</div><p class="muted" style="margin:6px 0 10px">Eine Datei mit allem, was das Kind gespeichert hat.</p><div class="wrap"><button class="btn g" data-act="exportData">Sichern (Datei)</button><label class="btn g" style="display:inline-grid;place-items:center;line-height:50px">Laden<input type="file" accept="application/json" data-ch="importData" style="display:none"></label></div></div>'+
 '<div class="card"><div class="mono">Sicherheit</div><div class="wrap" style="margin-top:8px"><button class="btn g" data-act="pinChange">PIN ändern</button><button class="btn c" data-act="wipe">Alle Daten löschen</button></div></div>'+
 '</div></div>'};
ACT.limDec=function(){S.lim=Math.max(0,S.lim-15);save();rerender()};
ACT.limInc=function(){S.lim=Math.min(240,S.lim+15);save();rerender()};
ACT.minDec=function(id){S.mins[id]=Math.max(5,S.mins[id]-5);save();rerender()};
ACT.minInc=function(id){S.mins[id]=Math.min(120,S.mins[id]+5);save();rerender()};
ACT.winTgl=function(id){S.wpaused[id]=!S.wpaused[id];save();rerender()};
ACT.pauseAll=function(m){m=+m;if(m===0)S.pauseUntil=0;else if(m<0){var d=new Date();d.setHours(24,0,0,0);S.pauseUntil=d.getTime()}else S.pauseUntil=Date.now()+m*60000;save();rerender()};
ACT.setName=function(v,el){S.names[el.getAttribute('data-a')]=v.trim()||DEFAULTS.names[el.getAttribute('data-a')];save()};
ACT.setTs=function(v){S.ts=+v;save();applyTs();rerender()};
ACT.pinChange=function(){S.pin=null;save();pinStep=0;unlocked=false;rerender()};
ACT.exportData=function(){var b=new Blob([JSON.stringify({app:'kofferforscher',version:APP_VERSION,date:new Date().toISOString(),data:S},null,1)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='kofferforscher-sicherung-'+today()+'.json';document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(a.href)},500)};
ACT.importData=function(v,el){var f=el.files&&el.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var j=JSON.parse(r.result);if(!j||j.app!=='kofferforscher'||!j.data)throw 0;S=deepMerge(DEFAULTS,j.data);save();applyTs();toast('Daten geladen');rerender()}catch(e){toast('Das ist keine Sicherung der App')}};r.readAsText(f)};
ACT.wipe=function(){sheet('<h2 class="disp" style="font-size:32px">Wirklich alles löschen?</h2><p class="muted" style="margin:10px 0 16px">Gepacktes, Tagebuch, Sterne, Wunderwesen und Einstellungen werden gelöscht. Das geht nicht rückgängig. Tipp: erst „Sichern“.</p><div class="row"><button class="btn c" data-act="wipeGo">Ja, löschen</button><button class="btn g" data-act="closeSheet">Abbrechen</button></div>')};
ACT.wipeGo=function(){try{localStorage.removeItem(KEY)}catch(e){}load();unlocked=false;closeSheet();location.hash='#/';route()};

/* ---------- Reiseplan (mehrere Stationen A→B→C…) ---------- */
var REG=[['DE','Deutschland'],['EU','EU'],['NonEU','Nicht-EU'],['IN','Indien'],['US','USA'],['AF','Afrika']];
ROUTES.reise=function(){if(!S.pin||!unlocked){location.hash='#/eltern';return ''}
 var t=S.trip;var legs=t.legs.map(function(l,i){return '<div class="row" style="padding:10px 0;border-top:1px solid rgba(19,50,74,.08);flex-wrap:wrap"><span class="disp" style="font-size:28px;color:#2779A7;width:34px">'+'ABCDEFGH'[i]+'</span><input class="inp" style="flex:2;min-width:140px" data-in="legCity" data-a="'+i+'" value="'+esc(l.city)+'" placeholder="Stadt"><input class="inp" style="width:90px" data-in="legCode" data-a="'+i+'" value="'+esc(l.code||'')+'" placeholder="Code" maxlength="4"><select class="inp" style="width:150px" data-ch="legReg" data-a="'+i+'">'+REG.map(function(r){return '<option value="'+r[0]+'"'+(l.region===r[0]?' selected':'')+'>'+r[1]+'</option>'}).join('')+'</select>'+(t.legs.length>2?'<button class="round" data-act="legDel" data-a="'+i+'" aria-label="entfernen">×</button>':'')+'</div>'+(i<t.legs.length-1?'<div class="row" style="margin-left:46px"><button class="chip" data-act="legAdd" data-a="'+(i+1)+'">+ Stopp einfügen</button></div>':'')}).join('');
 var arch=S.archive.length?S.archive.map(function(a){return '<div class="row" style="padding:8px 0;border-top:1px solid rgba(19,50,74,.08)"><b style="flex:1">'+esc(a.name)+'</b><span class="mono">'+esc(a.depart)+' → '+esc(a.back)+' · '+a.packed+' gepackt · '+a.found+' Wesen</span></div>'}).join(''):'<p class="muted">Noch keine abgeschlossene Reise.</p>';
 return topbar('REISE PLANEN','Reiseplan','/eltern')+'<div class="grid2" style="align-items:start"><div class="col"><div class="card"><div class="mono">Diese Reise</div><div class="col" style="margin-top:8px"><label class="muted">Name<input class="inp" data-in="tripName" value="'+esc(t.name)+'"></label><div class="row"><label class="muted" style="flex:1">Abflug<input type="date" class="inp" data-ch="tripDep" value="'+t.depart+'"></label><label class="muted" style="flex:1">Rückkehr<input type="date" class="inp" data-ch="tripBack" value="'+t.back+'"></label></div><label class="muted">Packlisten-Region<select class="inp" data-ch="tripReg">'+REG.map(function(r){return '<option value="'+r[0]+'"'+(S.pack.region===r[0]?' selected':'')+'>'+r[1]+'</option>'}).join('')+'</select></label></div></div>'+
 '<div class="card"><div class="mono">Stationen A → B → C …</div>'+legs+'<p class="muted" style="font-size:13px;margin-top:10px">Mit „+ Stopp einfügen“ planst du Reisen mit mehreren Stationen. Die Region steuert die Packliste.</p></div></div>'+
 '<div class="col"><div class="card"><div class="mono">Das ändert sich pro Reise</div><ul style="padding-left:20px"><li>Packliste (Region, Häkchen) – wird geleert</li><li>Countdown, Route und Tagebuch-Tage</li><li>Tagebuch – neues Buch</li></ul><div class="mono" style="margin-top:8px">Das bleibt</div><ul style="padding-left:20px"><li>Sterne, Kapitel, Rekorde, Titel im Entdecker-Buch</li><li>Wie fliegt das?, Tüftel-Hangar, Aufträge</li></ul><p class="muted" style="font-size:13px">Stadtplan und Wunderwesen sind für Barcelona. Für ein anderes Ziel kommen sie mit einem App-Update.</p></div>'+
 '<div class="card"><div class="mono">Reise abschließen</div><p class="muted" style="margin:6px 0 10px">Legt diese Reise ins Archiv und startet eine neue.</p><button class="btn d" data-act="tripEnd">Reise abschließen · neue beginnen</button></div>'+
 '<div class="card"><div class="mono">Frühere Reisen</div>'+arch+'</div></div></div>'};
ACT.tripName=function(v){S.trip.name=v||'Reise';save()};
ACT.tripDep=function(v){if(v){S.trip.depart=v;save()}};
ACT.tripBack=function(v){if(v){S.trip.back=v;save()}};
ACT.tripReg=function(v){S.pack.region=v;save()};
ACT.legCity=function(v,el){S.trip.legs[+el.getAttribute('data-a')].city=v;save()};
ACT.legCode=function(v,el){S.trip.legs[+el.getAttribute('data-a')].code=v.toUpperCase();save()};
ACT.legReg=function(v,el){S.trip.legs[+el.getAttribute('data-a')].region=v;save()};
ACT.legAdd=function(i){S.trip.legs.splice(+i,0,{city:'',code:'',region:'EU'});save();rerender()};
ACT.legDel=function(i){S.trip.legs.splice(+i,1);save();rerender()};
ACT.tripEnd=function(){var ps=packStats();S.archive.push({name:S.trip.name,depart:S.trip.depart,back:S.trip.back,packed:ps.d,found:Object.keys(S.wes.found).length,diary:S.diary});
 var home=S.trip.legs[0];S.trip={id:'t'+Date.now(),name:'Neue Reise',depart:today(),back:today(),region:'EU',legs:[home,{city:'',code:'',region:'EU'},home]};
 S.pack.done={};S.brief.done={};S.pred={};S.diary={};S.stadt.done={};S.wes.spot={};save();toast('Neue Reise bereit');rerender()};

/* ---------- Wunderwesen ---------- */
ROUTES.wes=function(){var f=Object.keys(S.wes.found).length;
 var cards=WESEN.map(function(w){var on=S.wes.found[w.id];return '<button class="tile" style="background:'+(on?w.c:'var(--paper)')+'" data-act="wesOpen" data-a="'+w.id+'"><div class="disp" style="font-size:44px;opacity:'+(on?1:.25)+'">'+(on?'★':'?')+'</div><h3 class="disp" style="font-size:24px">'+(on?esc(w.n):'Noch unbekannt')+'</h3><span class="mono">'+esc(placeName(w.stop))+'</span></button>'}).join('');
 return topbar('BARCELONA ENTDECKEN',esc(S.names.wesen),'/','<div class="mono" style="text-align:right">'+f+' von '+WESEN.length+'<br>gefunden</div>')+'<div class="bar" style="margin-bottom:16px"><i style="width:'+(f/WESEN.length*100)+'%"></i></div><p class="muted" style="margin-bottom:14px">Jedes Wesen versteckt sich an einem Ort der Reise. Geh hin, schau genau hin und tippe, wenn du es gefunden hast. '+esc(S.names.mascot)+' hilft dir.</p><div class="grid3">'+cards+'</div><div class="row" style="margin-top:18px"><a class="pill" href="#/stadt"><i>'+arrow()+'</i>Zum Stadtplan</a></div>'};
function placeName(id){for(var i=0;i<CITY.length;i++){var all=CITY[i].stops.concat(CITY[i].extras);for(var j=0;j<all.length;j++)if(all[j].id===id)return all[j].n.replace(/\s*\(.*?\)/g,'')}return ''}
function placeDay(id){for(var i=0;i<CITY.length;i++){var all=CITY[i].stops.concat(CITY[i].extras);for(var j=0;j<all.length;j++)if(all[j].id===id)return i}return 0}
ACT.wesOpen=function(id){var w=WESEN.filter(function(x){return x.id===id})[0],on=S.wes.found[id];
 sheet('<div class="mono">'+esc(S.names.wesen)+'</div><h2 class="disp" style="font-size:38px;color:#2779A7">'+esc(w.n)+'</h2><p style="margin:10px 0"><b>Ort:</b> '+esc(placeName(w.stop))+' (Stadtplan Tag '+(placeDay(w.stop)+1)+')</p><p>'+esc(w.txt)+'</p><div class="kid">Suchtipp: '+esc(w.tip)+'</div><div class="row" style="margin-top:16px;flex-wrap:wrap"><button class="btn '+(on?'g':'s')+'" data-act="wesFound" data-a="'+id+'">'+(on?'Doch nicht gefunden':'Ich habe es gefunden!')+'</button><a class="btn g" style="display:inline-grid;place-items:center;line-height:50px" href="'+mapsUrl(placeName(w.stop))+'" target="_blank" rel="noopener">Karte</a></div>')};
ACT.wesFound=function(id){if(S.wes.found[id])delete S.wes.found[id];else{S.wes.found[id]=today()}save();closeSheet();rerender();if(S.wes.found[id])toast(S.names.mascot+' freut sich!')};

/* ---------- Weltrekorde ---------- */
ROUTES.rek=function(){var c=S.rek.cat,R=REKORDE[c],items=R.items;var A=S.rek.a!=null&&S.rek.a<items.length?S.rek.a:0,B=S.rek.b!=null&&S.rek.b<items.length?S.rek.b:items.length-1;
 var a=items[A],b=items[B],mx=Math.max(a[1],b[1]),lo=Math.min(a[1],b[1]),hi=mx;var ratio=lo>0?hi/lo:0;
 var sel=function(id,cur){return '<select class="inp" data-ch="rekSel" data-a="'+id+'">'+items.map(function(x,i){return '<option value="'+i+'"'+(i===cur?' selected':'')+'>'+esc(x[0])+'</option>'}).join('')+'</select>'};
 var big=a[1]>=b[1]?a:b,small=a[1]>=b[1]?b:a;
 var sentence=A===B?'Beide sind gleich.':(ratio<1.05?esc(a[0])+' und '+esc(b[0])+' sind fast gleich.':esc(big[0])+' ist etwa '+fmt((Math.round(ratio*10)/10).toString())+'-mal so '+({'Höhe':'hoch','Tempo':'schnell','Länge':'lang','Gewicht':'schwer'}[c])+' wie '+esc(small[0])+'.');
 return topbar('REKORDE','Weltrekorde','/')+'<div class="chips" style="margin-bottom:14px">'+Object.keys(REKORDE).map(function(k){return '<button class="chip'+(k===c?' on':'')+'" data-act="rekCat" data-a="'+k+'">'+k+'</button>'}).join('')+'</div>'+
 '<div class="card"><div class="mono">Vergleiche zwei</div><div class="grid2" style="margin:10px 0">'+sel('a',A)+sel('b',B)+'</div>'+
 [a,b].map(function(x){return '<div style="margin:12px 0"><div class="row"><b>'+esc(x[0])+'</b><div class="sp"></div><span class="mono">'+fmt(x[1])+' '+R.unit+'</span></div><div class="bar" style="height:22px"><i style="width:'+Math.max(2,x[1]/mx*100)+'%;background:'+(x===a?'#49C5B6':'#FF6A52')+'"></i></div></div>'}).join('')+'<p style="font-weight:800;font-size:18px;margin-top:10px">'+sentence+'</p></div>'+
 '<div class="col" style="margin-top:16px">'+items.slice().sort(function(x,y){return y[1]-x[1]}).map(function(x){return '<div class="card" style="padding:12px 18px"><div class="row"><b>'+esc(x[0])+'</b><div class="sp"></div><span class="mono">'+fmt(x[1])+' '+R.unit+'</span></div>'+(x[2]?'<div class="muted">'+esc(x[2])+'</div>':'')+'</div>'}).join('')+'</div>'};
ACT.rekCat=function(k){S.rek.cat=k;S.rek.a=null;S.rek.b=null;save();rerender()};
ACT.rekSel=function(v,el){S.rek[el.getAttribute('data-a')]=+v;save();rerender()};

/* ---------- Reise-Tagebuch ---------- */
var MOODS=[['Super','M12 21 Q18 27 24 21'],['Gut','M12 22 H24'],['Müde','M12 24 Q18 20 24 24']];
var BESTS=['Strand','Essen','Spielplatz','Metro','Flugzeug','Neue Freunde','Sagrada Família','Park Güell','Wunderwesen'];
var WEATHERS=['Sonne','Wolken','Regen'];
function tripDays(){var out=[],n=Math.max(1,Math.min(21,daysBetween(S.trip.depart,S.trip.back)+1));var d=new Date(S.trip.depart+'T00:00:00');for(var i=0;i<n;i++){var x=new Date(d.getTime()+i*864e5);out.push(x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2))}return out}
function dayLabel(iso){var d=new Date(iso+'T00:00:00');return['SO','MO','DI','MI','DO','FR','SA'][d.getDay()]+' '+d.getDate()+'.'+(d.getMonth()+1)+'.'}
ROUTES.tag=function(a){var days=tripDays();var cur=a[0]==='buch'?'buch':(a[0]&&days.indexOf(a[0])>-1?a[0]:(days.indexOf(today())>-1?today():days[0]));
 var tabs=days.map(function(d,i){return '<a class="chip'+(d===cur?' on':'')+'" href="#/tag/'+d+'" style="display:inline-block;line-height:44px">'+(i+1)+'<small class="mono" style="margin-left:6px;color:inherit;letter-spacing:0">'+dayLabel(d)+'</small></a>'}).join('')+'<a class="chip'+(cur==='buch'?' on':'')+'" href="#/tag/buch" style="display:inline-block;line-height:44px">Reise-Buch</a>';
 if(cur==='buch'){return topbar('REISE-TAGEBUCH',esc(S.trip.name)+' · Reise-Buch','/','<button class="chip" onclick="window.print()">Drucken</button>')+'<div class="chips" style="margin-bottom:14px">'+tabs+'</div><div class="col">'+days.map(function(d,i){var e=S.diary[d]||{};return '<div class="card"><div class="mono">Tag '+(i+1)+' · '+dayLabel(d)+' · '+(e.w!=null?WEATHERS[e.w]:'')+' '+(e.mood!=null?'· '+MOODS[e.mood][0]:'')+'</div>'+(e.best&&e.best.length?'<p><b>Das Beste:</b> '+e.best.map(esc).join(', ')+'</p>':'')+'<p class="hand" style="font-size:28px;color:#2779A7">'+esc(e.text||'–')+'</p></div>'}).join('')+'</div>'}
 var e=S.diary[cur]||(S.diary[cur]={});var i=days.indexOf(cur);
 var moods=MOODS.map(function(m,j){return '<button class="tile" style="min-height:90px;align-items:center;background:'+(e.mood===j?'#ECD06F':'#F7F2E6')+'" data-act="tagMood" data-a="'+j+'"><svg width="40" height="40" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="#fff" stroke="#13324A" stroke-width="2.5"/><circle cx="13" cy="15" r="2" fill="#13324A"/><circle cx="23" cy="15" r="2" fill="#13324A"/><path d="'+m[1]+'" fill="none" stroke="#13324A" stroke-width="2.5" stroke-linecap="round"/></svg><b>'+m[0]+'</b></button>'}).join('');
 var bests=BESTS.map(function(b){var on=e.best&&e.best.indexOf(b)>-1;return '<button class="chip'+(on?' on':'')+'" data-act="tagBest" data-a="'+esc(b)+'">'+esc(b)+'</button>'}).join('');
 var wea=WEATHERS.map(function(w,j){return '<button class="chip'+(e.w===j?' on':'')+'" data-act="tagW" data-a="'+j+'">'+w+'</button>'}).join('');
 var found=Object.keys(S.wes.found).length,stops=Object.keys(S.stadt.done).length;
 return topbar('REISE-TAGEBUCH · '+esc(S.trip.name).toUpperCase(),'Tag '+(i+1)+' · '+dayLabel(cur),'/')+'<div class="chips" style="margin-bottom:14px">'+tabs+'</div><div class="grid2" style="align-items:start"><div class="paper"><div class="mono">Wie war dein Tag?</div><div class="grid3" style="margin:10px 0">'+moods+'</div><div class="mono">Das Beste heute</div><div class="chips" style="margin:10px 0 16px">'+bests+'</div><div class="mono">Wetter</div><div class="chips" style="margin:10px 0 16px">'+wea+'</div><div class="mono">Ein Satz von mir</div><textarea id="tt" class="inp hand" style="height:120px;padding:10px 14px;font-size:28px;color:#2779A7;resize:none" data-in="tagText" placeholder="Heute habe ich …">'+esc(e.text||'')+'</textarea><p class="hand" style="text-align:right;font-size:26px">– '+esc(S.names.mascot)+' war dabei</p></div>'+
 '<div class="col"><div class="card"><div class="mono">Bisher gesammelt</div><div class="row" style="margin-top:8px"><span class="disp" style="font-size:44px;color:#49C5B6">'+found+'</span><b>'+esc(S.names.wesen)+'</b></div><div class="row"><span class="disp" style="font-size:44px;color:#FF6A52">'+stops+'</span><b>Orte besucht (Stadtplan)</b></div><div class="row"><span class="disp" style="font-size:44px;color:#2779A7">'+Object.keys(S.wissen.read).length+'</span><b>Kapitel gelesen</b></div></div><div class="card" style="border:2px dashed rgba(19,50,74,.2);box-shadow:none">Nach der Reise wird aus allen Tagen ein kleines Reise-Buch zum Anschauen (Reiter „Reise-Buch“).</div></div></div>'};
ACT.tagMood=function(j){var d=currentDay();S.diary[d].mood=+j;save();rerender()};
ACT.tagBest=function(b){var e=S.diary[currentDay()];e.best=e.best||[];var i=e.best.indexOf(b);if(i>-1)e.best.splice(i,1);else e.best.push(b);save();rerender()};
ACT.tagW=function(j){S.diary[currentDay()].w=+j;save();rerender()};
ACT.tagText=function(v){S.diary[currentDay()].text=v;save()};
function currentDay(){var p=(location.hash.replace(/^#/,'')||'').split('/');var d=p[2];var days=tripDays();var cur=days.indexOf(d)>-1?d:(days.indexOf(today())>-1?today():days[0]);S.diary[cur]=S.diary[cur]||{};return cur}

/* ---------- Entdecker-Buch ---------- */
function starsTotal(){var n=0;for(var k in S.auf.stars)n+=S.auf.stars[k];return n}
var TITLES=[
 ['Packprofi','Mindestens die Hälfte der Packliste abgehakt',function(){var p=packStats();return p.n&&p.d/p.n>=.5}],
 ['Schildkröten-Spürnase','Die Säulen-Schildkröten gefunden',function(){return !!S.wes.found.schild}],
 ['Drachenjäger','Den Dach-Drachen gefunden',function(){return !!S.wes.found.drache}],
 ['Wunder-Sammler','5 Wesen gefunden',function(){return Object.keys(S.wes.found).length>=5}],
 ['Kapitän','10 Sterne bei den Aufträgen',function(){return starsTotal()>=10}],
 ['Windflüsterer','3 Kapitel gelesen',function(){return Object.keys(S.wissen.read).length>=3}],
 ['Flug-Professor','Alle 8 Kapitel gelesen',function(){return Object.keys(S.wissen.read).length>=8}],
 ['Tüftler','10 Papierflieger-Würfe',function(){return S.hgr.log.length>=10}],
 ['Stadtläufer','10 Orte im Stadtplan besucht',function(){return Object.keys(S.stadt.done).length>=10}],
 ['Tagebuch-Autor','3 Tage Tagebuch geschrieben',function(){var n=0;for(var k in S.diary)if(S.diary[k].text)n++;return n>=3}]
];
ROUTES.samm=function(){var t=TITLES.map(function(x){var ok=x[2]();return '<div class="card" style="padding:14px 18px;opacity:'+(ok?1:.55)+'"><div class="row"><span class="disp" style="font-size:34px;color:'+(ok?'#49C5B6':'#B8BEC2')+'">'+(ok?'★':'☆')+'</span><div><b>'+esc(x[0])+'</b><div class="muted">'+esc(x[1])+'</div></div></div></div>'}).join('');
 var got=TITLES.filter(function(x){return x[2]()}).length;var ch=WISSEN.map(function(w){return '<span class="tag" style="background:'+(S.wissen.read[w.id]?w.c:'#E5E5E5')+'">'+esc(w.t)+'</span>'}).join(' ');
 return topbar('ENTDECKER-BUCH','Dein Buch','/')+'<div class="grid2" style="align-items:start"><div class="col"><div class="dark"><span class="tab">DEIN STAND</span><div class="grid3"><div><div class="disp" style="font-size:54px;color:#ECD06F">'+got+'</div><div class="mono">Titel</div></div><div><div class="disp" style="font-size:54px;color:#ECD06F">'+Object.keys(S.wes.found).length+'</div><div class="mono">Wesen</div></div><div><div class="disp" style="font-size:54px;color:#ECD06F">'+starsTotal()+'</div><div class="mono">Sterne</div></div></div></div><div class="card"><div class="mono">Kapitel gelesen</div><div class="wrap" style="margin-top:8px">'+ch+'</div></div><div class="card"><div class="mono">Tüftel-Hangar</div><p>Weitester Wurf: <b>'+fmt(S.hgr.best)+' m</b> · Würfe: <b>'+S.hgr.log.length+'</b></p></div></div><div class="col">'+t+'</div></div>'};
