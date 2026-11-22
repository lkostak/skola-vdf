/* Spuštění ze složky repozitáře: node --test tests/rs-core.test.js
 * Jednoduché jednotkové testy bez externích závislostí. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = { window: {} };
vm.createContext(context);
const code = fs.readFileSync(path.join(__dirname, "../assets/js/rs-core.js"), "utf8");
vm.runInContext(code, context);
const { createNorRs, nextStopPriority } = context.window.SkolaRSModel;

test("NOR-RS uchovává počáteční platný stav", () => {
  const rs = createNorRs(0);
  assert.equal(rs.snapshot().q, 0);
  assert.equal(rs.snapshot().qBar, 1);
  assert.equal(rs.apply(0, 0).status, "hold");
});

test("NOR-RS SET → uvolnění → RESET → uvolnění", () => {
  const rs = createNorRs(0);
  assert.equal(rs.apply(1, 0).q, 1);
  assert.equal(rs.apply(0, 0).q, 1);
  assert.equal(rs.apply(0, 1).q, 0);
  assert.equal(rs.apply(0, 0).q, 0);
});

test("NOR-RS zakázaný stav je reprezentován Q=Q̄=0", () => {
  const rs = createNorRs(1);
  const state = rs.apply(1, 1);
  assert.equal(state.status, "forbidden");
  assert.equal(state.q, 0);
  assert.equal(state.qBar, 0);
});

test("Současné uvolnění zakázané kombinace není deterministické", () => {
  const rs = createNorRs(0);
  rs.apply(1, 1);
  const state = rs.apply(0, 0);
  assert.equal(state.status, "indeterminate");
  assert.equal(state.q, null);
  assert.equal(state.qBar, null);
  assert.equal(rs.apply(1, 0).q, 1);
  assert.equal(rs.apply(0, 0).q, 1);
});

test("Když se po zakázaném stavu uvolní pouze SET, RESET jednoznačně vynuluje", () => {
  const rs = createNorRs(0);
  rs.apply(1, 1);
  const state = rs.apply(0, 1);
  assert.equal(state.status, "reset");
  assert.equal(state.q, 0);
  assert.equal(state.qBar, 1);
});

test("Inicializace obnoví určený stav po zakázané kombinaci", () => {
  const rs = createNorRs(0);
  rs.apply(1, 1);
  rs.apply(0, 0);
  assert.equal(rs.reset(1).q, 1);
  assert.equal(rs.snapshot().status, "hold");
});

test("Stop-priorita: START uloží běh, uvolnění jej zachová, STOP jej vypne", () => {
  let q = 0;
  q = nextStopPriority(q, 1, 0);
  assert.equal(q, 1);
  q = nextStopPriority(q, 0, 0);
  assert.equal(q, 1);
  q = nextStopPriority(q, 0, 1);
  assert.equal(q, 0);
});

test("Současné START a STOP má výstup 0 bez ohledu na předchozí stav", () => {
  assert.equal(nextStopPriority(0, 1, 1), 0);
  assert.equal(nextStopPriority(1, 1, 1), 0);
});

test("Všechny čtyři vstupy zadané jako bity dávají očekávanou tabulku stop-priority", () => {
  const expectedFromZero = [0, 1, 0, 0]; // START,STOP: 00,10,01,11
  const inputs = [[0, 0], [1, 0], [0, 1], [1, 1]];
  inputs.forEach(([start, stop], index) => {
    assert.equal(nextStopPriority(0, start, stop), expectedFromZero[index]);
  });
});
