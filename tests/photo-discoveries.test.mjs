import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
const win={};vm.runInNewContext(read('photo-discoveries-2026-11-02.js'),{window:win},{timeout:1000});
const source=win.TFGPhotoUpdates,html=read('index.html');
test('photo records: 10 stores 1 art, no duplicate IDs, excluded future openings',()=>{assert.equal(source.places.length,10);assert.equal(source.arts.length,1);assert.equal(new Set([...source.places,...source.arts].map(x=>x.id)).size,11);assert.equal(source.excluded.length,2);assert.ok(source.excluded.every(e=>e.starts>'2026-11-15'));});
test('date gating and PARCO building association',()=>{const san=source.places.find(p=>p.id==='PHOTO_SANRIO_PARCO_2026');assert.equal(san.openDate,'2026-11-13');assert.equal(san.lat,35.6616);assert.deepEqual(Array.from(source.enrich,x=>x.id).sort(),['P01','P02']);assert.equal(source.arts[0].dateStart,'2026-11-13');assert.equal(source.arts[0].dateEnd,'2026-11-29');});
test('week closures, split-meal availability and coordinate honesty',()=>{assert.equal(source.hours.PHOTO_NIMANBIKI_ROPPONGI.sunday,null);assert.equal(source.hours.PHOTO_SARUTAHIKO_EASTGARDENS.friday,null);assert.equal(source.hours.PHOTO_SANRIO_PARCO_2026.wednesday,null);assert.equal(source.hours.PHOTO_BAKUMATSU_CURRY_SHOTO.friday.length,2);assert.equal(source.hours.PHOTO_KUROFUNETEI_UENO.wednesday.length,2);assert.equal(source.places.filter(x=>x.lat===null).length,8);});
test('HTML integrates separate data script and shared map/date/clock code',()=>{assert.match(html,/photo-discoveries-2026-11-02\\.js/);assert.match(html,/entryAvailableOnDay\\(x,state.day\\)/);assert.match(html,/s\\.slots\\?\\.length/);assert.match(html,/p\\.slots\\?\\.length/);assert.match(html,/if\(date==='all'&&v.closed\)/);assert.match(html,/Hibiya Art Park 2026/);assert.match(html,/sanrio house/);});

test('2026-11-12 Koenji kissaten: preserved schema, smoking filter, weekly closures and sources',()=>{
  const a=source.places.find(p=>p.id==='PHOTO_KOENJI_AROUMU_20261112');
  const p=source.places.find(p=>p.id==='PHOTO_KOENJI_POPPINS_20261112');
  assert.ok(a&&p);
  for(const cafe of [a,p]){assert.equal(cafe.category,'킷사텐');assert.match(cafe.area,/코엔지/);assert.match(cafe.address,/東京都杉並区高円寺南/);assert.equal(cafe.smoking.status,'all');assert.equal(cafe.smoking.label,'전석 흡연');assert.equal(cafe.smoking.currentSiteConfirmation,false);assert.ok(cafe.tags.includes('전석 흡연'));assert.equal(cafe.lat,null);assert.equal(cafe.lon,null);assert.match(cafe.url,/^https:\/\/tabelog\.com\//);}
  assert.equal(source.hours[a.id].thursday[0],7);
  assert.equal(source.hours[a.id].sunday,null);
  assert.equal(source.hours[p.id].thursday,null);
  assert.equal(source.hours[p.id].friday[0],9.5);
  assert.ok(a.closedDates.includes('2026-11-15'));
  assert.ok(p.closedDates.includes('2026-11-12'));
  assert.match(html,/Object.assign\(STORE_HOURS,window.TFGPhotoUpdates\?\.hours\|\|\{\}\)/);
  assert.match(html,/for\(const p of PHOTO_UPDATES.places\)/);
});

test('2026-11-12 Tonkatsu Matsunaga: user taste, shrimp-wrapped katsu, access, hours and source integrity',()=>{
  const id='PHOTO_KOENJI_TONKATSU_MATSUNAGA_20261112';
  const p=source.places.find(x=>x.id===id);
  assert.ok(p);
  assert.equal(p.category,'식사');
  assert.match(p.name,/松永/);
  assert.match(p.address,/高円寺南3-58-13/);
  assert.equal(p.lat,null);assert.equal(p.lon,null);
  assert.match(p.description,/ニンニクカツ/);
  assert.match(p.description,/ロースカツ/);
  assert.match(p.description,/巻エビカツ/);
  assert.match(p.tripNote,/실제 방문 날짜는 미확인/);
  assert.match(p.tripNote,/혼합 정식의 존재는 확인하지 못함/);
  assert.match(p.tripNote,/흡연 정보.*상충/);
  assert.ok(p.tags.includes('현금 결제'));
  const h=source.hours[id];
  for(const day of ['wednesday','thursday','friday','saturday','sunday']){
    assert.equal(h[day].length,2);
    assert.equal(h[day][0][0],12);
    assert.equal(h[day][1][0],17);
  }
  assert.equal(h.status,'listed');
  assert.match(h.source,/tabelog\.com\/tokyo\/A1319\/A131904\/13048636/);
});
