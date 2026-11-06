import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const html = read('index.html');
const source = read('reservation-ux.js');
const css = read('reservation-ux.css');
const win = {};
vm.runInNewContext(read('reservation-data-2026-11-06.js'), {window:win}, {timeout:1000});
const data = win.TFGReservationGuide;

test('booking enhancement loads after original UX and preserves legacy scripts', () => {
  assert.ok(html.indexOf('experience-ux.js') < html.indexOf('reservation-data-2026-11-06.js'));
  assert.ok(html.indexOf('reservation-data-2026-11-06.js') < html.indexOf('reservation-ux.js'));
  assert.ok(html.includes('reservation-ux.css'));
  assert.match(source, /formerMatches = browseMatches/);
  assert.match(source, /formerRender = renderBrowse/);
  assert.match(source, /window\.__TOKYO_RESERVATION_AUDIT__/);
  assert.match(source, /bookingActive\(context\) && context\.order === 'booking'/);
  assert.doesNotMatch(source, /localStorage\.(setItem|removeItem|clear)/);
});

test('reservation dataset is unique, explicit and does not invent real-time availability', () => {
  assert.equal(new Set(data.places.map(r=>r.id)).size,data.places.length);
  assert.equal(new Set(data.events.map(r=>r.name+'|'+r.date)).size,data.events.length);
  assert.ok(data.places.length>=15 && data.events.length>=10);
  for(const r of [...data.places,...data.events,...data.transport]) {
    assert.match(r.url,/^https:\/\//);
    assert.ok(r.method && r.note && r.when);
  }
  assert.equal(data.events.find(e=>e.name==='BUNT. TOKYO DEBUT').status,'advance-soldout');
  assert.equal(data.events.find(e=>e.name==='the Juzzy Reprise').status,'soldout');
  assert.equal(data.events.find(e=>e.name==='FAVELA FEST').status,'partial');
  assert.match(data.disclosure,/실시간/);
});

function fakeNode() {
  return {
    hidden:false, value:'time',innerHTML:'',children:[],className:'',
    appendChild(node){this.children.push(node);},
    querySelector(){return null;},setAttribute(){},addEventListener(){},
    insertAdjacentElement(){}
  };
}
function harness() {
  const mainPlace = {kind:'place',id:'P30',name:'레코드 바 33⅓ rpm',area:'시부야',
    data:{tags:['예약 필수']}};
  const namedEvent = (id,name,date) => ({kind:'event',id,name,date,area:'시부야',data:{tags:[]}});
  const records=[namedEvent('closed','the Juzzy Reprise','11/14'),
    namedEvent('open','PICNIC PEOPLE PANIC','11/13'),
    namedEvent('bunt','BUNT. TOKYO DEBUT','11/12'),mainPlace];
  const nodes={
    browseOrder:fakeNode(),browseRegions:fakeNode(),browseCount:fakeNode(),
    browseSubline:fakeNode()
  };
  const head=fakeNode();
  const doc={
    getElementById(id){return nodes[id]||null;},
    querySelector(sel){return sel.includes('browse-result-bar')?head:null;},
    createElement(){return fakeNode();}
  };
  const state={tags:new Set(),order:'time',expanded:new Set()};
  const context={
    window:{TFGReservationGuide:data},document:doc,
    ALL_BROWSE:records,browseState:state,CURATED_TAGS:[['예약 필수',''],['예약 권장','']],
    browseMatches(){return records.slice();},
    renderBrowse(){},
    Number,Set,Map,Array,String,Object,
  };
  vm.runInNewContext(source,context,{timeout:1000});
  return {context,state,records,nodes,head};
}

test('booking tags trigger urgency sorting and put closed advance sales last',()=>{
  const {context,state,records,nodes}=harness();
  assert.equal(records.find(x=>x.id==='P30').data.tags.includes('예약 필수'),false);
  assert.equal(records.find(x=>x.id==='P30').data.tags.includes('예약 권장'),true);
  assert.ok(context.CURATED_TAGS.some(x=>x[0]==='온라인 혜택'));
  assert.ok(context.CURATED_TAGS.some(x=>x[0]==='예매 마감'));
  state.tags.add('예약 권장');
  context.renderBrowse();
  assert.equal(state.order,'booking');
  const sorted=context.browseMatches().map(x=>x.id);
  assert.deepEqual(Array.from(sorted),['place','open','bunt','closed'].map(x=>x==='place'?'P30':x));
  assert.match(nodes.browseRegions.innerHTML,/선예매 마감·매진/);
  assert.match(nodes.browseRegions.innerHTML,/현장 입장 보장 아님/);
  assert.match(nodes.browseRegions.innerHTML,/공식 마감 공지 확인/);
});

test('non-booking tags preserve original order and no automatic map filter coupling',()=>{
  const {context,state,records,nodes}=harness();
  state.tags.add('예약 권장');
  context.renderBrowse();
  state.tags.clear();
  context.renderBrowse();
  assert.equal(state.order,'time');
  assert.deepEqual(Array.from(context.browseMatches(),x=>x.id),records.map(x=>x.id));
  assert.doesNotMatch(source,/mapFilters\s*=/);
  assert.match(css,/\.reservation-list/);
  assert.match(css,/@media\(max-width:800px\)/);
  assert.match(css,/:focus-visible/);
});
