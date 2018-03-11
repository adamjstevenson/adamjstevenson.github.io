---
layout: page
title: All Posts
permalink: /articles/
---

<ul class="list-unstyled">
  {% for post in site.posts %}
    <li>
      <!-- <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span> -->
      <h3>
      	<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      	<small>{{post.date | date: '%B %d, %Y'}}</small>
      </h3>
    </li>
  {% endfor %}
</ul>