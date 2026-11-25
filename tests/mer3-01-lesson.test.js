"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.join(__dirname,"../mechatronika/vyuka/3-rocnik/01");
const page=fs.readFileSync(path.join(root,"index.html"),"utf8");
const script=fs.readFileSync(path.join(root,"lesson.js"),"utf8");
function data(){
  const win={location:{hash:""}};
  const doc={querySelectorAll(){return [];}};
  vm.runInNewContext(script,{window:win,document:doc},{timeout:1000});
  return win.MER3Lesson01Data;
}
test("All seven approved chapters appear in their original order",()=>{
  const labels=[
    "Co je mechatronika?",
    "Klasický stroj a mechatronický systém",
    "Z čeho se mechatronický systém skládá?",
    "Jak jednotlivé části spolupracují?",
    "Ovládání a regulace",
    "Proč zavádíme automatizaci?",
    "Rozpoznání mechatronického systému v praxi"
  ];
  const summary=[...page.matchAll(/<summary><span class="tn">\d+<\/span><span class="topic-name">(.*?)<\/span>/g)].map(m=>m[1]);
  assert.deepEqual(summary,labels);
  assert.equal((page.match(/class="topic topic-accordion"/g)||[]).length,7);
});
test("Uses shared maturita visual identity and keeps navigation to next topic",()=>{
  assert.match(page,/\.\.\/\.\.\/\.\.\/\.\.\/assets\/css\/site\.css/);
  assert.match(page,/\.\.\/\.\.\/\.\.\/maturita\/05-sekvencni-logika\/outline\.css/);
  assert.match(page,/href="\.\.\/02\/"/);
  assert.match(page,/href="\.\.\/"/);
});
test("Activity models are consistent, complete and keep control distinct from regulation",()=>{
  const d=data();
  assert.deepEqual(Array.from(Object.keys(d.devices)),["doors","heating","washer"]);
  for(const device of Object.values(d.devices))for(const field of ["sensor","control","actuator","energy"])assert.ok(device[field].length>15);
  assert.equal(d.sequence.length,5);
  assert.deepEqual(Array.from(d.controlCases.map(x=>x.answer)),["manual","automatic","regulation"]);
  assert.equal(d.quiz.length,4);
  for(const item of d.quiz){assert.ok(Number.isInteger(item.correct)&&item.correct>=0&&item.correct<=2);assert.ok(item.explanation.length>20);}
});
test("Every interactive control exists exactly once and can receive feedback",()=>{
  for(const id of ["device-sensor","device-control","device-actuator","device-energy","sequence-next","sequence-reset","sequence-explanation","control-next","control-feedback","control-scenario","quiz-check","quiz-reset","quiz-result"]){
    assert.equal((page.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
  }
  assert.equal((page.match(/data-device="/g)||[]).length,3);
  assert.equal((page.match(/data-sequence-step="/g)||[]).length,5);
  assert.equal((page.match(/data-quiz="/g)||[]).length,4);
  assert.ok(!/PI regulátor|integrální složka|dopravník/.test(page));
});