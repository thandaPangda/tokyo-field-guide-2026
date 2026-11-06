/* Booking UX enhancement: layered after the base discover filters. No route or saved-key changes. */
(function reservationUx() {
  'use strict';
  var guide = window.TFGReservationGuide;
  if (!guide || typeof browseMatches !== 'function' || typeof renderBrowse !== 'function' ||
      typeof browseState === 'undefined' || typeof CURATED_TAGS === 'undefined') return;

  var bookingTags = new Set(['예약 필수', '예약 권장', '온라인 혜택', '예매 마감']);
  var placeRules = new Map(guide.places.map(function (r) { return [r.id, r]; }));
  var eventRules = new Map(guide.events.map(function (r) { return [r.name + '|' + r.date, r]; }));
  var registered = new Map();

  function safe(text) {
    return String(text == null ? '' : text).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function bookingActive(state) {
    return !!(state.tags && Array.from(state.tags).some(function (t) { return bookingTags.has(t); }));
  }
  function isClosed(record) { return record && (record.status === 'soldout' || record.status === 'advance-soldout'); }
  function labelFor(record) {
    if (!record) return '예약 정보 확인';
    if (record.status === 'soldout') return '선예매 매진';
    if (record.status === 'advance-soldout') return '할인 예매 매진';
    if (record.status === 'partial') return '일부 권종 매진';
    if (record.level === 'required') return '사전권 확인 필수';
    if (record.level === 'priority') return '빠른 예약 권장';
    if (record.level === 'benefit') return '사전구매 혜택';
    return '좌석 예약 권장';
  }
  function shortTags(r) {
    if (isClosed(r)) return r.status === 'soldout' ? ['예약 필수', '예매 마감'] : ['예매 마감'];
    var t = [r.level === 'required' ? '예약 필수' : '예약 권장'];
    if (r.level === 'benefit' || r.benefit) t.push('온라인 혜택');
    return t;
  }
  function register(entry, record) {
    if (!entry || !record) return;
    registered.set(entry.kind + ':' + entry.id, record);
    // Replace the old, overly strong "mandatory" label for walk-in-eligible shops.
    var p = entry.data;
    var otherTags = (p.tags || []).filter(function (t) {
      return !bookingTags.has(t);
    });
    p.tags = Array.from(new Set(otherTags.concat(shortTags(record))));
    // This is rendered by the existing place detail function; keep wording short.
    if (entry.kind === 'place') {
      p.reservationGuide = {
        importance: record.level === 'required' ? 'policy' : record.level === 'priority' ? 'priority' : 'recommend',
        tag: shortTags(record)[0], note: record.note, source: record.url,
        bookingUrl: record.url, reviewedOn: guide.reviewedAt
      };
    }
  }
  for (var entry of ALL_BROWSE) {
    var rule = entry.kind === 'place' ? placeRules.get(entry.id) :
      entry.kind === 'event' ? eventRules.get(entry.name + '|' + entry.date) : null;
    register(entry, rule);
  }

  for (var facet of [['온라인 혜택', '사전 구매·대기 단축 등'], ['예매 마감', '공식 확인된 종료·매진']]) {
    if (!CURATED_TAGS.some(function (x) { return x[0] === facet[0]; })) CURATED_TAGS.push(facet);
  }
  function ruleFor(entry) {
    var found = registered.get(entry.kind + ':' + entry.id);
    if (found) return found;
    var current = entry.data && entry.data.reservationGuide;
    if (current && (entry.kind === 'art' || entry.kind === 'place')) {
      return {name:entry.name,level:current.importance === 'policy' ? 'required' : 'recommended',
        status:'check',rank:65,when:'방문 전',method:'공식 사이트 확인',
        note:current.note,url:current.bookingUrl || current.source,benefit:''};
    }
    return null;
  }
  function ranking(entry) {
    var r = ruleFor(entry);
    return r ? ((isClosed(r) ? 10000 : 0) + (Number.isFinite(r.rank) ? r.rank : 90)) : 20000;
  }
  var formerMatches = browseMatches;
  browseMatches = function (state) {
    var context = state || browseState;
    var results = formerMatches(context);
    if (bookingActive(context) && context.order === 'booking') {
      return results.slice().sort(function (a, b) {
        return ranking(a) - ranking(b) || String(a.date || '').localeCompare(String(b.date || '')) ||
          String(a.name).localeCompare(String(b.name), 'ko');
      });
    }
    return results;
  };

  var order = document.getElementById('browseOrder');
  if (order && !order.querySelector('[value="booking"]')) {
    var option = document.createElement('option');
    option.value = 'booking';
    option.textContent = '예약 급한순';
    order.appendChild(option);
  }
  var root = document.getElementById('browseRegions');
  var resultBar = document.querySelector('#view-discover .browse-result-bar');
  var header = document.createElement('section');
  header.className = 'reservation-overview';
  header.id = 'reservationOverview';
  header.setAttribute('aria-label', '예약 준비 요약');
  header.hidden = true;
  if (resultBar) resultBar.insertAdjacentElement('beforebegin', header);

  function entryLink(entry) {
    return entry.kind === 'place' ? '<button type="button" data-place="' + safe(entry.id) +
      '" class="reservation-detail">장소 상세</button>' :
      entry.kind === 'event' ? '<button type="button" data-detail="' + safe(entry.id) +
      '" class="reservation-detail">공연 상세</button>' :
      '<button type="button" data-browse-art="' + safe(entry.id) +
      '" class="reservation-detail">전시 상세</button>';
  }
  function bookingCard(entry) {
    var r = ruleFor(entry);
    if (!r) return '<article class="reservation-card reservation-misc">' +
      '<div class="reservation-card-heading"><h3>' + safe(entry.name) + '</h3>' +
      '<span class="reservation-location">' + safe(entry.area) + '</span></div>' +
      '<p>다른 선택 태그에 해당하는 장소입니다.</p>' + entryLink(entry) + '</article>';
    var closed = isClosed(r);
    var link = /^https:\/\/[^\s"'<>]+$/i.test(r.url || '') ?
      '<a class="reservation-go" href="' + safe(r.url) + '" target="_blank" rel="noopener noreferrer">' +
      (closed ? '공식 마감 공지 확인' : '예약·구매 안내') + ' ↗</a>' : '';
    var status = 'reservation-status' + (closed ? ' is-closed' : r.status === 'partial' ? ' is-partial' : '');
    return '<article class="reservation-card' + (closed ? ' is-closed' : '') + '">' +
      '<div class="reservation-card-top"><span class="' + status + '">' + safe(labelFor(r)) + '</span>' +
      '<span class="reservation-when">' + safe(r.when || '방문 전') + '</span></div>' +
      '<div class="reservation-card-heading"><h3>' + safe(entry.name) + '</h3>' +
      '<span class="reservation-location">' + safe(entry.date || entry.area || '') + '</span></div>' +
      '<p class="reservation-card-method">' + safe(r.method) + '</p>' +
      '<p class="reservation-card-note">' + safe(r.note) + '</p>' +
      (r.benefit ? '<p class="reservation-benefit">' + safe(r.benefit) + '</p>' : '') +
      '<div class="reservation-card-actions">' + link + entryLink(entry) + '</div></article>';
  }
  function transportHtml() {
    return '<details class="reservation-transport"><summary>공항 교통 할인권도 확인 <span>스카이라이너 등 ' +
      guide.transport.length + '건</span></summary><div class="reservation-transport-items">' +
      guide.transport.map(function (t) {
        return '<div class="reservation-transport-item"><strong>' + safe(t.name) + '</strong>' +
          '<p>' + safe(t.note) + '</p><a href="' + safe(t.url) +
          '" target="_blank" rel="noopener noreferrer">' + safe(t.method) + ' ↗</a></div>';
      }).join('') + '</div></details>';
  }

  var oldSort = 'time', wasActive = false;
  var formerRender = renderBrowse;
  renderBrowse = function () {
    var active = bookingActive(browseState);
    if (active && !wasActive) { oldSort = browseState.order === 'booking' ? 'time' : browseState.order; browseState.order = 'booking'; }
    if (!active && wasActive && browseState.order === 'booking') browseState.order = oldSort;
    wasActive = active;
    formerRender();
    if (!root || !header) return;
    header.hidden = !active;
    var view = document.getElementById('view-discover');
    if (view) view.classList.toggle('reservation-view-active', active && browseState.order === 'booking');
    if (!active) return;
    var entries = browseMatches();
    var closed = entries.filter(function (x) { return isClosed(ruleFor(x)); });
    var urgent = entries.filter(function (x) { return ruleFor(x) && !isClosed(ruleFor(x)); });
    header.innerHTML =
      '<div class="reservation-overview-title"><div><span class="reservation-overline">PLAN YOUR BOOKINGS</span>' +
      '<h2>예약 먼저 확인하기</h2><p>예약이 중요한 곳부터 확인합니다. 잔여 좌석은 실시간으로 조회되지 않습니다.</p></div>' +
      '<label for="reservationQuickOrder">정렬 <select id="reservationQuickOrder">' +
      '<option value="booking">예약 급한순</option><option value="time">기존 시간·지역순</option></select></label></div>' +
      '<p class="reservation-count" aria-live="polite">예약 관련 ' + urgent.length +
      '건 · 선예매 마감 ' + closed.length + '건 · 여행 기간 11/11~15</p>' + transportHtml();
    var quick = header.querySelector('#reservationQuickOrder');
    if (quick) quick.value = browseState.order === 'booking' ? 'booking' : 'time';
    if (browseState.order !== 'booking') return; // Existing filters and regional layout remain available.
    var other = entries.filter(function (x) { return !ruleFor(x); });
    root.innerHTML =
      '<div class="reservation-list" aria-label="예약 긴급도순 결과">' +
      (urgent.length ? '<div class="reservation-list-heading"><h2>지금 확인할 예약</h2><span>' +
        urgent.length + '건</span></div>' + urgent.map(bookingCard).join('') : '') +
      (closed.length ? '<div class="reservation-list-heading is-closed"><h2>선예매 마감·매진</h2><span>' +
        closed.length + '건</span></div>' + closed.map(bookingCard).join('') : '') +
      (other.length ? '<div class="reservation-list-heading"><h2>다른 선택 태그</h2><span>' +
        other.length + '건</span></div>' + other.map(bookingCard).join('') : '') +
      (!entries.length ? '<p class="reservation-empty">선택한 날짜·시간·지역의 예약 관련 항목이 없습니다. 다른 날짜나 낮·밤을 선택하세요.</p>' : '') +
      '</div><p class="reservation-disclaimer">공식 안내 검토: ' + safe(guide.reviewedAt) +
      ' · 매진 표시는 해당 선예매 권종 기준이며 현장 입장 불가와 동일하지 않습니다.</p>';
    var count = document.getElementById('browseCount');
    if (count) count.textContent = '예약 관련 ' + urgent.length + '건 · 선예매 마감 ' + closed.length + '건';
    var sub = document.getElementById('browseSubline');
    if (sub) sub.textContent = '날짜·낮밤·유형·지역·검색 결과를 유지한 예약 우선순위입니다. 밤 공연은 밤 탭에서 확인하세요.';
  };
  if (header) header.addEventListener('change', function (event) {
    if (event.target && event.target.id === 'reservationQuickOrder') {
      browseState.order = event.target.value;
      browseState.expanded.clear();
      renderBrowse();
    }
  });
  // Hook only current discovery, not map filtering or stored favorites.
  renderBrowse();
  window.__TOKYO_RESERVATION_AUDIT__ = {
    placeCount: guide.places.length, eventCount: guide.events.length,
    bookingTags: Array.from(bookingTags), rank: ranking,
    status:labelFor, isClosed:isClosed, reviewedAt:guide.reviewedAt
  };
})();
