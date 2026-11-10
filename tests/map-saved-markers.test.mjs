import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const html = read('index.html');
const css = read('map-mobile-ux.css');
function markers() {
  const window = {};
  vm.runInNewContext(read('map-marker-system.js'), { window }, { timeout: 1000 });
  return window.TFGMapMarkers;
}
test('saved count uses distinct visible kind:id entries', () => {
  const m=markers(),items=[{kind:'place',id:'A'},{kind:'place',id:'A'},{kind:'event',id:'E'},{kind:'place',id:'B'}];
  assert.equal(m.savedCount(items,new Set(['place:A','event:E','place:Z'])),2);
  assert.equal(m.savedCount(items,new Set()),0);
  assert.equal(m.savedCount([],new Set(['place:A'])),0);
});
test('cluster retains location count separately from favorite count', () => {
  const m=markers(),g={siteCount:8,savedCount:3,items:Array(8).fill({}),categorySummary:{categories:[]}};
  const markup=m.clusterMarkup(g,{},'<svg/>');
  assert.match(markup,/cluster-number">8</);
  assert.match(markup,/pin-saved-badge[^>]*>★3</);
  assert.equal((markup.match(/<svg/g)||[]).length,1);
  assert.match(m.clusterLabel(g),/찜 3개/);
  assert.match(m.savedBadge(1,false),/>★</);
  assert.equal(m.savedBadge(0,true),'');
});
test('real dense map rendering reflects saving and unsaving', () => {
  const start=html.indexOf('function drawClusterPins('),end=html.indexOf('function positionSpiderPins()',start);
  assert.ok(start>=0&&end>start);
  const m=markers(),savedIds=new Set(['place:A']);
  const a={key:'cluster:a|b',isCluster:true,siteCount:2,items:[{kind:'place',id:'A',name:'A'},{kind:'event',id:'E',name:'E'}],lat:35.6,lon:139.7};
  const b={key:'c',isCluster:false,siteCount:1,items:[{kind:'place',id:'C',name:'C'}],lat:35.7,lon:139.8};
  function element(){return{attributes:{},children:[],className:'',classList:{add(){}},setAttribute(k,v){this.attributes[k]=v;},appendChild(el){this.children.push(el);}};}
  const mapState={z:13,selected:null,markers:new Map(),groups:[]};
  const ctx={window:{innerWidth:390,TFGMapMarkers:m},document:{createDocumentFragment:element,createElement:element,createElementNS:element},
    mapState,GEO_CLUSTER:{zoom:0,screenWidth:0},savedIds,pinsEl:{replaceChildren(){}},
    markerSVG:{coffee:'<path/>',other:'<circle/>'},MAP_CLUSTER_GLYPH:'<svg/>',pinKind:()=> 'coffee',
    clusterPoints:()=>[a,b],hidePop(){},applyMapClock(){},updateGeoLegend(){}};
  const draw=vm.runInNewContext(html.slice(start,end)+'\ndrawClusterPins;',ctx,{timeout:1000});
  draw(true);
  assert.match(mapState.markers.get(a.key).className,/pin-saved/);
  assert.match(mapState.markers.get(a.key).innerHTML,/★1/);
  assert.doesNotMatch(mapState.markers.get(b.key).className,/pin-saved/);
  savedIds.add('place:C');draw(true);
  assert.match(mapState.markers.get(b.key).innerHTML,/>★</);
  savedIds.delete('place:A');draw(true);
  assert.doesNotMatch(mapState.markers.get(a.key).className,/pin-saved/);
});
test('save and cross-tab changes redraw without resetting filters', () => {
  assert.equal((html.match(/syncSavedMap\(\);/g)||[]).length,2);
  assert.match(html,/if\(mapFilters\.favoritesOnly\)\{renderMapTab\(false\);return;\}/);
  assert.match(html,/drawClusterPins\(true\);\s*requestRender\(\);/);
  assert.match(css,/\.pin\.pin-symbol\.pin-saved/);
  assert.match(html,/map-saved-legend/);
});
