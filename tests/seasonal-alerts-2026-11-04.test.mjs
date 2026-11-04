import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const seasonal=read('seasonal-alerts-2026-11-04.js'),info=read('info-tab.js'),html=read('index.html');
const sandbox={window:{}};vm.runInNewContext(seasonal,sandbox,{timeout:2000});
const r=sandbox.window.TFGSeasonalAlerts;
test('three official 2200 yen mascot SKUs, online only sold out',()=>{
 assert.equal(r.updatedAt,'2026-11-04');
 assert.equal(r.pokemon.items.length,3);
 assert.deepEqual(Array.from(r.pokemon.items.map(x=>x.sku)),['4521329454238','4521329454245','4521329454252']);
 assert.ok(r.pokemon.items.every(x=>x.yen===2200&&x.onlineStatus==='sold_out'));
 assert.match(r.pokemon.stockScope,/온라인/);
});
test('resale completed examples and Korean asks are separate statuses',()=>{
 assert.equal(r.pokemon.japanCompletedExamples.filter(x=>x.productId==='porygon').length,3);
 assert.ok(r.pokemon.japanCompletedExamples.every(x=>x.status==='sold'));
 assert.ok(r.pokemon.koreaListings.every(x=>x.status==='asking_not_completed'));
});
test('AWT dates do not overlap November 11-15',()=>{
 assert.equal(r.artWeek.eventStart,'2026-11-04');
 assert.equal(r.artWeek.eventEnd,'2026-11-08');
 assert.equal(r.artWeek.busStart,'2026-11-06');
 assert.equal(r.artWeek.busEnd,'2026-11-08');
 assert.ok(r.artWeek.busEnd<r.window.start);
 assert.equal(r.artWeek.showTripMapMarker,false);
});
test('UI loads once and links existing store/arts rather than new pins',()=>{
 assert.match(html,/src="\.\/seasonal-alerts-2026-11-04\.js"/);
 assert.match(info,/function seasonalGuide\(\)/);
 assert.match(info,/path==='info\/seasonal'/);
 assert.match(html,/p.seasonalHoliday2026=true/);
 assert.match(html,/11\/11~15 여행 중에는 운행하지 않습니다/);
 const root={innerHTML:'',listeners:{},addEventListener(k,f){this.listeners[k]=f;},contains(){return true;}};
 const ctx={window:{location:{hash:'#info/seasonal'},TFGSeasonalAlerts:r},document:{title:'',getElementById(id){return id==='view-info'?root:null;}},navigator:{}};
 vm.runInNewContext(info,ctx,{timeout:2000});
 assert.match(root.innerHTML,/크리스마스 준비 츄/);
 assert.match(root.innerHTML,/118,000/);
 assert.match(root.innerHTML,/11월 6일/);
 assert.match(root.innerHTML,/11월 11일/);
});
