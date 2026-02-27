---
layout: page
title: Everyday Life
permalink: /everyday/
menu: true
order: 1
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js" defer></script>

<style>
  .sq-feed{display:grid;gap:22px;margin:1.5rem 0}
  .sq-item{border:1px solid rgba(0,0,0,.12);border-radius:14px;overflow:hidden}
  .sq-link{display:block}
  .sq-img{width:100%;height:auto;display:block}
  .sq-meta{padding:12px 16px}
  .sq-name{margin:0 0 6px 0;font-size:1.05rem}
  .sq-line{margin:0;color:rgba(0,0,0,.75);font-size:.95rem}
</style>

<div class="sq-feed">
{% assign items = site.data.everyday | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/everyday/full/' | append: p.file %}
  {% assign thumb = '/assets/img/everyday/thumbs/' | append: p.file %}

  <article class="sq-item">
    <a class="sq-link glightbox" href="{{ full | relative_url }}"
       data-title="{{ p.name | escape }}"
       data-description="{{ p.place | escape }} — {{ p.year }}{% if p.camera and p.camera != '' %} • Camera: {{ p.camera | escape }}{% endif %}">
      <img class="sq-img" src="{{ thumb | relative_url }}" alt="{{ p.name | escape }}">
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
document.addEventListener("DOMContentLoaded", function(){
  GLightbox({ selector: '.glightbox' });
});
</script>
