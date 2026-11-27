/* node --test tests/mer06-guided-course.test.js */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const dir=path.join(__dirname,"../mechatronika/maturita/06-registry-citace");
function setup(){
 const elements=new Map();
 function el(id){
  if(!elements.has(id)){
   elements.set(id,{
    id,innerHTML:"",textContent:"",style:{},handlers:{},open:false,
    addEventListener(type,fn){this.handlers[type]=fn;},
    querySelector(selector){return selector==="h3"?{setAttribute(){},focus(){}}:null;},
    scrollIntoView(){}
   });
  }
  return elements.get(id);
 }
 const storage=new Map();
 const window={
  addEventListener(){},
  confirm(){return true;}
 };
 const localStorage={
  getItem(key){return storage.has(key)?storage.get(key):null;},
  setItem(key,value){storage.set(key,value);}
 };
 const context={
  document:{getElementById:el},
  localStorage,location:{hash:""},
  window,
  console
 };
 vm.createContext(context);
 vm.runInContext(fs.readFileSync(path.join(dir,"guide.js"),"utf8"),context,{filename:"guide.js"});
 const root=el("rychlokurz");
 return {
  el,root,storage,
  answer(choice){root.handlers.change({target:{matches(selector){return selector==='input[name="guide-answer"]';},value:String(choice)}});},
  click(action,extras={}){root.handlers.click({target:{closest(){return {disabled:false,dataset:{action,...extras}};}}});},
  navigate(index){root.handlers.click({target:{closest(){return {disabled:false,dataset:{nav:String(index)}};}}});}
 };
}
test("Úvodní krok vysvětlí registr a další je zamčený do odpovědi",()=>{
 const a=setup();
 assert.match(a.el("guidedStage").innerHTML,/Čtyři bity si pamatují číslo/);
 assert.match(a.el("guideStepNav").innerHTML,/disabled/);
 a.answer(0);
 assert.equal(a.el("guideProgressText").textContent,"1 / 10 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/Výstup zůstává 1011/);
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Jak bity putují registrem/);
});
test("Chybná odpověď nepřidá bod; vysvětlení odemkne další krok bez bodu",()=>{
 const a=setup();
 a.answer(1);
 assert.equal(a.el("guideProgressText").textContent,"0 / 10 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/Ještě ne/);
 a.click("reveal");
 assert.equal(a.el("guideProgressText").textContent,"0 / 10 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/není započítán/);
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Jak bity putují registrem/);
});
test("Deset kontrolních otázek tvoří průchozí kurz včetně finálního hodnocení",()=>{
 const a=setup(),answers=[0,1,0,0,1,2,1,1,1,0];
 for(let i=0;i<answers.length;i++){
  a.answer(answers[i]);
  assert.equal(a.el("guideProgressText").textContent,(i+1)+" / 10 ověřených odpovědí");
  if(i<answers.length-1)a.click("next");
 }
 assert.match(a.el("guidedStage").innerHTML,/Hotovo, prošel jsi celý základní výklad/);
 a.click("deep");
 assert.equal(a.el("podrobne").open,true);
});
test("Načítání průvodce zachová původní maturitní kapitoly i existující simulace",()=>{
 const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");
 const css=fs.readFileSync(path.join(dir,"guide.css"),"utf8");
 assert.match(html,/id="rychlokurz"/);
 assert.match(html,/id="podrobne"/);
 assert.match(html,/id="counterMod"/);
 assert.match(html,/id="finalQuiz"/);
 assert.match(html,/src="guide.js"/);
 assert.match(html,/href="guide.css"/);
 assert.match(html,/KOSTRA OTÁZKY/);
 assert.match(css,/\.guide-options/);
});
