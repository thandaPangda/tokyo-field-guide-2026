(function infoTabModule() {
  'use strict';
  const checkedOn = '2026.11.01';
  const sources = {
    customs: 'https://www.customs.go.jp/kaigairyoko/taxrefund.htm',
    customsSteps: 'https://www.customs.go.jp/kaigairyoko/taxrefund/C-details.html',
    tourism: 'https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html',
    tourismFaq: 'https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00027.html',
    pokemonMap: 'https://map.pokemon-card.com/',
    lawson: 'https://www.lawson.co.jp/lab/entertainment/art/20260908_toypokemon.html',
    product: 'https://www.pokemon-card.com/products/mega/mg.html',
  };
  const stores = [
    {id:'P01',name:'포켓몬센터 시부야',area:'shibuya',region:'시부야',type:'center',hours:'10:00–21:00',visit:'개점 직후 또는 시부야 관광 중',status:'공식 점포',address:'東京都渋谷区宇田川町15-1 渋谷PARCO 6F',url:'https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/',note:'공식 상품 취급점입니다. 특정 카드팩의 현장 재고와 구매 제한은 별도 확인이 필요합니다.'},
    {id:'pc-megatokyo',name:'포켓몬센터 메가도쿄',area:'ikebukuro',region:'이케부쿠로',type:'center',hours:'10:00–20:00',visit:'개점 직후 고려 · 재고 보장 아님',status:'공식 점포',address:'東京都豊島区東池袋3-1-2 サンシャインシティ アルパ2F',url:'https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/',note:'같은 시설에 포켓몬 카드 스테이션이 있습니다. 일부 행사는 별도 입장 정책이 적용될 수 있습니다.'},
    {id:'pc-tokyodx',name:'포켓몬센터 도쿄 DX',area:'nihonbashi',region:'니혼바시',type:'center',hours:'10:30–21:00',visit:'10:30 개점 직후 또는 인근 관광 중',status:'공식 점포',address:'東京都中央区日本橋2-11-2 日本橋髙島屋S.C. 東館5F',url:'https://shop.pokemon.co.jp/ja/shop/pokemoncenter-tokyodx/',note:'도쿄역·니혼바시 접근에 편리한 공식 점포입니다. 개점 시각은 상품 판매 시작 시각과 다릅니다.'},
    {id:'pc-skytree',name:'포켓몬센터 스카이트리타운',area:'skytree',region:'스카이트리',type:'center',hours:'10:00–21:00',visit:'스카이트리 관광 중 함께 확인',status:'공식 점포',address:'東京都墨田区押上1-1-2 東京ソラマチ イーストヤード4F',url:'https://shop.pokemon.co.jp/ja/shop/pokemoncenter-skytreetown/',note:'공식 상품 취급점이며 카드팩의 실시간 재고는 확인되지 않습니다.'},
    {id:'koenji-seven-north',name:'세븐일레븐 고엔지역 북쪽 출입구점',area:'koenji',region:'코엔지',type:'convenience',hours:'24시간',visit:'이동 중 짧게 확인 · 정해진 입고 시각 없음',status:'카드 취급 미확인',address:'東京都杉並区高円寺北2-19-3',url:'https://www.kouenji.or.jp/shop/convenience-store/sej-kouenjikita.html',note:'점포 소재지와 영업은 확인되었습니다. 포켓몬 카드 판매 여부·재고·구매 제한은 미확인입니다.'},
    {id:'koenji-seven-junjo',name:'세븐일레븐 고엔지 준조상점가점',area:'koenji',region:'코엔지',type:'convenience',hours:'24시간',visit:'역 북쪽 상점가를 지날 때 확인',status:'카드 취급 미확인',address:'東京都杉並区高円寺北3-22-14',url:'https://www.kouenji.or.jp/shop/convenience-store/sej.html',note:'점포 소재지와 영업은 확인되었습니다. 포켓몬 카드 판매 여부·재고·구매 제한은 미확인입니다.'},
    {id:'koenji-famima-junjo',name:'패밀리마트 고엔지 준조상점가점',area:'koenji',region:'코엔지',type:'convenience',hours:'24시간',visit:'역 북쪽 상점가를 지날 때 확인',status:'카드 취급 미확인',address:'東京都杉並区高円寺北3-24-12',url:'https://www.kouenji.or.jp/shop/convenience-store/famima-kouenji_jj.html',note:'점포 소재지와 영업은 확인되었습니다. 오전 10시 판매는 공통 공식 규칙으로 확인되지 않았습니다.'},
    {id:'koenji-lawson-station',name:'로손 고엔지역 앞점',area:'koenji',region:'코엔지',type:'convenience',hours:'24시간',visit:'역 앞 이동 동선에서 확인',status:'카드 취급 미확인',address:'東京都杉並区高円寺北2-4-4',url:'https://www.kouenji.or.jp/shop/convenience-store/lawson.html',note:'점포 소재지와 영업은 확인되었습니다. 특정 상품의 로손 공식 판매 시각이 이 점포 재고를 보장하지 않습니다.'},
    {id:'P03',name:'만다라케 나카노 카드관',area:'nakano',region:'나카노',type:'cardshop',hours:'12:00–20:00 (기존 사이트 등록값)',visit:'정오 이후 방문 고려',status:'카드 전문점',address:'東京都中野区中野5-52-15 中野ブロードウェイ 2F',url:'https://www.mandarake.co.jp/dir/nkn/',note:'중고·구형 카드와 수집품 탐색용입니다. 실물 재고와 가격은 개별 상품별로 확인해야 합니다.'},
    {id:'pao-nakano',name:'류세이노 PAO 나카노',area:'nakano',region:'나카노',type:'cardshop',hours:'11:00–21:00 (기존 사이트 등록값)',visit:'개점 이후 나카노 방문 중',status:'카드 전문점',address:'東京都中野区新井1-9-4',url:'https://pao-toreka.com/shop/nakano.html',note:'싱글 카드·TCG 상품용 전문점입니다. 포켓몬센터의 정가 팩과는 구매 목적과 가격 체계가 다릅니다.'},
  ];
  const state = {goal:'pack',region:'all',kind:'all'};
  const regions = [
    ['all','전체 지역'],['koenji','코엔지'],['nakano','나카노'],['shibuya','시부야'],['ikebukuro','이케부쿠로'],['nihonbashi','니혼바시'],['skytree','스카이트리'],
  ];
  const kinds = [['all','모든 판매처'],['center','포켓몬센터'],['convenience','편의점'],['cardshop','카드 전문점']];
  const $ = id => document.getElementById(id);
  const esc = input => String(input).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const external = (url,text) => '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(text)+'</a>';
  const mapsUrl = (place) => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.address+' '+place.name);
  const header = (short,title,lead) => '<div class="info-kicker">'+esc(short)+'</div><h1 class="info-title">'+esc(title)+'</h1><p class="info-lead">'+esc(lead)+'</p><p class="info-meta">조사 기준 '+checkedOn+' · 점포 정보와 판매 정책은 변경될 수 있습니다.</p>';
  const crumb = (section) => '<nav class="info-crumb" aria-label="현재 위치"><a href="#info">정보</a><span aria-hidden="true">/</span><span aria-current="page">'+esc(section)+'</span></nav>';
  const srcList = (items) => '<ul class="info-source">'+items.map(item=>'<li>'+external(item[1],item[0])+'</li>').join('')+'</ul>';
  const toc = items => '<nav class="info-toc" aria-label="이 페이지에서 이동">'+items.map(x=>'<a class="info-anchor" href="#'+x[0]+'" data-info-jump="'+x[0]+'">'+esc(x[1])+'</a>').join('')+'</nav>';

  function hub() {
    return '<div class="info-wrap">'+header('TOKYO FIELD GUIDE · ESSENTIALS','도쿄 여행 정보','쇼핑과 현지 이용 규칙을 실제 행동 중심으로 정리했습니다. 검증된 규정과 경험에 근거한 참고 팁을 구분합니다.')+
      '<div class="info-grid">'+
      '<a class="info-tile" href="#info/pokemon"><span class="eyebrow">SHOPPING · TCG</span><h2>포켓몬 카드 구매 가이드</h2><p>포켓몬센터·편의점·카드 전문점의 차이, 코엔지 주변 확인 후보, 권장 방문 시간대를 살펴봅니다.</p></a>'+
      '<a class="info-tile" href="#info/taxfree"><span class="eyebrow">CUSTOMS · TAX REFUND</span><h2>2026년 11월 일본 면세 환급</h2><p>세금 포함 결제, 출국 전 세관 확인, 영수증 거래 단위, 밀봉 포장 규정 변경을 확인합니다.</p></a></div>'+
      '<section class="info-section"><div class="info-notice"><strong>이 정보 탭이 다루는 범위</strong>실시간 재고를 예측하거나 동선을 자동 편성하지 않습니다. 현장에서 어디를 확인하고 어떤 규정을 지켜야 할지 판단하는 데 필요한 자료를 제공합니다.</div></section></div>';
  }

  function storeCard(store) {
    const label = store.type==='center'?'포켓몬센터':store.type==='convenience'?'편의점':'카드 전문점';
    const official = store.type==='center';
    return '<article class="info-store"><div class="info-store-top"><div><div class="info-kicker">'+esc(store.region)+' · '+label+'</div><h3 class="info-store-title">'+esc(store.name)+'</h3></div><span class="info-status'+(official?' official':'')+'">'+esc(store.status)+'</span></div>'+
      '<p class="info-store-address">'+esc(store.address)+'</p>'+
      '<dl class="info-store-details"><dt>영업시간</dt><dd>'+esc(store.hours)+'</dd><dt>방문 안내</dt><dd>'+esc(store.visit)+'</dd><dt>판매 정보</dt><dd>'+esc(store.note)+'</dd></dl>'+
      '<div class="info-store-actions">'+external(store.url,'점포·출처 보기')+' '+external(mapsUrl(store),'지도 열기')+'</div></article>';
  }

  function storeResults() {
    const filtered=stores.filter(s=>{
      if(state.region!=='all'&&s.area!==state.region)return false;
      if(state.kind!=='all'&&s.type!==state.kind)return false;
      return true;
    });
    const rank=s=>state.goal==='pack' ? ({center:0,convenience:1,cardshop:2}[s.type]) : ({cardshop:0,center:1,convenience:2}[s.type]);
    filtered.sort((a,b)=>rank(a)-rank(b));
    return '<div class="info-filters"><span class="info-filter-caption">구매 목적</span><div class="info-choices" role="group" aria-label="구매 목적">'+
      [['pack','정가 팩·공식 상품'],['single','싱글·중고 카드']].map(o=>'<button type="button" class="info-filter" data-info-goal="'+o[0]+'" aria-pressed="'+(state.goal===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">지역 선택</span><div class="info-choices" role="group" aria-label="지역 필터">'+regions.map(o=>'<button type="button" class="info-filter" data-info-region="'+o[0]+'" aria-pressed="'+(state.region===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">판매처 구분</span><div class="info-choices" role="group" aria-label="판매처 유형 필터">'+kinds.map(o=>'<button type="button" class="info-filter" data-info-kind="'+o[0]+'" aria-pressed="'+(state.kind===o[0])+'">'+o[1]+'</button>').join('')+'</div></div>'+
      '<p class="info-results" aria-live="polite">조건에 맞는 확인 후보 '+filtered.length+'곳 · 카드 재고/편의점 취급 여부를 확인한 결과가 아닙니다.</p>'+
      '<div class="info-list">'+(filtered.length?filtered.map(storeCard).join(''):'<p class="info-empty">선택한 조건의 점포 데이터가 없습니다. 지역이나 판매처 유형을 바꿔보세요.</p>')+'</div>';
  }

  function pokemon() {
    return '<div class="info-wrap">'+crumb('포켓몬 카드')+
      header('SHOPPING · POKÉMON TCG','도쿄에서 포켓몬 카드 구매하기','정가 팩을 찾는 경우와 싱글 카드를 구매하는 경우는 적합한 매장이 다릅니다. 카드 판매가 확인되지 않은 편의점은 구매 확정 장소로 안내하지 않습니다.')+
      '<div class="info-notice"><strong>먼저 기억할 3가지</strong>공식 포켓몬센터도 원하는 팩의 재고를 보장하지 않습니다. 편의점은 같은 체인이라도 취급 여부가 다릅니다. 영업시간·판매 개시·상품 입고는 서로 다른 정보입니다.</div>'+
      toc([['info-where','판매처 비교'],['info-convenience','편의점 구매법'],['info-stores','도쿄 확인 후보'],['info-phrases','현장 표현'],['info-sources','공식 근거']])+
      '<section class="info-section" id="info-where"><h2>어디서 살까?</h2>'+
      '<table class="info-table"><thead><tr><th>판매처</th><th>적합한 목적</th><th>확인할 조건</th></tr></thead><tbody>'+
      '<tr><td>포켓몬센터</td><td>공식 정가 상품, 관련 굿즈</td><td>점포 영업시간, 상품별 재고·구매 제한</td></tr>'+
      '<tr><td>편의점</td><td>이동 중 낱개 팩 구매 시도</td><td>점포의 카드 취급 여부 자체가 미확인일 수 있음</td></tr>'+
      '<tr><td>카드 전문점</td><td>싱글·중고·구형 카드, 가격 비교</td><td>프리미엄 가격/매입·판매 조건 확인</td></tr></tbody></table>'+
      '<p class="info-note">위 표는 구매 목적별 구분이며 실시간 재고나 실제 구매 성공률 순위가 아닙니다.</p></section>'+
      '<section class="info-section" id="info-convenience"><h2>편의점 구매법: 점포별 취급 여부가 우선</h2>'+
      '<table class="info-table"><thead><tr><th>체인</th><th>시간 안내의 의미</th><th>주의할 점</th></tr></thead><tbody>'+
      '<tr><td>세븐일레븐</td><td>오전 7시: 비공식 참고 경험</td><td>체인 공통 판매시간 아님. 취급·입고·구매 제한은 점포별로 다름.</td></tr>'+
      '<tr><td>패밀리마트</td><td>오전 10시: 비공식 참고 경험</td><td>체인 공통 판매시간 아님. 카드 판매가 없는 점포도 있음.</td></tr>'+
      '<tr><td>로손</td><td>2026년 9월 16일 특정 팩은 07:00 공식 공지</td><td>해당 상품은 1회 계산 5팩 제한. 11월의 다른 상품과 모든 점포에 자동 적용되지 않음.</td></tr></tbody></table>'+
      '<p class="info-note">사용자 경험에 근거한 시간은 관찰 정보로만 표시했습니다. 로손의 07:00/5팩은 9월 16일 30th CELEBRATION 상품에 한정된 공식 사례입니다.</p>'+
      '<div class="info-notice info-warning"><strong>입고 시간 문의와 대기 주의</strong>로손은 해당 상품 공지에서 점포별 재고·납품 시각 문의와 판매 전 대기를 제한했습니다. 점원에게 입고 시간 문의를 반복하거나 매장 내에서 대기하는 행동을 권하지 않습니다.</div>'+
      '<p class="info-note">공식 포켓몬 카드 취급점 지도는 모든 취급점을 보여주지 않고, 표시된 곳도 품절일 수 있다고 안내합니다. 지도 미등재=비취급이라고 판정하지 않습니다.</p></section>'+
      '<section class="info-section" id="info-stores"><h2>도쿄에서 접근 가능한 점포</h2><p>코엔지 숙박을 고려해 역 주변 편의점을 확인 후보로 포함했습니다. 상품 재고가 확인된 곳을 의미하지 않으며, 별도의 날짜별 방문 일정을 만들지 않습니다.</p>'+
      '<div id="info-store-results">'+storeResults()+'</div></section>'+
      '<section class="info-section"><h2>여행 기간 주목할 공식 상품</h2><div class="info-notice"><strong>11월 13일 출시 · 스페셜 덱 세트 MEGA</strong>메가오더일·메가망나뇽·메가팬텀의 구축 덱 세트이며 희망소비자가격은 5,500엔(세금 포함)입니다. 일반 확장팩이 아니며, 출시일이 즉시 구매 가능함을 보장하지 않습니다. '+external(sources.product,'상품 공식 정보')+'</div></section>'+
      '<section class="info-section" id="info-phrases"><h2>매장에서 사용할 일본어</h2><p>판매 중인 상품에 관해 짧게 확인할 때 사용하세요. 금지된 개별 납품/재고 문의나 장시간 대기를 권하는 표현은 포함하지 않았습니다.</p>'+
      '<div class="info-phrases">'+[
        ['포켓몬 카드를 취급하나요?','ポケモンカードは取り扱っていますか。'],
        ['이 상품을 구매할 수 있나요?','この商品は購入できますか。'],
        ['구매 수량 제한이 있나요?','購入数の制限はありますか。']
      ].map(o=>'<div class="info-phrase"><div><strong>'+esc(o[0])+'</strong><span lang="ja">'+esc(o[1])+'</span></div><button class="info-copy" type="button" data-info-copy="'+esc(o[1])+'">복사</button></div>').join('')+'</div><div id="info-copy-status" class="info-copy-result" role="status" aria-live="polite"></div></section>'+
      '<section class="info-section" id="info-sources"><h2>정보의 근거</h2>'+
      srcList([['포켓몬 카드 공식 취급점 검색과 미등재 안내',sources.pokemonMap],['로손 상품별 판매·문의 제한 공지 (2026-09-08)',sources.lawson],['11월 13일 스페셜 덱 세트 공식 정보',sources.product],['포켓몬센터 메가도쿄 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/'],['포켓몬센터 시부야 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/']])+
      '<p class="info-note">점포별 출처는 각 카드에서 확인할 수 있습니다. 기존 여행 사이트에 등록된 카드 전문점의 영업시간은 변경 가능하므로 현장 방문 전 다시 확인하세요.</p></section></div>';
  }

  function taxfree() {
    return '<div class="info-wrap">'+crumb('일본 면세 환급')+
      header('TRAVEL RULES · 2026.11.01','일본 면세제도: 출국할 때 환급받기','2026년 11월 1일 이후 구매부터 세금 포함 가격으로 결제한 뒤, 출국 시 세관 확인을 통해 소비세 상당액을 환급받는 방식으로 바뀌었습니다.')+
      '<div class="info-notice info-warning"><strong>공항에서는 수하물을 맡기기 전에 면세 확인</strong>신규 면세 환급 절차는 국제선 출발 로비의 지정 단말기/세관에서 먼저 진행해야 합니다. 적색 결과가 나오면 물건을 직접 제시해야 하므로 위탁하기 전에 구매품 전부를 꺼낼 수 있어야 합니다.</div>'+
      toc([['info-tax-steps','절차'],['info-tax-receipts','영수증과 포장'],['info-tax-faq','자주 묻는 질문'],['info-tax-sources','공식 출처']])+
      '<section class="info-section" id="info-tax-steps"><h2>구매부터 환급까지</h2><div class="info-steps">'+
      '<div class="info-step"><div><h3>면세점에서 여권을 제시하고 세금 포함 가격으로 결제</h3><p>같은 매장에서 같은 날 세전 5,000엔 이상 등의 요건이 필요합니다. 면세점에서 지정하는 환급 수단 등록 절차를 확인하세요.</p></div></div>'+
      '<div class="info-step"><div><h3>면세 대상 전 상품을 소지한 채 출국 공항으로 이동</h3><p>구매일부터 90일 이내에 물건을 일본 밖으로 반출해야 합니다. 세관에서 실물 확인을 요구할 가능성에 대비하세요.</p></div></div>'+
      '<div class="info-step"><div><h3>위탁 수하물 접수 전에 단말기/세관에서 확인</h3><p>여권 등을 제시합니다. 녹색 결과는 세관 확인 완료, 적색 결과는 지정 장소에서 구매품 실물 검사가 필요하다는 의미입니다.</p></div></div>'+
      '<div class="info-step"><div><h3>세관 확인 후 매장 또는 환급 서비스가 환급</h3><p>환급 방법과 입금 시기는 판매점·환급 사업자마다 다릅니다. 적색 결과 자체가 환급 불가 판정은 아닙니다.</p></div></div>'+
      '</div></section>'+
      '<section class="info-section" id="info-tax-receipts"><h2>영수증별 정리는 실용적인 팁이지 법적 봉투 의무는 아닙니다</h2>'+
      '<p>공식적으로 세관 확인은 한 번의 구매 거래(영수증 등) 단위로 이루어집니다. 한 거래에 포함된 면세 물품 중 하나라도 제시할 수 없다면, 그 거래의 나머지 물품까지 확인 및 환급이 불가능할 수 있습니다.</p>'+
      '<div class="info-grid"><div class="info-notice"><strong>권장하는 정리법</strong>돈키호테·백화점 등에서 산 물건을 영수증과 대응되도록 구별해 보관하세요. 작은 쇼핑백이나 지퍼백을 활용하면 세관 검사가 필요할 때 찾기 쉽습니다.</div>'+
      '<div class="info-notice"><strong>법적 규정과 다른 부분</strong>매장별로 반드시 별도 쇼핑백을 써야 하는 의무는 확인되지 않았습니다. 다른 상점의 물건을 한 가방에 넣었다는 이유만으로 환급이 거절되는 규정도 아닙니다.</div></div>'+
      '<p>소비재(음식·화장품 등)에 적용되던 특수 밀봉 포장 요건은 폐지되었습니다. 하지만 해당 면세 대상 소비재를 일본 안에서 사용·소비하면 환급을 받지 못할 수 있습니다.</p></section>'+
      '<section class="info-section" id="info-tax-faq"><h2>자주 묻는 질문</h2><div class="info-faq">'+
      '<details><summary>녹색과 적색은 무엇을 뜻하나요?</summary><p>녹색은 세관 확인 절차의 완료를 의미합니다. 적색은 세관 지정 검사 구역에서 구매품을 확인해야 한다는 뜻이며, 즉시 환급 거절을 뜻하지는 않습니다.</p></details>'+
      '<details><summary>가방을 먼저 위탁했다면 어떻게 되나요?</summary><p>공식 안내는 위탁 전 수속을 요구합니다. 위탁한 수하물을 절차 때문에 되찾을 수 없으므로, 면세 물품 확인을 마친 뒤 항공사에 맡기세요.</p></details>'+
      '<details><summary>다른 매장에서 산 물건을 하나의 가방에 넣으면 안 되나요?</summary><p>그 자체가 금지된다는 공식 근거는 없습니다. 중요한 것은 각 구매 거래에 포함된 모든 면세 물품을 제시할 수 있는지입니다. 매장·영수증별로 정리하면 검사 시 편리합니다.</p></details>'+
      '<details><summary>면세 물품 포장을 열어도 되나요?</summary><p>종전 소비재 전용 밀봉 규정은 폐지되었지만, 면세 대상 식품·화장품 등의 일본 내 소비는 환급 요건을 충족하지 못할 수 있습니다. 포장 개봉과 상품 사용·소비를 구분하세요.</p></details>'+
      '<details><summary>Visit Japan Web에서도 처리할 수 있나요?</summary><p>하네다·나리타를 포함한 일부 주요 공항의 지정 구역에서는 전용 무선 LAN을 이용한 Visit Japan Web 수속도 가능합니다. 현장 단말기를 이용할 수도 있으므로 공항 안내를 확인하세요.</p></details>'+
      '</div></section>'+
      '<section class="info-section" id="info-tax-sources"><h2>공식 근거</h2>'+
      srcList([['일본 세관 · 2026년 11월 면세 환급제도',sources.customs],['일본 세관 · 출국 확인과 환급 절차',sources.customsSteps],['일본 관광청 · 여행자 공식 안내',sources.tourism],['일본 관광청 · 여행자 FAQ',sources.tourismFaq]])+
      '<p class="info-note">이 내용은 출국 일본 세관 절차에 관한 안내이며, 한국 입국 시 신고/과세 기준과 별개입니다. 실제 방문 공항의 최신 안내도 확인하세요.</p></section></div>';
  }

  function renderInfoTab(route) {
    const root=$('view-info');
    if(!root)return;
    const path=String(route||'info').replace(/^#/,'');
    if(path==='info/taxfree')root.innerHTML=taxfree();
    else if(path==='info/pokemon')root.innerHTML=pokemon();
    else root.innerHTML=hub();
    document.title=(path==='info/pokemon'?'포켓몬 카드 구매':path==='info/taxfree'?'일본 면세 환급':'여행 정보')+' · TOKYO FIELD GUIDE';
  }
  async function copyText(value) {
    try{
      if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error('unsupported');
      await navigator.clipboard.writeText(value);
      const status=$('info-copy-status');if(status)status.textContent='일본어 문장이 복사되었습니다.';
    }catch(_){
      const status=$('info-copy-status');if(status)status.textContent='복사할 수 없는 브라우저입니다. 문장을 길게 눌러 선택해 주세요.';
    }
  }
  const root=$('view-info');
  if(root){
    root.addEventListener('click',event=>{
      const btn=event.target.closest('button');
      if(btn && root.contains(btn)){
        if(btn.hasAttribute('data-info-goal')){state.goal=btn.getAttribute('data-info-goal');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-info-region')){state.region=btn.getAttribute('data-info-region');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-info-kind')){state.kind=btn.getAttribute('data-info-kind');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-info-copy'))copyText(btn.getAttribute('data-info-copy'));
      }
      const jump=event.target.closest('a[data-info-jump]');
      if(jump && root.contains(jump)){
        event.preventDefault();
        const target=$(jump.getAttribute('data-info-jump'));if(target){target.scrollIntoView({behavior:'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
      }
    });
  }
  window.renderInfoTab=renderInfoTab;
  const path=window.location.hash.slice(1);
  if(path==='info'||path.startsWith('info/')){
    if(typeof window.showRoute==='function')window.showRoute(path);
    else renderInfoTab(path);
  }
})();
