/* Sdílené deterministické modely synchronní logiky pro maturitní otázku 05.
   Didaktická idealizace: bez zpoždění šíření, setup/hold poruch či metastability.
   D latch je úrovňově citlivý, D/JK flip-flop je hranově řízený. */
(function (root) {
  "use strict";

  function bit(value) { return value === 1 || value === true ? 1 : 0; }
  function edgeName(value) { return value === "falling" ? "falling" : "rising"; }
  function triggered(from, to, edge) {
    return edge === "falling" ? from === 1 && to === 0 : from === 0 && to === 1;
  }

  function createDLatch(initialQ) {
    var q = bit(initialQ), d = 0, enable = 0;
    function snapshot() { return { q: q, d: d, enable: enable, transparent: enable === 1 }; }
    function apply(nextD, nextEnable) {
      d = bit(nextD); enable = bit(nextEnable);
      if (enable) q = d;
      return snapshot();
    }
    function reset(value) { q = bit(value); d = 0; enable = 0; return snapshot(); }
    return Object.freeze({ apply: apply, snapshot: snapshot, reset: reset });
  }

  function createDFlipFlop(options) {
    options = options || {};
    var q = bit(options.initialQ), d = bit(options.initialD);
    var clock = bit(options.initialClock), edge = edgeName(options.edge);
    function snapshot() { return { q: q, d: d, clock: clock, edge: edge }; }
    function setD(value) { d = bit(value); return snapshot(); }
    function transitionClock(nextClock) {
      var before = clock;
      clock = bit(nextClock);
      var sampled = triggered(before, clock, edge);
      if (sampled) q = d;
      return { q: q, d: d, clock: clock, previousClock: before, edge: edge, sampled: sampled };
    }
    function reset(value) { q = bit(value); d = 0; clock = 0; return snapshot(); }
    return Object.freeze({ snapshot: snapshot, setD: setD, transitionClock: transitionClock, reset: reset });
  }

  function nextJK(q, j, k) {
    q = bit(q); j = bit(j); k = bit(k);
    if (j === 0 && k === 0) return q;
    if (j === 0 && k === 1) return 0;
    if (j === 1 && k === 0) return 1;
    return 1 - q;
  }

  function createJKFlipFlop(options) {
    options = options || {};
    var q = bit(options.initialQ), j = bit(options.initialJ), k = bit(options.initialK);
    var clock = bit(options.initialClock), edge = edgeName(options.edge);
    function snapshot() { return { q: q, j: j, k: k, clock: clock, edge: edge }; }
    function setInputs(nextJ, nextK) { j = bit(nextJ); k = bit(nextK); return snapshot(); }
    function transitionClock(nextClock) {
      var before = clock;
      clock = bit(nextClock);
      var sampled = triggered(before, clock, edge);
      if (sampled) q = nextJK(q, j, k);
      return { q: q, j: j, k: k, clock: clock, previousClock: before, edge: edge, sampled: sampled };
    }
    function reset(value) { q = bit(value); j = 0; k = 0; clock = 0; return snapshot(); }
    return Object.freeze({ snapshot: snapshot, setInputs: setInputs, transitionClock: transitionClock, reset: reset });
  }

  function evaluateDTrace(events, initialQ, edge) {
    var ff = createDFlipFlop({ initialQ: initialQ, edge: edge });
    return events.map(function (event, i) {
      ff.setD(event.d);
      var result = ff.transitionClock(event.clock);
      return { step: i, clock: result.clock, d: result.d, q: result.q,
        sampled: result.sampled, previousClock: result.previousClock };
    });
  }

  root.SkolaClockModel = Object.freeze({
    createDLatch: createDLatch,
    createDFlipFlop: createDFlipFlop,
    createJKFlipFlop: createJKFlipFlop,
    nextJK: nextJK,
    evaluateDTrace: evaluateDTrace
  });
})(window);
