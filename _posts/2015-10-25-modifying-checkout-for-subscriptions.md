---
layout: post
title: A Simple Guide to Using Stripe Checkout with Subscriptions
category: stripe
---

[Stripe Checkout](https://stripe.com/checkout) is a pre-built form that makes securely collecting credit card details from your customers unbelievably simple: just paste a few lines into your code and you have a fully-functioning form, complete with validation, to accept card details and turn them into a secure token. 

Although the [official docs](https://stripe.com/docs/checkout) give an example of a Checkout form that you might use for a one-off payment, Stripe provides several useful [configuration options](https://stripe.com/docs/checkout#integration-simple-options) you can use to modify the Checkout form. In this example, we'll modify a few of these configuration options to make Checkout a bit more appropriate for customers signing up for a subscription. 



An important distinction (and possible source of confusion) is that Checkout's function is only to create a token. Once you get that token back, you'll want to do something intere