import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const load=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const dataJs=load('resale-data.js');
const html=load('index.html');
const info=load('info-tab.js');
const css=load('info-tab.css');
const mapCss=load('map-mobile-ux.css');
const markerSystem=load('map-marker-system.js');
const sourceData=JSON.parse(html.match(/<script id="site-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
function getData(){const w={};vm.runInNewContext(dataJs,{window:w},{timeout:1000});return w.TOKYO_RESALE;}
function markers(){const w={};vm.runInNewContext(markerSystem,{window:w},{timeout:1000});return w.TFGMapMarkers;}

test('archive candidate inventory is 33 shops, 19 products and 79 linked candidates',()=>{
 const d=getData();
 assert.equal(d.stores.length,33);
 assert.equal(d.products.length,19);
 assert.equal(d.matchCount,79);
 assert.equal(Object.values(d.links).flat().length,79);
 assert.equal(new Set(d.stores.map(s=>s.id)).size,33);
 assert.equal(new Set(d.products.map(p=>p.id)).size,19);
 assert.ok(d.stores.every(s=>s.address.startsWith('東京都') && s.lat===null && s.lon===null));
 assert.ok(d.products.every(p=>p.kream && p.yen>=0 && p.sell>=0 && p.bid===null && p.recent30d===null));
 for(const [s,ids] of Object.entries(d.links)){
  assert.ok(d.stores.some(row=>row.sourceId===s),'unknown store: '+s);
  for(const id of ids)assert.ok(d.products.some(p=>p.id===id),'unknown product: '+id);
 }
});
test('map uses distinct resale icon, cluster classification and address-only geocoding',()=>{
 const api=markers();
 assert.equal(api.labels.resale,'리셀');
 const summary=api.summarizeNodes([{items:[{kind:'resale'}]},{items:[{kind:'resale'},{kind:'shop'}]}],i=>i.kind);
 assert.equal(summary.categories.find(c=>c.kind==='resale')?.count,2);
 assert.match(html,/markerSVG=\{resale:/);
 assert.match(html,/if\(cat==='리셀'\)return 'resale'/);
 assert.match(html,/const mapTypeNames=\[[^\]]*'리셀'/);
 assert.match(html,/if\(route==='map\/resale'\)\{mapFilters\.type='리셀'/);
 assert.match(html,/if\(c==='리셀'\)return '리셀'/);
 assert.match(html,/if\(RESALE\)\{for\(const s of RESALE\.stores\)/);
 assert.match(html,/lat:null,lon:null,coordinate_status/);
 assert.match(html,/const GEO_CONFIG=\{endpoint:'https:\/\/msearch\.gsi\.go\.jp\/address-search/);
 assert.match(html,/geocodeStatus='address-approx'/);
 assert.match(mapCss,/#view-map \.pin\.pin-symbol\.pin-resale/);
});
test('preserves original embedded trip data and their IDs',()=>{
 assert.ok(sourceData.EVENTS.length>=35);
 assert.ok(sourceData.PLACES.length>=25);
 assert.ok(sourceData.ARTS.length>=6);
 const ids=new Set(sourceData.PLACES.map(p=>p.id));
 for(const s of getData().stores)assert.ok(!ids.has(s.id),'clashing original ID '+s.id);
 assert.match(html,/const SOURCE=JSON\.parse\(document\.getElementById\('site-data'\)\.textContent\)/);
});
test('info has dedicated route, full source caveats and functioning controls',()=>{
 assert.match(info,/href="#info\/resale"/);
 assert.match(info,/function resalePage\(\)/);
 assert.match(info,/if\(path==='info\/resale'\)root\.innerHTML=resalePage\(\)/);
 assert.match(info,/function resaleCalculator\(\)/);
 assert.match(info,/function updateResaleCalculator\(\)/);
 assert.match(info,/data-resale-area/);
 assert.match(info,/data-resale-kind/);
 assert.match(info,/data-resale-pick/);
 assert.match(info,/resale-store-search/);
 assert.match(info,/재고가 있는 곳을 뜻하지 않/);
 assert.match(info,/최고 매수입찰 미확인/);
 assert.match(css,/#view-info \.info-resale-products/);
 assert.match(css,/@media\(max-width:800px\)/);
});
test('JavaScript parses without external build steps',()=>{
 const code=html.slice(html.indexOf("<script>\n'use strict';\nconst SOURCE=")+8,html.lastIndexOf('</script>'));
 assert.doesNotThrow(()=>new vm.Script(code));
 assert.doesNotThrow(()=>new vm.Script(info));
 assert.doesNotThrow(()=>new vm.Script(dataJs));
 assert.doesNotThrow(()=>new vm.Script(markerSystem));
});
