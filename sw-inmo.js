const CACHE = 'inmo-v1';
const ASSETS = ['./', './inmobiliarias.html', './manifest-inmo.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())) });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())) });
self.addEventListener('fetch', e => { if(e.request.method!=='GET')return; e.respondWith(caches.match(e.request).then(c => { const n=fetch(e.request).then(r=>{if(r&&r.status===200)caches.open(CACHE).then(cc=>cc.put(e.request,r.clone()));return r}).catch(()=>null);return c||n })) });
