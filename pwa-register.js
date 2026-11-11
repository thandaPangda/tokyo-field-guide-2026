/* Shared offline registration for Tokyo guide and Japanese study. */
(function () {
  'use strict';
  const indicator=document.getElementById('offlineStatus');
  const update=async()=>{
    if(!indicator)return;
    if(!navigator.onLine){indicator.textContent='오프라인 모드 · 저장된 단어와 예문을 사용할 수 있습니다.';return;}
    if(!('serviceWorker' in navigator)||!('caches' in window)){
      indicator.textContent='자동 오프라인 저장을 지원하지 않는 브라우저입니다. JSON 백업을 권장합니다.';return;
    }
    try{
      const cache=await caches.match(new URL('./japanese.html',location.href).href);
      indicator.textContent=cache?'오프라인 준비 완료 · 인터넷 없이도 단어와 예문을 볼 수 있습니다.':'첫 방문 파일을 저장 중입니다. 잠시 후 다시 확인해 주세요.';
    }catch(_){indicator.textContent='오프라인 파일 확인 불가 · 인터넷 연결 상태에서 다시 열어 주세요.';}
  };
  window.addEventListener('online',update);
  window.addEventListener('offline',update);
  if(!('serviceWorker' in navigator)){update();return;}
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js',{scope:'./'}).then(async()=>{
      await navigator.serviceWorker.ready;
      update();
    }).catch(update);
  },{once:true});
})();