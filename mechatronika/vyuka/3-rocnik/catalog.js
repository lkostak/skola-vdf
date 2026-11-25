"use strict";
/* Stejný tvar řádku jako maturitní otázky: otázka, číslo, text, šipka. */
(function(){
  const root=document.getElementById("course-groups");
  const course=window.MER3_COURSE;
  if(!root||!course)return;
  const escapeText=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const two=n=>String(n).padStart(2,"0");
  for(const group of course.groups){
    const lessons=course.lessons.filter(lesson=>lesson.group===group.id);
    const cards=lessons.map(lesson=>`<a class="question active" data-card href="${escapeText(lesson.slug)}/"><span class="n">${two(lesson.number)}</span><div><h3>${escapeText(lesson.title)}</h3><p>${escapeText(lesson.description)}</p></div><span class="arrow" aria-hidden="true">→</span></a>`).join("");
    root.insertAdjacentHTML("beforeend",
      `<section class="course-group" id="skupina-${group.id.toLowerCase()}" data-course-group><div class="course-group-heading"><div class="kicker">CELEK ${group.id} · ${lessons.length} TÉMAT</div><h2>${escapeText(group.title)}</h2><p>${escapeText(group.subtitle)}</p></div><div class="question-list">${cards}</div></section>`
    );
  }
  const input=document.querySelector("[data-course-search]");
  const empty=document.getElementById("no-course-results");
  if(!input)return;
  input.addEventListener("input",()=>{
    const query=input.value.trim().toLocaleLowerCase("cs");
    let count=0;
    for(const group of root.querySelectorAll("[data-course-group]")){
      const headingMatches=group.querySelector("h2").textContent.toLocaleLowerCase("cs").includes(query);
      let visibleInGroup=0;
      for(const card of group.querySelectorAll("[data-card]")){
        const matches=!query||headingMatches||card.textContent.toLocaleLowerCase("cs").includes(query);
        card.classList.toggle("hidden",!matches);
        if(matches){visibleInGroup++;count++;}
      }
      group.hidden=!visibleInGroup;
    }
    if(empty)empty.hidden=count>0;
  });
})();