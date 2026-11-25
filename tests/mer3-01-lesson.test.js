"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"../mechatronika/vyuka/3-rocnik/01");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const js=fs.readFileSync(path.join(root,"lesson.js"),"utf8");
function model(){
  const w={};
  const d={querySelectorAll(){return []},getElementById(){return null}};
  vm.runInNewContext(js,{window:w,document:d},{timeout:1000});
  return w.MER3Lesson01Model;
}
test("Site follows presentation narrative rather than old accordion",()=>{
  const chapters=["zaklad","stroje","casti","dopravnik","regulace","automatizace","zavora"];
  const ids=[...html.matchAll(/class="m-chapter" id="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(ids,chapters);
  for(const phrase of ["Mechatronika propojuje obory","Klasický stroj × mechatronický stroj","Pět stavebních částí","Celý systém: třídicí dopravník","Proveď povel, nebo sleduj výsledek?","Proč automatizujeme?","Rozebereš automatickou závoru?","Pět věcí, které už víš"])assert.ok(html.includes(phrase),phrase);
  assert.doesNotMatch(html,/class="topic topic-accordion"|class="lesson-progress"/);
});
test("Original portal identity and stable lesson navigation",()=>{
  assert.match(html,/\.\.\/\.\.\/\.\.\/\.\.\/assets\/css\/site\.css/);
  assert.match(html,/href="\.\.\/02\/"/);
  assert.match(html,/href="\.\.\/"/);
  assert.match(html,/data-lesson="1"/);
});
test("Conveyor model exposes consequences of failed sensor",()=>{
  const m=model();
  assert.equal(m.chooseSort("metal",true).destination,"KOV");
  assert.equal(m.chooseSort("metal",true).correct,true);
  assert.equal(m.chooseSort("metal",false).destination,"OSTATNÍ");
  assert.equal(m.chooseSort("metal",false).correct,false);
  assert.equal(m.chooseSort("other",false).correct,true);
  assert.equal(m.chooseSort("other",true).detected,false);
});
test("Thermostat feedback differs from fixed timer",()=>{
  const m=model();
  assert.equal(m.chooseHeat("timer",26).heating,true);
  assert.equal(m.chooseHeat("timer",26).usesFeedback,false);
  assert.equal(m.chooseHeat("thermostat",18).heating,true);
  assert.equal(m.chooseHeat("thermostat",26).heating,false);
  assert.equal(m.chooseHeat("thermostat",22).heating,false);
  assert.equal(m.chooseHeat("thermostat",26).usesFeedback,true);
});
test("Controls are unique and work without network libraries",()=>{
  for(const id of ["sensor-working","room-temperature","conveyor-result","conveyor-feedback","heating-state","heating-feedback","barrier-reveal","barrier-solution"])
    assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
  assert.equal((html.match(/data-material="/g)||[]).length,2);
  assert.equal((html.match(/data-mode="/g)||[]).length,2);
  assert.doesNotMatch(html,/<script[^>]+src="https?:/);
});
