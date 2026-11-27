/* Maturita 06: samostatný krokový průvodce, bez API nebo přihlašování. */
(function(){
"use strict";
const root=document.getElementById("rychlokurz");
if(!root)return;
const byId=id=>document.getElementById(id);
const steps=[
 {name:"Klopný obvod a registr",minutes:"2 min",title:"Čtyři bity si pamatují číslo",
  text:["Jeden <strong>klopný obvod</strong> si uchová jeden bit: 0 nebo 1. Když vedle sebe zapojíme čtyři klopné obvody D, dostaneme <strong>čtyřbitový registr</strong>. Může uchovat například číslo <code>1011</code>.","Registr nemusí hned převzít každou změnu na vstupu. U běžného hranově řízeného registru se nové vstupy převezmou až při příslušné hodinové hraně <strong>CLK</strong>."],
  question:"Na vstupech se změnilo 1011 na 0100, ale další aktivní hrana CLK ještě nepřišla. Co ukazuje výstup registru?",
  choices:["Stále 1011","Už 0100","Automaticky 0000"],correct:0,
  wrong:"Registr drží starý stav, dokud nepřijde rozhodná hodinová hrana. Změna samotných vstupů ještě uložená data nemění.",
  right:"Správně! Výstup zůstává 1011. Nová hodnota 0100 se převezme až při další aktivní hraně CLK.",
  lesson:"Registr je několik paměťových buněk. Změna vstupu ještě nemusí znamenat změnu uloženého stavu."},
 {name:"Hodiny a načítání",minutes:"2 min",title:"Kdy se nová hodnota opravdu uloží?",
 text:["Vstupy registru mohou být připravené dopředu, ale paměť se mění až při <strong>aktivní hraně hodin CLK</strong>. U běžného D klopného obvodu se tehdy převezme D na Q.","Registr může mít navíc řízení: při <strong>LOAD</strong> si na hraně převezme vstupní číslo; při <strong>HOLD</strong> si původní číslo ponechá i při příchodu dalšího taktu. To je užitečné, když potřebujeme data chvíli udržet."],
 question:"Registr ukazuje 1011, na vstupech je 0100. Co bude na Q po hodinové hraně, pokud je aktivní LOAD?",
 choices:["Stále 1011","0100","0000"],correct:1,
 wrong:"LOAD znamená načíst nové vstupy. Při aktivní hraně CLK se 0100 uloží do registru. Při HOLD by zůstalo 1011.",
 right:"Ano. LOAD při aktivní hodinové hraně převezme vstupy 0100. Při HOLD by zůstalo 1011.",
 lesson:"Hodiny určují okamžik změny; LOAD povoluje načtení, HOLD uchová starý stav."},
 {name:"Posuv bitů",minutes:"2 min",title:"Jak bity putují registrem",
  text:["<strong>Posuvný registr</strong> kromě uchovávání dat dokáže bity přesouvat mezi sousedními pozicemi. Při každém hodinovém impulsu se posunou o jedno místo.","Při posuvu doleva <strong>SHL</strong> odchází levý bit a zprava přichází nový bit (v našem příkladu nula). Při posuvu doprava <strong>SHR</strong> je to obráceně."],
  question:"Co vznikne z 1011 po jednom posuvu doprava (SHR), když zleva doplníme nulu?",
  choices:["0110","0101","1101"],correct:1,
  wrong:"Při SHR jde každý bit o jednu pozici doprava: 1 0 1 1 → 0 1 0 1. Zleva vstupuje nula.",
  right:"Přesně. 1011 → 0101. Pravá jednička vypadla a zleva přišla nula.",
  lesson:"SHL a SHR jsou posuvy. Bit opouštějící kraj se v jednoduchém logickém posuvu nevrací zpět."},
 {name:"Posuv versus rotace",minutes:"2 min",title:"Při rotaci se bit neztratí",
  text:["Při obyčejném posuvu krajní bit vypadne. <strong>Rotace</strong> funguje jinak: bit, který opouští jeden konec registru, se vrátí na konec opačný.","Zkus čtyři operace na stejném čísle <code>1011</code>. Pro tento příklad mají SHL a SHR nulový vstup. Všimni si rozdílu mezi <strong>ROL</strong> a <strong>ROR</strong>."],
  question:"Jaký bude výsledek jedné rotace DOLEVA (ROL) hodnoty 1011?",
  choices:["0111","1101","0110"],correct:0,
  wrong:"Při ROL se levý bit (1) přesune na pravý konec. Zbylé bity se posunou doleva: 1011 → 0111.",
  right:"Ano! 1011 → 0111. Pro srovnání: rotace doprava (ROR) by dala 1101.",
  lesson:"SHL/SHR bit mohou zahodit, ROL/ROR jej vracejí na druhý konec."},
 {name:"Sériově a paralelně",minutes:"3 min",title:"Data po jednom bitu nebo všechna naráz",
  text:["<strong>Paralelně</strong> znamená, že více bitů přichází nebo odchází současně. <strong>Sériově</strong> znamená jeden bit po druhém. Posuvný registr dokáže tyto způsoby propojit.","Typ <strong>SIPO</strong> (serial in, parallel out) bere bity postupně a po několika hodinových hranách je nabídne společně na výstupech. Vyzkoušej vstupní posloupnost 1, 0, 1, 1. V naší ukázce nový bit vstupuje na pravý kraj."],
  question:"Do čtyřbitového SIPO registru přijdou postupně bity 1 a 0. Jaký je stav po dvou hranách, jestliže začínal na 0000?",
  choices:["0001","0010","1010"],correct:1,
  wrong:"Po prvním bitu 1 je v registru 0001. Při další hraně se 1 posune doleva a zprava přijde 0, takže stav je 0010.",
  right:"Ano, po dvou hranách máme 0010. Po všech čtyřech bitech 1,0,1,1 vznikne 1011.",
  lesson:"SISO: sériově dovnitř i ven. SIPO: sériově dovnitř, paralelně ven. PISO znamená paralelní načtení a sériový výstup, PIPO paralelní vstup i výstup."},
 {name:"Časový diagram",minutes:"3 min",title:"Jak čteme změny bitů v čase?",
 text:["Časový diagram ukazuje, co bylo na vstupu <strong>SI</strong> a co bylo uloženo na výstupech <strong>Q</strong> po jednotlivých hodinových hranách. Mezi hranami se u hranově řízeného registru stav nemění.","Zkus znovu SIPO se vstupními bity <code>1, 0, 1, 1</code>. Vždy stiskni jednu hranu CLK a sleduj řádek tabulky. Při jediné hraně se všechny klopné obvody aktualizují ze <strong>starých</strong> hodnot, takže bit neproběhne celým registrem najednou."],
 question:"Do SIPO přijdou postupně bity 1, 0, 1. Jaký je uložený stav PO TŘETÍ aktivní hraně?",
 choices:["0101","1010","0010"],correct:0,
 wrong:"Vývoj je 0000 → 0001 → 0010 → 0101. Pokaždé se staré bity posunou doleva a nový bit přijde zprava.",
 right:"Správně, po třetí hraně je 0101. Teprve čtvrtá hrana s poslední jedničkou dá 1011.",
 lesson:"V časovém diagramu rozhoduje okamžik hodinové hrany a stav až po ní."},
 {name:"Z registru čítač",minutes:"2 min",title:"Čítač při impulsu změní číslo",
  text:["U registru jsme uchovávali nebo posouvali bity. <strong>Čítač</strong> také používá paměťové buňky, ale má navíc logiku, která určuje následující číslo.","Při každé aktivní hraně hodin se například zvýší o jedničku. Číslo <code>0011</code> znamená 3 a následující <code>0100</code> znamená 4. Bity se při tom neposouvají, vytvářejí nový binární zápis."],
  question:"Co ukazuje binární čítač po jednom impulsu, když před ním ukazoval 0011?",
  choices:["0100","0110","0010"],correct:0,
  wrong:"0011 je desítkově 3. Další číslo je 4, binárně 0100.",
  right:"Správně: 0011 (3) → 0100 (4). To je srdce binárního čítače.",
  lesson:"Registr drží nebo přesouvá data; čítač prochází číselné stavy."},
 {name:"Přetečení",minutes:"2 min",title:"Co se stane po posledním čísle?",
  text:["Čtyřbitový čítač může vyjádřit <strong>16 stavů</strong>: od <code>0000</code> (0) do <code>1111</code> (15). Proč právě 16? Každý ze čtyř bitů má dvě možnosti: 2 × 2 × 2 × 2 = 16.","Když přijde další impuls po čísle 15, běžný čtyřbitový binární čítač začne od nuly. Tomu říkáme <strong>přetečení</strong>."],
  question:"Čtyřbitový binární čítač ukazuje 1111. Co bude po dalším impulsu?",
  choices:["1110","0000","10000"],correct:1,
  wrong:"1111 je nejvyšší čtyřbitové číslo. Do čtyř bitů se 16 nevejde, proto se čítač vrátí na 0000.",
  right:"Přesně. 1111 → 0000. Čítač přetekl a začíná nový cyklus.",
  lesson:"Plný čtyřbitový binární čítač má 2⁴ = 16 stavů, tedy 0 až 15."},
 {name:"Binární a dekadický",minutes:"2 min",title:"Někdy počítáme do 15, jindy do 9",
  text:["<strong>Binární čtyřbitový čítač</strong> prochází 16 stavy: 0, 1, …, 15, 0. <strong>Dekadický čítač</strong> prochází jen deseti stavy: 0, 1, …, 9, 0.","Tomuto počtu opakujících se stavů říkáme <strong>modulo</strong>. Modulo 16 má 16 stavů, modulo 10 deset, modulo 5 pět. Neříká nám to samo o sobě počet použitých klopných obvodů."],
  question:"Dekadický čítač právě ukazuje 1001 (9). Co zobrazí po dalším impulsu?",
  choices:["1010","1111","0000"],correct:2,
  wrong:"Dekadický čítač má jen hodnoty 0 až 9. Po devítce se vrací na nulu, ačkoli čtyři bity by zvládly i další čísla.",
  right:"Správně. 1001 → 0000. To je rozdíl proti čtyřbitovému čítači modulo 16.",
  lesson:"Modulo říká, kolika stavy čítač prochází, než začne znovu."},
 {name:"Zkrácený cyklus",minutes:"2 min",title:"Počítat můžeme i jen do čtyř",
 text:["Čítač <strong>modulo 5</strong> prochází pěti hodnotami: 0 → 1 → 2 → 3 → 4 → 0. Takový cyklus se hodí například pro počítání skupin po pěti kusech.","Kolik bitů potřebuje? Dva bity by zvládly jen čtyři kombinace (00 až 11). Proto potřebujeme <strong>nejméně tři bity</strong>. Část jejich možných kombinací ale nepoužijeme."],
 question:"Kolik klopných obvodů (bitů) nejméně potřebuje čítač modulo 5?",
 choices:["2","3","5"],correct:1,
 wrong:"Dva bity dají 2² = 4 stavy, to nestačí. Tři bity dají 2³ = 8 kombinací, tedy pět požadovaných stavů už pokryjí.",
 right:"Přesně. Modulo 5 znamená pět stavů, ale stačí tři klopné obvody, nikoli pět.",
 lesson:"Počet stavů modulo M a počet potřebných bitů jsou dvě různé věci."},
 {name:"Směr a povely",minutes:"3 min",title:"Čítač můžeme řídit",
 text:["Čítač nemusí jen počítat nahoru. Režim <strong>UP</strong> přičítá a režim <strong>DOWN</strong> odečítá. Na tlačítkách si to vyzkoušej.","<strong>ENABLE</strong> povoluje počítání, <strong>RESET</strong> obvykle vynuluje uložený stav a <strong>LOAD</strong> načte zadanou hodnotu. U skutečných obvodů záleží na typu, zda tyto povely působí ihned nebo až při hodinové hraně; zde jsou to didaktické povely."],
 question:"Čítač ukazuje 0101 (5), ale ENABLE = 0. Co udělá s hodnotou další běžný čítací impuls?",
 choices:["Zvýší ji na 6","Sníží ji na 4","Zůstane na 5"],correct:2,
 wrong:"ENABLE = 0 znamená, že počítání není povolené. Čítač uložené číslo drží; RESET nebo LOAD jsou odlišné povely.",
 right:"Ano. Když ENABLE = 0, běžný čítací impuls stav nezmění.",
 lesson:"UP/DOWN určuje směr, ENABLE povolení, RESET nulování a LOAD přednastavení."},
 {name:"Synchronní a asynchronní",minutes:"2 min",title:"Kdy se jednotlivé bity přepínají?",
  text:["U <strong>synchronního čítače</strong> mají všechny klopné obvody společný hodinový signál. Na téže aktivní hraně se podle řídicí logiky určí jejich nové hodnoty.","U <strong>asynchronního (ripple) čítače</strong> se změna šíří postupně: jeden stupeň přepne další. Proto se během přechodu mohou krátce objevit přechodné kombinace. Není nutné se zatím učit detailní nanosekundové průběhy."],
  question:"Který čítač používá jednu společnou aktivní hodinovou hranu pro všechny stupně?",
  choices:["Asynchronní (ripple)","Synchronní","Žádný z nich"],correct:1,
  wrong:"Slovo synchronní znamená společné časování. Ripple čítač naopak přenáší spouštění z jednoho stupně do dalšího.",
  right:"Správně. Synchronní čítač řídí všechny stupně společnou hodinovou hranou.",
  lesson:"Synchronní = společný CLK. Asynchronní ripple = přepínání se šíří postupně."},
 {name:"Dělení frekvence",minutes:"2 min",title:"Čítač může zpomalit pravidelný signál",
  text:["Nejnižší bit běžného binárního čítače střídá 0 a 1 při každém impulsu. Celý cyklus 0 → 1 → 0 proto trvá dva vstupní impulsy: jeho frekvence je <strong>poloviční</strong>.","U plného binárního čítače pak platí: Q0 = f/2, Q1 = f/4, Q2 = f/8, Q3 = f/16. Pozor, pro zkrácené čítače modulo 5 nebo 10 nemusí platit takto jednoduchá interpretace všech výstupů."],
  question:"Čtyřbitový binární čítač má vstupní takt 160 Hz. Jakou frekvenci má jeho výstup Q1?",
  choices:["80 Hz","40 Hz","20 Hz"],correct:1,
  wrong:"Q0 dělí frekvenci dvěma, Q1 čtyřmi. 160 ÷ 4 = 40 Hz.",
  right:"Správně: Q1 = 160 / 4 = 40 Hz. Q2 by měl 20 Hz.",
  lesson:"U plného binárního čítače dělí každá další pozice frekvenci znovu dvěma."},
 {name:"Čítač v praxi",minutes:"3 min",title:"Počítání výrobků na dopravníku",
  text:["Představ si <strong>snímač u dopravníku</strong>. Pokaždé, když kolem projede výrobek, vyšle impuls. Čítač v PLC, například <strong>CTU</strong>, uloží počet zachycených událostí do hodnoty CV.","Čítač událostí reaguje na <strong>novou náběžnou hranu</strong> signálu (0 → 1). Když snímač zůstane trvale v jedničce, neznamená to další a další výrobky. Povely RESET, LOAD a ENABLE pak mohou podle typu obvodu stav nulovat, načíst nebo povolit počítání."],
  question:"Snímač drží vstup CTU trvale na 1. Kolik dalších výrobků čítač přičte bez dalšího přechodu 0 → 1?",
  choices:["Žádný","Jeden při každém cyklu PLC","Neomezený počet"],correct:0,
  wrong:"CTU v našem výukovém modelu počítá nové náběžné hrany, ne délku trvání jedničky.",
  right:"Správně, žádný. Další výrobek musí vytvořit nový impuls 0 → 1.",
  lesson:"V praxi čítač měří události. Je důležité vědět, co přesně představuje jeden impuls."}
];
const total=steps.length;
const key="skola-vdf-mer06-pruvodce-v2";
const initial=()=>({index:0,reached:0,passed:Array(total).fill(false),revealed:Array(total).fill(false),selected:Array(total).fill(-1),view:Array(total).fill(0),mode:"SHL",counterMod:10, syncMode:"sync",controlValue:3,controlEnable:1});
let state=initial();
try{
 const saved=JSON.parse(localStorage.getItem(key)||"null");
 if(saved&&Array.isArray(saved.passed)&&saved.passed.length===total&&Number.isInteger(saved.reached)){
  state.passed=saved.passed.map(Boolean);
  state.reached=Math.max(0,Math.min(total-1,saved.reached));
  state.index=Math.max(0,Math.min(state.reached,Number(saved.index)||0));
 }
}catch(err){}
const save=()=>{
 try{localStorage.setItem(key,JSON.stringify({passed:state.passed,reached:state.reached,index:state.index}));}catch(err){}
};
const bits=(number,width=4)=>number.toString(2).padStart(width,"0");
const bitRow=(word)=>{
 let cells="";
 for(let i=0;i<word.length;i++){
  const bit=word.charAt(i);
  cells+='<div class="guide-bit'+(bit==="1"?' is-one':'')+'"><small>b'+(word.length-i-1)+'</small><strong>'+bit+'</strong></div>';
 }
 return '<div class="guide-bit-row" aria-label="Bity '+word+'">'+cells+'</div>';
};
const demoButton=(action,title,disabled=false,extra="")=>'<button type="button" data-action="'+action+'"'+(disabled?' disabled':'')+extra+'>'+title+'</button>';
function demo(index){
 const v=state.view[index];
 // Pořadí výukových kroků se řídí didaktickou návazností, nikoli pořadím původních demo bloků.
 const kind=[0,10,1,2,6,11,3,4,5,12,13,7,8,9][index];
 if(kind===0){
  const saved=v%2===0?"1011":"0100";
  return '<h4>Pokus: změň vstup, potom pošli CLK</h4><p>Nový vstup D: <code>0100</code></p><p>Uložené výstupy Q:</p>'+
   bitRow(saved)+'<div class="guide-demo">'+demoButton("pulse",v%2===0?"Poslat hodinovou hranu CLK":"Začít znovu")+'</div>'+
   '<div class="guide-demo-label">'+(v%2===0?"Vstup se změnil, ale uložený stav je stále 1011.":"Po aktivní hraně registr převezme nové bity 0100.")+'</div>';
 }
 if(kind===1){
  const n=(11<<Math.min(v,4))&15;
  return '<h4>Posuv doleva, na vstupu vždy nula</h4>'+bitRow(bits(n))+
   '<div class="guide-demo">'+demoButton("pulse","Další impuls SHL",v>=4)+demoButton("reset-demo","Znovu")+'</div>'+
   '<div class="guide-demo-label">Provedené posuvy: '+v+'. Začínali jsme na 1011; každý impuls posune bity o jedno místo doleva.</div>';
 }
 if(kind===2){
  const outcomes={SHL:["0110","Odcházející levý bit vypadne a zprava přijde 0."],SHR:["0101","Odcházející pravý bit vypadne a zleva přijde 0."],ROL:["0111","Levá jednička se vrátí napravo."],ROR:["1101","Pravá jednička se vrátí nalevo."]};
  let buttons="";
  for(const name of ["SHL","SHR","ROL","ROR"]){
   buttons+=demoButton("mode",name,false,' data-value="'+name+'" class="'+(state.mode===name?"is-active":"")+'"');
  }
  return '<h4>Stejný začátek, čtyři různé operace</h4><p><code>1011</code> →</p>'+bitRow(outcomes[state.mode][0])+
   '<div class="guide-demo">'+buttons+'</div><div class="guide-demo-label">'+outcomes[state.mode][1]+'</div>';
 }
 if(kind===3){
  const n=(3+v)%16;
  return '<h4>Každý impuls přičte jedna</h4>'+bitRow(bits(n))+
   '<div class="guide-value">Desítkově: <strong>'+n+'</strong></div>'+
   '<div class="guide-demo">'+demoButton("pulse","Další impuls +1")+demoButton("reset-demo","Znovu od 3")+'</div>';
 }
 if(kind===4){
  const n=(14+v)%16;
  const seq=[14,15,0,1].map(x=>'<span'+(x===n?' class="is-current"':'')+'>'+bits(x)+'</span>').join('<span aria-hidden="true">→</span>');
  return '<h4>Zkus přechod přes poslední číslo</h4><div class="guide-sequence">'+seq+'</div>'+bitRow(bits(n))+
   '<div class="guide-value">Číslo: <strong>'+n+'</strong></div>'+
   '<div class="guide-demo">'+demoButton("pulse","Další impuls",v>=3)+demoButton("reset-demo","Znovu od 14")+'</div>';
 }
 if(kind===5){
  const m=state.counterMod;
  const n=(8+v)%m;
  return '<h4>Stejné čtyři bity, jiný konec cyklu</h4>'+
   '<div class="guide-demo">'+demoButton("modulo","Modulo 10",false,' data-value="10" class="'+(m===10?"is-active":"")+'"')+
   demoButton("modulo","Modulo 16",false,' data-value="16" class="'+(m===16?"is-active":"")+'"')+'</div>'+
   bitRow(bits(n))+'<div class="guide-value">Číslo: <strong>'+n+'</strong> · modulo '+m+'</div>'+
   '<div class="guide-demo">'+demoButton("pulse","Další impuls")+demoButton("reset-demo","Znovu od 8")+'</div>';
 }
 if(kind===6){
  const serial=[1,0,1,1],words=["0000","0001","0010","0101","1011"];
  let table='<table class="guide-mini-table"><thead><tr><th>Hrana</th><th>Příchozí bit</th><th>Stav registru</th></tr></thead><tbody>';
  for(let i=0;i<=v;i++)table+='<tr'+(i===v?' class="is-current"':'')+'><td>'+i+'</td><td>'+(i?serial[i-1]:'—')+'</td><td>'+words[i]+'</td></tr>';
  table+='</tbody></table>';
  return '<h4>SIPO: po jednom bitu na vstupu</h4><p>Pořadí příchozích bitů: <code>1, 0, 1, 1</code></p>'+
   bitRow(words[v])+table+'<div class="guide-demo">'+demoButton("pulse","Přijmout další bit",v>=4)+demoButton("reset-demo","Znovu")+'</div>';
 }
 if(kind===7){
  const sync=state.syncMode==="sync";
  return '<h4>Porovnej způsob časování</h4>'+
   '<div class="guide-demo">'+demoButton("sync","Synchronní",false,' data-value="sync" class="'+(sync?"is-active":"")+'"')+
   demoButton("sync","Asynchronní",false,' data-value="ripple" class="'+(!sync?"is-active":"")+'"')+'</div>'+
   '<div class="guide-comparison"><div><b>'+ (sync?"Společný takt":"Postupný řetězec") +'</b><span>'+
   (sync?"CLK ━┳━ FF0<br>　　　 ┣━ FF1<br>　　　 ┗━ FF2":"CLK → FF0 → FF1 → FF2")+
   '</span></div><div><b>Co to znamená?</b><span>'+
   (sync?"Všechny stupně mají stejnou aktivní hodinovou hranu.":"Další stupeň je spouštěn změnou předchozího; přepínání se může zpozdit.")+
   '</span></div></div>';
 }
 if(kind===8){
  let table='<table class="guide-mini-table"><thead><tr><th>Impulsy</th><th>Q2</th><th>Q1</th><th>Q0</th></tr></thead><tbody>';
  for(let i=0;i<=Math.max(v,3);i++){
   const b=bits(i%8,3);
   table+='<tr'+(i===v?' class="is-current"':'')+'><td>'+i+'</td><td>'+b[0]+'</td><td>'+b[1]+'</td><td>'+b[2]+'</td></tr>';
  }
  table+='</tbody></table>';
  return '<h4>Pravidelné přepínání bitů</h4><p>Vstup CLK = <strong>160 Hz</strong>. Q0 = 80 Hz, Q1 = 40 Hz, Q2 = 20 Hz.</p>'+
   table+'<div class="guide-demo">'+demoButton("pulse","Další impuls",v>=7)+demoButton("reset-demo","Znovu")+'</div>';
 }
 if(kind===9){
  const n=v;
  return '<h4>Snímač → PLC CTU → dosažený počet</h4>'+
   '<div class="guide-comparison"><div><b>Snímač výrobků</b><span>Každý stisk představuje nový impuls 0 → 1 → 0.</span></div>'+
   '<div><b>CTU · předvolba PV = 3</b><span>CV = '+n+' · Q = '+(n>=3?"1 (cíl splněn)":"0 (zatím ne)")+'</span></div></div>'+
   '<div class="guide-value">Započítané výrobky: <strong>'+n+'</strong></div>'+
   '<div class="guide-demo">'+demoButton("pulse","Projede další výrobek")+demoButton("reset-demo","RESET · vynulovat")+'</div>';
 }
 if(kind===10){
  const next=v===2?"0100":"1011";
  return '<h4>Připrav nový vstup 0100, rozhodni o načtení</h4>'+
   '<p>Vstup D: <code>0100</code> · výstup Q:</p>'+bitRow(next)+
   '<div class="guide-demo">'+demoButton("clock-hold","CLK + HOLD")+demoButton("clock-load","CLK + LOAD")+
   demoButton("reset-demo","Znovu")+'</div>'+
   '<div class="guide-demo-label">'+(v===1?"HOLD: impuls přišel, ale registr drží uloženou hodnotu 1011.":v===2?"LOAD: impuls přišel a registr převzal vstupní hodnotu 0100.":"Začínáme s uloženou hodnotou 1011. Samotný nový vstup D stav neaktualizuje.")+'</div>';
 }
 if(kind===11){
  const input=[1,0,1,1],words=["0000","0001","0010","0101","1011"];
  let table='<table class="guide-mini-table"><thead><tr><th>Hrana CLK ↑</th><th>SI</th><th>Q3 Q2 Q1 Q0</th></tr></thead><tbody>';
  for(let n=0;n<=v;n++){
   table+='<tr'+(n===v?' class="is-current"':'')+'><td>'+n+'</td><td>'+(n===0?"—":input[n-1])+'</td><td>'+words[n]+'</td></tr>';
  }
  table+='</tbody></table>';
  return '<h4>Čti tabulku po každé hraně CLK</h4>'+bitRow(words[v])+table+
   '<div class="guide-demo">'+demoButton("pulse","Další hrana ↑ CLK",v>=4)+demoButton("reset-demo","Začít znovu")+'</div>'+
   '<div class="guide-demo-label">SI vstupuje zprava do Q0. Výstupy si při jedné hraně převezmou nové hodnoty současně.</div>';
 }
 if(kind===12){
  const current=(3+v)%5;
  return '<h4>Modulo 5: pět stavů, tři bity</h4>'+
   bitRow(bits(current,3))+
   '<div class="guide-value">Číslo: <strong>'+current+'</strong> · cyklus 0 až 4</div>'+
   '<div class="guide-demo">'+demoButton("pulse","Další impuls")+demoButton("reset-demo","Znovu od 3")+'</div>'+
   '<div class="guide-demo-label">Po 4 následuje 0. To, že jsou v registru tři bity, neznamená, že je musíme nechat počítat až do 7.</div>';
 }
 if(kind===13){
  const n=state.controlValue,en=state.controlEnable===1;
  return '<h4>Ovládání čítače příkazy</h4>'+bitRow(bits(n))+
   '<div class="guide-value">Stav: <strong>'+n+'</strong> · ENABLE = '+(en?"1":"0")+'</div>'+
   '<div class="guide-demo">'+demoButton("count-up","UP +1")+demoButton("count-down","DOWN −1")+
   demoButton("toggle-en","ENABLE "+(en?"vypnout":"zapnout"))+
   demoButton("counter-clear","RESET → 0")+demoButton("counter-load","LOAD → 5")+'</div>'+
   '<div class="guide-demo-label">Při EN=0 nemění běžný impuls UP/DOWN stav. RESET a LOAD zde ukazují samostatné řídicí povely.</div>';
 }
 return "";
}
const card=byId("guidedStage"),nav=byId("guideStepNav"),progress=byId("guideProgressBar"),progressText=byId("guideProgressText");
function render(){
 const i=state.index,s=steps[i],passed=state.passed[i],revealed=state.revealed[i],answered=passed||revealed,sel=state.selected[i],done=state.passed.filter(Boolean).length;
 progress.style.width=(100*done/total)+"%";
 progressText.textContent=done+" / "+total+" ověřených odpovědí";
 nav.innerHTML=steps.map((step,j)=>'<button type="button" data-nav="'+j+'" aria-label="Krok '+(j+1)+': '+step.name+'"'+
  (j===i?' aria-current="step"':'')+(state.passed[j]?' class="is-done"':'')+(j>state.reached?' disabled':'')+'>'+ (state.passed[j]?"✓":j+1) +'</button>').join("");
 let choiceHtml="";
 s.choices.forEach((value,j)=>{
  choiceHtml+='<label><input type="radio" name="guide-answer" value="'+j+'"'+(sel===j?' checked':'')+(answered?' disabled':'')+'><span>'+value+'</span></label>';
 });
 let feedback="";
 if(passed) feedback='<div class="guide-feedback is-correct" role="status">✓ '+s.right+'</div>';
 else if(revealed) feedback='<div class="guide-feedback is-reveal" role="status">Vysvětlení: '+s.right+' Tento krok není započítán jako samostatně zvládnutý.</div>';
 else if(sel>=0) feedback='<div class="guide-feedback is-wrong" role="status">Ještě ne. '+s.wrong+' Zkus zvolit jinou odpověď.</div>';
 let actions='<div class="guide-actions">'+
  demoButton("previous","← Předchozí",i===0,' class="guide-secondary"')+
  (i<total-1?demoButton("next","Další krok →",!answered,' class="guide-next"'):answered?demoButton("deep","Přejít k rozšíření →",false,' class="guide-next"'):"")+
  (!answered?demoButton("reveal","Nevím, ukaž vysvětlení",false,' class="guide-help"'):"")+
  '<span class="guide-actions-note">'+(answered?"Můžeš pokračovat.": "Odpověz na otázku, aby se odemkl další krok.")+'</span></div>';
 let finished="";
 if(i===total-1&&answered){
  finished='<div class="guide-complete"><strong>Hotovo, prošel jsi celý základní výklad.</strong><p>'+
   'Zvládnuté otázky samostatně: '+done+' z '+total+'. Nejasné kroky si vrať v navigaci a zkus je vysvětlit vlastními slovy. U každé odpovědi se také pokus samostatně říct proč. '+
   'Toto je úvodní porozumění, nikoli náhrada kompletní ústní odpovědi a schémat.</p></div>';
 }
 const topicGroup=i<6?"REGISTRY A PŘENOS DAT":i<13?"ČÍTAČE A ČASOVÁNÍ":"POUŽITÍ V PRAXI";
 card.innerHTML='<div class="guide-card-header"><span class="guide-step-number">'+topicGroup+' · KROK '+(i+1)+' Z '+total+'</span>'+
  '<span class="guide-time">Přibližně '+s.minutes+'</span></div>'+
  '<h3>'+s.title+'</h3>'+s.text.map(p=>'<p>'+p+'</p>').join("")+
  '<div class="guide-example">'+demo(i)+'</div>'+
  '<div class="guide-check"><div class="guide-check-tag">Kontrolní otázka</div>'+
  '<h4>'+s.question+'</h4><div class="guide-options" role="group" aria-label="Možnosti odpovědi">'+choiceHtml+'</div>'+
  feedback+'</div>'+actions+finished;
 save();
}
function show(index){
 if(index<0||index>=total||index>state.reached)return;
 state.index=index;
 render();
 const heading=card.querySelector("h3");
 if(heading){heading.setAttribute("tabindex","-1");heading.focus({preventScroll:true});}
 root.scrollIntoView({behavior:"smooth",block:"start"});
}
root.addEventListener("change",event=>{
 const choice=event.target;
 if(!choice.matches('input[name="guide-answer"]'))return;
 const i=state.index;
 if(state.passed[i]||state.revealed[i])return;
 const answer=Number(choice.value);
 state.selected[i]=answer;
 if(answer===steps[i].correct){
  state.passed[i]=true;
  state.reached=Math.max(state.reached,Math.min(total-1,i+1));
 }
 render();
});
root.addEventListener("click",event=>{
 const node=event.target.closest("[data-nav],[data-action]");
 if(!node||node.disabled)return;
 if(node.dataset.nav!==undefined){show(Number(node.dataset.nav));return;}
 const action=node.dataset.action,i=state.index;
 if(action==="previous"){show(i-1);return;}
 if(action==="next"){show(i+1);return;}
 if(action==="reveal"){
  state.revealed[i]=true;
  state.reached=Math.max(state.reached,Math.min(total-1,i+1));
  render();return;
 }
 if(action==="pulse"){state.view[i]=i===0?1-state.view[i]:Math.min(99,state.view[i]+1);render();return;}
 if(action==="clock-hold"){state.view[i]=1;render();return;}
 if(action==="clock-load"){state.view[i]=2;render();return;}
 if(action==="toggle-en"){state.controlEnable=1-state.controlEnable;render();return;}
 if(action==="count-up"||action==="count-down"){
  if(state.controlEnable)state.controlValue=(state.controlValue+(action==="count-up"?1:15))%16;
  render();return;
 }
 if(action==="counter-clear"){state.controlValue=0;render();return;}
 if(action==="counter-load"){state.controlValue=5;render();return;}
 if(action==="reset-demo"){state.view[i]=0;render();return;}
 if(action==="mode"){state.mode=node.dataset.value;render();return;}
 if(action==="modulo"){state.counterMod=Number(node.dataset.value);state.view[i]=0;render();return;}
 if(action==="sync"){state.syncMode=node.dataset.value;render();return;}
 if(action==="deep"){
  const details=byId("podrobne");if(details){details.open=true;details.scrollIntoView({behavior:"smooth"});}
 }
});
byId("guideReset").addEventListener("click",()=>{
 if(!window.confirm("Opravdu začít kurz od začátku? Vymaže se dosavadní pokrok v tomto prohlížeči."))return;
 state=initial();render();root.scrollIntoView({behavior:"smooth"});
});
function openDeepIfHash(){
 if(!location.hash)return;
 const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
 const deep=byId("podrobne");
 if(deep&&target&&deep.contains(target))deep.open=true;
}
window.addEventListener("hashchange",openDeepIfHash);
openDeepIfHash();
render();
})();