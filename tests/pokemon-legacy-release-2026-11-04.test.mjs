import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
const rd=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const s={window:{}};vm.runInNewContext(rd('pokemon-bulk-2026-11-03.js'),s,{timeout:1500});const g=s.window.TFGPokemonBulk;
function mount(hash='#info/pokemon'){
 const root={innerHTML:'',listeners:{},addEventListener(k,f){this.listeners[k]=f;},contains(){return true;}};
 const results={innerHTML:''};
 const document={title:'',getElementById(id){return id==='view-info'?root:id==='info-store-results'?results:null;}};
 const window={location:{hash},TFGPokemonBulk:g};
 vm.runInNewContext(rd('info-tab.js'),{window,document,navigator:{}},{timeout:2000});
 return {root,results,window};
}
test('seven new distinct stores plus original eleven',()=>{
 assert.equal(g.stores.length,18);
 const newly=g.stores.filter(x=>x.dateChecked==='2026-11-04');
 assert.equal(newly.length,7);assert.equal(new Set(g.stores.map(x=>x.id)).size,18);
 assert.equal(newly.filter(x=>x.region==='ikebukuro').length,4);
 assert.equal(newly.filter(x=>x.type==='toyshop').length,2);
 assert.ok(newly.every(x=>x.address&&x.url&&x.lat===null&&x.lon===null&&x.bulkVerified===false&&x.storagePriceVerified===false));
});
test('release dates and application deadlines are distinct',()=>{
 assert.equal(g.release.deck.date,'2026-11-13');assert.equal(g.release.deck.yen,5500);
 assert.equal(g.release.pack.date,'2026-11-27');assert.equal(g.release.pack.nominalBoxYen,6000);
 assert.equal(g.release.lotteries.length,5);
 assert.match(g.release.lotteries.find(x=>x.name.includes('SHIBUYA')).deadline,/종료/);
});
test('information page shows new stores and release calendar',()=>{
 const {root}=mount();assert.match(root.innerHTML,/기존 11 \+ 신규 7/);
 assert.match(root.innerHTML,/id="info-release"/);assert.match(root.innerHTML,/하도우 시커/);
 assert.match(root.innerHTML,/드래곤스타/);assert.match(root.innerHTML,/키디랜드 기치조지/);
 assert.match(root.innerHTML,/미확인/);assert.match(root.innerHTML,/23:59 JST/);
});
test('area/region filter supports imported Kichijoji place',()=>{
 const {root,results}=mount();
 const button={hasAttribute(k){return k==='data-info-region';},getAttribute(){return 'kichijoji';}};
 root.listeners.click({target:{closest(k){return k==='button'?button:null;}}});
 assert.match(results.innerHTML,/기치조지/);assert.doesNotMatch(results.innerHTML,/키디랜드 후타코타마가와/);
});
test('report distinguishes old pricing and official store evidence',()=>{
 const audit=rd('research/pokemon-legacy-stores-release-2026-11-04.md');
 assert.match(audit,/2025년 3월/);assert.match(audit,/2026-11-04/);
 assert.match(audit,/상충/);assert.match(audit,/재고/);
});
