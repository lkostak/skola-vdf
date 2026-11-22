/* Jednotná maturitní lekce 02. Veškeré výpočty jsou v code-core.js. */
(function(){
"use strict";
var m=window.SkolaCodeModel;
if(!m){console.error("Chybí code-core.js");return;}
function el(id){return document.getElementById(id);}
function text(id,value){el(id).textContent=String(value);}
function czech(n){return new Intl.NumberFormat("cs-CZ",{maximumFractionDigits:2}).format(n);}
function button(id,fn){var item=el(id);if(item)item.addEventListener("click",fn);}
function error(id,e){text(id,"Pozor: "+e.message);}
function bcd(){
 try{
  var raw=el("bcdInput").value;
  var coded=m.encodeBCD(raw);
  var value=Number(raw);
  text("bcdResult",coded.groups);
  text("bcdBinary",value.toString(2));
  text("bcdFeedback","BCD ukládá "+coded.words.length+" jednotlivých číslic: "+coded.words.join(" | ")+". Přirozená dvojková reprezentace celé hodnoty "+value+" je "+value.toString(2)+"₂.");
 }catch(e){error("bcdFeedback",e);text("bcdResult","—");text("bcdBinary","—");}
}
button("bcdButton",bcd);button("bcdReset",function(){el("bcdInput").value="59";bcd();});
button("bcdCheck",function(){
 try{
  var candidate=el("bcdGroup").value.replace(/\s+/g,"");
  if(!/^[01]{4}$/.test(candidate))throw Error("Samostatné BCD slovo musí mít právě čtyři bity");
  var v=parseInt(candidate,2);
  text("bcdCheckFeedback",v<=9?"Platný BCD 8421 kód číslice "+v+".":"Neplatná číslice BCD 8421. Čtveřice "+candidate+" má přirozenou binární hodnotu "+v+", která není desítkovou číslicí 0–9.");
 }catch(e){error("bcdCheckFeedback",e);}
});
bcd();

var svgNS="http://www.w3.org/2000/svg";
var grayValue=7;
function circleSector(i,selected){
 var center=150,r=119,rInner=68,a=(i-4)*2*Math.PI/16,b=(i-3)*2*Math.PI/16;
 function p(radius,angle){return [center+radius*Math.cos(angle),center+radius*Math.sin(angle)];}
 var p1=p(rInner,a),p2=p(r,a),p3=p(r,b),p4=p(rInner,b);
 var d="M "+p1.join(" ")+" L "+p2.join(" ")+" A "+r+" "+r+" 0 0 1 "+p3.join(" ")+
   " L "+p4.join(" ")+" A "+rInner+" "+rInner+" 0 0 0 "+p1.join(" ")+" Z";
 var path=document.createElementNS(svgNS,"path");
 path.setAttribute("d",d);
 path.setAttribute("fill",selected?"#ffd400":i%2?"#006784":"#014355");
 path.setAttribute("stroke","#0b697e");
 path.setAttribute("stroke-width","1.3");
 path.setAttribute("aria-hidden","true");
 return path;
}
function renderGray(previous) {
 var value=grayValue;
 var root=el("wheelSectors");root.replaceChildren();
 for(var i=0;i<16;i++)root.appendChild(circleSector(i,i===value));
 text("wheelIndex",value);
 text("grayBinary",m.bits(value,4));text("grayResult",m.encodeGray(value,4));
 el("graySlider").value=String(value);
 if(previous!==null&&previous!==undefined&&previous!==value){
  var linear=m.hammingDistance(m.bits(previous,4),m.bits(value,4));
  var gray=m.hammingDistance(m.encodeGray(previous,4),m.encodeGray(value,4));
  var neighbors=Math.abs(previous-value)===1||(previous===15&&value===0)||(previous===0&&value===15);
  text("grayFeedback","Přechod "+previous+" → "+value+": binárně se změnilo "+linear+" bitů, v Grayově kódu "+gray+". "+
   (neighbors?"Jde o sousední sektory a Gray mění právě jeden bit.":"Jde o skok přes více sektorů, pravidlo jednoho bitu zde není zaručeno."));
 }else text("grayFeedback","Poloha "+value+": binární kód "+m.bits(value,4)+", Grayův kód "+m.encodeGray(value,4)+". Posuň polohu o jeden sektor.");
 var rows=el("grayTableBody");rows.replaceChildren();
 for(var j=0;j<16;j++){
  var tr=document.createElement("tr");if(j===value)tr.className="selected-row";
  var changed=j===0?"—":String(m.hammingDistance(m.encodeGray(j-1,4),m.encodeGray(j,4)));
  [String(j),m.bits(j,4),m.encodeGray(j,4),changed].forEach(function(t){var td=document.createElement("td");td.textContent=t;tr.appendChild(td);});
  rows.appendChild(tr);
 }
}
el("graySlider").addEventListener("input",function(v){var before=grayValue;grayValue=Number(v.target.value);renderGray(before);});
button("grayPrev",function(){var before=grayValue;grayValue=(grayValue+15)%16;renderGray(before);});
button("grayNext",function(){var before=grayValue;grayValue=(grayValue+1)%16;renderGray(before);});
button("grayReset",function(){grayValue=7;renderGray(null);});
renderGray(null);

function ascii(){
 try{
  var cells=m.asciiCodes(el("asciiInput").value),rows=el("asciiRows");rows.replaceChildren();
  cells.forEach(function(x){var tr=document.createElement("tr");[x.char,x.decimal,x.hex,x.bits].forEach(function(t){var td=document.createElement("td");td.textContent=String(t);tr.appendChild(td);});rows.appendChild(tr);});
  text("asciiFeedback","Výsledný hexadecimální text: "+cells.map(function(x){return x.hex;}).join(" ")+". Znak a číselná hodnota nejsou totéž.");
 }catch(e){error("asciiFeedback",e);el("asciiRows").replaceChildren();}
}
button("asciiButton",ascii);button("asciiReset",function(){el("asciiInput").value="A0";ascii();});ascii();

function unicode(){
 try{
  var value=el("utfInput").value;
  var bytes=m.utf8Bytes(value);
  text("utfCount",bytes.length);text("utfHex",m.byteHex(bytes));
  text("utfFeedback","Text má "+Array.from(value).length+" znakových kódových bodů a "+bytes.length+" bajtů UTF-8. U kombinovaných znaků se počet uživatelsky viditelných znaků může lišit.");
 }catch(e){error("utfFeedback",e);text("utfCount","—");text("utfHex","—");}
}
button("utfButton",unicode);button("utfReset",function(){el("utfInput").value="Čaj";unicode();});unicode();

var parityOriginal="";
var parityKind="even";
function showParity(){
 try{
  var data=el("parityInput").value,type=el("parityKind").value;
  var p=m.parity(data,type);
  parityOriginal=p.codeword;parityKind=type;
  text("parityBit",p.parityBit);
  text("parityWord",p.codeword);
  text("parityFeedback","Datová jednička se vyskytuje "+p.ones+"×, pro "+(type==="even"?"sudou":"lichou")+" paritu přidáme "+p.parityBit+". Přijaté slovo v této podobě projde kontrolou.");
 }catch(e){error("parityFeedback",e);text("parityBit","—");text("parityWord","—");parityOriginal="";}
}
function flip(n){
 if(!parityOriginal){text("parityFeedback","Nejdřív zakóduj platná data.");return;}
 var chars=parityOriginal.split("");
 for(var i=0;i<n&&i<chars.length;i++)chars[i]=chars[i]==="0"?"1":"0";
 var mutated=chars.join(""),okay=m.parityValid(mutated,parityKind);
 text("parityWord",mutated);
 text("parityFeedback","Přijato s "+n+" změněnými "+(n===1?"bitem":"bity")+": "+mutated+". Kontrola "+(okay?"PROŠLA i přes chybu. Parita není dostatečná pro všechny vícebitové chyby.":"NEPROŠLA, chyba je rozpoznána.")+" Po resetu se vrátíš k původním datům.");
}
button("parityButton",showParity);button("flipOne",function(){flip(1);});button("flipTwo",function(){flip(2);});
button("parityReset",function(){el("parityInput").value="1010110";el("parityKind").value="even";showParity();});showParity();
function imageSize(){
 try{
  function integral(id){var v=el(id).value.trim();if(!v)throw Error("Vyplň všechny vstupy");return Number(v);}
  var bytes=m.imageRaw(integral("imageW"),integral("imageH"),integral("imageBits"));
  text("imageOutput",czech(bytes)+" B (≈ "+czech(bytes/1024)+" KiB)");
  text("mediaFeedback","Jde o nekomprimované pixely bez souborové hlavičky a metadat.");
 }catch(e){error("mediaFeedback",e);text("imageOutput","—");}
}
function audioSize(){
 try{
  if(!el("audioSeconds").value.trim())throw Error("Doplň délku zvuku");
  var bytes=m.audioPcm(Number(el("audioRate").value),Number(el("audioBits").value),Number(el("audioChannels").value),Number(el("audioSeconds").value));
  text("audioOutput",czech(bytes)+" B (≈ "+czech(bytes/1024/1024)+" MiB)");
  text("mediaFeedback","Jde o nekomprimované PCM bez hlavičky a doplňkových metadat.");
 }catch(e){error("mediaFeedback",e);text("audioOutput","—");}
}
button("imageCalculate",imageSize);button("audioCalculate",audioSize);imageSize();audioSize();

var questions=[
 {name:"q1",correct:"b",right:"Správně. BCD 8421 zapisuje každou desítkovou číslici vlastní čtveřicí.",wrong:"BCD 59 je 0101 1001. Přirozený binární zápis celé hodnoty 59 je 111011."},
 {name:"q2",correct:"a",right:"Správně. Na hranici sousedních sektorů se mění jediný bit.",wrong:"Grayův kód neodstraňuje všechny chyby a ani neznamená kratší zápis. Jeho vlastností je jedno změněné bitové místo mezi sousedními stavy."},
 {name:"q3",correct:"b",right:"Správně. U+010C je kódový bod Č a C4 8C jsou UTF-8 bajty tohoto znaku.",wrong:"Unicode kódový bod a UTF-8 bajtová sekvence jsou dvě související, ale rozdílné věci."},
 {name:"q4",correct:"a",right:"Správně. Změna jediného bitu změní paritu počtu jedniček.",wrong:"Parita umí spolehlivě detekovat lichý počet změněných bitů, ale ne všechna dvoubitová poškození a sama neopravuje."}
];
var form=el("finalQuiz");
form.addEventListener("submit",function(evt){evt.preventDefault();var score=0,answered=0;
 questions.forEach(function(q,i){
  var sel=form.querySelector('input[name="'+q.name+'"]:checked'),destination=el("quiz"+(i+1));
  if(!sel){destination.textContent="Tuto otázku zatím nemáš zodpovězenou.";destination.className="quiz-feedback";return;}
  answered++;var ok=sel.value===q.correct;if(ok)score++;
  destination.textContent=ok?q.right:q.wrong;destination.className="quiz-feedback "+(ok?"is-correct":"is-wrong");
 });
 text("quizSummary","Správně "+score+" ze "+questions.length+" otázek, vyplněno "+answered+". Důležité je umět odpovědi vysvětlit vlastními slovy.");
});
form.addEventListener("reset",function(){questions.forEach(function(q,i){el("quiz"+(i+1)).textContent="";});text("quizSummary","");});
})();
