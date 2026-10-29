// Run with: node --test tests/map-mobile-ux.smoke.test.mjs
// Dependency-free interaction tests for the branch-only mobile map overlay.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../map-mobile-ux.js', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../map-mobile-ux.css', import.meta.url), 'utf8');

function fixture() {
  let handle = null;
  class Element {
    constructor(id = '') {
      this.id = id;
      this.children = [];
      this.events = {};
      this.dataset = {};
      this.attributes = {};
      this.style = {};
      this.scrollTop = 0;
      this.textContent = '';
      this._classes = new Set();
      this.classList = {
        add: (name) => this._classes.add(name),
        remove: (name) => this._classes.delete(name),
        contains: (name) => this._classes.has(name),
      };
    }
    addEventListener(type, callback) {
      (this.events[type] ||= []).push(callback);
    }
    fire(type, event = {}) {
      for (const callback of this.events[type] || []) callback(event);
    }
    querySelector(selector) {
      if (this.id === 'view-map') {
        return selector === '.map-layout' ? layout
          : selector === '.map-aside' ? aside : null;
      }
      if (this === handle && selector === '.map-sheet-chevron') return chevron;
      if (this === popBody && selector === '.pop-item p') {
        return { textContent: '뮤직바 · 16:00–02:00' };
      }
      return null;
    }
    append(...children) { this.children.push(...children); }
    appendChild(child) { this.children.push(child); return child; }
    insertBefore(child) { this.children.unshift(child); handle = child; }
    replaceChildren(...children) { this.children = children; }
    setAttribute(key, value) { this.attributes[key] = value; }
  }
  const view = new Element('view-map');
  const layout = new Element('layout');
  const aside = new Element('aside');
  const stage = new Element('mapStage');
  const popBody = new Element('popBody');
  const popTitle = new Element('popTitle');
  const asideTitle = new Element('asideTitle');
  const toggle = new Element('mapSheetToggle');
  const expand = new Element('mapSheetExpand');
  const label = new Element('mapSheetLabel');
  const chevron = new Element('chevron');
  asideTitle.textContent = '1개 장소·행사';

  const nodes = {
    'view-map': view, mapStage: stage, popBody, popTitle, asideTitle,
    mapSheetToggle: toggle, mapSheetExpand: expand, mapSheetLabel: label,
  };
  const document = {
    getElementById: (id) => nodes[id],
    createElement: (tag) => new Element(tag),
    addEventListener() {},
  };
  const media = { matches: true, addEventListener() {} };
  const window = new Element('window');
  window.matchMedia = () => media;
  const calls = { opens: 0, hides: 0, renders: 0, views: [], cards: [] };

  const context = {
    document, window,
    mapState: { z: 13 },
    requestRender() {},
    requestAnimationFrame(callback) { callback(); },
    setupSize() {},
    setView(...args) { calls.views.push(args); },
    scrollToMapCard(ids) { calls.cards.push(ids); },
    bookmarkButton() { return '<button class="bookmark-btn">찜</button>'; },
    hidePop() { calls.hides++; },
    openGroup(group) {
      calls.opens++;
      popTitle.textContent = group.items[0].name;
    },
    renderMapTab() { calls.renders++; },
  };
  vm.createContext(context);
  vm.runInContext(script, context, { filename: 'map-mobile-ux.js' });
  const card = layout.children.find((element) => element.id === 'mapMobileCard');
  const group = {
    key: 'selected', items: [{
      id: 'P12', name: '비와이지', kind: 'place', isPlace: true,
    }],
  };
  return { context, group, calls, card, layout, toggle, expand, label, media, window, handle };
}

test('mobile map fills its container and the default list is a peek sheet', () => {
  assert.match(styles, /map-stage\s*\{[^}]*height:\s*100%/s);
  assert.match(styles, /--map-sheet-height:\s*60px/);
  const app = fixture();
  assert.equal(app.layout.dataset.sheet, 'peek');
  assert.match(app.label.textContent, /1개 장소/);
});

test('selecting a pin opens a compact card, and list action expands the sheet', () => {
  const app = fixture();
  app.context.openGroup(app.group);
  assert.equal(app.calls.opens, 1);
  assert.equal(app.card.classList.contains('is-open'), true);
  assert.equal(app.layout.dataset.sheet, 'peek');
  const buttons = app.card.children[1].children;
  const list = buttons.find((element) => element.textContent === '목록에서 보기');
  assert.ok(list);
  list.fire('click');
  assert.equal(app.layout.dataset.sheet, 'half');
  assert.equal(app.calls.cards[0][0], 'P12');
  app.context.hidePop();
  assert.equal(app.card.classList.contains('is-open'), false);
});

test('cluster selection zooms first, without creating a blocking popup', () => {
  const app = fixture();
  app.context.openGroup({
    isCluster: true, siteCount: 4, lat: 35.6, lon: 139.7,
    items: [{ name: '근처', id: 'a' }],
  });
  assert.equal(app.calls.opens, 0);
  assert.equal(app.calls.views.length, 1);
  assert.equal(app.calls.views[0][2], 15);
  assert.equal(app.card.classList.contains('is-open'), false);
});

test('filters reset the sheet; desktop preserves the original popover', () => {
  const app = fixture();
  app.context.openGroup(app.group);
  app.context.renderMapTab();
  assert.equal(app.calls.renders, 1);
  assert.equal(app.layout.dataset.sheet, 'peek');
  assert.equal(app.card.classList.contains('is-open'), false);
  app.media.matches = false;
  app.context.openGroup(app.group);
  assert.equal(app.calls.opens, 2);
  assert.equal(app.card.classList.contains('is-open'), false);
});

test('touch drag changes sheet state and native tap uses the button', () => {
  const app = fixture();
  app.handle.fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientY: 300 });
  app.window.fire('pointermove', { pointerId: 1, clientY: 220 });
  app.window.fire('pointerup', { pointerId: 1, clientY: 220 });
  assert.equal(app.layout.dataset.sheet, 'half');
  app.expand.fire('click');
  assert.equal(app.layout.dataset.sheet, 'full');
  app.toggle.fire('click');
  assert.equal(app.layout.dataset.sheet, 'peek');
});
