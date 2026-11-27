/* Maturita 06: samostatný krokový průvodce, bez API nebo přihlašování. */
(function(){
"use strict";
const root=document.getElementById("rychlokurz");
if(!root)return;
const byId=id=>document.getElementById(id);
const steps=[
 {
  "name": "Klopný obvod a registr",
  "title": "Jak si obvod zapamatuje čtyři bity?",
  "minutes": "3 min",
  "text": [
   "Začneme tím nejmenším. <strong>Bit</strong> může mít jen dvě hodnoty: <code>0</code> nebo <code>1</code>. Klopný obvod si jednu z těchto hodnot dokáže uchovat. Představ si ho jako malé paměťové políčko.",
   "Když potřebujeme uchovat <strong>čtyři bity</strong>, postavíme vedle sebe čtyři taková políčka. Každé si pamatuje právě jeden bit. Této skupině říkáme <strong>čtyřbitový registr</strong>.",
   "Například uložené <code>1011</code> znamená, že první políčko drží 1, druhé 0, třetí 1 a čtvrté 1. Všechna čtyři dohromady uchovávají celé číslo. V ukázce si můžeš prohlédnout dvě různé uložené hodnoty.",
   "<strong>K čemu je to dobré?</strong> Řídicí obvod nebo procesor si tak může na chvíli zapamatovat číslo, se kterým právě pracuje. Zatím nemusíme řešit, kdy ho změní. To je další krok."
  ],
  "question": "Kolik klopných obvodů potřebujeme, abychom si najednou pamatovali čtyři bity?",
  "choices": [
   "Jeden",
   "Čtyři",
   "Šestnáct"
  ],
  "correct": 1,
  "wrong": "Každý klopný obvod si pamatuje jeden bit. Pro čtyři bity tedy potřebujeme čtyři buňky.",
  "right": "Správně! Čtyři buňky uchovají čtyři bity. Právě to je jednoduchý čtyřbitový registr.",
  "lesson": "Registr je několik paměťových buněk spojených do jednoho celku."
 },
 {
  "name": "Hodiny a načítání",
  "title": "Kdy si registr zapamatuje nové číslo?",
  "minutes": "3 min",
  "text": [
   "Registr už má uložené <code>1011</code>. Na jeho vstupu se mezitím objevilo jiné číslo, <code>0100</code>. <strong>Změní se tím hned uložená hodnota?</strong> Ne. U běžného hranově řízeného registru zatím na výstupu zůstává <code>1011</code>.",
   "Pomáhá nám <strong>hodinový signál CLK</strong>. Představ si ho jako společný pokyn „teď“. Teprve při jeho aktivní hraně mohou všechny čtyři paměťové buňky převzít nové vstupy. Proto se bity načítají společně, ne jeden po druhém.",
   "V obrázku znamená <strong>D</strong> vstupní data a <strong>Q</strong> uložený výstup. Povel <strong>LOAD</strong> říká „načti nové D při hodinové hraně“. <strong>HOLD</strong> znamená „ponech staré Q“, i když hodinová hrana přijde.",
   "Vyzkoušej obě tlačítka. Sleduj hlavně to, zda na výstupu zůstane <code>1011</code>, nebo se změní na <code>0100</code>."
  ],
  "question": "Na vstupu D je 0100, ale další aktivní hrana CLK ještě nepřišla. Co si registr stále pamatuje?",
  "choices": [
   "1011",
   "0100",
   "0000"
  ],
  "correct": 0,
  "wrong": "Dokud nedošlo k aktivní hraně CLK, uložený výstup Q drží staré číslo 1011.",
  "right": "Ano. Na D už může být 0100, ale Q stále ukazuje 1011. Nová hodnota se převezme až při vhodné hodinové hraně a povoleném LOAD.",
  "lesson": "Nový vstup ještě neznamená nové uložené číslo. Hodinová hrana určuje okamžik převzetí."
 },
 {
  "name": "Posuv bitů",
  "title": "Co znamená posunout bity?",
  "minutes": "3 min",
  "text": [
   "Registr nemusí data jen držet. Někdy potřebujeme, aby se každý uložený bit <strong>přesunul o jedno políčko vedle</strong>. Takovému registru říkáme <strong>posuvný</strong>.",
   "Zkus začít hodnotou <code>1011</code>. Při <strong>posuvu doleva (SHL)</strong> se všechny bity přesunou o jedno místo doleva. Levý bit vypadne a zprava přidáme nulu. Dostaneme <code>0110</code>.",
   "Po dalším impulsu vznikne <code>1100</code>. Stiskni několikrát tlačítko a sleduj jednotlivé bity. <strong>Každý impuls znamená pouze jeden posun</strong>, nikoli posunutí až na konec.",
   "Podobně funguje <strong>posuv doprava (SHR)</strong>. Když posuneme <code>1011</code> doprava a zleva doplníme nulu, vznikne <code>0101</code>. Tohle budeme používat při přenosu dat bit po bitu."
  ],
  "question": "Co vznikne z 1011 po jednom posuvu doprava, když zleva přidáme nulu?",
  "choices": [
   "0110",
   "0101",
   "1101"
  ],
  "correct": 1,
  "wrong": "Při posuvu doprava jde každý bit o jedno místo doprava: 1011 → 0101. Poslední pravý bit vypadne.",
  "right": "Přesně. 1011 → 0101. Všimni si, že se všechny bity přesunuly pouze o jedno místo.",
  "lesson": "Posuv mění pozice bitů. Krajní bit vypadne a z druhé strany přijde nový."
 },
 {
  "name": "Posuv versus rotace",
  "title": "Jak posouvat bity, aniž bychom některý ztratili?",
  "minutes": "3 min",
  "text": [
   "U obyčejného posuvu jsme jeden krajní bit ztratili. Co když ale chceme bity jen přeskládat a <strong>zachovat všechny čtyři</strong>? Použijeme <strong>rotaci</strong>.",
   "Při <strong>rotaci doleva (ROL)</strong> se levá jednička vrátí na pravý konec. Z <code>1011</code> tedy nevznikne <code>0110</code> jako u posuvu, ale <code>0111</code>.",
   "Při <strong>rotaci doprava (ROR)</strong> se naopak pravá jednička přesune úplně vlevo: <code>1011 → 1101</code>. Tady se snadno splete směr, proto si ho vyzkoušej.",
   "Přepínej mezi čtyřmi operacemi v ukázce. Sleduj, <strong>kam se poděl bit, který odešel z kraje</strong>. To je celé kouzlo rozdílu mezi posuvem a rotací."
  ],
  "question": "Jak dopadne jedna rotace doleva (ROL) hodnoty 1011?",
  "choices": [
   "0111",
   "1101",
   "0110"
  ],
  "correct": 0,
  "wrong": "Při rotaci doleva se první bit 1 přenese na poslední místo: 1011 → 0111. Hodnota 1101 je rotace doprava.",
  "right": "Správně! Výsledek ROL je 0111. Právě takto se odcházející bit vrací na opačný konec.",
  "lesson": "Posuv bit může ztratit. Rotace jej vrátí na opačný konec."
 },
 {
  "name": "Sériově a paralelně",
  "title": "Proč někdy posíláme data po jednom bitu?",
  "minutes": "4 min",
  "text": [
   "Představ si, že chceme odeslat čtyři bity <code>1011</code> do jiného zařízení. Jedna možnost je použít čtyři datové vodiče a předat všechny čtyři bity současně. Tomu říkáme <strong>paralelní přenos</strong>.",
   "Jiná možnost je poslat <strong>jeden bit za druhým po jediném datovém vodiči</strong>. To je <strong>sériový přenos</strong>. Právě tady je posuvný registr velmi užitečný.",
   "V naší ukázce posíláme postupně <code>1</code>, potom <code>0</code>, pak <code>1</code> a nakonec <code>1</code>. Po každém hodinovém impulsu přijde nový bit zprava a starší bity se posunou doleva.",
   "Takový registr se označuje <strong>SIPO</strong>: sériový vstup, paralelní výstup. Nakonec máme všechny čtyři bity zároveň připravené na čtyřech výstupech. Existují i další kombinace: SISO, PISO a PIPO."
  ],
  "question": "Začínáme na 0000. Pošleme sériově bit 1 a potom 0. Jaký bude stav po dvou hodinových hranách?",
  "choices": [
   "0001",
   "0010",
   "1010"
  ],
  "correct": 1,
  "wrong": "První impuls vloží zprava 1: 0001. Druhý bit je 0, původní 1 se posune doleva: 0010.",
  "right": "Ano. Po dvou krocích je v registru 0010. Po všech čtyřech dorazí výsledek 1011.",
  "lesson": "Sériově znamená postupně po jednom bitu. Paralelně znamená více bitů současně."
 },
 {
  "name": "Časový diagram",
  "title": "Jak poznáme, co se stalo při každém impulsu?",
  "minutes": "4 min",
  "text": [
   "Zatím jsme v ukázkách mačkali tlačítko hodinového impulsu. V elektronice takové okamžiky zaznamenáváme do <strong>časového diagramu</strong>: vodorovně běží čas a my sledujeme signál <strong>CLK</strong>, vstupní data a uložené výstupy.",
   "Začneme jednoduchým přehledem. Registr SIPO je na začátku <code>0000</code>. Při první aktivní hraně přijde bit 1 a stav je <code>0001</code>. Při druhé přijde 0 a stav je <code>0010</code>. Při třetí přijde 1 a stav je <code>0101</code>.",
   "Důležité je, že <strong>při jedné hraně se všechny klopné obvody aktualizují současně</strong> podle toho, co bylo uloženo těsně před ní. Jednička tedy neproběhne celým registrem jediným impulsem.",
   "Procházej tabulku po jednom kroku. Čti vždy trojici: číslo hodinové hrany → přijatý bit → nový stav. Stejnou informaci pak umíme vyznačit i do časového diagramu čarami."
  ],
  "question": "Jaký je stav po třetí hraně, když do prázdného SIPO přišly bity 1, 0, 1?",
  "choices": [
   "0101",
   "1010",
   "0010"
  ],
  "correct": 0,
  "wrong": "Stavy jdou po hranách 0000 → 0001 → 0010 → 0101. Po třetí hraně je tedy 0101.",
  "right": "Správně, 0101. Vždy čti stav až po dané aktivní hraně hodin.",
  "lesson": "Časový diagram ukazuje, kdy se mění vstupy a co se při hodinové hraně uloží na výstupech."
 },
 {
  "name": "Z registru čítač",
  "title": "Jak z paměti vznikne počítadlo?",
  "minutes": "3 min",
  "text": [
   "Registr už umí uchovat čtyři bity. Co kdybychom chtěli při každém hodinovém impulsu <strong>zvýšit uložené číslo o jedna</strong>? Přidáme logiku, která vypočítá následující hodnotu. Tak vzniká <strong>čítač</strong>.",
   "Například <code>0011</code> je binárně číslo <strong>3</strong>. Při dalším impulsu čítač přejde na číslo <strong>4</strong>, které se zapisuje <code>0100</code>.",
   "Všimni si: <code>0011 → 0100</code> <strong>není posuv bitů</strong>. Změnilo se celé číslo. Čítač musí určit nový binární zápis a uložit jej.",
   "Takový obvod může počítat impulsy ze snímače, kroky motoru nebo výrobky na pásu. Zkus několikrát tlačítko dalšího impulsu a porovnávej binární a desítkový zápis."
  ],
  "question": "Čítač ukazuje 0011 (3). Co ukáže po jednom impulsu při počítání nahoru?",
  "choices": [
   "0100",
   "0110",
   "0010"
  ],
  "correct": 0,
  "wrong": "Po trojce následuje čtyřka. V binární soustavě píšeme čtyřku jako 0100.",
  "right": "Správně! 0011 znamená 3 a 0100 znamená 4. Čítač se posunul na další číselný stav.",
  "lesson": "Registr ukládá data. Čítač při impulzech prochází posloupností čísel."
 },
 {
  "name": "Přetečení",
  "title": "Co se stane, když už další číslo nemáme kam uložit?",
  "minutes": "3 min",
  "text": [
   "Čtyři bity mohou tvořit pouze konečný počet různých kombinací. Každý bit má dvě možnosti, takže čtyři bity vytvoří <strong>2 × 2 × 2 × 2 = 16 stavů</strong>.",
   "Při počítání nahoru jsou to čísla <strong>0 až 15</strong>. Největší je <code>1111</code>, což je patnáctka. Další číslo 16 by potřebovalo pátý bit: <code>10000</code>.",
   "Jenže náš čítač má pořád jen čtyři bity. Proto po stavu <code>1111</code> následuje zase <code>0000</code>. Tomuto návratu po poslední hodnotě říkáme <strong>přetečení</strong>.",
   "V ukázce zkus tři impulsy od čísla 14. Uvidíš přechod <code>1110 → 1111 → 0000 → 0001</code>."
  ],
  "question": "Čtyřbitový binární čítač je na 1111. Co se stane po dalším impulsu?",
  "choices": [
   "Přejde na 1110",
   "Vrátí se na 0000",
   "Zobrazí pětibitové 10000"
  ],
  "correct": 1,
  "wrong": "Čtyři bity číslo 16 neuchovají. Proto se po nejvyšším stavu 1111 čítač vrátí na 0000.",
  "right": "Správně, 0000. Po přetečení začíná čítač svůj cyklus znovu.",
  "lesson": "Se čtyřmi bity dostaneme 16 stavů: od 0000 do 1111."
 },
 {
  "name": "Binární a dekadický",
  "title": "Proč jeden čítač končí na 15 a druhý na 9?",
  "minutes": "3 min",
  "text": [
   "Náš čtyřbitový binární čítač využije všech <strong>16 stavů</strong>. Po patnáctce se vrátí na nulu. Někdy ale potřebujeme počítat jen <strong>od 0 do 9</strong>, třeba jednu číslici na displeji.",
   "K tomu slouží <strong>dekadický čítač</strong>. Číslo 9 zapisuje jako <code>1001</code>, ale další impuls ho vrátí na <code>0000</code>. Nepokračuje na <code>1010</code>, i když by takovou čtyřbitovou kombinaci mohl uložit.",
   "Počet stavů v opakovaném cyklu označujeme slovem <strong>modulo</strong>. Binární čtyřbitový čítač je modulo 16. Dekadický čítač je modulo 10.",
   "V ukázce přepínej mezi modulo 10 a modulo 16. Začni od osmi a zkus, co se stane po devítce. Je to vidět mnohem rychleji než z definice."
  ],
  "question": "Dekadický čítač ukazuje 1001 (9). Jaká hodnota následuje?",
  "choices": [
   "1010",
   "1111",
   "0000"
  ],
  "correct": 2,
  "wrong": "Dekadický čítač má jen deset stavů od 0 do 9. Po devítce se tedy vrací na nulu.",
  "right": "Ano, 0000. A právě tím se liší od běžného čtyřbitového čítače modulo 16.",
  "lesson": "Modulo nám říká, kolika stavy čítač prochází, než začne znovu."
 },
 {
  "name": "Zkrácený cyklus",
  "title": "Jak udělat čítač, který počítá jen pět stavů?",
  "minutes": "3 min",
  "text": [
   "Nemusíme se zastavit jen u cyklů do devíti nebo patnácti. Představ si, že chceme seskupovat výrobky vždy po pěti. Čítač může počítat <strong>0 → 1 → 2 → 3 → 4 → 0</strong>.",
   "To je <strong>čítač modulo 5</strong>: má přesně pět opakujících se stavů. Číslo 5 už v jeho běžném cyklu nenastane, protože se čítač vrátí na nulu.",
   "Kolik paměťových bitů potřebujeme? Dva bity by zvládly jen <code>00, 01, 10, 11</code>, tedy čtyři stavy. <strong>Tři bity</strong> zvládnou osm kombinací, což už na pět požadovaných stavů stačí.",
   "Použijeme tedy tři klopné obvody, ale běžně využijeme jen pět jejich kombinací. Vyzkoušej přechod z čísla 4 na 0."
  ],
  "question": "Kolik bitů nejméně potřebujeme pro čítač modulo 5?",
  "choices": [
   "Dva",
   "Tři",
   "Pět"
  ],
  "correct": 1,
  "wrong": "Dva bity by stačily jen na čtyři stavy. Tři bity umí až osm různých kombinací, takže na pět stavů stačí.",
  "right": "Správně. Pět stavů vyžaduje nejméně tři paměťové bity, ne pět.",
  "lesson": "Modulo je počet stavů cyklu, nikoli počet klopných obvodů."
 },
 {
  "name": "Směr a povely",
  "title": "Jak počítání spustíme, zastavíme nebo vynulujeme?",
  "minutes": "4 min",
  "text": [
   "Zatím čítač s každým impulsem přičítal. Ve skutečnosti ho ale potřebujeme také <strong>zastavit, vynulovat nebo změnit směr</strong>. Proto mají čítače řídicí vstupy.",
   "<strong>UP</strong> znamená počítat nahoru, například 3 → 4. <strong>DOWN</strong> znamená počítat dolů, například 3 → 2. Samotné slovo určuje směr, ve kterém se mění uložené číslo.",
   "<strong>ENABLE</strong> je povolení počítání. Když je vypnuté, běžné čítací impulsy nic nepřičtou. <strong>RESET</strong> nastaví nulu a <strong>LOAD</strong> načte předem zadané číslo. Ve skutečných obvodech se přesné časování těchto povelů liší podle typu.",
   "Vyzkoušej začít od trojky, jednou přičíst, potom vypnout ENABLE a přičíst znovu. Druhý impuls se do hodnoty nezapočítá. Pak zkus RESET a LOAD."
  ],
  "question": "ENABLE je vypnutý a čítač ukazuje 5. Co udělá obyčejný čítací impuls?",
  "choices": [
   "Přejde na 6",
   "Přejde na 4",
   "Zůstane na 5"
  ],
  "correct": 2,
  "wrong": "Když je počítání zakázané (ENABLE = 0), obyčejný impuls uloženou hodnotu nemění.",
  "right": "Ano, zůstane na pěti. ENABLE rozhoduje, zda čítač na čítací impulsy reaguje.",
  "lesson": "UP/DOWN určuje směr, ENABLE povolení, RESET nulování a LOAD přednastavení."
 },
 {
  "name": "Synchronní a asynchronní",
  "title": "Proč některé čítače přepínají společně a jiné postupně?",
  "minutes": "3 min",
  "text": [
   "Čítač se skládá z více klopných obvodů. Každý drží jeden bit. Když se má číslo změnit, potřebujeme rozhodnout, <strong>kdy se jednotlivé bity přepnou</strong>.",
   "U <strong>synchronního čítače</strong> dostávají všechny klopné obvody stejný hodinový signál CLK. Na jeho aktivní hraně se rozhodne o jejich nových hodnotách. Pro výklad si to můžeme představit jako společný povel pro všechny.",
   "U <strong>asynchronního neboli ripple čítače</strong> se přepnutí šíří postupně z jednoho stupně do dalšího. Takže mezi původní a konečnou kombinací mohou krátce vzniknout přechodné hodnoty.",
   "V ukázce přepni obě zapojení. U maturity je nejdůležitější umět říct: <strong>společné hodiny</strong> versus <strong>postupné šíření změny</strong>."
  ],
  "question": "Který čítač používá jednu společnou aktivní hodinovou hranu pro všechny stupně?",
  "choices": [
   "Asynchronní (ripple)",
   "Synchronní",
   "Žádný"
  ],
  "correct": 1,
  "wrong": "Synchronní znamená společné časování. U ripple čítače se změna přenáší mezi stupni postupně.",
  "right": "Správně. Synchronní čítač používá společnou hodinovou hranu.",
  "lesson": "Synchronní = společný CLK. Asynchronní ripple = změna se šíří postupně."
 },
 {
  "name": "Dělení frekvence",
  "title": "Jak čítač vyrobí pomalejší signál?",
  "minutes": "4 min",
  "text": [
   "Představ si pravidelný hodinový signál, který přichází <strong>160krát za sekundu</strong>. Říkáme, že má frekvenci <strong>160 Hz</strong>. Co se přitom děje s nejnižším bitem binárního čítače?",
   "Tento bit <strong>Q0</strong> střídá 0 a 1 při každém impulsu. Aby se vrátil z nuly přes jedničku zpět na nulu, potřebuje dva vstupní impulsy. Proto se Q0 opakuje jen <strong>80krát za sekundu</strong>, tedy má frekvenci 80 Hz.",
   "Další bit <strong>Q1</strong> se mění pomaleji a má frekvenci 40 Hz, Q2 má 20 Hz a Q3 10 Hz. U běžného plného čtyřbitového binárního čítače tedy dostáváme postupně <strong>f/2, f/4, f/8 a f/16</strong>.",
   "Procházej tabulku po jednotlivých impulsech. Všimni si, že Q0 se mění nejčastěji, Q1 méně často a Q2 ještě méně. Toto jednoduché dělení už automaticky neplatí pro každou kombinaci zkráceného čítače."
  ],
  "question": "CLK má 160 Hz. Jakou frekvenci má bit Q1 běžného plného binárního čítače?",
  "choices": [
   "80 Hz",
   "40 Hz",
   "20 Hz"
  ],
  "correct": 1,
  "wrong": "Q0 dělí frekvenci dvěma, Q1 čtyřmi. Pro Q1 tedy počítáme 160 ÷ 4 = 40 Hz.",
  "right": "Správně, 40 Hz. Na Q0 bychom dostali 80 Hz a na Q2 20 Hz.",
  "lesson": "Na výstupech plného binárního čítače získáme pravidelné signály s nižší frekvencí."
 },
 {
  "name": "Čítač v praxi",
  "title": "Jak čítač pozná, že kolem projel další výrobek?",
  "minutes": "4 min",
  "text": [
   "Teď všechno spojíme s reálným příkladem. Na dopravníku jedou výrobky a u pásu je <strong>snímač</strong>. Když kolem projede výrobek, snímač změní svůj elektrický signál z 0 na 1.",
   "Programovatelný automat <strong>PLC</strong> může použít čítač <strong>CTU</strong>, který takové události počítá. Uložený počet se jmenuje <strong>CV</strong>. Cílový počet může být například <strong>PV = 3</strong>. Jakmile CV dosáhne PV, výstup <strong>Q</strong> oznámí splnění cíle.",
   "Důležité je, že CTU počítá <strong>nový přechod z 0 na 1</strong>, tedy náběžnou hranu. Pokud snímač zůstane stále na jedničce, neznamená to další a další výrobky.",
   "V ukázce každý stisk tlačítka představuje jeden celý impuls snímače. Po třetím výrobku se výstup Q zapne. Zkus také RESET, který počet vynuluje."
  ],
  "question": "Snímač drží trvale hodnotu 1. Kolik dalších výrobků CTU započítá bez nového přechodu 0 → 1?",
  "choices": [
   "Žádný",
   "Jeden v každém cyklu PLC",
   "Neomezený počet"
  ],
  "correct": 0,
  "wrong": "Počítá se nová náběžná hrana, ne to, jak dlouho snímač ukazuje jedničku.",
  "right": "Správně. Bez nové náběžné hrany CTU žádný další výrobek nezapočítá.",
  "lesson": "Čítač v praxi nepočítá délku signálu, ale jednotlivé zaznamenané události."
 }
];
const total=steps.length;
const key="skola-vdf-mer06-pruvodce-v3";
const initial=()=>({index:0,view:Array(total).fill(0),mode:"SHL",counterMod:10,syncMode:"sync",controlValue:3,controlEnable:1});
let state=initial();
try{
 const saved=JSON.parse(localStorage.getItem(key)||"null");
 if(saved&&Number.isInteger(saved.index))state.index=Math.max(0,Math.min(total-1,saved.index));
}catch(err){}
const save=()=>{
 try{localStorage.setItem(key,JSON.stringify({index:state.index}));}catch(err){}
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
const card=byId("guidedStage");
const nav=byId("guideStepNav");
const progress=byId("guideProgressBar");
const progressText=byId("guideProgressText");
const reflect=[
 "Vysvětli vlastními slovy, co znamená uchovat jeden bit.",
 "K čemu používáme společný hodinový signál a proč je důležitý režim HOLD?",
 "Předveď na papíře posuv doleva a doprava.",
 "Vysvětli spolužákovi, čím se rotace liší od posuvu.",
 "Kdy je vhodné poslat bity postupně a kdy všechny najednou?",
 "Co říká jeden řádek časového diagramu po hodinové hraně?",
 "Jaký je rozdíl mezi uložením čísla a počítáním událostí?",
 "Proč se čtyřbitové počítání po nejvyšším čísle opakuje?",
 "Kde by se hodil čítač, který počítá pouze od nuly do devíti?",
 "Kolik bitů stačí k vyjádření pěti různých stavů a proč?",
 "Na příkladu řekni, k čemu jsou ENABLE, RESET a LOAD.",
 "Vysvětli rozdíl mezi společným taktem a postupným přepínáním.",
 "Jak se může z pravidelných impulsů získat pomalejší signál?",
 "Kdy čítač na dopravníku zaznamená nový výrobek?"
];
function render(){
 const i=state.index,s=steps[i];
 progress.style.width=(100*(i+1)/total)+"%";
 progressText.textContent="Krok "+(i+1)+" z "+total;
 nav.innerHTML=steps.map((step,j)=>'<button type="button" data-nav="'+j+
  '" aria-label="Krok '+(j+1)+': '+step.name+'"'+(j===i?' aria-current="step"':'')+'>'+(j+1)+'</button>').join("");
 const topicGroup=i<6?"REGISTRY A PŘENOS DAT":i<13?"ČÍTAČE A ČASOVÁNÍ":"POUŽITÍ V PRAXI";
 const explanation='<div class="guide-check"><div class="guide-check-tag">Co si zapamatovat</div>'+
  '<p><strong>'+s.lesson+'</strong></p><h4>Dokážeš to vysvětlit vlastními slovy?</h4>'+
  '<p>'+reflect[i]+'</p></div>';
 const actions='<div class="guide-actions">'+
  demoButton("previous","← Předchozí krok",i===0,' class="guide-secondary"')+
  (i<total-1?demoButton("next","Další krok →",false,' class="guide-next"'):
   demoButton("final-test","Přejít k závěrečnému testu →",false,' class="guide-next"'))+
  '<span class="guide-actions-note">'+(i===total-1?
   "Hotovo. Teď si ověříš celé učivo v závěrečném testu.":
   "Přejdi dál, až budeš rozumět příkladu. Nemusíš nic hádat.")+'</span></div>';
 card.innerHTML='<div class="guide-card-header"><span class="guide-step-number">'+topicGroup+
  ' · KROK '+(i+1)+' Z '+total+'</span><span class="guide-time">Přibližně '+s.minutes+'</span></div>'+
  '<h3>'+s.title+'</h3>'+s.text.map(p=>'<p>'+p+'</p>').join("")+
  '<div class="guide-example">'+demo(i)+'</div>'+explanation+actions;
 save();
}
function show(index){
 if(index<0||index>=total)return;
 state.index=index;render();
 const heading=card.querySelector("h3");
 if(heading){heading.setAttribute("tabindex","-1");heading.focus({preventScroll:true});}
 root.scrollIntoView({behavior:"smooth",block:"start"});
}
root.addEventListener("click",event=>{
 const node=event.target.closest("[data-nav],[data-action]");
 if(!node||node.disabled)return;
 if(node.dataset.nav!==undefined){show(Number(node.dataset.nav));return;}
 const action=node.dataset.action,i=state.index;
 if(action==="previous"){show(i-1);return;}
 if(action==="next"){show(i+1);return;}
 if(action==="final-test"){
  const target=byId("zaverecny-test");if(target)target.scrollIntoView({behavior:"smooth",block:"start"});
  return;
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
});
byId("guideReset").addEventListener("click",()=>{
 if(!window.confirm("Začít výklad znovu od prvního kroku?"))return;
 state=initial();render();root.scrollIntoView({behavior:"smooth"});
});
// Jediný vyhodnocovaný test je až za výkladem a pokročilými příklady.
const quizForm=byId("finalQuiz");
const quizItems=byId("finalQuizQuestions");
if(quizForm&&quizItems){
 quizItems.innerHTML=steps.map((s,i)=>{
  const choices=s.choices.map((answer,j)=>
   '<label><input type="radio" name="q'+i+'" value="'+j+'"> '+answer+'</label>'
  ).join("");
  return '<fieldset class="guide-quiz-question"><legend>'+(i+1)+'. '+s.question+
   '</legend>'+choices+'<p class="quiz-feedback" id="quiz'+(i+1)+'" aria-live="polite"></p></fieldset>';
 }).join("");
 quizForm.addEventListener("submit",event=>{
  event.preventDefault();
  let filled=0,score=0;
  steps.forEach((s,i)=>{
   const answer=quizForm.querySelector('input[name="q'+i+'"]:checked');
   const feedback=byId("quiz"+(i+1));
   if(!answer){
    feedback.textContent="Zatím bez odpovědi.";
    feedback.className="quiz-feedback";return;
   }
   filled++;
   const correct=Number(answer.value)===s.correct;
   if(correct)score++;
   feedback.textContent=correct?s.right:s.wrong;
   feedback.className="quiz-feedback "+(correct?"is-correct":"is-wrong");
  });
  const result=byId("quizSummary");
  result.textContent="Správně "+score+" z "+total+". Vyplněno "+filled+" z "+total+
   ". Vrať se k otázkám, které se nepovedly, a zkus vysvětlit princip vlastními slovy.";
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
 });
 quizForm.addEventListener("reset",()=>{
  steps.forEach((s,i)=>{const f=byId("quiz"+(i+1));f.textContent="";f.className="quiz-feedback";});
  byId("quizSummary").textContent="";
 });
}
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