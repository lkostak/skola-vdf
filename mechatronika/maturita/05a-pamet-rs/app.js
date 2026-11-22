/* Otázka 05A. Interaktivní výklad používá sdílené jádro SkolaRSModel.
   Neobsahuje žádné serverové ukládání ani osobní data studentů. */
(function () {
  "use strict";

  var model = window.SkolaRSModel;
  if (!model) {
    console.error("Chybí sdílený soubor assets/js/rs-core.js");
    return;
  }

  function byId(id) { return document.getElementById(id); }
  function setText(id, value) {
    var target = byId(id);
    if (target) target.textContent = String(value);
  }
  function setRunning(id, running) {
    var target = byId(id);
    if (!target) return;
    target.classList.toggle("running", !!running);
    target.setAttribute("aria-label", running ? "Motor běží" : "Motor stojí");
  }

  // 01: Nejprve předpověď, potom teprve experiment.
  var introPrediction = null;
  var introMotor = 0;
  var introRun = byId("introRun");
  var introButtons = document.querySelectorAll("[data-intro-prediction]");

  introButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      introPrediction = Number(button.getAttribute("data-intro-prediction"));
      introButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      introRun.disabled = false;
      setText("introFeedback", "Předpověď zaznamenána. Nyní spusť ukázku.");
    });
  });

  introRun.addEventListener("click", function () {
    introMotor = model.nextStopPriority(0, 1, 0);
    // Po krátkém impulsu se START uvolní. Výstup zůstává v paměti.
    introMotor = model.nextStopPriority(introMotor, 0, 0);
    setRunning("introMotor", introMotor);
    setText("introMotorLabel", introMotor ? "BĚŽÍ" : "STOJÍ");
    if (introPrediction === introMotor) {
      setText("introFeedback", "Správná předpověď. START nastavilo uložený stav Q=1 a po uvolnění tlačítka zůstává Q=1.");
    } else {
      setText("introFeedback", "Podívej se na rozdíl: motor běží dál, i když už není START stisknuto. Obvod uchovává minulý povel v Q=1.");
    }
  });

  byId("introReset").addEventListener("click", function () {
    introPrediction = null;
    introMotor = 0;
    introRun.disabled = true;
    introButtons.forEach(function (item) {
      item.setAttribute("aria-pressed", "false");
    });
    setRunning("introMotor", false);
    setText("introMotorLabel", "STOJÍ");
    setText("introFeedback", "Nejprve vyber svoji předpověď.");
  });

  // 02: Diskrétní stav před a po povelu.
  var stepQ = 0;
  document.querySelectorAll("[data-state-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.getAttribute("data-state-action");
      if (action === "restart") {
        stepQ = 0;
        setText("stateOld", "0");
        setText("stateNew", "0");
        setText("stateCommand", "ŽÁDNÝ");
        setText("stateFeedback", "Vráceno do Q=0. Zkus SET a potom krok „Bez povelu“.");
        return;
      }
      var oldQ = stepQ;
      if (action === "set") stepQ = 1;
      if (action === "reset") stepQ = 0;
      setText("stateOld", oldQ);
      setText("stateNew", stepQ);
      setText("stateCommand", action === "set" ? "SET" : action === "reset" ? "RESET" : "ŽÁDNÝ");
      setText("stateFeedback",
        action === "set" ? "Povel SET změnil stav z " + oldQ + " na 1. Další krok z něj bude vycházet."
        : action === "reset" ? "Povel RESET změnil stav z " + oldQ + " na 0."
        : "Nebyl zadán žádný povel. Proto Qⁿ⁺¹ = Qⁿ = " + stepQ + "."
      );
    });
  });

  // 04: Kontrola porozumění třem typům multivibrátorů.
  document.querySelectorAll("[data-mv-answer]").forEach(function (button) {
    button.addEventListener("click", function () {
      var answer = button.getAttribute("data-mv-answer");
      document.querySelectorAll("[data-mv-answer]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
      var explanation = {
        monostabilni: "Správně. Monostabilní obvod se po spouštěcím impulsu na určitou dobu odchýlí od svého jediného stabilního stavu a potom se sám vrátí.",
        bistabilni: "Bistabilní obvod má dva stabilní stavy. Po SET se sám po uplynutí času nevrátí, ke změně potřebuje další povel.",
        astabilni: "Astabilní obvod nečeká na každý spouštěcí impuls. Samovolně vytváří opakované přechody mezi úrovněmi."
      };
      setText("mvFeedback", explanation[answer]);
    });
  });

  // 05: Fyzikálně smysluplný ustálený NOR-RS model.

  var rs = model.createNorRs(0);
  var inputs = { s: 0, r: 0 };

  function renderRs() {
    var snapshot = rs.snapshot();
    setText("sValue", snapshot.s);
    setText("rValue", snapshot.r);
    setText("rsQ", snapshot.q === null ? "?" : snapshot.q);
    setText("rsQbar", snapshot.qBar === null ? "?" : snapshot.qBar);
    byId("toggleS").setAttribute("aria-pressed", snapshot.s ? "true" : "false");
    byId("toggleR").setAttribute("aria-pressed", snapshot.r ? "true" : "false");
    byId("rsQ").classList.toggle("on", snapshot.q === 1);
    byId("rsQbar").classList.toggle("on", snapshot.qBar === 1);

    var messages = {
      hold: "S=0, R=0. Obvod uchovává poslední platný stav Q=" + snapshot.q + ".",
      set: "S=1, R=0. SET právě nastavuje Q=1. Zkus nyní S uvolnit.",
      reset: "S=0, R=1. RESET právě nastavuje Q=0. Zkus nyní R uvolnit.",
      forbidden: "S=1, R=1. Zakázaná kombinace: v ustáleném NOR-RS jsou Q i Q̄ rovny 0, tedy nejsou komplementární.",
      indeterminate: "Po současném uvolnění zakázané kombinace nelze spolehlivě určit, který stav se ustálí. Nastav S nebo R, případně obvod inicializuj."
    };
    setText("rsFeedback", messages[snapshot.status]);
    // Logické rovnice odpovídají skutečně nakresleným vazbám dvou NOR.
    if (snapshot.status === "indeterminate") {
      setText("norGateState", "Po současném uvolnění zakázané kombinace je výsledný ustálený stav neurčený. Nelze dosadit jedinou zaručenou hodnotu Q ani Q̄.");
    } else {
      setText("norGateState", "Horní NOR: R=" + snapshot.r + ", Q̄=" + snapshot.qBar +
        " → Q=" + snapshot.q + ". Dolní NOR: S=" + snapshot.s + ", Q=" + snapshot.q +
        " → Q̄=" + snapshot.qBar + ".");
    }

    document.querySelectorAll("[data-rs-row]").forEach(function (row) {
      row.classList.toggle("selected-row", row.getAttribute("data-rs-row") === "" + snapshot.s + snapshot.r);
    });
  }

  byId("toggleS").addEventListener("click", function () {
    inputs.s = 1 - inputs.s;
    rs.apply(inputs.s, inputs.r);
    renderRs();
  });

  byId("toggleR").addEventListener("click", function () {
    inputs.r = 1 - inputs.r;
    rs.apply(inputs.s, inputs.r);
    renderRs();
  });

  byId("rsRelease").addEventListener("click", function () {
    inputs.s = 0;
    inputs.r = 0;
    rs.apply(0, 0);
    renderRs();
  });

  byId("rsReset").addEventListener("click", function () {
    inputs.s = 0;
    inputs.r = 0;
    rs.reset(0);
    renderRs();
  });

  // 06: STOP-prioritní řízení. Není to stejné jako přímé S=R=1 u RS.
  var motorQ = 0;

  function motorEvent(start, stop, explanation) {
    motorQ = model.nextStopPriority(motorQ, start, stop);
    // Impuls skončil; bez dalšího povelu stav přetrvá.
    motorQ = model.nextStopPriority(motorQ, 0, 0);
    setRunning("motorGraphic", motorQ);
    setText("motorQ", motorQ);
    setText("motorFeedback", explanation + " Uložený stav Q=" + motorQ + ".");
  }

  byId("motorStart").addEventListener("click", function () {
    motorEvent(1, 0, "Po krátkém START se motor rozběhl. Tlačítko je již uvolněné.");
  });
  byId("motorStop").addEventListener("click", function () {
    motorEvent(0, 1, "STOP ukončil běh motoru. Tlačítko je již uvolněné.");
  });
  byId("motorBoth").addEventListener("click", function () {
    motorEvent(1, 1, "Současné START i STOP: díky předem definované prioritě STOP motor stojí.");
  });
  byId("motorReset").addEventListener("click", function () {
    motorQ = 0;
    setRunning("motorGraphic", false);
    setText("motorQ", "0");
    setText("motorFeedback", "Model vrácen do výchozího stavu: motor stojí (Q=0).");
  });

  // 07: Vysvětlující kontrola, bez uložení výsledků.
  var answers = [
    {
      name: "quiz1", value: "1",
      correct: "Správně. S=R=0 znamená uchování posledního platného stavu Q=1.",
      wrong: "Při S=R=0 se stav pamatuje. Žádný aktivní vstup neznamená změnu, nikoliv automatickou nulu."
    },
    {
      name: "quiz2", value: "0",
      correct: "Správně. U NOR-RS je kombinace 1/1 zakázaná a oba výstupy jsou při aktivní kombinaci nulové.",
      wrong: "Základní NOR-RS nemá při S=R=1 definovanou přednost SET ani RESET. Ustálené výstupy jsou Q=Q̄=0."
    },
    {
      name: "quiz3", value: "2",
      correct: "Správně. V samostatném stop-prioritním modelu STOP=1 vždy určuje Qⁿ⁺¹=0.",
      wrong: "Stop-prioritní řízení má předřazené pravidlo: STOP=1 převáží nad START=1 a nastaví Q=0."
    }
  ];

  var quizForm = byId("quizForm");
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var correctCount = 0;
    var answered = 0;
    answers.forEach(function (question, i) {
      var checked = quizForm.querySelector('input[name="' + question.name + '"]:checked');
      var target = byId("quizFeedback" + (i + 1));
      if (!checked) {
        target.textContent = "Tuhle otázku zatím nemáš vyplněnou.";
        target.className = "quiz-feedback";
        return;
      }
      answered++;
      var correct = checked.value === question.value;
      if (correct) correctCount++;
      target.textContent = correct ? question.correct : question.wrong;
      target.className = "quiz-feedback " + (correct ? "is-correct" : "is-wrong");
    });
    setText("quizSummary", "Správně " + correctCount + " ze " + answers.length +
      " úloh. Vyplněno " + answered + " ze " + answers.length +
      ". Odpovědi si můžeš upravit a znovu vyhodnotit.");
  });

  quizForm.addEventListener("reset", function () {
    answers.forEach(function (question, i) {
      var target = byId("quizFeedback" + (i + 1));
      target.textContent = "";
      target.className = "quiz-feedback";
    });
    setText("quizSummary", "");
  });

  renderRs();
})();
