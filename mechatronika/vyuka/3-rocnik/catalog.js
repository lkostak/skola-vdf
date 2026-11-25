"use strict";
(function(){
 const root=document.getElementById("course-groups"),course=window.MER3_COURSE;
 if(!root||!course)return;
 const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const num=n=>String(n).padStart(2,"0");
 for(const group of course.groups){
   const items=course.lessons.filter(l=>l.group===group.id);
   const cards=items.map(l=>`<a class="topic-card" href="${escapeText(l.slug)}/" aria-label="Téma ${num(l.number)}: ${escapeText(l.title)}"><div class="topic-number">TÉMA ${num(l.number)}</div><h3>${escapeText(l.title)}</h3><p>${escapeText(l.description)}</p><div class="topic-footer"><span>3 vyučovací hodiny</span><span class="go">Otevřít téma →</span></div></a>`).join("");
   root.insertAdjacentHTML("beforeend",`<section class="group" id="skupina-${group.id.toLowerCase()}" style="--group-accent:${({cyan:"#40cfe5",blue:"#7cafff",purple:"#bd8af5",amber:"#f1bd6b",green:"#8bd3a5"})[group.color]}"><header class="grouphead"><span class="group-letter">${group.id}</span><div><h2>${escapeText(group.title)}</h2><p>${escapeText(group.subtitle)}</p></div><small>${items.length} témat</small></header><div class="cards">${cards}</div></section>`);
 }
})();
