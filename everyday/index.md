---
layout: page
title: Everyday Life
permalink: /everyday/
menu: true
order: 1
---

<style>
  .sq-feed{display:grid;gap:28px;margin:1.5rem 0}
  .sq-item{border:1px solid rgba(0,0,0,.12);border-radius:14px;overflow:hidden}
  .sq-img{width:100%;height:auto;display:block}
  .sq-meta{padding:14px 16px}
  .sq-name{margin:0 0 6px 0;font-size:1.1rem}
  .sq-line{margin:0;color:rgba(0,0,0,.75);font-size:.95rem}
</style>

<div class="sq-feed">
{% assign items = site.data.everyday | reverse %}
{% for p in items %}
  <article class="sq-item">
    <img class="sq-img" src="{{ '/assets/img/everyday/full/' | append: p.file | relative_url }}" alt="{{ p.name | escape }}">
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
