document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".site-nav");
 if(toggle&&nav)toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
 const form=document.getElementById("job-filter-form"),results=document.getElementById("job-results"),count=document.getElementById("result-count");
 if(form&&results&&window.JOBS){
  const render=list=>{results.innerHTML="";count.textContent=list.length+" sample "+(list.length===1?"role":"roles")+" shown";
   if(!list.length){results.innerHTML='<div class="job-card">No matching examples. Try another search.</div>';return;}
   list.forEach(j=>{const card=document.createElement("article");card.className="job-card";card.innerHTML='<span class="tag">SAMPLE — NOT A LIVE VACANCY</span><h3></h3><p class="company"></p><div class="job-meta"><span class="city"></span><span class="category"></span><span class="type"></span></div><p>This is a demonstration entry. Check official employer websites for genuine vacancies.</p>';card.querySelector("h3").textContent=j.title;card.querySelector(".company").textContent=j.company;card.querySelector(".city").textContent="📍 "+j.city;card.querySelector(".category").textContent=j.category;card.querySelector(".type").textContent=j.type;results.appendChild(card);});
  };
  render(JOBS);form.addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("filter-title").value.trim().toLowerCase(),loc=document.getElementById("filter-location").value.trim().toLowerCase(),cat=document.getElementById("filter-category").value.toLowerCase();render(JOBS.filter(j=>(!q||(j.title+" "+j.company+" "+j.category).toLowerCase().includes(q))&&(!loc||j.city.toLowerCase().includes(loc))&&(!cat||j.category.toLowerCase()===cat)));});
  form.addEventListener("reset",()=>setTimeout(()=>render(JOBS),0));
 }
 const cv=document.getElementById("cv-form");
 if(cv)cv.addEventListener("submit",e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();const safe=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const sections=[["Professional Summary",v("summary")],["Education",v("education")],["Work Experience",v("experience")],["Skills",v("skills")]];const out=document.getElementById("cv-preview");out.innerHTML="<h1>"+safe(v("name"))+"</h1><p style='text-align:center'>"+[v("email"),v("phone"),v("city")].filter(Boolean).map(safe).join(" | ")+"</p>"+sections.filter(x=>x[1]).map(x=>"<h3>"+x[0]+"</h3><p>"+safe(x[1])+"</p>").join("");out.style.display="block";out.scrollIntoView({behavior:"smooth"});});
});
