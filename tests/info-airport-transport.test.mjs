import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../info-tab.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../info-tab.css', import.meta.url), 'utf8');
const ux = readFileSync(new URL('../experience-ux.js', import.meta.url), 'utf8');

function mount(hash = '#info/airport') {
  const combo = { innerHTML: '' };
  const root = {
    innerHTML: '',
    listeners: {},
    contains: () => true,
    addEventListener(type, callback) { this.listeners[type] = callback; },
    querySelectorAll() { return []; },
  };
  const document = {
    title: '',
    getElementById(id) {
      if (id === 'view-info') return root;
      if (id === 'airport-combo-result') return combo;
      return null;
    },
  };
  const window = { location: { hash }, localStorage: { getItem: () => null } };
  vm.runInNewContext(script, { window, document, navigator: {} }, { timeout: 1500 });
  return { root, combo, window, document };
}

function choose(root, type, id) {
  const btn = {
    hasAttribute(name) { return name === type; },
    getAttribute(name) { return name === type ? id : null; }
  };
  root.listeners.click({ target: { closest(selector) { return selector === 'button' ? btn : null; } } });
}

test('information landing page adds airport transport without removing existing topics', () => {
  const { root } = mount('#info');
  for (const href of ['#info/airport', '#info/pokemon', '#info/taxfree', '#info/grocery', '#info/resale']) {
    assert.ok(root.innerHTML.includes('href="' + href + '"'), href);
  }
});

test('airport route renders arrival and departure comparisons, steps, prices and check-in constraints', () => {
  const { root, document } = mount();
  assert.match(document.title, /나리타 공항 교통/);
  assert.match(root.innerHTML, /airport-arrival/);
  assert.match(root.innerHTML, /airport-departure/);
  assert.match(root.innerHTML, /airport-combinations/);
  assert.match(root.innerHTML, /공항 열차 대기|예상 첫 대기/);
  assert.match(root.innerHTML, /아사쿠사바시/);
  assert.match(root.innerHTML, /1,617엔/);
  assert.match(root.innerHTML, /3,529엔/);
  assert.match(root.innerHTML, /06:26/);
  assert.match(root.innerHTML, /05:46/);
  assert.match(root.innerHTML, /05:24/);
  assert.match(root.innerHTML, /22분/);
  assert.match(root.innerHTML, /07:40/);
  assert.match(root.innerHTML, /피치항공/);
  assert.match(root.innerHTML, /기차 첫차에 의존하지 않고/);
  assert.match(root.innerHTML, /keisei\.co\.jp/);
  assert.match(root.innerHTML, /jreast\.co\.jp/);
  assert.match(root.innerHTML, /flypeach\.com/);
});

test('changing arrival and departure recomputes totals while preserving discounts', () => {
  const { root, combo } = mount();
  assert.match(root.innerHTML, /4,180엔/);
  choose(root, 'data-airport-arrival', 'nex');
  assert.match(combo.innerHTML, /6,092엔/);
  choose(root, 'data-airport-arrival', 'skyliner');
  assert.match(combo.innerHTML, /5,094엔/);
  assert.match(combo.innerHTML, /120엔/);
  choose(root, 'data-airport-return', 'bus');
  assert.match(combo.innerHTML, /6,251엔/);
  assert.doesNotMatch(combo.innerHTML, /추가 할인 120엔/);
  choose(root, 'data-airport-return', 'skyliner');
  choose(root, 'data-airport-arrival', 'access');
  assert.match(combo.innerHTML, /4,180엔/);
});

test('invalid transport option does not change selection', () => {
  const { root, combo } = mount();
  choose(root, 'data-airport-arrival', 'unknown');
  assert.equal(combo.innerHTML, '');
});

test('progressive info UX and mobile CSS support the new airport route', () => {
  assert.match(ux, /'info\/airport': \{/);
  assert.match(ux, /\['airport-arrival'/);
  assert.match(ux, /\['airport-departure'/);
  assert.match(ux, /\['airport-combinations'/);
  assert.match(css, /info-airport-table-scroll/);
  assert.match(css, /info-airport-pick\[aria-pressed=true\]/);
  assert.match(css, /max-width:650px/);
});
