"use strict";
// Legacy conveyor model regression tests (model is no longer active in the first lesson).
// Run: node --test tests/mer3-01-model.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const lessonDir = path.join(__dirname, "../mechatronika/vyuka/3-rocnik/01-proc-automatizujeme-ovladani-a-regulace");

function loadModel() {
  const source = fs.readFileSync(path.join(lessonDir, "app.js"), "utf8");
  const listeners = new Map();
  const elements = new Map();
  function elem(id) {
    if (!elements.has(id)) elements.set(id, {
      value: "", textContent: "", innerHTML: "", className: "", style: {}, dataset: {},
      addEventListener(name, fn) { listeners.set(id + ":" + name, fn); },
      setAttribute(name, value) { this[name] = value; },
      getContext() { return null; },
      scrollIntoView() {}
    });
    return elements.get(id);
  }
  const window = {
    devicePixelRatio: 1,
    addEventListener() {},
    matchMedia() { return {matches: false}; },
    print() {}
  };
  const document = {
    hidden: false,
    getElementById: elem,
    querySelectorAll() { return []; },
    querySelector() { return null; }
  };
  vm.runInNewContext(source, { window, document, performance: {now: () => 0}, requestAnimationFrame() {}, console }, {filename: "app.js", timeout: 1000});
  return {advance: window.MER3Lesson01Model.advance, target: window.MER3Lesson01Model.target, listeners, elements};
}
function simulate(advance, load, seconds=15) {
  const state = {open:60, closed:60, commandOpen:60, commandClosed:60, integral:0, load, time:0};
  for (let i=0;i<seconds/0.02;i++) advance(state, 0.02);
  return state;
}
test("Previous lesson URL redirects to revised numeric URL; old model remains in source history", () => {
  const html = fs.readFileSync(path.join(lessonDir, "index.html"), "utf8");
  assert.match(html, /url=\.\.\/01\//);
  assert.ok(fs.existsSync(path.join(lessonDir, "../01/index.html")));
  assert.ok(fs.existsSync(path.join(lessonDir, "app.js")));
  assert.ok(fs.existsSync(path.join(lessonDir, "lesson.css")));
});
test("Zero load: both conveyor speeds and motor commands remain 60%", () => {
  const {advance} = loadModel();const s = simulate(advance,0);
  assert.ok(Math.abs(s.open-60)<0.01);
  assert.ok(Math.abs(s.closed-60)<0.01);
  assert.ok(Math.abs(s.commandClosed-60)<0.01);
});
test("35% load: open loop slows, closed loop recovers by increasing drive", () => {
  const {advance} = loadModel();const s=simulate(advance,35);
  assert.ok(s.open>36 && s.open<39);
  assert.ok(Math.abs(s.closed-60)<0.5);
  assert.ok(s.commandClosed>80 && s.commandClosed<86);
});
test("80% load: saturated motor cannot maintain set speed", () => {
  const {advance} = loadModel();const s=simulate(advance,80);
  assert.ok(s.open>7 && s.open<9);
  assert.ok(s.closed>47 && s.closed<49);
  assert.ok(Math.abs(s.commandClosed-100)<0.001);
});
test("UI initializes and range/reset/pause wiring works", () => {
  const {listeners,elements} = loadModel();
  listeners.get("loadSlider:input")({target:{value:"35"}});
  assert.equal(elements.get("loadValue").textContent, "35 %");
  listeners.get("resetSim:click")();
  assert.equal(elements.get("loadValue").textContent, "0 %");
  listeners.get("pauseSim:click")();
  assert.equal(elements.get("pauseSim").textContent,"Pokračovat");
});
