// Run: node --test tests/sento-map.smoke.test.mjs
// Regression checks: no invented coordinates; sento pin + cluster badge + address priority.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../map-mobile-ux.css', import.meta.url), 'utf8');
const sentoJson = html.match(/const SENTO_VENUES=(\[[\s\S]*?\]);\s*const SENTO_BY_ID=/);
assert.ok(sentoJson, '22 source bathhouses should be retained');
const sentos = JSON.parse(sentoJson[1]);
const officialText = html.match(/const OFFICIAL_SENTO_ADDRESSES=(\{[\s\S]*?\});\s*for\(const sento of SENTO_VENUES\)/);
assert.ok(officialText, 'supplemental official addresses should remain in the source');
const verifiedAddress = vm.runInNewContext('(' + officialText[1] + ')');

function extractFunction(from, until) {
  const start = html.indexOf(from);
  const end = html.indexOf(until, start + from.length);
  assert.ok(start >= 0 && end > start, 'missing function ' + from);
  return html.slice(start, end).trim();
}

test('all 22 sentos remain in the directory without invented initial coordinates', () => {
  assert.equal(sentos.length, 22);
  assert.equal(new Set(sentos.map(s => s.id)).size, 22);
  assert.ok(sentos.every(s => s.location.latitude == null && s.location.longitude == null));
  assert.ok(sentos.every(s => (s.location.address_jp || verifiedAddress[s.id] || '').startsWith('東京都')));
  assert.match(html, /PLACES\.push\(\{id:'SENTO_'\+s\.id,sentoId:s\.id,category:'센토'/);
});

test('individual sento pins keep their bathhouse icon', () => {
  const symbolSource = extractFunction('function symbolKind(item)', '\nfunction pinKind(group)');
  const symbolKind = vm.runInNewContext(symbolSource + '\nsymbolKind');
  assert.equal(symbolKind({ isPlace: true, category: '센토', sentoId: 'kairyoyu' }), 'sento');
  assert.equal(symbolKind({ isPlace: true, category: '킷사텐' }), 'coffee');
  assert.match(html, /sento:'<path d=/);
  assert.match(html, /pin-sento\{background:#367c93!important/);
});

test('visible sento lookups precede ordinary places without bypassing validation', () => {
  const source = extractFunction('function geoLookupPriority(row,choices)', '\nfunction beginGeoLookup()');
  const prioritize = vm.runInNewContext(source + '\ngeoLookupPriority');
  const choices = new Set(['SENTO_kairyoyu', 'P12']);
  assert.ok(prioritize({ key: 'SENTO_kairyoyu', obj: { sentoId: 'kairyoyu' } }, choices) >
            prioritize({ key: 'P12', obj: {} }, choices));
  assert.ok(prioritize({ key: 'P12', obj: {} }, choices) >
            prioritize({ key: 'SENTO_other', obj: { sentoId: 'other' } }, choices));
  assert.ok(prioritize({ key: 'SENTO_other', obj: { sentoId: 'other' } }, choices) >
            prioritize({ key: 'P99', obj: {} }, choices));
  assert.match(html, /const found=Array\.isArray\(arr\)\?arr\.map\(x=>geocodeQuality\(x,address\)\)\.find\(Boolean\):null/);
  assert.match(html, /entry\.obj\.geocodeStatus='address-approx'/);
});

test('mixed place clusters show the sento badge and announce its count', () => {
  const drawSource = extractFunction('function drawClusterPins(force=false)', '\ninstallMapPins=function()');
  let rendered = [];
  const createButton = () => ({
    className: '',
    innerHTML: '',
    attributes: {},
    classList: { add() {} },
    setAttribute(key, value) { this.attributes[key] = value; }
  });
  const makeFragment = () => ({
    children: [],
    appendChild(node) { this.children.push(node); }
  });
  const document = {
    createElement: createButton,
    createDocumentFragment: makeFragment
  };
  const groups = [
    { key: 'sento-cluster', isCluster: true, siteCount: 2, items: [{ sentoId: 'kairyoyu' }, { name: '다른 장소' }] },
    { key: 'plain-cluster', isCluster: true, siteCount: 2, items: [{ name: '가' }, { name: '나' }] }
  ];
  const ctx = {
    GEO_CLUSTER: { zoom: 0, screenWidth: 0 },
    mapState: { z: 13, selected: null, markers: new Map() },
    window: { innerWidth: 390 },
    document,
    clusterPoints: () => groups,
    pinKind: () => 'other',
    MAP_CLUSTER_GLYPH: '<svg></svg>',
    markerSVG: { sento: '<path data-bathhouse="true"/>' },
    pinsEl: { replaceChildren(fragment) { rendered = fragment.children; } },
    applyMapClock() {}, updateGeoLegend() {},
  };
  vm.createContext(ctx);
  vm.runInContext(drawSource + '\ndrawClusterPins(true)', ctx);
  assert.equal(rendered.length, 2);
  assert.match(rendered[0].className, /pin-cluster-sento/);
  assert.match(rendered[0].innerHTML, /cluster-sento-indicator/);
  assert.match(rendered[0].innerHTML, /data-bathhouse="true"/);
  assert.match(rendered[0].attributes['aria-label'], /센토 1곳 포함/);
  assert.doesNotMatch(rendered[1].className, /pin-cluster-sento/);
  assert.doesNotMatch(rendered[1].innerHTML, /cluster-sento-indicator/);
  assert.match(css, /cluster-sento-indicator/);
});
