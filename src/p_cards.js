/* ===== v1.9.0: Postkarten (gezeichnet je Ortsart) und Geräusche (5 s) im Tagebuch ===== */
function cardMotif(th){var o='<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">';
 if(th==='meer')o+='<rect width="320" height="180" fill="#BFE3F2"/><circle cx="250" cy="48" r="22" fill="#FFE7A0"/><path d="M0 110h320v70H0z" fill="#4FA3D1"/><path d="M0 116c30-8 50 8 80 0s50-8 80 0 50 8 80 0 50-8 80 0" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/><path d="M0 140c30-8 50 8 80 0s50-8 80 0 50 8 80 0 50-8 80 0" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/><path d="M110 108l22-48v48z" fill="#fff"/><path d="M98 110h44l-6 10h-32z" fill="#E8673A"/><path d="M0 160h320v20H0z" fill="#F3E2BE"/>';
 else if(th==='park')o+='<rect width="320" height="180" fill="#DDF0E2"/><circle cx="60" cy="44" r="18" fill="#FFE7A0"/><path d="M0 130c60-30 120-30 180-10s100 10 140-5v65H0z" fill="#8CCB8F"/><path d="M0 150c80-20 160-10 320-20v50H0z" fill="#5FAE6B"/>'+[[70,112],[120,100],[230,108],[270,118]].map(function(p){return '<rect x="'+(p[0]-3)+'" y="'+p[1]+'" width="6" height="22" fill="#8B6B4A"/><circle cx="'+p[0]+'" cy="'+(p[1]-8)+'" r="18" fill="#3FA35B"/>'}).join('');
 else if(th==='kunst')o+='<rect width="320" height="180" fill="#F6E7D3"/><circle cx="262" cy="46" r="20" fill="#FFE7A0"/>'+[[110,40,26],[140,20,30],[175,36,26],[205,56,20]].map(function(t){return '<path d="M'+t[0]+' 150V'+(t[1]+t[2]*1.5)+'Q'+t[0]+' '+(t[1]+t[2]*.6)+' '+(t[0]+t[2]/2)+' '+t[1]+'Q'+(t[0]+t[2])+' '+(t[1]+t[2]*.6)+' '+(t[0]+t[2])+' '+(t[1]+t[2]*1.5)+'V150z" fill="#D9A97E"/><circle cx="'+(t[0]+t[2]/2)+'" cy="'+(t[1]-5)+'" r="5" fill="#E8673A"/>'}).join('')+'<rect x="100" y="120" width="130" height="34" fill="#C99470"/><path d="M0 150h320v30H0z" fill="#E9D3B4"/>'+[20,50,260,290].map(function(x,i){return '<rect x="'+x+'" y="'+(150-(i%2?16:12))+'" width="14" height="'+(i%2?16:12)+'" fill="'+['#3B8FE0','#E8673A','#3FA35B','#E3A600'][i]+'"/>'}).join('');
 else if(th==='essen')o+='<rect width="320" height="180" fill="#FCEBDD"/><path d="M40 60h240l-20 30H60z" fill="#E8673A"/><path d="M40 60h40l-6 30H60zM120 60h40l-4 30h-32zM200 60h40l-2 30h-36z" fill="#fff" opacity=".85"/><rect x="60" y="90" width="200" height="60" fill="#B98258"/>'+[[85,'#E8673A'],[110,'#F3C13A'],[135,'#3FA35B'],[160,'#E8673A'],[185,'#9B59B6'],[210,'#F3C13A'],[235,'#3FA35B']].map(function(f){return '<circle cx="'+f[0]+'" cy="100" r="10" fill="'+f[1]+'"/>'}).join('')+'<path d="M0 150h320v30H0z" fill="#E7CDB3"/>';
 else if(th==='hoch')o+='<rect width="320" height="180" fill="#D8E9F6"/><circle cx="70" cy="40" r="18" fill="#FFE7A0"/>'+[30,60,90,120,150,180,210,240,270].map(function(x,i){var h=20+(i*37%30);return '<rect x="'+x+'" y="'+(150-h)+'" width="22" height="'+h+'" fill="#A9BFD3"/>'}).join('')+'<path d="M0 150h320v30H0z" fill="#7FB3D9" opacity=".7"/><path d="M180 180L250 70l70 110z" fill="#6E9E73"/><path d="M243 72h14v-14h-14z" fill="#8B6B4A"/><path d="M240 58l10-10 10 10z" fill="#E8673A"/>';
 else o+='<rect width="320" height="180" fill="#EFE6DA"/><circle cx="260" cy="40" r="18" fill="#FFE7A0"/>'+[[20,70],[80,50],[150,60],[220,45],[280,65]].map(function(b){return '<rect x="'+b[0]+'" y="'+b[1]+'" width="56" height="'+(150-b[1])+'" fill="#D7B892"/>'+[0,1].map(function(r){return '<path d="M'+(b[0]+12)+' '+(b[1]+30+r*36)+'v-8a8 8 0 0116 0v8zM'+(b[0]+32)+' '+(b[1]+30+r*36)+'v-8a8 8 0 0116 0v8z" fill="#8B6B4A"/>'}).join('')}).join('')+'<path d="M0 150h320v30H0z" fill="#CDB89C"/>';
 return o+'</svg>'}
var CARDTXT=['Hier war es super!','Das war spannend!','Hier war es lustig!','Das war wunderschön!','Hier will ich nochmal hin!'];
function myCards(){var out=[];tripDates().forEach(function(d,i){dayStops(i).forEach(function(s){var m=S.mu.met[s.id];if(m)out.push({id:s.id,day:i,t:m.t||0,sp:m.sp})})});
 Object.keys(S.mu.met).forEach(function(id){if(STOPID[id]&&!out.some(function(c){return c.id===id})){var m=S.mu.met[id];out.push({id:id,day:-1,t:m.t||0,sp:m.sp})}});return out.sort(function(a,b){return a.t-b.t})}
function cardHtml(c){var cd=(S.cards||{})[c.id]||{},d=new Date(c.t||Date.now()),ds=('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.',sp=c.sp&&SPEC_BY[c.sp],has=SNDHAS[c.id];
 return '<div class="pcard">'+pcFrame(c.id,pname(c.id),ds+String(d.getFullYear()).slice(2),sp)+'<div class="pcb"><b>'+esc(pname(c.id))+'</b><span class="pcd">'+ds+d.getFullYear()+'</span><p class="pctx'+(cd.txt?'':' empty')+'">'+(cd.txt?esc(cd.txt):'Tippe auf ✎ und schreib einen Satz.')+'</p><div class="pcbt"><button class="gskip" data-act="cardTxt" data-a="'+c.id+'">✎ Satz</button>'+(has?'<button class="gskip go" data-act="sndPlay" data-a="'+c.id+'">▶ Geräusch</button>':'')+'<button class="gskip" data-act="sndRec" data-a="'+c.id+'">🎙 '+(has?'Neu':'Geräusch sammeln')+'</button></div></div></div>'}
function cardsView(){var cs=myCards();sndScan();if(!cs.length)return '<div class="pn" style="padding:18px"><p class="muted" style="font-size:16px">Noch keine Postkarten. Wenn du an einem Ort einen Freund fängst, bekommst du dort eine Postkarte.</p></div>';
 return '<div class="pcgrid">'+cs.map(cardHtml).join('')+'</div>'}
ACT.cardTxt=function(id){var cd=(S.cards||{})[id]||{};sheet('<h2 class="disp" style="font-size:26px">'+esc(pname(id))+'</h2><p class="muted" style="margin:6px 0 10px">Dein Satz für die Postkarte</p><div class="wrap" style="margin-bottom:10px">'+CARDTXT.map(function(t){return '<button class="chip" data-act="cardPick" data-a="'+id+'|'+t+'">'+esc(t)+'</button>'}).join('')+'</div><textarea id="cardta" maxlength="5000" style="width:100%;height:150px;border-radius:14px;border:1.5px solid var(--line);padding:10px;font-size:16px;background:var(--card);color:var(--ink)">'+esc(cd.txt||'')+'</textarea><div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap"><button class="b p" data-act="cardSave" data-a="'+id+'">Speichern</button><button class="b" data-act="closeSheet">Abbrechen</button></div>')};
ACT.cardPick=function(a){var p=a.split('|'),ta=document.getElementById('cardta');if(ta)ta.value=p.slice(1).join('|')};
ACT.cardSave=function(id){var ta=document.getElementById('cardta');S.cards=S.cards||{};S.cards[id]={txt:(ta?ta.value:'').trim().slice(0,140)};save();closeSheet();snd('ding');rerender()};
/* ---- Geräusche: 5 Sekunden, gespeichert nur auf diesem Gerät (IndexedDB) ---- */
var SNDHAS={},SNDSCANNED=false;
function mdb(cb){try{var r=indexedDB.open('kofferforscher-media',1);r.onupgradeneeded=function(){r.result.createObjectStore('snd')};r.onsuccess=function(){cb(r.result)};r.onerror=function(){cb(null)}}catch(e){cb(null)}}
function sndScan(){if(SNDSCANNED)return;SNDSCANNED=true;mdb(function(db){if(!db)return;try{db.transaction('snd').objectStore('snd').getAllKeys().onsuccess=function(e){(e.target.result||[]).forEach(function(k){SNDHAS[k]=1});if(location.hash.indexOf('#/tag')===0)rerender()}}catch(x){}})}
ACT.sndRec=function(id){if(!navigator.mediaDevices||!window.MediaRecorder)return toast('Aufnehmen geht auf diesem Gerät nicht.');
 sheet('<div style="text-align:center;padding:8px"><h2 class="disp" style="font-size:26px">Geräusch sammeln</h2><p class="muted" style="margin:6px 0 14px">'+esc(pname(id))+': Halte das Handy still und hör gut zu. Was klingt hier besonders? Glocken, Meer, Musik …</p><div id="recst" class="recst">Bereit</div><button class="b p" id="recgo" data-act="sndGo" data-a="'+id+'">● Aufnehmen (5 s)</button> <button class="b" data-act="closeSheet">Abbrechen</button></div>')};
ACT.sndGo=function(id){var st=document.getElementById('recst'),bt=document.getElementById('recgo');if(bt)bt.disabled=true;
 navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){var ch=[],rec;try{rec=new MediaRecorder(stream)}catch(e){stream.getTracks().forEach(function(t){t.stop()});return toast('Aufnehmen geht nicht.')}
  rec.ondataavailable=function(e){if(e.data&&e.data.size)ch.push(e.data)};
  rec.onstop=function(){stream.getTracks().forEach(function(t){t.stop()});var blob=new Blob(ch,{type:rec.mimeType||'audio/webm'});mdb(function(db){if(!db)return toast('Speichern ging nicht.');try{db.transaction('snd','readwrite').objectStore('snd').put(blob,id).onsuccess=function(){SNDHAS[id]=1;S.cards=S.cards||{};S.cards[id]=S.cards[id]||{};S.cards[id].snd=1;save();closeSheet();snd('badge');toast('Geräusch gespeichert!');rerender()}}catch(e){toast('Speichern ging nicht.')}})};
  rec.start();var n=5;if(st){st.classList.add('on');st.textContent='Aufnahme … '+n}var iv=setInterval(function(){n--;var s2=document.getElementById('recst');if(s2)s2.textContent=n>0?'Aufnahme … '+n:'Fertig!';if(n<=0){clearInterval(iv);try{rec.stop()}catch(e){}}},1000)}).catch(function(){if(bt)bt.disabled=false;if(st)st.textContent='Mikrofon nicht erlaubt';toast('Bitte das Mikrofon in Chrome erlauben.')})};
ACT.sndPlay=function(id){mdb(function(db){if(!db)return;try{db.transaction('snd').objectStore('snd').get(id).onsuccess=function(e){var b=e.target.result;if(!b)return toast('Kein Geräusch gespeichert.');var a=new Audio(URL.createObjectURL(b));a.play().catch(function(){toast('Abspielen ging nicht.')})}}catch(x){}})};

ACT.cardMore=function(id){var cd=(S.cards||{})[id]||{};sheet('<h2 class="disp" style="font-size:26px">'+esc(pname(id))+'</h2><div class="pctx" style="margin:10px 0;max-height:55vh;overflow:auto;white-space:pre-wrap">'+esc(cd.txt||'')+'</div><button class="b" data-act="closeSheet">Schließen</button>')};

/* ===== v1.9.3: Tagespostkarte aus „Dein Satz“ (Vorder- und Rückseite, als Bild speichern) ===== */
var DPC={m:null,back:0};
function dpcScene(m){var id=m.place&&STOPID[m.place]?m.place:'';if(!id){var di=tripDates().indexOf(m.date);var st=dayStops(di>-1?di:0);id=st.length?st[0].id:''}return id}
function dpcFit(){var b=document.getElementById('dpcb'),t=document.getElementById('dpct');if(!b||!t)return;var fs=44;t.style.fontSize=fs+'px';while(fs>12&&t.scrollHeight>t.clientHeight+1){fs-=1;t.style.fontSize=fs+'px'}}
ACT.dpcOpen=function(id){var m=S.mem.filter(function(x){return x.id===id})[0];if(!m)return;var ta=document.getElementById('mnote');if(ta&&ta.value.trim())m=Object.assign({},m,{note:ta.value.trim()});DPC.m=m;DPC.back=0;dpcShow()};
function dpcShow(){var m=DPC.m;
 sheet('<div class="dpc"><div class="dpcv"><img id="dpcimg" alt="Postkarte" style="width:100%;border-radius:10px;display:block;background:#CDBBA3;min-height:200px"></div><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px"><button class="b" data-act="dpcFlip">'+(DPC.back?'Vorderseite':'Rückseite')+'</button><button class="b p" data-act="dpcSave">Als Bild speichern</button><div class="sp"></div><button class="b" data-act="closeSheet">Schließen</button></div></div>');
 dpcReady(function(){try{var im=document.getElementById('dpcimg');if(im)im.src=dpcCanvas().toDataURL('image/jpeg',.88)}catch(e){}})}
function dpcReady(cb){var done=0;function go(){if(done++)return;cb()}try{Promise.all([document.fonts.load('60px Caveat'),document.fonts.load('800 30px Figtree')]).then(go,go);setTimeout(go,1500)}catch(e){go()}}
ACT.dpcFlip=function(){DPC.back=DPC.back?0:1;dpcShow()};
function dpcWrap(c,text,w){var out=[];String(text).split(/\n/).forEach(function(par){var words=par.split(/\s+/),line='';words.forEach(function(wd){var t=line?line+' '+wd:wd;if(c.measureText(t).width>w&&line){out.push(line);line=wd}else line=t});out.push(line)});return out}
function dpcRnd(seed){var x=seed||7;return function(){x=(x*16807)%2147483647;return x/2147483647}}
function dpcStamp(){var o=document.createElement('canvas');o.width=170;o.height=210;var c=o.getContext('2d');c.fillStyle='#FFFDF6';c.fillRect(0,0,170,210);
 c.fillStyle='#F3E2C4';c.fillRect(16,16,138,178);c.strokeStyle='#E8673A';c.lineWidth=3;c.strokeRect(22,22,126,166);
 c.fillStyle='#E8673A';c.beginPath();c.moveTo(85,48);c.lineTo(120,100);c.lineTo(50,100);c.closePath();c.fill();c.fillRect(66,100,38,34);c.fillStyle='#FFFDF6';c.fillRect(78,112,14,22);
 c.fillStyle='#13324A';c.textAlign='center';c.font='800 22px Figtree,sans-serif';c.fillText('MUYA-POST',85,158);c.font='700 17px Figtree,sans-serif';c.fillText('1 FREUND',85,180);
 c.globalCompositeOperation='destination-out';for(var i=0;i<=170;i+=17){[0,210].forEach(function(y){c.beginPath();c.arc(i+8,y,7,0,7);c.fill()})}for(var j=0;j<=210;j+=17){[0,170].forEach(function(x){c.beginPath();c.arc(x,j+8,7,0,7);c.fill()})}return o}
function dpcPostmark(c,x,y,r,dt,ang){c.save();c.translate(x,y);c.rotate(ang);c.strokeStyle='rgba(60,45,40,.62)';c.fillStyle='rgba(60,45,40,.62)';c.lineWidth=4;c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.lineWidth=2;c.beginPath();c.arc(0,0,r-10,0,7);c.stroke();c.textAlign='center';c.font='800 '+Math.round(r*.3)+'px Figtree,sans-serif';c.fillText('BARCELONA',0,-r*.08);c.font='700 '+Math.round(r*.26)+'px Figtree,sans-serif';c.fillText(dt,0,r*.3);
 c.lineWidth=4;for(var k=0;k<5;k++){c.beginPath();c.moveTo(r+10,-r*.5+k*r*.25);for(var t=0;t<=6;t++)c.quadraticCurveTo(r+10+t*30+15,-r*.5+k*r*.25+(t%2?-12:12),r+10+(t+1)*30,-r*.5+k*r*.25);c.stroke()}c.restore()}
function dpcCanvas(){var m=DPC.m,sc=dpcScene(m),W=1500,H=1060,cv=document.createElement('canvas');cv.width=W;cv.height=H;var c=cv.getContext('2d'),dt=(m.date||'').split('-').reverse().join('.'),rnd=dpcRnd(11),kn=kidName();
 var g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#CDBBA3');g.addColorStop(1,'#B9A58C');c.fillStyle=g;c.fillRect(0,0,W,H);
 for(var i=0;i<9000;i++){c.fillStyle='rgba('+(rnd()>.5?'255,255,255':'60,40,20')+','+(rnd()*.06).toFixed(3)+')';c.fillRect(rnd()*W,rnd()*H,rnd()*5+1,rnd()*1.5+.5)}
 var CW=1340,CH=900,cx=W/2,cy=H/2;
 if(DPC.back){c.save();c.translate(cx,cy);c.rotate(-.012);c.shadowColor='rgba(40,25,10,.45)';c.shadowBlur=40;c.shadowOffsetY=16;c.fillStyle='#FBF4E6';c.fillRect(-CW/2,-CH/2,CW,CH);c.shadowColor='transparent';
  c.fillStyle='rgba(120,90,50,.05)';for(var q=0;q<3000;q++){c.fillRect(-CW/2+rnd()*CW,-CH/2+rnd()*CH,rnd()*3+1,rnd()*3+1)}
  c.strokeStyle='#CDBA98';c.lineWidth=3;c.beginPath();c.moveTo(60,-CH/2+70);c.lineTo(60,CH/2-70);c.stroke();
  var tw=CW/2+30-120,th=CH-190,fs=84,lines;c.fillStyle='#2779A7';for(;fs>16;fs-=2){c.font=fs+'px Caveat,cursive';lines=dpcWrap(c,m.note||'',tw);if(lines.length*fs*1.2<=th)break}
  c.font=fs+'px Caveat,cursive';c.textAlign='left';lines.forEach(function(l,i){c.fillText(l,-CW/2+70,-CH/2+80+fs+i*fs*1.2)});
  if(kn){c.fillStyle='#13324A';c.font='58px Caveat,cursive';c.textAlign='right';c.fillText('– '+kn,60-40,CH/2-60)}
  c.drawImage(dpcStamp(),CW/2-230,-CH/2+50);dpcPostmark(c,CW/2-300,-CH/2+190,96,dt,-.2);
  c.strokeStyle='#BBA98C';c.lineWidth=3;[40,150,260].forEach(function(y){c.beginPath();c.moveTo(130,y);c.lineTo(CW/2-70,y);c.stroke()});c.restore();return cv}
 /* Vorderseite mit Zettel */
 c.save();c.translate(cx,cy);c.rotate(-.012);c.shadowColor='rgba(40,25,10,.5)';c.shadowBlur=40;c.shadowOffsetY=16;c.fillStyle='#FFFDF6';c.fillRect(-CW/2,-CH/2,CW,CH);c.shadowColor='transparent';
 var M=26,PW=CW-2*M,PH=CH-2*M;c.drawImage(PC.render(sc||'sagrada',PW,PH),-CW/2+M,-CH/2+M,PW,PH);
 c.fillStyle='rgba(255,255,255,.96)';c.textAlign='left';c.font='800 78px Caveat,cursive';c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=12;c.fillText('Grüße aus Barcelona',-CW/2+70,-CH/2+120);c.font='700 30px Figtree,sans-serif';c.fillText((sc?pname(sc):S.trip.name).toUpperCase(),-CW/2+74,-CH/2+170);c.shadowBlur=0;c.shadowColor='transparent';
 /* Zettel */
 var wide=false,fs=60,lines,pw=PW*.5,pad=36,ph;function fit(wd){pw=wd;for(fs=64;fs>=22;fs-=2){c.font=fs+'px Caveat,cursive';lines=dpcWrap(c,m.note||'',pw-2*pad);ph=lines.length*fs*1.14+2*pad+(kn?fs*.9:0);if(ph<=PH*.62)return true}return false}
 if(!fit(PW*.5)&&!fit(PW*.66)){fit(PW*.9)}
 var px=-CW/2+M+50,py=CH/2-M-40-ph;if(pw>PW*.7){px=-pw/2}
 c.save();c.translate(px+pw/2,py+ph/2);c.rotate(-.018);c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=22;c.shadowOffsetY=8;c.fillStyle='#FBF4E6';c.fillRect(-pw/2,-ph/2,pw,ph);c.shadowColor='transparent';
 c.strokeStyle='rgba(120,160,190,.35)';c.lineWidth=2;for(var ly=-ph/2+pad+fs*1.14;ly<ph/2-pad*.3;ly+=fs*1.14){c.beginPath();c.moveTo(-pw/2+18,ly+6);c.lineTo(pw/2-18,ly+6);c.stroke()}
 c.fillStyle='#2779A7';c.font=fs+'px Caveat,cursive';c.textAlign='left';lines.forEach(function(l,i){c.fillText(l,-pw/2+pad,-ph/2+pad+fs*.85+i*fs*1.14)});
 if(kn){c.fillStyle='#13324A';c.textAlign='right';c.fillText('– '+kn,pw/2-pad,ph/2-pad*.6)}
 c.fillStyle='rgba(232,205,150,.8)';[[-pw/2+30,-ph/2+4,-.5],[pw/2-30,-ph/2+4,.5]].forEach(function(t){c.save();c.translate(t[0],t[1]);c.rotate(t[2]);c.fillRect(-55,-16,110,32);c.restore()});c.restore();
 /* Marke + Stempel */
 c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=10;c.shadowOffsetY=4;c.translate(CW/2-M-210,-CH/2+M+30);c.rotate(.04);c.drawImage(dpcStamp(),0,0);c.restore();
 dpcPostmark(c,CW/2-M-260,-CH/2+M+160,92,dt,-.25);
 c.restore();
 /* Papierkorn */
 for(var k=0;k<2500;k++){c.fillStyle='rgba(255,255,255,'+(rnd()*.05).toFixed(3)+')';c.fillRect(rnd()*W,rnd()*H,2,2)}
 return cv}
ACT.dpcSave=function(){dpcReady(dpcSave2)};
function dpcSave2(){var cv=dpcCanvas(),nm='postkarte-'+(DPC.back?'rueckseite':'vorderseite')+'.jpg';cv.toBlob(function(b){if(!b)return toast('Bild konnte nicht erstellt werden.');var f;try{f=new File([b],nm,{type:'image/jpeg'})}catch(e){f=null}
  if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'Postkarte'}).catch(function(){})}else{var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=nm;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1000);toast('Bild gespeichert.')}},'image/jpeg',.9)}
