document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".site-nav");
 if(toggle&&nav)toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
 const form=document.getElementById("job-filter-form"),results=document.getElementById("job-results"),count=document.getElementById("result-count");
 if (form && results && count) {
  let JOBS = [];

  const render = list => {
    results.innerHTML = "";
    count.textContent = list.length + " jobs shown";

    if (!list.length) {
      results.innerHTML =
        '<div class="job-card">No matching jobs found.</div>';
      return;
    }

    list.forEach(j => {
      const card = document.createElement("article");
      card.className = "job-card";

      const status = j.status || "Unverified";
      const title = j.title || "Untitled job";
      const category = j.category || "Needs Verification";
      const description = j.description || "";
      const link = j.link || "";
      const lastSeen = j.last_seen || "";

      card.innerHTML =
        '<span class="tag"></span>' +
        '<h3></h3>' +
        '<p class="category"></p>' +
        '<p class="description"></p>' +
        '<p class="last-seen"></p>' +
        '<a class="source" target="_blank" rel="noopener noreferrer">View Original Listing</a>';

      card.querySelector(".tag").textContent = status.toUpperCase();
      card.querySelector("h3").textContent = title;
      card.querySelector(".category").textContent = category;
      card.querySelector(".description").textContent =
        description.substring(0, 500);
      card.querySelector(".last-seen").textContent =
        lastSeen ? "Last seen: " + lastSeen : "";

      const source = card.querySelector(".source");

      if (link) {
        source.href = link;
      } else {
        source.remove();
      }

      results.appendChild(card);
    });
  };

  fetch("/Pakistan-jobs-CV-help/jobs-database.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Database could not be loaded");
      }
      return response.json();
    })
    .then(database => {
      JOBS = (Array.isArray(database.jobs) ? database.jobs : [])
        .filter(j => j.status !== "Needs Review" && j.status !== "Expired");

      const initialCategory = document.getElementById("filter-category").value.toLowerCase();

render(JOBS.filter(j =>
  !initialCategory || (j.category || "").toLowerCase() === initialCategory
));
    })
    .catch(() => {
      results.innerHTML =
        '<div class="job-card">Jobs could not be loaded. Please try again later.</div>';
      count.textContent = "Jobs unavailable";
    });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const q = document.getElementById("filter-title")
      .value.trim().toLowerCase();

    const loc = document.getElementById("filter-location")
      .value.trim().toLowerCase();

    const cat = document.getElementById("filter-category")
      .value.toLowerCase();

    render(JOBS.filter(j =>
      (!q || (j.title + " " + j.description + " " +
        (j.category || "")).toLowerCase().includes(q)) &&
      (!loc || (j.title + " " + j.description)
        .toLowerCase().includes(loc)) &&
      (!cat || (j.category || "").toLowerCase() === cat)
    ));
  });

  form.addEventListener("reset", () =>
    setTimeout(() => render(JOBS), 0)
  );
       }
 
 const cv=document.getElementById("cv-form");
 if(cv)cv.addEventListener("submit",e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();const safe=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const sections=[["Professional Summary",v("summary")],["Education",v("education")],["Work Experience",v("experience")],["Skills",v("skills")]];const out=document.getElementById("cv-preview");out.innerHTML="<h1>"+safe(v("name"))+"</h1><p style='text-align:center'>"+[v("email"),v("phone"),v("city")].filter(Boolean).map(safe).join(" | ")+"</p>"+sections.filter(x=>x[1]).map(x=>"<h3>"+x[0]+"</h3><p>"+safe(x[1])+"</p>").join("");out.style.display="block";out.scrollIntoView({behavior:"smooth"});});
});
