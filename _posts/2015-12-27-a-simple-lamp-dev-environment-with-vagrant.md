---
layout: post
title: A Simple PHP Dev Environment with Vagrant
category: tutorials
---

In the past, I used WAMP for my local dev environment, then MAMP, then just ran everything on my mac. Configuring this and creating local environment that even closely match my production environments has always been a painful, frustrating process. 

Starting a couple years ago, I switched over to [Vagrant](https://www.vagrantup.com/) and couldn't be happier. With Vagrant you're able to provision reproducible development environments in minutes. I won't get into the details of how Vagrant works or all of the cool features it provides (you can read more on [their site](https://www.vagrantup.com/) or [this great blog post](https://24ways.org/2014/what-is-vagrant-and-why-should-i-care/)), but I'll quickly cover what's needed to get up and running with a LAMP dev environment that you can start using today. 

## Install Vagrant and a Virtual Machine

First, you'll want to install Vagrant. You can find the appropriate installer for your OS on the vagrant site [here](http://www.vagrantup.com/downloads). 

You'll also need a VM on your computer to host your Vagrant box. It seems most people opt for Virtual Box, which you can download for free [here](https://www.virtualbox.org/wiki/Downloads). 

## Add your Vagrantfile

The magic to Vagrant is that it automates configuration of your VM with simple files, which you can port to other machines and ensure consistency. Create a new directory for your PHP project or open your existing PHP project root directory and create a Vagrantfile. This is essentially just a Ruby file that describes the type of machine required for your project. Add the following code:

<script src="https://gist.github.com/adamjstevenson/c3fca4103f2be0109136.js"></script>

Note that this Vagrantfile assumes you're using VirtualBox. If you're not, you'll want to edit the `config.vm.box` to reflect the appropriate VM. 

## Provisioning

You might have noticed the bootstrap.sh file that was called in the Vagrantfile. This is essentially a basic shell script that we'll use to automatically configure our box and install all the software we'll need for a fully functioning Apache web server. 

Create a file called bootstrap.sh in the same directory as your Vagrantfile and add the code from the below Gist. You'll likely want to replace the `PASSWORD` in the bootstrap file to a more memorable password to be used with your local MySQL and phpMyAdmin setup. 

<script src="https://gist.github.com/adamjstevenson/bfd000e77d9e870f8b33.js"></script>

## Run it

That's it! Make sure you're in your project root directory where your Vagrantfile and bootstrap.sh shell file are, then run `vagrant up` from your terminal. You'll see Vagrant download our box and initialize the bootstrap file to install Apache, PHP, MySQL, phpMyAdmin, and some other helpful things. Hooray!

Once this is done, Vagrant should be running. You can confirm this by visiting the IP address that was specified in the Vagrantfile (5.5.5.5) in your browser, where you should now see the default Apache page (if you haven't added your own index file there):

<img src="/images/apache_default.png" class="img-responsive img-thumbnail">

In our Vagrantfile, we used this line to set your synced folder as the current directory:

```
config.vm.synced_folder "./", "/var/www/html"
```

Copy or clone your PHP project into this directory to load your site or create a new project in this directory if you haven't already. Going forward, you'll be able to develop and modify the files in this directory locally and test in real time. 

This post is intentionally pretty basic and there's a lot more that you can do with Vagrant, but this should be enough to get you up and running a simple local LAMP environment. 