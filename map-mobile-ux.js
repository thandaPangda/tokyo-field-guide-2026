/*
 * Mobile map-first UX.
 * Enhances the existing canvas map without touching its data, bookmarks or routes.
 */
(function () {
  'use strict';

  var view = document.getElementById('view-map');
  if (!view) return;
  var layout = view.querySelector('.map-layout');
  var aside = view.querySelector('.map-aside');
  var stage = document.getElementById('mapStage');
  var popBody = document.getElementById('popBody');
  var asideTitle = document.getElementById('asideTitle');
  if (!layout || !aside || !stage || !popBody || !asideTitle) return;

  var mobile = window.matchMedia('(max-width: 800px)');
  var state = 'peek';
  var selection = null;

  var handle = document.createElement('div');
  handle.className = 'map-sheet-handle';
  handle.innerHTML =
    '<button class="map-sheet-toggle" id="mapSheetToggle" type="button" ' +
    'aria-controls="mapItems" aria-expanded="false">' +
    '<span class="map-sheet-label" id="mapSheetLabel">장소 목록</span>' +
    '<span aria-hidden="true" class="map-sheet-chevron">⌃</span></button>' +
    '<button class="map-sheet-expand" id="mapSheetExpand" type="button" ' +
    'aria-label="목록을 전체 높이로 펼치기">전체 보기</button>';
  aside.insertBefore(handle, aside.firstChild);

  var card = document.createElement('section');
  card.id = 'mapMobileCard';
  card.className = 'map-mobile-card';
  card.setAttribute('aria-label', '선택한 지도 장소');
  card.setAttribute('aria-live', 'polite');
  layout.appendChild(card);

  var toggle = document.getElementById('mapSheetToggle');
  var expand = document.getElementById('mapSheetExpand');
  var label = document.getElementById('mapSheetLabel');

  function isMobile() { return mobile.matches; }

  function refreshCount() {
    var title = asideTitle.textContent.trim();
    label.textContent = title ? title + ' · 목록 보기' : '장소 목록 보기';
  }

  function setSheet(next) {
    state = next;
    layout.dataset.sheet = state;
    toggle.setAttribute('aria-expanded', String(state !== 'peek'));
    expand.textContent = state === 'full' ? '접기' : '전체 보기';
    expand.setAttribute('aria-label',
      state === 'full' ? '목록을 절반 높이로 접기' : '목록을 전체 높이로 펼치기');
    handle.querySelector('.map-sheet-chevron').textContent =
      state === 'peek' ? '⌃' : '⌄';
    if (state === 'peek') aside.scrollTop = 0;
    if (typeof requestRender === 'function') requestRender();
  }

  function clearCard() {
    selection = null;
    card.classList.remove('is-open');
    card.replaceChildren();
  }

  function showCard(group) {
    if (!isMobile() || !group) return;
    selection = group;
    var title = document.getElementById('popTitle').textContent;
    var first = group.items[0];
    var many = group.isCluster || group.items.length > 1;
    var subtitle = many
      ? (group.isCluster ? '근처 ' + group.siteCount + '곳 · 목록에서 선택' : '같은 위치의 ' + group.items.length + '개 항목')
      : (popBody.querySelector('.pop-item p')?.textContent || '정보 확인 필요');

    card.replaceChildren();
    var heading = document.createElement('div');
    heading.className = 'map-mobile-heading';
    var info = document.createElement('div');
    info.style.minWidth = '0';
    info.style.flex = '1';
    var name = document.createElement('h3');
    name.textContent = title;
    var description = document.createElement('p');
    description.textContent = subtitle;
    info.append(name, description);
    var close = document.createElement('button');
    close.className = 'map-mobile-close';
    close.type = 'button';
    close.setAttribute('aria-label', '선택한 장소 닫기');
    close.textContent = '×';
    close.addEventListener('click', function () { hidePop(); });
    heading.append(info, close);

    var actions = document.createElement('div');
    actions.className = 'map-mobile-actions';

    if (!many) {
      var detail = document.createElement(first.isArt ? 'a' : 'button');
      detail.className = 'map-mobile-detail';
      detail.textContent = '상세 보기';
      if (first.isArt && first.url) {
        detail.href = first.url;
        detail.target = '_blank';
        detail.rel = 'noopener noreferrer';
        detail.textContent = '공식 전시 안내';
      } else {
        detail.type = 'button';
        if (first.isPlace) detail.dataset.place = first.id;
        else detail.dataset.detail = first.id;
      }
      actions.appendChild(detail);
    }

    var listButton = document.createElement('button');
    listButton.type = 'button';
    listButton.textContent = many ? '이 위치의 목록' : '목록에서 보기';
    listButton.addEventListener('click', function () {
      setSheet('half');
      var ids = group.items.map(function (item) { return item.id; });
      requestAnimationFrame(function () { scrollToMapCard(ids); });
    });
    actions.appendChild(listButton);

    if (!many && typeof bookmarkButton === 'function') {
      var wrap = document.createElement('span');
      wrap.innerHTML = bookmarkButton(first.kind, first.id);
      var saved = wrap.firstElementChild;
      if (saved) actions.appendChild(saved);
    }

    card.append(heading, actions);
    card.classList.add('is-open');
    setSheet('peek');
  }

  function toggleSheet() {
    setSheet(state === 'peek' ? 'half' : 'peek');
  }
  toggle.addEventListener('click', toggleSheet);
  expand.addEventListener('click', function () {
    setSheet(state === 'full' ? 'half' : 'full');
  });

  // Drag the handle to snap between peek, half and full.
  var gesture = null;
  var swallowClick = false;
  handle.addEventListener('pointerdown', function (event) {
    if (!isMobile() || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gesture = { id: event.pointerId, y: event.clientY, moved: false };
    try { handle.setPointerCapture(event.pointerId); } catch (error) {}
  });
  handle.addEventListener('pointermove', function (event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (Math.abs(event.clientY - gesture.y) > 12) gesture.moved = true;
  });
  handle.addEventListener('pointerup', function (event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    var delta = event.clientY - gesture.y;
    if (Math.abs(delta) >= 32) {
      swallowClick = true;
      if (delta < 0) setSheet(state === 'peek' ? 'half' : 'full');
      else setSheet(state === 'full' ? 'half' : 'peek');
    }
    gesture = null;
  });
  handle.addEventListener('pointercancel', function () { gesture = null; });
  handle.addEventListener('click', function (event) {
    if (!swallowClick) return;
    event.preventDefault();
    event.stopPropagation();
    swallowClick = false;
  }, true);

  // Popover content stays in the existing desktop DOM, while mobile gets
  // a small, non-modal summary. The canvas remains touchable around it.
  var originalHide = hidePop;
  hidePop = function () {
    var result = originalHide.apply(this, arguments);
    clearCard();
    return result;
  };

  var originalOpen = openGroup;
  openGroup = function (group) {
    if (!group) return;
    if (isMobile() && group.isCluster && mapState.z < 18) {
      hidePop();
      setSheet('peek');
      setView(group.lat, group.lon, Math.min(18, mapState.z + 2));
      return;
    }
    var result = originalOpen.apply(this, arguments);
    if (isMobile()) showCard(group);
    return result;
  };

  // Reset the sheet when date/type/region changes. Keep the current canvas
  // viewport unless the existing map renderer deliberately fits a region.
  var originalRenderTab = renderMapTab;
  renderMapTab = function () {
    var result = originalRenderTab.apply(this, arguments);
    refreshCount();
    if (isMobile()) {
      clearCard();
      setSheet('peek');
    }
    return result;
  };

  mobile.addEventListener('change', function () {
    clearCard();
    hidePop();
    setSheet('peek');
    if (typeof setupSize === 'function') requestAnimationFrame(setupSize);
  });

  document.addEventListener('keydown', function (event) {
    if (!isMobile() || event.key !== 'Escape') return;
    if (state !== 'peek') {
      setSheet('peek');
      event.preventDefault();
    } else if (card.classList.contains('is-open')) {
      hidePop();
      event.preventDefault();
    }
  });

  refreshCount();
  setSheet('peek');
})();
