/* Otazka 06. Vypocty jsou vyhradne v sequential-blocks-core.js. */
(function(){
"use strict";
const m=window.SkolaSequentialModel;if(!m){console.error("Chybi sequential-blocks-core.js");return;}
const el=id=>document.getElementById(id);
const say=(id,value)=>{const e=el(id);if(e)e.textContent=String(value);};
const on=(id,fn)=>el(id).addEventListener("click",fn);
const td=(tr,value,tag="td")=>{const cell=document.createElement(tag);cell.textContent=String(value);tr.appendChild(cell);return cell;};
const validInt=(id,min,max)=>{const s=el(id).value;if(!s.trim())throw Error("Vyplň celé číslo");const v=Number(s);if(!Number.isInteger(v)||v<min||v>max)throw Error("Povolený rozsah je "+min+" až "+max);return v;};

// 4bitovy registr
let register=11,registerEdge=0,registerHistory=[{edge:0,action:"Výchozí",bits:m.bits(11),output:"—"}];
function showRegister(){
 const root=el("registerBits");root.replaceChildren();
 m.bits(register).split("").forEach((value,i)=>{
   const card=document.createElement("div");
   const small=document.createElement("small");small.textContent="b"+(3-i);
   const strong=document.createElement("strong");strong.textContent=value;
   card.append(small,strong);root.appendChild(card);
 });
 say("regDecimal",register);say("regBinary",m.bits(register));
 const history=el("registerHistory");history.replaceChildren();
 registerHistory.slice(-12).forEach(x=>{const tr=document.createElement("tr");[x.edge,x.action,x.bits,x.output].forEach(v=>td(tr,v));history.appendChild(tr);});
}
function regStep(action){
 try{
  const load=validInt("registerLoad",0,15),serial=Number(el("registerSerial").value);
  const result=m.registerStep(register,action,{width:4,serial,load});
  register=result.after;registerEdge++;
  const output=result.output===null?"—":result.output;
  registerHistory.push({edge:registerEdge,action,bits:m.bits(register),output});
  say("regOutput",output);
  say("regFeedback",action+": "+result.beforeBits+" → "+result.afterBits+
    (result.output===null?".":"; z původního kraje vystoupil bit "+result.output+".")+
    (action==="ROL"||action==="ROR"?" Odcházející bit se současně vrací na druhý kraj.":""));
  showRegister();
 }catch(err){say("regFeedback","Pozor: "+err.message);}
}
[["regLoad","LOAD"],["regHold","HOLD"],["regSHL","SHL"],["regSHR","SHR"],["regROL","ROL"],["regROR","ROR"],["regClear","CLEAR"]].forEach(([id,action])=>on(id,()=>regStep(action)));
on("regReset",()=>{
 register=11;registerEdge=0;registerHistory=[{edge:0,action:"Výchozí",bits:m.bits(11),output:"—"}];
 el("registerLoad").value="11";el("registerSerial").value="0";say("regOutput","—");
 say("regFeedback","Obnoven čtyřbitový vzor 1011.");showRegister();
});
showRegister();

// SIPO 1 0 1 1, aktualni vsechny vystupy se prevezmou soucasne.
const sipoInput=[1,0,1,1];let sipoIndex=0,sipo=0;
function renderSipo(){
 const root=el("sipoWave");root.replaceChildren();
 const arr=[{edge:0,serial:"—",bits:"0000"}];
 let value=0;
 for(let i=0;i<sipoIndex;i++){
   value=m.registerStep(value,"SHL",{width:4,serial:sipoInput[i]}).after;
   arr.push({edge:i+1,serial:sipoInput[i],bits:m.bits(value)});
 }
 const table=document.createElement("table");table.className="seq-table";
 const head=document.createElement("thead"),tr=document.createElement("tr");
 ["Hrana ↑","SI","Q3","Q2","Q1","Q0"].forEach(x=>td(tr,x,"th"));head.appendChild(tr);table.appendChild(head);
 const body=document.createElement("tbody");arr.forEach(row=>{
   const line=document.createElement("tr");
   [row.edge,row.serial,...row.bits].forEach(v=>td(line,v));body.appendChild(line);
 });table.appendChild(body);root.appendChild(table);
 say("sipoFeedback",sipoIndex<4?
 "Po "+sipoIndex+" hranách je uložené "+m.bits(sipo)+". Příští sériový bit: "+sipoInput[sipoIndex]+".":
 "Po čtyřech hranách je v registru 1011. Každý bit potřeboval odpovídající hranu.");
 el("sipoStep").disabled=sipoIndex>=4;
}
on("sipoStep",()=>{if(sipoIndex<4){sipo=m.registerStep(sipo,"SHL",{width:4,serial:sipoInput[sipoIndex]}).after;sipoIndex++;renderSipo();}});
on("sipoReset",()=>{sipo=0;sipoIndex=0;renderSipo();});renderSipo();

// Citac, cely hodinovy sled. Reset/Load jsou v teto interakci skutecne povely.
let counter=0,counterEnable=1,counterEdge=0,counterLog=[{edge:"START",value:0,flags:"—"}];
function configCounter(){return {modulus:Number(el("counterMod").value),direction:el("counterDirection").value};}
function renderCounter(){
 const {modulus}=configCounter(),width=m.requiredBits(modulus);
 say("counterNumber",counter);
 const root=el("counterBits");root.replaceChildren();
 counter.toString(2).padStart(width,"0").split("").forEach((v,i)=>{const span=document.createElement("span");span.textContent="b"+(width-1-i)+": "+v;root.appendChild(span);});
 say("counterEnable","EN="+counterEnable);
 el("counterEnable").setAttribute("aria-pressed",counterEnable?"true":"false");
 const history=el("counterHistory");history.replaceChildren();
 counterLog.slice(-15).forEach(x=>{
   const tr=document.createElement("tr");
   [x.edge,x.value,x.value.toString(2).padStart(width,"0"),x.flags].forEach(v=>td(tr,v));
   history.appendChild(tr);
 });
 el("counterLoad").max=String(modulus-1);
}
function counterOp(action){
 const cfg=configCounter();
 try{
  let r,desc="";
  if(action==="CLOCK"){
    r=m.counterStep(counter,{...cfg,event:Boolean(counterEnable)});
    counterEdge++;
    desc=r.carry?"PŘENOS: přechod z posledního stavu na 0.":r.borrow?"PODTEČENÍ: přechod z 0 na poslední stav.":counterEnable?"Čítač přešel na další stav.":"EN=0, stav se nemění.";
    counterLog.push({edge:counterEdge,value:r.after,flags:r.carry?"Přenos":r.borrow?"Podtečení":"—"});
  }else if(action==="LOAD"){
    r=m.counterStep(counter,{...cfg,event:false,load:validInt("counterLoad",0,cfg.modulus-1)});
    desc="LOAD načetl hodnotu "+r.after+". V reálném obvodu je nutné určit, zda LOAD probíhá synchronně.";
    counterLog.push({edge:"LOAD",value:r.after,flags:"—"});
  }else{
    r=m.counterStep(counter,{...cfg,event:false,reset:true});
    desc="RESET nastavil stav 0. Model ukazuje účinek povelu; fyzickou polaritu a časování určuje realizace.";
    counterLog.push({edge:"RESET",value:r.after,flags:"—"});
  }
  counter=r.after;renderCounter();
  say("counterFeedback",desc+" Modulo "+cfg.modulus+", směr "+cfg.direction+".");
 }catch(err){say("counterFeedback","Pozor: "+err.message);}
}
on("counterTick",()=>counterOp("CLOCK"));on("counterLoadButton",()=>counterOp("LOAD"));on("counterReset",()=>counterOp("RESET"));
on("counterEnable",()=>{counterEnable=1-counterEnable;renderCounter();});
["counterMod","counterDirection"].forEach(id=>el(id).addEventListener("change",()=>{
 counter=0;counterEdge=0;counterEnable=1;counterLog=[{edge:"START",value:0,flags:"—"}];
 el("counterLoad").value="0";renderCounter();
 say("counterFeedback","Konfigurace změněna; čítač začíná v nule.");
}));
renderCounter();

// Presna postupna prechodova posloupnost ripple u 0111->1000
on("rippleShow",()=>{
 const example=m.rippleTransition(7,4),body=el("rippleRows");body.replaceChildren();
 example.stages.forEach((row,i)=>{
   const tr=document.createElement("tr");
   [row.stage,row.bits,row.value].forEach(x=>td(tr,x));
   if(i>0&&i<example.stages.length-1)tr.className="transient-row";
   body.appendChild(tr);
 });
 say("rippleFeedback","Počáteční 0111 a konečné 1000, mezistavy jsou možné během postupného přepínání "+
     "v našem modelu. Nejde o skutečné nanosekundové průběhy všech zapojení čítačů 7493.");
});

// Frekvencni deleni.
function renderFrequency(){
 try{
  const hz=validInt("frequencyInput",1,1000000),root=el("frequencyOutput");
  root.replaceChildren();
  [0,1,2,3].forEach(i=>{
    const d=document.createElement("div"),label=document.createElement("small"),value=document.createElement("strong");
    label.textContent="Q"+i+" · ÷"+(2**(i+1));
    value.textContent=(hz/(2**(i+1))).toLocaleString("cs-CZ",{maximumFractionDigits:3})+" Hz";
    d.append(label,value);root.appendChild(d);
  });
  say("frequencyFeedback","Pravidelný 4bitový binární čítač bez zkráceného cyklu. Vstupní CLK = "+hz+" Hz.");
 }catch(err){say("frequencyFeedback","Pozor: "+err.message);}
}
on("frequencyButton",renderFrequency);renderFrequency();

// CTU: vyjadreni trvaleho CU=1 nevyvolava dalsi nabeznou hranu.
let ctu={cv:0,prevCU:0,q:0,counted:false};
function preset(){return validInt("ctuPreset",1,999);}
function updateCTU(cu,reset){
 try{
  ctu=m.ctuStep(ctu,{cu,reset,preset:preset()});displayCTU();
 }catch(err){say("ctuFeedback","Pozor: "+err.message);}
}
function displayCTU(){
 let p;try{p=preset();}catch(err){say("ctuFeedback",err.message);return;}
 ctu.q=Number(ctu.cv>=p);
 say("ctuValue",ctu.cv);say("ctuTarget",p);say("ctuDone",ctu.q);
 say("ctuFeedback",ctu.counted?"Zachycena náběžná hrana CU; CV se zvýšilo na "+ctu.cv+".":
   "Bez nové náběžné hrany se CV nemění. CU je "+ctu.prevCU+
   ". Výstup Q="+ctu.q+" pro PV="+p+".");
}
on("ctuPulse",()=>{ // 0 -> 1 -> 0. Rychle modelujeme dva oddelene okamziky.
  try {
    let p=preset();
    ctu=m.ctuStep(ctu,{cu:0,preset:p});
    ctu=m.ctuStep(ctu,{cu:1,preset:p});
    const counted=ctu.counted;
    ctu=m.ctuStep(ctu,{cu:0,preset:p});
    ctu.counted=counted;displayCTU();
  }catch(err){say("ctuFeedback","Pozor: "+err.message);}
});
on("ctuHold",()=>updateCTU(1,false));on("ctuRelease",()=>updateCTU(0,false));
on("ctuReset",()=>{updateCTU(0,true);});
el("ctuPreset").addEventListener("change",displayCTU);displayCTU();

// Závěrečný test nyní spravuje guide.js. Původní simulace výše zůstávají beze změny.
})();