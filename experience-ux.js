/* Discovery + information progressive disclosure. No new place data or route changes. */
(function experienceUx() {
  'use strict';

  function byId(id) { return document.getElementById(id); }
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function scrollToResult(element) {
    if (!element) return;
    element.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
    element.setAttribute('tabindex', '-1');
    if (element.focus) element.focus({ preventScroll: true });
  }

  function initDiscovery() {
    var view = byId('view-discover');
    if (!view || view.classList.contains('experience-discover')) return;
    var header = view.querySelector('.discover-header');
    var controls = view.querySelector('.discover-controls');
    var periodSwitch = controls && controls.querySelector('.daynight-switch');
    if (!header || !controls || !periodSwitch || !byId('browseTypes')) return;
    view.classList.add('experience-discover');
    var h1 = header.querySelector('h1');
    var intro = header.querySelector('p');
    if (h1) h1.textContent = '어떤 도쿄를 발견하고 싶나요?';
    if (intro) intro.textContent = '가고 싶은 곳이 아직 정해지지 않았다면 관심사부터 골라보세요. 모든 장소는 기존 여행 자료와 연결됩니다.';

    var themes = [
      ['01', '현대미술', '전시와 아트 스페이스', '전시 · 공간 · 창작의 영감', 'day', '현대미술'],
      ['02', '공연', '도쿄의 밤과 음악', '클럽 · 라이브 · DJ 공연', 'night', '공연'],
      ['03', '쇼핑', '빈티지와 쇼핑', '편집숍 · 레코드 · 특별한 물건', 'day', '쇼핑'],
      ['04', '카페', '골목의 커피와 킷사텐', '동네를 천천히 걸으며 쉬기', 'day', '카페'],
      ['05', '포켓몬', '포켓몬 카드 찾기', '공식 매장 · 카드 전문점', 'day', '포켓몬'],
      ['06', '식당', '도쿄에서 먹을 것', '라멘 · 스시 · 이자카야', 'day', '식당'],
      ['07', '장보기', '식료품과 포장 음식', '슈퍼마켓 · 수산점 · 식품관', 'day', '장보기'],
      ['08', '리셀', '리셀·중고 매장', '소싱 후보 · 재고는 현장 확인', 'day', '리셀'],
      ['09', '대중목욕탕', '동네 센토 체험', '여행 사이 잠깐 쉬어가기', 'day', '대중목욕탕']
    ];
    var stories = document.createElement('section');
    stories.className = 'discovery-stories';
    stories.setAttribute('aria-labelledby', 'discoveryStoriesTitle');
    stories.innerHTML =
      '<div class="discovery-stories-heading"><div><span class="discovery-overline">DISCOVER BY INTEREST</span>' +
      '<h2 id="discoveryStoriesTitle">관심사로 둘러보기</h2><p>하나를 선택하면 관련 장소와 일정이 아래에 펼쳐집니다.</p></div>' +
      '<span class="discovery-stories-side">9개의 탐색 주제</span></div>' +
      '<div class="discovery-story-grid">' + themes.map(function (t) {
        return '<button type="button" class="discovery-story" data-discovery-theme="' + t[0] +
          '" data-discovery-period="' + t[4] + '" data-discovery-type="' + t[5] +
          '" aria-pressed="false"><span class="discovery-story-index">' + t[0] + ' / ' + t[1] +
          '</span><strong>' + t[2] + '</strong><span class="discovery-story-note">' + t[3] +
          '</span><span class="discovery-story-link" aria-hidden="true">장소 살펴보기 <span>↗</span></span></button>';
      }).join('') + '</div>';
    // Show real entries from the existing dataset before the user applies a filter.
    // Counts refer to registered candidates for the chosen time of day, not live availability.
    if (typeof browseMatches === 'function' && typeof browseState !== 'undefined') {
      themes.forEach(function (theme) {
        try {
          var previewState = Object.assign({}, browseState, {
            period: theme[4], day: 'all', type: theme[5], region: 'all',
            genre: 'all', order: 'time', query: '',
            tags: new Set(), smoking: new Set()
          });
          var examples = browseMatches(previewState);
          if (!examples.length) return;
          var button = stories.querySelector('[data-discovery-theme="' + theme[0] + '"]');
          if (!button) return;
          var preview = document.createElement('span');
          preview.className = 'discovery-story-preview';
          preview.textContent = '등록된 후보 ' + examples.length + '개 · ' +
            examples.slice(0, 2).map(function (entry) { return entry.name; }).join(' / ');
          button.insertBefore(preview, button.querySelector('.discovery-story-link'));
        } catch (_) {
          // Existing exploration still works if preview data cannot be obtained.
        }
      });
    }
    header.insertAdjacentElement('afterend', stories);

    var originalChildren = Array.from(controls.children);
    var basic = document.createElement('div');
    basic.className = 'discovery-basic';
    var toggle = document.createElement('button');
    toggle.className = 'discovery-refine-toggle';
    toggle.id = 'discoveryRefineToggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', 'discoveryRefinePanel');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span>날짜·지역·취향 더 세밀하게 고르기</span><span aria-hidden="true" class="discovery-chevron">⌄</span>';
    var panel = document.createElement('div');
    panel.className = 'discovery-refine-panel';
    panel.id = 'discoveryRefinePanel';
    panel.hidden = true;
    originalChildren.forEach(function (child) { if (child !== periodSwitch) panel.appendChild(child); });
    basic.appendChild(periodSwitch);
    basic.appendChild(toggle);
    controls.appendChild(basic);
    controls.appendChild(panel);
    toggle.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
    });

    var resultBar = view.querySelector('.browse-result-bar');
    var active = document.createElement('div');
    active.className = 'discovery-active-theme';
    active.id = 'discoveryActiveTheme';
    active.hidden = true;
    active.innerHTML = '<span class="discovery-active-label">지금 둘러보는 주제</span>' +
      '<strong id="discoveryActiveName"></strong><button type="button" id="discoveryAllThemes">전체 둘러보기</button>';
    if (resultBar) resultBar.insertAdjacentElement('beforebegin', active);

    function markTheme(button) {
      stories.querySelectorAll('[data-discovery-theme]').forEach(function (node) {
        var selected = node === button;
        node.classList.toggle('selected', selected);
        node.setAttribute('aria-pressed', String(selected));
      });
      active.hidden = !button;
      if (button && byId('discoveryActiveName')) {
        byId('discoveryActiveName').textContent = button.querySelector('strong').textContent;
      }
    }

    var applyingTheme = false;
    stories.addEventListener('click', function (event) {
      var button = event.target.closest('[data-discovery-theme]');
      if (!button) return;
      applyingTheme = true;
      // Use the app's existing filter events to preserve map, bookmarks and result rendering.
      var clear = byId('browseClear');
      if (clear) clear.click();
      var allDay = view.querySelector('[data-browse-day="all"]');
      if (allDay) allDay.click();
      var period = view.querySelector('[data-browse-period="' + button.dataset.discoveryPeriod + '"]');
      if (period) period.click();
      var type = Array.from(byId('browseTypes').querySelectorAll('[data-browse-type]'))
        .find(function (node) { return node.dataset.browseType === button.dataset.discoveryType; });
      if (type) type.click();
      var search = byId('discoverQuickSearch');
      if (search && search.value) {
        search.value = '';
        search.dispatchEvent(new Event('input', { bubbles: true }));
      }
      applyingTheme = false;
      markTheme(button);
      scrollToResult(active);
    });

    if (byId('discoveryAllThemes')) byId('discoveryAllThemes').addEventListener('click', function () {
      applyingTheme = true;
      if (byId('browseClear')) byId('browseClear').click();
      var allDay = view.querySelector('[data-browse-day="all"]');
      if (allDay) allDay.click();
      var day = view.querySelector('[data-browse-period="day"]');
      if (day) day.click();
      var search = byId('discoverQuickSearch');
      if (search && search.value) {
        search.value = '';
        search.dispatchEvent(new Event('input', { bubbles: true }));
      }
      applyingTheme = false;
      markTheme(null);
      scrollToResult(resultBar);
    });

    controls.addEventListener('click', function (event) {
      if (!applyingTheme && event.target.closest('[data-browse-period],[data-browse-day],[data-browse-type],[data-browse-tag],[data-smoking-filter],#browseClear')) markTheme(null);
    });
    controls.addEventListener('change', function () { if (!applyingTheme) markTheme(null); });

    var search = byId('discoverQuickSearch');
    if (search) search.placeholder = '장소·전시·아티스트 이름으로 찾기';
    var count = byId('browseCount');
    if (count && count.parentElement) count.parentElement.classList.add('discovery-result-heading');
  }

  var guides = {
    'info/airport': {
      eyebrow: 'AIRPORT · PLAN YOUR TRANSFER',
      title: '입국과 귀국을 따로 비교하세요',
      text: '입국은 가격·환승과 좌석을, 귀국은 피치항공 체크인 마감 시각을 우선합니다. 원하는 왕복 조합을 골라 총요금을 계산할 수 있습니다.',
      links: [['airport-arrival','입국편 비교','코엔지역까지 5가지'],['airport-departure','귀국 동선','시부야 첫차와 공항 도착'],['airport-combinations','왕복 비용 계산','선택 조합별 총액'],['airport-tickets','발권 안내','할인권과 공식 링크']]
    },
    'info/pokemon': {
      eyebrow: 'CARD SHOPPING · START HERE',
      title: '어떤 카드를 찾고 있나요?',
      text: '구매 목적을 먼저 정하면 매장과 가격 정보를 훨씬 쉽게 비교할 수 있습니다. 현재 재고는 확인되지 않은 상태입니다.',
      links: [['info-stores', '가까운 매장 찾기', '지역·상품별 점포'], ['info-bulk', '벌크·구형 카드', '중고와 스토리지'], ['info-release', '발매·추첨 보기', '11월 판매 정보'], ['info-phrases', '현장에서 질문하기', '바로 복사하는 일본어']]
    },
    'info/taxfree': {
      eyebrow: 'AIRPORT · STEP BY STEP',
      title: '출국할 때 필요한 순서부터',
      text: '면세 구매품을 수하물에 넣기 전에 세관 확인이 우선입니다. 아래 체크리스트와 현장 절차부터 확인하세요.',
      links: [['info-tax-preflight', '출국 전 체크리스트', '준비 상태 확인'], ['info-tax-steps', '공항 진행 순서', '나리타 터미널 기준'], ['info-tax-methods', 'VJW와 단말기', '이용 방법 선택'], ['info-tax-refund', '환급금 확인', '환급 추적']]
    },
    'info/resale': {
      eyebrow: 'TOKYO SCOUT · QUICK START',
      title: '매장을 볼까요, 손익을 계산할까요?',
      text: '상품과 점포는 탐색 후보입니다. 이전 거래 기록을 현재 구매 가능 가격이나 실현 수익으로 보지 마세요.',
      links: [['resale-stores', '후보 매장 찾기', '33개 조사 점포'], ['resale-products', '상품 비교하기', '19개 조사 상품'], ['resale-calc-section', '손익 계산하기', '엔화·수수료 입력'], ['resale-approach', '현장 검증 순서', '구매 전 주의']]
    },
    'info/grocery': {
      eyebrow: 'MARKET · QUICK GUIDE',
      title: '가격표를 읽고 필요한 정보만 확인하세요',
      text: '할인 스티커는 특정 상품 사례입니다. 매장 재고나 숙소 비용에 관한 일반적인 보장은 아닙니다.',
      links: [['info-grocery-section-0', '일본어 라벨 읽기', '품종·가격·기한'], ['info-grocery-section-1', '기존 마트 지도', '동선 연결'], ['info-grocery-section-2', '면세 적용 구분', '일본 내 소비'], ['info-grocery-section-3', '자료의 한계', '사진·가격의 출처']]
    }
  };

  function decorateInfo(path) {
    var root = byId('view-info');
    if (!root || !root.querySelector) return;
    var wrap = root.querySelector('.info-wrap');
    if (!wrap || wrap.classList.contains('info-enhanced')) return;
    wrap.classList.add('info-enhanced');

    if (!guides[path]) {
      wrap.classList.add('info-home-enhanced');
      var homeTitle = wrap.querySelector('.info-title');
      var homeLead = wrap.querySelector('.info-lead');
      if (homeTitle) homeTitle.textContent = '여행 중 필요한 정보만 골라보세요';
      if (homeLead) homeLead.textContent = '쇼핑, 면세, 식료품, 리셀 정보를 목적별로 정리했습니다. 궁금한 주제를 선택하면 먼저 해야 할 일부터 볼 수 있습니다.';
      var tiles = wrap.querySelectorAll('.info-tile');
      tiles.forEach(function (tile, i) {
        var index = document.createElement('span');
        index.className = 'info-home-index';
        index.textContent = '0' + (i + 1);
        tile.insertBefore(index, tile.firstChild);
      });
      return;
    }

    var guide = guides[path];
    var sections = Array.from(wrap.children).filter(function (node) {
      return node.matches && node.matches('.info-section');
    });
    sections.forEach(function (section, i) {
      if (!section.id) section.id = 'info-grocery-section-' + i;
      var details = document.createElement('details');
      details.className = 'info-topic';
      details.open = path === 'info/taxfree' && section.id === 'info-tax-preflight';
      var titleNode = section.querySelector('h2');
      var title = titleNode ? titleNode.textContent.trim() : '더 알아보기';
      var summary = document.createElement('summary');
      summary.innerHTML = '<span class="info-topic-num">' + String(i + 1).padStart(2, '0') +
        '</span><span class="info-topic-name"></span><span class="info-topic-cue" aria-hidden="true">펼치기</span>';
      summary.querySelector('.info-topic-name').textContent = title;
      details.appendChild(summary);
      section.parentNode.insertBefore(details, section);
      details.appendChild(section);
      details.addEventListener('toggle', function () {
        var cue = details.querySelector('.info-topic-cue');
        if (cue) cue.textContent = details.open ? '접기' : '펼치기';
      });
    });

    var quick = document.createElement('section');
    quick.className = 'info-quick-start';
    quick.setAttribute('aria-labelledby', 'infoQuickTitle');
    quick.innerHTML =
      '<span class="info-quick-eyebrow">' + guide.eyebrow + '</span>' +
      '<h2 id="infoQuickTitle">' + guide.title + '</h2>' +
      '<p>' + guide.text + '</p>' +
      '<div class="info-quick-links">' +
      guide.links.map(function (link, i) {
        return '<a href="#' + path + '" data-info-jump="' + link[0] +
          '"><span class="info-quick-index">0' + (i + 1) + '</span><strong>' + link[1] +
          '</strong><small>' + link[2] + '</small></a>';
      }).join('') + '</div>';
    var insertionPoint = path === 'info/taxfree' ? wrap.querySelector('.info-tax-overview')
      : path === 'info/resale' ? wrap.querySelector('.info-meta')
      : wrap.querySelector('.info-notice');
    if (!insertionPoint) insertionPoint = wrap.querySelector('.info-lead');
    if (insertionPoint) insertionPoint.insertAdjacentElement('afterend', quick);
    // The original jump handler still performs scrolling/focus. Open hidden content first.
    if (!root.dataset.infoUxBound) {
      root.dataset.infoUxBound = 'true';
      root.addEventListener('click', function (event) {
        var link = event.target.closest('a[data-info-jump]');
        if (!link || !root.contains(link)) return;
        var target = byId(link.getAttribute('data-info-jump'));
        var chapter = target && target.closest('.info-topic');
        if (chapter) chapter.open = true;
      }, true);
    }
  }

  function installInformationEnhancement() {
    if (typeof window.renderInfoTab !== 'function') return;
    var render = window.renderInfoTab;
    window.renderInfoTab = function (route) {
      render(route);
      decorateInfo(String(route || 'info').replace(/^#/, ''));
    };
    var path = String(window.location.hash || '').replace(/^#/, '');
    if (path === 'info' || path.indexOf('info/') === 0) decorateInfo(path);
  }

  initDiscovery();
  installInformationEnhancement();
})();