"use strict";
/*
 * VY-3-01 · jednoduchý didaktický model dopravníku.
 * Matematika je záměrná aproximace: rychlost v % se blíží hodnotě
 * pohon[%] − 0,65 × zatížení[%]. Regulační systém používá PI zpětnou vazbu.
 * Nejde o model skutečné mechaniky, škálování motoru ani návrh pohonu.
 */
(function () {
  const $ = id => document.getElementById(id);
  const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
  const components = {
    controller: ["Řídicí jednotka", "Porovnává požadovanou rychlost se skutečnou a podle rozdílu upravuje povel motoru. Může to být například mikrořadič nebo PLC."],
    actuator: ["Akční člen", "Převádí řídicí povel na skutečný zásah do stroje. V našem příkladu je to motor s řízeným výkonem."],
    machine: ["Řízený stroj", "Dopravní pás převáží krabice. Jeho skutečná rychlost se může změnit, když se zvýší zatížení."],
    sensor: ["Snímač", "Měří skutečnou rychlost, například z otáček motoru. Hodnotu pošle zpět do řídicí jednotky."]
  };

  for (const button of document.querySelectorAll("[data-component]")) {
    button.addEventListener("click", function () {
      const key = this.dataset.component;
      for (const other of document.querySelectorAll("[data-component]")) {
        const active = other === this;
        other.classList.toggle("active", active);
        other.setAttribute("aria-pressed", String(active));
      }
      $("componentLabel").textContent = components[key][0];
      $("componentDescription").textContent = components[key][1];
    });
  }

  const target = 60;
  const state = { open: target, closed: target, commandOpen: target, commandClosed: target, integral: 0, load: 0, playing: true, time: 0, history: [{ t: 0, open: 60, closed: 60 }], paintTime: 0, sampleTime: 0, insightKey: "" };

  // Jedna deterministická aktualizace fyzikálně zjednodušeného modelu.
  function advance(s, seconds) {
    const dt = clamp(seconds, 0, 0.05);
    const error = target - s.closed;
    let command = clamp(target + 1.7 * error + s.integral, 0, 100);
    // Základní ochrana proti růstu integrálu v trvalé saturaci motoru.
    if (!((command >= 99.99 && error > 0) || (command <= 0.01 && error < 0))) {
      s.integral = clamp(s.integral + 2.3 * error * dt, -30, 45);
    }
    command = clamp(target + 1.7 * error + s.integral, 0, 100);
    const loss = 0.65 * s.load;
    const response = 1 - Math.exp(-dt / 0.8);
    s.open += (clamp(target - loss, 0, 100) - s.open) * response;
    s.closed += (clamp(command - loss, 0, 100) - s.closed) * response;
    s.commandOpen = target;
    s.commandClosed = command;
    s.time += dt;
    return s;
  }
  // Užitečné pro automatické testy v repozitáři. V běžné stránce se nijak nevyužívá.
  window.MER3Lesson01Model = { advance, target };

  function renderNumbers() {
    $("loadValue").textContent = state.load + " %";
    $("speedOpen").textContent = String(Math.round(state.open));
    $("speedClosed").textContent = String(Math.round(state.closed));
    $("driveOpen").textContent = target + " %";
    $("driveClosed").textContent = Math.round(state.commandClosed) + " %";
    $("barOpen").style.width = clamp(state.open, 0, 100) + "%";
    $("barClosed").style.width = clamp(state.closed, 0, 100) + "%";
  }
  function renderInsight() {
    const maxPossible = 100 - 0.65 * state.load;
    let key, html;
    if (state.load === 0) {
      key = "none";
      html = "<strong>Zatím bez zátěže.</strong> Oba pásy mají rychlost přibližně 60 %. Přidej zátěž a sleduj rozdíl.";
    } else if (maxPossible < target) {
      key = "limit";
      html = "<strong>Motor narazil na hranici.</strong> Regulátor může požadovat až 100 % výkonu, ale při této zátěži už ani to nestačí. Zpětná vazba neumí překonat fyzické možnosti motoru.";
    } else if (Math.abs(state.closed - target) > 1.8) {
      key = "adjusting";
      html = "<strong>Regulace právě reaguje.</strong> Pravý pás změřil pokles rychlosti, a proto zvyšuje povel motoru. Levý stále posílá stejných 60 %.";
    } else {
      key = "balanced";
      html = "<strong>Pás s regulací se vrátil k cíli.</strong> Levý zůstává pomalejší, protože jeho povel se nezměnil. Pravý dokázal zvýšením výkonu vyrovnat zatížení.";
    }
    if (state.insightKey !== key) {
      state.insightKey = key;
      $("simInsight").innerHTML = html;
    }
  }
  function paintChart() {
    const canvas = $("speedChart"), ctx = canvas && canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(300, Math.floor(rect.width));
    const height = Math.max(200, Math.floor(rect.height));
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const left = 42, top = 18, right = 13, bottom = 27, plotWidth = width - left - right, plotHeight = height - top - bottom;
    const y = value => top + (100 - value) / 100 * plotHeight;
    const start = Math.max(0, state.time - 18);
    const x = t => left + (t - start) / 18 * plotWidth;
    ctx.lineWidth = 1;
    ctx.font = "12px Raleway, Arial, sans-serif";
    ctx.textAlign = "right";
    ctx.fillStyle = "#bad6df";
    for (const v of [0, 20, 40, 60, 80, 100]) {
      ctx.strokeStyle = "#7bafbb2a";
      ctx.beginPath(); ctx.moveTo(left, y(v)); ctx.lineTo(width - right, y(v)); ctx.stroke();
      ctx.fillText(v + "%", left - 8, y(v) + 4);
    }
    for (const offset of [0, 6, 12, 18]) {
      const xx = left + offset / 18 * plotWidth;
      ctx.beginPath(); ctx.moveTo(xx, top); ctx.lineTo(xx, height - bottom);
      ctx.strokeStyle = "#7bafbb18";ctx.stroke();
    }
    ctx.textAlign = "right";ctx.fillStyle = "#b9d3df";
    ctx.fillText("Čas →", width - right, height - 6);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#ffd400";ctx.lineWidth = 1.6;
    ctx.beginPath();ctx.moveTo(left, y(target));ctx.lineTo(width - right, y(target));ctx.stroke();ctx.setLineDash([]);
    const visible = state.history.filter(p => p.t >= start - 0.01);
    function line(key, color) {
      if (!visible.length) return;
      ctx.strokeStyle = color;ctx.lineWidth = 3;ctx.lineJoin = "round";ctx.lineCap = "round";ctx.beginPath();
      visible.forEach((point, i) => {const xx = clamp(x(point.t), left, width - right);const yy = y(point[key]);if (i === 0) ctx.moveTo(xx, yy);else ctx.lineTo(xx, yy);});
      ctx.stroke();
      const last = visible[visible.length - 1];ctx.fillStyle = color;ctx.beginPath();ctx.arc(clamp(x(last.t),left,width-right),y(last[key]),3.3,0,Math.PI * 2);ctx.fill();
    }
    line("open", "#4bbcff");
    line("closed", "#a6e56b");
  }
  function setLoad(value) {
    state.load = clamp(Number(value) || 0, 0, 80);
    $("loadSlider").value = state.load;
    $("loadValue").textContent = state.load + " %";
    state.insightKey = "";
    renderInsight();
  }
  function reset() {
    state.open = target;state.closed = target;state.commandClosed = target;state.commandOpen = target;state.integral = 0;
    state.time = 0;state.history = [{t:0,open:60,closed:60}];state.sampleTime = 0;state.paintTime = 0;
    state.playing = true;state.insightKey = "";
    $("pauseSim").textContent = "Pozastavit";
    $("pauseSim").setAttribute("aria-pressed","false");
    setLoad(0);renderNumbers();paintChart();
    $("predictionFeedback").textContent = "Vyber odpověď a potom spusť pokus.";
    $("predictionFeedback").className = "feedback-text";
    for (const choice of document.querySelectorAll("input[name=prediction]")) choice.checked = false;
  }
  $("loadSlider").addEventListener("input", e => setLoad(e.target.value));
  $("pauseSim").addEventListener("click", () => {
    state.playing = !state.playing;
    $("pauseSim").textContent = state.playing ? "Pozastavit" : "Pokračovat";
    $("pauseSim").setAttribute("aria-pressed", String(!state.playing));
    renderInsight();
  });
  $("resetSim").addEventListener("click", reset);
  $("try35").addEventListener("click", () => {
    const answer = document.querySelector("input[name=prediction]:checked");
    if (!answer) {
      $("predictionFeedback").textContent = "Nejdřív prosím vyber svoji předpověď.";
      $("predictionFeedback").className = "feedback-text error";
      return;
    }
    if (!state.playing) {
      state.playing = true;
      $("pauseSim").textContent = "Pozastavit";
      $("pauseSim").setAttribute("aria-pressed","false");
    }
    setLoad(35);
    if (answer.value === "correct") {
      $("predictionFeedback").textContent = "Správná předpověď. Sleduj graf: pravý pás nejdřív krátce zpomalí, pak zvyšuje povel motoru a vrací se k nastavené rychlosti.";
      $("predictionFeedback").className = "feedback-text success";
    } else {
      $("predictionFeedback").textContent = "Zkus pozorovat oba sloupce: levý motor má stále povel 60 %, pravý může výkon zvýšit. Právě to umožňuje zpětná vazba.";
      $("predictionFeedback").className = "feedback-text error";
    }
    $("speedChart").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth", block:"nearest"});
  });
  let lastFrame = performance.now();
  function animate(time) {
    const elapsed = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    if (!document.hidden && state.playing) {
      advance(state, elapsed);
      if (state.time - state.sampleTime > 0.11) {
        state.sampleTime = state.time;
        state.history.push({t:state.time,open:state.open,closed:state.closed});
        while(state.history.length > 1 && state.history[0].t < state.time - 18.5)state.history.shift();
      }
    }
    if (time - state.paintTime > 90) {
      state.paintTime = time;
      renderNumbers();
      renderInsight();
      paintChart();
    }
    requestAnimationFrame(animate);
  }
  reset();
  requestAnimationFrame(animate);
  window.addEventListener("resize", paintChart);

  const explanations = {
    control: "Tady se sledovaná veličina nepřeměřuje a nevyrovnává. Jde o ovládání bez regulace dané veličiny.",
    regulation: "Sledovaná veličina se měří a systém podle rozdílu od požadavku zasahuje. Jde o regulaci."
  };
  const answers = new Map();
  const cards = Array.from(document.querySelectorAll(".quiz-card"));
  cards.forEach((card, index) => {
    for (const button of card.querySelectorAll("[data-choice]")) {
      button.addEventListener("click", function () {
        const chosen = this.dataset.choice, good = chosen === card.dataset.answer;
        answers.set(index, good);
        for (const other of card.querySelectorAll("[data-choice]")) {
          other.classList.toggle("selected", other === this);
          other.setAttribute("aria-pressed", String(other === this));
        }
        const result = card.querySelector(".quiz-result");
        result.textContent = (good ? "Správně. " : "Ještě ne. ") + explanations[card.dataset.answer];
        result.className = "quiz-result " + (good ? "success" : "error");
        $("quizTotal").textContent = "Zodpovězeno: " + answers.size + " ze 4 · správně: " + Array.from(answers.values()).filter(Boolean).length + " ze 4";
      });
    }
  });

  $("checkDesign").addEventListener("click", () => {
    const sensor = $("sensorChoice").value, actuator = $("actuatorChoice").value;
    const feedback = $("designFeedback");
    if (!sensor || !actuator) {
      feedback.textContent = "Vyber nejdřív snímač i akční člen.";
      feedback.className = "feedback-text error";return;
    }
    if (sensor === "encoder" && actuator === "motor") {
      feedback.textContent = "Správně. Snímač otáček poskytuje informaci o rychlosti a řízený motor dokáže povel měnit. Zbývá zakreslit řídicí jednotku a zpětnou vazbu.";
      feedback.className = "feedback-text success";
    } else {
      let hint = sensor !== "encoder" ? "Potřebujeme měřit přímo rychlost, nikoli počet krabic ani stisk tlačítka. " : "";
      hint += actuator !== "motor" ? "Akční člen musí umět změnit pohyb pásu, ne jen svítit či měřit teplotu." : "";
      feedback.textContent = hint;
      feedback.className = "feedback-text error";
    }
  });

  $("printLesson").addEventListener("click", () => window.print());
})();
