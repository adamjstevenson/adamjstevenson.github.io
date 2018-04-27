---
layout: page
title: All Posts
permalink: /articles/
---

<div>
  {% for post in site.posts %}
    <div class="row topspace-lg">
      <div class="col-md-12 post-card-link">
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
          <div class="card post-card" style="background-image: url('{{ post.img }}'); background-repeat: no-repeat; background-position: center; position: relative; background-size: cover;">
            <h2>
            	{{ post.title }}
            </h2>
            <h4>{{post.date | date: '%B %d, %Y'}}</h4>
          </div>
        </a>
      </div>
    </div>
  {% endfor %}
</div>

<hr class="topspace-lg">
<p class="text-center">
  Images from <a href="https://unsplash.com">Unsplash</a>
</p>