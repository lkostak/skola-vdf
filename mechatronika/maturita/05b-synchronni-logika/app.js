/* Maturitní otázka 05B. Veškeré matematické modely sdíleny v clock-core.js.
   Experimenty a testy pracují offline, bez osobních údajů a bez externí knihovny. */
(function () {
  "use strict";
  var core = window.SkolaClockModel;
  if (!core) { console.error("Chybí assets/js/clock-core.js"); return; }
  var byId = function (id) { return document.getElementById(id); };
  var text = function (id, value) { byId(id).textContent = String(value); };
  var buttonState = function (id, value) {
    byId(id).setAttribute("aria-pressed", value ? "true" : "false");
  };
  function appendEvent(id, message) {
    var list = byId(id), item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
    while (list.children.length > 8) list.removeChild(list.firstChild);
  }

  // 01. Otázka před výkladem: změna D bez hrany Q nemění.
  document.querySelectorAll("[data-intro-prediction]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = Number(button.getAttribute("data-intro-prediction"));
      document.querySelectorAll("[data-intro-prediction]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
      text("introFeedback", value === 0
        ? "Správně. D se změnilo, ale aktivní hodinová hrana nepřišla. D flip-flop tedy uchovává Q=0."
        : "Tato odpověď by odpovídala průhlednému D latchi při EN=1. Hranově řízený D flip-flop bez aktivní hrany drží Q=0.");
    });
  });

  // 02. Hodinový krokovač.
  var clock = 0, risingCount = 0;
  byId("clockStep").addEventListener("click", function () {
    var before = clock;
    clock = 1 - clock;
    var rise = before === 0 && clock === 1;
    if (rise) risingCount++;
    text("clockLevel", clock);
    text("clockEvent", rise ? "↑ 0→1" : "↓ 1→0");
    text("clockRiseCount", risingCount);
    text("clockFeedback", rise
      ? "Náběžná hrana: CLK se změnilo z 0 na 1. Počet náběžných hran je nyní " + risingCount + "."
      : "Sestupná hrana: CLK se změnilo z 1 na 0. Náběžně řízený flip-flop při ní data nepřijímá.");
  });
  byId("clockReset").addEventListener("click", function () {
    clock = 0; risingCount = 0;
    text("clockLevel", 0); text("clockEvent", "ŽÁDNÁ"); text("clockRiseCount", 0);
    text("clockFeedback", "Hodiny vráceny na 0. První krok vytvoří náběžnou hranu.");
  });

  // 03. D latch: transparentní při EN=1.
  var latch = core.createDLatch(0);
  var latchD = 0, latchEN = 0;
  function renderLatch() {
    var state = latch.apply(latchD, latchEN);
    text("latchD", state.d); text("latchDStatus", state.d);
    text("latchEN", state.enable); text("latchENStatus", state.enable);
    text("latchQ", state.q);
    buttonState("latchDButton", state.d);
    buttonState("latchENButton", state.enable);
    text("latchFeedback", state.transparent
      ? "EN=1: latch je průhledný, proto Q okamžitě sleduje datový vstup D=" + state.d + "."
      : "EN=0: latch drží dříve uložené Q=" + state.q + ". Změna D sama Q neovlivní.");
  }
  byId("latchDButton").addEventListener("click", function () { latchD=1-latchD; renderLatch(); });
  byId("latchENButton").addEventListener("click", function () { latchEN=1-latchEN; renderLatch(); });
  byId("latchReset").addEventListener("click", function () {
    latch.reset(0); latchD=0; latchEN=0; renderLatch();
  });
  renderLatch();

  // 04. D: datový vstup lze měnit kdykoliv, Q se mění pouze na zvolené hraně.
  var dFlop = core.createDFlipFlop({initialQ:0, edge:"rising"});
  var dValue = 0;
  function renderD() {
    var state=dFlop.snapshot();
    text("dInput", state.d); text("dClock", state.clock); text("dQ", state.q);
    text("dDButtonValue", state.d);
    buttonState("dToggle", state.d);
  }
  function clearDPrediction() { byId("dPredict").value=""; byId("dStep").disabled=true; }
  byId("dToggle").addEventListener("click", function () {
    dValue=1-dValue; dFlop.setD(dValue); renderD(); clearDPrediction();
    text("dFeedback", "Změnil se jen datový vstup D=" + dValue + ". Q se nezmění, dokud nenastane aktivní hrana.");
  });
  byId("dPredict").addEventListener("change", function () {
    byId("dStep").disabled=byId("dPredict").value==="";
  });
  byId("dEdgeSelect").addEventListener("change", function () {
    dValue=0;
    dFlop=core.createDFlipFlop({initialQ:0,edge:byId("dEdgeSelect").value});
    clearDPrediction(); byId("dHistory").replaceChildren(); renderD();
    text("dFeedback", "Změnil se typ aktivní hrany. Model se vrátil na CLK=0, D=0, Q=0.");
  });
  byId("dStep").addEventListener("click", function () {
    var predicted=Number(byId("dPredict").value);
    var state=dFlop.snapshot();
    var outcome=dFlop.transitionClock(1-state.clock);
    var direction=outcome.clock===1?"náběžná ↑":"sestupná ↓";
    var explanation=outcome.sampled
      ? "Právě nastala aktivní " + direction + ", proto se uložilo D=" + outcome.d + "."
      : "Nastala " + direction + ", ale tento typ flip-flopu je citlivý na opačnou hranu. Q se uchovalo.";
    var correct=predicted===outcome.q;
    renderD(); clearDPrediction();
    text("dFeedback", (correct?"Správně. ":"Zkus to přehodnotit. ")+explanation+" Výsledné Q="+outcome.q+".");
    appendEvent("dHistory",(correct?"✓ ":"✗ ")+direction+" | D="+outcome.d+", Q="+outcome.q+" | "+(outcome.sampled?"zápis":"uchování"));
  });
  byId("dReset").addEventListener("click", function () {
    dValue=0;
    dFlop=core.createDFlipFlop({initialQ:0,edge:byId("dEdgeSelect").value});
    clearDPrediction(); byId("dHistory").replaceChildren(); renderD();
    text("dFeedback","Model inicializován. Změň D, vyber Q a proveď další přechod CLK.");
  });
  renderD();

  // 05. Časový diagram z přesně dané řady diskrétních událostí.
  // Hrana je mezi stavem předchozího kroku a stavem tohoto kroku.
  var timingEvents=[
    {clock:0,d:0},{clock:0,d:1},{clock:1,d:1},{clock:1,d:0},{clock:0,d:0},
    {clock:0,d:0},{clock:1,d:0},{clock:1,d:1},{clock:0,d:1},{clock:1,d:1}
  ];
  var timingTrace=core.evaluateDTrace(timingEvents,0,"rising");
  function eventLabel(step) {
    return step.sampled?"↑ aktivní":step.previousClock===1&&step.clock===0?"↓ sestupná":"beze změny";
  }
  function renderTimingTable() {
    var body=byId("timingTableBody");
    body.replaceChildren();
    timingTrace.forEach(function (step) {
      var row=document.createElement("tr");
      row.setAttribute("data-step",step.step);
      var values=[String(step.step),String(step.clock),String(step.d),eventLabel(step)];
      values.forEach(function (value) { var cell=document.createElement("td");cell.textContent=value;row.appendChild(cell); });
      var answerCell=document.createElement("td"), select=document.createElement("select");
      select.setAttribute("aria-label","Očekávané Q po kroku "+step.step);
      select.className="timing-select";
      [{value:"",text:"Zvol Q"},{value:"0",text:"0"},{value:"1",text:"1"}].forEach(function (o) {
        var option=document.createElement("option");option.value=o.value;option.textContent=o.text;select.appendChild(option);
      });
      answerCell.appendChild(select);row.appendChild(answerCell);
      var result=document.createElement("td");result.className="timing-result";result.textContent="—";row.appendChild(result);
      body.appendChild(row);
    });
  }
  function wavePath(values, high, low, x0, step) {
    var parts=["M",x0,values[0]===1?high:low];
    for(var i=0;i<values.length;i++){
      parts.push("H",x0+(i+1)*step);
      if(i+1<values.length && values[i+1]!==values[i])parts.push("V",values[i+1]===1?high:low);
    }
    return parts.join(" ");
  }
  function timingSVG(reveal) {
    var x0=108,step=76,n=timingTrace.length;
    var rows=[
      {label:"CLK",values:timingTrace.map(function(x){return x.clock;}),high:64,low:102,color:"#41d7ff"},
      {label:"D",values:timingTrace.map(function(x){return x.d;}),high:147,low:185,color:"#ffd400"}
    ];
    if(reveal) rows.push({label:"Q",values:timingTrace.map(function(x){return x.q;}),high:230,low:268,color:"#a6ce39"});
    var chunks=['<rect width="900" height="320" rx="5" fill="#001d28" />'];
    for(var i=0;i<n;i++){
      var x=x0+i*step;
      chunks.push('<line x1="'+x+'" y1="30" x2="'+x+'" y2="290" stroke="#ffffff" stroke-opacity=".11" stroke-dasharray="3 5" />');
      chunks.push('<text x="'+(x+step/2)+'" y="307" text-anchor="middle" font-size="13" fill="#c6dce3">'+i+'</text>');
      if(timingTrace[i].sampled)
        chunks.push('<line x1="'+x+'" y1="32" x2="'+x+'" y2="280" stroke="#a6ce39" stroke-width="1.6" stroke-dasharray="6 5" opacity=".8" />');
    }
    rows.forEach(function(row){
      chunks.push('<text x="15" y="'+(row.low-7)+'" font-size="21" font-weight="700" fill="'+row.color+'">'+row.label+'</text>');
      chunks.push('<text x="79" y="'+(row.high+4)+'" font-size="12" text-anchor="end" fill="#b8d9e2">1</text>');
      chunks.push('<text x="79" y="'+(row.low+4)+'" font-size="12" text-anchor="end" fill="#b8d9e2">0</text>');
      chunks.push('<path d="'+wavePath(row.values,row.high,row.low,x0,step)+'" fill="none" stroke="'+row.color+'" stroke-width="3.5" stroke-linejoin="round" />');
    });
    if(!reveal){
      chunks.push('<rect x="11" y="214" width="863" height="69" rx="5" fill="#ffffff" fill-opacity=".055" stroke="#ffffff" stroke-opacity=".16" stroke-dasharray="6 6" />');
      chunks.push('<text x="48" y="252" font-size="17" fill="#e7f5fb">Q: nejprve vyplň tabulku, pak se zobrazí průběh</text>');
    }
    chunks.push('<text x="866" y="21" text-anchor="end" font-size="12" fill="#b6ced8">časové kroky →</text>');
    return chunks.join("");
  }
  function renderTimingChart(reveal) {
    byId("timingChart").innerHTML=timingSVG(reveal);
    byId("timingChart").setAttribute("aria-label",reveal
      ?"Časový diagram signálů CLK, D a řešení Q; náběžné hrany vyznačeny přerušovaně"
      :"Časový diagram signálů CLK a D; křivka Q je zatím skrytá");
  }
  byId("timingCheck").addEventListener("click", function () {
    var correct=0,answered=0,rows=byId("timingTableBody").querySelectorAll("tr");
    var incomplete=Array.from(rows).some(function(row){ return row.querySelector("select").value===""; });
    if(incomplete){
      text("timingFeedback","Nejdřív vyplň Q ve všech krocích. Teprve potom ukážeme správný časový průběh.");
      return;
    }
    rows.forEach(function (row,i){
      var select=row.querySelector("select"),result=row.querySelector(".timing-result");
      var value=select.value;
      row.classList.remove("is-correct","is-wrong");
      if(value!=="")answered++;
      var ok=value!==""&&Number(value)===timingTrace[i].q;
      if(ok) correct++;
      row.classList.add(ok?"is-correct":"is-wrong");
      result.textContent=ok?"✓ správně":"✗ správně Q="+timingTrace[i].q;
    });
    renderTimingChart(true);
    text("timingFeedback","Správně "+correct+" z "+timingTrace.length+" kroků. Vyplněno "+answered+". "+
      (correct===timingTrace.length?"Výborně, všechny hodnoty odpovídají vzorkování při náběžné hraně."
        :"Porovnej svůj průběh s odkrytým Q. Změna D ani sestupná hrana sama o sobě Q nemění."));
  });
  byId("timingReset").addEventListener("click", function () {
    renderTimingTable(); renderTimingChart(false);
    text("timingFeedback","Nový pokus: všechny hodnoty Q jsou skryté. Sledovat musíš náběžné hrany.");
  });
  renderTimingTable();renderTimingChart(false);

  // 06. JK: J/K lze změnit kdykoliv, Q pouze při náběžné hraně.
  var jkFlop=core.createJKFlipFlop({initialQ:0,edge:"rising"});
  var j=0,k=0;
  function renderJK() {
    var state=jkFlop.snapshot();
    text("jkJButtonValue",state.j);text("jkKButtonValue",state.k);
    text("jkInputs",state.j+" / "+state.k);text("jkClock",state.clock);text("jkQ",state.q);
    buttonState("jkJButton",state.j);buttonState("jkKButton",state.k);
  }
  function clearJKPrediction(){byId("jkPredict").value="";byId("jkStep").disabled=true;}
  function changeJK(which) {
    if(which==="j")j=1-j;else k=1-k;
    jkFlop.setInputs(j,k);renderJK();clearJKPrediction();
    text("jkFeedback","Vstupy jsou nyní J="+j+", K="+k+". Q se mění až na aktivní náběžné hraně.");
  }
  byId("jkJButton").addEventListener("click",function(){changeJK("j");});
  byId("jkKButton").addEventListener("click",function(){changeJK("k");});
  byId("jkPredict").addEventListener("change",function(){
    byId("jkStep").disabled=byId("jkPredict").value==="";
  });
  byId("jkStep").addEventListener("click",function(){
    var predicted=Number(byId("jkPredict").value);
    var previous=jkFlop.snapshot();
    var state=jkFlop.transitionClock(1-previous.clock);
    var correct=predicted===state.q;
    var message;
    if(!state.sampled)message="Při sestupné hraně si náběžně řízený JK ponechal Q="+state.q+".";
    else if(state.j===0&&state.k===0)message="J=K=0: uchování Q="+state.q+".";
    else if(state.j===0&&state.k===1)message="J=0, K=1: RESET nastavil Q=0.";
    else if(state.j===1&&state.k===0)message="J=1, K=0: SET nastavil Q=1.";
    else message="J=K=1: JK při náběžné hraně překlopil Q z "+previous.q+" na "+state.q+".";
    renderJK();clearJKPrediction();
    text("jkFeedback",(correct?"Správně. ":"Tato předpověď nebyla správná. ")+message);
    appendEvent("jkHistory",(correct?"✓ ":"✗ ")+(state.sampled?"↑ náběžná":"↓ sestupná")+" | J/K="+state.j+"/"+state.k+" | Q="+state.q);
  });
  byId("jkReset").addEventListener("click",function(){
    j=0;k=0;jkFlop=core.createJKFlipFlop({initialQ:0,edge:"rising"});
    byId("jkHistory").replaceChildren();clearJKPrediction();renderJK();
    text("jkFeedback","Model inicializován na CLK=0, Q=0. Nastav J/K a předpověz další stav.");
  });
  renderJK();

  // 07. Závěrečné otázky se zpětnou vazbou; neukládají se žádná osobní data.
  var solutions=[
    {name:"quiz1",correct:"1",yes:"Správně. D se zapisuje na náběžné hraně 0→1, nikoli během trvání úrovně CLK=1.",no:"Vstup D se změnil, ale žádná nová aktivní náběžná hrana nenastala. Q proto drží nulu."},
    {name:"quiz2",correct:"0",yes:"Správně. Úrovňově citlivý latch s EN=1 průběžně předává D na Q.",no:"Latch s aktivním EN=1 je průhledný; nečeká na jednotlivou hodinovou hranu."},
    {name:"quiz3",correct:"2",yes:"Správně. Kombinace J=K=1 znamená překlopení Q: z jedničky na nulu.",no:"U hranově řízeného JK kombinace J=K=1 není zakázaná a nedává prioritu SET. Při hraně překlápí stav."},
    {name:"quiz4",correct:"1",yes:"Správně. Flip-flop se sestupnou aktivní hranou vzorkuje D při 1→0.",no:"Zvolený D flip-flop je citlivý na sestupnou hranu 1→0. Mezi aktivními hranami si uchovává Q."}
  ];
  var quizForm=byId("quizForm");
  quizForm.addEventListener("submit",function(event){
    event.preventDefault();
    var score=0,answered=0;
    solutions.forEach(function(solution,i){
      var checked=quizForm.querySelector('input[name="'+solution.name+'"]:checked');
      var target=byId("quizFeedback"+(i+1));
      if(!checked){target.textContent="Tuto otázku zatím nemáš vyplněnou.";target.className="quiz-feedback";return;}
      answered++;
      var ok=checked.value===solution.correct;
      if(ok)score++;
      target.textContent=ok?solution.yes:solution.no;
      target.className="quiz-feedback "+(ok?"is-correct":"is-wrong");
    });
    text("quizSummary","Správně "+score+" ze "+solutions.length+" otázek. Vyplněno "+answered+
      ". Důležitější než skóre je umět vysvětlit, proč se Q mění právě v určitém okamžiku.");
  });
  quizForm.addEventListener("reset",function(){
    solutions.forEach(function(x,i){var target=byId("quizFeedback"+(i+1));target.textContent="";target.className="quiz-feedback";});
    text("quizSummary","");
  });
})();