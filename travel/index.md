---
layout: page
title: Travels
permalink: /travel/
menu: true
order: 2
---

A collection of pictures I shot during my trips — either for holidays or for work.

Every time I travel abroad I try to catch, with my camera, a glimpse of how people live and share moments of everyday life in their characteristic environment.

Here are snapshots of life-in-motion, different from my usual horizon.

<div class="sq-grid">
  <article class="sq-card">
    <a href="{{ '/travel/japan-2024/' | relative_url }}">
      <img class="sq-thumb" src="{{ '/assets/img/travel/japan-2024/thumbs/Librai_Lisbona_210226.jpg' | relative_url }}" alt="Japan 2024">
    </a>
    <div class="sq-meta">
      <div class="sq-name">Japan 2024</div>
      <div class="sq-place">Prototype trip gallery</div>
    </div>
  </article>
</div>

<style>
  .sq-grid{display:grid;gap:16px;margin:1.25rem 0;grid-template-columns:repeat(4,minmax(0,1fr))}
  @media (max-width:1100px){.sq-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (max-width:800px){.sq-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:520px){.sq-grid{grid-template-columns:repeat(1,minmax(0,1fr))}}

  .sq-card{border:1px solid rgba(0,0,0,.12);border-radius:14px;overflow:hidden;background:rgba(0,0,0,.02)}
  .sq-link{display:block;text-decoration:none;color:inherit}

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

  .sq-meta{padding:10px 12px}
  .sq-name{margin:0 0 4px 0;font-size:1rem;line-height:1.2}
  .sq-line{margin:0;color:rgba(0,0,0,.75);font-size:.9rem;line-height:1.25}

  /* CSS lightbox */
  .sq-lightbox{
    position:fixed;inset:0;display:none;align-items:center;justify-content:center;
    background:rgba(0,0,0,.9);z-index:9999;padding:24px;
  }
  .sq-lightbox:target{display:flex !important}
  .sq-lightbox-inner{max-width:min(1200px, 95vw);max-height:90vh}
  .sq-lightbox-img{max-width:100%;max-height:75vh;display:block;margin:0 auto}
  .sq-close{
    position:fixed;top:18px;right:18px;
    background:rgba(255,255,255,.12);color:white;
    padding:10px 12px;border-radius:10px;text-decoration:none;
    font-size:14px;line-height:1;border:1px solid rgba(255,255,255,.25)
  }

.sq-cap{
  color: rgba(255,255,255,.85);
  margin-top: 18px;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
}

.sq-cap-place{
  font-weight: 500;
}

.sq-cap-date{
  opacity: 0.9;
}

.sq-cap-camera{
  opacity: 0.8;
  font-size: 0.85rem;
}

.sq-cap,
.sq-cap div {
  text-align: center !important;
  hyphens: none !important;
}

.sq-card.dim {
  opacity: 0.25;
  transition: opacity 0.2s ease;
}

.sq-card.highlight {
  opacity: 1;
  box-shadow: 0 0 0 2px #b00020;
}

/* Thumbnail caption styling */
.sq-meta{
  padding: 10px 12px;
  text-align: left !important;
  font-size: 0.9rem;
  line-height: 1.35;
  hyphens: none !important;
}

.sq-name{ font-weight: 600; }
.sq-place{ opacity: 0.9; }
.sq-date{ opacity: 0.8; }
.sq-camera{ opacity: 0.7; font-size: 0.85rem; }
</style>

<div id="top"></div>

<div class="sq-grid">
{% assign items = site.data.travel | reverse %}
{% for p in items %}
  {% assign thumb = '/assets/img/travel/thumbs/' | append: p.file %}
  {% assign id = 'tlb' | append: forloop.index %}

<article class="sq-card" data-place="{{ p.place | escape }}">  
    <a class="sq-link" href="#{{ id }}">
      <img class="sq-thumb" src="{{ thumb | relative_url }}" alt="{{ p.name | escape }}">
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

{% assign items = site.data.travel | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/travel/full/' | append: p.file %}
  {% assign id = 'tlb' | append: forloop.index %}
  <div id="{{ id }}" class="sq-lightbox">
    <a class="sq-close" href="#top">✕ Close</a>
    <div class="sq-lightbox-inner">
      <img class="sq-lightbox-img" src="{{ full | relative_url }}" alt="{{ p.name | escape }}">
<div class="sq-cap">
  <div class="sq-cap-place">{{ p.place }}</div>
  <div class="sq-cap-date">{{ p.date | date: "%B %Y" }}</div>
  {% if p.camera and p.camera != "" %}
    <div class="sq-cap-camera">Camera: {{ p.camera }}</div>
  {% endif %}
</div>
    </div>
  </div>
{% endfor %}

<hr style="margin: 2rem 0;">

<p>
<h2>Map</h2>
</p>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div id="travel-map" style="height: 420px; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,.12);"></div>

<script>
(function(){
  const raw = [
    {% for p in site.data.travel %}
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

  const map = L.map('travel-map', { scrollWheelZoom: false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const bounds = [];
  for (const m of markers) {
    const ll = [m.lat, m.lon];
    bounds.push(ll);

    const marker = L.circleMarker(ll, {
      radius: 6,
      color: '#b00020',
      fillColor: '#d0002a',
      fillOpacity: 0.9,
      weight: 1
    }).addTo(map).bindPopup(m.place);

    marker.on('click', function () {
      const cards = document.querySelectorAll('.sq-card');
      cards.forEach(card => {
        if (card.dataset.place === m.place) {
          card.classList.remove('dim');
          card.classList.add('highlight');
        } else {
          card.classList.remove('highlight');
          card.classList.add('dim');
        }
      });
      document.querySelector('.sq-grid').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (bounds.length) map.fitBounds(bounds, { padding: [20, 20] });
  else map.setView([20, 0], 2);

  map.on('click', function(){
    const cards = document.querySelectorAll('.sq-card');
    cards.forEach(card => {
      card.classList.remove('dim');
      card.classList.remove('highlight');
    });
  });
})();
</script>
