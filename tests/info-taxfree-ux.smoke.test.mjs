import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

const js=readFileSync(new URL('../info-tab.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../info-tab.css',import.meta.url),'utf8');

function mount(hash='#info/taxfree', saved={}) {
  const root={
    innerHTML:'', listeners:{},
    addEventListener(type,fn){this.listeners[type]=fn;},
    contains(){return true;},
    querySelectorAll(){return [];},
  };
  const extra={};
  const document={
    title:'',
    getElementById(id){
      if(id==='view-info')return root;
      return extra[id]||null;
    },
  };
  const window={
    location:{hash},
    localStorage:{
      getItem(key){return saved[key]??null;},
      setItem(key,value){saved[key]=value;},
    },
  };
  vm.runInNewContext(js,{document,window,navigator:{}},{timeout:2000});
  return {root,extra,window,saved};
}

test('tax-refund guide prioritizes critical timing and separates check from refund',()=>{
  const {root}=mount();
  assert.match(root.innerHTML,/08:30/);
  assert.match(root.innerHTML,/06:30~07:40/);
  assert.match(root.innerHTML,/중앙빌딩 4층/);
  assert.match(root.innerHTML,/위탁·보안검색 전에 세관 확인/);
  assert.match(root.innerHTML,/GREEN · COMPLETED/);
  assert.match(root.innerHTML,/RED · NOT COMPLETED/);
  assert.match(root.innerHTML,/한 번의 구매 거래/);
  assert.match(root.innerHTML,/실용적인 팁이지 법적 봉투 의무는 아닙니다/);
  assert.match(root.innerHTML,/Completed/);
  assert.match(root.innerHTML,/나리타공항/);
  assert.match(root.innerHTML,/nta\.go\.jp/);
});

test('default method is passport kiosk, VJW requires dedicated wifi',()=>{
  const {root,extra}=mount();
  assert.match(root.innerHTML,/현장 단말기에서 처리: 여권 스캔/);
  assert.match(root.innerHTML,/data-tax-method="kiosk" aria-pressed="true"/);
  extra['info-tax-method-panel']={innerHTML:''};
  root.listeners.click({
    target:{
      closest(selector){
        if(selector==='button')return {
          hasAttribute(name){return name==='data-tax-method';},
          getAttribute(){return 'vjw';},
        };
        return null;
      }
    }
  });
  assert.match(extra['info-tax-method-panel'].innerHTML,/Customs_WiFi_For_TaxRefund/);
  assert.match(extra['info-tax-method-panel'].innerHTML,/jcustoms/);
  assert.match(extra['info-tax-method-panel'].innerHTML,/환급 절차/);
  assert.match(extra['info-tax-method-panel'].innerHTML,/Not Completed/);
});

test('preflight checklist persists only checked step identifiers',()=>{
  const {root,extra,window,saved}=mount();
  assert.match(root.innerHTML,/0\/6 완료/);
  extra['tax-check-progress']={textContent:''};
  extra['tax-check-meter']={style:{width:''}};
  root.listeners.change({
    target:{
      hasAttribute(name){return name==='data-tax-check';},
      getAttribute(){return 'purchase';},
      checked:true,
    }
  });
  assert.equal(extra['tax-check-progress'].textContent,'1/6 완료');
  assert.equal(extra['tax-check-meter'].style.width,'17%');
  assert.deepEqual(JSON.parse(saved['tokyo-field-guide:tax-checklist:v1']),['purchase']);
  window.renderInfoTab('info/taxfree');
  assert.match(root.innerHTML,/1\/6 완료/);
  assert.match(root.innerHTML,/data-tax-check="purchase" checked/);
});

test('taxfree information is reachable while other information remains intact',()=>{
  const {root,window}=mount('#info');
  assert.match(root.innerHTML,/href="#info\/pokemon"/);
  assert.match(root.innerHTML,/href="#info\/taxfree"/);
  window.renderInfoTab('info/pokemon');
  assert.match(root.innerHTML,/카드 취급 미확인/);
  window.renderInfoTab('info/taxfree');
  assert.match(root.innerHTML,/영수증별 정리/);
  assert.match(css,/\.info-tax-result-grid/);
  assert.match(css,/\.info-tax-task input:focus-visible/);
});
