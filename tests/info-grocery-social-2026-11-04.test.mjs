import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../info-tab.js', import.meta.url), 'utf8');
const research = readFileSync(new URL('../research/social-shopping-taxrefund-2026-11-04.md', import.meta.url), 'utf8');

function mount(hash = '#info') {
  const root = { innerHTML: '', addEventListener() {}, contains() { return true; } };
  const document = {
    title: '',
    getElementById(id) { return id === 'view-info' ? root : null; },
  };
  const window = { location: { hash } };
  vm.runInNewContext(script, { document, window, navigator: {} }, { timeout: 1000 });
  return { root, window, document };
}

test('a single grocery information route is reachable from the existing information hub', () => {
  const { root, window, document } = mount();
  assert.match(root.innerHTML, /href="#info\/grocery"/);
  window.renderInfoTab('info/grocery');
  assert.match(root.innerHTML, /흑모와규/);
  assert.match(root.innerHTML, /20%引/);
  assert.match(root.innerHTML, /100g当たり/);
  assert.match(root.innerHTML, /#map/);
  assert.match(root.innerHTML, /마트 고기/);
  assert.match(document.title, /마트 흑모와규/);
});

test('supermarket guide qualifies the lodging and price claim instead of asserting savings', () => {
  const { root } = mount('#info/grocery');
  assert.match(root.innerHTML, /에어비앤비가 호텔보다 저렴하다는 비교자료도 없습니다/);
  assert.match(root.innerHTML, /기존 지도/);
  assert.match(root.innerHTML, /세이유 고엔지점/);
  assert.match(root.innerHTML, /면세 환급을 신청하는 대상이 아닙니다/);
  assert.doesNotMatch(root.innerHTML, /매일 20% 할인 보장/);
});

test('tax FAQ separates merchant records, VJW display, payout and airport anecdote', () => {
  const { root } = mount('#info/taxfree');
  assert.match(root.innerHTML, /매장이 전송하지 않은 거래 자체를 단말기가 새로 생성해 주는 것은 아닙니다/);
  assert.match(root.innerHTML, /약 6주간 표시/);
  assert.match(root.innerHTML, /Not approved or expired/);
  assert.match(root.innerHTML, /환급 사업자 앱이나 이메일/);
  assert.match(root.innerHTML, /고베공항/);
  assert.match(root.innerHTML, /나리타/);
});

test('research consolidates duplicate screenshots instead of inflating independent reports', () => {
  assert.match(research, /8장/);
  assert.match(research, /일곱 개의 독립 체험 증거가 아니다/);
  assert.match(research, /국세청 VJW 온라인 확인 FAQ/);
  assert.match(research, /관광청 관광객 FAQ/);
});
