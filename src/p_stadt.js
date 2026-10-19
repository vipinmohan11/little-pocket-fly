/* ===== Stadtplan: restored offline map from the family plan (sea, coast, avenues, parks, districts, all places, zoom/pan, GPS) + optional street map with WLAN ===== */
var MB={n:41.423,s:41.358,w:2.125,e:2.215},MCF=Math.cos(41.39*Math.PI/180),MW=1000,MSC=MW/((MB.e-MB.w)*MCF),MH=Math.round((MB.n-MB.s)*MSC);
function MX(lng){return +((lng-MB.w)*MCF*MSC).toFixed(1)}function MY(lat){return +((MB.n-lat)*MSC).toFixed(1)}
function mpoly(p){return p.map(function(a){return MX(a[1])+','+MY(a[0])}).join(' ')}
var M_SEA=[[41.358,2.176],[41.370,2.1785],[41.3755,2.1790],[41.3772,2.1800],[41.3800,2.1855],[41.3790,2.1876],[41.3700,2.1879],[41.3685,2.1892],[41.3722,2.1930],[41.3790,2.1946],[41.3850,2.2003],[41.3900,2.2053],[41.3950,2.2110],[41.3990,2.2150],[41.358,2.2150]];
var M_PIER=[[41.3768,2.1806],[41.3772,2.1852],[41.3744,2.1852],[41.3740,2.1810]];
var M_PARKS=[['Ciutadella',[[41.3905,2.1830],[41.3912,2.1880],[41.3862,2.1925],[41.3842,2.1878]]],['Montjuïc',[[41.3720,2.1530],[41.3730,2.1640],[41.3690,2.1720],[41.3600,2.1720],[41.3560,2.1600],[41.3600,2.1480],[41.3680,2.1450]]],['Park Güell',[[41.4160,2.1495],[41.4168,2.1545],[41.4140,2.1572],[41.4120,2.1545],[41.4125,2.1500]]],['Bunker',[[41.4205,2.1600],[41.4205,2.1640],[41.4175,2.1645],[41.4172,2.1605]]]];
var M_ROADS=[
 ['Diagonal',[[41.3765,2.1250],[41.3855,2.1400],[41.3940,2.1520],[41.4000,2.1620],[41.4040,2.1760],[41.4090,2.1900],[41.4140,2.2050]],6],
 ['Gran Via',[[41.3750,2.1492],[41.3800,2.1600],[41.3870,2.1701],[41.3910,2.1806],[41.3990,2.2000]],6],
 ['Passeig de Gràcia',[[41.3870,2.1701],[41.3958,2.1610],[41.4000,2.1555]],5],
 ['La Rambla',[[41.3870,2.1701],[41.3758,2.1778]],4],
 ['Via Laietana',[[41.3878,2.1747],[41.3810,2.1810]],4],
 ['Paral·lel',[[41.3758,2.1778],[41.3742,2.1650],[41.3752,2.1500]],5],
 ['Pg. Sant Joan',[[41.3910,2.1806],[41.4025,2.1660]],4],
 ['Av. Gaudí',[[41.4049,2.1763],[41.4114,2.1744]],3],
 ['Gran de Gràcia',[[41.4000,2.1555],[41.4085,2.1525]],3],
 ['Pg. Colom',[[41.3758,2.1778],[41.3800,2.1830],[41.3838,2.1855]],4]];
var M_AREAS=[['Eixample',41.3935,2.1555],['Gràcia',41.4085,2.1600],['Gòtic',41.3812,2.1702],['El Born',41.3868,2.1795],['Barceloneta',41.3740,2.1960],['Montjuïc',41.3640,2.1585],['Poble Sec',41.3765,2.1585],['Sarrià',41.4185,2.1340],['Poblenou',41.4045,2.2010],['Mittelmeer',41.3640,2.2000]];
var ME=null,MSEL=null,MTAB='route';
function mapSvg(d){var hl=d.stops.concat(S.stadt.showX?d.extras:[]);
 var s='<svg viewBox="0 0 '+MW+' '+MH+'" style="width:'+(S.stadt.zoom*100)+'%;height:auto" role="img" aria-label="Karte"><rect width="'+MW+'" height="'+MH+'" fill="#F3EEE2"/>';
 s+='<g opacity=".5">';for(var gx=0;gx<MW;gx+=26)s+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+MH+'" stroke="#E7E0D0" stroke-width="1"/>';s+='</g>';
 M_PARKS.forEach(function(p){s+='<polygon points="'+mpoly(p[1])+'" fill="#CFE8C8" stroke="#B5DBAA" stroke-width="2"/>'});
 s+='<polygon points="'+mpoly(M_SEA)+'" fill="#9ACDEB"/><polygon points="'+mpoly(M_PIER)+'" fill="#F3EEE2"/>';
 M_ROADS.forEach(function(r){s+='<polyline points="'+mpoly(r[1])+'" fill="none" stroke="#fff" stroke-width="'+(r[2]+4)+'" stroke-linecap="round" stroke-linejoin="round"/><polyline points="'+mpoly(r[1])+'" fill="none" stroke="#E2D8C3" stroke-width="'+r[2]+'" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>'});
 M_ROADS.forEach(function(r){var a=r[1][0],b=r[1][r[1].length-1],ang=Math.atan2(MY(b[0])-MY(a[0]),MX(b[1])-MX(a[1]))*180/Math.PI;if(ang>90)ang-=180;if(ang<-90)ang+=180;var m=r[1][Math.floor(r[1].length/2)];
  s+='<text x="'+MX(m[1])+'" y="'+(MY(m[0])-7)+'" font-size="11" fill="#9C8F76" text-anchor="middle" font-family="Figtree" font-weight="700" transform="rotate('+ang.toFixed(0)+' '+MX(m[1])+' '+(MY(m[0])-7)+')">'+r[0]+'</text>'});
 M_AREAS.forEach(function(a){s+='<text x="'+MX(a[2])+'" y="'+MY(a[1])+'" font-size="20" fill="#A99E88" text-anchor="middle" font-family="Big Shoulders Display" font-weight="800" letter-spacing="3">'+a[0].toUpperCase()+'</text>'});
 CITY.forEach(function(dd){dd.stops.concat(dd.extras).forEach(function(p){if(hl.indexOf(p)>-1)return;s+='<circle cx="'+MX(p.lng)+'" cy="'+MY(p.lat)+'" r="5" fill="#8796A3" opacity=".4"/>'})});
 s+='<polyline points="'+d.stops.map(function(p){return MX(p.lng)+','+MY(p.lat)}).join(' ')+'" fill="none" stroke="#2779A7" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>';
 hl.forEach(function(p){var x=MX(p.lng),y=MY(p.lat),r=p.x?13:17,on=MSEL===p.id,dn=S.stadt.done[p.id];var fill=dn?'#49C5B6':p.x?'#ECD06F':p.k==='eat'?'#FFFDF8':'#13324A',tc=dn||p.x||p.k==='eat'?'#13324A':'#fff';
  s+='<g data-act="mapSel" data-a="'+p.id+'" style="cursor:pointer"><circle cx="'+x+'" cy="'+y+'" r="'+(r+14)+'" fill="transparent"/>'+(on?'<circle cx="'+x+'" cy="'+y+'" r="'+(r+9)+'" fill="#FF6A52" opacity=".25"/>':'')+'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+(on?'#FF6A52':'#13324A')+'" stroke-width="'+(on?5:2.5)+'"/><text x="'+x+'" y="'+(y+5.5)+'" font-size="'+(p.x?13:16)+'" font-weight="800" text-anchor="middle" fill="'+tc+'" font-family="Figtree">'+(dn?'✓':p.x?'+':p.idx+1)+'</text></g>'});
 if(ME){var mx=MX(ME.lng),my=MY(ME.lat);s+='<circle cx="'+mx+'" cy="'+my+'" r="28" fill="#2779A7" opacity=".18"/><circle cx="'+mx+'" cy="'+my+'" r="11" fill="#2779A7" stroke="#fff" stroke-width="4"/>'}
 return s+'</svg>'}
function kmd(a,b){var r=Math.PI/180,dl=(b.lat-a.lat)*r,dn=(b.lng-a.lng)*r;var x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dn/2)*Math.sin(dn/2);return 12742*Math.asin(Math.sqrt(x))}
function walkKm(a,b){return kmd(a,b)*1.3}
function minsOf(k){return Math.max(1,Math.round(k/4.3*60))}
function fmtKm(k){return k<1?Math.round(k*100)*10+' m':fmt(k.toFixed(1))+' km'}
function qn(n){return encodeURIComponent(n.replace(/\s*\(.*?\)/g,'')+', Barcelona')}
function mapsUrl(n){return 'https://www.google.com/maps/search/?api=1&query='+qn(n)}
function dirUrl(a,b){return 'https://www.google.com/maps/dir/?api=1&travelmode=walking&origin='+(a.n?qn(a.n):a.lat+','+a.lng)+'&destination='+qn(b.n)}
function dayKm(d){var t=0;for(var i=1;i<d.stops.length;i++){if(!TRANSIT[d.id+':'+d.stops[i].id])t+=walkKm(d.stops[i-1],d.stops[i])}return t}
function routeLinks(d){var st=d.stops,parts=[],i=0;while(i<st.length-1){parts.push(st.slice(i,i+5));i+=4}
 return parts.map(function(seg,pi){var u='https://www.google.com/maps/dir/?api=1&travelmode=walking&origin='+qn(seg[0].n)+'&destination='+qn(seg[seg.length-1].n);var mid=seg.slice(1,-1);if(mid.length)u+='&waypoints='+mid.map(function(s){return qn(s.n)}).join('%7C');
 return '<a class="b s" href="'+u+'" target="_blank" rel="noopener">Route '+(pi+1)+'/'+parts.length+' ↗</a>'}).join('')}
function stadtDay(){var td=tripDayOf(today());if(S.stadt.auto!==false&&td>-1&&td<CITY.length&&S.stadt.autoFor!==today()){S.stadt.day=td;S.stadt.autoFor=today()}return Math.min(CITY.length-1,Math.max(0,S.stadt.day))}
ROUTES.stadt=function(){var di=stadtDay(),d=CITY[di];
 var days=seg(CITY.map(function(x,i){return[String(i),'Tag '+(i+1)]}),String(di),'stadtDay');
 var done=d.stops.filter(function(s){return S.stadt.done[s.id]}).length;
 var mapPanel=S.stadt.osm?osmFrame(d):'<div id="mapbox" class="scroll" style="position:absolute;inset:0;overflow:auto;border-radius:20px">'+mapSvg(d)+'</div>';
 var ctr='<div style="position:absolute;right:12px;top:12px;display:flex;flex-direction:column;gap:8px;z-index:3">'+(S.stadt.osm?'':'<button class="ib" data-act="mapZoom" data-a="1" aria-label="Vergrößern">+</button><button class="ib" data-act="mapZoom" data-a="-1" aria-label="Verkleinern">−</button>')+'</div>'+
  '<div style="position:absolute;left:12px;top:12px;display:flex;gap:8px;z-index:3;flex-wrap:wrap"><button class="chip'+(S.stadt.osm?'':' on')+'" data-act="mapOsm" data-a="0">Reisekarte</button><button class="chip'+(S.stadt.osm?' on':'')+'" data-act="mapOsm" data-a="1">Straßenkarte (WLAN)</button>'+(S.stadt.osm?'':'<button class="chip'+(S.stadt.showX?' on':'')+'" data-act="mapX">+ Extras</button><button class="chip" data-act="mapGps">'+ICON(IC.compass).replace('<svg','<svg width="16" height="16"')+'Ich bin hier</button>')+'</div>';
 var pop=MSEL&&PLACE[MSEL]?selPop(PLACE[MSEL]):'';
 var tabs=seg([['route','Route'],['such','Suchliste'],['mehr','Mehr'],['tipps','Tipps']],MTAB,'stadtTab');
 var panel=MTAB==='such'?suchHtml(d):MTAB==='mehr'?mehrHtml(d):MTAB==='tipps'?tippsHtml():routeHtml(d);
 return screen(head('STADTPLAN · '+esc(S.trip.name).toUpperCase(),'Unsere Route','/',days),
 '<div style="display:grid;grid-template-columns:minmax(0,1fr) 430px;gap:14px;height:100%">'+
 '<div class="pn" style="position:relative;overflow:hidden;background:#F3EEE2">'+mapPanel+ctr+pop+'</div>'+
 '<div class="col" style="min-height:0;gap:10px"><div class="dark" style="padding:14px 18px"><span class="lab">Tag '+(di+1)+' · '+esc(d.area)+'</span><h2 class="disp" style="font-size:28px;margin:4px 0">'+esc(d.title)+'</h2><p style="font-size:13.5px;color:#CFE0EA">'+esc(d.lede)+'</p><div class="wrap" style="margin-top:8px"><span class="tag" style="background:rgba(255,255,255,.14);color:#fff">'+fmt(dayKm(d).toFixed(1))+' km zu Fuß</span><span class="tag" style="background:rgba(255,255,255,.14);color:#fff">'+done+'/'+d.stops.length+' besucht</span><span class="tag" style="background:rgba(255,255,255,.14);color:#fff">ca. '+esc(d.budget)+'</span></div></div>'+
 '<div>'+tabs+'</div><div class="pn scroll" data-keep="stadtlist" style="flex:1;min-height:0;padding:8px 12px">'+panel+'</div></div></div>')};
ROUTES['post:stadt']=function(){var box=$('#mapbox');if(!box)return;var d=CITY[stadtDay()];var pts=MSEL&&PLACE[MSEL]?[PLACE[MSEL]]:d.stops;var cx=0,cy=0;pts.forEach(function(p){cx+=MX(p.lng);cy+=MY(p.lat)});cx/=pts.length;cy/=pts.length;
 var w=box.clientWidth*S.stadt.zoom,h=w*MH/MW;box.scrollLeft=cx/MW*w-box.clientWidth/2;box.scrollTop=cy/MH*h-box.clientHeight/2;
 if(MSEL){var r=$('#st-'+MSEL);if(r)r.scrollIntoView({block:'nearest'})}};
function osmFrame(d){var pts=MSEL&&PLACE[MSEL]?[PLACE[MSEL]]:d.stops;var la=pts.map(function(p){return p.lat}),lo=pts.map(function(p){return p.lng});var pad=MSEL?.004:.003;
 var bb=[Math.min.apply(0,lo)-pad,Math.min.apply(0,la)-pad,Math.max.apply(0,lo)+pad,Math.max.apply(0,la)+pad].map(function(x){return x.toFixed(4)}).join(',');var mk=MSEL&&PLACE[MSEL]?'&marker='+PLACE[MSEL].lat+','+PLACE[MSEL].lng:'';
 return navigator.onLine===false?'<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:30px"><div><b>Keine Internetverbindung.</b><p class="muted">Die Straßenkarte braucht WLAN. Die Reisekarte funktioniert immer.</p></div></div>':'<iframe title="Straßenkarte" src="https://www.openstreetmap.org/export/embed.html?bbox='+bb+'&layer=mapnik'+mk+'" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>'}
function selPop(p){var dn=S.stadt.done[p.id];var near=ME?' · '+minsOf(walkKm(ME,p))+' Min. zu Fuß von dir':'';
 return '<div style="position:absolute;left:12px;right:12px;bottom:12px;z-index:4;background:var(--paper);border-radius:18px;border:1.5px solid var(--line);padding:12px 14px;display:flex;gap:12px;align-items:center;animation:vin .25s"><div style="flex:1;min-width:0"><span class="lab">Tag '+(p.day+1)+' · '+(p.x?esc(p.cat):KIND[p.k]+' · '+esc(p.t))+near+'</span><b style="display:block;font-size:17px">'+esc(pdisp(p))+'</b><span style="font-size:14px">'+esc(p.kid)+'</span></div><div class="col" style="gap:6px"><button class="b s '+(dn?'t':'p')+'" data-act="stadtDone" data-a="'+p.id+'">'+(dn?'Besucht ✓':'Hier gewesen')+'</button><a class="b s" href="'+(ME?dirUrl(ME,p):mapsUrl(p.n))+'" target="_blank" rel="noopener">'+(ME?'Weg dorthin ↗':'Google Maps ↗')+'</a></div><button class="ib" data-act="mapSel" data-a="" aria-label="Schließen">×</button></div>'}
function routeHtml(d){return d.stops.map(function(s,i){var tr=TRANSIT[d.id+':'+s.id];var leg=i>0?'<div class="lab" style="margin:0 0 0 46px;color:#2779A7;letter-spacing:.04em;text-transform:none">'+(tr?esc(tr):'zu Fuß '+minsOf(walkKm(d.stops[i-1],s))+' Min. · '+fmtKm(walkKm(d.stops[i-1],s)))+'</div>':'';
  var dn=S.stadt.done[s.id],open=MSEL===s.id;
  return leg+'<div id="st-'+s.id+'" style="display:flex;gap:10px;padding:6px 0;align-items:flex-start"><button data-act="stadtDone" data-a="'+s.id+'" aria-label="besucht" style="width:36px;height:36px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:800;background:'+(dn?'#49C5B6':s.k==='eat'?'#FFFDF8':'#13324A')+';color:'+(dn||s.k==='eat'?'#13324A':'#fff')+';border:2px solid #13324A">'+(dn?'✓':i+1)+'</button><div style="flex:1;min-width:0"><button data-act="mapSel" data-a="'+(open?'':s.id)+'" style="text-align:left;width:100%"><b style="font-size:16px;'+(open?'color:#FF6A52':'')+'">'+esc(pdisp(s))+'</b><span class="lab" style="display:block;letter-spacing:.05em">'+KIND[s.k]+' · '+esc(s.t)+'</span></button>'+(open?stopDetail(s):'')+'</div></div>'}).join('')+'<div class="wrap" style="margin:10px 0 4px">'+routeLinks(d)+'</div>'}
function stopDetail(s){return '<div style="margin-top:6px;font-size:14px"><div style="background:var(--sand);border-radius:12px;padding:8px 10px;font-weight:700">'+esc(s.kid)+'</div><details style="margin-top:6px"><summary class="lab" style="cursor:pointer;padding:4px 0">Info für Eltern (Englisch)</summary><p style="margin:4px 0">'+esc(s.why)+'</p><p class="muted"><b>Preis:</b> '+esc(s.c)+(s.h?' · <b>Zeiten:</b> '+esc(s.h):'')+'</p>'+(s.tip?'<p class="muted"><b>Tip:</b> '+esc(s.tip)+'</p>':'')+'</details></div>'}
function suchHtml(d){var n=d.spot.filter(function(_,i){return S.wes.spot[d.id+'-'+i]}).length;return '<div class="row" style="padding:6px 4px"><b>Such-Liste von Tag '+(CITY.indexOf(d)+1)+'</b><div class="sp"></div><span class="lab">'+n+'/'+d.spot.length+'</span></div>'+d.spot.map(function(s,i){var k=d.id+'-'+i,on=S.wes.spot[k];return '<button class="ck'+(on?' on':'')+'" data-act="spotTick" data-a="'+k+'"><span class="bx">'+(on?CHECK:'')+'</span><span class="tx">'+esc(s)+'</span></button>'}).join('')+'<p class="muted" style="font-size:13px;margin:10px 4px">Alles gefunden? Das gibt einen Stempel im Reisepass.</p>'}
function mehrHtml(d){return '<div class="lab" style="padding:6px 4px">Wenn noch Zeit ist</div>'+d.extras.map(function(s){var open=MSEL===s.id;return '<div id="st-'+s.id+'" style="padding:6px 4px;border-top:1px solid var(--line)"><button data-act="mapSel" data-a="'+(open?'':s.id)+'" style="text-align:left;width:100%"><span class="tag" style="background:#ECD06F">'+esc(s.cat)+'</span> <b>'+esc(pdisp(s))+'</b></button>'+(open?stopDetail(s):'')+'</div>'}).join('')+
 '<div class="lab" style="padding:12px 4px 4px">Wenn es regnet</div><ul style="margin:0;padding-left:20px;font-size:14px">'+d.rain.map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul><div class="lab" style="padding:12px 4px 4px">Wusstest du?</div><ul style="margin:0;padding-left:20px;font-size:14px">'+d.facts.map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ul>'}
function tippsHtml(){return STADT_TIPS.map(function(t,i){return '<details'+(i===0?' open':'')+' style="border-top:1px solid var(--line);padding:8px 4px"><summary style="font-weight:800;cursor:pointer">'+t[0]+'</summary><div style="font-size:14px">'+t[1]+'</div></details>'}).join('')+'<p class="muted" style="font-size:12px;margin:8px 4px">Preise und Zeiten Oktober 2026. Nur auf offiziellen Seiten buchen.</p>'}
ACT.stadtDay=function(i){S.stadt.day=+i;S.stadt.autoFor=today();MSEL=null;save();rerender();ROUTES['post:stadt']()};
ACT.stadtTab=function(t){MTAB=t;rerender()};
ACT.mapSel=function(id){MSEL=id||null;if(id&&MTAB!=='route'&&MTAB!=='mehr')MTAB=PLACE[id]&&PLACE[id].x?'mehr':'route';if(id&&PLACE[id]&&PLACE[id].day!==S.stadt.day){S.stadt.day=PLACE[id].day;S.stadt.autoFor=today()}rerender();if(id)ROUTES['post:stadt']()};
ACT.mapZoom=function(z){var box=$('#mapbox');var fx=box?(box.scrollLeft+box.clientWidth/2)/box.scrollWidth:.5,fy=box?(box.scrollTop+box.clientHeight/2)/box.scrollHeight:.5;
 S.stadt.zoom=Math.max(1,Math.min(4,S.stadt.zoom*(+z>0?1.35:1/1.35)));save();rerender();box=$('#mapbox');if(box){box.scrollLeft=fx*box.scrollWidth-box.clientWidth/2;box.scrollTop=fy*box.scrollHeight-box.clientHeight/2}};
ACT.mapX=function(){S.stadt.showX=!S.stadt.showX;save();rerender()};
ACT.mapOsm=function(v){S.stadt.osm=v==='1';save();rerender();ROUTES['post:stadt']()};
ACT.stadtDone=function(id){S.stadt.done[id]=!S.stadt.done[id];if(!S.stadt.done[id])delete S.stadt.done[id];else toast(S.names.mascot+' hakt '+pname(id)+' ab.');save();rerender()};
ACT.spotTick=function(k){S.wes.spot[k]=!S.wes.spot[k];if(!S.wes.spot[k])delete S.wes.spot[k];save();rerender()};
ACT.mapGps=function(){if(!navigator.geolocation){toast('GPS ist hier nicht verfügbar.');return}toast('Suche deinen Standort …');
 navigator.geolocation.getCurrentPosition(function(p){var g={lat:p.coords.latitude,lng:p.coords.longitude};if(kmd(g,{lat:41.3870,lng:2.1701})>25){toast('Du bist noch nicht in Barcelona.');return}ME=g;
  var all=[];CITY.forEach(function(d){all=all.concat(d.stops,d.extras)});all.sort(function(a,b){return walkKm(g,a)-walkKm(g,b)});MSEL=all[0].id;S.stadt.day=all[0].day;S.stadt.autoFor=today();rerender();ROUTES['post:stadt']();toast('Am nächsten: '+pname(all[0].id))},
  function(){toast('Standort nicht gefunden. GPS erlauben?')},{enableHighAccuracy:true,timeout:10000,maximumAge:60000})};
