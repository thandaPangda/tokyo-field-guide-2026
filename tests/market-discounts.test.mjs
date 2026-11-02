import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {test} from 'node:test';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const window={};vm.runInNewContext(read('market-discounts-2026-11-03.js'),{window},{timeout:1000});
const data=window.TFGMarketStops,html=read('index.html');
test('15 unique places with source-backed addresses and consistent sale schema',()=>{
 assert.equal(data.places.length,15);assert.equal(new Set(data.places.map(x=>x.id)).size,15);
 for(const x of data.places){assert.ok(x.address.startsWith('東京都'));assert.ok(x.shopHoursSource);assert.ok(x.sale.evidenceUrl);assert.ok(['official_floor','merchant','review','unknown'].includes(x.sale.level));assert.equal(x.sale.guaranteed,false);}
});
test('official FAQ never promoted to guaranteed individual-store discount',()=>{
 for(const id of ['MK_UORIKI_SHIBUYA','MK_FOODEDGE_SHIBUYA']){const p=data.places.find(x=>x.id===id);assert.equal(p.sale.level,'official_floor');assert.match(p.sale.time,/20:00/);assert.match(p.sale.summary,/전/);}
 const a=data.places.find(x=>x.id==='MK_NAKAMURA_NAKANO');assert.equal(a.sale.level,'review');assert.match(a.sale.time,/18:00/);
 const o=data.places.find(x=>x.id==='MK_UOKO_OGIKUBO');assert.equal(o.sale.level,'review');assert.match(o.sale.time,/19:00/);
});
test('Wednesday and Sunday closure and merchant weekday offer',()=>{
 const kats=data.places.find(x=>x.id==='MK_KATSUTA_NAKANO');
 assert.equal(kats.storeHourSchedule.wednesday,null);assert.equal(kats.storeHourSchedule.sunday,null);
 assert.deepEqual(Array.from(kats.closedDates),['2026-11-11','2026-11-15']);
 const m=data.places.find(x=>x.id==='MK_UOKO_NAKANO');assert.equal(m.sale.level,'merchant');assert.match(m.sale.summary,/수\(11\/11\).*목\(11\/12\).*금\(11\/13\)/);
});
test('script, website sale cards, maps and research are wired',()=>{
 assert.match(html,/market-discounts-2026-11-03\.js/);assert.match(html,/function saleDisplay\(/);
 assert.match(html,/saleDisplay\(p,true\)/);assert.match(html,/x\.isPlace&&x\.sale\?saleDisplay/);
 assert.match(html,/data\.sale\?saleDisplay\(data\)/);assert.match(html,/MARKET_STOPS/);
 assert.match(html,/const MARKET_STOPS=window\.TFGMarketStops/);
});

test('map opening-state keeps after-midnight supermarkets open without extending daytime shops',()=>{
 const start=html.indexOf('function openingState('),end=html.indexOf('function applyMapClock()',start);
 assert.ok(start>=0&&end>start);
 const snippet=html.slice(start,end);
 const ctx={storeHoursForDate:(p,d)=>({known:true,start:420,end:1500,status:'listed'}),entryAvailableOnDay:()=>true};
 vm.runInNewContext(snippet,ctx,{timeout:1000});
 assert.equal(ctx.openingState({isPlace:true},1470,'11/13'),'open');
 assert.equal(ctx.openingState({isPlace:true},1500,'11/13'),'closed');
 ctx.storeHoursForDate=()=>({known:true,start:480,end:1380,status:'published'});
 assert.equal(ctx.openingState({isPlace:true},1470,'11/13'),'closed');
});
