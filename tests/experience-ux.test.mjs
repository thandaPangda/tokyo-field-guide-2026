import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const ux = readFileSync(new URL('../experience-ux.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../experience-ux.css', import.meta.url), 'utf8');
const originalInfo = readFileSync(new URL('../info-tab.js', import.meta.url), 'utf8');

test('enhancement assets load after the original application and information tab', () => {
  assert.match(html, /href="\.\/experience-ux\.css"/);
  assert.match(html, /src="\.\/experience-ux\.js"/);
  assert.ok(html.indexOf('info-tab.css') < html.indexOf('experience-ux.css'));
  assert.ok(html.indexOf('info-tab.js') < html.indexOf('experience-ux.js'));
  assert.match(html, /id="view-discover"/);
  assert.match(html, /id="view-info"/);
});

test('enhancement JavaScript compiles and leaves legacy route functions intact', () => {
  assert.doesNotThrow(() => new vm.Script(ux));
  const invoked = [];
  const window = {
    renderInfoTab(route) { invoked.push(route); },
    location: { hash: '#discover' },
  };
  const document = { getElementById() { return null; } };
  vm.runInNewContext(ux, { window, document }, { timeout: 1000 });
  window.renderInfoTab('info/pokemon');
  window.renderInfoTab('info/taxfree');
  assert.deepEqual(invoked, ['info/pokemon', 'info/taxfree']);
});

test('discovery offers eight interests while relying on existing browse controls', () => {
  const cards = ux.match(/^\s+\['0[1-8]',/gm) || [];
  assert.equal(cards.length, 8);
  for (const type of ['현대미술', '공연', '쇼핑', '카페', '포켓몬', '음식', '리셀', '대중목욕탕']) {
    assert.ok(ux.includes("', '" + type + "']"), type);
  }
  assert.match(ux, /id = 'discoveryRefinePanel'/);
  assert.match(ux, /panel\.hidden = true/);
  assert.match(ux, /byId\('browseClear'\)/);
  assert.match(ux, /data-browse-day="all"/);
  assert.match(ux, /data-browse-type/);
  assert.match(ux, /browseCount/);
});

test('information sections use accessible native disclosure and preserve actions', () => {
  for (const route of ['info/pokemon', 'info/taxfree', 'info/resale', 'info/grocery']) {
    assert.ok(ux.includes("'" + route + "':"), route);
  }
  for (const id of ['info-stores', 'info-bulk', 'info-release', 'info-tax-preflight',
    'info-tax-steps', 'info-tax-methods', 'resale-stores', 'resale-calc-section']) {
    assert.ok(originalInfo.includes(id), id);
    assert.ok(ux.includes(id), id);
  }
  assert.match(ux, /document\.createElement\('details'\)/);
  assert.match(ux, /details\.open = path === 'info\/taxfree'/);
  assert.match(ux, /root\.addEventListener\('click'[\s\S]*true\)/);
  assert.match(ux, /window\.renderInfoTab = function/);
  assert.doesNotMatch(ux, /localStorage\.(setItem|removeItem|clear)\(/);
});

test('responsive and keyboard-friendly styles hide collapsed material', () => {
  assert.match(css, /\[hidden\]\{display:none!important\}/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\(max-width:800px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.info-quick-links/);
  assert.match(css, /\.discovery-story-grid/);
});