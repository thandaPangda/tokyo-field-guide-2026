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
test('stay stays inside the info tab with versioned scripts',()=>{
  assert.match(html, /id="navInfo"/);
  assert.doesNotMatch(html, /id="navStay"/);
  assert.match(html, /src="\.\/info-tab\.js\?v=20261110-stay-nav"/);
  assert.match(html, /href="\.\/info-tab\.css\?v=20261110-stay-nav"/);
  assert.match(css, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
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
test('only one working PDF link, with no dead PDF buttons or PDF setup field',()=>{
  const page=mount().root.innerHTML;
  const pdfUrl='https://drive.google.com/file/d/1s7nGYKYUGItIUFMDSn0hICAfRGyyHPv0/view?usp=drive_link';
  assert.equal(page.split(pdfUrl).length-1,1);
  assert.match(page, /원본 PDF<\/a>/);
  assert.ok(!page.includes('data-stay-action="pdf"'));
  assert.ok(!page.includes('name="pdf"'));
  assert.match(page, /stay-private-details/);
  assert.match(css, /\.stay-floating\{[^}]*grid-template-columns:repeat\(3,1fr\)/);
});
test('entry PIN, Wi-Fi password and phone are not hardcoded',()=>{
  for(const value of ['3333','22446688','08043508583']){
    assert.ok(!src.includes(value),'JS contains '+value);
    assert.ok(!css.includes(value),'CSS contains '+value);
  }
  assert.match(src,/window\.localStorage\?\.setItem\(stayLocalKey/);
  assert.match(src,/removeItem\(stayLocalKey/);
});
test('secrets require explicit local setup',()=>{
  const {root,store}=mount();
  assert.equal(store.size,0);
  assert.match(root.innerHTML,/name="pin" type="password"/);
  assert.match(root.innerHTML,/name="wifi" type="password"/);
  assert.match(root.innerHTML,/암호화되지 않습니다/);
  assert.match(root.innerHTML,/저장 정보 삭제/);
  assert.match(root.innerHTML,/<details id="stay-private-details">/);
});
test('mobile styles preserve large touch targets and sticky quick access',()=>{
  assert.match(css,/\.stay-primary/);
  assert.match(css,/min-height:48px/);
  assert.match(css,/\.stay-floating/);
  assert.match(css,/env\(safe-area-inset-bottom\)/);
});
