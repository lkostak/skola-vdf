/* Maturitní otázka 01: node --test tests/number-core.test.js */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const c={window:{}};vm.createContext(c);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/number-core.js"),"utf8"),c);
const m=c.window.SkolaNumberModel;

test("Jedna hodnota ve čtyřech soustavách",()=>{
 assert.equal(m.parseNumber("101101",2),45);
 assert.equal(m.parseNumber("55",8),45);
 assert.equal(m.parseNumber("45",10),45);
 assert.equal(m.parseNumber("2D",16),45);
 assert.equal(m.formatNumber(45,2),"101101");
 assert.equal(m.formatNumber(45,16),"2D");
});
test("Převody hex a delší binární hodnoty",()=>{
 assert.equal(m.parseNumber("3A7",16),935);
 assert.equal(m.parseNumber("11101100101",2),1893);
 assert.equal(m.formatNumber(1893,16),"765");
 assert.equal(m.formatNumber(173,2),"10101101");
 assert.equal(m.formatNumber(173,16),"AD");
 assert.equal(m.formatNumber(173,8),"255");
});
test("Neplatné číslice a čísla mimo 16bitový rozsah se odmítnou",()=>{
 assert.throws(()=>m.parseNumber("10201",2),/Číslice/);
 assert.throws(()=>m.parseNumber("G1",16),/Číslice/);
 assert.throws(()=>m.parseNumber("-5",10),/Číslice/);
 assert.throws(()=>m.parseNumber("65536",10),/rozsah/);
 assert.throws(()=>m.parseNumber("",10),/Zadej/);
});
test("Rozklad 3A7h podle vah",()=>{
 const ex=m.expansions(935,16);
 assert.equal(ex.map(x=>x.contribution).join(","),"768,160,7");
 assert.equal(ex.reduce((a,x)=>a+x.contribution,0),935);
});
test("Rozsahy bez znaménka pro 4, 8, 10, 12, 16 bitů",()=>{
 for(const [bits,count,max] of [[4,16,15],[8,256,255],[10,1024,1023],[12,4096,4095],[16,65536,65535]]){
  const r=m.unsignedRange(bits);
  assert.equal(r.count,count);assert.equal(r.max,max);assert.equal(r.min,0);
 }
});
test("Záporná čísla v dvojkovém doplňku mají správný rozsah",()=>{
 assert.equal(m.signedRange(8).min,-128);
 assert.equal(m.signedRange(8).max,127);
 assert.equal(m.encodeTwos(-26,8),230);
 assert.equal(m.asSigned(230,8),-26);
 assert.equal(m.encodeTwos(-128,8),128);
 assert.equal(m.asSigned(255,8),-1);
 assert.throws(()=>m.encodeTwos(128,8),/rozsah/);
});
test("Bitová maska a překlápění jednotlivých bitů",()=>{
 assert.equal(m.bitSet(0xB5,3),0xBD);
 assert.equal(m.maskTest(0xB5,5).active,true);
 assert.equal(m.maskTest(0xB5,3).active,false);
 assert.equal(m.maskTest(0xB5,5).mask,0x20);
});
test("Přenos při osmibitovém unsigned sčítání",()=>{
 const a=m.add8(250,10);
 assert.equal(a.sum,260);assert.equal(a.stored,4);assert.equal(a.carry,true);
 const b=m.add8(45,7);
 assert.equal(b.stored,52);assert.equal(b.carry,false);
});
test("Oba výklady obsahují požadované kapitoly, skripty a odkazy",()=>{
 const root=path.join(__dirname,"../mechatronika/maturita");
 const files=[
  "01-ciselne-soustavy/index.html",
  "01a-ciselne-soustavy/index.html",
  "01b-bity-rozsahy/index.html"
 ].map(p=>fs.readFileSync(path.join(root,p),"utf8"));
 assert.equal((files[0].match(/class="topic topic-accordion"/g)||[]).length,10);
 assert.equal((files[1].match(/class="section chapter"/g)||[]).length,6);
 assert.equal((files[2].match(/class="section chapter"/g)||[]).length,6);
 for(const x of files.slice(1)){
  assert.match(x,/assets\/js\/number-core\.js/);
  assert.match(x,/src="app\.js"/);
 }
 assert.match(files[0],/href="\.\.\/01a-ciselne-soustavy\//);
 assert.match(files[0],/href="\.\.\/01b-bity-rozsahy\//);
});
