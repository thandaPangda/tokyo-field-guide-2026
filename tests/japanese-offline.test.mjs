import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const study=readFileSync(new URL('../japanese.html',import.meta.url),'utf8');
const infoCss=readFileSync(new URL('../info-tab.css',import.meta.url),'utf8');
const sw=readFileSync(new URL('../service-worker.js',import.meta.url),'utf8');
const reg=readFileSync(new URL('../pwa-register.js',import.meta.url),'utf8');
const manifest=JSON.parse(readFileSync(new URL('../japanese-manifest.webmanifest',import.meta.url),'utf8'));
const data=JSON.parse(study.match(/<script id="studyData" type="application\/json">([\s\S]*?)<\/script>/)[1]);
test('header links to the Japanese page without expanding the mobile bottom navigation',()=>{
  assert.match(index, /id="japaneseNav"[^>]+href="\.\/japanese\.html"/);
  assert.match(index, /id="navInfo"/);
  assert.match(infoCss, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
  assert.match(study, /href="\.\/index\.html"[^>]*>← 여행 일정으로 돌아가기/);
});
test('Japanese vocabulary data stays complete and unique',()=>{
  assert.equal(data.words.length,425);
  assert.equal(data.dialogues.length,118);
  assert.equal(data.counters.length,8);
  assert.equal(new Set(data.words.map(w=>w.jp)).size,425);
  assert.ok(data.words.every(w=>w.ex&&w.exko&&w.p>=1&&w.p<=4));
  assert.ok(data.words.filter(w=>/[㐀-鿿]/.test(w.jp)).every(w=>w.reading));
});
test('offline shell covers both routes and updates independently of itinerary data',()=>{
  assert.match(index,/src="\.\/pwa-register\.js"/);
  assert.match(study,/src="\.\/pwa-register\.js"/);
  assert.match(sw,/cache\.addAll\(PRIMARY\)/);
  assert.match(sw,/\.\/japanese\.html/);
  assert.match(sw,/\.\/index\.html/);
  assert.match(sw,/request\.mode==='navigate'/);
  assert.doesNotThrow(()=>new vm.Script(sw));
  assert.doesNotThrow(()=>new vm.Script(reg));
  assert.equal(manifest.scope,'./');
});
test('progress has dual storage, backup and explicit persistence request',()=>{
  assert.match(study,/const META_KEY=KEY\+'-updated'/);
  assert.match(study,/indexedDB\.open\(DB_NAME,1\)/);
  assert.match(study,/restoreMirror\(\)/);
  assert.match(study,/navigator\.storage\.persist\(\)/);
  assert.match(study,/id="exportBtn"/);
  assert.match(study,/id="importBtn"/);
  assert.match(study,/id="resetBtn"/);
});
