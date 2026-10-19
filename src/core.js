/* ===== Kofferforscher core: state, router, helpers, update ===== */
var APP_VERSION='1.0.0';
var KEY='kofferforscher.v1';
var DEFAULTS={
 v:1,pin:null,lim:90,used:{},wused:{},pauseUntil:0,mins:{vor:30,hgr:30,auf:30,wie:40,wes:30,rek:20,tag:20},wpaused:{},
 names:{mascot:'Muya',wesen:'Wunderwesen',kind:''},ts:1,
 trip:{id:'t1',name:'Barcelona',depart:'2026-10-20',back:'2026-10-25',region:'EU',legs:[{city:'Hannover',code:'HAJ',region:'DE'},{city:'Barcelona',code:'BCN',region:'EU'},{city:'Hannover',code:'HAJ',region:'DE'}]},
 archive:[],
 pack:{done:{},custom:[],region:'EU',allRegions:false,person:'alle',cat:0},
 brief:{done:{}},pred:{},sealed:false,
 hgr:{best:0,log:[],cfg:{span:3,nose:1,angle:4,elev:1,power:3}},
 auf:{stars:{},rounds:{}},wissen:{read:{},quiz:{}},
 wes:{found:{},spot:{}},rek:{cat:'Höhe'},diary:{},stadt:{done:{},day:0,showX:false},
 seen:{}
};
var S;
function deepMerge(d,s){var o=Array.isArray(d)?d.slice():{};if(Array.isArray(d))return s===undefined?d.slice():s;
 for(var k in d){if(s&&s[k]!==undefined&&s[k]!==null){o[k]=(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k]))?deepMerge(d[k],s[k]):s[k]}else o[k]=JSON.parse(JSON.stringify(d[k]))}
 if(s)for(var k2 in s)if(!(k2 in d))o[k2]=s[k2];return o}
function load(){var raw=null;try{raw=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
 S=deepMerge(DEFAULTS,raw||{})}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
load();

/* ---------- helpers ---------- */
var $=function(s,r){return(r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function daysBetween(a,b){return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5)}
function toast(t){var e=document.createElement('div');e.className='toast';e.textContent=t;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function rnd(seed){var s=seed>>>0;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function pick(r,a){return a[Math.floor(r()*a.length)]}
function shuffle(r,a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function fmt(n){return String(n).replace('.',',')}
function arrow(){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#13324A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'}
function backBtn(href){return '<a class="back" href="#'+(href||'/')+'" aria-label="Zurück"><svg viewBox="0 0 24 24" fill="none" stroke="#13324A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>'}
function topbar(label,title,back,right){return '<div class="top">'+backBtn(back)+'<div><div class="mono">'+label+'</div><h1 class="disp">'+title+'</h1></div><div class="sp"></div>'+(right||'')+'</div>'}
function sheet(inner){var s=document.createElement('div');s.className='sheet';s.innerHTML='<div>'+inner+'</div>';s.addEventListener('click',function(e){if(e.target===s)s.remove()});document.body.appendChild(s);return s}
function closeSheet(){$$('.sheet').forEach(function(s){s.remove()})}
function sha(t){var enc=new TextEncoder().encode('kf|'+t);if(!(window.crypto&&crypto.subtle))return Promise.resolve('p:'+t);
 return crypto.subtle.digest('SHA-256',enc).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2)}).join('')})}
function applyTs(){document.documentElement.style.setProperty('--ts',S.ts)}

/* ---------- usage / time limits ---------- */
function usedToday(){return Math.round(S.used[today()]||0)}
function winUsed(id){var k=today()+'|'+id;return S.wused[k]||0}
function winState(id){ // 'open' | 'paused' | 'limit'
 if(S.pauseUntil&&Date.now()<S.pauseUntil)return 'paused';
 if(S.wpaused[id])return 'paused';
 if(S.lim&&usedToday()>=S.lim)return 'limit';
 if(winUsed(id)>=S.mins[id])return 'limit';
 return 'open'}
var curWin=null;
setInterval(function(){if(document.hidden||!curWin)return;var d=today();S.used[d]=(S.used[d]||0)+0.25;var k=d+'|'+curWin;S.wused[k]=(S.wused[k]||0)+0.25;save();
 if(winState(curWin)!=='open'&&!$('.limit')){limitScreen()}},15000);
function limitScreen(){var e=document.createElement('div');e.className='sheet limit';e.innerHTML='<div style="text-align:center"><div class="disp" style="font-size:44px">Zeit für eine Pause</div><p style="margin:12px 0 18px;font-weight:700">'+esc(S.names.mascot)+' sagt: Das Rollo ist zu. Schau aus dem echten Fenster oder frag Mama und Papa.</p><a class="btn d" href="#/" style="display:inline-grid;place-items:center;line-height:50px">Zum Start</a></div>';document.body.appendChild(e)}

/* ---------- router ---------- */
var ROUTES={};
var unlocked=false;
function route(){var h=location.hash.replace(/^#/,'')||'/';var parts=h.split('/').filter(Boolean);var name=parts[0]||'home';closeSheet();
 if(name!=='eltern'&&name!=='reise')unlocked=unlocked&&false;
 curWin=null;for(var i=0;i<WINDOWS.length;i++)if(WINDOWS[i].id===name)curWin=name;
 if(curWin&&winState(curWin)!=='open'){toast('Dieses Fenster ruht gerade. Frag Mama oder Papa.');location.hash='#/';return}
 var f=ROUTES[name]||ROUTES.home;var app=$('#app');app.innerHTML='<div class="view">'+f(parts.slice(1))+'</div>';window.scrollTo(0,0);
 var post=ROUTES['post:'+name];if(post)post(parts.slice(1))}
function rerender(){var y=window.scrollY;var h=location.hash.replace(/^#/,'')||'/';var parts=h.split('/').filter(Boolean);var name=parts[0]||'home';var f=ROUTES[name]||ROUTES.home;
 $('#app').innerHTML='<div class="view" style="animation:none">'+f(parts.slice(1))+'</div>';var post=ROUTES['post:'+name];if(post)post(parts.slice(1));window.scrollTo(0,y)}
window.addEventListener('hashchange',route);

/* ---------- actions (event delegation) ---------- */
var ACT={};
document.addEventListener('click',function(e){var t=e.target.closest('[data-act]');if(!t)return;var f=ACT[t.getAttribute('data-act')];if(f){f(t.getAttribute('data-a'),t,e)}});
document.addEventListener('input',function(e){var t=e.target.closest('[data-in]');if(!t)return;var f=ACT[t.getAttribute('data-in')];if(f)f(t.value,t,e)});
document.addEventListener('change',function(e){var t=e.target.closest('[data-ch]');if(!t)return;var f=ACT[t.getAttribute('data-ch')];if(f)f(t.value,t,e)});

/* ---------- service worker + update ---------- */
var SWREG=null,UPD={waiting:null};
function initSW(){if(!('serviceWorker' in navigator))return;
 navigator.serviceWorker.register('sw.js').then(function(reg){SWREG=reg;
  if(reg.waiting)UPD.waiting=reg.waiting;
  reg.addEventListener('updatefound',function(){var w=reg.installing;if(!w)return;w.addEventListener('statechange',function(){if(w.state==='installed'&&navigator.serviceWorker.controller){UPD.waiting=w;var b=$('#updstate');if(b)b.innerHTML=updHtml('ready')}})})}).catch(function(){});
 var reloading=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(reloading)return;reloading=true;location.reload()});
 if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().catch(function(){})}}
function updHtml(st,info){
 if(st==='ready')return '<p style="font-weight:800">Neue Version bereit'+(info&&info.version?' ('+esc(info.version)+')':'')+'.</p>'+notes(info)+'<p class="muted">Alle Daten bleiben erhalten: Gepacktes, Tagebuch, Sterne, Wunderwesen.</p><button class="btn d" data-act="applyUpdate">Jetzt aktualisieren</button>';
 if(st==='latest')return '<p style="font-weight:800">Du hast die neueste Version ('+APP_VERSION+').</p>';
 if(st==='offline')return '<p style="font-weight:800">Keine Verbindung. Mit WLAN erneut versuchen.</p>';
 if(st==='checking')return '<p class="muted">Suche nach Updates …</p>';
 return '<p class="muted">Version '+APP_VERSION+'. Noch nicht nach Updates gesucht.</p>'}
function notes(i){return i&&i.notes&&i.notes.length?'<ul style="margin:6px 0 10px;padding-left:20px">'+i.notes.map(function(n){return '<li>'+esc(n)+'</li>'}).join('')+'</ul>':''}
ACT.checkUpdate=function(){var box=$('#updstate');if(!box)return;box.innerHTML=updHtml('checking');
 fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(info){
  var p=SWREG?SWREG.update().catch(function(){}):Promise.resolve();
  return p.then(function(){return new Promise(function(res){setTimeout(res,1200)})}).then(function(){
   if(info.version!==APP_VERSION||UPD.waiting||(SWREG&&SWREG.waiting)){UPD.waiting=UPD.waiting||(SWREG&&SWREG.waiting);UPD.info=info;box.innerHTML=updHtml('ready',info);
    if(!UPD.waiting&&!SWREG){box.innerHTML+='<p class="muted">Seite wird neu geladen …</p>';setTimeout(function(){location.reload()},800)}}
   else box.innerHTML=updHtml('latest')})}).catch(function(){box.innerHTML=updHtml('offline')})};
ACT.applyUpdate=function(){save();var w=UPD.waiting||(SWREG&&SWREG.waiting);
 if(w){w.postMessage({type:'SKIP_WAITING'});setTimeout(function(){location.reload()},2500)}
 else if('caches' in window){caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}).then(function(){location.reload()})}
 else location.reload()};

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded',function(){applyTs();if(!location.hash)location.hash='#/';route();initSW()});
