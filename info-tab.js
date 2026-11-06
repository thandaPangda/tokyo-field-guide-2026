(function infoTabModule() {
  'use strict';
  const checkedOn = '2026.11.04';
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
  // Use stable map IDs for the same shops; closed/unknown stores are never appended.
  if(window.TFGPokemonBulk){for(const x of window.TFGPokemonBulk.stores){const existing=stores.find(p=>p.id===x.id||(p.name===x.name&&p.address===x.address));if(existing){if(x.buyPlan)existing.buyPlan=x.buyPlan;continue;}stores.push({...x,note:x.notes});}}
  const taxChecklistItems = [["purchase","면세 구매 기록과 영수증을 매장·거래별로 정리했습니다."],["goods","같은 거래에 포함된 모든 면세품을 가지고 있으며, 일본에서 소비하지 않았습니다."],["cabin","기내 수하물 총 7kg·2개와 국제선 액체류 제한을 확인했습니다."],["passport","여권과 예약번호, 환급수단 정보를 언제든 꺼낼 수 있습니다."],["airport","나리타 제1터미널 4층에서 보안검색 전에 세관 확인할 것을 기억합니다."],["deadline","피치항공 08:30편의 체크인 마감 07:40을 우선하겠습니다."]];
  const taxChecklistKey='tokyo-field-guide:tax-checklist:v1';
  const state = {goal:'pack',region:'all',kind:'all',taxMethod:'kiosk',taxChecked:[],resaleArea:'전체',resaleKind:'전체',resaleSearch:'',resalePick:1,airportArrival:'access',airportReturn:'skyliner'};
  try { const saved=JSON.parse(window.localStorage?.getItem(taxChecklistKey)||'[]'); if(Array.isArray(saved))state.taxChecked=saved.filter(id=>taxChecklistItems.some(x=>x[0]===id)); } catch(_){ /* Browser storage may be unavailable. */ }

  const regions = [
    ['all','전체 지역'],['koenji','코엔지'],['ogikubo','오기쿠보'],['nakano','나카노'],['akihabara','아키하바라'],['shibuya','시부야'],['ikebukuro','이케부쿠로'],['nihonbashi','니혼바시'],['skytree','스카이트리'],['tachikawa','타치카와'],['kichijoji','기치조지'],['futakotamagawa','후타코타마가와'],['funabashi','후나바시'],['kawasaki','가와사키'],['machida','마치다'],['hachioji','하치오지'],['shinjuku','신주쿠'],
  ];
  const kinds = [['all','모든 판매처'],['center','포켓몬센터'],['convenience','편의점'],['vending','카드 자판기'],['cardshop','카드 전문점'],['bookoff','북오프'],['electronics','가전양판점'],['toyshop','완구·추첨 수령']];
  const $ = id => document.getElementById(id);
  const esc = input => String(input).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const external = (url,text) => '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(text)+'</a>';
  const mapsUrl = (place) => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.address+' '+place.name);
  const header = (short,title,lead,date=checkedOn) => '<div class="info-kicker">'+esc(short)+'</div><h1 class="info-title">'+esc(title)+'</h1><p class="info-lead">'+esc(lead)+'</p><p class="info-meta">조사 기준 '+esc(date)+' · 점포 정보와 판매 정책은 변경될 수 있습니다.</p>';
  const crumb = (section) => '<nav class="info-crumb" aria-label="현재 위치"><a href="#info">정보</a><span aria-hidden="true">/</span><span aria-current="page">'+esc(section)+'</span></nav>';
  const srcList = (items) => '<ul class="info-source">'+items.map(item=>'<li>'+external(item[1],item[0])+'</li>').join('')+'</ul>';
  const toc = items => '<nav class="info-toc" aria-label="이 페이지에서 이동">'+items.map(x=>'<a class="info-anchor" href="#'+x[0]+'" data-info-jump="'+x[0]+'">'+esc(x[1])+'</a>').join('')+'</nav>';

  function hub() {
    return '<div class="info-wrap">'+header('TOKYO FIELD GUIDE · ESSENTIALS','도쿄 여행 정보','쇼핑과 현지 이용 규칙을 실제 행동 중심으로 정리했습니다. 검증된 규정과 경험에 근거한 참고 팁을 구분합니다.')+
      '<div class="info-grid">'+
      '<a class="info-tile" href="#info/airport"><span class="eyebrow">AIRPORT · TRAIN / BUS</span><h2>나리타 공항 교통 · 왕복 선택</h2><p>입국 나리타→코엔지, 귀국 시부야→나리타. 5가지 입국편과 3가지 귀국편의 환승·대기·편도요금, 왕복 조합 계산을 확인합니다.</p></a><a class="info-tile" href="#info/pokemon"><span class="eyebrow">SHOPPING · TCG</span><h2>포켓몬 카드 구매 가이드</h2><p>포켓몬센터·편의점·카드 전문점의 차이, 벌크·스토리지, 새 팩과 박스, 폐업 매장 구분 및 영업시간을 살펴봅니다.</p></a>'+
      '<a class="info-tile" href="#info/taxfree"><span class="eyebrow">CUSTOMS · TAX REFUND</span><h2>2026년 11월 일본 면세 환급</h2><p>세금 포함 결제, 출국 전 세관 확인, 영수증 거래 단위, 밀봉 포장 규정 변경을 확인합니다.</p></a>'+ 
      '<a class="info-tile" href="#info/grocery"><span class="eyebrow">SUPERMARKET · FOOD</span><h2>마트 흑모와규 · 할인 라벨 읽기</h2><p>사진 속 20% 할인은 특정 상품 사례입니다. 일본어 라벨·취사 숙소 조건·면세 여부를 구분합니다.</p></a>'+
      '<a class="info-tile" href="#info/resale"><span class="eyebrow">TOKYO SCOUT · RESELL</span><h2>리셀 소싱 · 33개 매장</h2><p>19개 상품의 과거 수요·예상 가격과 79개 매장 탐색 연결을 비교합니다. 재고와 실수익은 미확인입니다.</p></a></div>'+
      '<section class="info-section"><div class="info-notice"><strong>이 정보 탭이 다루는 범위</strong>실시간 재고를 예측하거나 동선을 자동 편성하지 않습니다. 현장에서 어디를 확인하고 어떤 규정을 지켜야 할지 판단하는 데 필요한 자료를 제공합니다.</div></section></div>';
  }

  function storeCard(store) {
    const label=({center:'포켓몬센터',convenience:'편의점',vending:'카드 자판기',cardshop:'카드 전문점',bookoff:'북오프·중고 카드',electronics:'가전양판점',toyshop:'완구·추첨 수령'})[store.type]||'카드 판매처';
    const placeId=store.id==='pao-nakano'?'P04':store.id;
    return '<article class="info-store"><div class="info-store-top"><div><div class="info-kicker">'+esc(store.region)+' · '+label+'</div><h3 class="info-store-title">'+esc(store.name)+'</h3></div><span class="info-status'+(store.type==='center'?' official':'')+'">'+esc(store.buyPlan?.title||store.status)+'</span></div>'+
      '<div class="info-store-actions"><a href="#place/'+esc(placeId)+'">장소 상세에서 권장 시간·위치·찜 확인</a> '+external(store.url,'점포 출처')+'</div></article>';
  }

  function storeResults() {
    const filtered=stores.filter(s=>{
      if(state.region!=='all'&&s.area!==state.region&&s.region!==state.region)return false;
      if(state.kind!=='all'&&s.type!==state.kind)return false;
      return true;
    });
    const rank=s=>state.goal==='bulk'&&['historical_observation','third_party_listing'].includes(s.storageEvidence)?-1:state.goal==='vintage'&&s.vintageSpecialist?-1:state.goal==='bulk'?({bookoff:0,cardshop:1,center:3,electronics:4,vending:5,convenience:6}[s.type]??7):state.goal==='box'?({toyshop:0,center:1,electronics:2,bookoff:3,cardshop:4,vending:5,convenience:6}[s.type]??6):state.goal==='pack'?({center:0,electronics:1,convenience:2,vending:3,cardshop:4,bookoff:5}[s.type]??6):({cardshop:0,bookoff:1,center:2,electronics:3,vending:4,convenience:5}[s.type]??6);
    filtered.sort((a,b)=>rank(a)-rank(b));
    return '<div class="info-filters"><span class="info-filter-caption">구매 목적</span><div class="info-choices" role="group" aria-label="구매 목적">'+
      [['bulk','벌크·스토리지'],['pack','정가 팩·공식 상품'],['box','미개봉 박스'],['single','싱글·중고 카드'],['vintage','구형 팩·오리파 탐색']].map(o=>'<button type="button" class="info-filter" data-info-goal="'+o[0]+'" aria-pressed="'+(state.goal===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">지역 선택</span><div class="info-choices" role="group" aria-label="지역 필터">'+regions.map(o=>'<button type="button" class="info-filter" data-info-region="'+o[0]+'" aria-pressed="'+(state.region===o[0])+'">'+o[1]+'</button>').join('')+'</div>'+
      '<span class="info-filter-caption">판매처 구분</span><div class="info-choices" role="group" aria-label="판매처 유형 필터">'+kinds.map(o=>'<button type="button" class="info-filter" data-info-kind="'+o[0]+'" aria-pressed="'+(state.kind===o[0])+'">'+o[1]+'</button>').join('')+'</div></div>'+
      '<p class="info-note info-goal-note">'+(state.goal==='bulk'?'旧裏 스토리지 과거 취급 기록이 있는 전문점부터 보여줍니다. 현재 재고·가격은 미확인입니다.':state.goal==='box'?'미개봉 BOX 구매는 추첨·수량 제한·슈링크 여부를 확인하세요.':state.goal==='pack'?'정가 팩은 공식 매장·취급 편의점을 참고하세요. 원하는 팩의 재고·수량 제한은 매장·상품마다 달라집니다.':state.goal==='single'?'싱글은 전문점에서 같은 카드의 버전·상태·가격을 비교하세요.':'구형 팩·오리파는 취급 여부가 불확실합니다. 아래 전문점은 탐색 후보이며 해당 상품 판매를 확인한 목록이 아닙니다.')+'</p>'+      '<p class="info-results" aria-live="polite">조건에 맞는 확인 후보 '+filtered.length+'곳 · 카드 재고/편의점 취급 여부를 확인한 결과가 아닙니다.</p>'+
      '<div class="info-list">'+(filtered.length?filtered.map(storeCard).join(''):'<p class="info-empty">선택한 조건의 점포 데이터가 없습니다. 지역이나 판매처 유형을 바꿔보세요.</p>')+'</div>';
  }




  function vintageBuyingShortlist(g){
    const items=g.stores.filter(s=>s.buyPlan).sort((a,b)=>a.buyPlan.rank-b.buyPlan.rank);
    const cards=items.map(s=>'<article class="info-buy-card"><span class="info-buy-index">'+s.buyPlan.rank+' · '+esc(s.buyPlan.title)+'</span><h3>'+esc(s.name)+'</h3><div class="info-store-actions"><a href="#place/'+esc(s.id)+'">장소에서 방문 시간·추천 근거 확인</a></div></article>').join('');
    return '<div class="info-vintage-shortlist"><h3>구형 카드 탐색 동선</h3><p>저렴한 旧裏 스토리지를 우선한다면 <strong>이케부쿠로 MINT → LAMB → 보쿠라노</strong>, 구형 싱글 카드와 세대별 상품을 비교한다면 <strong>아키하바라 하레루야2 → 오타츄 2호점</strong> 순으로 탐색합니다. 이 순서는 2025년 저가 스토리지 후기와 공식 구형 카드 취급 근거를 종합한 것이며, 현재 가격·재고 순위는 아닙니다.</p><div class="info-buy-grid">'+cards+'</div></div>';
  }
  function pokemonBulkGuide(){
    const g=window.TFGPokemonBulk;if(!g)return '';
    const tiles=[['ストレージ / STORAGE','낱장 스토리지','상자에서 낱장 카드를 고릅니다. 30~55엔/장 주장은 현재 각 지점의 공식 가격이 아닙니다.'],
      ['まとめ売り / MATOMEURI','노멀 카드 묶음','수십~수백 장을 봉투·통으로 구입합니다. 300~1,000엔이라는 판매가는 현행 공식 근거가 없습니다.'],
      ['新品パック / PACK','공식 새 낱개팩','2026년 5월 이후 일반 5장팩 200엔(이전 출시분 180엔), 30th CELEBRATION은 홀로그램 6장팩 360엔입니다. 해당 박스 공식 가격은 7,200엔이며 추첨·신원 확인 조건이 안내됩니다.'],
      ['未開封BOX / BOX','박스째 사기','정가와 팩 수는 상품마다 다릅니다. 추첨·수량 제한·슈링크 유무와 오리파 여부를 확인하세요.']];
    const blocks=tiles.map(x=>'<article class="info-buy-card"><span class="info-buy-index">'+esc(x[0])+'</span><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></article>').join('');
    const closed=g.closed[0];
    return '<section class="info-section" id="info-bulk"><h2>벌크·스토리지·새 팩·미개봉 박스</h2>'+vintageBuyingShortlist(g)+'<div class="info-buy-grid">'+blocks+'</div>'+
      '<div class="info-notice info-warning"><strong>벌크 매장 순위·입고 회전율은 미검증입니다.</strong>라라포트 묶음 수백 장, 타치카와 7층 TCG 매대, 가와사키 매일 새 벌크 입고는 공식 확인되지 않았습니다. 타치카와 트레카 매대는 5층이고 7층은 포켓몬·애니 굿즈 중심입니다. 북오프는 실시간 카드 재고 조회를 받지 않습니다.</div>'+
      '<div class="info-notice"><strong>폐업해서 제외한 점포: '+esc(closed.name)+'</strong>'+esc(closed.closedOn)+'에 폐점했습니다. 주변 매입 전용 센터에서는 카드 구매를 할 수 없습니다. '+external(closed.source,'운영사 공식 기록')+'</div>'+
      '<h3>지도 통합 매장 '+g.stores.length+'곳 (이전 18곳 + 정보 탭 전용 하레루야2 1곳)</h3><p>매장별 주소·영업시간·방문 권장 시각은 아래 지역/목적 필터에서 점포를 선택한 다음 <strong>장소 상세</strong>로 이동해 확인합니다. 같은 상세 정보를 이 탭에 반복하지 않습니다. <a href="#discover">장소 탐색으로 이동</a></p>'+
      '<p class="info-note">실제 방문일은 11/11~15입니다. 영업시간과 트레카 매입 접수 시각은 구분해야 합니다. 지도에는 주소 구역 근사 좌표를 사용할 수 있으므로 정확한 출입구는 공식 매장 안내를 확인하세요.</p>'+
      '<h3>현장 일본어</h3><div class="info-phrases">'+[['초창기 旧裏 스토리지가 있나요?','旧裏のストレージはありますか。'],['옛날 노멀 카드를 여러 장 사고 싶습니다.','昔のノーマルカードをまとめて買いたいです。'],['스토리지 카드가 있나요?','ポケモンカードのストレージはありますか。'],['노멀 카드 묶음 판매가 있나요?','ノーマルカードのまとめ売りはありますか。'],['새 팩·박스를 살 수 있나요?','新品パックや未開封BOXは買えますか。'],['슈링크가 있나요?','BOXはシュリンク付きですか。']].map(x=>'<div class="info-phrase"><div><strong>'+esc(x[0])+'</strong><span lang="ja">'+esc(x[1])+'</span></div><button class="info-copy" type="button" data-info-copy="'+esc(x[1])+'">복사</button></div>').join('')+'</div>'+
      '<p class="info-note">'+external(g.products.priceSource,'2026년 공식 팩 가격 개정')+' · '+external('https://www.bookoff.co.jp/buy/tradingcard/','북오프 공식 트레카 정책')+'</p></section>';
  }

  function pokemonReleaseGuide(){
    const r=window.TFGPokemonBulk?.release;if(!r)return '';
    const entries=r.lotteries.map(x=>'<article class="info-buy-card"><span class="info-buy-index">'+esc(x.deadline)+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.conditions)+'</p><p>당첨자 수령: '+esc(x.pickup)+'</p><p class="info-note">근거 수준: '+esc(x.level)+'</p><div class="info-store-actions">'+external(x.url,'신청·판매 조건 출처')+'</div></article>').join('');
    return '<section class="info-section" id="info-release"><h2>2026년 11월 신상: 출시 상품과 추첨 시간</h2>'+
      '<div class="info-notice"><strong>'+esc(r.deck.date)+' · '+esc(r.deck.name)+'</strong>'+esc(r.deck.kind)+' · 정가 '+r.deck.yen.toLocaleString('en-US')+'엔. '+external(r.deck.url,'공식 상품·발매일')+'</div>'+
      '<div class="info-notice info-warning"><strong>'+esc(r.pack.date)+' · '+esc(r.pack.name)+'</strong>'+esc(r.pack.kind)+'. 5장팩 '+r.pack.packYen+'엔, 30팩 BOX 정가 환산 '+r.pack.nominalBoxYen.toLocaleString('en-US')+'엔. '+external(r.pack.url,'공식 확장팩')+'</div>'+
      '<h3>11/13 출시 세트의 선추첨·사전예약 현황</h3><p class="info-note">2026-11-04 일본 현지 시간(JST) 기준 조사. 신청 마감과 매장 개점은 신상품 일반 판매 시작 시각이 아닙니다. 각 판매처 회원 자격과 당첨 여부를 확인하세요.</p>'+
      '<div class="info-buy-grid">'+entries+'</div>'+
      '<div class="info-notice info-warning"><strong>편의점 오전 7시·포켓몬센터 오전 10시 구매 보장 불가</strong>온라인 상품의 오전 10시 표기와 오프라인 매장의 일반 판매 시작은 다릅니다. SHIBUYA TSUTAYA는 공식적으로 사전예약 접수를 종료했습니다. 추첨 당첨이 없는 방문객에게 11/13 판매가 보장되지 않습니다.</div>'+
      '<p class="info-note"><a href="./research/pokemon-legacy-stores-release-2026-11-04.md">지점별 공식 링크·과거 스토리지 후기·응모 조건과 상충 운영시간 근거</a></p></section>';
  }
  function pokemonPackTimingGuide(){
    const places=[
      ['1','포켓몬센터','각 매장 개점 무렵','정가 팩 우선 방문처 · 영상의 통상 구매 제한 1인 5~10팩'],
      ['2','세븐일레븐·패밀리마트·로손','07:00 전후 빠르게 확인','오전 재입고 경험 · 통상 1인 2~5팩 · 지점별 취급 여부 상이'],
      ['3','카드 전문점·BOOKOFF','개점 이후 · 관광지 외곽 우선','중고·구형 카드 비교에도 적합 · 정가 팩은 재고가 드물 수 있음'],
      ['4','공식 포켓몬 카드 스탠드','역을 지날 때','영상의 2팩 묶음 판매 사례 · 재고 제한과 대기 가능성'],
      ['5','포켓몬센터 온라인','수시로 판매·추첨 공지 확인','불규칙 재입고 및 추첨 · 일본 전화번호/배송지 조건 확인']
    ];
    return '<section class="info-section" id="info-where"><h2>정가 팩 구매: 어느 시간에 어떤 판매처를 볼까?</h2>'+
      '<p>제공된 pokedoncards.jp 영상의 우선순위를 따릅니다. <strong>아침에는 편의점, 매장 개점 무렵에는 포켓몬센터, 이후에는 전문점</strong>을 탐색하고, 자판기는 이동 중에만 확인합니다. 이 구간은 일본 현지시간(JST) 기준의 탐색 권장 순서이지 입고 시간표가 아닙니다.</p>'+
      '<div class="info-table-scroll"><table class="info-table"><thead><tr><th>순위</th><th>판매처</th><th>권장 확인 시점</th><th>구매 전략</th></tr></thead><tbody>'+
      places.map(p=>'<tr><td>'+p[0]+'</td><td><strong>'+esc(p[1])+'</strong></td><td>'+esc(p[2])+'</td><td>'+esc(p[3])+'</td></tr>').join('')+'</tbody></table></div>'+
      '<div class="info-notice"><strong>매장별 목적지는 장소 탭에 있습니다.</strong>코엔지 편의점, 시부야·이케부쿠로·니혼바시·스카이트리 포켓몬센터, 오기쿠보·이케부쿠로 카드 스탠드, 아키하바라·이케부쿠로 카드숍의 주소와 추천 시각은 각각 장소 상세에서 확인할 수 있습니다. <a href="#discover">장소 탐색 열기</a></div>'+
      '<div class="info-notice info-warning"><strong>07:00은 전국 공통 입고 시각이 아닙니다.</strong>영상의 오전 보충 경험을 참고하되, 카드 취급·입고일·팩 종류·구매 제한은 지점과 상품마다 다릅니다. 일부 로손 상품의 별도 07:00 공식 판매 공지도 모든 신상품에 일반화하지 않습니다. 재고 문의나 판매 전 대기를 제한하는 점포 정책을 따라야 합니다.</div>'+
      '<details class="info-faq"><summary>영상 속 가격 사례와 온라인 구매 조건</summary><p>영상에는 카드 자판기 2팩 360엔/400엔, 테라스탈 페스티벌 ex 1팩 550엔, MEGA 드림 ex BOX 5,500엔, 메가 심포니아 BOX 5,400엔이 표시됩니다. 이는 해당 영상의 상품 가격 사례이며, 모든 팩에 적용되는 공통 정가가 아닙니다. 온라인에서는 불규칙한 품절·재입고·추첨이 있고 일본 번호·배송 주소·본인 인증 조건을 개별 상품에서 확인해야 합니다. '+external('https://www.pokemoncenter-online.com/','포켓몬센터 온라인')+'</p></details>'+
      '<p class="info-note">출처: 사용자 제공 pokedoncards.jp 릴스 화면(2026년 10월 상품 사례 포함). 제작자의 구매 성공 가능성 순위와 수량은 경험적 안내이며, 공식 실시간 재고 통계나 보장된 상한은 아닙니다.</p></section>';
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
      toc([['info-where','시간대·판매처'],['info-bulk','벌크·박스 탐색'],['info-release','11월 발매·추첨'],['info-buying-decisions','목적별 구매'],['info-community','현장 후기'],['info-specialist','전문점 팁'],['info-convenience','편의점 구매법'],['info-stores','도쿄 확인 후보'],['info-phrases','현장 표현'],['info-sources','공식 근거']])+
      pokemonPackTimingGuide()+pokemonBulkGuide()+pokemonReleaseGuide()+pokemonCommunityGuide()+
      '<section class="info-section" id="info-convenience"><h2>편의점 구매법: 점포별 취급 여부가 우선</h2>'+
      '<table class="info-table"><thead><tr><th>체인</th><th>시간 안내의 의미</th><th>주의할 점</th></tr></thead><tbody>'+
      '<tr><td>세븐일레븐</td><td>취급 점포의 계산대·판매 안내 확인</td><td>체인 전체가 포켓몬 카드를 취급하는 것은 아님.</td></tr>'+
      '<tr><td>패밀리마트</td><td>판매 공지와 카드 취급 여부 우선 확인</td><td>카드 판매가 없는 점포도 있고 신상품마다 판매 방식이 다름.</td></tr>'+
      '<tr><td>로손</td><td>2026년 9월 16일 특정 팩은 07:00 공식 공지</td><td>해당 상품은 1회 계산 5팩 제한. 11월의 다른 상품과 모든 점포에 자동 적용되지 않음.</td></tr></tbody></table>'+
      '<p class="info-note">로손의 07:00/5팩은 9월 16일 30th CELEBRATION 상품에 한정된 공식 사례입니다. 아침 탐색 순서와 영상의 구매 경험은 상단 전략에서 설명합니다.</p>'+
      '<div class="info-notice info-warning"><strong>입고 시간 문의와 대기 주의</strong>로손은 해당 상품 공지에서 점포별 재고·납품 시각 문의와 판매 전 대기를 제한했습니다. 점원에게 입고 시간 문의를 반복하거나 매장 내에서 대기하는 행동을 권하지 않습니다.</div>'+
      '<p class="info-note">공식 포켓몬 카드 취급점 지도는 모든 취급점을 보여주지 않고, 표시된 곳도 품절일 수 있다고 안내합니다. 지도 미등재=비취급이라고 판정하지 않습니다.</p></section>'+
      '<section class="info-section" id="info-stores"><h2>도쿄에서 접근 가능한 점포</h2><p>지역과 유형으로 점포를 찾는 색인입니다. 개별 주소·영업시간·추천 시각은 장소 상세에서 한 번만 표시하며, 이 목록은 실시간 재고 검색 결과가 아닙니다.</p>'+
      '<div id="info-store-results">'+storeResults()+'</div></section>'+
      '<section class="info-section"><h2>여행 기간 주목할 공식 상품</h2><div class="info-notice"><strong>11월 13일 출시 · 스페셜 덱 세트 MEGA</strong>메가장크로다일·메가망나뇽·메가팬텀의 구축 덱 세트이며 희망소비자가격은 5,500엔(세금 포함)입니다. 일반 확장팩이 아니며, 출시일이 즉시 구매 가능함을 보장하지 않습니다. '+external(sources.product,'상품 공식 정보')+'</div></section>'+
      '<section class="info-section" id="info-phrases"><h2>매장에서 사용할 일본어</h2><p>판매 중인 상품에 관해 짧게 확인할 때 사용하세요. 금지된 개별 납품/재고 문의나 장시간 대기를 권하는 표현은 포함하지 않았습니다.</p>'+
      '<div class="info-phrases">'+[
        ['포켓몬 카드를 취급하나요?','ポケモンカードは取り扱っていますか。'],
        ['이 상품을 구매할 수 있나요?','この商品は購入できますか。'],
        ['구매 수량 제한이 있나요?','購入数の制限はありますか。']
      ].map(o=>'<div class="info-phrase"><div><strong>'+esc(o[0])+'</strong><span lang="ja">'+esc(o[1])+'</span></div><button class="info-copy" type="button" data-info-copy="'+esc(o[1])+'">복사</button></div>').join('')+'</div><div id="info-copy-status" class="info-copy-result" role="status" aria-live="polite"></div></section>'+
      '<section class="info-section" id="info-sources"><h2>정보의 근거</h2>'+
      srcList([['포켓몬 카드 공식 취급점 검색과 미등재 안내',sources.pokemonMap],['로손 상품별 판매·문의 제한 공지 (2026-09-08)',sources.lawson],['11월 13일 스페셜 덱 세트 공식 정보',sources.product],['11월 27일 하도우 시커 확장팩','https://www.pokemon-card.com/ex/m7/'],['포켓몬 카드 스탠드 공식 설치 위치',sources.stand],['포켓몬센터 공식 상품 재고·구매 제한 FAQ',sources.centerFaq],['하레루야2 포켓몬 전문점 공식 목록',sources.hareruyaList],['BOOKOFF 포켓몬 카드 취급 정책',sources.bookoff],['스루가야 포켓몬 카드 취급 점포 목록',sources.surugaya],['SHIBUYA TSUTAYA 카드 라운지 판매 조건',sources.shibuyaLounge],['포켓몬센터 메가도쿄 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/'],['포켓몬센터 시부야 점포 정보','https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/']])+
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
      <p class="info-note">VJW 면세 구입용 QR을 매장에서 사용하지 않았더라도 면세점이 전송한 구매 기록은 표시될 수 있습니다. 이는 일반 결제 영수증 전체가 자동 등록된다는 뜻은 아닙니다. 기록이 없으면 매장 전송 여부를 확인하세요. 출국 당일 온라인 접속에 장애가 있을 때는 현장 여권 단말기를 이용하되, 매장이 전송하지 않은 거래 자체를 단말기가 새로 생성해 주는 것은 아닙니다.</p>
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
      <p class="info-note">VJW에서 결과 화면을 닫았다면 History(절차 이력)에서 확인할 수 있습니다. 미처리 구매 기록은 구매일로부터 90일간 표시되며, 절차 이력은 여권 제시·Confirm 이후 약 6주간 표시됩니다(국세청 FAQ). 검은 X의 Not approved or expired는 환급 불승인·기한 초과를 뜻합니다. Completed와 실제 카드 환급 입금은 다릅니다.</p>
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
        <div><strong>02 · 구매 매장의 환급 약관을 확인</strong><p>현금·신용카드·앱·계좌 환급과 별도 수단 등록은 구매 매장 또는 지정 환급 사업자가 안내합니다. 특정 앱 가입이 모든 면세 구매에 필수인 것은 아닙니다. 공항 현금 지급은 지원 사업자의 거래에만 해당합니다.</p></div>
        <div><strong>03 · 입금 지연은 구매처 또는 지정 환급사에 문의</strong><p>세관의 세금 반출 확인이 끝났다는 것은 환급 승인 정보에 관한 것이며 즉시 입금 보장은 아닙니다. 문의를 위해 구매일·거래 기록·결제 정보를 보관하세요.</p></div>
      </div>
      <p class="info-note">나리타 T1에서는 세관 확인 구역(중앙빌딩 4층, 05:30~23:00)과 환급금 현금 지급기(중앙빌딩 4층 보안검색 전, 06:00~24:00)가 별도로 안내됩니다. 보안검색 후 북쪽 윙 3층에도 환급 사업자 기기가 있지만, 이용 가능 여부는 매장이 지정한 환급 방식에 달려 있습니다.</p>
    </section>
    <section class="info-section info-faq" id="info-tax-faq">
      <h2>현장에서 자주 헷갈리는 상황</h2>
      <details><summary>Visit Japan Web에 등록하지 않으면 면세 환급을 못 받나요?</summary><p>아닙니다. 공항에 설치된 면세 절차 단말기에서 여권을 스캔하는 방법도 있습니다. VJW는 지정 전용 Wi-Fi를 사용하는 대안입니다.</p></details>
      <details><summary>세관 확인 단말기와 실제 환급금 받는 기기는 같은 기계인가요?</summary><p>아닙니다. 반출 확인 후 매장이나 지정 환급 사업자가 환급하며, 공항 현금 환급 기기는 별도입니다. 이용 가능한 환급 방법은 구매 매장에서 지정합니다.</p></details>
      <details><summary>VJW에 구매 내역이 없거나 오류가 나면요?</summary><p>구매한 면세점이 전달한 기록만 표시됩니다. 미처리 기록은 구매일로부터 90일 내 확인할 수 있으며, 면세 QR 미제시만으로 누락되는 것은 아닙니다. 새로 고침 후에도 거래가 없다면 구매처에 전송 여부를 문의하세요. 전용 Wi-Fi 오류는 현장 여권 단말기로 대체할 수 있지만, 누락된 매장 기록을 여행자가 임의 등록할 수는 없습니다.</p></details>
      <details><summary>환급 사업자 앱이나 이메일을 모든 매장에서 등록해야 하나요?</summary><p>아닙니다. 구매 시 매장 또는 위탁 환급사가 환급수단 등록 방법을 별도로 안내합니다. 한 업체에서 등록한 정보가 다른 모든 업체에 자동 연동된다고 가정하지 말고, 거래별 환급사·지급수단·문의처를 영수증과 함께 확인하세요.</p></details>
      <details><summary>간사이·고베공항 후기의 소요시간을 나리타에도 적용할 수 있나요?</summary><p>아닙니다. 키오스크 여권 스캔 자체는 빠를 수 있지만 공항별 설치 위치·이동거리·혼잡·적색 검사 여부가 다릅니다. 국세청이 Visit Japan Web 온라인 절차를 안내한 공항은 나리타·하네다·간사이·주부·후쿠오카·신치토세·나하 7곳이며, 그 밖의 공항은 현장 단말기 위치를 확인해야 합니다. 나리타 제1터미널과 피치항공 체크인 마감을 우선하세요.</p></details>
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
      <p class="info-note">기존 공항 동선 조사는 2026.11.01, 구매 기록·환급수단 FAQ 재대조는 2026.11.04입니다. 제공된 SNS 글은 현장 정리법의 참고 자료이며, 절차·권리·의무는 위 공식 자료를 우선합니다. 환급 가능 여부와 실제 처리 시기는 구매 업체·현장 세관에 따라 달라질 수 있습니다.</p>
    </section>
  </div>`;
}

  // TOKYO SCOUT is an evidence-labeled historical sourcing record, not a stock feed.
  const resaleData = () => window.TOKYO_RESALE || {stores:[],products:[],links:{},matchCount:0};
  const resaleFmt = n => Number(n||0).toLocaleString('ko-KR');
  function resaleStoreResults(){
    const d=resaleData();
    const areas=['전체',...new Set(d.stores.map(s=>s.area))];
    const found=d.stores.filter(s=>(state.resaleArea==='전체'||s.area===state.resaleArea)&&
      (state.resaleKind==='전체'||(state.resaleKind==='중고'?s.kind==='중고'||s.kind==='수집품 중고':s.kind!=='중고'&&s.kind!=='수집품 중고'))&&
      (!state.resaleSearch||[s.name,s.area,s.address,s.note,(d.links[s.sourceId]||[]).map(id=>d.products.find(p=>p.id===id)?.title).join(' ')].join(' ').toLocaleLowerCase().includes(state.resaleSearch.toLocaleLowerCase())));
    const btn=(label,attr,val,selected)=>'<button class="info-filter" type="button" '+attr+'="'+esc(val)+'" aria-pressed="'+selected+'">'+esc(label)+'</button>';
    return '<div class="info-filters">'+
      '<span class="info-filter-caption">지역 · 검색어 필터</span><div class="info-choices">'+
      areas.map(area=>btn(area,'data-resale-area',area,state.resaleArea===area)).join('')+'</div>'+
      '<div class="info-choices">'+[['전체','전체'],['신품','정식 매장/상품 취급'],['중고','중고 탐색']].map(([key,label])=>btn(label,'data-resale-kind',key,state.resaleKind===key)).join('')+'</div>'+
      '<input class="info-resale-search" id="resale-store-search" type="search" placeholder="점포명, 지역, 브랜드 또는 후보 상품" value="'+esc(state.resaleSearch)+'" aria-label="리셀 점포 검색" />'+
      '<div class="info-results" role="status">'+found.length+'개 매장 표시 · 전체 '+d.stores.length+'개 · 주소가 미확정인 경우는 출처 확인 필요</div></div>'+
      '<div class="info-list" id="resale-store-cards">'+
      (found.length?found.map(s=>{
        const related=(d.links[s.sourceId]||[]).map(id=>d.products.find(p=>p.id===id)).filter(Boolean);
        const crosschecked=s.verification==='official-address-crosschecked-2026-11-02';
        const cautious=s.verification==='facility-or-address-needs-review';
        return '<article class="info-store"><div class="info-store-top"><div><div class="info-kicker">'+esc(s.area)+' · '+esc(s.kind)+'</div><h3 class="info-store-title">'+esc(s.name)+'</h3></div><span class="info-status'+(crosschecked?' official':'')+'">'+(crosschecked?'공식 주소 재대조':cautious?'추가 위치 확인':'아카이브 주소')+'</span></div>'+
          '<p class="info-store-address">'+esc(s.address)+'</p>'+
          '<dl class="info-store-details"><dt>방문시간</dt><dd>'+esc(s.hours)+'</dd><dt>소싱 근거</dt><dd>'+esc(s.note)+'</dd><dt>후보 품목</dt><dd>'+esc(related.map(p=>p.title).join(' · ')||'구체적 SKU 연결 없음')+'</dd><dt>지도 정확도</dt><dd>점포 주소로 검색 · 지도 핀은 GSI 주소 구역 대표점일 수 있음</dd></dl>'+
          '<div class="info-store-actions">'+external(s.url,'매장 출처')+external(mapsUrl(s),'Google 지도 검색')+
          '<a href="#map/resale">리셀 지도</a></div></article>';
      }).join(''):'<p class="info-empty">해당 조건의 후보 매장이 없습니다. 검색어 또는 필터를 바꿔 보세요.</p>')+'</div>';
  }
  function resaleProductCards(){
    const d=resaleData();return '<div class="info-resale-products">'+d.products.map(p=>
      '<article class="info-resale-product"><span class="info-resale-action">'+esc(p.action)+'</span>'+
      '<h3>'+String(p.id).padStart(2,'0')+'. '+esc(p.title)+'</h3><p class="info-resale-model">품번 · '+esc(p.model)+'</p>'+
      '<p><strong>당시 일본 기준가 ¥'+resaleFmt(p.yen)+'</strong> · 국내 예상 판매가 '+resaleFmt(p.sell)+'원</p>'+
      '<p>KREAM 누적 체결 '+resaleFmt(p.trades)+'건 · 최근 30일 정확한 건수/최고 매수입찰 미확인</p>'+
      '<p class="info-resale-risk">'+esc(p.risk)+'</p>'+
      '<div class="info-store-actions">'+external(p.kream,'원본 가격/시세 확인')+'<button type="button" class="info-copy" data-resale-pick="'+p.id+'">이 품목으로 계산</button></div></article>').join('')+'</div>';
  }
  function resaleCalculator(){
    const p=resaleData().products.find(x=>x.id===state.resalePick)||resaleData().products[0];
    return '<div class="info-resale-calc" id="resale-calc" data-product="'+(p?.id||0)+'">'+
      '<p class="info-note">선택된 품목 · '+esc(p?.title||'')+'. 아래 입력값은 예시/수정 가능 값입니다. 실제 판매가격이나 거래 성립을 보장하지 않습니다.</p>'+
      '<div class="info-resale-inputs">'+
      '<label>현장 구매가 (엔)<input id="rs-yen" type="number" min="0" value="'+(p?.yen||0)+'" /></label>'+
      '<label>환율 (1엔당 원)<input id="rs-rate" type="number" min="0" step="0.1" value="8.5" /></label>'+
      '<label>예상 국내 매도가 (원)<input id="rs-sell" type="number" min="0" value="'+(p?.sell||0)+'" /></label>'+
      '<label>플랫폼 수수료 (%)<input id="rs-fee" type="number" min="0" max="100" step="0.5" value="8" /></label>'+
      '<label>플랫폼 배송·포장비 (원)<input id="rs-extra" type="number" min="0" value="3500" /></label></div>'+
      '<div class="info-resale-results" id="resale-calc-results" aria-live="polite"></div>'+
      '<p class="info-note">당근 직거래는 기본 판매수수료/배송료 0원, 플랫폼은 위 수수료/배송비를 차감합니다. 두 금액 모두 세금·관세·신고비용·여행비·반품·환율 실제 적용 차이를 반영하기 전 가상 차액이며 확정 순이익이 아닙니다.</p></div>';
  }
  function updateResaleCalculator(){
    const root=$('resale-calc-results');if(!root)return;
    const val=id=>Math.max(0,Number($(id)?.value)||0);
    const yen=val('rs-yen'),rate=val('rs-rate'),sell=val('rs-sell'),fee=Math.min(100,val('rs-fee')),extra=val('rs-extra');
    const cost=yen*rate, direct=sell-cost,platform=sell*(1-fee/100)-cost-extra;
    const fmt=n=>(n<0?'−':'')+resaleFmt(Math.round(Math.abs(n)))+'원';
    root.innerHTML='<div><small>기준 환산 매입액</small><strong>'+fmt(cost)+'</strong></div>'+
      '<div><small>직거래 예상 차액 (비용 전)</small><strong>'+fmt(direct)+'</strong></div>'+
      '<div><small>플랫폼 예상 차액 (세금 전)</small><strong>'+fmt(platform)+'</strong></div>';
  }
  function resalePage(){
    const d=resaleData();
    return '<div class="info-wrap info-resale-page">'+crumb('리셀 소싱')+
      header('TOKYO SCOUT · RESELL','도쿄 리셀 소싱 · 현장 검증 가이드','11월 11~14일 방문 후보를 원래 11~15일 여행 지도에 추가했습니다. 33개 매장은 확인할 곳이지 재고가 있는 곳을 뜻하지 않으며, 19개 상품의 숫자는 조사 시점 자료입니다.')+
      '<div class="info-notice info-warning"><strong>데이터의 증거 수준</strong>국내 예상 매도가와 실제 구매 입찰을 구분하세요. KREAM 누적 체결은 최근 30일 거래량이 아니며, 일본 기준 정가와 2026년 11월 실구매 가능 가격도 다릅니다. 지도에 찍힌 좌표는 국토지리원(GSI) 주소 구역 참조 위치일 수 있어 매장 건물의 정확한 입구가 아닙니다.</div>'+
      '<p class="info-meta">기준 2026.11.02 · '+d.stores.length+'개 탐색 매장 / '+d.products.length+'개 후보 SKU / '+d.matchCount+'개 상품–매장 연결 · 재고·매수 입찰 미확인</p>'+
      toc([['resale-approach','소싱 전략'],['resale-stores','매장 찾기'],['resale-products','상품별 수요'],['resale-calc-section','현장 손익'],['resale-context','조사 맥락']])+
      '<section class="info-section" id="resale-approach"><h2>현장에서 확인할 순서</h2><div class="info-steps">'+
      [['정확한 품번/연식·색상 확인','구형 키링과 2026 재발매형, 사이즈·색상·한정판을 혼동하지 않습니다.'],['실제 엔화 결제가 확인','정가로 살 수 있다는 증거가 아니라면 과거 정가로 계산하지 않습니다.'],['판매 가능 가격 검증','KREAM 누적 거래와 최신 체결·매수 입찰, 당근 직거래/플랫폼 수수료를 분리합니다.'],['세금·통관 등 법적 비용 반영','재판매 목적 물품은 개인 여행자 휴대품 면세나 일본 면세환급과 동일하지 않습니다. 신고 의무를 확인해야 합니다.']].map(([a,b])=>'<div class="info-step"><div><h3>'+esc(a)+'</h3><p>'+esc(b)+'</p></div></div>').join('')+'</div>'+
      '<p class="info-note">동선 제안은 시부야·하라주쿠·오모테산도·나카메구로 / 나카노·코엔지 / 이케부쿠로 캐릭터 팝업 / 도쿄역·긴자 등 지역별 묶음이며, 기존 날짜별 일정을 자동 변경하지 않았습니다.</p></section>'+
      '<section class="info-section" id="resale-stores"><div class="info-resale-heading"><h2>매장 33곳 · 주소 확인 상태</h2><a href="#map/resale">지도에서 리셀만 보기</a></div><p class="info-note">공식 점포 주소를 재대조한 곳과 아카이브 기반만 확인된 곳을 구별합니다. RAGTAG 시부야(1-17-7)·신주쿠(3-32-10)는 일본어 공식 페이지를 기준으로 글로벌 영문 목록의 상충 표기를 교정했습니다. KINDAL 코엔지점은 수요일 휴무입니다.</p><div id="resale-store-results">'+resaleStoreResults()+'</div></section>'+
      '<section class="info-section" id="resale-products"><h2>상품 19개 · 당시 판단과 품번</h2><p class="info-note">정량 거래값은 2026.10~11 아카이브의 과거 스냅샷입니다. 체결가·호가·발매가를 현재 실현 가능한 판매가로 해석하지 마세요.</p>'+resaleProductCards()+'</section>'+
      '<section class="info-section" id="resale-calc-section"><h2>현장 구매가로 손익 비교</h2>'+resaleCalculator()+'</section>'+
      '<section class="info-section" id="resale-context"><h2>왜 추천이 달라졌나</h2><p>초기에는 치이카와·여성향 상품의 온라인 화제성을 참고했으나, 번개장터 등록 물량에 비해 판매 완료가 부족하다는 관찰 이후 실거래 중심으로 기준을 바꿨습니다. 현재 조사 대상은 패션·카드·완구·중고 패션 등으로 확장됐습니다.</p><p>치이카와 ANA 우사기·공룡·도시락·생일요정·하얀 우사기는 같은 수요로 취급하지 않습니다. Threads 스크린샷의 58,500원 결제 취소 사례는 수요 확정이 아니라 가격 저항의 사례이며, ANA 우사기 과거 체결과 최근 30일 시장 전체 거래도 분리해야 합니다.</p><p>2026년 11월 11~14일 이벤트와 소싱 후보는 여러 계획안 중 하나입니다. 특정 매장 재고, 영업, 11월 13일 포켓몬 출시 상품, 치이카와 팝업의 정리권은 방문 전 공식 안내를 확인하세요.</p>'+
      '<p>'+external('https://github.com/thandaPangda/tokyo-field-guide-2026/blob/main/README.md','프로젝트 기존 가이드')+' · <a href="./research/resale-scout-context-2026-11-02.md">리셀 조사 맥락·근거 문서</a></p></section></div>';
  }


  // Independent supermarket/self-catering note; it does not create or duplicate map places.
  function groceryGuide() {
    return '<div class="info-wrap info-grocery-page">'+crumb('마트 고기·숙소 취사')+
      header('SUPERMARKET · SELF-CATERING','도쿄 마트 흑모와규 · 할인 라벨 가이드','사진의 마블링·할인 스티커는 특정 매장의 한 시점 사례입니다. 흑모와규가 항상 싸거나 취사 숙소가 호텔보다 경제적이라는 결론은 도출할 수 없습니다.','2026.11.04')+
      '<div class="info-notice info-warning"><strong>사진과 숙소 선택은 별개의 근거</strong>SNS 사진은 흑모와규로 소개된 소고기 포장과 20% 할인 표시를 보여주지만, 무게·세금·할인 전후 가격과 매장·촬영일이 확인되지 않습니다. 에어비앤비가 호텔보다 저렴하다는 비교자료도 없습니다. 조리가 가능한 숙소의 냉장고·조리도구·취사 규칙·총 숙박비를 확인한 후 판단하세요.</div>'+
      '<section class="info-section"><h2>매장에서 먼저 읽을 일본어</h2><div class="info-grid">'+
      '<div class="info-notice"><strong>黒毛和牛 · 国産牛</strong>黒毛和牛(구로게와규)는 일본 흑모화종을 가리키며, 国産牛(국산우)는 일본에서 사육한 소고기라는 더 넓은 표시입니다. 마블링 사진만으로 품종·등급을 판단하지 마세요.</div>'+
      '<div class="info-notice"><strong>20%引 · 税込 · 税抜</strong>20%引은 할인 표시, 税込은 세금 포함, 税抜은 세금 별도 가격입니다. 스티커가 붙은 특정 팩에만 적용될 수 있으므로 최종 계산대 가격을 확인하세요.</div>'+
      '<div class="info-notice"><strong>100g当たり · 内容量</strong>100g당 가격과 팩 총중량이 다르면 진열된 가격 숫자만 비교할 수 없습니다. 원산지·부위·등급·100g 단가를 같은 조건으로 비교하세요.</div>'+
      '<div class="info-notice"><strong>消費期限 · 要加熱</strong>소비기한과 가열 필요 표시를 확인하고, 냉장 상태로 숙소까지 운반해 충분히 조리하세요. 생고기·가열용 제품을 생식용으로 취급하지 않습니다.</div></div></section>'+
      '<section class="info-section"><h2>기존 지도와 연결하는 방법</h2><p>기존 도쿄 지도에는 라이프 시부야히가시점, 오케이 고엔지점, 세이유 고엔지점 등 장보기 후보가 이미 있습니다. 새 고기 판매처를 중복 등록하지 않았으며, 이들 점포에 흑모와규 재고 또는 20% 할인이 있다는 뜻도 아닙니다.</p><p><a href="#map">기존 지도에서 마트 동선 확인</a> · <a href="./research/market-discounts-2026-11-03.md">기존 회·초밥 마감할인 조사</a></p></section>'+
      '<section class="info-section"><h2>현지에서 먹을 음식과 출국 면세품은 구분하세요</h2><p>숙소에서 조리해 일본 안에서 먹을 소고기는 출국 시 반출할 물품이 아니므로 2026년 면세 환급을 신청하는 대상이 아닙니다. 식품의 특수 밀봉 포장 규정이 폐지된 것과 일본에서 소비한 식품에 대한 환급 가능성은 별개의 문제입니다.</p><p>'+external(sources.tourism,'일본 관광청 · 2026 면세품 반출·일본 내 소비 규정')+'</p></section>'+
      '<section class="info-section"><h2>자료 해석 범위</h2><p>스크린샷은 매장 가격표를 원문 확인한 영수증이나 현행 상품 카탈로그가 아닙니다. 사진 속 20% 할인은 모든 매장의 매일 할인율이 아니며, 일본 가격과 한국 가격의 품질·무게 일치 비교도 검증되지 않았습니다.</p><p><a href="./research/social-shopping-taxrefund-2026-11-04.md">스크린샷 8장·중복 내용·공식 근거 정리</a></p></section></div>';
  }


  // Airport transfer choices are estimates, not a live train search.
  // Source/verification detail: research/airport-transport-2026-11-06.md.
  const airportArrivals = [
    {id:"main",name:"게이세이 본선 특급 + JR",fare:1366,range:"약 120~155분",wait:"열차에 따라 약 10~30분",changes:"2회",seat:"일반열차 · 지정석 없음",ticket:"Suica/PASMO",tag:"최저가",quality:"요금 우선",route:["나리타공항 제1터미널역에서 게이세이 본선 경유 특급/쾌속특급 확인","닛포리역에서 JR 야마노테선으로 환승","신주쿠역에서 JR 주오·소부선 완행으로 코엔지까지 이동"],note:"게이세이 본선 경유와 SKY ACCESS 경유는 요금이 다릅니다. 좌석 보장이 없고 이동·환승 시간이 길어집니다.",basis:"게이세이 본선 닛포리 IC 1,025엔 + JR 닛포리→코엔지 IC 약 341엔"},
    {id:"access",name:"액세스 특급 + JR 소부선",fare:1617,range:"약 100~120분",wait:"행선지에 따라 약 20~40분 이상",changes:"1회",seat:"일반열차 · 지정석 없음",ticket:"Suica/PASMO",tag:"추천 · 가성비",quality:"환승 1회 · 예약 불필요",route:["나리타공항 제1터미널역에서 아사쿠사선 직통 액세스 특급 승차","아사쿠사바시(浅草橋)역에서 JR 주오·소부선 완행 미타카 방면으로 환승","코엔지(高円寺)역 하차"],note:"액세스 특급이 모두 아사쿠사바시로 가는 것은 아닙니다. 행선지 표시에서 아사쿠사선 직통 여부를 확인해야 합니다.",basis:"나리타공항→아사쿠사바시 IC 1,276엔 + JR 아사쿠사바시→코엔지 IC 341엔"},
    {id:"bus",name:"TYO-NRT 공항버스 + JR",fare:1841,range:"약 110~150분",wait:"낮 시간대 보통 약 10~20분",changes:"1회 이상",seat:"버스 좌석 · 짐칸 이용",ticket:"공항 매표소에서 시간 지정 승차권",tag:"캐리어 편의",quality:"버스 탑승 중 짐 이동 적음",route:["나리타공항 제1터미널에서 도쿄역행 TYO-NRT 버스 티켓 구매","도쿄역에서 JR 주오선으로 이동","JR 주오선 코엔지 하차 · 쾌속 비정차일에는 나카노에서 소부선 완행으로 환승"],note:"도쿄역 버스 하차장부터 JR 승강장까지 보행이 있고, 교통정체 시 시간 예측이 어렵습니다. 주말/공휴일 주오선 쾌속은 코엔지에 정차하지 않습니다.",basis:"TYO-NRT 일반 시간대 1,500엔 + JR 도쿄→코엔지 IC 341엔"},
    {id:"skyliner",name:"스카이라이너 + JR",fare:2651,range:"약 85~110분",wait:"약 20분 간격 중심",changes:"2회",seat:"지정석 · 수하물 보관",ticket:"할인권 구매 후 좌석 지정",tag:"빠른 공항열차",quality:"쾌적하지만 환승이 많음",route:["나리타공항 제1터미널역에서 닛포리행 스카이라이너 승차","닛포리역에서 JR 야마노테선으로 환승","신주쿠역에서 JR 주오·소부선 완행으로 코엔지 이동"],note:"닛포리에서 JR로 갈아타고 다시 환승해야 하므로 공항열차가 빠르더라도 숙소까지의 이동은 길어질 수 있습니다.",basis:"스카이라이너 온라인 편도 2,310엔 + JR 닛포리→코엔지 IC 341엔"},
    {id:"nex",name:"나리타 익스프레스(N'EX) + JR",fare:3529,range:"약 100~125분",wait:"신주쿠 직통편 대기는 길어질 수 있음",changes:"1회",seat:"전 좌석 지정석 · 짐 보관",ticket:"JR 발매기/창구에서 편도 지정석",tag:"지정석 편의",quality:"큰 짐·피로도에 유리",route:["나리타공항 제1터미널역 JR 승강장에서 신주쿠행 N'EX 승차","신주쿠역에서 JR 주오·소부선 완행(미타카 방면) 환승","코엔지역 하차"],note:"코엔지까지 더 빠르다는 보장은 없습니다. 신주쿠행 출발 대기와 역내 이동이 길어질 수 있습니다. JR 구간을 연속 구매하면 실제 운임이 달라질 수 있습니다.",basis:"N'EX 나리타공항→신주쿠 보통차 편도 3,330엔 + 신주쿠→코엔지 IC 199엔(별도 구매 가정)"}
  ];
  const airportReturns = [
    {id:"skyliner",name:"JR 야마노테선 + 스카이라이너 첫차",fare:2563,arrival:"제1터미널역 06:26",risk:"권장 · 다만 지연 여유 적음",tag:"현실적인 1순위",route:"시부야 04:37 → 닛포리 약 05:05 → 스카이라이너 05:45 → 나리타 T1 06:26",basis:"시부야→닛포리 IC 253엔 + 스카이라이너 할인 편도 2,310엔"},
    {id:"local",name:"JR + 게이세이 본선 일반열차",fare:1278,arrival:"첫차·접속편에 따라 07시 전후",risk:"비추천 · 체크인 여유 부족",tag:"저렴하나 위험",route:"시부야 → 닛포리 → 게이세이 본선 → 나리타 T1",basis:"JR 시부야→닛포리 253엔 + 게이세이 본선 닛포리→공항 IC 1,025엔"},
    {id:"bus",name:"시부야 직행 공항 리무진버스",fare:3600,arrival:"제1터미널 약 07:05",risk:"비추천 · 정체 시 마감 위험",tag:"환승 없음 · 늦음",route:"시부야 마크시티 약 05:30 → 나리타공항 제1터미널 약 07:05",basis:"시부야 공항 리무진버스 일반 편도 3,600엔"}
  ];
  const airportFmt = n => Number(n).toLocaleString("ko-KR")+"엔";
  const airportBy = (items,id) => items.find(x=>x.id===id)||items[0];
  function airportSteps(items) {
    return "<ol class='info-airport-steps'>"+items.map((step,i)=>"<li><span class='info-airport-stepnum'>"+(i+1)+"</span><span>"+esc(step)+"</span></li>").join("")+"</ol>";
  }
  function airportMethod(item) {
    return "<article class='info-airport-method'><div class='info-airport-method-head'><div><span class='info-airport-small'>"+esc(item.tag)+"</span><h3>"+esc(item.name)+"</h3></div><strong class='info-airport-fare'>"+airportFmt(item.fare)+"</strong></div>"+
      "<div class='info-airport-metrics'><span>예상 이동 <b>"+esc(item.range)+"</b></span><span>환승 <b>"+esc(item.changes)+"</b></span><span>예상 첫 대기 <b>"+esc(item.wait)+"</b></span><span>좌석 <b>"+esc(item.seat)+"</b></span></div>"+
      airportSteps(item.route)+"<p class='info-airport-note'><b>발권</b> "+esc(item.ticket)+"</p><p class='info-airport-note'><b>고려할 점</b> "+esc(item.note)+"</p>"+
      "<p class='info-airport-basis'>운임 구성: "+esc(item.basis)+" · 공항 최초 열차 대기·입국심사는 이동시간에서 제외</p></article>";
  }
  function airportComparisonRows(items,returning) {
    return items.map(item=>"<tr><th scope='row'>"+esc(item.name)+"</th><td>"+airportFmt(item.fare)+"</td>"+
      "<td>"+esc(returning?item.arrival:item.range)+"</td><td>"+esc(returning?item.risk:(item.changes+" 환승 · "+item.seat))+"</td></tr>").join("");
  }
  function airportComboDetails(){
    const arrival=airportBy(airportArrivals,state.airportArrival);
    const returning=airportBy(airportReturns,state.airportReturn);
    const roundTripDiscount=(arrival.id==="skyliner"&&returning.id==="skyliner")?120:0;
    const total=arrival.fare+returning.fare-roundTripDiscount;
    return "<div class='info-airport-combo-result'><span class='info-airport-small'>선택한 왕복 조합 · 성인 1인 예상 교통비</span>"+
      "<strong class='info-airport-total'>"+airportFmt(total)+"</strong>"+
      "<p>"+esc(arrival.name)+" <b>"+airportFmt(arrival.fare)+"</b> + "+esc(returning.name)+" <b>"+airportFmt(returning.fare)+"</b>"+
      (roundTripDiscount?" − 스카이라이너 온라인 왕복권 추가 할인 120엔":"")+" = <b>"+airportFmt(total)+"</b></p>"+
      "<p class='info-airport-note'>"+(returning.id==="skyliner"?"귀국 항공편은 08:30 출발입니다. 06:26 공항역 도착 이후 터미널 이동과 피치항공 체크인을 07:40 이전에 완료해야 합니다.":"선택한 귀국편은 체크인 마감 전 여유가 적어 실제 예약에 사용하기 전에 첫차·연결시간 검증이 필요합니다.")+"</p></div>";
  }
  function airportPickButtons(items,attr,chosen){
    return "<div class='info-airport-picks'>"+items.map(item=>
      "<button type='button' class='info-airport-pick' "+attr+"='"+esc(item.id)+"' aria-pressed='"+(chosen===item.id)+"'>"+
      "<span>"+esc(item.name)+"</span><strong>"+airportFmt(item.fare)+"</strong></button>").join("")+"</div>";
  }
  function refreshAirportCombo(){
    const panel=$("airport-combo-result");if(panel)panel.innerHTML=airportComboDetails();
    const root=$("view-info");root?.querySelectorAll?.("[data-airport-arrival]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.getAttribute("data-airport-arrival")===state.airportArrival)));
    root?.querySelectorAll?.("[data-airport-return]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.getAttribute("data-airport-return")===state.airportReturn)));
  }
  function airportTransportPage(){
    const combos=[
      ["가장 저렴한 일반열차 조합","main", "skyliner"],
      ["추천 · 가격과 환승 균형","access","skyliner"],
      ["공항버스 + 스카이라이너","bus","skyliner"],
      ["스카이라이너 왕복 할인권","skyliner","skyliner"],
      ["입국 편의 중시 · N'EX","nex","skyliner"]
    ];
    const comboRows=combos.map(x=>{
      const a=airportBy(airportArrivals,x[1]),r=airportBy(airportReturns,x[2]);
      const discount=a.id==="skyliner"?120:0;
      return "<tr><th scope='row'>"+esc(x[0])+"</th><td>"+esc(a.name)+"</td><td>"+esc(r.name)+"</td><td><b>"+airportFmt(a.fare+r.fare-discount)+"</b></td></tr>";
    }).join("");
    return "<div class='info-wrap info-airport-page'>"+crumb("나리타 공항 교통")+
      header("AIRPORT TRANSFER · 2026.11.06","나리타 공항 교통 · 입국과 귀국","입국은 나리타공항에서 코엔지 숙소로, 귀국은 시부야에서 피치항공 08:30편을 타러 이동합니다. 가격·대기·환승·좌석·발권을 목적지 기준으로 비교합니다.","2026.11.06")+
      "<div class='info-airport-overview'><article><span class='info-airport-small'>입국 · 코엔지 숙소</span><strong>액세스 특급 + JR</strong><b>약 1,617엔</b><p>아사쿠사바시 1회 환승 · 가성비 우선</p></article>"+
      "<article><span class='info-airport-small'>귀국 · 시부야 출발</span><strong>야마노테선 + 스카이라이너</strong><b>약 2,563엔</b><p>닛포리 05:45 출발 · 공항 T1 06:26 도착</p></article>"+
      "<article class='info-airport-overview-total'><span class='info-airport-small'>기본 추천 왕복 예산</span><strong>4,180엔</strong><p>성인 1명, 입국 1,617엔 + 귀국 2,563엔</p></article></div>"+
      "<div class='info-notice info-warning'><strong>귀국은 피치항공 체크인 시각이 먼저입니다.</strong>나리타 제1터미널 북쪽 윙 4층에서 국제선 체크인을 출발 120~50분 전(06:30~07:40)에 완료해야 합니다. 스카이라이너 첫차의 공항역 도착 06:26 이후 약 74분 안에 카운터로 이동하고 수속을 마쳐야 합니다. 열차 지연·수하물 위탁·면세 세관 확인을 고려하면 전날 공항 부근 숙박이 더 안정적일 수 있습니다.</div>"+
      toc([["airport-arrival","입국 5가지 비교"],["airport-departure","귀국 3가지 비교"],["airport-combinations","왕복 조합 계산"],["airport-tickets","발권·구매 팁"],["airport-sources","확인 근거"]])+
      "<section class='info-section' id='airport-arrival'><h2>입국 · 나리타 T1 → 코엔지역</h2>"+
      "<p>한국에서 오전 08:30 출발하는 피치항공으로 입국하는 날입니다. 나리타 도착 시각은 항공편마다 다르며, 입국심사·위탁수하물 소요시간은 다음 열차 선택 전에는 확정할 수 없습니다.</p>"+
      "<div class='info-airport-table-scroll'><table class='info-table info-airport-table'><thead><tr><th scope='col'>선택지</th><th scope='col'>편도</th><th scope='col'>예상 이동</th><th scope='col'>특징</th></tr></thead><tbody>"+airportComparisonRows(airportArrivals,false)+"</tbody></table></div>"+
      "<p class='info-note'>이동시간은 열차/버스 탑승과 환승의 대략적인 범위이며 공항에서 처음 기다리는 시간과 입국심사 시간은 제외합니다. 가격은 2026.11.06 조사 기준의 일반 성인 IC/온라인 할인 조합입니다.</p>"+
      "<div class='info-airport-methods'>"+airportArrivals.map(airportMethod).join("")+"</div></section>"+
      "<section class='info-section' id='airport-departure'><h2>귀국 · 시부야 → 나리타 T1 · 08:30 비행기</h2>"+
      "<div class='info-airport-timeline'><div><b>04:37</b><span>시부야역 출발 · JR 야마노테선 외선(신주쿠·이케부쿠로 방면)</span></div>"+
      "<div><b>약 05:05</b><span>닛포리역 도착 · 게이세이 스카이라이너 승강장 이동</span></div>"+
      "<div><b>05:45</b><span>스카이라이너 1호 출발</span></div>"+
      "<div><b>06:26</b><span>나리타 제1터미널 철도역 도착 · 체크인 카운터로 이동</span></div>"+
      "<div><b>07:40</b><span>피치항공 국제선 체크인·위탁수하물 마감</span></div>"+
      "<div><b>08:30</b><span>피치항공 출발</span></div></div>"+
      "<div class='info-airport-table-scroll'><table class='info-table info-airport-table'><thead><tr><th scope='col'>선택지</th><th scope='col'>편도</th><th scope='col'>공항 도착</th><th scope='col'>판단</th></tr></thead><tbody>"+airportComparisonRows(airportReturns,true)+"</tbody></table></div>"+
      "<p class='info-note'>시부야 04:37 → 닛포리 05:05는 확인 당시의 첫차 연결 예시입니다. 여행 종료일은 2026.11.15(일)로 추정되므로 당일 공휴일·주말 시간표와 운행 공지를 반드시 재확인해야 합니다. 게이세이 일반열차는 공항 도착 가능 시각이 운행편에 따라 달라지며 이 표는 확정 연결표가 아닙니다.</p>"+
      "<p>시부야 직행 공항버스는 환승이 없지만 첫차가 약 05:30에 출발하여 제1터미널에 약 07:05 도착하므로 피치항공 07:40 마감에 불리합니다. 나리타 익스프레스는 아침 08:30 국제선 출발을 위한 첫차 대안으로 권장하지 않습니다.</p>"+
      "<div class='info-notice'><strong>공항 전날 숙박 대안</strong>기차 첫차에 의존하지 않고 06:00 전후 공항 도착을 목표로 할 수 있습니다. 비용은 숙소와 셔틀 운행에 따라 달라 비교 계산에는 넣지 않았으며, 여행 날짜에 맞는 실제 셔틀 첫차를 확인해야 합니다.</div></section>"+
      "<section class='info-section' id='airport-combinations'><h2>왕복 선택 조합 비교</h2>"+
      "<p>아래 기본 조합은 귀국편을 스카이라이너 첫차로 고정한 비교입니다. 스카이라이너를 입국·귀국 모두 이용할 때만 4,500엔 왕복 온라인 할인권 적용을 가정해 합계에서 120엔을 추가 차감합니다.</p>"+
      "<div class='info-airport-table-scroll'><table class='info-table info-airport-table'><thead><tr><th scope='col'>기준</th><th scope='col'>입국편</th><th scope='col'>귀국편</th><th scope='col'>왕복 총액</th></tr></thead><tbody>"+comboRows+"</tbody></table></div>"+
      "<div class='info-airport-custom'><h3>내 조합 직접 선택하기</h3><p>입국·귀국 방법을 눌러 교통비 합계를 비교할 수 있습니다. 요금은 예상치이며 실제 구매 및 좌석 예약을 대신하지 않습니다.</p>"+
      "<h4>입국 선택</h4>"+airportPickButtons(airportArrivals,"data-airport-arrival",state.airportArrival)+
      "<h4>귀국 선택</h4>"+airportPickButtons(airportReturns,"data-airport-return",state.airportReturn)+
      "<div id='airport-combo-result' role='status' aria-live='polite'>"+airportComboDetails()+"</div></div></section>"+
      "<section class='info-section' id='airport-tickets'><h2>발권 난이도와 꼭 확인할 정보</h2>"+
      "<div class='info-airport-faq'><details><summary>액세스 특급은 사전 구매가 필요한가요?</summary><p>아닙니다. Suica/PASMO로 개찰구를 통과합니다. 단, 게이세이 본선과 SKY ACCESS 경로의 요금은 다르고 액세스 특급의 모든 열차가 아사쿠사바시 직통인 것은 아닙니다.</p></details>"+
      "<details><summary>N'EX 편도는 어떻게 사나요?</summary><p>공항 JR 지정석 발매기 또는 창구에서 신주쿠행 보통차 편도를 구매합니다. 3,330엔은 신주쿠까지의 표준 가격이며 코엔지까지 별도 JR 구간을 199엔으로 계산했습니다. 통합 구간으로 발권하면 요금이 달라질 수 있습니다. 왕복 할인권 5,200엔은 귀국에 N'EX를 쓰지 않아 이번 조합과 맞지 않습니다.</p></details>"+
      "<details><summary>스카이라이너 할인권은 어떻게 적용하나요?</summary><p>온라인 편도 할인권은 2,310엔, 일반 편도는 2,580엔입니다. 온라인 왕복권은 4,500엔이며 공항 도착 시 교환 조건과 지정석 예약 절차를 확인해야 합니다. 귀국편만 타면 편도 할인권을 선택하는 편이 낫습니다.</p></details>"+
      "<details><summary>토요일·일요일에도 코엔지에 주오선 쾌속이 서나요?</summary><p>아닙니다. 주말·공휴일 주오선 쾌속은 코엔지를 통과하므로 주오·소부선 완행으로 이동해야 합니다. 입국일은 수요일 예정이라 평일 운행이지만 이용 직전 행선지와 정차역을 확인하세요.</p></details>"+
      "<details><summary>항공편이 지연되거나 출입국 수속이 길어지면?</summary><p>입국은 공항에서 실시간 열차 출발판을 보고 액세스 특급 또는 N'EX 중 대기시간이 짧은 것을 고를 수 있습니다. 귀국은 첫차보다 늦게 출발하면 대체 수단이 제한적이므로 알람·역까지 이동수단·항공사 마감시간을 미리 확보하세요.</p></details></div></section>"+
      "<section class='info-section' id='airport-sources'><h2>요금·운행·체크인 근거</h2><p>철도 운임과 버스 기본요금, 항공사 터미널은 아래 공식 안내에서 확인했습니다. 일반열차 연결·JR 구간 운임 및 소요시간은 교통 경로 검색의 예시로, 특정 여행일 실시간 예약 가능 또는 운행 확정 정보가 아닙니다.</p>"+
      srcList([["게이세이 · 액세스 특급 운임표","https://www.keisei.co.jp/keisei/tetudou/skyliner/jp/traffic/express_fares.php"],["게이세이 · 본선 운임표","https://www.keisei.co.jp/keisei/tetudou/skyliner/jp/traffic/main_fares.php"],["게이세이 · 스카이라이너 공식 시간표","https://www.keisei.co.jp/keisei/tetudou/skyliner/us/traffic/skyliner_1123.php"],["게이세이 · 할인권","https://www.keisei.co.jp/keisei/tetudou/skyliner/us/tickets/coupon.php"],["JR 동일본 · N'EX 운임과 발권","https://www.jreast.co.jp/multi/nex/tickets/"],["TYO-NRT · 요금과 발권 방법","https://tyo-nrt.com/kr/flow"],["도큐버스 · 시부야 공항버스","https://www.tokyubus.co.jp/airport/de-futako-narita.html"],["피치항공 · 나리타 국제선 수속","https://www.flypeach.com/en/lm/ai/airports/airportguide_international/NRT"],["피치항공 · 체크인 마감","https://www.flypeach.com/en/lm/ai/airports/how_to_checkin"]])+
      "<p class='info-note'>2026.11.06 조사. 항공편 출발시간 08:30은 여행자 제공 정보이며 항공편 번호와 일본 입국 예정 시각은 별도 확인되지 않았습니다. 여행 날짜가 변경되면 일정을 다시 확인하세요.</p></section></div>";
  }

  function renderInfoTab(route) {
    const root=$('view-info');
    if(!root)return;
    const path=String(route||'info').replace(/^#/,'');
    if(path==='info/airport')root.innerHTML=airportTransportPage();
    else if(path==='info/grocery')root.innerHTML=groceryGuide();
    else if(path==='info/resale')root.innerHTML=resalePage();
    else if(path==='info/taxfree')root.innerHTML=taxfree();
    else if(path==='info/pokemon')root.innerHTML=pokemon();
    else root.innerHTML=hub();
    if(path==='info/resale')updateResaleCalculator();
    document.title=(path==='info/airport'?'나리타 공항 교통':path==='info/resale'?'도쿄 리셀 소싱':path==='info/pokemon'?'포켓몬 카드 구매':path==='info/taxfree'?'일본 면세 환급':path==='info/grocery'?'마트 흑모와규 가이드':'여행 정보')+' · TOKYO FIELD GUIDE';
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
        if(btn.hasAttribute('data-airport-arrival')){const id=btn.getAttribute('data-airport-arrival');if(airportArrivals.some(x=>x.id===id)){state.airportArrival=id;refreshAirportCombo();}}
        if(btn.hasAttribute('data-airport-return')){const id=btn.getAttribute('data-airport-return');if(airportReturns.some(x=>x.id===id)){state.airportReturn=id;refreshAirportCombo();}}
        if(btn.hasAttribute('data-info-goal')){state.goal=btn.getAttribute('data-info-goal');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-info-region')){state.region=btn.getAttribute('data-info-region');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-info-kind')){state.kind=btn.getAttribute('data-info-kind');const panel=$('info-store-results');if(panel)panel.innerHTML=storeResults();}
        if(btn.hasAttribute('data-tax-method')){
          state.taxMethod=btn.getAttribute('data-tax-method')==='vjw'?'vjw':'kiosk';
          const panel=$('info-tax-method-panel');if(panel)panel.innerHTML=taxMethodPanel();
          root.querySelectorAll?.('[data-tax-method]').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-tax-method')===state.taxMethod)));
        }
        if(btn.hasAttribute('data-info-copy'))copyText(btn.getAttribute('data-info-copy'));
        if(btn.hasAttribute('data-resale-area')){state.resaleArea=btn.getAttribute('data-resale-area');const panel=$('resale-store-results');if(panel)panel.innerHTML=resaleStoreResults();}
        if(btn.hasAttribute('data-resale-kind')){state.resaleKind=btn.getAttribute('data-resale-kind');const panel=$('resale-store-results');if(panel)panel.innerHTML=resaleStoreResults();}
        if(btn.hasAttribute('data-resale-pick')){state.resalePick=Number(btn.getAttribute('data-resale-pick'));const el=$('resale-calc');if(el){el.outerHTML=resaleCalculator();updateResaleCalculator();$('resale-calc')?.scrollIntoView({behavior:'smooth',block:'nearest'});}}
      }
      const jump=event.target.closest('a[data-info-jump]');
      if(jump && root.contains(jump)){
        event.preventDefault();
        const target=$(jump.getAttribute('data-info-jump'));if(target){target.scrollIntoView({behavior:'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
      }
    });
    root.addEventListener('input',event=>{const t=event.target;
      if(t?.id==='resale-store-search'){state.resaleSearch=t.value;const el=$('resale-store-results');if(el){const start=t.selectionStart,end=t.selectionEnd;el.innerHTML=resaleStoreResults();const next=$('resale-store-search');next?.focus();try{next?.setSelectionRange(start,end);}catch(_){}}}
      if(['rs-yen','rs-rate','rs-sell','rs-fee','rs-extra'].includes(t?.id))updateResaleCalculator();
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
