---
layout: post
title: Set up, Configure, and Force HTTPS on AWS Elastic Beanstalk in 5 Minutes
category: tutorials
---

I've had the chance to deploy Ruby applications on a number of different platforms over the past few years, including [Heroku](https://www.heroku.com/), [Digital Ocean](https://www.digitalocean.com/) (via Capistrano directly to a VPS), and [AWS](https://aws.amazon.com/) via Elastic Beanstalk. Heroku is surely the easiest of the bunch and is probably still the best place to start - particularly if you've not deployed web apps or had some experience managing servers before.

That said, I'm increasingly enamored with [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) is a good example of Amazon's ability to abstract and simplify what can otherwise be a relatively painful process. In this article I'll quickly outline the process of obtaining a certificate, configuring your load balancer to terminate HTTPS, and forcing HTTPS across your site. This should (legitimately) take less than 5 minutes from start to finish. The example here is specifically for an app running NGINX, so the last step will be different if you're running Apache.

## Obtain the certificate

If you've obtained and configured certificates from traditional CA in the past, then you'll likely appreciate how simple this step is with AWS. First, sign in to AWS and visit the [Certificate Manager dashboard](https://aws.amazon.com/certificate-manager/). Click **Get started** (if that's still a thing by the time you're reading this), then **Request a certificate**. 

<img src="/images/aws-certificate-manager.png" class="img-responsive img-thumbnail">

Next, add your domain name and click **Review and request**. You can optionally add a wildcard here as well. 

<img src="/images/aws-certificate-manager2.png" class="img-responsive img-thumbnail">

Finally, click the **Confirm and request** button to complete the process, then check your email. AWS will email the registered owner of the domain with a confirmation link you'll need to click. You'll be redirected back to the AWS console and you'll want to click **I approve** to complete the process. Voila - your certificate has been issued!

## Configure the load balancer to terminate HTTPS

This step is the easiest. Just visit the Beanstalk console in AWS, select your application, click **Configuration** on the left panel. At the bottom of the list (probably), there should be a *Network Tier* section. Click the cog icon to configure the network tier settings. 

<img src="/images/network-tier.png" class="img-responsive img-thumbnail">

Here you want to change the **Secure listener port** to 443 (for HTTPS) and select the certificate you just created.

<img src="/images/aws-cert.png" class="img-responsive img-thumbnail">

Click **Apply** at the bottom of the page to save your settings.

## Force HTTPS on your site

Finally, force all connections to use HTTPS by default by rewriting any HTTP traffic automatically. Nginx will handle this magic for you with a simple config file.

In your root directory, create a new directory called `.ebextensions`. In that folder, create a new file named `01-force-https.config` and add the below file. 

<script src="https://gist.github.com/adamjstevenson/a1d3710c0698805bf2b2a1cefacac2a5.js"></script>

Next, commit the file and deploy again with `eb deploy`. 

Once the deploy is complete, restart NGINX for the new configuration to take effect; an easy way to do this is to ssh to the EC2 instance (`eb ssh`) and run `sudo service nginx restart`.

Visit your site using the HTTP protocol again and you should be redirected to the secure version. Success!

## Other resources

Be sure to check out the [AWS docs](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https.html) on configurating HTTPS for Elastic Beanstalk.

