import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const ux = readFileSync(new URL('../experience-ux.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../experience-ux.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function exportWithMock(saved, entries) {
  let clickHandler, downloaded = null, createdBlob, urlRevoked = false;
  const toolbar = { appendChild(button) { this.button = button; } };
  const document = {
    getElementById(id) { return id === 'savedTotal' ? { parentElement: toolbar } : null; },
    createElement(tag) {
      if (tag === 'button') return {
        setAttribute() {},
        addEventListener(type, callback) { if (type === 'click') clickHandler = callback; }
      };
      if (tag === 'a') return {
        click() { downloaded = { href: this.href, filename: this.download }; },
        remove() {}
      };
      throw new Error('Unexpected element: ' + tag);
    },
    body: { appendChild() {} }
  };
  vm.runInNewContext(ux, {
    document, window: {}, savedIds: new Set(saved), ALL_BROWSE: entries,
    VENUES: { V01: { name: 'Test venue', area: '시부야' } },
    Blob: class {
      constructor(parts, options) {
        this.content = parts.join('');
        this.type = options.type;
        createdBlob = this;
      }
    },
    URL: {
      createObjectURL() { return 'blob:export-test'; },
      revokeObjectURL() { urlRevoked = true; }
    },
    setTimeout(callback) { callback(); }
  }, { timeout: 1000 });
  assert.equal(toolbar.button.textContent, 'JSON 내보내기');
  assert.equal(toolbar.button.type, 'button');
  assert.equal(typeof clickHandler, 'function');
  clickHandler();
  assert.equal(downloaded.filename, 'tokyo-field-guide-saved.json');
  assert.equal(downloaded.href, 'blob:export-test');
  assert.match(createdBlob.type, /application\/json/);
  assert.equal(urlRevoked, true);
  return JSON.parse(createdBlob.content);
}

test('the export action uses the existing saved toolbar without changing storage', () => {
  assert.match(html, /id="savedTotal"/);
  assert.match(html, /id="savedEntries"/);
  assert.match(ux, /id = 'savedExportJson'/);
  assert.match(css, /#view-saved \.saved-export-btn/);
  assert.doesNotMatch(ux, /localStorage\.(?:setItem|removeItem|clear)\(/);
  assert.doesNotThrow(() => new vm.Script(ux));
});

test('JSON contains stable bookmark IDs, details and any unmatched legacy keys', () => {
  const payload = exportWithMock(['place:P01', 'event:E03', 'art:removed'], [
    { kind: 'place', id: 'P01', name: '테스트 식당', area: '고엔지', data: { category: '식사', address: '東京都', time: '11:00–20:00' }, lat: 35.7, lon: 139.6 },
    { kind: 'event', id: 'E03', name: '테스트 공연', area: '시부야', data: { venue: 'V01', date: '11/13', time: '20:00' } }
  ]);
  assert.equal(payload.format, 'tokyo-field-guide-saved');
  assert.equal(payload.version, 1);
  assert.equal(payload.storageKey, 'tokyo-field-guide:saved:v1');
  assert.deepEqual(payload.savedKeys, ['place:P01', 'event:E03', 'art:removed']);
  assert.equal(payload.items[0].name, '테스트 식당');
  assert.equal(payload.items[0].details.address, '東京都');
  assert.equal(payload.items[0].latitude, 35.7);
  assert.equal(payload.items[1].venue.name, 'Test venue');
  assert.equal(payload.items[2].missing, true);
  assert.equal(payload.items[2].key, 'art:removed');
});

test('an empty saved list yields a valid empty JSON export', () => {
  const payload = exportWithMock([], []);
  assert.deepEqual(payload.savedKeys, []);
  assert.deepEqual(payload.items, []);
});
