"use strict";
(function(){
  const root=document.getElementById("detail");
  const course=window.MER3_COURSE;
  const num=Number(document.body.dataset.lesson);
  const lesson=course?.lessons.find(l=>l.number===num);
  if(!root||!lesson)return;
  const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const two=n=>String(n).padStart(2,"0");
  const group=course.groups.find(g=>g.id===lesson.group);
  const prev=course.lessons.find(l=>l.number===num-1);
  const next=course.lessons.find(l=>l.number===num+1);
  document.title="Téma "+two(num)+" | "+lesson.title;
  root.innerHTML=`<a class="course-back" href="../">← Zpět na výuková témata</a>
  <header class="hero">
    <div class="eyebrow">3. ROČNÍK · TÉMA ${two(lesson.number)} · CELEK ${group.id}</div>
    <h1>${escapeText(lesson.title)}</h1>
    <p class="lead">${escapeText(lesson.description)}</p>
    <div><span class="pill">3 × 45 minut</span><span class="pill">${escapeText(group.title)}</span></div>
  </header>
  <section class="section">
    <div class="kicker">PŘEHLED TÉMATU</div>
    <div class="cards">
      <article class="card"><span class="tag">01 · VÝKLAD</span><h2>Co se naučíme</h2><p>${escapeText(lesson.description)}</p></article>
      <article class="card"><span class="tag">02 · PRAKTICKÁ ČÁST</span><h2>Co si vyzkoušíme</h2><p>${escapeText(lesson.practice)}</p></article>
    </div>
  </section>
  <p class="course-note">Podrobný výklad a interaktivní úlohy postupně připravujeme.</p>
  <nav class="course-next" aria-label="Navigace mezi tématy">
    ${prev?'<a href="../'+prev.slug+'/">← Téma '+two(prev.number)+'</a>':'<span></span>'}
    <a href="../">Přehled všech témat</a>
    ${next?'<a href="../'+next.slug+'/">Téma '+two(next.number)+' →</a>':'<span></span>'}
  </nav>`;
})();