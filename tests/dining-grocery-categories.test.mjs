import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('index.html');
const markets = read('market-discounts-2026-11-03.js');
const markers = read('map-marker-system.js');
const ux = read('experience-ux.js');

function between(start, end) {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i + start.length);
  assert.ok(i >= 0 && j > i, 'Missing source section: ' + start);
  return html.slice(i, j);
}
const helpers = between('const GROCERY_TYPE_LABELS=', 'function allBrowseEntries()');
const categories = vm.runInNewContext(helpers +
  '\n({placePurposeOf,placeDisplayCategory,browseTypeFor})', {}, { timeout: 1000 });
const entry = (category, purpose, marketType) =>
  ({ kind:'place', data:{category,placePurpose:purpose,marketType} });

test('dining and grocery are distinct categories, not generic food or shopping', () => {
  assert.equal(categories.browseTypeFor(entry('먹거리','grocery','supermarket')), '장보기');
  assert.equal(categories.browseTypeFor(entry('먹거리')), '장보기');
  assert.equal(categories.browseTypeFor(entry('식사','dining')), '식당');
  assert.equal(categories.browseTypeFor(entry('식사')), '식당');
  assert.equal(categories.browseTypeFor(entry('쇼핑')), '쇼핑');
  assert.equal(categories.browseTypeFor(entry('기타')), '기타');
  assert.equal(categories.placeDisplayCategory({category:'먹거리',marketType:'supermarket'}), '장보기 · 슈퍼마켓');
  assert.equal(categories.placeDisplayCategory({category:'먹거리',marketType:'seafood_market'}), '장보기 · 수산점');
  assert.equal(categories.placeDisplayCategory({category:'먹거리',marketType:'food_hall'}), '장보기 · 식품관');
  assert.equal(categories.placeDisplayCategory({category:'식사'}), '식당');
});

test('15 existing market stops have retained IDs and relevant subtypes', () => {
  const window = {};
  vm.runInNewContext(markets, { window }, { timeout: 1000 });
  const stops = window.TFGMarketStops.places;
  assert.equal(stops.length, 15);
  assert.equal(new Set(stops.map(x => x.id)).size, 15);
  assert.ok(stops.every(x => x.category === '먹거리' && x.placePurpose === 'grocery'));
  assert.ok(stops.every(x => ['supermarket','seafood_market','food_hall'].includes(x.marketType)));
  assert.equal(stops.find(x => x.id === 'MK_OK_KOENJI').marketType, 'supermarket');
  assert.equal(stops.find(x => x.id === 'MK_NAKAMURA_NAKANO').marketType, 'seafood_market');
  assert.equal(stops.find(x => x.id === 'MK_FOODEDGE_SHIBUYA').marketType, 'food_hall');
  assert.match(html, /place\.id==='P07'&&!place\.marketType/);
});

test('day, night, map, saved, global search and interest controls use both categories', () => {
  assert.match(html, /const periodTypes=\{day:\[[^\n]*'식당','장보기'/);
  assert.match(html, /night:\[[^\n]*'식당','장보기'/);
  assert.match(html, /const mapTypeNames=\[[^\n]*'식당','장보기'/);
  assert.match(html, /data-saved-filter="dining">식당/);
  assert.match(html, /data-saved-filter="grocery">장보기/);
  assert.match(html, /\['dining','식당'\],\['grocery','장보기'\]/);
  assert.match(ux, /'06', '식당'/);
  assert.match(ux, /'07', '장보기'/);
});

test('map uses a basket marker and reports groceries separately from restaurants', () => {
  const kind = between('function symbolKind(', 'function pinKind(');
  const symbols = vm.runInNewContext(helpers + kind + '\n({symbolKind})', {}, { timeout: 1000 });
  assert.equal(symbols.symbolKind({isPlace:true,category:'먹거리',placePurpose:'grocery'}), 'grocery');
  assert.equal(symbols.symbolKind({isPlace:true,category:'식사'}), 'food');
  assert.equal(symbols.symbolKind({isPlace:true,category:'쇼핑'}), 'shop');
  assert.match(html, /markerSVG=\{[\s\S]*grocery:'<path/);
  assert.match(html, /\.pin-symbol\.pin-grocery\{/);
  const window = {};
  vm.runInNewContext(markers, {window}, {timeout:1000});
  const groups = window.TFGMapMarkers.summarizeNodes([
    {items:[{kind:'food'}]}, {items:[{kind:'grocery'}]}
  ], x => x.kind);
  assert.equal(groups.categories.length, 2);
  assert.ok(Array.from(groups.categories, c => c.label).includes('식당'));
  assert.ok(Array.from(groups.categories, c => c.label).includes('장보기'));
});

test('saved filters recognize old place:id bookmark keys without migration', () => {
  const savedMatch = between('function savedMatches()', 'function savedCard(');
  const fixture = [
    "const ALL_BROWSE=[{kind:'place',id:'P07',data:{category:'먹거리'},name:'세이유',keywords:'마트'},{kind:'place',id:'P26',data:{category:'식사'},name:'식당',keywords:'라멘'},{kind:'event',id:'F01',data:{},name:'공연',keywords:'공연'}];",
    "const savedIds=new Set(['place:P07','place:P26','event:F01']);",
    "function savedKey(kind,id){return kind+':'+id;}",
    "let savedType='grocery',savedQuery='';"
  ].join('\n');
  const check = [
    'const grocery=savedMatches().map(x=>x.id);',
    "savedType='dining';const dining=savedMatches().map(x=>x.id);",
    "savedType='all';const all=savedMatches().map(x=>x.id);",
    '({grocery,dining,all});'
  ].join('\n');
  const found = vm.runInNewContext(helpers+fixture+savedMatch+check,{}, {timeout:1000});
  assert.deepEqual(Array.from(found.grocery),['P07']);
  assert.deepEqual(Array.from(found.dining),['P26']);
  assert.equal(found.all.length,3);
  assert.match(html, /const SAVED_STORAGE_KEY='tokyo-field-guide:saved:v1'/);
});
