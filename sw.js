/* Kofferforscher service worker. Only caches app files; the child's data lives in localStorage and is never touched. */
const VERSION='1.9.3';
const CACHE='kofferforscher-'+VERSION;
const FILES=['./','index.html','manifest.webmanifest','assets/pano.svg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png',
'fonts/big-shoulders-display-latin-800-normal.woff2','fonts/big-shoulders-display-latin-900-normal.woff2','fonts/figtree-latin-500-normal.woff2','fonts/figtree-latin-700-normal.woff2','fonts/figtree-latin-800-normal.woff2','fonts/dm-mono-latin-500-normal.woff2','fonts/caveat-latin-700-normal.woff2'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(!r.ok)throw 0;return c.put(f,r)})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kofferforscher-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(u.pathname.endsWith('version.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response('{}',{status:503})));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c))}return res}).catch(()=>caches.match('index.html'))));
});
