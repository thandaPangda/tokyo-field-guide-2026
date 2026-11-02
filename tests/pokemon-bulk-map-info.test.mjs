import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const read = p => readFileSync(new URL('../' + p, import.meta.url),'utf8');
const html=read('index.html'), info=read('info-tab.js');
const w={};vm.runInNewContext(read('pokemon-bulk-2026-11-03.js'),{window:w},{timeout:1000});
const g=w.TFGPokemonBulk;
test('11 active stores and one closed store only in research',()=>{
 assert.equal(g.stores.length,11);
 assert.equal(g.closed.length,1);
 assert.equal(g.closed[0].closedOn,'2022-09-19');
 assert.equal(new Set(g.stores.map(x=>x.id)).size,11);
 assert.ok(g.stores.every(x=>x.url&&x.address&&x.storeHourSchedule));
 assert.ok(g.stores.every(x=>x.bulkVerified===false&&x.storagePriceVerified===false&&x.bundledBulkVerified===false));
 assert.ok(g.stores.every(x=>!x.name.includes('みなみ野')));
});
test('2026 current retail prices, Tachikawa floor, Hachioji late card opening',()=>{
 assert.equal(g.products.regularNew.yen,200);
 assert.equal(g.products.regularOld.yen,180);
 assert.equal(g.products.anniversary.yen,360);
 assert.equal(g.products.anniversaryBoxYen,7200);
 assert.match(g.products.anniversary.label,/6장/);
 const t=g.stores.find(x=>x.id==='PK_BO_TACHIKAWA');
 assert.match(t.floor,/5F/);
 assert.match(t.floor,/7F/);
 const h=g.stores.find(x=>x.id==='PK_BO_HACHIOJI_ITO');
 assert.deepEqual(Array.from(h.storeHourSchedule.weekday),[12,20]);
});
test('map integrates same IDs, broadens address verification, and keeps closed location off map',()=>{
 assert.match(html,/pokemon-bulk-2026-11-03\.js/);
 assert.match(html,/POKEMON_BULK\.stores/);
 assert.match(html,/千葉県/);
 assert.match(html,/船橋市/);
 assert.match(html,/立川市/);
 assert.match(html,/pokemonRetailNotice\(p,true\)/);
 assert.doesNotMatch(html,/PK_CLOSED_HACHIOJI_MINAMINO/);
});
test('Pokemon info shows 11 locations with bulk, sealed boxes, and closure warning',()=>{
 const root={innerHTML:'',listeners:{},addEventListener(k,v){this.listeners[k]=v;},contains(){return true;}};
 const results={innerHTML:''};
 const document={title:'',getElementById(id){return id==='view-info'?root:id==='info-store-results'?results:null;}};
 const window={location:{hash:'#info/pokemon'},TFGPokemonBulk:g};
 vm.runInNewContext(info,{window,document,navigator:{}},{timeout:2000});
 for(const re of [/id="info-bulk"/,/벌크·스토리지/,/미개봉 박스/,/라라포트/,/가와사키 모어즈/,/2022-09-19/,/7,200엔/,/360엔/])assert.match(root.innerHTML,re);
 root.listeners.click({target:{closest(selector){return selector==='button'?{hasAttribute(key){return key==='data-info-goal';},getAttribute(){return 'bulk';}}:null;}}});
 assert.match(results.innerHTML,/aria-pressed="true">벌크·스토리지/);
 assert.match(results.innerHTML,/BOOKOFF/);
});
