/* Maturita 04: node --test tests/combinational-core.test.js
   Kontrolujeme celou množinu 256 možných 3vstupových pravdivostních funkcí. */
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/combinational-core.js"),"utf8"),ctx);
const m=ctx.window.SkolaCombModel;
test("Majority a úplná tabulka",()=>{
 assert.equal(m.truth3("majority").join(""),"00010111");
 const t=m.truth3("majority");
 assert.equal(m.canonicalSOP(t),"¬A·B·C + A·¬B·C + A·B·¬C + A·B·C");
 assert.equal(m.minimizeSOP(t).text,"A·B + A·C + B·C");
 assert.equal(m.minimizePOS(t).text,"(A + B) · (A + C) · (B + C)");
 assert.equal(m.majority(1,0,1),1);
 assert.equal(m.majority(1,0,0),0);
});
test("Gray pořadí a platné mapování 8 buněk",()=>{
 const grid=m.kmap([0,1,2,3,4,5,6,7].map(v=>v%2)); // ve skutečném UI přichází jen 0/1
 assert.deepEqual(Array.from(grid[0],x=>x.bc),["00","01","11","10"]);
 assert.deepEqual(Array.from(grid[0],x=>x.index),[0,1,3,2]);
 assert.deepEqual(Array.from(grid[1],x=>x.index),[4,5,7,6]);
 assert.deepEqual(Array.from(grid.flatMap(row=>row),x=>x.index).sort((a,b)=>a-b),[0,1,2,3,4,5,6,7]);
});
test("Každá z 256 úplně definovaných funkcí má pravdivý minimalizovaný SOP i POS",()=>{
 for(let mask=0;mask<256;mask++){
  const truth=Array.from({length:8},(_,i)=>(mask>>i)&1),sop=m.minimizeSOP(truth),pos=m.minimizePOS(truth);
  for(let i=0;i<8;i++){
   const [a,b,c]=m.bits3(i);
   assert.equal(m.evalSOPGroups(sop.groups,a,b,c),truth[i],"SOP mask "+mask+" row "+i);
   assert.equal(1-m.evalSOPGroups(pos.groups,a,b,c),truth[i],"POS mask "+mask+" row "+i);
  }
 }
});
test("Poloviční a úplná sčítačka, všechny vstupy",()=>{
 for(let a=0;a<=1;a++)for(let b=0;b<=1;b++)for(let cin=0;cin<=1;cin++){
   const h=m.halfAdder(a,b),f=m.fullAdder(a,b,cin);
   assert.equal(h.sum+2*h.carry,a+b);
   assert.equal(f.sum+2*f.carry,a+b+cin);
 }
 assert.deepEqual(JSON.parse(JSON.stringify(m.fullAdder(1,1,1))),{sum:1,carry:1});
});
test("Dekodér 2→4 aktivuje právě jeden výstup, nulový enable žádný",()=>{
 for(let a=0;a<=1;a++)for(let b=0;b<=1;b++){
   const y=Array.from(m.decoder2(a,b,1));
   assert.equal(y.reduce((x,z)=>x+z,0),1);
   assert.equal(y[a*2+b],1);
   assert.deepEqual(Array.from(m.decoder2(a,b,0)),[0,0,0,0]);
 }
});
test("Kodér 4→2 bez priority odmítá nula či více aktivních vstupů",()=>{
 for(let i=0;i<4;i++){const arr=[0,0,0,0];arr[i]=1;const r=m.encoder4(arr);assert.equal(r.valid,true);assert.equal(r.out.join(""),i.toString(2).padStart(2,"0"));}
 assert.equal(m.encoder4([0,0,0,0]).valid,false);
 assert.equal(m.encoder4([1,1,0,0]).valid,false);
});
test("MUX 4→1 a DEMUX 1→4 dodržují adresu S1,S0",()=>{
 const data=[1,0,1,0];
 for(let s1=0;s1<=1;s1++)for(let s0=0;s0<=1;s0++){
  const ix=s1*2+s0;
  assert.equal(m.mux4(data,s0,s1),data[ix]);
  const out=Array.from(m.demux1to4(1,s0,s1));
  assert.equal(out[ix],1);assert.equal(out.reduce((n,v)=>n+v,0),1);
  assert.deepEqual(Array.from(m.demux1to4(0,s0,s1)),[0,0,0,0]);
 }
});
test("Dvoubitový komparátor dává právě jeden pravdivý příznak",()=>{
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const r=m.comparator2(a,b);
  assert.equal(r.less+r.equal+r.greater,1);
  assert.equal(r.less,Number(a<b));
  assert.equal(r.equal,Number(a===b));
  assert.equal(r.greater,Number(a>b));
 }
});
test("Neplatné hodnoty se nezaměňují za validní kombinace",()=>{
 assert.throws(()=>m.majority(2,0,0));
 assert.throws(()=>m.mux4([0,1],0,0));
 assert.throws(()=>m.encoder4([0,1,2,0]));
 assert.throws(()=>m.minimizeSOP([0,0,0]));
 assert.throws(()=>m.comparator2(-1,1));
});
test("Výuková stránka má 10 rozbalovacích odpovědí a 10 detailních kapitol",()=>{
 const base=path.join(__dirname,"../mechatronika/maturita/04-kombinacni-logicke-obvody");
 const page=fs.readFileSync(path.join(base,"index.html"),"utf8");
 const app=fs.readFileSync(path.join(base,"app.js"),"utf8");
 assert.equal((page.match(/class="topic topic-accordion"/g)||[]).length,10);
 assert.equal((page.match(/class="section chapter"/g)||[]).length,10);
 for(const id of ["kmapa","designTruthRows","designKmapRows","canonicalSop","canonicalPos","minimalSop","minimalPos","adderTruth","decoderOut","encoderControls","muxDataControls","demuxOut","cmpLess","finalQuiz"])assert.match(page,new RegExp('id="'+id+'"'));
 assert.match(page,/assets\/js\/combinational-core\.js/);
 assert.match(app,/SkolaCombModel/);
});
