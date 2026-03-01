---
layout: page
title: Travels
permalink: /travel/
menu: true
order: 2
---

<p>
A collection of pictures I shot during my trips — either for holidays or for work.
</p>

<p>
Every time I travel abroad I try to catch, with my camera, a glimpse of how people live and share moments of everyday life in their characteristic environment.
</p>

<p>
Here are snapshots of life-in-motion, different from my usual horizon.
</p>

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

  .sq-meta{
    padding: 10px 12px;
    text-align: left !important;
    font-size: 0.9rem;
    line-height: 1.35;
    hyphens: none !important;
  }
  .sq-name{ font-weight: 600; }
  .sq-place{ opacity: 0.85; }
</style>

<div class="sq-grid">
  <article class="sq-card">
    <a class="sq-link" href="{{ '/travel/japan-2024/' | relative_url }}">
      <img class="sq-thumb" src="{{ '/assets/img/travel/japan-2024/thumbs/falcon2.jpg' | relative_url }}" alt="Japan 2024">
    </a>
    <div class="sq-meta">
      <div class="sq-name">Japan 2024</div>
      <div class="sq-place">Prototype trip gallery</div>
    </div>
  </article>
</div>