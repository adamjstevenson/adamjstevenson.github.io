---
layout: post
title: A Simple Guide to Using Stripe Checkout with Subscriptions
category: stripe
---

[Stripe Checkout](https://stripe.com/checkout) is a prebuilt form that makes securely collecting credit card details from your customers unbelievably simple: just paste a few lines into your code and you have a fully-functioning form, complete with validation, to accept card details from your customers. 

Although the [official docs](https://stripe.com/docs/checkout) give an example of a Checkout form that you might use for a one-off payment, Stripe provides several useful [configuration options](https://stripe.com/docs/checkout#integration-simple-options) you can use to modify the Checkout form. In this example, we'll modify a few of these configuration options to make Checkout a bit more appropriate for customers signing up for a subscription. Here's what the final product will look like:

<form action="" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
    data-image="/images/troll_logo.png"
    data-name="SaaS Service"
    data-description="Gold Plan Subscription"
    data-locale="auto"
    data-panel-label="Subscribe for $39/month"
    data-label="Subscribe Now">
  </script>
</form>

## Getting started with Checkout
To start, go ahead and copy the [default code in the Checkout docs](https://stripe.com/docs/checkout#integration) and paste it into your text editor. It (currently) looks like this:

```
<form action="/charge" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
    data-image="/img/documentation/checkout/marketplace.png"
    data-name="Stripe.com"
    data-description="2 widgets"
    data-amount="2000"
    data-locale="auto">
  </script>
</form>
``` 

## Add some configuration options

There are a few configuration options you should add here: 

* `data-label` is the text that's displayed on the button. If you omit this, it defaults to *Pay with card*, so go ahead and add this attribute and change the value to *Subscribe Now* or something that better fits a subscription form.
* `data-panel-label` is the button your user will see below the form fields where they enter their card details. I'd suggest using something like *Subscribe for { $price/interval }* so your customers are clear on what they're paying and how often.

There are a few options you'll want to change as well:

* `data-key` should be your live or test **publishable** API key. If you're testing with this form (you should do that first), add the test publishable key [found in your dashboard](https://dashboard.stripe.com/account/apikeys). When you're ready to start taking live payments on your site, change this to your publishable live key. <span class="red">Be careful to ensure this is your **publishable** key, not your secret key.</span>
* `data-image` is an image that you want on the form. This should be at least 128px x 128px and might require a bit of cropping using your favorite image editor to get it fitting and looking good in the modal window, since it's a fairly small round window.
* `data-name` is the name of your site/application/service. 
* `data-description` is a description to help your customers understand what they're getting. You'll probably want to use the name of your subscription plan, like *Gold Plan* or *Yearly Access Fee*. 
* `data-amount` is the amount of the plan that the customer is subscribing to. This option only serves to provide your customer with an amount they can see on the form -- it doesn't actually have any function in creating the charge or subscribing the customer to a plan. We're not displaying it in this form, so it's not totally necessary.

Finally, you'll probably want to change the form `action`. This should points to the script or route (e.g. "subscription.php") that will actually create the subscription. An important distinction (and possible source of confusion) is that Checkout's sole function is to create a token with the card details your customers submit and return it back to your server. Once you customer enters their card information successfully, Stripe will create a secure single-use representation of those card details back in the form of a token. That token will be submitted to the `action` you specify here.

## The finished form

You can find an example of the finished form [on GitHub](https://github.com/adamjstevenson/stripe-examples/edit/master/checkout/checkout-subscription.html).

## Next steps

Your form should look more appopriate for your customers signing up for your subscription service and should be creating tokens. Stripe has some pretty excellent documentation on creating the plan and subscribing your customers to that plan using the token that your fancy new Checkout form returns. You can find some more instructions on each of these steps here:

* [Create a plan](https://stripe.com/docs/tutorials/subscriptions#creating-a-plan)
* [Subscribe your customer to that plan](https://stripe.com/docs/tutorials/subscriptions#subscribing-a-customer-to-a-plan)