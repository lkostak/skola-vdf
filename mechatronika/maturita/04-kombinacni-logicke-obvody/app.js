/* Maturita 04: interakce odvozené jen ze sdíleného combinational-core.js. */
(function(){
 "use strict";
 const M=window.SkolaCombModel;
 if(!M){console.error("Chybí combinational-core.js");return;}
 const el=id=>document.getElementById(id),say=(id,s)=>{const e=el(id);if(e)e.textContent=String(s);};
 const click=(id,fn)=>{const e=el(id);if(e)e.addEventListener("click",fn);};
 const pressed=(id,on)=>el(id).setAttribute("aria-pressed",on?"true":"false");
 const cell=(tr,tag,value)=>{const e=document.createElement(tag);e.textContent=String(value);tr.appendChild(e);return e;};

 // Tříproměnný návrhář: pravdivostní tabulka řádků 0…7, Karnaughovy buňky
 // v pořadí BC = 00,01,11,10, úplné i minimalizované SOP/POS.
 let truth=M.truth3("majority");
 let selectedGroup=null;
 function groupDescription(group){
   const rows=group.covered.map(i=>"m"+i).join(", ");
   return "Skupina "+group.text+" pokrývá "+rows+". Proměnné, které se uvnitř skupiny mění, z výrazu zmizí.";
 }
 function renderDesigner(){
   const canonicalSop=M.canonicalSOP(truth),canonicalPos=M.canonicalPOS(truth);
   const minSop=M.minimizeSOP(truth),minPos=M.minimizePOS(truth);
   say("canonicalSop",canonicalSop);say("canonicalPos",canonicalPos);
   say("minimalSop",minSop.text);say("minimalPos",minPos.text);
   const rows=el("designTruthRows");rows.replaceChildren();
   for(let i=0;i<8;i++){
     const tr=document.createElement("tr"),b=M.bits3(i);
     cell(tr,"td","m"+i);b.forEach(v=>cell(tr,"td",v));
     const td=document.createElement("td"),button=document.createElement("button");
     button.type="button";button.className="truth-toggle "+(truth[i]?"truth-one":"truth-zero");
     button.textContent=String(truth[i]);button.setAttribute("aria-label","Přepnout výstup Y řádku "+i+" nyní "+truth[i]);
     button.addEventListener("click",()=>{
       truth[i]=1-truth[i];selectedGroup=null;el("presetSelect").value="custom";renderDesigner();
     });
     td.appendChild(button);tr.appendChild(td);rows.appendChild(tr);
   }
   const body=el("designKmapRows");body.replaceChildren();
   M.kmap(truth).forEach((row,a)=>{
     const tr=document.createElement("tr");cell(tr,"th",a);
     row.forEach(obj=>{
       const td=document.createElement("td"),b=document.createElement("button");
       b.type="button";b.className="kmap-cell "+(obj.y?"active-one":"active-zero")+
         (selectedGroup!==null&&minSop.groups[selectedGroup]?.covered.includes(obj.index)?" in-group":"");
       b.textContent=String(obj.y);b.title="m"+obj.index+" · A="+obj.a+", BC="+obj.bc;
       b.setAttribute("aria-label","Buňka m"+obj.index+", A="+obj.a+", BC="+obj.bc+", Y="+obj.y+". Kliknutím převrátíš výstup.");
       b.addEventListener("click",()=>{
         truth[obj.index]=1-truth[obj.index];selectedGroup=null;el("presetSelect").value="custom";renderDesigner();
       });
       td.appendChild(b);tr.appendChild(td);
     });body.appendChild(tr);
   });
   const list=el("kmapGroups");list.replaceChildren();
   if(!minSop.groups.length)list.textContent="V mapě nejsou jedničky, minimální SOP je 0.";
   minSop.groups.forEach((g,i)=>{
     const b=document.createElement("button");b.type="button";b.className="secondary group-pick";
     b.textContent=g.text+" · "+g.covered.length+" buněk";
     b.setAttribute("aria-pressed",i===selectedGroup?"true":"false");
     b.addEventListener("click",()=>{selectedGroup=i;renderDesigner();});
     list.appendChild(b);
   });
   if(selectedGroup!==null&&minSop.groups[selectedGroup]){
     say("kmapGroupFeedback",groupDescription(minSop.groups[selectedGroup]));
   }else if(minSop.text==="1")say("kmapGroupFeedback","Všech osm buněk je 1. Funkce je konstantně 1.");
   else say("kmapGroupFeedback","Zvol skupinu, aby se zvýraznily její buňky. U stejné funkce může existovat i jiné ekvivalentní minimální seskupení.");
   say("designFeedback","Jedničkové řádky: "+truth.flatMap((v,i)=>v?["m"+i]:[]).join(", ")+
      ". Návrhový algoritmus hledá minimální úplné pokrytí jedniček validními skupinami v mapě. Výsledný výraz zachovává všech osm hodnot.");
 }
 el("presetSelect").addEventListener("change",()=>{
   const kind=el("presetSelect").value;
   if(kind==="custom")return;
   truth=M.truth3(kind);selectedGroup=null;renderDesigner();
 });
 click("restoreMajority",()=>{truth=M.truth3("majority");selectedGroup=null;el("presetSelect").value="majority";renderDesigner();});
 renderDesigner();

 // Poloviční / úplná sčítačka.
 let addA=0,addB=0,addCin=0;
 function renderAdder(){
   const full=el("adderType").value==="full";
   say("adderA","A="+addA);say("adderB","B="+addB);say("adderCin","Cin="+addCin);
   pressed("adderA",addA);pressed("adderB",addB);pressed("adderCin",addCin);
   el("adderCin").disabled=!full;el("adderCin").hidden=!full;
   const result=full?M.fullAdder(addA,addB,addCin):M.halfAdder(addA,addB);
   say("adderSum",result.sum);say("adderCarry",result.carry);
   say("adderFeedback","Výsledek "+addA+"+"+addB+(full?"+"+addCin:"")+
      " = "+(result.sum+2*result.carry)+". Nižší bit je S="+result.sum+
      ", vyšší bit tvoří přenos="+result.carry+".");
   const head=el("adderHead"),body=el("adderTruth");head.replaceChildren();body.replaceChildren();
   const header=document.createElement("tr");
   (full?["A","B","Cin","S","Cout"]:["A","B","S","C"]).forEach(s=>cell(header,"th",s));head.appendChild(header);
   for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let ci=0;ci<(full?2:1);ci++){
     const r=full?M.fullAdder(a,b,ci):M.halfAdder(a,b),tr=document.createElement("tr");
     if(a===addA&&b===addB&&(!full||ci===addCin))tr.className="selected-row";
     (full?[a,b,ci,r.sum,r.carry]:[a,b,r.sum,r.carry]).forEach(v=>cell(tr,"td",v));body.appendChild(tr);
   }
 }
 el("adderType").addEventListener("change",renderAdder);
 click("adderA",()=>{addA=1-addA;renderAdder();});
 click("adderB",()=>{addB=1-addB;renderAdder();});
 click("adderCin",()=>{addCin=1-addCin;renderAdder();});
 renderAdder();

 // Dekodér 2→4 a kodér 4→2 bez priority.
 let decA=0,decB=0,enable=1,encoder=[1,0,0,0];
 function outputList(id,prefix,arr){
   const parent=el(id);parent.replaceChildren();
   arr.forEach((v,i)=>{const div=document.createElement("div");div.className="bit-out "+(v?"is-one":"");div.textContent=prefix+i+" = "+v;parent.appendChild(div);});
 }
 function renderDec(){
   const outputs=M.decoder2(decA,decB,enable);
   say("decA","A="+decA);say("decB","B="+decB);say("decEnable","E="+enable);
   pressed("decA",decA);pressed("decB",decB);pressed("decEnable",enable);
   outputList("decoderOut","Y",outputs);
   say("decoderFeedback",enable?"Adresa "+decA+decB+" aktivuje výstup Y"+(decA*2+decB)+".":"E=0: dekodér je zakázán, všechny výstupy jsou 0.");
 }
 click("decA",()=>{decA=1-decA;renderDec();});click("decB",()=>{decB=1-decB;renderDec();});
 click("decEnable",()=>{enable=1-enable;renderDec();});renderDec();
 function renderEnc(){
   document.querySelectorAll("[data-encoder]").forEach(button=>{
     const i=Number(button.dataset.encoder),value=encoder[i];
     button.textContent="I"+i+"="+value;button.setAttribute("aria-pressed",value?"true":"false");
   });
   const result=M.encoder4(encoder);
   say("encoderFeedback",result.valid?"Právě jeden aktivní vstup I"+result.input+". Platný binární výstup = "+
       result.out.join("")+".":"NEPLATNÉ: "+result.reason+". Jednoduchý kodér 4→2 bez priority nemá pro takový vstup definované jednoznačné kódování.");
 }
 document.querySelectorAll("[data-encoder]").forEach(button=>button.addEventListener("click",()=>{
   const i=Number(button.dataset.encoder);encoder[i]=1-encoder[i];renderEnc();
 }));renderEnc();

 // MUX 4→1 a DEMUX 1→4 sdílejí adresu, nikoli datovou cestu.
 let muxData=[0,1,0,1],s1=0,s0=0,demuxD=1;
 function renderMux(){
   document.querySelectorAll("[data-mux-data]").forEach(button=>{
     const i=Number(button.dataset.muxData),value=muxData[i];
     button.textContent="D"+i+"="+value;button.setAttribute("aria-pressed",value?"true":"false");
   });
   say("muxS1","S1="+s1);say("muxS0","S0="+s0);pressed("muxS1",s1);pressed("muxS0",s0);
   const ix=s1*2+s0,value=M.mux4(muxData,s0,s1);
   say("muxChosen","D"+ix);say("muxY",value);
   say("muxFeedback","Adresa S1S0="+s1+s0+" vybírá D"+ix+", jehož aktuální hodnota je "+value+".");
   say("demuxD","D="+demuxD);pressed("demuxD",demuxD);
   outputList("demuxOut","Y",M.demux1to4(demuxD,s0,s1));
 }
 document.querySelectorAll("[data-mux-data]").forEach(button=>button.addEventListener("click",()=>{
   const i=Number(button.dataset.muxData);muxData[i]=1-muxData[i];renderMux();
 }));
 click("muxS1",()=>{s1=1-s1;renderMux();});click("muxS0",()=>{s0=1-s0;renderMux();});
 click("demuxD",()=>{demuxD=1-demuxD;renderMux();});renderMux();
 function renderComparator(){
   const a=Number(el("cmpA").value),b=Number(el("cmpB").value),r=M.comparator2(a,b);
   say("cmpLess",r.less);say("cmpEqual",r.equal);say("cmpGreater",r.greater);
   say("cmpFeedback","Porovnáváme dvoubitové hodnoty A="+a+" ("+a.toString(2).padStart(2,"0")+
       "₂), B="+b+" ("+b.toString(2).padStart(2,"0")+"₂). Právě jedna ze tří podmínek je pravdivá.");
 }
 el("cmpA").addEventListener("change",renderComparator);
 el("cmpB").addEventListener("change",renderComparator);
 renderComparator();

 const questions=[
  {id:"q1",correct:"b",yes:"Správně. Kombinační obvod nemá paměť. Skutečné hradlo potřebuje čas na ustálení.",no:"Kombinační obvod není řízen předchozím Q ani povinnou hodinovou hranou."},
  {id:"q2",correct:"a",yes:"Správně. Grayovo pořadí zajišťuje sousedství s jediným změněným bitem.",no:"K-mapě jde o sousedství v jednom bitu. Pořadí je 00,01,11,10."},
  {id:"q3",correct:"c",yes:"Správně. Poloviční sčítačka má S=A⊕B a C=A·B.",no:"Součet je XOR, přenos vznikne při současné jedničce na obou vstupech."},
  {id:"q4",correct:"b",yes:"Správně. S1S0=10₂ určuje datový vstup číslo 2.",no:"Adresní bity čteme jako binární index: 10₂ = 2."},
  {id:"q5",correct:"a",yes:"Správně. Majority tvoří tři dvouvstupové součiny AB, AC, BC.",no:"Majority není OR všech vstupů ani lichá parita."}
 ];
 const form=el("finalQuiz");
 form.addEventListener("submit",event=>{
   event.preventDefault();let points=0,filled=0;
   questions.forEach((q,i)=>{
     const choice=form.querySelector('input[name="'+q.id+'"]:checked'),out=el("quiz"+(i+1));
     if(!choice){out.textContent="Vyber jednu odpověď.";out.className="quiz-feedback";return;}
     filled++;const good=choice.value===q.correct;if(good)points++;
     out.textContent=good?q.yes:q.no;out.className="quiz-feedback "+(good?"is-correct":"is-wrong");
   });
   say("quizSummary","Správně "+points+"/"+questions.length+"; vyplněno "+filled+". U maturity vždy vysvětli důvod, ne pouze výsledek.");
 });
 form.addEventListener("reset",()=>{questions.forEach((q,i)=>say("quiz"+(i+1),""));say("quizSummary","");});
})();
