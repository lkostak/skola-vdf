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
 const window={addEventListener(){},confirm(){return true;}};
 const localStorage={getItem(key){return storage.has(key)?storage.get(key):null;},setItem(key,value){storage.set(key,value);}};
 const context={document:{getElementById:el},localStorage,location:{hash:""},window,console};
 vm.createContext(context);
 vm.runInContext(fs.readFileSync(path.join(dir,"guide.js"),"utf8"),context,{filename:"guide.js"});
 const root=el("rychlokurz");
 return {
  el,root,storage,
  answer(choice){root.handlers.change({target:{matches(selector){return selector==='input[name="guide-answer"]';},value:String(choice)}});},
  click(action,extras={}){root.handlers.click({target:{closest(){return {disabled:false,dataset:{action,...extras}};}}});}
 };
}
const answers=[0,1,1,0,1,0,0,1,2,1,2,1,1,0];
test("Úvodní krok vysvětlí registr a další je zamčený do odpovědi",()=>{
 const a=setup();
 assert.match(a.el("guidedStage").innerHTML,/Čtyři bity si pamatují číslo/);
 assert.match(a.el("guideStepNav").innerHTML,/disabled/);
 a.answer(0);
 assert.equal(a.el("guideProgressText").textContent,"1 / 14 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/Výstup zůstává 1011/);
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Kdy se nová hodnota opravdu uloží/);
});
test("Chybná odpověď nepřidá bod; vysvětlení odemkne další krok bez bodu",()=>{
 const a=setup();
 a.answer(1);
 assert.equal(a.el("guideProgressText").textContent,"0 / 14 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/Ještě ne/);
 a.click("reveal");
 assert.equal(a.el("guideProgressText").textContent,"0 / 14 ověřených odpovědí");
 assert.match(a.el("guidedStage").innerHTML,/není započítán/);
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Kdy se nová hodnota opravdu uloží/);
});
test("Čtrnáct kontrolních otázek tvoří průchozí kurz včetně finálního hodnocení",()=>{
 const a=setup();
 const names=[];
 for(let i=0;i<answers.length;i++){
  const h=a.el("guidedStage").innerHTML;
  const title=h.match(/<h3>(.*?)<\/h3>/);
  assert.ok(title,"Každý krok má název");
  names.push(title[1]);
  a.answer(answers[i]);
  assert.equal(a.el("guideProgressText").textContent,(i+1)+" / 14 ověřených odpovědí");
  if(i<answers.length-1)a.click("next");
 }
 assert.equal(names[1],"Kdy se nová hodnota opravdu uloží?");
 assert.equal(names[5],"Jak čteme změny bitů v čase?");
 assert.equal(names[9],"Počítat můžeme i jen do čtyř");
 assert.equal(names[10],"Čítač můžeme řídit");
 assert.equal(names[13],"Počítání výrobků na dopravníku");
 assert.match(a.el("guidedStage").innerHTML,/Hotovo, prošel jsi celý základní výklad/);
 a.click("deep");
 assert.equal(a.el("podrobne").open,true);
});
test("Ukázky vysvětlí HOLD/LOAD, časové hrany a řízení čítače",()=>{
 const a=setup();
 a.answer(answers[0]);a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/CLK \+ HOLD/);
 a.click("clock-hold");
 assert.match(a.el("guidedStage").innerHTML,/drží uloženou hodnotu 1011/);
 a.click("clock-load");
 assert.match(a.el("guidedStage").innerHTML,/převzal vstupní hodnotu 0100/);
 for(let i=1;i<5;i++){a.answer(answers[i]);a.click("next");}
 assert.match(a.el("guidedStage").innerHTML,/Čti tabulku po každé hraně CLK/);
 a.click("pulse");a.click("pulse");a.click("pulse");
 assert.match(a.el("guidedStage").innerHTML,/0101/);
 for(let i=5;i<10;i++){a.answer(answers[i]);a.click("next");}
 assert.match(a.el("guidedStage").innerHTML,/ENABLE/);
 a.click("count-up");a.click("toggle-en");a.click("count-up");
 assert.match(a.el("guidedStage").innerHTML,/Stav: <strong>4<\/strong> · ENABLE = 0/);
 a.click("counter-load");
 assert.match(a.el("guidedStage").innerHTML,/Stav: <strong>5<\/strong> · ENABLE = 0/);
});
test("Stránka má správné pořadí HTML a uchovává odborný výklad",()=>{
 const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");
 const css=fs.readFileSync(path.join(dir,"guide.css"),"utf8");
 const quick=html.indexOf('id="rychlokurz"');
 const deep=html.indexOf('id="podrobne"');
 const nav=html.indexOf('<nav class="chapter-nav"');
 const footer=html.indexOf('<footer class="footer"');
 assert.ok(0<quick&&quick<deep&&deep<nav&&nav<footer,"Kroková výuka před podrobnou osnovou");
 assert.match(html,/Pracovní podoba k pedagogické revizi<\/footer>/);
 assert.match(html,/id="counterMod"/);
 assert.match(html,/id="finalQuiz"/);
 assert.match(html,/src="guide.js"/);
 assert.match(html,/href="guide.css"/);
 assert.match(html,/KOSTRA OTÁZKY/);
 assert.match(css,/\.guide-options/);
});
