---
layout: page
title: Everyday
description: Daily life — small moments, big light.
---

<style>
  .sq-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:14px;
    margin-top:1rem;
  }
  .sq-card{
    border-radius:14px;
    overflow:hidden;
    background:rgba(0,0,0,.02);
    border:1px solid rgba(0,0,0,.06);
    box-shadow:0 1px 8px rgba(0,0,0,.06);
  }
  .sq-link{display:block;color:inherit;text-decoration:none}
  /* Make thumbnails taller / less “compressed”:
     aspect-ratio: 1 means square; change to 4/5 etc if you want even taller */
  .sq-thumb{
    width:100%;
    aspect-ratio:1;
    object-fit:cover;
    display:block;
    background:rgba(0,0,0,.04);
    filter:grayscale(20%);
    transition:filter .35s ease,transform .35s ease;
  }
  .sq-link:hover .sq-thumb{filter:grayscale(0%);transform:scale(1.02)}
  .sq-meta{
    padding:10px 12px 12px;
    line-height:1.25;
  }
  .sq-title{font-weight:700;font-size:0.98rem;margin:0 0 6px}
  .sq-sub{opacity:.75;font-size:.88rem;margin:0}
  .sq-chip{display:inline-block;margin-top:8px;font-size:.78rem;opacity:.65}
  .sq-modal{
    position:fixed; inset:0;
    display:none;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.78);
    z-index:9999;
    padding:18px;
  }
  .sq-modal[aria-hidden="false"]{display:flex}
  .sq-modal-inner{
    max-width:min(1100px,96vw);
    max-height:92vh;
    background:#0b0b0b;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 20px 80px rgba(0,0,0,.5);
    border:1px solid rgba(255,255,255,.08);
  }
  .sq-modal-img{
    display:block;
    max-width:100%;
    max-height:80vh;
    height:auto;
    width:auto;
    margin:0 auto;
    background:#000;
  }
  .sq-modal-cap{
    padding:12px 14px 14px;
    color:rgba(255,255,255,.92);
    border-top:1px solid rgba(255,255,255,.08);
    font-size:.95rem;
  }
  .sq-modal-cap small{display:block;opacity:.7;margin-top:4px}
  .sq-close{
    position:absolute;
    top:14px; right:14px;
    width:42px; height:42px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,.25);
    background:rgba(0,0,0,.35);
    color:#fff;
    font-size:22px;
    line-height:40px;
    text-align:center;
    cursor:pointer;
    user-select:none;
  }
</style>

{%- comment -%}
Load your data file:
- If it's in _data/everyday.yml, use site.data.everyday
- If it's named differently, adjust here.
{%- endcomment -%}

{%- assign items = site.data.everyday | sort: "date" | reverse -%}

<div class="sq-grid">
  {%- for p in items -%}
  {%- assign idx = forloop.index -%}
  <article class="sq-card" id="card-{{ idx }}">
    <a class="sq-link" href="#photo-{{ idx }}" data-open="photo-{{ idx }}">
      <img class="sq-thumb"
           src="{{ '/assets/img/everyday/thumbs/' | append: p.file | relative_url }}"
           alt="{{ p.name | escape }}" />
      <div class="sq-meta">
        <p class="sq-title">{{ p.name }}</p>
        <p class="sq-sub">{{ p.place }}</p>
        <span class="sq-chip">
          {{ p.date | date: "%B %Y" }} · {{ p.camera }}
        </span>
      </div>
    </a>
  </article>
  {%- endfor -%}
</div>

{%- for p in items -%}
{%- assign idx = forloop.index -%}
<div class="sq-modal" id="photo-{{ idx }}" aria-hidden="true" role="dialog" aria-label="{{ p.name | escape }}">
  <div class="sq-close" data-close aria-label="Close">×</div>
  <div class="sq-modal-inner">
    <img class="sq-modal-img"
         src="{{ '/assets/img/everyday/full/' | append: p.file | relative_url }}"
         alt="{{ p.name | escape }}" />
    <div class="sq-modal-cap">
      <strong>{{ p.name }}</strong>
      <small>{{ p.place }} · {{ p.date | date: "%Y-%m-%d" }} · {{ p.camera }}</small>
    </div>
  </div>
</div>
{%- endfor -%}

<script>
(function () {
  const openers = document.querySelectorAll('[data-open]');
  const modals  = document.querySelectorAll('.sq-modal');

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // update hash without jumping
    history.replaceState(null, '', '#' + id);
  }

  function closeModal(m) {
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // remove hash
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }

  openers.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(a.getAttribute('data-open'));
    });
  });

  modals.forEach(m => {
    // click on overlay closes
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.hasAttribute('data-close')) {
        closeModal(m);
      }
    });
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.sq-modal[aria-hidden="false"]');
      if (open) closeModal(open);
    }
  });

  // If page loads with a hash that matches a modal, open it
  if (location.hash) {
    const id = location.hash.slice(1);
    const m = document.getElementById(id);
    if (m && m.classList.contains('sq-modal')) {
      openModal(id);
    }
  }
})();
</script>