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
</style>

<div id="top"></div>

<div class="sq-grid">
{% assign items = site.data.travel | reverse %}
{% for p in items %}
  {% assign thumb = '/assets/img/travel/thumbs/' | append: p.file %}
  {% assign id = 'tlb' | append: forloop.index %}

  <article class="sq-card">
    <a class="sq-link" href="#{{ id }}">
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

{% assign items = site.data.travel | reverse %}
{% for p in items %}
  {% assign full = '/assets/img/travel/full/' | append: p.file %}
  {% assign id = 'tlb' | append: forloop.index %}
  <div id="{{ id }}" class="sq-lightbox">
    <a class="sq-close" href="#top">✕ Close</a>
    <div class="sq-lightbox-inner">
      <img class="sq-lightbox-img" src="{{ full | relative_url }}" alt="{{ p.name | escape }}">
      <div class="sq-cap">
        <strong>{{ p.name }}</strong><br>
        {{ p.place }} — {{ p.year }}{% if p.camera and p.camera != "" %} • Camera: {{ p.camera }}{% endif %}
      </div>
    </div>
  </div>
{% endfor %}
