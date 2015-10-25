---
layout: post
title: Setting up Dns for a Custom Domain with Namecheap and Github Pages
category: tutorials
---

When I first registered and built this site back in 2008, it ran on Wordpress. I paid ~$15/month for my own hosting through Rackspace, pointed DNS to that VPS, and everything was pretty easy. I wasn't doing a great job of keeping up with the site and ended up taking it down about 4 years ago. 

When I decided to launch this site again, I settled on [GitHub Pages](https://pages.github.com/). If you're comfortable at all with Git, I definitely recommend this route. It's incredibly easy and light, GitHub pages will host your site for free (assuming you're using a public repository), and it's powered by [Jekyll](http://jekyllrb.com/) out of the box so can do cool dynamic things without the need for a database or any difficult programming. Since this very site is running on GitHub pages, you can see the entire source [here](https://github.com/adamjstevenson/adamjstevenson.github.io).


### Create a CNAME file
Once you've created your repository, you'll want to add a CNAME file to redirect your GitHub Pages site. This should exist in the root of your repo, and it's as simple as creating a file called "CNAME" that contains just your domain name. My domain name is adamjstevenson.com, so from the terminal this is just:

```
$ echo adamjstevenson.com > CNAME
```

Commit and push the file to your repository's root directory. 

### Add your DNS records to Namecheap
Login to Namecheap and visit the [Domain List](https://ap.www.namecheap.com/Domains/DomainList) page. Click **Manage** next to the domain name and select **Advanced DNS**. 

Click **ADD RECORDS** (or **MANAGE** if you already have records configured there) and add your DNS records as shown below, replacing the CNAME record with your own GitHub username.

<img src="/images/dns-settings.png" class="img-responsive img-thumbnail">

### Wait for DNS propagation
Kick back and wait for your change to be reflected; it could take up to 24 hours before your custom domain points to your GitHub repo. You'll pay about $12 per year for your custom domain and creating dynamic blog content is as easy as [writing some Markdown](https://daringfireball.net/projects/markdown/). 