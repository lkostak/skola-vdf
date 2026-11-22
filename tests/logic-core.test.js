/* Maturita 03. Testujeme ideální modely i propojení studentské stránky.
 * Spuštění: node --test tests/logic-core.test.js */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/logic-core.js"),"utf8"),context);
const m=context.window.SkolaLogicModel;
test("Sedm logických funkcí má správnou tabulku ve všech kombinacích",()=>{
 const expected={AND:"0001",OR:"0111",NAND:"1110",NOR:"1000",XOR:"0110",XNOR:"1001"};
 for(const [type,bits] of Object.entries(expected))assert.equal(m.table(type).map(r=>r.y).join(""),bits,type);
 assert.equal(m.table("NOT").map(r=>r.y).join(""),"10");
});
test("Dvojvstupové XOR a XNOR: shoda versus odlišnost",()=>{
 assert.equal(m.gate("XOR",1,1),0);assert.equal(m.gate("XNOR",1,1),1);
 assert.equal(m.gate("OR",1,1),1);
});
test("Neplatné vstupy se nevydávají za nulu",()=>{
 assert.throws(()=>m.gate("AND",2,1),/0 nebo 1/);
 assert.throws(()=>m.gate("AND",0,3),/0 nebo 1/);
 assert.throws(()=>m.gate("INVALID",0,0),/Neznámá/);
});
test("De Morganovy zákony platí pro všechny dvojice vstupů",()=>{
 for(const a of [0,1])for(const b of [0,1]){
  const r=m.deMorgan(a,b);
  assert.equal(r.notAnd,r.orOfNegations);
  assert.equal(r.notOr,r.andOfNegations);
 }
});
test("Univerzální NAND i NOR realizují NOT, AND a OR pro všechny vstupy",()=>{
 for(const family of ["NAND","NOR"])for(const target of ["NOT","AND","OR"]){
  for(const a of [0,1])for(const b of [0,1]){
   assert.equal(m.throughUniversal(family,target,a,b),m.gate(target,a,b),family+" -> "+target+" "+a+b);
  }
 }
});
test("Tabulka tří proměnných je úplná a správně vyhodnocuje (A AND B) OR C",()=>{
 const t=m.table3("AB_OR_C");
 assert.equal(t.length,8);
 assert.equal(t.map(x=>x.y).join(""),"01010111");
 for(const row of t)assert.equal(row.y,(row.a&row.b)|row.c);
});
test("Kontaktní logika: série AND a paralela OR",()=>{
 for(const a of [0,1])for(const b of [0,1]){
  assert.equal(m.contact("series",a,b),m.gate("AND",a,b));
  assert.equal(m.contact("parallel",a,b),m.gate("OR",a,b));
 }
 assert.equal(m.activeLow(0),1);assert.equal(m.activeLow(1),0);
});
test("Jedna výuková stránka obsahuje 10 tematických a 10 ústních bloků",()=>{
 const root=path.join(__dirname,"../mechatronika/maturita/03-zakladni-logicke-funkce");
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 const js=fs.readFileSync(path.join(root,"app.js"),"utf8");
 assert.equal((html.match(/class="section chapter"/g)||[]).length,10);
 assert.equal((html.match(/class="topic topic-accordion"/g)||[]).length,10);
 for(const anchor of ["smysl","tabulky","hradla","iec","xor","boole","demorgan","univerzalni","plc","overeni"])assert.match(html,new RegExp('id="'+anchor+'"'));
 for(const g of ["NOT","AND","OR","NAND","NOR","XOR","XNOR"])assert.match(html,new RegExp('data-gate-card="'+g+'"'));
 for(const id of ["gateSelect","gateTableBody","gateY","dmBody","universalActual","universalExpected","contactMode","finalQuiz"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/assets\/js\/logic-core\.js/);
 assert.match(js,/SkolaLogicModel/);
});
