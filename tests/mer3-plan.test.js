"use strict";
// Guard the exact translation of 15 original thematic topics and 96 hours.
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.join(__dirname,"../mechatronika/vyuka/3-rocnik");
const script=fs.readFileSync(path.join(root,"lessons.js"),"utf8");
const context={window:{}};
vm.runInNewContext(script,context);
const p=context.window.MER3_COURSE;
const originalHours=[2,7,5,7,7,7,15,4,7,4,3,4,12,6,6];
test("Original syllabus preserves fifteen topics and their exact allocated hours",()=>{
 assert.equal(p.topics.length,15);
 assert.equal(p.hours,96);
 assert.deepEqual(Array.from(p.topics.map(t=>t.hours)),originalHours);
 assert.equal(p.topics.flatMap(t=>t.subtopics).length,48);
});
test("Every hour and subtopic is accounted for in exactly 32 three-hour lessons",()=>{
 assert.equal(p.lessons.length,32);
 assert.deepEqual(Array.from(p.lessons.map(l=>l.number)),Array.from({length:32},(_,i)=>i+1));
 assert.ok(p.lessons.every(l=>l.hours===3&&l.status==="planned"));
 const allocations=new Map();
 for(const l of p.lessons){
   assert.equal(l.chunks.reduce((s,c)=>s+c.hours,0),3);
   for(const c of l.chunks)allocations.set(c.ref,(allocations.get(c.ref)||0)+c.hours);
 }
 for(const t of p.topics)for(const sub of t.subtopics)assert.equal(allocations.get(sub.id),sub.hours,"Incorrect allocation for "+sub.id);
});
test("Every canonical lesson page and old URL redirect exists",()=>{
 for(const l of p.lessons){
  const n=String(l.number).padStart(2,"0");
  const html=fs.readFileSync(path.join(root,n,"index.html"),"utf8");
  assert.match(html,new RegExp('data-lesson="'+l.number+'"'));
 }
});
test("First and last lesson precisely follow source boundaries",()=>{
 assert.deepEqual(Array.from(p.lessons[0].chunks.map(x=>x.ref)),["1.1","1.2","2.1"]);
 assert.deepEqual(Array.from(p.lessons[0].chunks.map(x=>x.hours)),[1,1,1]);
 assert.deepEqual(Array.from(p.lessons[31].chunks.map(x=>x.ref)),["15.2","15.3"]);
 assert.deepEqual(Array.from(p.lessons[31].chunks.map(x=>x.hours)),[1,2]);
});

test("Essential 3rd-year foundations are explicitly visible in revised lessons",()=>{const q=n=>[p.lessons[n-1].title,p.lessons[n-1].goal,...(p.lessons[n-1].focus||[])].join(" ").toLocaleLowerCase("cs");assert.match(q(1),/elektrické/);assert.match(q(2),/pneumatické/);assert.match(q(2),/hydraulické/);assert.match(q(5),/dvojková soustava/);assert.match(q(5),/logická hradla/);assert.match(q(6),/kombinační/);assert.match(q(6),/sekvenční/);assert.equal(p.topics[1].subtopics[0].hours,2);assert.equal(p.topics[3].subtopics[0].hours,2);assert.ok(p.foundations.length>=4);});
