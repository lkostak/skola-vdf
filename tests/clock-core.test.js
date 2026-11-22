/* Spuštění: node --test tests/clock-core.test.js
 * Modely 5B se testují samostatně bez externích závislostí. */
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/clock-core.js"),"utf8"),context);
const {createDLatch,createDFlipFlop,createJKFlipFlop,nextJK,evaluateDTrace}=context.window.SkolaClockModel;

test("D latch při EN=0 drží, i když se mění D", () => {
  const latch=createDLatch(0);
  assert.equal(latch.apply(1,0).q,0);
  assert.equal(latch.apply(0,0).q,0);
  assert.equal(latch.apply(1,0).q,0);
});

test("D latch je při EN=1 průhledný a při EN=0 si uchová hodnotu", () => {
  const latch=createDLatch(0);
  assert.equal(latch.apply(1,1).q,1);
  assert.equal(latch.apply(0,1).q,0);
  assert.equal(latch.apply(1,1).q,1);
  assert.equal(latch.apply(0,0).q,1);
});

test("Náběžný D: změna D bez hrany nezmění Q", () => {
  const d=createDFlipFlop({initialQ:0,edge:"rising"});
  d.setD(1);
  assert.equal(d.snapshot().q,0);
  const rise=d.transitionClock(1);
  assert.equal(rise.sampled,true);
  assert.equal(rise.q,1);
});

test("Náběžný D: změna D při CLK=1 a sestupná hrana Q nezmění", () => {
  const d=createDFlipFlop({initialQ:0,edge:"rising"});
  d.setD(1);d.transitionClock(1);
  d.setD(0);
  assert.equal(d.snapshot().q,1);
  const fall=d.transitionClock(0);
  assert.equal(fall.sampled,false);
  assert.equal(fall.q,1);
  assert.equal(d.transitionClock(1).q,0);
});

test("Sestupný D: náběžná hrana neaktivní, sestupná ukládá D", () => {
  const d=createDFlipFlop({initialQ:0,edge:"falling"});
  d.setD(1);
  assert.equal(d.transitionClock(1).q,0);
  assert.equal(d.transitionClock(0).q,1);
});

test("Při opakované stejné úrovni CLK nikdy nedochází k přepsání", () => {
  const d=createDFlipFlop({initialQ:0,edge:"rising"});
  d.setD(1);
  assert.equal(d.transitionClock(0).sampled,false);
  assert.equal(d.snapshot().q,0);
  d.transitionClock(1);
  d.setD(0);
  assert.equal(d.transitionClock(1).sampled,false);
  assert.equal(d.snapshot().q,1);
});

test("JK: čtyři kombinace dávají správný další stav Q z 0 i 1", () => {
  const combinations=[
    {j:0,k:0,from0:0,from1:1},
    {j:0,k:1,from0:0,from1:0},
    {j:1,k:0,from0:1,from1:1},
    {j:1,k:1,from0:1,from1:0}
  ];
  for(const {j,k,from0,from1} of combinations){
    assert.equal(nextJK(0,j,k),from0);
    assert.equal(nextJK(1,j,k),from1);
  }
});

test("JK: J=K=1 překlápí na každé náběžné hraně, ne na sestupné", () => {
  const jk=createJKFlipFlop({initialQ:0,edge:"rising"});
  jk.setInputs(1,1);
  assert.equal(jk.transitionClock(1).q,1);
  assert.equal(jk.transitionClock(0).q,1);
  assert.equal(jk.transitionClock(1).q,0);
  assert.equal(jk.transitionClock(0).q,0);
  assert.equal(jk.transitionClock(1).q,1);
});

test("JK: SET a RESET podle aktivních hran", () => {
  const jk=createJKFlipFlop({initialQ:0,edge:"rising"});
  jk.setInputs(1,0);
  assert.equal(jk.transitionClock(1).q,1);
  jk.setInputs(0,1);
  assert.equal(jk.transitionClock(0).q,1);
  assert.equal(jk.transitionClock(1).q,0);
});

test("JK: sestupně řízená varianta má opačnou aktivní hranu", () => {
  const jk=createJKFlipFlop({initialQ:0,edge:"falling"});
  jk.setInputs(1,0);
  assert.equal(jk.transitionClock(1).q,0);
  assert.equal(jk.transitionClock(0).q,1);
});

test("D trace: bez hrany se stav drží a aktivní hrana vzorkuje současné D", () => {
  const events=[
    {clock:0,d:0},{clock:0,d:1},{clock:1,d:1},{clock:1,d:0},
    {clock:0,d:0},{clock:0,d:0},{clock:1,d:0},{clock:1,d:1},
    {clock:0,d:1},{clock:1,d:1}
  ];
  const trace=evaluateDTrace(events,0,"rising");
  assert.equal(trace.length,events.length);
  assert.equal(trace.map(x=>x.q).join(""),"0011110001");
  assert.equal(trace.filter(x=>x.sampled).map(x=>x.step).join(","),"2,6,9");
});

test("D trace: výchozí Q=1 drží až do první aktivní hrany", () => {
  const trace=evaluateDTrace([{clock:0,d:0},{clock:0,d:1},{clock:1,d:0}],1,"rising");
  assert.equal(trace.map(x=>x.q).join(""),"110");
});
