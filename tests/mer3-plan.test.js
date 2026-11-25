"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.join(__dirname,"../mechatronika/vyuka/3-rocnik"),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,"lessons.js"),"utf8"),context);
const course=context.window.MER3_COURSE;
test("Five planned groups, 32 topics and 96 total hours",()=>{
 assert.equal(course.groups.length,5);
 assert.deepEqual(Array.from(course.groups.map(g=>g.id)),["A","B","C","D","E"]);
 assert.equal(course.lessons.length,32);
 assert.equal(course.hours,96);
 assert.equal(course.lessons.reduce((s,l)=>s+l.hours,0),96);
 assert.deepEqual(Array.from(course.groups.map(g=>course.lessons.filter(l=>l.group===g.id).length)),[2,4,4,13,9]);
 assert.ok(course.lessons.every(l=>l.status==="outline"));
});
test("Visible topic names match agreed practical mechatronics sequence",()=>{
 const titles=course.lessons.map(l=>l.title);
 assert.deepEqual(Array.from([titles[0],titles[1],titles[6],titles[9],titles[10],titles[15],titles[20],titles[23],titles[31]]),
 ["Co je mechatronický systém?","Mechatronika a robotika kolem nás","Jak počítač pracuje s informacemi","Sekvenční obvody a paměť","Mikroprocesory a mikrořadiče","Časování programu","Přerušení a reakce na události","Proč potřebujeme zpětnou vazbu?","Vzorkování a číslicový regulátor"]);
 assert.ok(course.lessons[6].description.includes("dvojková soustava"));
 assert.ok(course.lessons[7].description.includes("AND"));
 assert.ok(course.lessons[8].title.includes("Kombinační"));
});
test("All SVP units and 47 outcomes have provisional lesson mappings",()=>{
 const units=new Set(course.lessons.flatMap(l=>l.svpUnits)),outcomes=new Set(course.lessons.flatMap(l=>l.svpOutcomes));
 for(let n=1;n<=14;n++)assert.ok(units.has(n),"Missing SVP U"+n);
 for(let n=1;n<=47;n++)assert.ok(outcomes.has(n),"Missing SVP V"+n);
});
test("Canonical URLs remain stable and page has no internal curriculum commentary",()=>{
 for(const l of course.lessons){
  const n=String(l.number).padStart(2,"0");
  const html=fs.readFileSync(path.join(root,n,"index.html"),"utf8");
  assert.match(html,new RegExp('data-lesson="'+l.number+'"'));
  assert.equal(l.slug,n);
  assert.ok(l.title&&l.description&&l.practice);
 }
 const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
 assert.doesNotMatch(home,/Základy, které nesmějí zmizet|původních 15|Radka Boháče|přepracování|metodické/);
 assert.match(home,/course-groups/);
 for(const id of "abcde") assert.match(home,new RegExp('href="#skupina-'+id+'"'));
});
