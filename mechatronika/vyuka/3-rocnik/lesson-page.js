"use strict";
(function(){
 const root=document.getElementById("detail"),c=window.MER3_COURSE,num=Number(document.body.dataset.lesson);
 const lesson=c?.lessons.find(l=>l.number===num);if(!root||!lesson)return;
 const esc=s=>String(s).replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 const group=c.groups.find(g=>g.id===lesson.group),prev=c.lessons.find(l=>l.number===num-1),next=c.lessons.find(l=>l.number===num+1);
 document.title=lesson.title+" | Mechatronika 3. ročník";
 root.innerHTML=`<a class="back" href="../">← Všech 32 témat</a><header class="lesson-header"><div class="eyebrow">TÉMA ${String(lesson.number).padStart(2,"0")} · ${esc(group.title)}</div><h1>${esc(lesson.title)}</h1><p>${esc(lesson.description)}</p><div class="lesson-info"><span>3 × 45 minut</span><span>3. ročník · Mechatronika a robotika</span></div></header><section class="lesson-section"><h2>O čem to bude</h2><p>${esc(lesson.description)}</p></section><section class="lesson-section"><h2>Co si vyzkoušíme</h2><p>${esc(lesson.practice)}</p></section><p class="not-ready">Podrobný výklad a interaktivní úlohy připravujeme.</p><nav class="lesson-nav" aria-label="Další téma">${prev?'<a href="../'+prev.slug+'/">← Téma '+String(prev.number).padStart(2,"0")+'</a>':'<span></span>'}<a href="../">Přehled témat</a>${next?'<a href="../'+next.slug+'/">Téma '+String(next.number).padStart(2,"0")+' →</a>':'<span></span>'}</nav>`;
})();
