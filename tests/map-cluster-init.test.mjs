// Run with: node --test tests/map-cluster-init.test.mjs
// Execute the real inline clusterPoints implementation, not a copied helper.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function extractClusterPoints() {
  const begin = html.indexOf('function clusterRadius(z)');
  const end = html.indexOf('function drawClusterPins(', begin);
  assert.ok(begin >= 0 && end > begin, 'the real clustering function must be present');
  return html.slice(begin, end);
}

function calculate(width, geoGroups, zoom = 13) {
  const ctx = {
    window: {
      innerWidth: width,
      TFGMapMarkers: { summarizeNodes: nodes => ({ nodeCount: nodes.length }) },
    },
    GEO_CLUSTER: { geoGroups },
    mercator: (lat, lon) => ({ x: lon, y: lat }),
    unmercator: (x, y) => ({ lat: y, lng: x }),
    symbolKind: item => item.kind,
  };
  const result = vm.runInNewContext(
    extractClusterPoints() + '\nclusterPoints(' + zoom + ');',
    ctx,
    { timeout: 1000, filename: 'index.html#clusterPoints' },
  );
  return JSON.parse(JSON.stringify(result));
}

const geoGroups = [
  { key: 'beta', lat: 0, lon: 0.4, items: [{ name: 'B', kind: 'coffee' }] },
  { key: 'gamma', lat: 0, lon: 200, items: [{ name: 'C', kind: 'shop' }] },
  { key: 'alpha', lat: 0, lon: 0, items: [{ name: 'A', kind: 'sento' }] },
];

for (const width of [390, 1280]) {
  test('clusterPoints works at viewport width ' + width + ' without ReferenceError', () => {
    const points = calculate(width, geoGroups);
    assert.equal(points.length, 2);
    const cluster = points.find(p => p.isCluster);
    const isolated = points.find(p => !p.isCluster);
    assert.equal(cluster.key, 'cluster:alpha|beta');
    assert.equal(cluster.siteCount, 2);
    assert.equal(cluster.items.length, 2);
    assert.equal(cluster.categorySummary.nodeCount, 2);
    assert.equal(isolated.key, 'gamma');
    assert.equal(isolated.siteCount, 1);
  });
}

test('clusterPoints handles an empty map without app initialization failure', () => {
  assert.deepEqual(calculate(390, []), []);
});

test('site marks app-ready after initial map rendering', () => {
  const render = html.lastIndexOf('renderMapTab();showRoute(');
  const ready = html.indexOf("document.body.classList.add('app-ready')", render);
  assert.ok(render >= 0, 'initial map render is required');
  assert.ok(ready > render && ready - render < 180, 'app-ready must follow initial render');
});

test('overview clusters are non-transitive with reduced fixed 40px radius', () => {
  const entries = [0, 30, 46].map((lon, n) => ({
    key: 'item' + n, lat: 0, lon,
    items: [{ id: '' + n, name: '' + n, kind: 'shop' }],
  }));
  const groups = calculate(390, entries, 13);
  assert.equal(groups.length, 2);
  assert.equal(groups[0].siteCount, 2);
  assert.equal(groups[1].siteCount, 1);
});

test('middle zoom uses 26px grouping; zoom 16 and above never cluster', () => {
  const nodes = [0, 22, 36].map((lon,n)=>({
    key: 'g' + n, lat: 0, lon,
    items: [{ id: 'P' + n, name: 'Store ' + n, kind: 'place' }],
  }));
  assert.equal(calculate(1280, nodes, 14).length, 2);
  assert.equal(calculate(390, nodes, 15).length, 2);
  for (const z of [16, 17, 18]) {
    const groups = calculate(390, nodes, z);
    assert.equal(groups.length, 3);
    assert.ok(groups.every(g=>g.isCluster===false && g.items.length===1));
    assert.ok(groups.some(g=>g.spiderOffset),'overlapping pins must separate visibly');
  }
});

test('identical coordinates expose independent clickable IDs with correct geographic anchors', () => {
  const source = [{ key:'same',lat:35.66,lon:139.70,items:
    Array.from({length:17},(_,i)=>({id:'P'+i,kind:'place',name:'Shop '+i})) }];
  const groups = calculate(390, source, 18);
  assert.equal(groups.length, 17);
  assert.equal(new Set(groups.map(x=>x.key)).size,17);
  assert.ok(groups.every(x=>x.lat===35.66 && x.lon===139.70));
  const displayed=groups.map(g=>({x:g.lon+g.spiderOffset.x,y:g.lat+g.spiderOffset.y}));
  for(let i=0;i<displayed.length;i++)for(let j=i+1;j<displayed.length;j++){
    assert.ok(Math.hypot(displayed[i].x-displayed[j].x,displayed[i].y-displayed[j].y)>=36);
  }
});
