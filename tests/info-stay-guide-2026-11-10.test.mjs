import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const src=readFileSync(new URL('../info-tab.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('../info-tab.css',import.meta.url),'utf8');
const ux=readFileSync(new URL('../experience-ux.js',import.meta.url),'utf8');
function mount(hash='#info/stay'){
  const store=new Map();
  const root={innerHTML:'',listeners:{},contains(){return true;},addEventListener(k,f){this.listeners[k]=f;}};
  const status={textContent:''};
  const doc={title:'',getElementById(k){return k==='view-info'?root:k==='stay-feedback'?status:null;}};
  const win={location:{hash},localStorage:{
    getItem(k){return store.get(k)??null;},
    setItem(k,v){store.set(k,v);},
    removeItem(k){store.delete(k);}
  },open(){}};
  vm.runInNewContext(src,{window:win,document:doc,navigator:{clipboard:{writeText:async()=>{}}},URL},{timeout:1000});
  return {root,status,win,store};
}
test('dedicated stay tab, route action, and versioned scripts are in the actual HTML',()=>{
  assert.match(html, /id="navStay"/);
  assert.match(html, /navigate\('info\/stay'\)/);
  assert.match(html, /src="\.\/info-tab\.js\?v=20261110-stay-nav"/);
  assert.match(html, /href="\.\/info-tab\.css\?v=20261110-stay-nav"/);
  assert.match(css, /grid-template-columns:repeat\(6,minmax\(0,1fr\)\)!important/);
});
test('lodging route renders and appears in the info hub',()=>{
  const home=mount('#info').root.innerHTML;
  const page=mount().root.innerHTML;
  assert.match(home,/href="#info\/stay"/);
  assert.match(page,/고엔지 숙소/);
  assert.match(page,/16:00 이후/);
  assert.match(page,/10:00 이전/);
  assert.match(page,/101번 키박스/);
  assert.match(page,/Google 지도 길찾기/);
  assert.match(ux,/path === 'info\/stay'/);
});
test('source-grounded facilities, supplies, rules, and checkout appear',()=>{
  const page=mount().root.innerHTML;
  for(const word of ['세탁기','세제','칫솔','치약','슬리퍼','목욕 수건','샴푸','바디솝','2층 주방','공용',
    '반려동물 금지','실내 금연','가연성','불연성','재활용품','무료 짐 보관','열쇠 반납','2,000엔',
    '10,000엔','서로 다릅니다','スタート','自動','暖房']) assert.ok(page.includes(word),word);
});
test('no host credentials or private PDF id are checked in',()=>{
  for(const value of ['3333','22446688','08043508583','1s7nGYKYUGItIUFMDSn0hICAfRGyyHPv0']){
    assert.ok(!src.includes(value),'JS contains '+value);
    assert.ok(!css.includes(value),'CSS contains '+value);
  }
  assert.match(src,/staySafePdf/);
  assert.match(src,/window\.localStorage\?\.setItem\(stayLocalKey/);
  assert.match(src,/removeItem\(stayLocalKey/);
});
test('secrets require explicit local setup',()=>{
  const {root,store}=mount();
  assert.equal(store.size,0);
  assert.match(root.innerHTML,/name="pin" type="password"/);
  assert.match(root.innerHTML,/name="wifi" type="password"/);
  assert.match(root.innerHTML,/암호화된 보관함이 아닙니다/);
  assert.match(root.innerHTML,/저장 정보 삭제/);
});
test('mobile styles preserve large touch targets and sticky quick access',()=>{
  assert.match(css,/\.stay-primary/);
  assert.match(css,/min-height:48px/);
  assert.match(css,/\.stay-floating/);
  assert.match(css,/env\(safe-area-inset-bottom\)/);
});
