/* Otázka 03: obsluha ideálních logických modelů. Výpočty jsou v logic-core.js. */
(function(){
"use strict";
const m=window.SkolaLogicModel;if(!m){console.error("Chybí logic-core.js");return;}
const el=id=>document.getElementById(id);
const text=(id,value)=>{const n=el(id);if(n)n.textContent=String(value);};
const when=(id,fn)=>{const n=el(id);if(n)n.addEventListener("click",fn);};
const formulas={NOT:"Y = ¬A",AND:"Y = A · B",OR:"Y = A + B",NAND:"Y = ¬(A · B)",NOR:"Y = ¬(A + B)",XOR:"Y = A ⊕ B",XNOR:"Y = ¬(A ⊕ B)"};
let A=0,B=0,prediction=null,checked=false;
function toggleStyle(id,bit){const node=el(id);node.setAttribute("aria-pressed",bit?"true":"false");}
function makeCell(tr,v){const td=document.createElement("td");td.textContent=String(v);tr.appendChild(td);}
function renderGate(){
 const name=el("gateSelect").value,not=name==="NOT",result=m.gate(name,A,B);
 text("inputA","A = "+A);toggleStyle("inputA",A);
 text("inputB","B = "+B);toggleStyle("inputB",B);
 el("inputB").disabled=not;el("inputB").hidden=not;
 text("gateFormula",formulas[name]);
 text("gateY",checked?result:"?");
 const th=el("gateTableHead"),tb=el("gateTableBody");th.replaceChildren();tb.replaceChildren();
 const header=document.createElement("tr");
 (not?["A","Y"]:["A","B","Y"]).forEach(v=>{const cell=document.createElement("th");cell.textContent=v;header.appendChild(cell);});th.appendChild(header);
 m.table(name).forEach(v=>{
   const tr=document.createElement("tr"),active=v.a===A&&(not||v.b===B);
   if(active)tr.className="selected-row";
   makeCell(tr,v.a);if(!not)makeCell(tr,v.b);
   makeCell(tr,active&&!checked?"?":v.y);tb.appendChild(tr);
 });
 document.querySelectorAll("[data-predict]").forEach(button=>{button.setAttribute("aria-pressed",String(Number(button.dataset.predict)===prediction));});
 if(!checked)text("gateFeedback","Nejprve odhadni výstup pro "+name+" a aktuální vstupy. Vybraný řádek tabulky zůstává do ověření zakrytý.");
}
function resetGate(){prediction=null;checked=false;renderGate();}
el("gateSelect").addEventListener("change",resetGate);
when("inputA",()=>{A=1-A;resetGate();});
when("inputB",()=>{B=1-B;resetGate();});
document.querySelectorAll("[data-predict]").forEach(button=>button.addEventListener("click",()=>{
 prediction=Number(button.dataset.predict);checked=false;renderGate();
}));
when("checkGate",()=>{
 if(prediction===null){text("gateFeedback","Nejdřív označ svoji předpověď Y=0 nebo Y=1.");return;}
 checked=true;renderGate();
 const name=el("gateSelect").value,correct=m.gate(name,A,B);
 text("gateFeedback",(prediction===correct?"Správně. ":"Zkus znovu promyslet pravidlo. ")+
   "Pro "+name+" při A="+A+(name==="NOT"?"":", B="+B)+" je Y="+correct+
   ". "+(name==="AND"?"AND potřebuje obě jedničky.":name==="OR"?"OR potřebuje alespoň jednu jedničku.":name==="XOR"?"XOR pro dva vstupy vyžaduje rozdílné hodnoty.":name==="XNOR"?"XNOR pro dva vstupy vyžaduje shodu.":name==="NOT"?"NOT hodnotu obrací.":"Při NAND a NOR je nutné negovat celou základní funkci."));
});
renderGate();

// Třístavová pravdivostní tabulka je z téhož modelu jako ostatní lekce.
(function(){
 const body=el("threeTruthBody");if(!body)return;
 m.table3("AB_OR_C").forEach(row=>{const tr=document.createElement("tr");[row.a,row.b,row.c,row.y].forEach(v=>makeCell(tr,v));body.appendChild(tr);});
})();

// De Morgan: všechny čtyři řádky, vstupy lze ručně krokovat.
let dmA=0,dmB=0;
function renderDM(){
 text("dmA","A="+dmA);text("dmB","B="+dmB);toggleStyle("dmA",dmA);toggleStyle("dmB",dmB);
 const r=m.deMorgan(dmA,dmB);
 text("dmResult1",r.notAnd+" = "+r.orOfNegations);text("dmResult2",r.notOr+" = "+r.andOfNegations);
 text("dmFeedback","Obě rovnosti platí pro A="+dmA+", B="+dmB+". Při negaci závorky zároveň prohodíme AND a OR.");
 const body=el("dmBody");body.replaceChildren();
 for(let a=0;a<=1;a++)for(let b=0;b<=1;b++){
  const d=m.deMorgan(a,b),tr=document.createElement("tr");
  if(a===dmA&&b===dmB)tr.className="selected-row";
  [a,b,d.notAnd,d.orOfNegations,d.notOr,d.andOfNegations].forEach(v=>makeCell(tr,v));body.appendChild(tr);
 }
}
when("dmA",()=>{dmA=1-dmA;renderDM();});
when("dmB",()=>{dmB=1-dmB;renderDM();});
renderDM();

// Unifikovaná univerzální NAND/NOR realizace.
let uA=0,uB=0;
function universalFormula(f,t){
 if(f==="NAND")return ({NOT:"NOT(A) = NAND(A,A)",AND:"AND(A,B) = NAND(X,X), X=NAND(A,B)",OR:"OR(A,B) = NAND(NAND(A,A),NAND(B,B))"})[t];
 return ({NOT:"NOT(A) = NOR(A,A)",AND:"AND(A,B) = NOR(NOR(A,A),NOR(B,B))",OR:"OR(A,B) = NOR(X,X), X=NOR(A,B)"})[t];
}
function renderUniversal(){
 const f=el("familySelect").value,t=el("targetSelect").value;
 text("universalA","A="+uA);text("universalB","B="+uB);toggleStyle("universalA",uA);toggleStyle("universalB",uB);
 el("universalB").hidden=t==="NOT";el("universalB").disabled=t==="NOT";
 const actual=m.throughUniversal(f,t,uA,uB),expected=m.gate(t,uA,uB);
 text("universalActual",actual);text("universalExpected",expected);
 text("universalFormula",universalFormula(f,t));
 text("universalFeedback","Pro A="+uA+(t==="NOT"?"":", B="+uB)+" je výsledek "+actual+
 ". Jde o ekvivalentní idealizované logické funkce.");
}
el("familySelect").addEventListener("change",renderUniversal);el("targetSelect").addEventListener("change",renderUniversal);
when("universalA",()=>{uA=1-uA;renderUniversal();});
when("universalB",()=>{uB=1-uB;renderUniversal();});
when("universalReset",()=>{uA=0;uB=0;el("familySelect").value="NAND";el("targetSelect").value="NOT";renderUniversal();});
renderUniversal();

// Jednoduché spínací kontakty, jde jen o provozní model.
let contactA=0,contactB=0;
function renderContact(){
 const mode=el("contactMode").value;
 text("contactA","Kontakt A: "+(contactA?"uzavřen":"otevřen"));
 text("contactB","Kontakt B: "+(contactB?"uzavřen":"otevřen"));
 toggleStyle("contactA",contactA);toggleStyle("contactB",contactB);
 const result=m.contact(mode,contactA,contactB);
 text("contactY",result);
 text("contactState",result?"Průchod signálu":"Bez průchodu");
 text("contactFeedback",mode==="series"?"V sérii jsou nutné oba uzavřené spínací kontakty.":"V paralelním zapojení stačí jediná uzavřená větev.");
}
el("contactMode").addEventListener("change",renderContact);
when("contactA",()=>{contactA=1-contactA;renderContact();});
when("contactB",()=>{contactB=1-contactB;renderContact();});renderContact();

// Finální ověření s důvody, ne pouze zelenou nebo červenou.
const quiz=[
 {name:"q1",ok:"b",yes:"Správně: XOR pro dva vstupy značí rozdíl. Pro 11 je 0.",no:"XOR není stejné jako OR. U XOR je dvojice 11 nepravdivá."},
 {name:"q2",ok:"c",yes:"Správně: ¬(A+B)=¬A·¬B.",no:"De Morgan mění OR na AND a zároveň neguje každý vstup."},
 {name:"q3",ok:"a",yes:"Správně: ≥1 je OR a kroužek neguje výstup, tedy NOR.",no:"Kroužek na výstupu mění OR na NOR; uvnitř zůstává ≥1."},
 {name:"q4",ok:"b",yes:"Správně: série spínacích kontaktů odpovídá AND.",no:"Dvě spínací cesty v sérii propouštějí signál jen při uzavření obou."}
];
const quizForm=el("finalQuiz");
quizForm.addEventListener("submit",e=>{
 e.preventDefault();let correct=0,answered=0;
 quiz.forEach((q,i)=>{
   const v=quizForm.querySelector('input[name="'+q.name+'"]:checked'),node=el("quiz"+(i+1));
   if(!v){node.textContent="Tuto otázku jsi zatím nezodpověděl.";node.className="quiz-feedback";return;}
   answered++;const good=v.value===q.ok;if(good)correct++;
   node.textContent=good?q.yes:q.no;node.className="quiz-feedback "+(good?"is-correct":"is-wrong");
 });
 text("quizSummary","Správně "+correct+" ze "+quiz.length+", zodpovězeno "+answered+". U maturity vysvětli i důvod výsledku.");
});
quizForm.addEventListener("reset",()=>{quiz.forEach((q,i)=>text("quiz"+(i+1),""));text("quizSummary","");});
})();