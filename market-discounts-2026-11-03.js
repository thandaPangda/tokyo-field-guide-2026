/* Market & seafood bargain options as of 2026-11-03; never infer a guaranteed discount from a visit anecdote. */
window.TFGMarketStops={
  "reviewedAt": "2026-11-03",
  "travelStart": "2026-11-11",
  "travelEnd": "2026-11-15",
  "places": [
    {
      "id": "MK_NAKAMURA_NAKANO",
      "name": "나카무라 수산 (ナカムラ水産)",
      "area": "나카노 · 브로드웨이 B1F",
      "address": "東京都中野区中野5-52-15 中野ブロードウェイ B1F",
      "description": "참치·회·포장초밥·해산물 덮밥. 19시 폐점 전 할인 방문 후기가 있어 나카노 원래 계획의 1순위.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:00–19:00 · 부정기 휴무",
      "url": "https://tokubai.co.jp/%E3%83%8A%E3%82%AB%E3%83%A0%E3%83%A9%E6%B0%B4%E7%94%A3/171135",
      "lat": 35.7095,
      "lon": 139.6653,
      "coordinate_status": "existing_P06_Broadway_building_approx_point_not_store_entrance",
      "tags": [
        "포장식사",
        "마트·수산점",
        "할인 후기"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "review",
        "time": "18:00 이후 사례",
        "summary": "18시 이후 할인된 초밥·회 구매 후기. 매일 같은 시각이나 할인율을 보장하지 않음.",
        "evidenceUrl": "https://tabelog.com/tokyo/A1319/A131902/13132199/dtlrvwlst/B467100395/?type=0",
        "observed": "후기 게시일 확인 불충분",
        "detail": "2026년 여행 당일 세일 품목/할인율 미확인.",
        "guaranteed": false
      },
      "shopHoursSource": "https://tokubai.co.jp/%E3%83%8A%E3%82%AB%E3%83%A0%E3%83%A9%E6%B0%B4%E7%94%A3/171135",
      "storeHourSchedule": {
        "weekday": [
          10,
          19
        ],
        "weekend": [
          10,
          19
        ],
        "status": "listed",
        "reason": "월별 부정기 휴무(2026/11/11–15 특정 일자 현재 미확인). 19시 폐점 전에 품절 가능.",
        "source": "https://tokubai.co.jp/%E3%83%8A%E3%82%AB%E3%83%A0%E3%83%A9%E6%B0%B4%E7%94%A3/171135"
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "18:00–18:30 우선 확인 권장. 19시 폐점, 매월 부정기 휴무 예정 공지의 해당 여행 날짜는 미확인."
    },
    {
      "id": "MK_KATSUTA_NAKANO",
      "name": "가쓰타 상점·Kitchen Katsuta (勝田商店)",
      "area": "나카노 · 브로드웨이 B1F",
      "address": "東京都中野区中野5-52-15 中野ブロードウェイ B1F",
      "description": "마구로·사시미 신선 생선점과 같은 운영자의 Kitchen Katsuta(초밥·해산물 덮밥·반찬). 같은 건물의 나카무라 수산 대안.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:30–19:30 · 수·일·공휴일 원칙적 휴무 · 품절 시 조기 마감",
      "url": "https://www.katsutashoten.com/",
      "lat": 35.7095,
      "lon": 139.6653,
      "coordinate_status": "existing_P06_Broadway_building_approx_point_not_store_entrance",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "정기적인 마감 세일 시간·할인율 공개 근거 미확인.",
        "evidenceUrl": "https://www.katsutashoten.com/",
        "observed": "2026-11-03",
        "detail": "할인보다 상품 자체와 나카무라 수산 대안 가치로 수록.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.katsutashoten.com/",
      "storeHourSchedule": {
        "wednesday": null,
        "thursday": [
          10.5,
          19.5
        ],
        "friday": [
          10.5,
          19.5
        ],
        "saturday": [
          10.5,
          19.5
        ],
        "sunday": null,
        "status": "published",
        "reason": "공식 점포 안내: 수·일·공휴일 원칙적 휴무, 품절 시 19:30 이전 조기 마감. 매장별 취급 품목 상이.",
        "source": "https://www.katsutashoten.com/"
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "11/11 수·11/15 일 휴무. 11/12 목–11/14 토 후보이나 품절 시 조기 마감. 18시 할인은 확인되지 않음.",
      "closedDates": [
        "2026-11-11",
        "2026-11-15"
      ]
    },
    {
      "id": "MK_UOKO_NAKANO",
      "name": "우오코 (魚耕) · 나카노 마루이",
      "area": "나카노 · 마루이 B1F",
      "address": "東京都中野区中野3-34-28 中野マルイ B1F",
      "description": "나카노역 남쪽 출구 수산·초밥 점포. 주중 요일별 10% 할인 공지를 확인, 브로드웨이 실패 시 대안.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:00–20:00 · 요일별 10% 행사 (2026-12-16까지 안내)",
      "url": "https://www.uoko.co.jp/shop/571nakano/index.html",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "공식 할인 안내"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "merchant",
        "time": "영업시간 중 수·목·금 요일 행사",
        "summary": "수(11/11) 초밥 10%, 목(11/12) 덮밥 10%, 금(11/13) 회 10%. 매장 공지의 정규 요일 특가이지 폐점 할인은 아님.",
        "evidenceUrl": "https://tokubai.co.jp/%E9%AD%9A%E8%80%95/266135/image_announcements",
        "observed": "2026-09-09~2026-12-16 행사",
        "detail": "토·일과 추가 마감 할인 개시 시각은 미확인.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.uoko.co.jp/shop/571nakano/index.html",
      "storeHourSchedule": {
        "weekday": [
          10,
          20
        ],
        "weekend": [
          10,
          20
        ],
        "status": "published",
        "reason": "2026-09-09~12-16 요일별 할인 게시: 수요일 니기리즈시 10%, 목요일 덮밥 10%, 금요일 사시미 10%. 매장 휴업 변동 가능.",
        "source": "https://www.uoko.co.jp/shop/571nakano/index.html"
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "브로드웨이 수산점과는 나카노역 반대쪽(남쪽 출구). 마감 할인 실패 때 20시까지 영업하며 수·목·금은 요일 특가."
    },
    {
      "id": "MK_UOKO_OGIKUBO",
      "name": "우오코 (魚耕) · 오기쿠보 타운세븐",
      "area": "오기쿠보 · 타운세븐 B1F",
      "address": "東京都杉並区上荻1-9-1 荻窪タウンセブン B1F",
      "description": "오기쿠보역 1분의 수산 전문점. 초밥·해산물 덮밥·반찬을 다루며 2026년 4월 19시 이후 반값 사례가 남아 있음.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:00–20:00 (공식) · 다른 후기 19:30 폐점 주장",
      "url": "https://www.uoko.co.jp/shop/011ogikubohonten/index.html",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "할인 후기"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "review",
        "time": "19:00 이후 사례",
        "summary": "2026년 4월 금요일 저녁 리뷰에서 19시 이후 대부분 상품 반값으로 판매한 사례. 대상은 반찬도 포함, 생선/초밥 전품목 보장 아님.",
        "evidenceUrl": "https://tabelog.com/tokyo/A1319/A131906/13236907/dtlrvwlst/",
        "observed": "2026-04 실제 방문 후기",
        "detail": "19:00~19:20 추천 탐색 시각일 뿐, 상시 할인 규정 아님.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.uoko.co.jp/shop/011ogikubohonten/index.html",
      "storeHourSchedule": {
        "weekday": [
          10,
          20
        ],
        "weekend": [
          10,
          20
        ],
        "status": "published",
        "source": "https://www.uoko.co.jp/shop/011ogikubohonten/index.html",
        "reason": "공식 영업은 20시까지; 2026년 4월 할인 후기는 19:30 폐점이라고 서술. 늦은 도착 위험 주의."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "나카노에서 JR 서쪽으로 이동할 때만 들르는 보조 후보. 19시 이후 반값 사례가 있지만 마감 시간 기록 상충으로 19시 무렵 방문 추천."
    },
    {
      "id": "MK_UORIKI_SHIBUYA",
      "name": "우오리키 (魚力) · 시부야 도큐 푸드쇼",
      "area": "시부야 · 마크시티 B1F",
      "address": "東京都渋谷区道玄坂1-12-1 渋谷マークシティ B1F",
      "description": "역 직결 신선 어패류·회·가공 수산식품. 도큐 푸드쇼 전체의 공식 신선식품 타임세일 안내가 있으나 우오리키 개별 할인은 보장되지 않음.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:00–21:00 · 신선식품 타임세일 공식 20시 이후 일반 안내",
      "url": "https://www.tokyu-dept.co.jp/shibuya_foodshow/shop/detail.html?brand_code=uoriki",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "official_floor",
        "time": "20:00 이후 (푸드쇼 전체)",
        "summary": "도큐 푸드쇼 FAQ의 신선식품·반찬 할인 일반 안내. 우오리키 특정 상품 할인 시간 보장은 아님.",
        "evidenceUrl": "https://www.tokyu-dept.co.jp/shibuya_foodshow/",
        "observed": "2026-11-03 공식 FAQ 확인",
        "detail": "카운터별 시작 시각·할인율·잔여 재고는 다름.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.tokyu-dept.co.jp/shibuya_foodshow/shop/detail.html?brand_code=uoriki",
      "storeHourSchedule": {
        "weekday": [
          10,
          21
        ],
        "weekend": [
          10,
          21
        ],
        "status": "published",
        "source": "https://www.tokyu-dept.co.jp/shibuya_foodshow/shop/detail.html?brand_code=uoriki",
        "reason": "도큐 푸드쇼 공식 FAQ의 신선식품 타임세일은 20시 이후(단계적); 우오리키 개별 할인은 확인되지 않음."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "시부야역·마크시티 동선에 있을 때 20시 이후 확인. 21시 폐점, 수산점 자체 할인 여부는 현장 확인."
    },
    {
      "id": "MK_FOODEDGE_SHIBUYA",
      "name": "도큐 푸드쇼 엣지 · 스크램블 스퀘어 B2",
      "area": "시부야 · 스크램블 스퀘어 B2F",
      "address": "東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア B2F",
      "description": "역 직결 도시락·반찬 중심 푸드홀. 수산전문점보다 포장 저녁식사 대안이며 20시 이후 타임세일 공식 FAQ.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:00–21:00 · B2 타임세일 20시 이후",
      "url": "https://www.tokyu-dept.co.jp/scsq/foodshow_edge/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "food_hall",
      "sale": {
        "level": "official_floor",
        "time": "20:00 이후 (B2 공통)",
        "summary": "공식 푸드쇼 엣지 FAQ: B2 20시 이후, 단계적 타임세일일 수 있음. 전 매장/전품목 보장 아님.",
        "evidenceUrl": "https://www.tokyu-dept.co.jp/scsq/foodshow_edge/",
        "observed": "2026-11-03 공식 FAQ 확인",
        "detail": "회·초밥 전문 할인보다는 도시락·델리 할인 목적.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.tokyu-dept.co.jp/scsq/foodshow_edge/",
      "storeHourSchedule": {
        "weekday": [
          10,
          21
        ],
        "weekend": [
          10,
          21
        ],
        "status": "published",
        "source": "https://www.tokyu-dept.co.jp/scsq/foodshow_edge/",
        "reason": "공식 FAQ: B2 20시 이후 단계별 타임세일 가능. 개별 도시락·반찬 점포의 할인은 그날 재고에 따라 다름."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "20시 이후 저녁 도시락 후보. 시부야 마크시티 푸드쇼와 서로 다른 건물·매장임."
    },
    {
      "id": "MK_YOSHIIKE_OKACHIMACHI",
      "name": "요시이케 (吉池) · 오카치마치 본점",
      "area": "우에노·야나카 · 오카치마치",
      "address": "東京都台東区上野3-27-12 御徒町吉池本店ビル 1F",
      "description": "오카치마치역 바로 앞 큰 수산점. 참치·생선·회·조개류. 2025년 평일 저녁 회 반값 구매 후기, 2026년 3월 게 반값 구매 사례.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "09:30–20:30 · 정기휴무 없음(공식 게시)",
      "url": "https://www.yoshiike-group.co.jp/group_profile.html",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "할인 후기"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "review",
        "time": null,
        "summary": "2025년 평일 저녁 사시미 반값 구매, 2026년 3월 게 반값 구매 사례. 정해진 할인 개시 시각은 확인되지 않음.",
        "evidenceUrl": "https://ameblo.jp/nekonyan190721/entry-12882778047.html",
        "observed": "2025-01-17 후기 + 2026-03-07 다른 품목 후기",
        "detail": "늦으면 진열/어종 품절. 특정 시간의 50%를 보장하지 않음.",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.yoshiike-group.co.jp/group_profile.html",
      "storeHourSchedule": {
        "weekday": [
          9.5,
          20.5
        ],
        "weekend": [
          9.5,
          20.5
        ],
        "status": "published",
        "source": "https://www.yoshiike-group.co.jp/group_profile.html",
        "reason": "공식 20:30 폐점. 신선식품 개별 코너는 조기 정리할 수 있음. 당일 임시 변경 미확인."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "우에노·오카치마치 방문 중 저녁 들를 만한 수산점. 20:30 폐점이나 19시 전후 품절 주의."
    },
    {
      "id": "MK_OK_GINZA",
      "name": "오케이 (オーケー) · 긴자점",
      "area": "긴자 · 유라쿠초",
      "address": "東京都中央区銀座3-2-1 マロニエゲート銀座2 B1F・B2F",
      "description": "B1 수산, B2 매장 제조 초밥·반찬. 마감세일보다 평소 저렴한 포장 식품과 회 구매 목적.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "08:30–21:30 · 정월 3일간 휴업(여행일 해당 없음)",
      "url": "https://ok-corporation.jp/shop/ginnza.html",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "수산·초밥 판매는 공식 확인. 마감 할인 시각·할인율은 확인되지 않음.",
        "evidenceUrl": "https://www.marronniergate.com/shop/index/324",
        "observed": "2026-11-03 공식 점포 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://ok-corporation.jp/shop/ginnza.html",
      "storeHourSchedule": {
        "weekday": [
          8.5,
          21.5
        ],
        "weekend": [
          8.5,
          21.5
        ],
        "status": "published",
        "source": "https://ok-corporation.jp/shop/ginnza.html",
        "reason": "공식 매장 08:30–21:30. 11/11–15 임시휴무 미확인. 정월 3일간 휴업은 해당 없음."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "긴자·유라쿠초 지나갈 때 사기 좋은 저가 슈퍼. 정기 세일 시각 자료가 없으므로 할인 계획 대신 일반 구매 후보."
    },
    {
      "id": "MK_NAKAJIMA_SHINJUKU",
      "name": "나카지마 수산 · 신주쿠 다카시마야",
      "area": "신주쿠 · 타카시마야 B1F",
      "address": "東京都渋谷区千駄ヶ谷5-24-2 新宿髙島屋 B1F",
      "description": "신주쿠역 남쪽 백화점 B1 식품관 수산·포장초밥 점포. 백화점 식품관 상품을 저녁에 살 수 있지만 정확한 마감 할인 증거는 미확인.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "10:30–19:30 · 백화점 기준",
      "url": "https://www.takashimaya.co.jp/shinjuku/businesshours/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "seafood_market",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "저녁 할인율 및 시작 시각 확인 자료 없음. 19:30 백화점 폐점 전 후보.",
        "evidenceUrl": "https://map.yahoo.co.jp/v3/place/0J8a1c-l_lU",
        "observed": "2026-11-03 매장 등록 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.takashimaya.co.jp/shinjuku/businesshours/",
      "storeHourSchedule": {
        "weekday": [
          10.5,
          19.5
        ],
        "weekend": [
          10.5,
          19.5
        ],
        "status": "published",
        "source": "https://www.takashimaya.co.jp/shinjuku/businesshours/",
        "reason": "백화점 공통 영업시간. 나카지마 수산 점포 자체 임시 변경 여부 확인 필요."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "신주쿠 남쪽 동선에서 19:30 이전에만 방문. 할인은 현장 확인."
    },
    {
      "id": "MK_LIFE_SHIBUYA_HIGASHI",
      "name": "라이프 · 시부야히가시점",
      "area": "시부야 · 동쪽",
      "address": "東京都渋谷区東1-26-22",
      "description": "시부야역 동쪽에서 늦게까지 영업하는 큰 식품 슈퍼. 회·초밥·반찬 재고가 있으면 늦은 식사 포장 후보.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "09:30–24:00 · 매일",
      "url": "https://store.lifecorp.jp/detail/east829/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "영업은 자정까지지만 회·초밥 할인 개시 시각은 미확인.",
        "evidenceUrl": "https://store.lifecorp.jp/detail/east829/",
        "observed": "2026-11-03 공식 점포 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://store.lifecorp.jp/detail/east829/",
      "storeHourSchedule": {
        "weekday": [
          9.5,
          24
        ],
        "weekend": [
          9.5,
          24
        ],
        "status": "published",
        "source": "https://store.lifecorp.jp/detail/east829/",
        "reason": "공식 09:30–00:00, 단 코너별 품절 가능. 마감 할인 시간 확인 불가."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "시부야 늦은 귀가 대안. 도겐자카에서 바로 옆은 아니므로 동선 고려."
    },
    {
      "id": "MK_TOKYU_STORE_KOENJI",
      "name": "도큐스토어 · 고엔지점",
      "area": "코엔지 · 역 앞",
      "address": "東京都杉並区高円寺南4-48-1",
      "description": "고엔지역 역 앞 식품 슈퍼. 반찬·회 등 포장 음식 구매. 01시 마감 등록정보와 자정 마감 전단 정보가 상충.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "07:00–다음 날 01:00 (등록정보) / 24:00 마감 자료도 있음",
      "url": "https://www.tokyu-store.co.jp/shop/detail.html?pdid=15",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "저녁 마감할인 정확한 시각·할인율 확인 불가.",
        "evidenceUrl": "https://www.tokyu-store.co.jp/shop/detail.html?pdid=15",
        "observed": "2026-11-03 정보 상충 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.tokyu-store.co.jp/shop/detail.html?pdid=15",
      "storeHourSchedule": {
        "weekday": [
          7,
          25
        ],
        "weekend": [
          7,
          25
        ],
        "status": "listed",
        "source": "https://tabelog.com/tokyo/A1319/A131904/13223664/",
        "reason": "2026-09 업데이트 등록정보는 07:00–익일01:00, 다른 전단은 07:00–24:00. 자정 이후 방문은 확인 필요."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "고엔지역 앞 늦은 귀가시 식사 구매. 24시 이후 영업 여부는 자료 상충."
    },
    {
      "id": "MK_SEIYU_KOENJI",
      "name": "세이유 (西友) · 고엔지점",
      "area": "코엔지 · 남쪽 출구",
      "address": "東京都杉並区高円寺南3-47-8",
      "description": "고엔지역 남쪽 출구 도보 약 4분의 24시간 슈퍼(B1·1F 식품). 심야 포장 식품 보조 후보.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "24시간 · 원칙 연중무휴 (일부 코너 제외)",
      "url": "https://www.seiyu.co.jp/shop/%E8%A5%BF%E5%8F%8B%E9%AB%98%E5%86%86%E5%AF%BA%E5%BA%97/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "24시간 운영이 회·초밥 상시 재고나 세일을 의미하지 않음. 세일 시각은 미확인.",
        "evidenceUrl": "https://www.seiyu.co.jp/shop/%E8%A5%BF%E5%8F%8B%E9%AB%98%E5%86%86%E5%AF%BA%E5%BA%97/",
        "observed": "2026-11-03 공식 공지 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.seiyu.co.jp/shop/%E8%A5%BF%E5%8F%8B%E9%AB%98%E5%86%86%E5%AF%BA%E5%BA%97/",
      "storeHourSchedule": {
        "weekday": [
          0,
          24
        ],
        "weekend": [
          0,
          24
        ],
        "status": "published",
        "source": "https://www.seiyu.co.jp/shop/%E8%A5%BF%E5%8F%8B%E9%AB%98%E5%86%86%E5%AF%BA%E5%BA%97/",
        "reason": "공식 24시간. 2026-11-09 23:00~11-10 04:00 임시 휴무 공지(여행일 이전). 일부 코너 시간 예외."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "늦은 밤 최후 대안. 공식 임시휴무 11/09–10은 여행 기간 밖."
    },
    {
      "id": "MK_OK_KOENJI",
      "name": "오케이 (オーケー) · 고엔지점",
      "area": "코엔지 · 남쪽 출구",
      "address": "東京都杉並区高円寺南4-28-3",
      "description": "고엔지역 인근 할인 슈퍼. 19:30 무렵 일부 반찬을 약 30% 할인해 샀다는 후기가 있지만 회·초밥 동일 할인 보장은 없음.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "08:30–21:30 · 매일(등록정보)",
      "url": "https://ok-corporation.jp/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "할인 후기"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "review",
        "time": "19:30 무렵 반찬 사례",
        "summary": "19:30경 반찬 30% 할인 구매 후기. 생선·회·초밥의 할인율은 확인되지 않음.",
        "evidenceUrl": "https://tabelog.com/tokyo/A1319/A131904/13204096/",
        "observed": "후기 실제 방문 날짜 미확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://ok-corporation.jp/",
      "storeHourSchedule": {
        "weekday": [
          8.5,
          21.5
        ],
        "weekend": [
          8.5,
          21.5
        ],
        "status": "listed",
        "source": "https://chirashi.kurashiru.com/stores/7b807e60-54c5-4f7d-ab92-0898614e65a7",
        "reason": "매장 등록 08:30–21:30. 후기는 시간·품목 한정 경험담."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "고엔지에서 저렴하게 반찬 구매할 때 활용. 19:30은 후기 사례일 뿐 고정 타임세일 아님."
    },
    {
      "id": "MK_PRECCE_ROPPONGI",
      "name": "프레세 프리미엄 · 도쿄 미드타운",
      "area": "롯폰기 · 도쿄 미드타운 B1F",
      "address": "東京都港区赤坂9-7-4 東京ミッドタウン ガレリアB1F",
      "description": "롯폰기 미드타운 고급 식품 슈퍼. 신선식품·도시락·반찬·치즈 등. 저가 마감세일보다는 늦은 식사 대안.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "08:00–23:00 (현재 점포 안내) / 과거 목록 07:00–24:00",
      "url": "https://www.tokyo-midtown.com/jp/restaurants/SOP0000136/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "정기 저녁 할인 시각 확인되지 않음. 고급 슈퍼라 일반 할인 마트와 성격 다름.",
        "evidenceUrl": "https://www.tokyo-midtown.com/jp/restaurants/SOP0000136/",
        "observed": "2026-11-03 공식 서로 다른 페이지 비교",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.tokyo-midtown.com/jp/restaurants/SOP0000136/",
      "storeHourSchedule": {
        "weekday": [
          8,
          23
        ],
        "weekend": [
          8,
          23
        ],
        "status": "published",
        "source": "https://www.tokyo-midtown.com/jp/restaurants/SOP0000136/",
        "reason": "현재 개별 매장 안내는 임시 08:00–23:00, 다른 조기/심야 목록에는 07:00–24:00. 23시 기준 보수적 안내."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "모리 미술관·롯폰기 동선에서 늦게 포장식사를 살 때. 마감 할인 기대보다는 편의성."
    },
    {
      "id": "MK_OZEKI_ASAKUSA",
      "name": "오오제키 (オオゼキ) · 아사쿠사 가미나리몬",
      "area": "아사쿠사 · 가미나리몬",
      "address": "東京都台東区雷門2-16-11 ザ・ゲートホテル雷門 by HULIC 1F",
      "description": "가미나리몬 가까운 슈퍼. 담당자가 시장에서 직접 구입한 식재료를 취급하는 수산 코너, 반찬 등.",
      "category": "먹거리",
      "placePurpose": "grocery",
      "hours": "09:30–21:00 · 정기휴무 없음(등록안내)",
      "url": "https://www.ozeki-net.co.jp/shop/tokyo/taito/asakusa/",
      "lat": null,
      "lon": null,
      "coordinate_status": "verified_address_no_exact_entrance_coordinates; GSI approximate block required",
      "tags": [
        "포장식사",
        "마트·수산점",
        "세일 시각 미확인"
      ],
      "marketType": "supermarket",
      "sale": {
        "level": "unknown",
        "time": null,
        "summary": "정확한 회·초밥 마감세일 시간 미확인. 월/목 포인트 행사 ≠ 현금 할인.",
        "evidenceUrl": "https://www.ozeki-net.co.jp/shop/tokyo/taito/asakusa/",
        "observed": "2026-11-03 공식 점포 확인",
        "detail": "",
        "guaranteed": false
      },
      "shopHoursSource": "https://www.ozeki-net.co.jp/shop/tokyo/taito/asakusa/",
      "storeHourSchedule": {
        "weekday": [
          9.5,
          21
        ],
        "weekend": [
          9.5,
          21
        ],
        "status": "published",
        "source": "https://www.ozeki-net.co.jp/shop/tokyo/taito/asakusa/",
        "reason": "공식 점포 09:30–21:00, 정기 휴무 없음에 대한 외부 등록 보충. 월·목 포인트 행사(여행 11/12 목 해당)와 폐점 할인을 혼동하지 말 것."
      },
      "origin": "market_scout_2026-11-03",
      "tripNote": "아사쿠사 관광 뒤 저녁 식사 포장용. 21시 마감, 20시 타임세일 확정 근거 없음."
    }
  ],
  "scope": "포장 생선·초밥 또는 반찬 판매 점포. 마감 할인은 방문 후기·공식 공지·미확인 구별. 2026/11/11–15 실재고 보장 없음."
};
