import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const path = file => new URL('../' + file, import.meta.url);
const utils = readFileSync(path('map-marker-system.js'), 'utf8');
const mapHtml = readFileSync(path('index.html'), 'utf8');
const mapCss = readFileSync(path('map-mobile-ux.css'), 'utf8');
const mobileJs = readFileSync(path('map-mobile-ux.js'), 'utf8');

function api() {
  const window = {};
  vm.runInNewContext(utils, { window }, { timeout: 1000 });
  return window.TFGMapMarkers;
}
const kind = x => x.kind;
const svgPaths = {
  event: '<circle cx="10" cy="10" r="6"/>',
  coffee: '<path d="M4 8h16"/>',
  sento: '<path d="M4 12h16"/>',
  shop: '<path d="M4 5h16"/>',
  other: '<circle cx="12" cy="12" r="6"/>'
};

test('one map location is not double counted for repeated events', () => {
  const a = api();
  const nodes = [
    { items: [{ kind: 'event' }, { kind: 'event' }, { kind: 'coffee' }] },
    { items: [{ kind: 'sento' }] },
    { items: [{ kind: 'coffee' }, { kind: 'shop' }] },
    { items: [{ kind: 'sento' }] }
  ];
  const result = a.summarizeNodes(nodes, kind);
  assert.deepEqual(Array.from(result.top, x => [x.kind, x.count]),
    [['sento', 2], ['coffee', 2]]);
  assert.deepEqual(Array.from(result.categories, x => [x.kind, x.count]),
    [['sento', 2], ['coffee', 2], ['event', 1], ['shop', 1]]);
});

test('compact clusters show only one folder and preserve category details on selection', () => {
  const a = api();
  const summary = a.summarizeNodes([
    { items: [{ kind: 'event' }] },
    { items: [{ kind: 'sento' }] },
    { items: [{ kind: 'coffee' }] }
  ], kind);
  const group = { siteCount: 3, items: [1, 2, 3, 4], categorySummary: summary };
  const markup = a.clusterMarkup(group, svgPaths,
    '<svg class="folder" aria-hidden="true"></svg>');
  assert.equal((markup.match(/<svg/g) || []).length, 1); // compact folder only
  assert.match(markup, /cluster-number">3</);
  assert.match(markup, /cluster-glyph/);
  assert.doesNotMatch(markup, /cluster-types/);
  assert.doesNotMatch(markup, /cluster-sento-indicator/);
  const detail = a.compositionMarkup(group, svgPaths);
  assert.match(detail, /공연 1곳/);
  assert.match(detail, /센토 1곳/);
  assert.match(detail, /카페 1곳/);
  assert.match(a.clusterLabel(group), /3개 위치, 4개 콘텐츠/);
  assert.match(a.clusterLabel(group), /포함 유형/);
});

test('representative selection is deterministic and honors visible input only', () => {
  const a = api();
  const input = [{ items: [{ kind: 'shop' }] }, { items: [{ kind: 'sento' }] }];
  const first = a.summarizeNodes(input, kind);
  const second = a.summarizeNodes([...input].reverse(), kind);
  assert.deepEqual(Array.from(first.top, x => x.kind),
    Array.from(second.top, x => x.kind));
  assert.deepEqual(Array.from(first.top, x => x.kind), ['sento', 'shop']);
  assert.equal(a.summarizeNodes([{ items: [{ kind: 'coffee' }] }], kind).top.length, 1);
  assert.equal(a.summarizeNodes([], kind).top.length, 0);
});

test('map integrates new category aggregation and preserves time-based aria labels', () => {
  assert.match(mapHtml, /src="\.\/map-marker-system\.js(?:\?[^"]*)?"/);
  assert.match(mapHtml, /categorySummary:window\.TFGMapMarkers\?\.summarizeNodes\(nodes,symbolKind\)/);
  assert.match(mapHtml, /TFGMapMarkers\?\.clusterMarkup\(g,markerSVG,MAP_CLUSTER_GLYPH\)/);
  assert.match(mapHtml, /TFGMapMarkers\?\.compositionMarkup\(g,markerSVG\)/);
  assert.match(mapHtml, /g\.isCluster\?\(window\.TFGMapMarkers\?\.clusterLabel\(g\)/);
  assert.doesNotMatch(mapHtml, /cluster-sento-indicator/);
});

test('sento contrast and selected marker geometry do not depend on old badge', () => {
  assert.match(mapCss, /#view-map \.pin\.pin-symbol\.pin-sento\s*\{/);
  assert.match(mapCss, /--pb:\s*#367c93/);
  assert.match(mapCss, /--pc:\s*#ffffff/);
  assert.match(mapCss, /background:\s*var\(--pb\)\s*!important/);
  assert.match(mapCss, /\.cluster-glyph svg/);
  assert.match(mapCss, /pin-cluster\s*\{[^}]*width:\s*36px\s*!important/s);
  assert.match(mapCss, /map-spider-anchor/);
  assert.doesNotMatch(mapCss, /cluster-sento-indicator/);
});

test('mobile cluster first tap shows composition and does not auto zoom', () => {
  assert.match(mobileJs, /map-mobile-categories/);
  assert.match(mobileJs, /group\.categorySummary\?\.categories/);
  assert.match(mobileJs, /지도 확대/);
  const intercept = mobileJs.slice(mobileJs.indexOf('var originalOpen = openGroup;'),
    mobileJs.indexOf('// Reset the sheet'));
  assert.doesNotMatch(intercept, /if \(isMobile\(\) && group\.isCluster && mapState\.z < 18\)/);
  assert.match(intercept, /originalOpen\.apply\(this, arguments\)/);
  assert.match(intercept, /showCard\(group\)/);
});
