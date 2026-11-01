(function infoTabModule() {
  'use strict';
  const checkedOn = '2026.11.02';
  const sources = {
    customs: 'https://www.customs.go.jp/kaigairyoko/taxrefund.htm',
    naritaTax: 'https://www.narita-airport.jp/en/service/exchange/taxrefund/',
    ntaVjw: 'https://www.nta.go.jp/publication/pamph/shohi/menzei/201805/format/002/onlinetetsuzuki/guidekor.htm',
    ntaFaq: 'https://www.nta.go.jp/publication/pamph/shohi/menzei/201805/format/002/onlinetetsuzuki/faqkor.htm',
    peachNarita: 'https://www.flypeach.com/kr/lm/ai/airports/airportguide_international/nrt',
    vjwHelp: 'https://services.digital.go.jp/ko/visit-japan-web/guide/',
    customsSteps: 'https://www.customs.go.jp/kaigairyoko/taxrefund/C-details.html',
    tourism: 'https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html',
    tourismFaq: 'https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00027.html',
    pokemonMap: 'https://map.pokemon-card.com/',
    lawson: 'https://www.lawson.co.jp/lab/entertainment/art/20260908_toypokemon.html',
    product: 'https://www.pokemon-card.com/products/mega/mg.html',
    stand: 'https://shop.pokemon.co.jp/ja/services/pokemonstand/',
    centerFaq: 'https://shop.pokemon.co.jp/ja/faqs/',
    hareruyaTower: 'https://www.hareruya2.com/en/pages/store_tower-en',
    hareruyaAnnex: 'https://www.hareruya2.com/pages/store_annex',
    hareruyaList: 'https://www.hareruya2.com/en/pages/store_menu-en',
    mtgHareruya: 'https://www.hareruyamtg.com/en/shoppage/akihabara',
    bookoff: 'https://www.bookoff.co.jp/buy/tradingcard/',
    surugaya: 'https://www.suruga-ya.com/en/shoplist',
    shibuyaLounge: 'https://shibuyatsutaya.tsite.jp/pokemoncardlounge/',
    snkrDunk: 'https://help.snkrdunk-guide.com/ja/articles/Trading-card-Guidelines-262e2ce3',
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
    {id:'pcstand-ogikubo',name:'포켓몬 카드 스탠드 · 오기쿠보역',area:'ogikubo',region:'오기쿠보',type:'vending',hours:'역/시설 운영시간에 따름',visit:'오기쿠보역 이용 중 현장 확인',status:'공식 설치 위치',address:'東京都杉並区荻窪 東京メトロ荻窪駅',url:'https://shop.pokemon.co.jp/ja/services/pokemonstand/',note:'포켓몬 카드 전용 자판기입니다. 재고·판매 품목·기기 운영 상태는 미확인입니다.'},
    {id:'pcstand-ikebukuro',name:'포켓몬 카드 스탠드 · 이케부쿠로역',area:'ikebukuro',region:'이케부쿠로',type:'vending',hours:'역/시설 운영시간에 따름',visit:'도부 이케부쿠로역 B1F 통행 중',status:'공식 설치 위치',address:'東京都豊島区西池袋 東武池袋駅 B1F オレンジロード',url:'https://shop.pokemon.co.jp/ja/services/pokemonstand/',note:'포켓몬 카드 전용 자판기입니다. 시설과 실제 재고는 변동될 수 있습니다.'},
    {id:'tcg-hareruya2-tower',name:'하레루야2 아키하바라 타워',area:'akihabara',region:'아키하바라',type:'cardshop',hours:'10:00–22:00',visit:'싱글·구형 카드 비교에 적합 · 재고 보장 아님',status:'공식 포켓몬 전문점',address:'東京都千代田区外神田1-2-13 石丸3号館ビル B1–6F',url:'https://www.hareruya2.com/en/pages/store_tower-en',note:'포켓몬 전문점. 스탠더드·구형(旧裏) 싱글과 관련 상품을 취급합니다. 오래된 팩·미개봉 박스의 실물 재고와 가격은 미확인입니다.'},
    {id:'tcg-hareruya2-annex',name:'하레루야2 아키하바라 아넥스',area:'akihabara',region:'아키하바라',type:'cardshop',hours:'10:00–23:00',visit:'타워점 인근 · 싱글 카드 가격 비교',status:'공식 포켓몬 전문점',address:'東京都千代田区外神田1-2-5 ミカサビル B1F・1F',url:'https://www.hareruya2.com/pages/store_annex',note:'포켓몬 카드 판매·매입 전문 지점입니다. 구형 카드와 특가 싱글의 취급을 공식 안내하지만 특정 상품 재고는 미확인입니다.'},
    {id:'tcg-hareruya2-ikebukuro',name:'하레루야2 이케부쿠로',area:'ikebukuro',region:'이케부쿠로',type:'cardshop',hours:'10:00–22:00',visit:'이케부쿠로 관광 중 싱글·구형 카드 비교',status:'공식 포켓몬 전문점',address:'東京都豊島区東池袋1-41-6 菊邑91ビル8F',url:'https://www.hareruya2.com/en/pages/store_menu-en',note:'포켓몬 카드 전문 지점. 구형 카드·싱글 선택지 확인용이며 정가 팩 판매나 재고를 보장하지 않습니다.'},
    {id:'tcg-surugaya-akiba',name:'스루가야 아키하바라 본관',area:'akihabara',region:'아키하바라',type:'cardshop',hours:'평일 11:00–21:00 · 주말 10:00–21:00',visit:'구형·현행 포켓몬 카드, 중고품 탐색',status:'공식 취급 안내',address:'東京都千代田区外神田3-11-3',url:'https://www.suruga-ya.com/en/shoplist',note:'공식 취급 목록에 클래식·현행 포켓몬 카드가 기재되어 있습니다. 오리파·미스터리 큐브의 상시 판매는 확인되지 않았습니다.'},
    {id:'tcg-surugaya-ikebukuro',name:'스루가야 이케부쿠로 캐릭터굿즈점',area:'ikebukuro',region:'이케부쿠로',type:'cardshop',hours:'11:00–20:00',visit:'이케부쿠로 관광 중 중고 카드 취급 확인',status:'공식 취급 안내',address:'東京都豊島区東池袋1-15-13 近代BLD 1F',url:'https://www.suruga-ya.com/en/shoplist',note:'공식 점포 목록에 포켓몬 카드 취급이 기재되어 있습니다. 빈티지 재고·가격은 미확인입니다.'},
    {id:'tcg-shibuya-lounge',name:'SHIBUYA TSUTAYA 포켓몬 카드 라운지',area:'shibuya',region:'시부야',type:'cardshop',hours:'10:00–22:30',visit:'시부야 스크램블 교차로 방문 중 · 대전 체험/판매 공지 확인',status:'공식 카드 라운지',address:'東京都渋谷区宇田川町21-6 QFRONT 5F',url:'https://shibuyatsutaya.tsite.jp/pokemoncardlounge/',note:'공식 카드 대전 라운지이며 상품 예약·재판매 정보를 안내합니다. 체험 요금과 상품 구매는 별도이며 매장 재고 문의는 받지 않는다고 공지합니다.'},
    {id:'P03',name:'만다라케 나카노 카드관',area:'nakano',region:'나카노',type:'cardshop',hours:'12:00–20:00 (기존 사이트 등록값)',visit:'정오 이후 방문 고려',status:'카드 전문점',address:'東京都中野区中野5-52-15 中野ブロードウェイ 2F',url:'https://www.mandarake.co.jp/dir/nkn/',note:'중고·구형 카드와 수집품 탐색용입니다. 실물 재고와 가격은 개별 상품별로 확인해야 합니다.'},
    {id:'pao-nakano',name:'류세이노 PAO 나카노',area:'nakano',region:'나카노',type:'cardshop',hours:'11:00–21:00 (기존 사이트 등록값)',visit:'개점 이후 나카노 방문 중',status:'카드 전문점',address:'東京都中野区新井1-9-4',url:'https://pao-toreka.com/shop/nakano.html',note:'싱글 카드·TCG 상품용 전문점입니다. 포켓몬센터의 정가 팩과는 구매 목적과 가격 체계가 다릅니다.'},
  ];
  const taxChecklistItems = [["purchase","면세 구매 기록과 영수증을 매장·거래별로 정리했습니다."],["goods","같은 거래에 포함된 모든 면세품을 가지고 있으며, 일본에서 소비하지 않았습니다."],["cabin","기내 수하물 총 7kg·2개와 국제선 액체류 제한을 확인했습니다."],["passport","여권과 예약번호, 환급수단 정보를 언제든 꺼낼 수 있습니다."],["airport","나리타 제1터미널 4층에서 보안검색 전에 세관 확인할 것을 기억합니다."],["deadline","피치항공 08:30편의 체크인 마감 07:40을 우선하겠습니다."]];
  const taxChecklistKey='tokyo-field-guide:tax-checklist:v1';
  const state = {goal:'pack',region:'all',kind:'all',taxMethod:'kiosk',taxChecked:[]};
  try { const saved=JSON.parse(window.localStorage?.getItem(taxChecklistKey)||'[]'); if(Array.isArray(saved))state.taxChecked=saved.filter(id=>taxChecklistItems.some(x=>x[0]===id)); } catch(_){ /* Browser storage may be unavailable. */ }

  const regions = [
    ['all','전체 지역'],['koenji','코엔지'],['ogikubo','오기쿠보'],['nakano','나카노'],['akihabara','아키하바라'],['shibuya','시부야'],['ikebukuro','이케부쿠로'],['nihonbashi','니혼바시'],['skytree','스카이트리'],
  ];
  const kinds = [['all','모든 판매처'],['center','포켓몬센터'],['convenience','편의점'],['vending','카드 자판기'],['cardshop','카드 전문점']];
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
    const label = store.type==='center'?'포켓몬센터':store.type==='convenience'?'편의점':store.type==='vending'?'카드 자판기':'카드 전문점';
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
    const rank=s=>state.goal==='pack' ? ({center:0,convenience:1,vending:2,cardshop:3}[s.type]) : ({cardshop:0,center:1,vending:2,convenience:3}[s.type]);
    filtered.sort((a,b)=>rank(a)-rank(b));
    return '<div class="info-filters"><span class="info-filter-caption">구매 목적</span><div class="info-choices" role="group" aria-label="구매 목적">'+
      [['pack','정가 팩·공식 상품'],['single','싱글·중고 카드'],['vintage','구형 팩·오리파 탐색']].map(o=>'<button type="button" class="info-filter" data-info-goal="'+o[0]+'" aria-pressed="'+(state.goal===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">지역 선택</span><div class="info-choices" role="group" aria-label="지역 필터">'+regions.map(o=>'<button type="button" class="info-filter" data-info-region="'+o[0]+'" aria-pressed="'+(state.region===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">판매처 구분</span><div class="info-choices" role="group" aria-label="판매처 유형 필터">'+kinds.map(o=>'<button type="button" class="info-filter" data-info-kind="'+o[0]+'" aria-pressed="'+(state.kind===o[0])+'">'+o[1]+'</button>').join('')+'</div></div>'+
      '<p class="info-note info-goal-note">'+(state.goal==='pack'?'정가 팩은 공식 매장·취급 편의점을 참고하세요. 원하는 팩의 재고·수량 제한은 매장·상품마다 달라집니다.':state.goal==='single'?'싱글은 전문점에서 같은 카드의 버전·상태·가격을 비교하세요.':'구형 팩·오리파는 취급 여부가 불확실합니다. 아래 전문점은 탐색 후보이며 해당 상품 판매를 확인한 목록이 아닙니다.')+'</p>'+      '<p class="info-results" aria-live="polite">조건에 맞는 확인 후보 '+filtered.length+'곳 · 카드 재고/편의점 취급 여부를 확인한 결과가 아닙니다.</p>'+
      '<div class="info-list">'+(filtered.length?filtered.map(storeCard).join(''):'<p class="info-empty">선택한 조건의 점포 데이터가 없습니다. 지역이나 판매처 유형을 바꿔보세요.</p>')+'</div>';
  }


  function pokemonCommunityGuide() {
    return '<section class="info-section" id="info-buying-decisions"><h2>구매 목적별로 달라지는 탐색 방법</h2>'+
      '<div class="info-buy-grid">'+
      '<article class="info-buy-card"><span class="info-buy-index">01 · 새 팩</span><h3>정가 낱개팩</h3><p>포켓몬센터·취급 편의점을 관광 중 확인합니다. 현재 재고와 구매 제한은 상품·매장·당일 상황에 따라 달라집니다.</p><span class="info-source-chip">공식 정책 + 방문 경험</span></article>'+
      '<article class="info-buy-card"><span class="info-buy-index">02 · 목표 카드</span><h3>싱글·구형 카드</h3><p>아키하바라·이케부쿠로·나카노의 전문점에서 특정 카드의 세트 번호·상태·가격을 비교합니다. 예전 카드가 목적이라면 포켓몬센터보다 이쪽이 적합합니다.</p><span class="info-source-chip">매장 공식 취급 + 방문 경험</span></article>'+
      '<article class="info-buy-card"><span class="info-buy-index">03 · 오래된 상품</span><h3>빈티지 팩·박스·오리파</h3><p>중고 전문점에서 재고와 상태를 직접 확인합니다. 오리파/미스터리 큐브는 점포 자체 구성의 랜덤 상품으로, 옛날 공식 팩이나 밀봉 박스와는 다릅니다.</p><span class="info-source-chip">방문 경험 · 특정 상품 미확인</span></article>'+
      '</div>'+
      '<div class="info-notice info-warning"><strong>포켓몬센터는 오래된 팩 전문점이 아닙니다</strong>Reddit 이용자들은 현행 확장팩은 포켓몬센터를, 오래된 카드·팩은 전문점과 중고점을 구분해 찾는 편이라고 설명했습니다. 다만 특정 빈티지 팩이나 미스터리 큐브의 취급 여부는 확인되지 않았습니다.</div></section>'+
      '<section class="info-section" id="info-community"><h2>여행자 후기를 실제 구매 판단에 적용하기</h2>'+
      '<p>제공된 두 Reddit 토론에는 정반대 경험이 함께 있습니다. 어떤 여행자는 여러 포켓몬센터에서 팩을 구매했지만, 다른 여행자는 같은 지역의 여러 점포를 방문해도 모두 품절이었다고 보고했습니다. 방문 시각·상품명·재입고 시점의 차이가 크므로 후기의 성공 사례를 구매 보장으로 해석하지 않습니다.</p>'+
      '<div class="info-community-list">'+
      '<article><strong>수량 제한: 2·5·10·20팩 등 서로 다른 경험</strong><p>후기 속 제한은 사람당, 상품(확장팩)당, 해당 날짜의 판매 조건에 따라 달랐습니다. 일부는 박스 구매가 어려웠다고 했고, 다른 이용자는 복수 세트를 구매했다고 했습니다. 포켓몬센터 공식 FAQ도 상품에 따라 구매 제한이 다를 수 있다고 안내합니다.</p></article>'+
      '<article><strong>개점 직후가 품절을 피하는 확정 방법은 아님</strong><p>오전 개점 시 품절이었다가 오후에 재입고됐다는 후기와, 여러 날 전혀 재고를 찾지 못했다는 후기가 동시에 존재합니다. 개점 직후 방문은 편의상 선택할 수 있지만 공식 입고 시간은 아닙니다.</p></article>'+
      '<article><strong>7-Eleven·돈키호테·BOOKOFF의 차이</strong><p>7-Eleven 계산대 부근에서 소량 팩을 구매했다는 이용자가 있지만 전체 점포가 취급하는 것은 아닙니다. 돈키호테도 지점별 차이가 있고, BOOKOFF는 공식적으로 포켓몬 카드를 취급하되 지점마다 상품이 다르며 재고 검색을 제공하지 않습니다.</p></article>'+
      '<article><strong>박스의 슈링크(비닐) 포장 확인</strong><p>일부 포켓몬센터에서 박스를 판매하며 외부 수축 포장을 제거했다는 후기가 있습니다. 모든 매장의 공통 정책으로 검증되지는 않았습니다. 밀봉 수집 목적이라면 박스가 슈링크 포함인지, 슈링크 제거·박스 개봉 여부를 결제 전에 확인해야 합니다.</p></article>'+
      '<article><strong>지역별 ‘무조건 더 싸다’는 결론은 피하기</strong><p>도쿄, 오사카, 나고야, 지방 점포 중 어디가 싸다는 주장은 후기마다 충돌합니다. 아키하바라·이케부쿠로와 오사카 니혼바시는 전문점 밀집 지역이어서 여러 매장을 비교하기 편하다는 의미이지 최저가 보장은 아닙니다.</p></article>'+
      '</div><p class="info-note">근거 수준: 개인 경험담(사용자 제공 Reddit 대화 두 건). 게시물에 표시된 “9개월 전/6개월 전”은 조사자가 실제 방문일을 확인한 날짜가 아닙니다. 특정 가격·팩 수·재고는 2026년 11월 현재의 현장 정보로 사용하지 않았습니다.</p></section>'+
      '<section class="info-section" id="info-specialist"><h2>전문점에서 실수하지 않는 구매 요령</h2>'+
      '<div class="info-faq">'+
      '<details open><summary>하레루야, 하레루야2, 하레루야3는 같은 곳인가요?</summary><p>같은 계열이지만 취급 카드가 다릅니다. 일반 하레루야는 매직: 더 개더링(MTG), <strong>하레루야2는 포켓몬 카드</strong>, 하레루야3는 듀얼마스터즈 전문점입니다. 포켓몬 카드가 목적이면 하레루야2를 확인하세요. '+external(sources.hareruyaList,'공식 매장 구분')+'</p></details>'+
      '<details><summary>오리파(オリパ)·미스터리 큐브가 오래된 공식 팩인가요?</summary><p>아닙니다. 오리파는 점포 또는 판매자가 자체 구성하는 랜덤 상품입니다. 오래된 공식 미개봉 팩과 혼동하지 말고, 판매 조건·구성·확률 표시·반품 제한을 먼저 확인하세요. Reddit의 만다라케 미스터리 큐브와 스루가야 오리파 구매 경험은 현재 취급을 보증하지 않습니다.</p></details>'+
      '<details><summary>싱글 카드는 무엇을 비교하나요?</summary><p>같은 포켓몬이어도 카드 번호·발매 세트·언어·등급·표면 흠집에 따라 상품과 가격이 다릅니다. 쇼케이스 가격을 비교하고, 가능하면 실물 상태 확인을 요청하세요. 희귀 카드의 가격이 저렴하다는 후기만으로 진품·상태를 보장하지 않습니다.</p></details>'+
      '<details><summary>오래된 팩 또는 수축 포장 박스를 살 때는?</summary><p>원래 포장된 공식 팩인지, 박스 외부 슈링크가 보존됐는지, “シュリンクなし(슈링크 없음)” 조건인지 구분하세요. 실물 판매 정책은 점포별로 다르며, SNKRDUNK 거래 가이드에서도 슈링크 포함/미포함 상품을 서로 다른 상태로 처리합니다. '+external(sources.snkrDunk,'밀봉 상태 비교 기준')+'</p></details>'+
      '<details><summary>해외 관광객도 일본 매장에 카드를 팔 수 있나요?</summary><p>매입에는 매장의 신원 확인·법령상 서류 요건이 적용될 수 있습니다. Reddit에서 관광객의 매입 제한 가능성이 언급됐으나, 모든 점포가 동일하게 운영한다는 근거는 없습니다. 구매와 매입은 다른 절차이므로 카드 판매를 계획한다면 해당 점포의 공식 기준을 먼저 확인하세요.</p></details>'+
      '</div></section>';
  }

  function pokemon() {
    return '<div class="info-wrap">'+crumb('포켓몬 카드')+
      header('SHOPPING · POKÉMON TCG','도쿄에서 포켓몬 카드 구매하기','정가 팩을 찾는 경우와 싱글 카드를 구매하는 경우는 적합한 매장이 다릅니다. 카드 판매가 확인되지 않은 편의점은 구매 확정 장소로 안내하지 않습니다.')+
      '<div class="info-notice"><strong>먼저 기억할 3가지</strong>공식 포켓몬센터도 원하는 팩의 재고를 보장하지 않습니다. 편의점은 같은 체인이라도 취급 여부가 다릅니다. 영업시간·판매 개시·상품 입고는 서로 다른 정보입니다.</div>'+
      toc([['info-where','판매처 비교'],['info-buying-decisions','목적별 구매'],['info-community','현장 후기'],['info-specialist','전문점 팁'],['info-convenience','편의점 구매법'],['info-stores','도쿄 확인 후보'],['info-phrases','현장 표현'],['info-sources','공식 근거']])+
      '<section class="info-section" id="info-where"><h2>어디서 살까?</h2>'+
      '<table class="info-table"><thead><tr><th>판매처</th><th>적합한 목적</th><th>확인할 조건</th></tr></thead><tbody>'+
      '<tr><td>포켓몬센터</td><td>공식 정가 상품, 관련 굿즈</td><td>점포 영업시간, 상품별 재고·구매 제한</td></tr>'+
      '<tr><td>편의점</td><td>이동 중 낱개 팩 구매 시도</td><td>점포의 카드 취급 여부 자체가 미확인일 수 있음</td></tr>'+
      '<tr><td>카드 전문점</td><td>싱글·중고·구형 카드, 가격 비교</td><td>프리미엄 가격/매입·판매 조건 확인</td></tr>'+'<tr><td>포켓몬 카드 스탠드</td><td>이동 중 공식 카드 자판기 확인</td><td>공식 설치 위치는 확인되지만 재고는 확인 불가. 포켓몬 굿즈용 스탠드와 다름.</td></tr>'+'<tr><td>GEO·가전양판점</td><td>일부 카드 상품·추첨 판매</td><td>점포·상품별 회원/추첨 조건 확인 필요. 일반 관광객 구매를 보장하지 않음.</td></tr></tbody></table>'+
      '<p class="info-note">위 표는 구매 목적별 구분이며 실시간 재고나 실제 구매 성공률 순위가 아닙니다.</p></section>'+pokemonCommunityGuide()+
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
      '<section class="info-section"><h2>여행 기간 주목할 공식 상품</h2><div class="info-notice"><strong>11월 13일 출시 · 스페셜 덱 세트 MEGA</strong>메가장크로다일·메가망나뇽·메가팬텀의 구축 덱 세트이며 희망소비자가격은 5,500엔(세금 포함)입니다. 일반 확장팩이 아니며, 출시일이 즉시 구매 가능함을 보장하지 않습니다. '+external(sources.product,'상품 공식 정보')+'</div></section>'+
      '<section class="info-section" id="info-phrases"><h2>매장에서 사용할 일본어</h2><p>판매 중인 상품에 관해 짧게 확인할 때 사용하세요. 금지된 개별 납품/재고 문의나 장시간 대기를 권하는 표현은 포함하지 않았습니다.</p>'+
      '<div class="info-phrases">'+[
        ['포켓몬 카드를 취급하나요?','ポケモンカードは取り扱っていますか。'],
        ['이 상품을 구매할 수 있나요?','この商品は購入できますか。'],
        ['구매 수량 제한이 있나요?','購入数の制限はありますか。']
      ].map(o=>'<div class="info-phrase"><div><strong>'+esc(o[0])+'</strong><span lang="ja">'+esc(o[1])+'</span></div><button class="info-copy" type="button" data-info-copy="'+esc(o[1])+'">복사</button></div>').join('')+'</div><div id="info-copy-status" class="info-copy-result" role="status" aria-live="polite"></div></section>'+
      '<section class="info-section" id="info-sources"><h2>정보의 근거</h2>'+
      srcList([['포켓몬 카드 공식 취급점 검색과 미등재 안내',sources.pokemonMap],['로손 상품별 판매·문의 제한 공지 (2026-09-08)',sources.lawson],['11월 13일 스페셜 덱 세트 공식 정보',sources.product],['포켓몬 카드 스탠드 공식 설치 위치',sources.stand],['포켓몬센터 공식 상품 재고·구매 제한 FAQ',sources.centerFaq],['하레루야2 포켓몬 전문점 공식 목록',sources.hareruyaList],['BOOKOFF 포켓몬 카드 취급 정책',sources.bookoff],['스루가야 포켓몬 카드 취급 점포 목록',sources.surugaya],['SHIBUYA TSUTAYA 카드 라운지 판매 조건',sources.shibuyaLounge],['포켓몬센터 메가도쿄 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/'],['포켓몬센터 시부야 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/']])+
      '<p class="info-note">점포별 출처는 각 카드에서 확인할 수 있습니다. 기존 여행 사이트에 등록된 카드 전문점의 영업시간은 변경 가능하므로 현장 방문 전 다시 확인하세요.</p></section></div>';
  }

  function taxMethodPanel() {
  const method = state.taxMethod === 'vjw' ? 'vjw' : 'kiosk';
  if (method === 'vjw') {
    return `<div class="info-tax-method-head"><strong>휴대전화로 처리: Visit Japan Web</strong><span class="info-status">선택 이용</span></div>
      <ol class="info-tax-method-steps">
        <li>여행 전에 Visit Japan Web에 로그인하고 이용자·여권·상륙 허가 정보를 필요한 범위에서 등록합니다.</li>
        <li>나리타 <strong>제1터미널 4층, 보안검색 전</strong>에서 세관 전용 Wi-Fi <code>Customs_WiFi_For_TaxRefund</code>에 접속합니다. 비밀번호는 <code>jcustoms</code>입니다.</li>
        <li>VJW의 <strong>환급 절차(Refund Procedure)</strong>를 열고, 구매 기록을 확인한 뒤 <strong>Confirm</strong>을 누릅니다. 출국 로비의 전용 Wi-Fi 연결 구역에서 진행해야 합니다.</li>
        <li><strong>Completed</strong>이면 세관 확인을 마친 것입니다. <strong>Not Completed</strong>이면 세관 검사 장소로 이동해 실물을 제시합니다.</li>
      </ol>
      <p class="info-note">VJW 면세 구입용 QR을 매장에서 사용하지 않았더라도 전송된 구매 기록이 표시될 수 있습니다. 기록이 없으면 구매처의 전송 여부를 확인하고, 온라인 수속이 안 되면 현장 단말기를 이용하세요.</p>
      <div class="info-store-actions">${external(sources.ntaVjw,'국세청 VJW 절차 한국어 안내')} ${external(sources.ntaFaq,'VJW 오류·구매기록 FAQ')}</div>`;
  }
  return `<div class="info-tax-method-head"><strong>현장 단말기에서 처리: 여권 스캔</strong><span class="info-status official">VJW 가입 불필요</span></div>
    <ol class="info-tax-method-steps">
      <li>나리타 <strong>제1터미널 4층, 보안검색 전</strong>의 면세 확인 단말기(Tax Refund Kiosk)를 찾습니다.</li>
      <li>여권을 단말기에 제시하고 세관 확인 결과를 확인합니다. 면세 구매 상품은 전부 직접 제시할 수 있도록 가지고 있어야 합니다.</li>
      <li><strong>녹색(Green Result)</strong>이면 세관 확인을 마친 것입니다. <strong>적색(Red Result)</strong>이면 안내된 세관 검사 장소에서 해당 상품을 제시해야 합니다.</li>
      <li>결과 확인이 끝나면 피치항공 체크인·보안검색을 진행합니다. 환급금 지급 여부는 거래 매장·환급 사업자 기준으로 따로 확인합니다.</li>
    </ol>
    <p class="info-note">현장 단말기는 휴대전화의 VJW 접속과 별개의 절차입니다. 온라인 Wi-Fi 오류가 나더라도 탑승 마감 전에 진행할 수 있는 대안입니다.</p>
    <div class="info-store-actions">${external(sources.naritaTax,'나리타공항 공식 면세 확인 위치')} ${external(sources.customsSteps,'세관 공식 절차')}</div>`;
}

  function taxfree() {
  const completed=state.taxChecked.length;
  const items=taxChecklistItems.map(([id,label])=>`<label class="info-tax-task"><input type="checkbox" data-tax-check="${esc(id)}" ${state.taxChecked.includes(id)?'checked':''}><span>${esc(label)}</span></label>`).join('');
  return `<div class="info-wrap info-tax-page">
    ${crumb('일본 면세 환급')}
    ${header('TAX REFUND · 2026 NOVEMBER','일본 면세 환급 · 공항에서 막히지 않기','11월 1일 이후 면세점에서 구입한 물건은 소비세 포함 가격으로 결제하고, 출국 때 세관 반출 확인을 받은 뒤 환급받습니다. 나리타 제1터미널 피치항공 출국을 기준으로 실제 행동 순서를 정리했습니다.')}
    <div class="info-tax-topline">
      <div><span class="info-tax-eyebrow">최우선 규칙</span><strong>면세품을 전부 지닌 채, 수하물 위탁·보안검색 전에 세관 확인</strong><p>실물 검사가 나오면 상품을 바로 꺼낼 수 있어야 합니다. 빨간 결과만으로 환급이 거절된 것은 아닙니다.</p></div>
    </div>
    <div class="info-tax-overview" aria-label="면세 환급의 네 단계">
      <div><span>01</span><strong>일본 면세점</strong><small>세금 포함 결제</small></div>
      <div><span>02</span><strong>짐 정리</strong><small>거래별 상품 확인</small></div>
      <div><span>03</span><strong>출국 전 세관</strong><small>녹색/적색 판정</small></div>
      <div><span>04</span><strong>환급 수령</strong><small>매장별 방식 확인</small></div>
    </div>
    ${toc([['info-tax-preflight','출국 전 점검'],['info-tax-steps','현장 순서'],['info-tax-methods','단말기·VJW'],['info-tax-results','판정 결과'],['info-tax-receipts','영수증·포장'],['info-tax-refund','환급 추적'],['info-tax-faq','FAQ'],['info-tax-sources','공식 근거']])}
    <section class="info-section info-tax-checklist" id="info-tax-preflight">
      <div class="info-tax-section-line"><h2>출국 전 6가지 점검</h2><span class="info-tax-progress" id="tax-check-progress" aria-live="polite">${completed}/${taxChecklistItems.length} 완료</span></div>
      <div class="info-tax-meter" aria-hidden="true"><span id="tax-check-meter" style="width:${Math.round(completed/taxChecklistItems.length*100)}%"></span></div>
      <div class="info-tax-tasks">${items}</div>
      <p class="info-note">이 기기의 브라우저에만 체크 상태를 보관합니다. 앱 예약·세관 시스템과 연동되는 것이 아닙니다.</p>
    </section>
    <section class="info-section" id="info-tax-steps">
      <h2>나리타공항에서 무엇을 먼저 해야 하나?</h2>
      <div class="info-notice info-warning"><strong>피치항공 · 나리타 제1터미널 북쪽 윙 4층</strong>
      11월 15일 08:30 출발 기준 체크인 가능 시각은 <strong>06:30~07:40</strong>입니다. 면세 확인 구역은 <strong>제1터미널 중앙빌딩 4층, 보안검색 전(05:30~23:00)</strong>입니다. 공항에 도착하면 세관 확인 위치와 항공사 체크인 위치를 구분하고, 항공편 마감 시간을 우선하세요.</div>
      <div class="info-steps">
        <div class="info-step"><div><h3>세금 포함 가격으로 결제</h3><p>같은 면세점·같은 날 세전 합계 5,000엔 이상 등 요건을 충족하고, 여권·환급 방식 안내를 확인합니다. 상품은 구매일부터 90일 이내 반출 확인 대상입니다.</p></div></div>
        <div class="info-step"><div><h3>거래(영수증)별로 상품을 찾을 수 있게 준비</h3><p>짐을 매장별 또는 영수증별 작은 봉투에 정리하는 것은 실용적인 선택입니다. 하지만 한 쇼핑백에 다른 매장 물건을 섞었다는 이유만으로 면세가 거절되는 규정은 아닙니다.</p></div></div>
        <div class="info-step"><div><h3>4층 출국 로비에서 세관 확인</h3><p>단말기 여권 스캔 또는 전용 Wi-Fi에서 VJW를 이용합니다. <strong>적색 결과는 지정 장소에서 구매품 실물 검사가 필요</strong>하다는 뜻입니다. 위탁 수하물이 있다면 그보다 먼저 처리해야 합니다.</p></div></div>
        <div class="info-step"><div><h3>완료 후 항공 체크인·보안검색</h3><p>세관 확인과 체크인은 별개입니다. 체크인 수속을 놓치지 않도록 하고, 세관 확인 후 물품을 일본 밖으로 가져가야 합니다.</p></div></div>
        <div class="info-step"><div><h3>환급은 매장·환급 사업자 방식으로 수령</h3><p>세관 확인 <strong>Completed</strong>가 곧 계좌·카드 환급 완료는 아닙니다. 구매 당시 지정된 환급 방법과 업체 안내를 확인하세요.</p></div></div>
      </div>
    </section>
    <section class="info-section" id="info-tax-methods">
      <h2>세관 확인 방법을 선택하세요</h2>
      <p>아래 두 경로는 대체 수단입니다. VJW가 반드시 필요한 것은 아니며, 휴대전화 절차를 사용하려면 공항의 지정 전용 Wi-Fi 구역에 있어야 합니다.</p>
      <div class="info-tax-options" role="group" aria-label="면세 확인 방법">
        <button type="button" class="info-filter" data-tax-method="kiosk" aria-pressed="${state.taxMethod==='kiosk'}" aria-controls="info-tax-method-panel">현장 단말기 · 여권</button>
        <button type="button" class="info-filter" data-tax-method="vjw" aria-pressed="${state.taxMethod==='vjw'}" aria-controls="info-tax-method-panel">휴대전화 · VJW</button>
      </div>
      <div class="info-tax-method-panel" id="info-tax-method-panel">${taxMethodPanel()}</div>
    </section>
    <section class="info-section" id="info-tax-results">
      <h2>녹색·적색 결과를 어떻게 처리하나요?</h2>
      <div class="info-tax-result-grid">
        <div class="info-tax-result green"><span class="info-tax-result-label">GREEN · COMPLETED</span><strong>세관 반출 확인 완료</strong><p>상품 검사를 요구받지 않은 상태입니다. 다른 필요한 환급 신청이 있다면 매장 안내에 따라 진행하고 항공편 수속으로 이동합니다.</p></div>
        <div class="info-tax-result red"><span class="info-tax-result-label">RED · NOT COMPLETED</span><strong>세관 창구에서 실물 확인</strong><p>환급 거절이 확정된 것이 아닙니다. 보관한 면세품을 가지고 직원에게 요청된 물품을 제시해 확인을 마쳐야 합니다. 포기하면 해당 거래는 환급받을 수 없습니다.</p></div>
      </div>
      <p class="info-note">VJW에서 결과 화면을 닫았다면 History(절차 이력)에서 구매 기록별 결과를 확인할 수 있습니다. 오류나 표시 지연은 별개 문제이며 'Completed'와 실제 카드 환급 입금을 혼동하지 마세요.</p>
    </section>
    <section class="info-section" id="info-tax-receipts">
      <h2>영수증별 정리는 실용적인 팁이지 법적 봉투 의무는 아닙니다</h2>
      <p><strong>공식 검사 단위는 한 번의 구매 거래(영수증 등)</strong>입니다. 같은 거래에 들어 있는 면세품을 한 개라도 제시하지 못하면 그 거래의 다른 면세품도 환급 대상에서 제외될 수 있습니다. 서로 다른 거래는 별도로 판단하므로, 어디서 무엇을 샀는지 대응관계를 알 수 있게 정리하면 도움이 됩니다.</p>
      <div class="info-grid">
        <div class="info-notice"><strong>권장하는 짐 정리 방법</strong>돈키호테에서 산 물품과 영수증을 한 묶음, 백화점 구매품을 다른 묶음으로 정리합니다. 공항에서 적색 결과가 나왔을 때 직원 요청에 따라 물건을 빠르게 꺼낼 수 있습니다.</div>
        <div class="info-notice"><strong>잘못 알려지기 쉬운 부분</strong>매장별로 별도 쇼핑백을 반드시 사용해야 하는 의무는 아닙니다. 실물 영수증이 모든 상황의 법정 필수 서류라는 단정도 피해야 합니다. 다만 구매 내역을 보관하면 오류·환급 문의에 유용합니다.</div>
      </div>
      <div class="info-notice info-warning"><strong>소비재 포장 폐지 ≠ 일본 내 소비 가능</strong>식품·음료·화장품 등의 특수 밀봉 포장 의무는 폐지됐지만, 면세 대상 소비재를 일본에서 사용·소비했다면 그대로 환급 신청하면 안 됩니다. 이 경우 단말기에서 임의로 완료 처리하지 말고 세관 직원에게 소비 사실을 알리세요.</div>
      <p class="info-note">위탁 수하물이 없는 피치항공 승객은 특히 주의하세요. 시내에서 산 100ml 초과 액체·젤류는 보안검색을 통과하지 못할 수 있습니다. 반출할 수 없는 상품을 면세로 구매하지 않도록 기내 수하물 기준을 먼저 확인해야 합니다.</p>
    </section>
    <section class="info-section" id="info-tax-refund">
      <h2>세관 확인 완료 후 환급이 안 들어왔다면?</h2>
      <div class="info-tax-followup">
        <div><strong>01 · 세관 확인 상태를 점검</strong><p>VJW의 History(절차 이력)에서 해당 거래가 Completed인지 확인합니다. 전산 구매 기록은 기본적으로 영수증 등 거래 단위로 나타납니다.</p></div>
        <div><strong>02 · 구매 매장의 환급 약관을 확인</strong><p>현금 환급과 신용카드·전자결제·계좌 환급은 사업자별로 방법·시기가 다릅니다. 모든 매장이 공항 현금 환급을 지원하지는 않습니다.</p></div>
        <div><strong>03 · 입금 지연은 구매처 또는 지정 환급사에 문의</strong><p>세관의 세금 반출 확인이 끝났다는 것은 환급 승인 정보에 관한 것이며 즉시 입금 보장은 아닙니다. 문의를 위해 구매일·거래 기록·결제 정보를 보관하세요.</p></div>
      </div>
      <p class="info-note">나리타 T1에서는 세관 확인 구역(중앙빌딩 4층, 05:30~23:00)과 환급금 현금 지급기(중앙빌딩 4층 보안검색 전, 06:00~24:00)가 별도로 안내됩니다. 보안검색 후 북쪽 윙 3층에도 환급 사업자 기기가 있지만, 이용 가능 여부는 매장이 지정한 환급 방식에 달려 있습니다.</p>
    </section>
    <section class="info-section info-faq" id="info-tax-faq">
      <h2>현장에서 자주 헷갈리는 상황</h2>
      <details><summary>Visit Japan Web에 등록하지 않으면 면세 환급을 못 받나요?</summary><p>아닙니다. 공항에 설치된 면세 절차 단말기에서 여권을 스캔하는 방법도 있습니다. VJW는 지정 전용 Wi-Fi를 사용하는 대안입니다.</p></details>
      <details><summary>세관 확인 단말기와 실제 환급금 받는 기기는 같은 기계인가요?</summary><p>아닙니다. 반출 확인 후 매장이나 지정 환급 사업자가 환급하며, 공항 현금 환급 기기는 별도입니다. 이용 가능한 환급 방법은 구매 매장에서 지정합니다.</p></details>
      <details><summary>VJW에 구매 내역이 없거나 오류가 나면요?</summary><p>매장 전송 지연 여부를 살피고 화면을 새로 고치세요. 면세 구매용 QR을 제시하지 않았어도 거래가 표시될 수 있습니다. 온라인으로 진행이 어려우면 현장 단말기를 이용하고, 거래 정보 자체가 누락된 경우 구매 매장에 문의합니다.</p></details>
      <details><summary>빨간불이면 짐을 전부 검사하나요?</summary><p>적색은 세관 실물 확인이 필요하다는 의미입니다. 요청 범위는 현장 세관 직원이 안내하므로 모든 짐의 전수검사라고 단정할 수 없습니다. 해당 물품을 제시해야 거래별 확인이 가능합니다.</p></details>
      <details><summary>위탁 수하물이 없다면 세관 확인을 건너뛰어도 되나요?</summary><p>아닙니다. 환급을 원한다면 반출 확인은 필요합니다. 위탁 수하물이 없더라도 면세품을 소지한 상태에서 보안검색 전에 세관 확인을 완료해야 합니다.</p></details>
      <details><summary>영수증 중 상품 하나를 일본에서 사용했어요.</summary><p>한 번의 구매 거래에 포함된 상품이 누락되거나 소비되면 거래 전체가 환급 대상에서 제외될 수 있습니다. 소비재를 소비했다면 단말기 확인을 진행하지 말고 먼저 세관 직원에게 신고하세요.</p></details>
    </section>
    <section class="info-section" id="info-tax-sources">
      <h2>확인된 공식 근거</h2>
      ${srcList([
        ['일본 세관 · 2026.11.01 면세 환급제도',sources.customs],
        ['일본 관광청 · 영수증 거래 단위/포장/검사',sources.tourismFaq],
        ['나리타공항 · T1 세관·현금환급·전용 Wi-Fi',sources.naritaTax],
        ['국세청 · VJW 온라인 확인 방법(한국어)',sources.ntaVjw],
        ['국세청 · VJW 구매기록/오류/이력 FAQ(한국어)',sources.ntaFaq],
        ['피치항공 · 나리타 국제선 수속 장소·시각',sources.peachNarita],
        ['일본 디지털청 · Visit Japan Web 이용 안내',sources.vjwHelp]
      ])}
      <p class="info-note">조사 기준 2026.11.01. 제공된 SNS 글은 현장 정리법의 참고 자료이며, 절차·권리·의무는 위 공식 자료를 우선합니다. 환급 가능 여부와 실제 처리 시기는 구매 업체·현장 세관에 따라 달라질 수 있습니다.</p>
    </section>
  </div>`;
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
        if(btn.hasAttribute('data-tax-method')){
          state.taxMethod=btn.getAttribute('data-tax-method')==='vjw'?'vjw':'kiosk';
          const panel=$('info-tax-method-panel');if(panel)panel.innerHTML=taxMethodPanel();
          root.querySelectorAll?.('[data-tax-method]').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-tax-method')===state.taxMethod)));
        }
        if(btn.hasAttribute('data-info-copy'))copyText(btn.getAttribute('data-info-copy'));
      }
      const jump=event.target.closest('a[data-info-jump]');
      if(jump && root.contains(jump)){
        event.preventDefault();
        const target=$(jump.getAttribute('data-info-jump'));if(target){target.scrollIntoView({behavior:'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
      }
    });
    root.addEventListener('change',event=>{
      const input=event.target;
      if(!input||!input.hasAttribute||!input.hasAttribute('data-tax-check'))return;
      const id=input.getAttribute('data-tax-check');
      if(!taxChecklistItems.some(x=>x[0]===id))return;
      if(input.checked){if(!state.taxChecked.includes(id))state.taxChecked.push(id);}
      else state.taxChecked=state.taxChecked.filter(x=>x!==id);
      try{window.localStorage?.setItem(taxChecklistKey,JSON.stringify(state.taxChecked));}catch(_){}
      const progress=$('tax-check-progress');if(progress)progress.textContent=state.taxChecked.length+'/'+taxChecklistItems.length+' 완료';
      const meter=$('tax-check-meter');if(meter)meter.style.width=Math.round(state.taxChecked.length/taxChecklistItems.length*100)+'%';
    });
  }
  window.renderInfoTab=renderInfoTab;
  const path=window.location.hash.slice(1);
  if(path==='info'||path.startsWith('info/')){
    if(typeof window.showRoute==='function')window.showRoute(path);
    else renderInfoTab(path);
  }
})();
