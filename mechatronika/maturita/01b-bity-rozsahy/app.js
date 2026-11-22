/* Otázka 01B. Všechny číselné operace používají assets/js/number-core.js. */
(function(){
"use strict";
var model=window.SkolaNumberModel;
if(!model){console.error("Chybí number-core.js");return;}
function el(id){return document.getElementById(id);}
function text(id,val){el(id).textContent=String(val);}
function nice(n){return n.toLocaleString("cs-CZ");}
function widthChange(){
  var bits=Number(el("widthSelect").value),range=model.unsignedRange(bits);
  text("rangeBits",range.bits);text("rangeCount",nice(range.count));
  text("rangeMax",nice(range.max));
  text("rangeFeedback",bits+" bitů dovoluje "+nice(range.count)+" kombinací (2^"+bits+"), neznaménkový rozsah je 0 až "+nice(range.max)+".");
}
el("widthSelect").addEventListener("change",widthChange);widthChange();
function sumChange(){
  try{
    if(el("addA").value.trim()===""||el("addB").value.trim()==="") throw Error("Vyplň oba celé osmibitové operandy");
    var a=Number(el("addA").value),b=Number(el("addB").value),r=model.add8(a,b);
    text("sumMath",r.sum);text("sumStored",r.stored);text("sumCarry",r.carry?1:0);
    text("addFeedback",r.carry?
      "Výsledek "+r.sum+" je větší než 255. Do 8bitového registru se uloží "+r.stored+" a přenos mimo nejvyšší bit je 1.":
      "Součet "+r.sum+" se do osmi bitů vejde. Přenos mimo nejvyšší bit je 0.");
  }catch(e){text("addFeedback",e.message);["sumMath","sumStored","sumCarry"].forEach(function(id){text(id,"—");});}
}
el("addButton").addEventListener("click",sumChange);sumChange();
function signedChange(){
  try{
    var input=Number(el("signedInput").value);
    if(!el("signedInput").value.trim()) throw Error("Zadej celé číslo");
    var stored=model.encodeTwos(input,8);
    text("signedBits",stored.toString(2).padStart(8,"0"));
    text("signedUnsigned",stored);
    text("signedSigned",(input<0?"−":"")+Math.abs(input));
    text("signedFeedback","Bitový vzor "+stored.toString(2).padStart(8,"0")+"₂ lze podle typu dat číst jako "+
      stored+" unsigned, nebo jako "+input+" v 8bitovém dvojkovém doplňku.");
  }catch(e){text("signedFeedback",e.message);["signedBits","signedUnsigned","signedSigned"].forEach(function(id){text(id,"—");});}
}
el("signedButton").addEventListener("click",signedChange);signedChange();
// Osmibitový registr a maska se vždy počítají z jednoho čísla.
var word=0xB5;
function renderWord(){
  var root=el("bitControls");root.replaceChildren();
  for(var index=7;index>=0;index--){
    (function(i){
      var value=(word>>i)&1,button=document.createElement("button");
      button.type="button";button.className="bit-button"+(value?" bit-on":"");
      button.setAttribute("aria-pressed",value?"true":"false");
      button.setAttribute("aria-label","Bit b"+i+" (váha "+2**i+") nyní "+value+", přepnout");
      var indexEl=document.createElement("small");indexEl.textContent="b"+i;
      var valueEl=document.createElement("strong");valueEl.textContent=String(value);
      var weightEl=document.createElement("span");weightEl.textContent=String(2**i);
      button.append(indexEl,valueEl,weightEl);
      button.addEventListener("click",function(){word=model.bitSet(word,i);renderWord();});
      root.appendChild(button);
    })(index);
  }
  text("registerBin",word.toString(2).padStart(8,"0"));
  text("registerHex",word.toString(16).toUpperCase().padStart(2,"0"));
  text("registerDec",word);
  var signed=model.asSigned(word,8);
  text("registerSigned",(signed<0?"−":"")+Math.abs(signed));
  var ix=Number(el("maskIndex").value),result=model.maskTest(word,ix);
  text("maskFeedback","Test b"+ix+": maska "+result.mask.toString(16).toUpperCase().padStart(2,"0")+
    "₁₆ (binárně "+result.mask.toString(2).padStart(8,"0")+"). Bit je "+(result.active?"NASTAVEN (1).":"VYPNUT (0)."));
}
el("maskIndex").addEventListener("change",renderWord);
el("bitsReset").addEventListener("click",function(){word=0xB5;renderWord();});
renderWord();
var quiz=[
  {name:"q1",correct:"b",yes:"Správně. 2¹⁰ = 1024 kombinací, ale maximum unsigned je 1023.",no:"Nezaměňuj počet stavů s nejvyšším číslem. Je 1024 stavů od 0 do 1023."},
  {name:"q2",correct:"a",yes:"Správně. Stejné bity můžeme interpretovat různě podle datového typu.",no:"V osmibitovém dvojkovém doplňku je hodnota nad 127 záporná. 230 − 256 = −26."},
  {name:"q3",correct:"c",yes:"Správně. 260 modulo 256 je 4 a přenos je 1.",no:"Do osmi bitů se 260 nevejde. Uloží se nižších osm bitů výsledku, tedy 4, a vznikne přenos."}
];
var form=el("numberQuiz");
form.addEventListener("submit",function(ev){
  ev.preventDefault();var correct=0,answered=0;
  quiz.forEach(function(item,i){
    var choice=form.querySelector('input[name="'+item.name+'"]:checked'),dest=el("ans"+(i+1));
    if(!choice){dest.textContent="Tato otázka zatím nemá odpověď.";dest.className="quiz-feedback";return;}
    answered++;var ok=choice.value===item.correct;if(ok)correct++;
    dest.textContent=ok?item.yes:item.no;dest.className="quiz-feedback "+(ok?"is-correct":"is-wrong");
  });
  text("quizResult","Správně "+correct+" z "+quiz.length+". Vyplněno "+answered+
    ". U maturity vždy vysvětli i svůj postup.");
});
form.addEventListener("reset",function(){quiz.forEach(function(item,i){el("ans"+(i+1)).textContent="";});text("quizResult","");});
})();