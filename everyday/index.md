---
layout: page
title: Everyday Life
permalink: /everyday/
menu: true
order: 1
---


Humans and their tools —busy with life, I witness on my daily path.



<style>
  .sq-grid{display:grid;gap:16px;margin:1.25rem 0;grid-template-columns:repeat(4,minmax(0,1fr))}
  @media (max-width:1100px){.sq-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (max-width:800px){.sq-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:520px){.sq-grid{grid-template-columns:repeat(1,minmax(0,1fr))}}

  .sq-card{border:1px solid rgba(0,0,0,.12);border-radius:14px;overflow:hidden;background:rgba(0,0,0,.02)}
  .sq-link{display:block;text-decoration:none;color:inherit}
  .sq-thumb{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:rgba(0,0,0,.04)}
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
  .sq-lightbox-img{max-width:100%;max-height:90vh;display:block;margin:0 auto}
  .sq-close{
    position:fixed;top:18px;right:18px;
    background:rgba(255,255,255,.12);color:white;
    padding:10px 12px;border-radius:10px;text-decoration:none;
    font-size:14px;line-height:1;border:1px solid rgba(255,255,255,.25)
  }
  .sq-cap{
    color:rgba(255,255,255,.85);margin-top:10px;font-size:14px;line-height:1.35;
    text-align:center
  }
  .sq-card.dim {
  opacity: 0.25;
  transition: opacity 0.2s ease;
}

.sq-card.highlight {
  opacity: 1;
  box-shadow: 0 0 0 2px #b00020;
}
</style>

<div id="top"></div>

<div class="sq-grid">
{% assign items = site.data.everyday | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/everyday/full/' | append: p.file %}
  {% assign thumb = '/assets/img/everyday/thumbs/' | append: p.file %}
  {% assign id = 'lb' | append: forloop.index %}

  <article class="sq-card" data-place="{{ p.place | escape }}">
   <a class="sq-link" href="#{{ id }}">
      <img class="sq-thumb" src="{{ thumb | relative_url }}" alt="{{ p.name | escape }}">
    </a>
    <div class="sq-meta">
      <h3 class="sq-name">{{ p.name }}</h3>
      <p class="sq-line">{{ p.place }} — {{ p.date }}</p>      
      {% if p.camera and p.camera != "" %}
        <p class="sq-line">Camera: {{ p.camera }}</p>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>

{% assign items = site.data.everyday | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/everyday/full/' | append: p.file %}
  {% assign id = 'lb' | append: forloop.index %}
  <div id="{{ id }}" class="sq-lightbox">
    <a class="sq-close" href="#top">✕ Close</a>
    <div class="sq-lightbox-inner">
      <img class="sq-lightbox-img" src="{{ full | relative_url }}" alt="{{ p.name | escape }}">
      <div class="sq-cap">
        <strong>{{ p.name }}</strong><br>
        {{ p.place }} — {{ p.date }}{% if p.camera and p.camera != "" %} • Camera: {{ p.camera }}{% endif %}
      </div>
    </div>
  </div>
{% endfor %}


<hr style="margin: 2rem 0;">

<h2>Map</h2>
<p style="margin-top:-.5rem;color:rgba(0,0,0,.7)">Locations of photos in this section (one marker per unique place).</p>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div id="everyday-map" style="height: 420px; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,.12);"></div>

<script>
(function(){
  // Build markers array from Jekyll data
  const raw = [
    {% for p in site.data.everyday %}
      {% if p.lat and p.lon %}
      {
        place: {{ p.place | jsonify }},
        lat: {{ p.lat }},
        lon: {{ p.lon }}
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ];

  // Deduplicate by coordinates (rounded to avoid tiny differences)
  const seen = new Map();
  for (const m of raw) {
    const key = `${m.place}|${m.lat.toFixed(4)}|${m.lon.toFixed(4)}`;
    if (!seen.has(key)) seen.set(key, m);
  }
  const markers = Array.from(seen.values());

  const el = document.getElementById('everyday-map');
  if (!el) return;

  const map = L.map('everyday-map', { scrollWheelZoom: false });

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

  // scroll grid into view
    document.querySelector('.sq-grid').scrollIntoView({ behavior: 'smooth' });
   });

  }

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [20, 20] });
  } else {
    map.setView([20, 0], 2); // fallback global view
  }
  
  map.on('click', function(){
  const cards = document.querySelectorAll('.sq-card');
  cards.forEach(card => {
    card.classList.remove('dim');
    card.classList.remove('highlight');
  });
});
})();
</script>
