/* Původní tematické okruhy + podtémata a explicitní učivo vyžadované ŠVP. */
(function(){const d=window.MER3_COURSE,root=document.getElementById("catalog");if(!d||!root)return;
const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const nn=n=>String(n).padStart(2,"0");
const guides=document.getElementById("svp-foundations");
if(guides)guides.innerHTML=d.foundations.map(f=>'<article class="svp-card"><h3>'+esc(f.title)+'</h3><p>'+esc(f.source)+'</p><div class="svp-card-links">'+f.links.map(n=>'<a href="'+nn(n)+'/">Tříhodinovka '+nn(n)+'</a>').join('')+'</div></article>').join('');
for(const t of d.topics){const ll=d.lessons.filter(l=>l.primaryTopic===t.id);
const sub=t.subtopics.map(s=>'<li><span>'+esc(s.id)+' · '+esc(s.title)+'</span><strong>'+s.hours+' h</strong></li>').join('');
const cards=ll.map(l=>{const chunks=l.chunks.map(c=>c.ref+' · '+c.hours+' h').join(' + ');const f=(l.focus||[]).map(s=>'<li>'+esc(s)+'</li>').join('');
return '<a class="card" data-lesson href="'+esc(l.slug)+'/"><div class="cardline"><span class="num">'+esc(l.id)+'</span><span class="status">Plánováno</span></div><h4>'+esc(l.title)+'</h4><p>'+esc(l.goal)+'</p>'+(f?'<ul class="card-focus">'+f+'</ul>':'')+'<div class="cardfooter"><span>'+esc(chunks)+'</span><span>3 × 45 minut →</span></div>'+(l.topics.length>1?'<span class="cross-topic">Pokračuje další tematický okruh</span>':'')+'</a>'}).join('');
root.insertAdjacentHTML('beforeend','<section class="group" data-group id="tema-'+t.id+'"><header class="grouphead"><span class="letter">'+nn(t.id)+'</span><h2>'+esc(t.title)+'</h2><small>'+t.hours+' hodin dle původního plánu</small></header><ul class="source-subtopics">'+sub+'</ul><div class="cards">'+cards+'</div></section>');
}
document.getElementById("search").addEventListener("input",e=>{const q=e.target.value.toLocaleLowerCase("cs").trim();for(const g of document.querySelectorAll("[data-group]")){const gmatch=g.querySelector("h2").textContent.toLocaleLowerCase("cs").includes(q)||g.querySelector(".source-subtopics").textContent.toLocaleLowerCase("cs").includes(q);let visible=0;for(const l of g.querySelectorAll("[data-lesson]")){const good=!q||gmatch||l.textContent.toLocaleLowerCase("cs").includes(q);l.classList.toggle("hide",!good);if(good)visible++;}g.classList.toggle("hide",!visible)}});})();
