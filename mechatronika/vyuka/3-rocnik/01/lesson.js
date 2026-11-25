"use strict";
/* Úvodní lekce: jednoduché interakce bez simulace fyziky, záměrně přehledné. */
(function(){
  const devices={
    doors:{
      sensor:"Pohybové čidlo zaznamená člověka",
      control:"Vyhodnotí signál a vydá povel k otevření",
      actuator:"Elektromotor pohybuje dveřními křídly",
      energy:"Mechanická část: dveřní křídla. Energie: elektrické napájení pohonu a řídicí jednotky."
    },
    heating:{
      sensor:"Teplotní čidlo změří teplotu v místnosti",
      control:"Termostat porovná naměřenou a požadovanou teplotu",
      actuator:"Relé nebo výkonový prvek sepne zdroj tepla",
      energy:"Regulovaná soustava: vytápěná místnost. Energie: elektrická energie pro řízení a energie pro vytápění."
    },
    washer:{
      sensor:"Snímač hladiny vody hlásí její výšku",
      control:"Jednotka podle programu rozhodne o napouštění",
      actuator:"Elektricky ovládaný ventil vpustí vodu",
      energy:"Mechanická část: buben a vana pračky. Energie: elektřina pro řízení a pohony."
    }
  };
  const sequence=[
    "Snímač zaznamenal člověka v prostoru před dveřmi.",
    "Čidlo odeslalo elektrický signál do řídicí jednotky.",
    "Jednotka podle programu a bezpečnostních podmínek rozhodla, že je možné otevřít.",
    "Jednotka vydala povel pohonu. Elektromotor využívá elektrickou energii a rozhýbe mechanismus.",
    "Dveřní křídla se otevřela. Informace vedla k viditelné fyzické činnosti."
  ];
  const controlCases=[
    {text:"Člověk stiskne vypínač a rozsvítí světlo.",answer:"manual",why:"Povel dává přímo člověk. Světlo se zapne podle stisku vypínače."},
    {text:"Světlo na schodišti se po stisku tlačítka samo vypne za 30 sekund.",answer:"automatic",why:"O vypnutí rozhoduje předem nastavený čas, nikoli měření skutečného osvětlení."},
    {text:"Termostat průběžně měří teplotu a podle odchylky od nastavené hodnoty zapíná vytápění.",answer:"regulation",why:"Systém porovnává skutečnou teplotu s požadovanou, a tím používá zpětnou vazbu."}
  ];
  const quiz=[
    {correct:1,explanation:"Snímač převádí informaci o sledované veličině nebo události na signál."},
    {correct:0,explanation:"Řídicí jednotka vyhodnocuje vstupy podle programu a rozhoduje o výstupech."},
    {correct:2,explanation:"Termostat používá změřenou skutečnou teplotu a reaguje na odchylku od požadované hodnoty."},
    {correct:1,explanation:"Automatizaci má smysl zavést, když řeší konkrétní problém a její přínosy převáží náklady a rizika."}
  ];
  window.MER3Lesson01Data={devices,sequence,controlCases,quiz};
  const $=id=>document.getElementById(id);
  const chapters=Array.from(document.querySelectorAll(".lesson-chapters > details"));
  if(chapters.length!==7)return;
  function openChapter(id,scroll){
    const target=$(id);
    if(!target)return;
    for(const ch of chapters)ch.open=ch===target;
    const index=chapters.indexOf(target);
    const label=$("progress-label");
    if(label)label.textContent="Otevřená část "+(index+1)+" ze 7";
    if(scroll)target.scrollIntoView({behavior:"smooth",block:"start"});
  }
  for(const ch of chapters){
    ch.addEventListener("toggle",()=>{
      if(!ch.open)return;
      for(const other of chapters)if(other!==ch&&other.open)other.open=false;
      const label=$("progress-label");
      if(label)label.textContent="Otevřená část "+(chapters.indexOf(ch)+1)+" ze 7";
    });
  }
  document.querySelectorAll("[data-go],[data-open-target]").forEach(el=>{
    el.addEventListener("click",event=>{
      event.preventDefault();
      openChapter(el.dataset.go||el.dataset.openTarget,true);
    });
  });
  // Výběr zařízení mění obsah tří schématických bloků.
  const deviceButtons=Array.from(document.querySelectorAll("[data-device]"));
  function renderDevice(key){
    const d=devices[key];if(!d)return;
    $("device-sensor").textContent=d.sensor;
    $("device-control").textContent=d.control;
    $("device-actuator").textContent=d.actuator;
    $("device-energy").textContent=d.energy;
    for(const b of deviceButtons){
      const selected=b.dataset.device===key;
      b.setAttribute("aria-pressed",String(selected));
      b.classList.toggle("selected",selected);
    }
  }
  deviceButtons.forEach(b=>b.addEventListener("click",()=>renderDevice(b.dataset.device)));
  // Postup příkladu se mění výhradně tlačítkem, žádné časové animace.
  let sequenceIndex=-1;
  const sequenceItems=Array.from(document.querySelectorAll("[data-sequence-step]"));
  function renderSequence(){
    sequenceItems.forEach((el,i)=>{
      el.classList.toggle("is-active",i===sequenceIndex);
      el.classList.toggle("is-done",i<sequenceIndex);
    });
    $("sequence-explanation").textContent=sequenceIndex<0?"Začni tlačítkem „První krok“.":sequence[sequenceIndex];
    $("sequence-next").disabled=sequenceIndex>=sequence.length-1;
    $("sequence-next").textContent=sequenceIndex<0?"První krok →":sequenceIndex>=sequence.length-1?"Hotovo":"Další krok →";
  }
  $("sequence-next").addEventListener("click",()=>{
    if(sequenceIndex<sequence.length-1)sequenceIndex++;
    renderSequence();
  });
  $("sequence-reset").addEventListener("click",()=>{sequenceIndex=-1;renderSequence();});
  renderSequence();
  // Tři běžné situace: přímé ovládání, automatické ovládání, regulace.
  let caseIndex=0,answered=false;
  const answerButtons=Array.from(document.querySelectorAll("[data-control-answer]"));
  function renderControl(){
    const current=controlCases[caseIndex];
    $("control-count").textContent="Situace "+(caseIndex+1)+" ze "+controlCases.length;
    $("control-scenario").textContent=current.text;
    $("control-feedback").textContent="Vyber jednu odpověď.";
    $("control-feedback").className="interaction-result";
    $("control-next").disabled=true;
    $("control-next").textContent=caseIndex===controlCases.length-1?"Zkusit znovu →":"Další situace →";
    answered=false;
    for(const b of answerButtons){b.disabled=false;b.classList.remove("correct","incorrect");}
  }
  answerButtons.forEach(b=>b.addEventListener("click",()=>{
    if(answered)return;
    answered=true;
    const current=controlCases[caseIndex];
    const isCorrect=b.dataset.controlAnswer===current.answer;
    const feedback=$("control-feedback");
    feedback.className="interaction-result "+(isCorrect?"is-good":"is-error");
    feedback.textContent=(isCorrect?"Správně. ":"Ještě ne. ")+current.why;
    for(const item of answerButtons){
      item.disabled=true;
      item.classList.toggle("correct",item.dataset.controlAnswer===current.answer);
      item.classList.toggle("incorrect",item===b&&!isCorrect);
    }
    $("control-next").disabled=false;
  }));
  $("control-next").addEventListener("click",()=>{caseIndex=(caseIndex+1)%controlCases.length;renderControl();});
  renderControl();
  // Kontrolní otázky: každá má jednu správnou odpověď; neúplný test se nehodnotí.
  $("quiz-check").addEventListener("click",()=>{
    const answers=quiz.map((_,i)=>document.querySelector('input[name="quiz-'+i+'"]:checked'));
    const result=$("quiz-result");
    if(answers.some(a=>!a)){
      result.className="interaction-result is-error";
      result.textContent="Nejprve vyber odpověď u všech čtyř otázek.";
      return;
    }
    let score=0;
    for(let i=0;i<quiz.length;i++){
      const ok=Number(answers[i].value)===quiz[i].correct;
      if(ok)score++;
      const line=document.querySelector('[data-quiz="'+i+'"] .quiz-feedback');
      line.className="quiz-feedback "+(ok?"is-good":"is-error");
      line.textContent=(ok?"Správně. ":"K této otázce se vrať. ")+quiz[i].explanation;
    }
    result.className="interaction-result "+(score===quiz.length?"is-good":"");
    result.textContent="Výsledek: "+score+" ze "+quiz.length+" správně. "+(score===quiz.length?"Základní principy zvládáš.":"Přečti si vysvětlení u odpovědí a zkus to znovu.");
  });
  $("quiz-reset").addEventListener("click",()=>{
    document.querySelectorAll('#final-quiz input[type="radio"]').forEach(input=>{input.checked=false;});
    document.querySelectorAll(".quiz-feedback").forEach(el=>{el.textContent="";el.className="quiz-feedback";});
    $("quiz-result").className="interaction-result";
    $("quiz-result").textContent="Po vyplnění klikni na „Vyhodnotit odpovědi“.";
  });
  // Přímé odkazy na kapitoly fungují i po obnovení stránky.
  const hash=window.location?.hash?.replace(/^#/,"");
  if(hash&&chapters.some(ch=>ch.id===hash))openChapter(hash,false);
})();