/* Koenji Komeda Cafe Morning & Work. Sources checked 2026-11-08. */
(function(){
"use strict";
const ID="KOMEDA_KOENJI_NORTH_2026";
const D=[["コメダブレンド","핫 코메다 블렌드 · 체인 ¥460–700"],["アイスコーヒー","아이스커피 · 체인 ¥460–700"],["カフェオーレ","카페오레 · 체인 ¥500–740"],["ミルクコーヒー","밀크커피 · 체인 ¥500–740"],["コメダブレンド たっぷりサイズ","큰 블렌드 · 체인 ¥560–800"],["アイスコーヒー たっぷりサイズ","큰 아이스커피 · 체인 ¥560–800"]];
const B=[["山食パン（トースト）","두툼한 토스트"],["ローブパン","부드러운 둥근 빵"]];
const T=[["コメダ特製おぐらあん","오구라앙 · 달콤한 팥앙금"],["手作りたまごペースト","타마고 페이스트 · 부드러운 달걀 샐러드"],["定番ゆで玉子","유데타마고 · 삶은 달걀"]];
const S=[["バターまたはマーガリン","버터 또는 마가린"],["いちごジャム","딸기잼"],["ぬる豆乳","바르는 두유"]];
const P=[["팥버터 토스트","첨부 스레드에서 반복 추천되는 팥앙금 토스트. 고소함과 단맛.",[0,0,0,0]],["달걀 페이스트 둥근 빵","폭신한 빵에 달걀 페이스트를 끼워 먹는 샌드 스타일.",[2,1,1,0]],["클래식 토스트·삶은 달걀","두툼한 식빵과 삶은 달걀, 상큼한 딸기잼.",[1,0,2,1]]];
const opts=a=>a.map((x,i)=>"<option value='"+i+"'>"+x[1]+"</option>").join("");
function guideHtml(id){
if(id!==ID)return "";
return [
"<section class='detail-panel komeda-guide' aria-label='코메다 모닝 현장 주문 가이드'>",
"<div class='detail-section-label'>KOENJI MORNING / ORDER IN JAPANESE</div><h2>아침 작업 · 모닝 주문 가이드</h2>",
"<p class='km-em'><strong>영업 매일 07:00–23:00</strong> / 모닝 07:00–11:00 / 동행 작업 추천 08:00–10:30 (JST)</p>",
"<div class='km-facts'><p><strong>모닝 무료 혜택</strong> 11시 전 음료를 주문하면 빵 하나 + 곁들임 하나 + 스프레드 하나가 추가금 없이 제공됩니다. 음료는 유료입니다.</p>",
"<p><strong>전원·작업</strong> 공식 지점 페이지에 콘센트·Komeda_Wi-Fi가 있습니다. 일부 좌석에 콘센트가 있으며 충전 가능 좌석과 사용 제한은 현장에서 확인해야 합니다.</p>",
"<p><strong>장소</strong> 코엔지역 북쪽 출구 도보 약 3분 · 東京都杉並区高円寺北2-3-4 高円寺ビル1F · 03-5356-8740 · 전석 금연.</p></div>",
"<h3>후기와 메뉴를 종합한 추천 3가지</h3><p class='km-muted'>첨부된 스레드의 팥 토스트·달걀 페이스트 후기를 바탕으로 구성한 취향별 조합이며 공식 인기순위는 아닙니다.</p>",
"<div class='km-presets'>",P.map((p,i)=>"<article><strong>"+p[0]+"</strong><p>"+p[1]+"</p><button type='button' data-km-preset='"+i+"'>이 조합 선택</button></article>").join(""),"</div>",
"<h3>직접 주문 조합 고르기</h3><p class='km-muted'>음료, 빵, 곁들임, 스프레드를 선택하면 일본어 주문문이 완성됩니다.</p>",
"<div class='km-selects'><label>① 음료<select data-km-select='0'>"+opts(D)+"</select></label><label>② 빵<select data-km-select='1'>"+opts(B)+"</select></label><label>③ 곁들임<select data-km-select='2'>"+opts(T)+"</select></label><label>④ 바르는 것<select data-km-select='3'>"+opts(S)+"</select></label></div>",
"<label class='km-sugar'><input type='checkbox' data-km-sugar checked> 아이스커피를 무가당(甘み抜き)으로 요청</label>",
"<div class='km-order'><strong>직원에게 보여줄 일본어 주문</strong><p lang='ja' data-km-jp></p><button type='button' data-km-copy>주문문 복사</button><small data-km-status aria-live='polite' role='status'></small></div>",
"<details class='km-extra'><summary>가격·메뉴 차이·전원·주의사항 보기</summary>",
"<p><strong>빵:</strong> 山食パン은 두툼하게 구운 식빵, ローブパン은 작고 부드러운 둥근 빵. <strong>곁들임:</strong> 단팥 앙금, 달걀 페이스트(마요네즈풍), 삶은 달걀 가운데 한 가지. <strong>스프레드:</strong> 버터/마가린, 딸기잼, 바르는 두유 가운데 한 가지.</p>",
"<p><strong>음료 가격:</strong> 블렌드·아이스커피 ¥460–700, 카페오레·밀크커피 ¥500–740, 큰 커피 ¥560–800. 이 금액은 체인 공식 전국 가격 범위이고 고엔지점 실제 가격은 확인되지 않았습니다.</p>",
"<p><strong>아침 사이드(유료):</strong> 코울슬로 ¥200–260, 꿀 요거트 ¥170–230, 미니 샐러드 ¥270–300(공식 범위, 지점 취급·가격 별도 확인). 커피 두 번째 잔은 무료 리필이 아닙니다.</p>",
"<p><strong>아이스커피 주의:</strong> 코메다 아이스커피는 기본적으로 단맛이 있어 무가당이면 甘み抜き로 요청해야 합니다. 알레르기 성분은 개별 공식 메뉴를 확인하세요.</p>",
"<p><strong>전원·노트북 일본어:</strong> <span lang='ja'>コンセントが使える席はありますか？ パソコン作業をしても大丈夫ですか？</span> (콘센트가 있는 좌석과 노트북 작업 가능 여부를 물어보는 문장.) 공식 사이트에는 자리별 콘센트 위치와 장시간 허용 규정은 나와 있지 않습니다.</p></details>",
"<p class='km-links'><a href='https://www.komeda.co.jp/shop/detail.html?id=1094' target='_blank' rel='noopener noreferrer'>매장 공식</a> · <a href='https://www.komeda.co.jp/menu/morning_komeda.html' target='_blank' rel='noopener noreferrer'>모닝 공식</a> · <a href='https://www.komeda.co.jp/menu/' target='_blank' rel='noopener noreferrer'>메뉴 확인</a> · <a href='https://www.komeda.co.jp/service/convenient.html' target='_blank' rel='noopener noreferrer'>Wi-Fi·전원</a></p>",
"<p class='km-muted'>2026-11-08 조사. 실제 대기/임시휴무와 콘센트 좌석 사용 가능 여부 미확인. 11/15 오전 출국 일정에는 방문이 어려울 수 있습니다.</p>",
"</section>"
].join("");
}
function bindGuide(root){
const panel=root.querySelector(".komeda-guide");if(!panel)return;
const fields=[...panel.querySelectorAll("[data-km-select]")], sugar=panel.querySelector("[data-km-sugar]"),display=panel.querySelector("[data-km-jp]"),status=panel.querySelector("[data-km-status]");
function render(){
const v=fields.map(x=>Number(x.value)),d=D[v[0]][0],ice=d.includes("アイスコーヒー");
sugar.disabled=!ice;
display.textContent="「"+d+"」をお願いします。モーニングは「"+B[v[1]][0]+"」、付け合わせは「"+T[v[2]][0]+"」、塗るものは「"+S[v[3]][0]+"」でお願いします。"+(ice&&sugar.checked?"アイスコーヒーは甘み抜きでお願いします。":"");status.textContent="";
}
fields.forEach(x=>x.addEventListener("change",render));sugar.addEventListener("change",render);
panel.querySelectorAll("[data-km-preset]").forEach(b=>b.addEventListener("click",()=>{P[Number(b.dataset.kmPreset)][2].forEach((v,i)=>fields[i].value=String(v));render();panel.querySelector(".km-order").scrollIntoView({block:"nearest",behavior:"smooth"});}));
panel.querySelector("[data-km-copy]").addEventListener("click",()=>{
if(!navigator.clipboard?.writeText){status.textContent="복사 미지원. 위 문장을 보여주세요.";return;}
navigator.clipboard.writeText(display.textContent).then(()=>status.textContent="주문문 복사 완료").catch(()=>status.textContent="복사 실패. 위 문장을 보여주세요.");
});render();
}
window.TFGKomedaMorning2026={
place:{id:ID,name:"코메다커피 고엔지 북쪽 출구점 (コメダ珈琲店 高円寺北口店)",description:"코엔지역 도보 약 3분. 아침 동행 작업 08:00–10:30 추천. 매일 07:00–23:00 영업, 모닝 11시까지, 콘센트 및 Wi-Fi 제공. 상세에 3종 추천과 일본어 주문 생성기.",category:"킷사텐",area:"코엔지",address:"東京都杉並区高円寺北2-3-4 高円寺ビル1F",hours:"매일 07:00–23:00 / 모닝 07:00–11:00",url:"https://www.komeda.co.jp/shop/detail.html?id=1094",googleMapsUrl:"https://www.google.com/maps/search/?api=1&query=%E3%82%B3%E3%83%A1%E3%83%80%E7%8F%88%E7%90%B2%E5%BA%97%20%E9%AB%98%E5%86%86%E5%AF%BA%E5%8C%97%E5%8F%A3%E5%BA%97",lat:null,lon:null,coordinate_status:"official_address_known; exact_entrance_coordinates_unverified",tags:["아침 작업","07시 오픈","11시 모닝","콘센트 있음","무료 Wi-Fi","팥앙금"],tripNote:"아침 추천 08:00–10:30(JST). 11시 전 음료 주문. 충전 좌석 및 장시간 사용 허용 여부 확인. 11/15 아침 귀국 동선과 충돌 가능.",origin:"official_komeda_and_shared_threads_2026-11-08"},
storeHours:{weekday:[7,23],weekend:[7,23],status:"published",source:"https://www.komeda.co.jp/shop/detail.html?id=1094",reason:"공식 점포 시간 07:00–23:00, 모닝 07:00–11:00. 추천 모임 시각 08:00–10:30은 예약/좌석 보장이 아닌 일정 제안."},
guideHtml,bindGuide,researchedAt:"2026-11-08"
};
})();