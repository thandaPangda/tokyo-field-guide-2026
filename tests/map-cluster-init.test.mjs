// Run with: node --test tests/map-cluster-init.test.mjs
// Execute the real inline clusterPoints implementation, not a copied helper.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function extractClusterPoints() {
  const begin = html.indexOf('function clusterPoints(z)');
  const end = html.indexOf('function drawClusterPins(', begin);
  assert.ok(begin >= 0 && end > begin, 'the real clustering function must be present');
  return html.slice(begin, end);
}

function calculate(width, geoGroups) {
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
    extractClusterPoints() + '\nclusterPoints(13);',
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
