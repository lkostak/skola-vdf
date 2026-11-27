/* node --test tests/mer06-guided-course.test.js */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const dir=path.join(__dirname,"../mechatronika/maturita/06-registry-citace");
function setup(){
 const elements=new Map(),storage=new Map(),selections=new Map();
 function el(id){
  if(!elements.has(id))elements.set(id,{
   id,innerHTML:"",textContent:"",style:{},handlers:{},open:false,scrollCount:0,children:[],
   appendChild(node){
    if(node._parent)node._parent.children=node._parent.children.filter(x=>x!==node);
    this.children.push(node);node._parent=this;return node;
   },
   addEventListener(type,fn){this.handlers[type]=fn;},
   querySelector(selector){
    if(id==="finalQuiz"){
     const found=selector.match(/^input\[name="q(\d+)"\]:checked$/);
     if(found&&selections.has(Number(found[1])))return {value:String(selections.get(Number(found[1])))};
    }
    return selector==="h3"?{setAttribute(){},focus(){}}:null;
   },
   scrollIntoView(){this.scrollCount++;}
  });
  return elements.get(id);
 }
 const window={addEventListener(){},confirm(){return true;}};
 const localStorage={getItem(key){return storage.has(key)?storage.get(key):null;},setItem(key,value){storage.set(key,value);}};
 const context={document:{getElementById:el},localStorage,location:{hash:""},window,console};
 vm.createContext(context);
 vm.runInContext(fs.readFileSync(path.join(dir,"guide.js"),"utf8"),context,{filename:"guide.js"});
 const root=el("rychlokurz");
 return {
  el,root,storage,selections,
  click(action,extras={}){root.handlers.click({target:{closest(){return {disabled:false,dataset:{action,...extras}};}}});},
  navigate(index){root.handlers.click({target:{closest(){return {disabled:false,dataset:{nav:String(index)}};}}});},
  practice(choice){root.handlers.change({target:{matches(s){return s==='input[name="guide-practice"]';},value:String(choice)}});},
  submit(){el("finalQuiz").handlers.submit({preventDefault(){}});}
 };
}
test("Výuka začíná vysvětlením, ukázkou a dobrovolnou otázkou",()=>{
 const a=setup();
 const content=a.el("guidedStage").innerHTML;
 assert.match(content,/Jak si obvod zapamatuje čtyři bity/);
 assert.match(content,/Podívej se na čtyři paměťová políčka/);
 assert.match(content,/Dokážeš to vysvětlit vlastními slovy/);
 assert.match(content,/guide-options/);
 assert.match(content,/Kolik klopných obvodů potřebujeme/);
 a.practice(0);
 assert.match(a.el("guidedStage").innerHTML,/Zkus ještě jednou/);
 a.practice(1);
 assert.match(a.el("guidedStage").innerHTML,/Správně! Čtyři buňky/);
 assert.equal(a.el("guideProgressText").textContent,"Krok 1 z 14");
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Kdy si registr zapamatuje nové číslo/);
});
test("Nápověda u malé otázky nezamyká další krok",()=>{
 const a=setup();
 a.click("show-explanation");
 assert.match(a.el("guidedStage").innerHTML,/Čtyři buňky uchovají čtyři bity/);
 a.click("next");
 assert.match(a.el("guidedStage").innerHTML,/Kdy si registr zapamatuje nové číslo/);
});
test("Student může bez bodování projít celou výuku a přejít na závěrečný test",()=>{
 const a=setup();
 a.navigate(6);
 assert.match(a.el("guidedStage").innerHTML,/Jak z paměti vznikne počítadlo/);
 assert.equal(a.el("guideProgressText").textContent,"Krok 7 z 14");
 a.navigate(13);
 assert.match(a.el("guidedStage").innerHTML,/Jak čítač pozná, že kolem projel další výrobek/);
 a.click("final-test");
 assert.equal(a.el("zaverecny-test").scrollCount,1);
});
test("Interaktivní příklady: HOLD, LOAD, časování a řízení čítače",()=>{
 const a=setup();
 a.navigate(1);
 assert.match(a.el("guidedStage").innerHTML,/CLK \+ HOLD/);
 a.click("clock-hold");
 assert.match(a.el("guidedStage").innerHTML,/drží uloženou hodnotu 1011/);
 a.click("clock-load");
 assert.match(a.el("guidedStage").innerHTML,/převzal vstupní hodnotu 0100/);
 a.navigate(5);
 assert.match(a.el("guidedStage").innerHTML,/Čti tabulku po každé hraně CLK/);
 a.click("pulse");a.click("pulse");a.click("pulse");
 assert.match(a.el("guidedStage").innerHTML,/0101/);
 a.navigate(10);
 assert.match(a.el("guidedStage").innerHTML,/ENABLE/);
 a.click("count-up");a.click("toggle-en");a.click("count-up");
 assert.match(a.el("guidedStage").innerHTML,/Stav: <strong>4<\/strong> · ENABLE = 0/);
 a.click("counter-load");
 assert.match(a.el("guidedStage").innerHTML,/Stav: <strong>5<\/strong> · ENABLE = 0/);
});
test("Závěrečný test obsahuje otázky z celého výkladu a správně je vyhodnotí",()=>{
 const a=setup(),answers=[1,1,0,1,0,2,0,1,1,0,0,1,2,0];
 const markup=a.el("finalQuizQuestions").innerHTML;
 assert.equal((markup.match(/class="guide-quiz-question"/g)||[]).length,14);
 assert.match(markup,/šestibitový registr/);
 assert.match(markup,/Vstupní frekvence plného binárního čítače je 120 Hz/);
 assert.doesNotMatch(markup,/Kolik klopných obvodů potřebujeme, abychom si najednou pamatovali čtyři bity/);
 answers.forEach((value,i)=>a.selections.set(i,value));
 a.submit();
 assert.match(a.el("quizSummary").textContent,/Správně 14 z 14/);
 assert.match(a.el("quiz14").textContent,/Správně/);
 a.el("finalQuiz").handlers.reset();
 assert.equal(a.el("quizSummary").textContent,"");
 assert.equal(a.el("quiz14").textContent,"");
});
test("Chyby a nezodpovězené otázky se vyhodnotí na konci, ne při výkladu",()=>{
 const a=setup();
 a.selections.set(0,2);
 a.submit();
 assert.match(a.el("quizSummary").textContent,/Správně 0 z 14. Vyplněno 1 z 14/);
 assert.match(a.el("quiz1").textContent,/Počet paměťových buněk/);
 assert.match(a.el("quiz2").textContent,/bez odpovědi/);
});
test("Závěrečný test je po výkladu a odborné části; původní simulace zůstaly",()=>{
 const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");
 const css=fs.readFileSync(path.join(dir,"guide.css"),"utf8");
 const app=fs.readFileSync(path.join(dir,"app.js"),"utf8");
 const quick=html.indexOf('id="rychlokurz"');
 const advanced=html.indexOf('id="podrobne"');
 const quiz=html.indexOf('id="zaverecny-test"');
 const footer=html.indexOf('<footer class="footer"');
 assert.ok(0<quick&&quick<advanced&&advanced<quiz&&quiz<footer);
 assert.equal((html.match(/id="finalQuiz"/g)||[]).length,1);
 assert.doesNotMatch(html,/Nezáleží na kulatém počtu kapitol/);
 assert.doesNotMatch(html,/pracovní podob[ay] k pedagogické revizi/i);
 assert.match(html,/id="counterMod"/);
 assert.match(html,/id="ustni-priprava"/);
 assert.match(html,/id="podrobne-zdroj"/);
 assert.equal((html.match(/class="oral-outline-card"/g)||[]).length,6);
 assert.equal((html.match(/class="topic topic-accordion"/g)||[]).length,0);
 assert.equal((html.match(/class="section chapter"/g)||[]).length,10);
 assert.doesNotMatch(html,/id="podrobne"/);
 assert.doesNotMatch(html,/KOSTRA OTÁZKY/);
 assert.match(html,/id="sipoWave"/);
 assert.match(html,/id="ctuValue"/);
 assert.match(html,/src="guide.js"/);
 assert.match(html,/href="guide.css"/);
 assert.match(css,/\.guide-options/);
 assert.match(css,/\.guide-practice/);
 assert.match(app,/SkolaSequentialModel/);
});


test("Každý krok má své podrobnosti; odborná kapitola se přesouvá, ale neztrácí",()=>{
 const a=setup();
 assert.match(a.el("guidedStage").innerHTML,/Chci vědět víc/);
 a.click("toggle-advanced");
 assert.match(a.el("guidedStage").innerHTML,/Skrýt podrobnosti/);
 assert.equal(a.el("guideDeepSlot").children.length,1);
 assert.equal(a.el("guideDeepSlot").children[0].id,"uvod");
 const chapter=a.el("uvod");
 a.practice(1);
 assert.equal(a.el("guideDeepSlot").children[0],chapter,"Po otázce se stejný odborný obsah znovu připojí");
 a.click("next");
 assert.equal(a.el("podrobne-zdroj").children.includes(chapter),true,"Po přechodu na další krok se kapitola vrátí do banky");
 assert.match(a.el("guidedStage").innerHTML,/Chci vědět víc/);
 a.click("toggle-advanced");
 assert.equal(a.el("guideDeepSlot").children[0].id,"registry");
});
test("Osnova ústní maturity naviguje na tematicky odpovídající krok",()=>{
 const a=setup(),oral=a.el("ustni-priprava");
 let prevented=false;
 oral.handlers.click({target:{closest(){return {dataset:{guideJump:"11"}};}},preventDefault(){prevented=true;}});
 assert.equal(prevented,true);
 assert.match(a.el("guidedStage").innerHTML,/Proč některé čítače přepínají společně/);
 assert.equal(a.el("guideProgressText").textContent,"Krok 12 z 14");
});
test("Podrobný výklad zůstává jedinou sadou původních schémat a simulací",()=>{
 const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");
 for(const id of ["uvod","registry","posuvy","casovani","citace","synchronni","frekvence","rizeni","praxe","overeni"]){
  const found=html.match(new RegExp('id="'+id+'"',"g"))||[];
  assert.equal(found.length,1,"Id "+id+" musí být na stránce právě jednou");
 }
 assert.ok(html.indexOf('id="ustni-priprava"')>html.indexOf('id="rychlokurz"'));
 assert.ok(html.indexOf('id="zaverecny-test"')>html.indexOf('id="ustni-priprava"'));
 assert.match(html,/Jak o registrech a čítačích mluvit u maturity/);
 assert.match(html,/Vzor souvislé odpovědi|vzor souvislé odpovědi/);
});
