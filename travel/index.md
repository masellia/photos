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

<h2>Visited Atlas</h2>

<div id="atlas-wrap">
  {% include world.svg %}
</div>

<style>
#atlas-wrap svg{width:100%;height:auto;display:block}
#atlas-wrap path{
  fill: rgba(0,0,0,.06);
  stroke: rgba(0,0,0,.18);
  stroke-width: .6;
  transition: fill .2s ease;
}
#atlas-wrap path.visited{
  fill: rgba(176,0,32,.35);
  stroke: rgba(176,0,32,.75);
}
#atlas-wrap path.visited:hover{
  fill: rgba(176,0,32,.55);
  cursor:pointer;
}
</style>

<script>
(function(){
  const visited = {
    {% for c in site.data.visited_countries %}
      "{{ c.iso2 }}": "{{ '/travel/' | append: c.slug | append: '/' | relative_url }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

  const svg = document.querySelector('#atlas-wrap svg');
  if (!svg) return;

  Object.keys(visited).forEach(function(iso){
    const el = svg.querySelector('#' + iso);
    if (!el) return;
    el.classList.add('visited');
    el.addEventListener('click', function(){
      window.location.href = visited[iso];
    });
  });
})();
</script>
