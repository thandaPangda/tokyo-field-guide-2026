import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../info-tab.css', import.meta.url), 'utf8');
const script = readFileSync(new URL('../info-tab.js', import.meta.url), 'utf8');

function mount(initialHash = '#info') {
  const root = {
    innerHTML: '',
    listeners: {},
    addEventListener(name, handler) { this.listeners[name] = handler; },
    contains() { return true; },
  };
  const results = { innerHTML: '' };
  const document = {
    title: '',
    getElementById(id) {
      if (id === 'view-info') return root;
      if (id === 'info-store-results') return results;
      return null;
    },
  };
  const window = { location: { hash: initialHash } };
  vm.runInNewContext(script, { document, window, navigator: {} }, { timeout: 1000 });
  return { root, results, window, document };
}

test('index integrates info tab, offline fallback, and route', () => {
  assert.match(html, /id="navInfo"/);
  assert.match(html, /id="view-info"/);
  assert.match(html, /id="offline-info"/);
  assert.match(html, /href="\.\/info-tab\.css"/);
  assert.match(html, /src="\.\/info-tab\.js"/);
  assert.match(html, /route\.startsWith\('info\/'\)/);
  assert.match(html, /renderInfoTab\?\.\(route\)/);
  assert.match(css, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
});

test('information hub navigates to both content sections', () => {
  const { root } = mount();
  assert.match(root.innerHTML, /href="#info\/pokemon"/);
  assert.match(root.innerHTML, /href="#info\/taxfree"/);
});

test('Pokemon view distinguishes official and unverified stock', () => {
  const { root, window } = mount('#info/pokemon');
  assert.match(root.innerHTML, /카드 취급 미확인/);
  assert.match(root.innerHTML, /일반 확장팩이 아니며/);
  assert.match(root.innerHTML, /실시간 재고/);
  assert.match(root.innerHTML, /lawson\.co\.jp/);
  assert.match(root.innerHTML, /pokemon-card\.com/);
  assert.match(root.innerHTML, /고엔지역 북쪽 출입구점/);
  window.renderInfoTab('info/taxfree');
  assert.match(root.innerHTML, /영수증별 정리는 실용적인 팁/);
});

test('region filter limits candidates to four unverified Koenji stores', () => {
  const { root, results, window } = mount('#info/pokemon');
  window.renderInfoTab('info/pokemon');
  const button = {
    hasAttribute(name) { return name === 'data-info-region'; },
    getAttribute() { return 'koenji'; },
  };
  root.listeners.click({ target: { closest(selector) { return selector === 'button' ? button : null; } } });
  assert.match(results.innerHTML, /확인 후보 4곳/);
  assert.match(results.innerHTML, /카드 취급 미확인/);
  assert.doesNotMatch(results.innerHTML, /포켓몬센터 시부야/);
});

test('tax refund view explains inspection before luggage check-in', () => {
  const { root } = mount('#info/taxfree');
  assert.match(root.innerHTML, /적색 결과는 지정 장소에서 구매품 실물 검사가 필요/);
  assert.match(root.innerHTML, /위탁 수하물/);
  assert.match(root.innerHTML, /한 번의 구매 거래/);
  assert.match(root.innerHTML, /법적 봉투 의무는 아닙니다/);
  assert.match(root.innerHTML, /customs\.go\.jp/);
  assert.match(root.innerHTML, /mlit\.go\.jp/);
});
