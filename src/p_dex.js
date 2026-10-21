/* ===== v1.7.0: Muya-Dex wie ein Sammelalbum: Nummern, Typen, Entwicklung, Steckbrief ===== */
var DTYPES={wasser:['Wasser','#3B8FE0'],pflanze:['Pflanze','#3FA35B'],feuer:['Feuer','#E8673A'],stein:['Stein','#9A7B5E'],blitz:['Blitz','#D9A514'],traum:['Traum','#8E6CD6'],drache:['Drache','#2FA58E'],glanz:['Glanz','#D97FAE'],himmel:['Himmel','#4F9FD3'],luft:['Luft','#6FA8D2'],kunst:['Kunst','#D9668F']};
var DSPT={knick:'kunst',gleit:'luft',woelk:'luft',nebbi:'luft',kompi:'stein',nordi:'drache',mosi:'kunst',scherb:'kunst',funki:'glanz',mondi:'traum',bunt:'glanz',rakki:'feuer',
 flamm:'feuer',blatti:'pflanze',plansch:'wasser',felsi:'stein',pilzi:'pflanze',schlumm:'traum',blitzi:'blitz',drachi:'drache',muschi:'wasser',eisi:'wasser',goldi:'glanz',kristo:'stein',regenb:'glanz',schatti:'traum',
 fluegi:'himmel',jetti:'himmel',ballo:'himmel',segel:'himmel',kapi:'himmel',sternli:'himmel'};
/* Steckbrief: [Größe, Lieblingsessen, Kraft] */
var DFACT={
 knick:['so groß wie ein Briefumschlag','Butterkekse','faltet sich in jede Form'],
 gleit:['so groß wie eine Taube','Brezeln','segelt weit, ohne mit den Flügeln zu schlagen'],
 woelk:['so groß wie ein Kissen','Zuckerwatte','macht Schatten an heißen Tagen'],
 nebbi:['so groß wie ein Teddy','warmer Kakao','wird im Nebel unsichtbar'],
 kompi:['so groß wie ein Apfel','Eiscreme','findet immer Norden'],
 nordi:['so groß wie eine Katze','warme Churros','findet immer den Weg nach Hause'],
 mosi:['so groß wie ein Fußball','bunte Gummibärchen','glitzert in allen Farben'],
 scherb:['so groß wie ein Hase','Orangen','macht aus Scherben etwas Schönes'],
 funki:['so groß wie eine Tasse','Honigbrot','leuchtet bei schönen Erinnerungen'],
 mondi:['so groß wie ein Kissen','warme Milch','erzählt Gute-Nacht-Geschichten'],
 bunt:['so groß wie ein Rucksack','Obstsalat','macht alles bunt'],
 rakki:['so groß wie ein Hund','Bananen','ist beim Start immer mutig'],
 flamm:['so groß wie eine Kerze','geröstete Kastanien','wärmt kalte Hände'],
 blatti:['so groß wie ein Blumentopf','frische Erdbeeren','lässt Blumen wachsen'],
 plansch:['so groß wie eine Ente','Wassermelone','spritzt kleine Fontänen'],
 felsi:['so groß wie ein Stein am Strand','Knäckebrot','ist stark wie ein Fels'],
 pilzi:['so groß wie ein Pilz im Wald','Nüsse','versteckt sich unter seinem Hut'],
 schlumm:['so groß wie ein Kuscheltier','Milchreis','schläft überall ein'],
 blitzi:['so groß wie ein Fuchs','Zitroneneis','rennt schneller als der Wind'],
 drachi:['so groß wie ein Hund','Paella','pustet riesige Seifenblasen'],
 muschi:['so groß wie eine Muschel','Algenchips','hört das Meer von überall'],
 eisi:['so groß wie eine Eiskugel','Sorbet','kühlt an heißen Tagen'],
 goldi:['so groß wie eine Katze','Schokotaler','bringt Glück'],
 kristo:['so groß wie ein Glas','Kandiszucker','malt Regenbogen mit Sonnenlicht'],
 regenb:['so groß wie ein Schaf','Regentropfen-Bonbons','macht jeden Tag schöner'],
 schatti:['so groß wie ein Schatten am Abend','Lakritz','versteckt sich überall'],
 fluegi:['so groß wie ein Papierflieger','Papierschnipsel','fliegt schon beim ersten Wurf'],
 jetti:['so groß wie ein Spielzeug-Jet','Gummibärchen','fliegt superschnell'],
 ballo:['so groß wie ein Luftballon','Popcorn','schwebt ganz ruhig'],
 segel:['so groß wie ein Drachen','Kekse','segelt stundenlang im Aufwind'],
 kapi:['so groß wie eine Mütze','Fischbrötchen','kennt jedes Flugzeug'],
 sternli:['so groß wie ein Stern am Himmel','Sternfrüchte','kennt jeden Himmelsrekord']};
function dtype(s){return DSPT[s.id]||'stein'}
function dnr(s){return ('00'+(SPEC.indexOf(s)+1)).slice(-3)}
function tyb(t,big){var x=DTYPES[t];return '<span class="tyb'+(big?' big':'')+'" style="background:'+x[1]+'">'+x[0]+'</span>'}
function dwhere(s){if(s.src==='sky')return 'am Himmel und im Tüftel-Hangar';var th=speciesThemes(s.id);return th.length?th.map(function(t){return THEMES_N[t]}).join(' oder '):'überall in der Stadt'}
function dexHtml(){var m=S.mu,ft=m.ft&&DTYPES[m.ft]?m.ft:'all',list=SPEC.filter(function(s){return ft==='all'||dtype(s)===ft}),own=muOwned().length;
 var chips='<div class="tchips"><button class="tchip'+(ft==='all'?' on':'')+'" data-act="dexType" data-a="all">Alle</button>'+Object.keys(DTYPES).map(function(k){return '<button class="tchip'+(ft===k?' on':'')+'" data-act="dexType" data-a="'+k+'"><i style="background:'+DTYPES[k][1]+'"></i>'+DTYPES[k][0]+'</button>'}).join('')+'</div>';
 var cards=list.map(function(s){var p=m.pets[s.id],t=dtype(s);if(p){var st=petStage(s.id);return '<button class="dc own" data-act="muSel" data-a="'+s.id+'" style="--tc:'+DTYPES[t][1]+'"><span class="dtop"><span class="nr">'+dnr(s)+'</span>'+tyb(t)+'</span><span class="dpic">'+cre(s,st,0,p.shiny)+'</span><b>'+esc(s.n[st-1])+'</b><span class="dst">'+[1,2,3].map(function(k){return '<i class="'+(k<=st?'on':'')+'"></i>'}).join('')+'</span></button>'}
  return '<button class="dc none" data-act="muSel" data-a="'+s.id+'"><span class="dtop"><span class="nr">'+dnr(s)+'</span></span><span class="dpic q">?</span><b>? ? ?</b></button>'}).join('');
 return '<div class="dexw"><div class="dexbar">'+chips+'</div><div class="dgrid">'+cards+'</div></div>'}
ACT.dexType=function(t){S.mu.ft=t;save();rerender()};
ACT.muSel=function(id){var s=SPEC_BY[id];if(!s)return;S.mu.sel=id;save();var m=S.mu,p=m.pets[id],t=dtype(s),f=DFACT[id]||['','',''],col=DTYPES[t][1];
 if(!p){sheet('<div class="dbig" style="--tc:var(--ink3)"><div class="dbh"><span class="nr">Nr. '+dnr(s)+'</span><div class="sp"></div><button class="x" data-act="closeSheet">✕</button></div><div class="dbpic">'+cre(s,1,1)+'</div><h2>Unbekannter Freund</h2><p class="dsub">Noch nicht gefangen</p><div class="facts"><div style="grid-column:1/-1"><span>Lebt gern</span><b>'+esc(dwhere(s))+'</b></div></div><p class="story">'+(s.src==='sky'?'So findest du ihn: '+esc(s.hint||''):'Geh mit Mama und Papa an so einen Ort. Wenn „Heiß“ kommt, ist er vielleicht da!')+'</p></div>');return}
 var st=petStage(id),ng=nextGrow(id),when=new Date(p.t||Date.now()),wd=('0'+when.getDate()).slice(-2)+'.'+('0'+(when.getMonth()+1)).slice(-2)+'.';
 sheet('<div class="dbig" style="--tc:'+col+'"><div class="dbh"><span class="nr">Nr. '+dnr(s)+'</span>'+tyb(t,1)+(p.shiny?'<span class="tyb big" style="background:#B58AE8">✦ Funkel</span>':'')+'<div class="sp"></div><button class="x" data-act="closeSheet">✕</button></div>'+
  '<div class="dbpic">'+cre(s,st,0,p.shiny)+'</div><h2>'+esc(s.n[st-1])+'</h2><p class="dsub">Stufe '+st+' von 3 · '+(p.n||1)+'× gefunden'+(m.buddy===id?' · dein Begleiter':'')+'</p>'+
  '<div class="chain">'+[1,2,3].map(function(k){return '<div class="ch'+(k===st?' cur':'')+(k>st?' lock':'')+'"><div>'+cre(s,k,k>st,p.shiny)+'</div><span>'+(k<=st?esc(s.n[k-1]):'?')+'</span><small>'+(k===1?'1× finden':k===2?'2× finden':'4× finden')+'</small></div>'+(k<3?'<span class="arr">›</span>':'')}).join('')+'</div>'+
  (ng?'<p class="dgrow">Noch '+ng+'× finden, dann wächst '+esc(s.n[st-1])+'!</p>':'<p class="dgrow">Voll entwickelt!</p>')+
  '<div class="facts"><div><span>Größe</span><b>'+esc(f[0])+'</b></div><div><span>Lieblingsessen</span><b>'+esc(f[1])+'</b></div><div><span>Kraft</span><b>'+esc(f[2])+'</b></div><div><span>Lebt gern</span><b>'+esc(dwhere(s))+'</b></div><div style="grid-column:1/-1"><span>Gefunden</span><b>'+esc(p.where||(s.src==='sky'?'im Himmel':'unterwegs'))+' · '+wd+'</b></div></div>'+
  '<p class="story">'+esc(s.story)+'</p>'+(m.buddy===id?'':'<button class="b p" style="width:100%;margin-top:12px" data-act="dexBuddy" data-a="'+id+'">Als Begleiter wählen</button>')+'</div>')};
ACT.dexBuddy=function(id){S.mu.buddy=id;save();closeSheet();rerender();toast(SPEC_BY[id].n[petStage(id)-1]+' begleitet dich jetzt.')};
