import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),info=read('info-tab.js');
const ctx={window:{}};vm.runInNewContext(read('pokemon-bulk-2026-11-03.js'),ctx,{timeout:2000});
const stores=ctx.window.TFGPokemonBulk.stores;
test('all discover categories are visible',()=>{
 assert.match(html,/#view-discover #browseTypes\{[^}]*flex-wrap:wrap;overflow:visible/);
 assert.match(html,/const periodTypes=\{day:\['전체','쇼핑','포켓몬','리셀'/);
 assert.match(html,/state.type==='포켓몬'&&x.kind==='place'/);
});
test('map favorites filter uses saved kind-id on pins and list and live updates',()=>{
 assert.match(html,/id="mapSavedOnly"/);assert.match(html,/favoritesOnly:false/);
 assert.match(html,/function selectSavedMapEntries\(entries\)/);
 assert.match(html,/entries.filter\(e=>savedIds.has\(savedKey\(e.kind,e.id\)\)\)/);
 assert.match(html,/mapBrowseEntries=function\(\)\{return selectSavedMapEntries/);
 assert.match(html,/mapFilters.favoritesOnly=!mapFilters.favoritesOnly/);
 assert.match(html,/mapFilters.favoritesOnly&&location.hash.startsWith\('#map'\)/);
});
test('five ranked vintage shops, one map-linked Hareruya',()=>{
 assert.equal(stores.length,19);
 assert.equal(new Set(stores.map(s=>s.id)).size,19);
 assert.equal(stores.filter(s=>s.id==='tcg-hareruya2-tower').length,1);
 assert.equal(stores.filter(s=>s.buyPlan).length,5);
 assert.match(info,/function vintageBuyingShortlist\(g\)/);
 assert.match(info,/이케부쿠로 MINT → LAMB → 보쿠라노/);
 assert.match(html,/if\(p.buyPlan\)/);
});
