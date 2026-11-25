"use strict";
/* Výklad vychází z prezentace Téma 01. Interakce ukazují změnu vstupu a rozhodnutí. */
(function(){
  const model={
    chooseSort(material,sensorWorking){
      const detected=material==="metal"&&sensorWorking;
      const destination=detected?"KOV":"OSTATNÍ";
      return {material,sensorWorking,detected,destination,correct:(material==="metal")===detected};
    },
    chooseHeat(mode,temperature,setpoint=22){
      return {mode,temperature,setpoint,heating:mode==="timer"||temperature<setpoint,usesFeedback:mode==="thermostat"};
    }
  };
  window.MER3Lesson01Model=model;
  const materialButtons=Array.from(document.querySelectorAll("[data-material]"));
  const modeButtons=Array.from(document.querySelectorAll("[data-mode]"));
  const sensorWorking=document.getElementById("sensor-working");
  const roomTemperature=document.getElementById("room-temperature");
  let material="metal",mode="timer";
  const byId=id=>document.getElementById(id);
  function setSelection(buttons,name,key){
    for(const button of buttons)button.setAttribute("aria-pressed",String(button.dataset[name]===key));
  }
  function renderSort(){
    if(!sensorWorking)return;
    const state=model.chooseSort(material,sensorWorking.checked);
    setSelection(materialButtons,"material",material);
    byId("part-body").setAttribute("fill",material==="metal"?"#c4d2d8":"#35a9c7");
    byId("part-text").textContent=material==="metal"?"KOV":"NEKOV";
    byId("sensor-led").setAttribute("fill",sensorWorking.checked?"#a6ce39":"#ef8c80");
    byId("metal-route").setAttribute("opacity",state.detected?"1":"0.18");
    byId("other-route").setAttribute("opacity",state.detected?"0.18":"1");
    byId("metal-bin").setAttribute("stroke",state.detected?"#a6ce39":"#638ba0");
    byId("other-bin").setAttribute("stroke",state.detected?"#638ba0":"#41d7ff");
    byId("sensor-state").textContent=!state.sensorWorking?"Bez spolehlivé detekce":state.detected?"Kov rozpoznán":"Kov nezjištěn";
    byId("controller-state").textContent=state.detected?"Aktivovat pohon":"Nechat pokračovat";
    byId("conveyor-result").textContent=(state.correct?"Správně":"Chyba")+": "+state.destination;
    const feedback=byId("conveyor-feedback");
    if(!state.sensorWorking&&material==="metal"){
      feedback.textContent="Snímač kov nerozpoznal. PLC postupovalo podle svého pravidla, ale kovový díl skončil v zásobníku OSTATNÍ. Chyba začala na vstupu.";
    }else if(!state.sensorWorking){
      feedback.textContent="Nekovový díl projel do OSTATNÍ. Výsledek je správný, ale porucha snímače přesto trvá. Některé závady se neprojeví u každého výrobku.";
    }else if(state.detected){
      feedback.textContent="Snímač rozpoznal kov, řídicí jednotka aktivovala vyřazovací pohon a díl skončil ve správném zásobníku.";
    }else{
      feedback.textContent="Snímač kov nezjistil, řídicí jednotka neaktivovala vyřazovací pohon a nekovový díl pokračoval rovně.";
    }
    feedback.classList.toggle("is-warning",!state.correct);
  }
  for(const button of materialButtons)button.addEventListener("click",()=>{material=button.dataset.material;renderSort();});
  if(sensorWorking)sensorWorking.addEventListener("change",renderSort);
  function renderHeat(){
    if(!roomTemperature)return;
    const t=Number(roomTemperature.value);
    const state=model.chooseHeat(mode,t);
    setSelection(modeButtons,"mode",mode);
    byId("room-temperature-value").textContent=t+" °C";
    byId("heating-temperature").textContent=t+" °C";
    byId("heating-controller").textContent=state.usesFeedback?"Termostat":"Časovač";
    byId("heating-controller-detail").textContent=state.usesFeedback?"Požadováno 22 °C":"Povel na 10 minut";
    byId("heating-state").textContent=state.heating?"Zapnuto":"Vypnuto";
    byId("feedback-line").hidden=!state.usesFeedback;
    byId("heating-feedback").textContent=state.usesFeedback?
      (state.heating?"Naměřená teplota je nižší než 22 °C. Termostat požádal o topení.":"Naměřená teplota dosáhla nebo překročila 22 °C. Termostat topení vypíná."):
      "Časovač zapne topení na deset minut, i kdyby už v místnosti bylo "+t+" °C. Skutečnou teplotu nevyhodnocuje.";
  }
  for(const button of modeButtons)button.addEventListener("click",()=>{mode=button.dataset.mode;renderHeat();});
  if(roomTemperature)roomTemperature.addEventListener("input",renderHeat);
  const reveal=byId("barrier-reveal"),solution=byId("barrier-solution");
  if(reveal&&solution)reveal.addEventListener("click",()=>{
    const open=solution.hidden;
    solution.hidden=!open;
    reveal.setAttribute("aria-expanded",String(open));
    reveal.textContent=open?"Skrýt možné řešení ↑":"Zobrazit možné řešení ↓";
  });
  renderSort();renderHeat();
})();