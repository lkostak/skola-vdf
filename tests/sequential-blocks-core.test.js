/* node --test tests/sequential-blocks-core.test.js */
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/sequential-blocks-core.js"),"utf8"),context);
const m=context.window.SkolaSequentialModel;
test("Čtyřbitový registr: posuvy a rotace správně rozlišují odcházející bit",()=>{
 for(const [mode,value] of [["SHL","0110"],["SHR","0101"],["ROL","0111"],["ROR","1101"]]){
   const r=m.registerStep(0b1011,mode,{width:4,serial:0});
   assert.equal(r.afterBits,value,mode);assert.equal(r.output,1,mode);
 }
 assert.equal(m.registerStep(0b1011,"LOAD",{width:4,load:0b0110}).afterBits,"0110");
 assert.equal(m.registerStep(0b1011,"HOLD",{width:4}).afterBits,"1011");
 assert.equal(m.registerStep(0b1011,"CLEAR",{width:4}).afterBits,"0000");
 assert.equal(m.registerStep(0b1011,"SHL",{width:4,serial:1}).afterBits,"0111");
});
test("SIPO 1,0,1,1 na Q0 dává 0001,0010,0101,1011",()=>{
 let state=0;const seq=[];
 for(const serial of [1,0,1,1]){state=m.registerStep(state,"SHL",{width:4,serial}).after;seq.push(m.bits(state,4));}
 assert.deepEqual(seq,["0001","0010","0101","1011"]);
});
test("Pro každou hodnotu 0–15 platí identita rotace ROL a ROR",()=>{
 for(let v=0;v<16;v++){
  const l=m.registerStep(v,"ROL",{width:4}).after;
  assert.equal(m.registerStep(l,"ROR",{width:4}).after,v);
  const r=m.registerStep(v,"ROR",{width:4}).after;
  assert.equal(m.registerStep(r,"ROL",{width:4}).after,v);
 }
});
test("Binární modulo 16 a dekadický modulo 10 skutečně přetékají",()=>{
 let x=m.counterStep(15,{modulus:16,direction:"up"});assert.equal(x.after,0);assert.equal(x.carry,true);
 x=m.counterStep(9,{modulus:10,direction:"up"});assert.equal(x.after,0);assert.equal(x.carry,true);
 x=m.counterStep(0,{modulus:5,direction:"down"});assert.equal(x.after,4);assert.equal(x.borrow,true);
 assert.equal(m.counterStep(4,{modulus:5,event:false}).after,4);
 assert.equal(m.counterStep(3,{modulus:5,load:2}).after,2);
 assert.equal(m.counterStep(3,{modulus:5,reset:true}).after,0);
});
test("Modulo 5 má tři bitové buňky a správný uzavřený cyklus",()=>{
 assert.equal(m.requiredBits(5),3);
 assert.equal(m.requiredBits(16),4);
 const seq=Array.from(m.counterSequence({modulus:5,steps:6}),x=>x.value);
 assert.deepEqual(seq,[0,1,2,3,4,0,1]);
 const down=Array.from(m.counterSequence({modulus:5,direction:"down",steps:5}),x=>x.value);
 assert.deepEqual(down,[0,4,3,2,1,0]);
});
test("Ripple model ukáže postupné stupně přechodu 0111→1000",()=>{
 const r=m.rippleTransition(7,4);
 assert.equal(r.stable,"1000");assert.deepEqual(Array.from(r.stages,x=>x.bits),["0111","0110","0100","0000","1000"]);
});
test("PLC CTU přičítá jen náběžné hrany, nikoli drženou jedničku",()=>{
 let state={cv:0,prevCU:0};
 state=m.ctuStep(state,{cu:1,preset:2});assert.equal(state.cv,1);assert.equal(state.counted,true);
 state=m.ctuStep(state,{cu:1,preset:2});assert.equal(state.cv,1);assert.equal(state.counted,false);
 state=m.ctuStep(state,{cu:0,preset:2});assert.equal(state.cv,1);
 state=m.ctuStep(state,{cu:1,preset:2});assert.equal(state.cv,2);assert.equal(state.q,1);
 state=m.ctuStep(state,{cu:0,reset:true,preset:2});assert.equal(state.cv,0);assert.equal(state.q,0);
});
test("Přísné kontroly rozsahů odmítnou neplatné stavy",()=>{
 assert.throws(()=>m.registerStep(16,"HOLD",{width:4}));
 assert.throws(()=>m.registerStep(0,"NOT_A_MODE",{width:4}));
 assert.throws(()=>m.counterStep(5,{modulus:5}));
 assert.throws(()=>m.counterStep(0,{modulus:5,load:5}));
 assert.throws(()=>m.ctuStep({cv:-1,prevCU:0},{cu:0,preset:5}));
});
test("Lekce obsahuje 10 kapitol, 10 ústních bodů a dostupná ovládání",()=>{
 const root=path.join(__dirname,"../mechatronika/maturita/06-registry-citace");
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 const script=fs.readFileSync(path.join(root,"app.js"),"utf8");
 assert.equal((html.match(/class="section chapter"/g)||[]).length,10);
 assert.equal((html.match(/class="topic topic-accordion"/g)||[]).length,10);
 for(const anchor of ["uvod","registry","posuvy","casovani","citace","synchronni","frekvence","rizeni","praxe","overeni"])assert.match(html,new RegExp('id="'+anchor+'"'));
 for(const id of ["registerBits","regSHL","regROR","sipoWave","counterNumber","counterMod","rippleRows","frequencyOutput","ctuValue","ctuPulse","finalQuiz"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/assets\/js\/sequential-blocks-core\.js/);
 assert.match(script,/SkolaSequentialModel/);
});