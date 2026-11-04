import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const info=read('info-tab.js');
const data={window:{}};
vm.runInNewContext(read('pokemon-visit-plan-2026-11-04.js'),data,{timeout:1500});
vm.runInNewContext(read('pokemon-bulk-2026-11-03.js'),data,{timeout:1500});
const plan=data.window.TFGPokemonVisitPlan;

test('video place data has distinct IDs and explicit visit windows',()=>{
  assert.equal(plan.places.length,14);
  assert.equal(Object.keys(plan.visits).length,20);
  assert.equal(new Set(plan.places.map(p=>p.id)).size,14);
  assert.ok(plan.places.every(p=>p.address&&p.url&&p.hours&&p.lat===null&&p.lon===null));
  assert.ok(plan.places.every(p=>plan.visits[p.id]));
  assert.match(plan.visits['koenji-seven-north'].time,/07:00/);
  assert.match(plan.visits['koenji-seven-north'].basis,/미검증/);
  assert.match(plan.visits['pc-tokyodx'].time,/10:30/);
  assert.match(plan.visits['pcstand-ikebukuro'].time,/통행 중/);
  assert.match(plan.visits['tcg-shibuya-lounge'].reason,/사전 예약자/);
});

test('same IDs join existing places and do not clone already-known stores',()=>{
  const m=html.match(/<script id="site-data" type="application\/json">([\s\S]*?)<\/script>/);
  assert.ok(m);
  const places=JSON.parse(m[1]).PLACES;
  const originalIds=new Set(places.map(p=>p.id));
  for(const s of data.window.TFGPokemonBulk.stores){
    if(!places.some(p=>p.id===s.id||(p.address===s.address&&p.name===s.name)))places.push(s);
  }
  let added=0;
  for(const p of plan.places){
    if(!places.some(x=>x.id===p.id||(x.address===p.address&&x.name===p.name))){places.push(p);added++;}
  }
  assert.equal(added,14);
  assert.equal(new Set(places.map(x=>x.id)).size,places.length);
  assert.ok(originalIds.has('P01'));
  assert.ok(!plan.places.some(p=>p.id==='P01'||p.id==='tcg-hareruya2-tower'));
  assert.match(html,/pokemon-visit-plan-2026-11-04\.js/);
  assert.match(html,/POKEMON_VISIT\.visits\[place\.id\]/);
  assert.match(html,/data\.cardFocus\|\|data\.pokemonVisit/);
});

test('information tab gives video priority, location tab owns store-level details',()=>{
  const root={innerHTML:'',listeners:{},addEventListener(k,f){this.listeners[k]=f;},contains(){return true}};
  const results={innerHTML:''};
  const document={title:'',getElementById(id){return id==='view-info'?root:id==='info-store-results'?results:null;}};
  const window={location:{hash:'#info/pokemon'},TFGPokemonVisitPlan:plan,TFGPokemonBulk:data.window.TFGPokemonBulk};
  vm.runInNewContext(info,{document,window,navigator:{}},{timeout:2000});
  assert.match(root.innerHTML,/id="info-where"/);
  assert.match(root.innerHTML,/정가 팩 구매: 어느 시간에 어떤 판매처/);
  assert.match(root.innerHTML,/pokedoncards\.jp/);
  assert.match(root.innerHTML,/07:00은 전국 공통 입고 시각이 아닙니다/);
  assert.match(root.innerHTML,/장소 상세에서 권장 시간·위치·찜 확인/);
  assert.doesNotMatch(root.innerHTML,/<dl class="info-store-details">/);
  assert.match(root.innerHTML,/지도 통합 매장 19곳/);
  assert.match(root.innerHTML,/이케부쿠로 MINT → LAMB → 보쿠라노/);
});
