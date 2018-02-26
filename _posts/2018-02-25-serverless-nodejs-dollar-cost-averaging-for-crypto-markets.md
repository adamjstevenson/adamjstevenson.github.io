---
layout: post
title: Serverless Dollar-cost Averaging for the Crypto Markets with Node.js, AWS Lambda, and the GDAX API
category: tutorials
---

<div class="row topspace">
  <div class="col-md-12 alert alert-warning">
    <strong>Big scary discalimer!</strong> This is not investment advice. Be wise with your money and expect that using this code or code like it can cause you to lose it.
  </div>
</div>

## What we're doing here
* Build an [AWS Lambda](https://aws.amazon.com/lambda/) function in Node.js. 
* Hook into the APIs that [GDAX](https://docs.gdax.com/) provides to buy $10 worth of [Ethereum](https://www.ethereum.org/) every day for 100 days.
* Use [Twilio](https://www.twilio.com/sms) to send an SMS to tell us about it.

## Getting started

* You'll need an [AWS account](https://aws.amazon.com/) to use Lambda. 
* You need a [GDAX developer account](https://public.sandbox.gdax.com/) to hook into GDAX. I strongly recommend using their sandbox (linked) to test and get everything working, then you can just swap the keys for the live account once you're ready. 
* You also need a [Twilio account](https://www.twilio.com/try-twilio) and phone number to send SMS messages. Twilio is awesome and very inexpensive, and you can even try it for free.

## Why dollar-cost averaging?

Cypto markets are incredibly volatile and [dollar-cost averaging](https://en.wikipedia.org/wiki/Dollar_cost_averaging) is a simple investment strategy that essentially aims to reduce the impact of volatility on investments by spreading a purchase over time in equal increments. If you wanted to buy $1k worth of Bitcoin as a (very speculative) investment, then you might decide to buy $100 every 10 days for 100 days instead of purchasing all of it at once. 

But why not buy it all at once? Let's look at a simple example. 

<div class="row topspace-lg">
  <div class="col-md-12">
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </div>
  <script type="text/javascript" src="/js/dollar-cost-example.js"></script>
</div>

<div class="topspace-md"></div>
This chart illustrates the price of BTC in USD over the course of a 100 day period. At day 0, the price for 1 BTC is $15,000 USD. 100 days later, the value of that Bitcoin is $10,000 USD. If you'd invested your entire sum at once, your $1k would now be worth about $660. You got bitcoined! 😩


If you'd instead divided that purchase evenly across those 100 days, buying $10 each day, your investment would be net positive because you'd purchased the majority of your BTC when the price was lower than it is today.

This is of course just one example of what might occur; instead maybe this graph is inverted or BTC continues to rise incrementally over the course of those 100 days. In that case, you'd actually be better off purchasing all of the BTC at day 0. Whatever. There's definitely valid [criticism](https://en.wikipedia.org/wiki/Dollar_cost_averaging#Criticism) of dollar-cost averaging. Still, I sincerely have no idea if the price of any given coin will be 10x more valuable or 10x less valuable in 100 days from now. So this stategy seems reasonable (plus I'm just looking for an excuse to play with some APIs here).

## Creating a Lambda function

If you've never worked with Lambda, it's really fun and quite powerful. Though "serverless" seems buzzy, there's a lot of value *particularly* for something just like this where you just want a simple stateless sevice to interact with an API or two. If you're setting up a webhook handler to do something like catch events and push notifications or synchronize data, Lambda is an excellent solution.

GCP also provides their own version, [Cloud Functions](https://cloud.google.com/functions/). This would also be a viable path but from what I can tell quickly may [require spinning up an App Engine instance](https://medium.com/google-cloud/google-cloud-functions-scheduling-cron-5657c2ae5212) to handle scheduling.

I won't walk through creating the app and using NPM to install all of the local packages here since it's out of scope for this post. There's more in the [Getting Started](https://docs.npmjs.com/) section in the NPM docs if you want to create this from scratch. Otherwise, head over to the [Github repo](https://github.com/adamjstevenson/serverless-crypto-dca) and follow the instructions there to clone this repository. 

To walk through the high-level very quickly:

* We'll [load dotenv](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/app.js#L1-L2) to allow us to access environment variables from our [.env file](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/.env-example#L1-L9).

* We [set up a GDAX and Twilio client](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/app.js#L4-L20), loading in the API keys as env variables.

* [A handler is declared](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/app.js#L23) to execute the function.

* A [request is made to the [GDAX product ticker](https://docs.gdax.com/#get-product-ticker) endpoint](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/app.js#L24-L41) to get the current trade price for ETH. If it fails, [an SMS is sent using the `sendSMS` function](https://github.com/adamjstevenson/serverless-crypto-dca/blob/master/app.js#L64-L80). This isn't strictly necessary since the error is logged and available in [Cloudwatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html), but hey... it's nice to get a text!

* A market [buy order is placed](https://github.com/adamjstevenson/serverless-crypto-dca/blob/689f6f628633a2e890773c85ce6400045a6e3057/app.js#L43-L62) for $10 worth of ETH using the [GDAX Orders API](https://docs.gdax.com/#place-a-new-order). You could also create a limit order, but market orders are filled immediately at the best price whereas a limit order may not be executed at all. 

* Finally, [Twilio sends an SMS](https://github.com/adamjstevenson/serverless-crypto-dca/blob/master/app.js#L55) when the order is placed with the amount of ETH purchased and the current price. 💸

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-8 col-md-offset-2">
    <img src="/images/twilio.PNG" class="img-responsive img-thumbnail">
    <small>I'm crypto rich!</small>
  </div>
</div>

## Coming soon: deploying on Lambda and using CloudWatch

I'll circle back shortly to update this section.