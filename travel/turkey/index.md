---
layout: page
title: Turkey
permalink: /travel/turkey/
---


<style>
/* GRID */
.sq-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:16px;
  margin:1.25rem 0;
}
@media (max-width:1100px){.sq-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:800px){.sq-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){.sq-grid{grid-template-columns:repeat(1,minmax(0,1fr))}}

.sq-card{
  border:1px solid rgba(0,0,0,.12);
  border-radius:14px;
  overflow:hidden;
  background:rgba(0,0,0,.02);
}

.sq-thumb{
  width:100%;
  aspect-ratio:4/3;
  object-fit:cover;
  display:block;
  background:rgba(0,0,0,.04);
  filter: grayscale(20%);
  transition: filter 0.35s ease, transform 0.35s ease;
}

.sq-card:hover .sq-thumb{
  filter: grayscale(0%);
  transform: scale(1.02);
}

/* THUMBNAIL CAPTION */
.sq-meta{
  padding:10px 12px;
  text-align:left !important;
  font-size:0.9rem;
  line-height:1.35;
  hyphens:none !important;
}
.sq-name{font-weight:600;}
.sq-place{opacity:0.9;}
.sq-date{opacity:0.8;}
.sq-camera{opacity:0.7;font-size:0.85rem;}

/* LIGHTBOX */
.sq-lightbox{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.92);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:9999;
  padding:24px;
}
.sq-lightbox.open{display:flex;}

.sq-lightbox-inner{
  max-width:min(1100px,92vw);
  max-height:92vh;
}

.sq-lightbox-img{
  max-width:100%;
  max-height:75vh;
  display:block;
  margin:0 auto;
}

.sq-cap{
  color:rgba(255,255,255,.85);
  margin-top:18px;
  text-align:center;
  font-size:0.9rem;
  line-height:1.4;
}
.sq-cap-place{font-weight:500;}
.sq-cap-date{opacity:0.9;}
.sq-cap-camera{opacity:0.8;font-size:0.85rem;}

.sq-close{
  position:absolute;
  top:14px;
  right:18px;
  font-size:34px;
  line-height:1;
  color:#fff;
  background:transparent;
  border:0;
  cursor:pointer;
  opacity:.9;
}

/* MAP FILTERING */
.sq-card.dim{
  opacity:0.25;
  transition:opacity 0.2s ease;
}
.sq-card.highlight{
  opacity:1;
  box-shadow:0 0 0 2px #b00020;
}
</style>

<!-- GRID -->
<div class="sq-grid">
{% assign items = site.data["travel-turkey"] | sort: "date" | reverse %}
{% for p in items %}
  <article class="sq-card" data-place="{{ p.place | escape }}">
    <a href="{{ '/assets/img/travel/turkey/full/' | append: p.file | relative_url }}" class="sq-a">
      <img class="sq-thumb" src="{{ '/assets/img/travel/turkey/thumbs/' | append: p.file | relative_url }}" alt="{{ p.name | escape }}">
    </a>
    <div class="sq-meta">
      <div class="sq-name">{{ p.name }}</div>
      <div class="sq-place">{{ p.place }}</div>
      <div class="sq-date">{{ p.date | date: "%B %Y" }}</div>
      {% if p.camera and p.camera != "" %}
        <div class="sq-camera">Camera: {{ p.camera }}</div>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>

<!-- LIGHTBOX -->
<div class="sq-lightbox" id="sq-lightbox">
  <button class="sq-close" id="sq-close">×</button>
  <div class="sq-lightbox-inner">
    <img class="sq-lightbox-img" id="sq-lightbox-img" alt="">
    <div class="sq-cap" id="sq-cap"></div>
  </div>
</div>

<script>
(function(){
  const lb = document.getElementById('sq-lightbox');
  const img = document.getElementById('sq-lightbox-img');
  const cap = document.getElementById('sq-cap');
  const closeBtn = document.getElementById('sq-close');

  const meta = {
    {% for p in items %}
    {{ p.file | jsonify }}: {
      place: {{ p.place | jsonify }},
      date: {{ (p.date | date: "%B %Y") | jsonify }},
      camera: {{ p.camera | default: "" | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

  function openLB(src, file){
    img.src = src;
    const m = meta[file] || {};
    cap.innerHTML = `
      <div class="sq-cap-place">${m.place || ""}</div>
      <div class="sq-cap-date">${m.date || ""}</div>
      ${m.camera ? `<div class="sq-cap-camera">Camera: ${m.camera}</div>` : ""}
    `;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLB(){
    lb.classList.remove('open');
    img.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.sq-a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const src = a.getAttribute('href');
      const file = src.split('/').pop();
      openLB(src, file);
    });
  });

  closeBtn.addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
})();
</script>

<hr style="margin:2.5rem 0;">

<h2>Map</h2>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div id="turkey-map" style="height:420px;border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,.12);"></div>

<script>
(function(){
  const raw = [
    {% for p in site.data["travel-turkey"] %}
      {% if p.lat and p.lon %}
      { place: {{ p.place | jsonify }}, lat: {{ p.lat }}, lon: {{ p.lon }} }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ];

  const seen = new Map();
  for (const m of raw) {
    const key = `${m.place}|${m.lat.toFixed(4)}|${m.lon.toFixed(4)}`;
    if (!seen.has(key)) seen.set(key, m);
  }
  const markers = Array.from(seen.values());

  const map = L.map('turkey-map', { scrollWheelZoom:false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,
    attribution:'&copy; OpenStreetMap contributors'
  }).addTo(map);

  const bounds = [];

  for (const m of markers){
    const ll = [m.lat, m.lon];
    bounds.push(ll);

    const marker = L.circleMarker(ll,{
      radius:6,
      color:'#b00020',
      fillColor:'#d0002a',
      fillOpacity:0.9,
      weight:1
    }).addTo(map).bindPopup(m.place);

    marker.on('click',function(){
      const cards = document.querySelectorAll('.sq-card');
      cards.forEach(card=>{
        if(card.dataset.place===m.place){
          card.classList.remove('dim');
          card.classList.add('highlight');
        }else{
          card.classList.remove('highlight');
          card.classList.add('dim');
        }
      });
      const grid=document.querySelector('.sq-grid');
      if(grid) grid.scrollIntoView({behavior:'smooth'});
    });
  }

  if(bounds.length){
    map.fitBounds(bounds,{padding:[20,20]});
  }else{
    map.setView([35,135],5);
  }

  map.on('click',function(){
    const cards=document.querySelectorAll('.sq-card');
    cards.forEach(card=>{
      card.classList.remove('dim');
      card.classList.remove('highlight');
    });
  });

})();
</script>
