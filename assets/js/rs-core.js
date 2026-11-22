/* Školní výukový model. Čistá logika sdílitelná mezi výkladem a Laboratoří.
   NOR-RS se vstupy aktivními logickou 1: S=R=1 vede v ustáleném
   idealizovaném modelu k Q=Q̄=0; po současném uvolnění je stav neurčený.
   Nejde o simulaci analogových přechodových dějů ani reálný bezpečnostní obvod. */
(function (root) {
  "use strict";

  function bit(value) {
    return value === 1 || value === true ? 1 : 0;
  }

  function createNorRs(initialQ) {
    var q = bit(initialQ), s = 0, r = 0, phase = "known";

    function snapshot() {
      if (phase === "forbidden" && s && r) {
        return { s: s, r: r, q: 0, qBar: 0, status: "forbidden" };
      }
      if (phase === "indeterminate") {
        return { s: s, r: r, q: null, qBar: null, status: "indeterminate" };
      }
      return {
        s: s, r: r, q: q, qBar: 1 - q,
        status: s ? "set" : (r ? "reset" : "hold")
      };
    }

    function apply(nextS, nextR) {
      s = bit(nextS);
      r = bit(nextR);
      if (s && r) {
        phase = "forbidden";
        q = null;
      } else if (s) {
        phase = "known";
        q = 1;
      } else if (r) {
        phase = "known";
        q = 0;
      } else if (phase === "forbidden") {
        // Současné uvolnění neumožňuje spolehlivě určit výsledný stav.
        phase = "indeterminate";
      }
      return snapshot();
    }

    function reset(nextQ) {
      q = bit(nextQ);
      s = 0;
      r = 0;
      phase = "known";
      return snapshot();
    }

    return Object.freeze({ apply: apply, reset: reset, snapshot: snapshot });
  }

  function nextStopPriority(current, start, stop) {
    // Zjednodušený model logiky se stop-prioritou, nikoliv bezpečnostní PLC.
    if (bit(stop)) return 0;
    if (bit(start)) return 1;
    return bit(current);
  }

  root.SkolaRSModel = Object.freeze({
    createNorRs: createNorRs,
    nextStopPriority: nextStopPriority
  });
})(window);
