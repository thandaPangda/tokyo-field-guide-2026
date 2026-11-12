/* Offline cache. Scope is confined to this GitHub Pages project. */
const VERSION='tokyo-field-guide-ja-v3-20261112-matsunaga';
const CACHE=VERSION;
const PRIMARY=['./index.html','./japanese.html','./pwa-register.js','./japanese-manifest.webmanifest','./japanese-icon.svg'];
const SECONDARY=[
  './','./experience-ux.js?v=20261110-stay-nav','./experience-ux.css',
  './info-tab.js?v=20261110-stay-nav','./info-tab.css?v=20261110-stay-nav',
  './map-mobile-ux.js','./map-mobile-ux.css?v=20261111-saved',
  './map-marker-system.js','./reservation-data-2026-11-06.js',
  './reservation-ux.js','./reservation-ux.css',
  './komeda-morning-2026-11-08.js','./komeda-morning-2026-11-08.css',
  './pokemon-bulk-2026-11-03.js','./pokemon-visit-plan-2026-11-04.js',
  './market-discounts-2026-11-03.js','./photo-discoveries-2026-11-02.js',
  './resale-data.js'
];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(PRIMARY);
    await Promise.allSettled(SECONDARY.map(file=>cache.add(file)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('tokyo-field-guide-ja-')&&name!==CACHE).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const response=await fetch(request);
        if(response.ok)await cache.put(request,response.clone());
        return response;
      }catch(_){
        return (await cache.match(request,{ignoreSearch:true})) ||
          (await cache.match(new URL('./index.html',self.registration.scope))) ||
          Response.error();
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(request,{ignoreSearch:true});
    if(cached)return cached;
    try{
      const response=await fetch(request);
      if(response.ok)await cache.put(request,response.clone());
      return response;
    }catch(_){return Response.error();}
  })());
});