---
layout: page
title: Travel Highlights
permalink: /travel/
menu: true
order: 2
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js" defer></script>

<style>
  .sq-grid{display:grid;gap:16px;margin:1.25rem 0;grid-template-columns:repeat(4,minmax(0,1fr))}
  @media (max-width:1100px){.sq-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (max-width:800px){.sq-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:520px){.sq-grid{grid-template-columns:repeat(1,minmax(0,1fr))}}
  .sq-card{border:1px solid rgba(0,0,0,.12);border-radius:14px;overflow:hidden;background:rgba(0,0,0,.02)}
  .sq-link{display:block}
  .sq-thumb{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:rgba(0,0,0,.04)}
  .sq-meta{padding:10px 12px}
  .sq-name{margin:0 0 4px 0;font-size:1rem;line-height:1.2}
  .sq-line{margin:0;color:rgba(0,0,0,.75);font-size:.9rem;line-height:1.25}
</style>

<div class="sq-grid">
{% assign items = site.data.travel | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/travel/full/' | append: p.file %}
  {% assign thumb = '/assets/img/travel/thumbs/' | append: p.file %}

  <article class="sq-card">
    <a class="sq-link glightbox" href="{{ full | relative_url }}"
       data-title="{{ p.name | escape }}"
       data-description="{{ p.place | escape }} — {{ p.year }}{% if p.camera and p.camera != '' %} • Camera: {{ p.camera | escape }}{% endif %}">
      <img class="sq-thumb" src="{{ thumb | relative_url }}" alt="{{ p.name | escape }}">
    </a>
    <div class="sq-meta">
      <h3 class="sq-name">{{ p.name }}</h3>
      <p class="sq-line">{{ p.place }} — {{ p.year }}</p>
      {% if p.camera and p.camera != "" %}
        <p class="sq-line">Camera: {{ p.camera }}</p>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>

<script>
document.addEventListener("DOMContentLoaded", function(){ GLightbox({ selector: '.glightbox' }); });
</script>
