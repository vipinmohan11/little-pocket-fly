/* ===== Kofferforscher core: state, migration, router, helpers, rewards, update ===== */
var APP_VERSION='1.1.0';
var KEY='kofferforscher.v1';
var DEFAULTS={
 v:5,pin:null,lim:90,used:{},wused:{},pauseUntil:0,mins:{vor:30,hgr:30,auf:30,wie:40,wes:30,rek:20,tag:20},wpaused:{},
 names:{mascot:'Muya',wesen:'Wunderwesen',kind:''},ts:1,
 trip:{id:'t1',name:'Barcelona',depart:'2026-10-20',back:'2026-10-25',region:'EU',legs:[{city:'Hannover',code:'HAJ',region:'DE'},{city:'Barcelona',code:'BCN',region:'EU'},{city:'Hannover',code:'HAJ',region:'DE'}]},
 archive:[],
 pack:{done:{},na:{},custom:[],region:'EU',allRegions:false,person:'kind',cat:0},
 brief:{done:{},step:0},pred:{},pred2:{},sealed:false,
 hgr:{best:0,log:[],cfg:{span:3,nose:1,angle:4,elev:1,power:3},model:'pfeil',fold:{},tab:'fold',sel:'nose',lim:{n:0,last:0,rest:0}},
 mu:{mat:{},life:{},pets:{},free:1,cnt:{},days:{},buddy:null,sel:null,tab:'dex',news:[],qdone:0,frac:0,bb:0,bbk:{},base:{}},
 auf:{stars:{},rounds:{},dest:{},board:{},bingo:{},sel:'pass'},
 wissen:{read:{},quiz:{},ok:{},seen:{}},
 wes:{found:{},known:{},spot:{},cat:'gaudi'},
 rek:{cat:'Höhe',a:null,b:null,n:0,right:0,streak:0,best:0},
 diary:{},mem:[],
 stadt:{done:{},order:{},skip:{},add:{},day:0,showX:true,zoom:1.6,osm:false},
 earned:{},seen:{}
};
var S;
var SHARED_PACK={6:1,9:1,16:1,17:1,22:1,33:1,36:1,45:1,72:1,95:1,96:1,114:1,118:1};
function deepMerge(d,s){if(Array.isArray(d))return Array.isArray(s)?s:d.slice();var o={};
 for(var k in d){if(s&&s[k]!==undefined&&s[k]!==null){o[k]=(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k]))?deepMerge(d[k],s[k]):s[k]}else o[k]=JSON.parse(JSON.stringify(d[k]))}
 if(s)for(var k2 in s)if(!(k2 in d))o[k2]=s[k2];return o}
function migrate(){
 if((S.v||1)<2){ // old diary {date:{mood,best[],text,w}} -> separate memory entries
  var M=['super','gut','muede'];
  Object.keys(S.diary||{}).forEach(function(d){var e=S.diary[d]||{};var r=e.mood!=null?M[e.mood]:'gut';
   (e.best||[]).forEach(function(b,i){S.mem.push({id:'m'+d.replace(/-/g,'')+i,date:d,what:b,cat:'erlebnis',r:r,note:'',t:Date.now()})});
   if(e.text)S.mem.push({id:'m'+d.replace(/-/g,'')+'n',date:d,what:'Mein Satz',cat:'notiz',r:r,note:e.text,t:Date.now()})});
  if(S.pack.person==='alle')S.pack.person='kind';
  S.v=2}
 if(S.v<3){ // packing ticks were shared by item id; split per person (only where it is clearly the owner)
  var old=S.pack.done||{},nd={};
  Object.keys(old).forEach(function(k){if(k.charAt(0)==='c'||k.indexOf('@')>0||SHARED_PACK[k]){nd[k]=1;return}
   var it=null;PACK.forEach(function(c){c.items.forEach(function(i){if(String(i.id)===k)it=i})});
   if(!it||it.w==='haus'){nd[k]=1;return}
   if(it.w==='eltern'){nd[k+'@mama']=1;nd[k+'@papa']=1}else if(it.w==='mama'||it.w==='papa')nd[k+'@'+it.w]=1;else nd[k+'@kind']=1});
  S.pack.done=nd;S.v=3}
 if(S.v<4){ // stable question ids (hash of the question text instead of array position)
  if(typeof WISSEN!=='undefined')WISSEN.forEach(function(w){w.qs.forEach(function(q){if(S.wissen.ok[q.lid])S.wissen.ok[q.id]=1;if(S.wissen.seen[q.lid]&&!S.wissen.seen[q.id])S.wissen.seen[q.id]=S.wissen.seen[q.lid]})});
  S.v=4}
 if(S.v<5){ // shared items per ChatGPT policy: some ids became shared, one became personal
  var d5=S.pack.done||{},n5={};Object.keys(d5).forEach(function(k){var id=k.split('@')[0];if(k.indexOf('@')>0&&SHARED_PACK[id]){n5[id]=1}else if(k==='15'){n5['15@kind']=1}else n5[k]=1});S.pack.done=n5;S.v=5}}
function load(){var raw=null;try{raw=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
 S=deepMerge(DEFAULTS,raw||{});if(!raw)S.v=5;migrate()}
var saveT=null;
window.addEventListener('storage',function(e){if(e.key===KEY&&e.newValue){try{S=deepMerge(DEFAULTS,JSON.parse(e.newValue));migrate();if(typeof rerender==='function')rerender()}catch(x){}}});
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}clearTimeout(saveT);saveT=setTimeout(function(){checkRewards(false)},250)}
load();

/* ---------- helpers ---------- */
var $=function(s,r){return(r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function iso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function today(){return iso(new Date())}
function daysBetween(a,b){return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5)}
function toast(t){$$('.toast').forEach(function(x){x.remove()});var e=document.createElement('div');e.className='toast';e.textContent=t;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function rnd(seed){var s=seed>>>0;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function shuffle(r,a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function fmt(n){return String(n).replace('.',',')}
function num(n){var s=Math.abs(n)>=10000?Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.'):String(Math.round(n*100)/100);return s.replace(/\.(\d+)$/,',$1')}
function arrow(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+(c||'#13324A')+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'}
var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="#13324A" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
function backBtn(href){return '<a class="back" href="#'+(href||'/')+'" aria-label="Zurück"><svg viewBox="0 0 24 24" fill="none" stroke="#13324A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>'}
function head(label,title,back,right){return '<div class="hd">'+backBtn(back)+'<div class="t"><span class="lab">'+label+'</span><h1 class="disp">'+title+'</h1></div><div class="sp"></div>'+(right||'')+'</div>'}
function screen(h,body,cls){return '<div class="scr '+(cls||'')+'">'+h+'<div class="bd">'+body+'</div></div>'}
function seg(items,cur,act){return '<div class="seg">'+items.map(function(x){return '<button class="'+(x[0]===cur?'on':'')+'" data-act="'+act+'" data-a="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'}
function sheet(inner){closeSheet();var s=document.createElement('div');s.className='sheet';s.innerHTML='<div>'+inner+'</div>';s.addEventListener('click',function(e){if(e.target===s)s.remove()});document.body.appendChild(s);return s}
function closeSheet(){$$('.sheet').forEach(function(s){s.remove()})}
function sha(t){var enc=new TextEncoder().encode('kf|'+t);if(!(window.crypto&&crypto.subtle))return Promise.resolve('p:'+t);
 return crypto.subtle.digest('SHA-256',enc).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2)}).join('')})}
function applyTs(){document.documentElement.style.setProperty('--ts',S.ts)}
function ring(p,size,col,w){size=size||40;w=w||5;var r=(size-w)/2,c=2*Math.PI*r;return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="rgba(19,50,74,.1)" stroke-width="'+w+'"/><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="'+(col||'#49C5B6')+'" stroke-width="'+w+'" stroke-linecap="round" stroke-dasharray="'+c+'" stroke-dashoffset="'+(c*(1-Math.max(0,Math.min(1,p))))+'" transform="rotate(-90 '+size/2+' '+size/2+')" style="transition:stroke-dashoffset .6s"/></svg>'}
/* trip day index (0-based) for a date, or -1 */
function tripDayOf(d){var i=daysBetween(S.trip.depart,d);var n=daysBetween(S.trip.depart,S.trip.back)+1;return i>=0&&i<n?i:-1}
function tripDates(){var out=[],n=Math.max(1,Math.min(21,daysBetween(S.trip.depart,S.trip.back)+1));var d=new Date(S.trip.depart+'T00:00:00');for(var i=0;i<n;i++)out.push(iso(new Date(d.getTime()+i*864e5)));return out}

/* ---------- usage / time limits ---------- */
function usedToday(){return Math.round(S.used[today()]||0)}
function winUsed(id){return S.wused[today()+'|'+id]||0}
function winState(id){
 if(S.pauseUntil&&Date.now()<S.pauseUntil)return 'paused';
 if(S.wpaused[id])return 'paused';
 if(S.lim&&usedToday()>=S.lim)return 'limit';
 if(winUsed(id)>=S.mins[id])return 'limit';
 return 'open'}
var curWin=null;
setInterval(function(){if(document.hidden||!curWin)return;var d=today();S.used[d]=(S.used[d]||0)+0.25;var k=d+'|'+curWin;S.wused[k]=(S.wused[k]||0)+0.25;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
 if(winState(curWin)!=='open'&&!$('.limit'))limitScreen()},15000);
function limitScreen(){var e=document.createElement('div');e.className='sheet limit';e.innerHTML='<div style="text-align:center"><div class="disp" style="font-size:44px">Zeit für eine Pause</div><p style="margin:12px 0 18px;font-weight:700">'+esc(S.names.mascot)+' sagt: Das Rollo ist zu. Schau aus dem echten Fenster oder frag Mama und Papa.</p><a class="b p" href="#/">Zum Start</a></div>';document.body.appendChild(e)}

/* ---------- rewards: one Reisepass for the whole app ---------- */
var STAMPS=[];   // filled in rewards.js: {id,t,d,cat,c,ic,n:fn,of}
var RANKS=[[0,'Passagier'],[4,'Entdecker'],[10,'Navigator'],[18,'Co-Pilot'],[28,'Kapitän'],[40,'Flug-Legende']];
function earnedCount(){return Object.keys(S.earned).length}
function rankOf(n){var r=RANKS[0],nx=null;for(var i=0;i<RANKS.length;i++){if(n>=RANKS[i][0])r=RANKS[i];else{nx=RANKS[i];break}}return{name:r[1],next:nx}}
function stampProg(st){var v=0;try{v=st.n()}catch(e){}return Math.min(st.of,v)}
function checkRewards(silent){var neu=[];STAMPS.forEach(function(st){if(S.earned[st.id])return;if(stampProg(st)>=st.of){S.earned[st.id]=today();neu.push(st)}});
 if(neu.length){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(!silent)neu.forEach(function(st,i){setTimeout(function(){stampToast(st)},i*3600)})}}
function stampSvg(st,on){var c=on?st.c:'#B8BEC2';return '<svg class="stamp" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="'+(on?c+'33':'none')+'" stroke="'+c+'" stroke-width="3"/><circle cx="50" cy="50" r="38" fill="none" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="3 3"/><g transform="translate(32 30) scale(1.5)" fill="none" stroke="'+(on?'#13324A':'#9AA3A8')+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+st.ic+'"/></g></svg>'}
function stampToast(st){$$('.stampt').forEach(function(x){x.remove()});var e=document.createElement('a');e.className='stampt';e.href='#/samm';e.innerHTML='<span class="sm">'+stampSvg(st,true)+'</span><span><span class="lab">Neuer Stempel im Reisepass</span><br><b>'+esc(st.t)+'</b><br><span class="muted" style="font-size:13px">'+esc(st.d)+'</span></span>';document.body.appendChild(e);setTimeout(function(){e.remove()},3500)}
/* closest unfinished stamps (for "Nächstes Ziel") */
function nextGoals(n,cat){return STAMPS.filter(function(s){return !S.earned[s.id]&&(!cat||s.cat===cat)}).map(function(s){return{s:s,p:stampProg(s)/s.of}}).sort(function(a,b){return b.p-a.p}).slice(0,n)}

/* ---------- router ---------- */
var ROUTES={},CLEAN=[];
var unlocked=false;
function cleanup(){CLEAN.forEach(function(f){try{f()}catch(e){}});CLEAN=[]}
function parseHash(){var h=location.hash.replace(/^#/,'')||'/';var parts=h.split('/').filter(Boolean);return{name:parts[0]||'home',args:parts.slice(1)}}
function route(){var r=parseHash();closeSheet();cleanup();
 curWin=null;for(var i=0;i<WINDOWS.length;i++)if(WINDOWS[i].id===r.name)curWin=r.name;
 if(curWin&&winState(curWin)!=='open'){toast('Dieses Fenster ruht gerade. Frag Mama oder Papa.');location.hash='#/';return}
 var f=ROUTES[r.name]||ROUTES.home;$('#app').innerHTML='<div class="view">'+f(r.args)+'</div>';window.scrollTo(0,0);
 var post=ROUTES['post:'+r.name];if(post)post(r.args)}
function rerender(){var y=window.scrollY,r=parseHash();var keep={};$$('[data-keep]').forEach(function(e){keep[e.getAttribute('data-keep')]=e.scrollTop});cleanup();
 var f=ROUTES[r.name]||ROUTES.home;$('#app').innerHTML='<div>'+f(r.args)+'</div>';var post=ROUTES['post:'+r.name];if(post)post(r.args);window.scrollTo(0,y);
 $$('[data-keep]').forEach(function(e){var k=e.getAttribute('data-keep');if(keep[k]!=null)e.scrollTop=keep[k]})}
window.addEventListener('hashchange',route);

/* ---------- actions (event delegation) ---------- */
var ACT={};
document.addEventListener('click',function(e){var t=e.target.closest('[data-act]');if(!t)return;var f=ACT[t.getAttribute('data-act')];if(f){f(t.getAttribute('data-a'),t,e)}});
document.addEventListener('input',function(e){var t=e.target.closest('[data-in]');if(!t)return;var f=ACT[t.getAttribute('data-in')];if(f)f(t.value,t,e)});
document.addEventListener('change',function(e){var t=e.target.closest('[data-ch]');if(!t)return;var f=ACT[t.getAttribute('data-ch')];if(f)f(t.value,t,e)});
ACT.closeSheet=closeSheet;

/* ---------- service worker + update ---------- */
var SWREG=null,UPD={waiting:null};
function initSW(){if(!('serviceWorker' in navigator))return;
 navigator.serviceWorker.register('sw.js').then(function(reg){SWREG=reg;
  if(reg.waiting)UPD.waiting=reg.waiting;
  reg.addEventListener('updatefound',function(){var w=reg.installing;if(!w)return;w.addEventListener('statechange',function(){if(w.state==='installed'&&navigator.serviceWorker.controller){UPD.waiting=w;var b=$('#updstate');if(b)b.innerHTML=updHtml('ready')}})})}).catch(function(){});
 var reloading=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(reloading)return;reloading=true;location.reload()});
 if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().catch(function(){})}}
function updHtml(st,info){
 if(st==='ready')return '<p style="font-weight:800">Neue Version bereit'+(info&&info.version?' ('+esc(info.version)+')':'')+'.</p>'+notes(info)+'<p class="muted" style="font-size:13px;margin-bottom:8px">Alle Daten bleiben erhalten: Gepacktes, Tagebuch, Stempel, Wunderwesen.</p><button class="b p" data-act="applyUpdate">Jetzt aktualisieren</button>';
 if(st==='latest')return '<p style="font-weight:800">Du hast die neueste Version ('+APP_VERSION+').</p>';
 if(st==='offline')return '<p style="font-weight:800">Keine Verbindung. Mit WLAN erneut versuchen.</p>';
 if(st==='checking')return '<p class="muted">Suche nach Updates …</p>';
 return '<p class="muted">Version '+APP_VERSION+'.</p>'}
function notes(i){return i&&i.notes&&i.notes.length?'<ul style="margin:6px 0 10px;padding-left:20px">'+i.notes.map(function(n){return '<li>'+esc(n)+'</li>'}).join('')+'</ul>':''}
ACT.checkUpdate=function(){var box=$('#updstate');if(!box)return;box.innerHTML=updHtml('checking');
 fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(info){
  var p=SWREG?SWREG.update().catch(function(){}):Promise.resolve();
  return p.then(function(){return new Promise(function(res){setTimeout(res,1200)})}).then(function(){
   if(info.version!==APP_VERSION||UPD.waiting||(SWREG&&SWREG.waiting)){UPD.waiting=UPD.waiting||(SWREG&&SWREG.waiting);UPD.info=info;box.innerHTML=updHtml('ready',info)}
   else box.innerHTML=updHtml('latest')})}).catch(function(){box.innerHTML=updHtml('offline')})};
ACT.applyUpdate=function(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}var w=UPD.waiting||(SWREG&&SWREG.waiting);
 if(w){w.postMessage({type:'SKIP_WAITING'});setTimeout(function(){location.reload()},2500)}
 else if('caches' in window){caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}).then(function(){location.reload()})}
 else location.reload()};

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded',function(){applyTs();checkRewards(true);if(!location.hash)location.hash='#/';route();initSW()});
