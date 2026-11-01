/* TOKYO SCOUT archive 2026-11-02 — historical sourcing candidates, not inventory claims.
 * Address text is kept separate from GSI address-block coordinates generated at runtime.
 * Do not replace unknown coordinates with district/station centroids. */
(function(root){
'use strict';
const rows=[
['K01','에비스','KAPITAL TOKYO NAKED STORE','渋谷区恵比寿南2-20-2 ガイヤエビスビル1F','11:00–20:00','https://www.kapital.jp/shop/detail/2.html','직영','반다나·의류 문의; 특정 품번 재고 미확인'],
['K02','에비스','Duffle with KAPITAL','渋谷区恵比寿南2-24-2 ファニービル','11:00–20:00','https://www.kapital.jp/shop/detail/3.html','직영','에비스 인접 점포, 품번 재고 미확인'],
['K03','에비스','KAPITAL Legs Craftsman Store','渋谷区恵比寿南2-23-12 エビスサニービル1F','11:00–20:00','https://www.kapital.jp/shop/detail/4.html','직영','팬츠·데님류 문의'],
['K04','롯폰기','KAPITAL SOHO Roppongi','港区六本木6-10-1 六本木ヒルズ ヒルサイド1F','11:00–20:00','https://www.kapital.jp/shop/detail/5.html','직영','롯폰기힐스; 주소 공식 재대조'],
['K05','롯폰기','KAPITAL Legs Roppongi','港区六本木6-10-1 六本木ヒルズ ヒルサイド1F','11:00–20:00','https://www.kapital.jp/shop/detail/6','직영','SOHO와 동일 복합건물, 별도 점포'],
['H01','시부야·하라주쿠','HYSTERIC GLAMOUR Shibuya Women','渋谷区神宮前6-23-2 B1F','11:00–20:00','https://www.hystericglamour.jp/store/','직영','여성 지갑·프래그먼트 케이스; 층수 공식 재대조'],
['H02','시부야·하라주쿠','HYSTERIC GLAMOUR Shibuya Men','渋谷区神宮前6-23-2 2F','11:00–20:00','https://www.hystericglamour.jp/store/','직영','메시 캡·액세서리; 층수 공식 재대조'],
['H03','신주쿠','HYSTERIC GLAMOUR Lumine Est Shinjuku','新宿区新宿3-38-1 ルミネエスト新宿 B2F','평일11:00–21:00/주말10:30–21:00','https://www.hystericglamour.jp/store/','직영','시부야 지점 품절 때 백업'],
['H04','긴자·도쿄역권','HYSTERIC GLAMOUR Marronniergate Ginza1','中央区銀座2-2-14 マロニエゲート銀座1 2F','11:00–21:00','https://www.hystericglamour.jp/store/','직영','긴자 동선에서 상품 여부 확인'],
['M01','시부야·하라주쿠','HUMAN MADE TOKYO','渋谷区神宮前6-25-10','평일11:00–19:00/주말11:00–20:00','https://www.humanmade.jp/en/dealers.html','직영','2026년 개점한 플래그십; 공식 주소 재대조'],
['M02','시부야','HUMAN MADE SHIBUYA PARCO PART1/2','渋谷区宇田川町15-1 渋谷PARCO 1F','11:00–21:00','https://www.humanmade.jp/en/dealers.html','직영','지난 시즌 상품 재고 미확인'],
['M03','하라주쿠','HUMAN MADE HARAJUKU','渋谷区神宮前1-11-6','11:00–20:00','https://www.humanmade.jp/en/dealers.html','직영','하라주쿠 주변 동선'],
['M04','아오야마·가이엔마에','HUMAN MADE OFFLINE STORE','渋谷区神宮前2-6-6','11:00–19:00','https://www.humanmade.jp/en/dealers.html','직영','가이엔마에 방면; 공식 주소 재대조'],
['B01','신주쿠','BEAMS JAPAN Shinjuku','新宿区新宿3-32-6 B1F–5F','11:00–20:00','https://www.beams.co.jp/shop/j/','직영','하이타이드·키링·시계는 실제 취급 문의'],
['B02','시부야','BEAMS JAPAN Shibuya','渋谷区道玄坂1-2-3 東急プラザ渋谷2F','11:00–20:00','https://www.beams.co.jp/shop/js/','직영','도큐플라자 2층 공식 재대조'],
['B03','신주쿠','BEAMS Shinjuku 일반 매장','新宿区新宿3-38-1 ルミネエスト新宿 B2F','평일11:00–21:00/주말10:30–21:00','https://www.beams.co.jp/shop/leb/','일반매장','BEAMS JAPAN 전용 품목 재고 보장 안 됨'],
['O01','시부야','Onitsuka Tiger SHIBUYA2','渋谷区神南1-21-3 渋谷MODI 1–2F','11:00–20:00','https://www.onitsukatiger.com/jp/ja-jp/brand/yellow-collection/store','직영','멕시코66 품번·사이즈 확인'],
['O02','하라주쿠·오모테산도','Onitsuka Tiger OMOTESANDO','渋谷区神宮前4-24-14','11:00–20:00','https://www.onitsukatiger.com/jp/ja-jp/brand/yellow-collection/store','직영','컬러 및 모델 차이 확인'],
['O03','신주쿠','Onitsuka Tiger Isetan Shinjuku','新宿区新宿3-14-1 伊勢丹新宿本館2F','10:00–20:00','https://www.onitsukatiger.com/jp/ja-jp/brand/yellow-collection/store','백화점 직영','백화점 취급 모델 제한'],
['T01','하라주쿠','KIDDY LAND Harajuku','渋谷区神宮前6-1-9','11:00–20:00','https://www.kiddyland.co.jp/shoplist/harajuku/','완구 취급','몬치치 복각·한정 상품 문의'],
['T02','신주쿠','KIDDY LAND Shinjuku','新宿区新宿3-23-17 オカダヤビル1–4F','10:30–20:30','https://www.kiddyland.co.jp/shoplist/shinjuku/','완구 취급','특정 몬치치 늑대 재고 미확인'],
['T03','긴자·도쿄역권','Hakuhinkan TOY PARK Ginza','中央区銀座8-8-11','11:00–20:00','https://www.monchhichi.co.jp/shoplist/','완구 취급','몬치치 품번 및 재고 별도 문의'],
['R01','시부야','RAGTAG Shibuya','渋谷区神南1-17-7','11:00–20:00','https://www.ragtag.jp/real-store/0000000003','중고','일본어 공식 점포 주소 1-17-7 재대조; 영어 글로벌 페이지의 7-7 오기와 구별'],
['R02','하라주쿠','RAGTAG Harajuku','渋谷区神宮前5-17-9 ヒューリック神宮前1–2F','11:00–20:00','https://www.ragtag.jp/real-store/0000000001','중고','디자이너·액세서리 중고; 정가 매장 아님'],
['R03','신주쿠','RAGTAG Shinjuku','新宿区新宿3-32-10 T&Tビル4F','11:00–20:00','https://www.ragtag.jp/real-store/0000000007','중고','일본어 공식 점포 주소 3-32-10 재대조; 영어 글로벌 페이지의 4-32-10 오기와 구별'],
['R04','도쿄역·니혼바시','RAGTAG Nihonbashi Takashimaya','中央区日本橋2-5-1 日本橋高島屋S.C.新館5F','10:30–20:00','https://www.ragtag.jp/real-store/0000000040','중고','니혼바시 다카시마야 신관 5층'],
['R05','나카메구로','KINDAL Nakameguro','目黒区青葉台1-16-12 中目黒サクレピエス1F','12:00–20:00','https://www.kind.co.jp/nakameguro/','중고','2026.9~11.12 외벽 공사 중 영업 계속 안내'],
['R06','나카메구로','BRING Nakameguro','目黒区上目黒1-17-3','12:00–20:00','https://kaitorisatei.info/bring-nakameguro','중고','주소·영업시간 공식 재대조; 판매/매입 전문'],
['R07','코엔지','KINDAL Koenji','杉並区高円寺南4-24-2 春口ビル3F','12:00–20:00, 수 휴무','https://www.kind.co.jp/koenji/','중고','수요일 정기휴무 공식 재대조; 11/11 방문 주의'],
['R08','코엔지','2nd STREET Koenji No.2','杉並区高円寺南4-25-5 パル高円寺ビル','11:00–21:00','https://www.koenji-pal.jp/shop/092','중고','2호점 주소 상점가 안내 재대조'],
['R09','코엔지','2nd STREET Koenji','杉並区高円寺南4-6-7','11:00–21:00','https://www.2ndstreet.jp/','중고','본점과 2호점 혼동 주의; 세부 점포 페이지/주소 재확인 필요'],
['R10','나카노','MANDARAKE Nakano Broadway','中野区中野5-52-15 中野ブロードウェイ','관별 상이 (보통 12:00–20:00)','https://www.mandarake.co.jp/','수집품 중고','브로드웨이 건물 위치만 가리킴; 개별 매장 층·관 확인 필요'],
['R11','도쿄역','Tokyo Character Street','千代田区丸の内1-9-1 東京駅一番街B1F','매장별 상이','https://www.tokyoeki-1bangai.co.jp/tokyocharacterstreet/','캐릭터 상가','개별 매장 아닌 지하 상점가; 품번 취급 미확인']
];
const confirmed=new Set(['K04','H01','H02','H03','M01','M02','M03','M04','B01','B02','R01','R02','R03','R04','R05','R06','R07','R08']);
const warn=new Set(['R09','R10','R11']);
const stores=rows.map(([id,area,name,address,hours,url,kind,note])=>({
 id:'RS_'+id,sourceId:id,area,name,address:'東京都'+address,hours,url,kind,note,
 verification:warn.has(id)?'facility-or-address-needs-review':confirmed.has(id)?'official-address-crosschecked-2026-11-02':'source-address-from-archive-unchecked',
 coordinateStatus:'geocoding-pending',lat:null,lon:null
}));
const productRows=[
[1,'캐피탈 씬 캔버스 럼버 팬츠 키나리','EK-1420/EK-1420LP/EK-1185',23980,325000,656,'조건부 매입','사이즈·연식/품번 구별','https://kream.co.kr/products/156018'],
[2,'히스테릭 로고 스터드 3단 지갑 블랙','01243QG11',22000,263000,782,'조건부 매입','2024년 발매 동일 품번 재고가 있어야 함','https://kream.co.kr/products/367493'],
[3,'히스테릭 기타 걸 메시 캡 블랙','02233QH05',8800,132000,998,'조건부 매입','과거 가격 하락·구형 품번 품절 위험','https://kream.co.kr/products/171747'],
[4,'히스테릭 스터드 프래그먼트 케이스','01243QG13',15400,182000,327,'조건부 매입','공개 최근 최소 2건; 188/188/188/182/189천원 기록','https://kream.co.kr/products/367491'],
[5,'휴먼메이드 하트 키링 레드 구형','구형 2026과 별개',2200,65000,5733,'특가 발견 시','과거 발매가로 현재 매입 가정 금지','https://kream.co.kr/products/117979'],
[6,'캐피탈 패키쉬 마리아 반다나 핑크','K2405BA528/EK-1779',3080,52000,274,'소량 시험','최근 5건 중앙값 5.2만원','https://kream.co.kr/products/303103'],
[7,'휴먼메이드 하트 키링 레드 2026','HM30GD124',3300,57000,228,'소량 시험','구형과 혼동 금지','https://kream.co.kr/products/785305'],
[8,'캐피탈 처칠 가든 반다나 블랙','K2508BA506',2090,42000,69,'매입 신중','당시 공개 구매 입찰 없음','https://kream.co.kr/products/674347'],
[9,'빔즈 산푸루 미타라시 당고 키링','품번 미확인',1320,32000,253,'소량 시험','최근 공개 거래 적음','https://kream.co.kr/products/280775'],
[10,'히스테릭 HYS 위스키 캡 블랙','02233QH09',11000,122000,432,'매입 신중','2023 품번·마진 제한','https://kream.co.kr/products/185082'],
[11,'몬치치 베비치치 놀이회 늑대','품번 미확인',3300,45000,47,'매입 신중','과거/복각 모델과 3,520엔 정가 여부 비교','https://kream.co.kr/products/683004'],
[12,'히스테릭 온 스컬 픽 목걸이','01212QA03/01251QA04',6380,70000,2341,'매입 신중','두 품번 구별·수익 미미','https://kream.co.kr/products/136204'],
[13,'오니츠카 멕시코66 블랙 화이트','색상/품번 미확인',16500,163000,33000,'매입 보류','사이즈·배송 부피·직구 경쟁','https://kream.co.kr/search?keyword=오니츠카타이거'],
[14,'히스테릭 유 페이 목걸이','02222QA02/02251QA04',3300,40000,2281,'매입 보류','수익 거의 제로·품번 구별','https://kream.co.kr/products/136205'],
[15,'빔즈 하이타이드 카드케이스 블랙','56-76-0196-834',1430,20000,7130,'매입 보류','누적 스냅샷 +332/약 6주; 30일 거래량 아님','https://kream.co.kr/products/300069'],
[16,'빔즈 하이타이드 카드케이스 그린','56-76-0196-834',1430,20000,2369,'매입 보류','누적 스냅샷 +98/약 6주; 30일 거래량 아님','https://www.kream.co.kr/brands/beams?tab=53'],
[17,'빔즈 하이타이드 카드케이스 네이비','56-76-0196-834',1430,20000,922,'매입 보류','누적 스냅샷 +41/약 6주; 30일 거래량 아님','https://www.kream.co.kr/brands/beams?tab=53'],
[18,'빔즈 산푸루 프라이드에그 키링','품번 미확인',1210,20000,140,'매입 보류','3.3만원 호가와 2만원 체결 구분','https://kream.co.kr/products/274146'],
[19,'빔즈 한자 숫자 시계 블랙','56-48-0015-784',16500,139000,3290,'매입 제외','옛 13,200엔 대신 16,500엔 공식 가격 반영 시 손실','https://kream.co.kr/products/371879']
];
const products=productRows.map(([id,title,model,yen,sell,trades,action,risk,kream])=>({id,title,model,yen,sell,trades,action,risk,kream,bid:null,recent30d:null}));
const links={
 K03:[1,6],K01:[1,6,8],K02:[1,6,8],K05:[1,8],K04:[1,6,8],R05:[1,4,6,8,12],
 H01:[2,4,12,14],H03:[2,3,4,10,12,14],H04:[2,4],R02:[2,3,10],R03:[2,4,12,14],
 H02:[3,10,12,14],R01:[3,5,10],R08:[3],R09:[3],M01:[5,7],M02:[5,7],M03:[5,7],M04:[5,7],
 B01:[9,15,16,17,18,19],B02:[9,15,16,17,18,19],B03:[9,15,16,17],R07:[10],
 T01:[11],T02:[11],T03:[11],R10:[11],R11:[11],O01:[13],O02:[13],O03:[13]
};
const matchCount=Object.values(links).reduce((n,a)=>n+a.length,0);
root.TOKYO_RESALE=Object.freeze({date:'2026-11-02',stores,products,links,matchCount,
 notes:'가격·누적 거래·매장 취급 후보는 2026-10~11 조사 스냅샷입니다. 현장 재고·최고 매수입찰·실거래 수익은 확인되지 않았습니다.'});
})(window);
