/*
 * Map category aggregation and pictograms.
 * Works from visible map groups, never from unseen/filtered-out locations.
 */
(function (root) {
  'use strict';
  const LABELS = Object.freeze({
    event: '공연', bar: '바·클럽', art: '전시', sento: '센토',
    coffee: '카페', food: '음식', shop: '쇼핑', card: '포켓몬',
    record: '레코드숍', book: '서점', park: '공원', other: '기타'
  });
  const PRIORITY = Object.freeze([
    'event', 'sento', 'art', 'bar', 'record', 'book',
    'coffee', 'food', 'card', 'shop', 'park', 'other'
  ]);
  const rank = kind => {
    const position = PRIORITY.indexOf(kind);
    return position === -1 ? PRIORITY.length : position;
  };
  const normalize = kind => Object.hasOwn(LABELS, kind) ? kind : 'other';

  /*
   * A location counts at most once within each category even when multiple
   * events are registered at the same venue. Locations containing multiple
   * content types may belong to more than one category.
   */
  function summarizeNodes(nodes, kindFor) {
    const counts = new Map();
    for (const node of nodes || []) {
      const kinds = new Set((node.items || []).map(item => normalize(kindFor(item))));
      for (const kind of kinds) counts.set(kind, (counts.get(kind) || 0) + 1);
    }
    const categories = [...counts].map(([kind, count]) => ({
      kind, label: LABELS[kind], count
    })).sort((a, b) => b.count - a.count || rank(a.kind) - rank(b.kind));
    return { categories, top: categories.slice(0, 2) };
  }

  // SVG paths come from the fixed local markerSVG table, never user content.
  function icon(kind, markerSVG, className = '') {
    const paths = markerSVG[kind] || markerSVG.other;
    return '<svg aria-hidden="true"' + (className ? ' class="' + className + '"' : '') +
      ' viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      paths + '</svg>';
  }
  function clusterMarkup(group, markerSVG, folderGlyph) {
    const top = group.categorySummary?.top || [];
    const thumbnails = top.length ? top.map(x => icon(x.kind, markerSVG)).join('') :
      icon('other', markerSVG);
    return '<span class="cluster-folder-cue" aria-hidden="true">' +
      folderGlyph + '</span><span class="cluster-types" aria-hidden="true">' +
      thumbnails + '</span><span class="cluster-number">' +
      Number(group.siteCount) + '</span>';
  }
  function compositionMarkup(group, markerSVG) {
    const categories = group.categorySummary?.categories || [];
    if (!categories.length) return '';
    return '<div class="map-category-summary" aria-label="이 묶음에 포함된 장소 종류">' +
      '<span class="map-category-title">포함된 장소 유형 · 유형 간 위치 중복 가능</span>' +
      '<div class="map-category-chips">' +
      categories.map(x => '<span class="map-category-chip">' +
        icon(x.kind, markerSVG) +
        '<span>' + x.label + ' ' + x.count + '곳</span></span>').join('') +
      '</div></div>';
  }
  function clusterLabel(group) {
    const summary = group.categorySummary?.categories || [];
    const names = summary.map(x => x.label + ' ' + x.count + '곳');
    return '근처 ' + group.siteCount + '개 위치, ' + group.items.length +
      '개 콘텐츠' + (names.length ? ', 포함 유형 ' + names.join(', ') : '') +
      '. 선택하면 구성과 장소 목록을 볼 수 있습니다';
  }
  root.TFGMapMarkers = Object.freeze({
    summarizeNodes, clusterMarkup, compositionMarkup, clusterLabel, labels: LABELS
  });
})(window);
