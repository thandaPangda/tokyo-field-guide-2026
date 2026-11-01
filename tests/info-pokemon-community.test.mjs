import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

const script=readFileSync(new URL('../info-tab.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../info-tab.css',import.meta.url),'utf8');

function mount(hash='#info/pokemon'){
  const root={innerHTML:'',listeners:{},addEventListener(k,v){this.listeners[k]=v;},contains(){return true}};
  const results={innerHTML:''};
  const document={title:'',getElementById(id){return id==='view-info'?root:id==='info-store-results'?results:null;}};
  const window={location:{hash},localStorage:{getItem(){return null},setItem(){}}};
  vm.runInNewContext(script,{document,window,navigator:{}},{timeout:1500});
  return {root,results,window};
}

test('three purchase goals and community guidance visible',()=>{
  const {root}=mount();
  assert.match(root.innerHTML,/정가 팩·공식 상품/);
  assert.match(root.innerHTML,/싱글·중고 카드/);
  assert.match(root.innerHTML,/구형 팩·오리파 탐색/);
  assert.match(root.innerHTML,/id="info-buying-decisions"/);
  assert.match(root.innerHTML,/id="info-community"/);
  assert.match(root.innerHTML,/id="info-specialist"/);
  assert.match(root.innerHTML,/오리파.*자체 구성/);
  assert.match(root.innerHTML,/공식 정책 \+ 방문 경험/);
});

test('official store data and Hareruya series distinctions are shown',()=>{
  const {root}=mount();
  assert.match(root.innerHTML,/하레루야2 아키하바라 타워/);
  assert.match(root.innerHTML,/하레루야2 이케부쿠로/);
  assert.match(root.innerHTML,/스루가야 아키하바라 본관/);
  assert.match(root.innerHTML,/SHIBUYA TSUTAYA 포켓몬 카드 라운지/);
  assert.match(root.innerHTML,/하레루야3는 듀얼마스터즈/);
  assert.match(root.innerHTML,/hareruya2\.com/);
  assert.match(root.innerHTML,/suruga-ya\.com/);
  assert.match(root.innerHTML,/shibuyatsutaya\.tsite\.jp/);
});

test('vintage goal does not promise vintage product inventory',()=>{
  const {root,results}=mount();
  root.listeners.click({target:{closest(selector){return selector==='button'?{
    hasAttribute(key){return key==='data-info-goal';},
    getAttribute(){return 'vintage';}
  }:null;}}});
  assert.match(results.innerHTML,/구형 팩·오리파는 취급 여부가 불확실/);
  assert.match(results.innerHTML,/해당 상품 판매를 확인한 목록이 아닙니다/);
  assert.match(results.innerHTML,/aria-pressed="true">구형 팩·오리파 탐색/);
});

test('Akihabara area filter retains only places in Akihabara',()=>{
  const {root,results}=mount();
  root.listeners.click({target:{closest(selector){return selector==='button'?{
    hasAttribute(key){return key==='data-info-region';},
    getAttribute(){return 'akihabara';}
  }:null;}}});
  assert.match(results.innerHTML,/하레루야2 아키하바라/);
  assert.match(results.innerHTML,/스루가야 아키하바라/);
  assert.doesNotMatch(results.innerHTML,/코엔지역 북쪽 출입구점/);
  assert.doesNotMatch(results.innerHTML,/포켓몬센터 시부야/);
});

test('Koenji convenience stores remain unverified even after adding Reddit anecdotes',()=>{
  const {root,results}=mount();
  root.listeners.click({target:{closest(selector){return selector==='button'?{
    hasAttribute(key){return key==='data-info-region';},
    getAttribute(){return 'koenji';}
  }:null;}}});
  assert.match(results.innerHTML,/확인 후보 4곳/);
  assert.match(results.innerHTML,/카드 취급 미확인/);
  assert.doesNotMatch(results.innerHTML,/하레루야2/);
});

test('tax free page remains rendered and styles are responsive',()=>{
  const {root,window}=mount('#info/taxfree');
  assert.match(root.innerHTML,/영수증별 정리는 실용적인 팁/);
  window.renderInfoTab('info');
  assert.match(root.innerHTML,/href="#info\/pokemon"/);
  assert.match(css,/\.info-buy-grid/);
  assert.match(css,/@media\(max-width:840px\)/);
});
