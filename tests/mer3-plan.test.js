"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.join(__dirname,"../mechatronika/vyuka/3-rocnik"),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,"lessons.js"),"utf8"),context);
const course=context.window.MER3_COURSE;
test("Exactly five coherent groups and thirty-two three-hour lessons",()=>{
 assert.equal(course.groups.length,5);
 assert.deepEqual(Array.from(course.groups.map(g=>g.id)),["A","B","C","D","E"]);
 assert.equal(course.lessons.length,32);
 assert.equal(course.hours,96);
 assert.equal(course.lessons.reduce((v,l)=>v+l.hours,0),96);
 assert.deepEqual(Array.from(course.groups.map(g=>course.lessons.filter(l=>l.group===g.id).length)),[5,8,8,3,8]);
});
test("Important content is visible as standalone topics",()=>{
 const titles=course.lessons.map(l=>l.title).join(" / ");
 for(const term of ["Dvojková soustava","Booleova algebra","Kombinační","Sekvenční","Elektrické, pneumatické a hydraulické","Snímače","PLC","Přerušení","Regulátory"])assert.ok(titles.includes(term),"Missing "+term);
});
test("Plan provisionally maps every SVP outcome and all 14 units",()=>{
 const units=new Set(course.lessons.flatMap(l=>l.svpUnits)),outputs=new Set(course.lessons.flatMap(l=>l.svpOutcomes));
 for(let i=1;i<=14;i++)assert.ok(units.has(i),"Missing U"+i);
 for(let i=1;i<=47;i++)assert.ok(outputs.has(i),"Missing V"+i);
});
test("Every theme has a page and navigation source",()=>{
 for(const l of course.lessons){
  const n=String(l.number).padStart(2,"0");
  const html=fs.readFileSync(path.join(root,n,"index.html"),"utf8");
  assert.match(html,new RegExp('data-lesson="'+l.number+'"'));
  assert.ok(l.title&&l.description&&l.practice);
 }
 const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
 assert.doesNotMatch(home,/Základy, které nesmějí zmizet|původních 15|Radka Boháče|přepracování|metodické/);
 assert.match(home,/course-groups/);
});
