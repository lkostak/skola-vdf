/* Statická kontrola nové látky a zapojení: node --test tests/lesson-05-content.test.js */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const aPath = path.join(__dirname,"../mechatronika/maturita/05a-pamet-rs/index.html");
const indexPath = path.join(__dirname,"../mechatronika/maturita/05-sekvencni-logika/index.html");
const page = fs.readFileSync(aPath,"utf8");
const index = fs.readFileSync(indexPath,"utf8");

test("Výklad 5A zahrnuje sedm navazujících kapitol", () => {
  assert.equal((page.match(/class="section chapter"/g)||[]).length,7);
  for(const id of ["problem","stav","zpetna-vazba","multivibratory","rs","motor","overeni"]){
    assert.match(page,new RegExp('id="'+id+'"'));
    assert.match(page,new RegExp('href="#'+id+'"'));
  }
});

test("Typy multivibrátorů, jejich časové průběhy a interpretace jsou přítomné", () => {
  for(const term of ["Monostabilní","Bistabilní","Astabilní","jeden stabilní stav","dva stabilní stavy","žádný stabilní klidový stav"]){
    assert.ok(page.toLowerCase().includes(term.toLowerCase()),"Chybí "+term);
  }
  assert.match(page,/id="mv-wave-title"/);
  assert.match(page,/id="mv-task-title"/);
  assert.match(page,/data-mv-answer="monostabilni"/);
  assert.match(page,/data-mv-answer="astabilni"/);
  assert.match(page,/data-mv-answer="bistabilni"/);
});

test("Schéma RS má právě dvě hradla NOR a explicitní obě křížové vazby", () => {
  const diagram=page.match(/<figure class="glass nor-circuit-figure" id="schema-rs">([\s\S]*?)<\/figure>/);
  assert.ok(diagram,"Schéma chybí");
  const d=diagram[1];
  assert.equal((d.match(/<rect x="310"/g)||[]).length,2,"Očekávána přesně dvě hradla");
  assert.equal((d.match(/<circle cx="438"/g)||[]).length,2,"Každý NOR musí mít invertující bublinu");
  assert.match(d,/M 555 101 V 195 H 205 V 300 H 310/,"Q musí jít do dolního NOR");
  assert.match(d,/M 615 287 V 363 H 156 V 114 H 310/,"Q̄ musí jít do horního NOR");
  assert.match(d,/Q = ¬\(R ∨ Q̄\)/);
  assert.match(d,/Q̄ = ¬\(S ∨ Q\)/);
});

test("Všechny odkazy nové látky jsou propojené do ústní osnovy", () => {
  assert.match(index,/href="\.\.\/05a-pamet-rs\/#multivibratory"/);
  assert.match(index,/href="\.\.\/05a-pamet-rs\/#schema-rs"/);
  assert.match(page,/id="norGateState"/);
});

test("Idealizovaný model NOR-RS dodržuje výstupní rovnice zakreslených hradel", () => {
  const context={window:{}};vm.createContext(context);
  const modelSrc=fs.readFileSync(path.join(__dirname,"../assets/js/rs-core.js"),"utf8");
  vm.runInContext(modelSrc,context);
  const rs=context.window.SkolaRSModel.createNorRs(0);
  for(const [S,R] of [[1,0],[0,0],[0,1],[0,0],[1,1]]){
    const {q,qBar}=rs.apply(S,R);
    assert.equal(q,Number(!(R || qBar)),"Horní NOR pro S="+S+",R="+R);
    assert.equal(qBar,Number(!(S || q)),"Dolní NOR pro S="+S+",R="+R);
  }
  const unknown=rs.apply(0,0);
  assert.equal(unknown.status,"indeterminate");
  assert.equal(unknown.q,null);
  assert.equal(unknown.qBar,null);
});
