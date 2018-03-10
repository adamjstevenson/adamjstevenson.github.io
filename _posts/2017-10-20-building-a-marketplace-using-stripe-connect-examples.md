---
layout: post
title: Building a Marketplace using Stripe Connect (with Examples)
category: stripe
---

Over the past few years, I've spent a significant amount of my time working with [Stripe Connect](https://stripe.com/connect). Connect is a set of APIs that makes it relatively trivial to build payment platforms and marketplaces, a process which has traditionally been just an ***unbelievably enormous*** (in bold AND italics) pain in the ass. Why was it such a pain in the ass? Primarily because (1) this tended to require a gross, dispirate set of services to handle the different components of handling payments in, payments out, reconciliation, etc. and (2) it turns out there's a ton of regulation around moving money in ways that seem both completely logical to normal human beings and completely insane and worrisome to regulators, banks, and other people who wear ties. In this post I'll talk about how Stripe makes this easy, things to consider when building a platform with Connect, and introduce a few examples you can look at to help build your own platform.

## How building a marketplace works

In the past, I built some of my own marketplace apps and primarily worked with a large, popular payment service that I'll leave unnamed for the purpose of this post. To help think through some considerations in the context of a real marketplace, let me introduce you to Notesurf. Notesurf was a marketplace I built for students to buy and sell college notes and study guides. It was a pretty typical platform service where sellers (college students) posted content and buyers (...also college students) purchased that content. The buyers got the notes they purchased instantly, the sellers got paid a week after the purchase was made, and the platform grew a few bucks stronger thanks to that sweet, sweet commission on each sale.

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-8 col-md-offset-2">
    <img src="/images/omg-this-design-wow.png" class="img-responsive img-thumbnail">
    <small>Although Notesurf wasn't a huge success, I clearly had a gift for terrible design.</small>
  </div>
</div>

As it relates to payments, building something like Notesurf requires:
1. A way for buyers on the site to purchase notes. Easy enough. 😁
2. A method to attribute sales of the notes to particular sellers. I got this. 😊
3. Some way to take that sweet platform commission on the sale of each item. Sounds a little trickier, but okay. 😏
4. Handling payouts for each seller. This sounds a little more involved. 😕
5. Managing tax reporting and creating/distributing 1099s to each seller. Come again? 😦
6. Adhering to [KYC regulations](https://en.wikipedia.org/wiki/Know_your_customer) to ensure you're not enabling money laundering or funding terrorism. OMG WHAT?? 😱
7. Lots of other horrific things with payments. 😩 

You learn pretty quickly that building platform payments isn't as easy as accepting funds from party A and giving some to party B. On demand ridesharing services like [Lyft](https://www.lyft.com) feel like magic not just because a car shows up at the click of a button, but because there's no discussion of fares, no need to carry cash, and no concerning yourself with the exchange of money at all. But behind the scenes there's a lot going on to store and charge your payment method, verify the driver's identity, make sure they get paid, manage tax reporting, etc. And that's where a service like Stripe Connect comes in and abstracts away all of these terrible things.

## Using Stripe Connect to build a marketplace

Connect gives you a lot of flexibility in how you create your platform. The [Connect docs](https://stripe.com/docs/connect) do a great job of outlining different implementation options in detail, but at a high level there are 3 different approaches. These are outlined below, along with some examples of using Stripe Connect with each different implementation.

### __Standard accounts__

[Standard accounts](https://stripe.com/docs/connect/standard-accounts) are the easiest place to get started if you want to build a platform and require the least amount of integration effort. You probably want to choose this option if:

* You want Stripe to have a direct relationship with your user.
* You want Stripe to manage identity verification, reporting, and communication about things like disputes. 
* You don't want to build out your own dashboard, notifications, etc.
* The user connected to your platform should ultimately own fraud and dispute liability.

With Standard accounts, your user connects via OAuth to your platform. This generally means you provide a button that your user clicks to Connect to Stripe directly and provide your platform with access to their Stripe account. 

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-8 col-md-offset-2">
    <img src="/images/stripe-oauth.png" class="img-responsive img-thumbnail">
    <small>Your end user creates a Stripe account or uses an existing account.</small>
  </div>
</div>

Once your user is connected, your platform will primarily authenticate as the connected account when you need to do payments things. For all Connect integrations, you can use the [Stripe-Account header](https://stripe.com/docs/connect/authentication#stripe-account-header). This is nice because it means all you need to store is a relationship between your platform user and the Stripe account ID (instead of scary secret keys). The relationship in your own model would look roughly like this:

<div class="row topspace-lg">
  <div class="col-md-8 col-md-offset-2">
    <table class="table table-responsive table-bordered">
      <thead>
        <tr>
          <th>
            user_id
          </th>
          <th>
            username
          </th>
          <th>
            stripe_account
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            1203413
          </td>
          <td>
            abe_froman
          </td>
          <td>
            acct_j1cXUEAksEpalsjc3
          </td>
        </tr>
        <tr>
          <td>
            1203414
          </td>
          <td>
            c_frye
          </td>
          <td>
            acct_1BF8VRBAxruRdpTq
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

When working with Standard Connect, your user has their own Stripe dashboard that they can use to view payments, issue refunds, submit dispute evidence, create reports, configure their payout settings, and a lot more. As you can imagine, this saves a lot of time since you don't have to build all of this stuff for your platform. Though you'll still have a lot of control, the APIs you interact with most often when using a Standard Connect platform are listed below with some examples.

<div class="row topspace-md">
  <div class="col-md-4 col-md-offset-4 text-center">
    <h4>Want to see this process in action?</h4>
    <a href="https://connect.fff.red/" target="_blank" class="btn btn-lg btn-block btn-primary">
      Try a live demo 
      <i class="fa fa-arrow-right"></i>
    </a>
  </div>
</div>

#### Charges example

The [Charges API](https://stripe.com/docs/api#charges) is your bread and butter and how your user (and likely your platform) will make money. In the context of Notesurf, imagine a student wants to sell $100 worth of notes (they're amazing notes 💰) and my platform takes a 10% fee. Here's an example in Ruby of creating a $100 charge [directly on the account](https://stripe.com/docs/connect/direct-charges) while taking a $10 commission for your platform: 
<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/8ea94f08fd907aa1def10a5033522783.js"></script>
</div>

#### Refunds example

Your end user will be able to issue their own refunds directly through the Stripe dashboard, but your platform can also issue refunds on their behalf if necessary with the [Refunds API](https://stripe.com/docs/api/#refunds). Here's what that looks like:
<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/1d5de5889d46f603e9838a141ae98c13.js"></script>
</div>


#### Customers example

You might also interact with the [Customers API](https://stripe.com/docs/api/#customers) to store payment details for later use. This is helpful for enabling repeated purchases — either as part of a recurring subscription or if you want to create a one-off charge for a customer without requiring them to enter a payment method again. For Notesurf, this might mean a student storing their payment info to enable one-click purchasing of notes later.

In this example we're creating a customer and storing their payment details on the connected account. You can also store customers on your platform and share them with the connected account using what Stripe calls [Shared Customers](https://stripe.com/docs/connect/shared-customers), which is useful for sharing customer payment details between connected accounts.

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/e5562e324a7192879bfd2d39586a4500.js"></script>
</div>


#### Subscriptions example

If you want to subscribe the purchaser to a subscription, you can do so with the [Subscriptions API](https://stripe.com/docs/api/#create_subscription). This subscription is created directly on the connected Standard Account. In this example, we'll create a subscription for $29 a month. Your platform takes a 10% `application_fee_percent` as commission for enabling the subscription and the connected account gets the remainder. 

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/67cfe00ad1fd1e22f31a1aa496be81f7.js"></script>
</div>

There are a number of [other APIs](https://stripe.com/docs/api/) you can use with Standard Connect integrations as well. Note that some settings — like payout schedules — can't be controlled by your platform when using Standard Connect.

#### Standard Connect example applications

A couple different examples of Stripe Standard Connect apps are listed below:

* [OAuth examples from Stripe's docs](https://stripe.com/docs/connect/sample-oauth-apps) (Various languages)
* [Rails + Stripe Connect Example Application](https://github.com/rfunduk/rails-stripe-connect-example) (Ruby)
* [Simple Stripe Connect PHP example](https://connect.fff.red/) (PHP)

<hr> 

### __Custom accounts__

[Custom accounts](https://stripe.com/docs/connect/custom-accounts) are the most flexible option for using Stripe Connect, but this type of integration also involves more development work since your platform controls the entire experience. Custom accounts are particularly popular with platforms with complex funds flows or those that want to fully whitelabel and manage the end user payments experience. A platform generally choses to build on Stripe Custom accounts when:

* You want to fully control the onboarding experience and own communications with your platform users.
* Your platform uses a custom dashboard and controls the flow of funds completely. End users only interact with Stripe through it's APIs (which the platform controls).
* You prefer to own liability for payments. In this relationship, end users may not even be aware of Stripe's existence. 

#### Accounts examples (handling onboarding with Connect Custom accounts)

Using Custom accounts involves creating and updating Stripe accounts via the [Account API](https://stripe.com/docs/api/#account). This is nice because your platform ultimately decides on how to handle onboarding and users can start accepting payments very quickly (for most payment methods, even before a name or anything else is provided by the user). In this example, we'll create a Stripe account for our platform user (say a student selling class notes), then update the information that's required as it's needed. 

After signing up for an account, we'll provide a form like the one below to collect information for our user to create their Stripe account.

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-6 col-md-offset-3">
    <img src="/images/stripe-custom-account-onboarding-example.png" class="img-responsive img-thumbnail">
    <small>An example account creation form</small>
  </div>
</div>

When the user submits the form, this information will be sent to Stripe to create an account using the Stripe Accounts API creation method:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/d5ca80c5c8a84de42c8d65922a1cf80d.js"></script>
</div>

This will return an Account object with a lot of properties, but you're most interested in the account ID that's provided.

```
#<Stripe::Account:0x3fd4eb18e3f4 id=acct_1BF8VRBAxruRdpTq> JSON: {
  "id": "acct_1BF8VRBAxruRdpTq",
  "object": "account",
  "business_logo": null,
  "business_name": null,
  ...
```

Just as with Standard accounts, you'll want to save the account ID that's returned via the API and create an association in your database with your authenticated user. By doing so, you can control their Stripe account later.

This type of incremental onboarding is nice because you're able to get an account spun up immediately. As more payments are processed, Stripe will incrementally request additional details about this user by firing an [`account.updated` event](https://stripe.com/docs/api/#event_types-account.updated). The fields_needed on that event show what information is needed (if any).

You can automate this process by catching this event with a [webhook](https://stripe.com/docs/webhooks) and sending an email to the accountholder to let them know more info is needed to continue processing payments or access their earnings. When they login to your application, your application [retrieves the account](https://stripe.com/docs/api/#retrieve_account) and inspects the [`fields_needed` array](https://stripe.com/docs/api/#account_object-verification-fields_needed) to determine what info is needed at this stage. Let's say the following fields are needed:

```
["legal_entity.address.city",
 "legal_entity.address.line1",
 "legal_entity.address.postal_code",
 "legal_entity.address.state",
 "legal_entity.ssn_last_4"]
 ```

Using the data you retrieve on the Account object, you would dynamically build a form to collect the fields listed there. Here's a very simple example:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/0204ee5a1b0151d2aabb41ff48d11f35.js"></script>
</div>

The end result is a nice form that collects information from your users as you need it:

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-6 col-md-offset-3">
    <img src="/images/incremental-onboarding.png" class="img-responsive img-thumbnail">
    <small>Input elements are shown to the user based on the fields needed.</small>
  </div>
</div>

<div class="alert alert-warning">
  <strong>A final note:</strong> depending on the platform you're creating, it might make sense to collect all of the account information up front (reducing the need for incremental updates later). The choice you make will primarily be related to the conversion rates you expect/experience at sign up (since a longer form typically means lower conversions) vs the conversion rate you expect later on when more information is needed. If you'd rather collect all information up front, you can utilize Stripe's <a href="https://stripe.com/docs/api#country_specs">Country Specs API</a> to determine <a href="https://stripe.com/docs/connect/required-verification-information">account requirements for different countries</a>.
</div>

<div class="row topspace-md">
  <div class="col-md-4 col-md-offset-4 text-center">
    <h4>See Custom Connect onboarding in action</h4>
    <a href="https://stripe-marketplace-demo.herokuapp.com/users/sign_up" target="_blank" class="btn btn-lg btn-block btn-primary">
      View a live demo 
      <i class="fa fa-arrow-right"></i>
    </a>
  </div>
</div>

#### Charges example

In this example we'll create [destination charges](https://stripe.com/docs/connect/destination-charges) and [separate charges and transfers](https://stripe.com/docs/connect/charges-transfers). I'll skip covering the different ways to create charges with Connect, but there's an excellent breakdown in [Stripe's docs here](https://stripe.com/docs/connect/charges).

Once your user is signed up and you have a Stripe account ID for them, you'll be able to create charges on their behalf. In this example, we're creating a charge for $10 and taking a commission of $1 on the charge. 

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/95cb241011d0006f7435db595d315d8f.js"></script>
</div>

It's important to point out that in this scenario, the platform pays the processing fees. So although your platform takes $1, your net platform earnings will be $1 less the processing fees.

If you want to get even more magical, you can further split payments using separate charges and transfers. Imagine instead that you want to create a charge for $10, keep $1 for yourself, and split the remainder between two different sellers. You can accomplish this by using Stripe's newer functionality like so. 

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/b13730a620943bfa12710c20892f2e90.js"></script>
</div>

Finally, you want to display these charges to your user in a dashboard so they can see their earnings. For large platforms, you'll probably want to use webhooks to collect and store transactional detail in your own model since this will be much faster to query and doesn't rely on a connection to Stripe. But it's also possible to retrieve this from Stripe directly either using the [balance history endpoint](https://stripe.com/docs/api#balance_history) or the [list charges endpoint](https://stripe.com/docs/api#list_charges). For this examample, we'll use the later. 

After our sellers have received payments, we'll list them out in a dashboard so they they can view them like so:

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-6 col-md-offset-3">
    <img src="/images/connect-dashboard-payments.png" class="img-responsive img-thumbnail">
    <small>Sweet dashboard showing payments for a connected user</small>
  </div>
</div>

Behind the scenes we're retrieving the charges for the connected account by authenticating as them using the Stripe-Account header:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/c4255c0ffb993e385072bbad90329ff5.js"></script>
</div>

Then we're iterating through the charges to display them. Here's an example of what that might look like in a view for a Rails app:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/8565ee430ae60a55b465fd832efd7ad9.js"></script>
</div>

<div class="row topspace-md">
  <div class="col-md-4 col-md-offset-4 text-center">
    <h4>See a payments dashboard in action</h4>
    <a href="https://stripe-marketplace-demo.herokuapp.com/users/sign_up" target="_blank" class="btn btn-lg btn-block btn-primary">
      View a live demo 
      <i class="fa fa-arrow-right"></i>
    </a>
  </div>
</div>

#### Balance Transactions and Payouts example

Stripe provides [automatic payouts](https://stripe.com/docs/payouts), which greatly simplifies the disbursement process for you as the platform. Though manual payouts are available, using automatic payouts means you offload this typically painful process to Stripe and let them handle the details. Stripe also creates a nice ledger for transactions via the [Balance API](https://stripe.com/docs/api#balance) that you can tap into any time.

Another thing you'll definitely want to display for connected accounts is their payout detail. This relates the charges coming in to the payments made to their bank accounts. We can do this easily with the [balance history endpoint](https://stripe.com/docs/api#balance_history) and the ID of the payout. Again, imagine you want to show an overview of payouts in a dashboard for your users:

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-6 col-md-offset-3">
    <img src="/images/connect-dashboard-payouts.png" class="img-responsive img-thumbnail">
    <small>Neat, look at all that money! 💸</small>
  </div>
</div>

Again, you can get a nice list directly from Stripe's [list payouts endpoint](https://stripe.com/docs/api#list_payouts) for this view like so:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/25b1c647e0ad732f7e618bf5cb3d5f90.js"></script>
</div>

When a user selects a particular payout, they see the detail on the transactions that make up that payout:

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-6 col-md-offset-3">
    <img src="/images/connect-payouts-example.png" class="img-responsive img-thumbnail">
    <small>The balance history endpoint provides a ton of detail.</small>
  </div>
</div>

By using the list balance transactions method and passing in the ID of the payout in the `payout` parameter, a list of the transactions making up that payout are returned:

<div class="topspace-md">
  <script src="https://gist.github.com/adamjstevenson/e0a7beced79213091f6f49db18acdd4d.js"></script>
</div>

#### Other API examples

If you're building a Custom Connect integration, you'll interact with many of Stripe's APIs. I won't cover all of them here, but this should be a good start on understanding what's required and how your users will interact with Stripe through your platform. You can find more detail in [Stripe's API reference](https://stripe.com/docs/api).

#### Custom Connect example applications

There's an example application I put together in Rails that you can use in test mode [here](https://stripe-marketplace-demo.herokuapp.com/). Create a campaign and charges to see the dashboard in action and check the [code for this demo on Github](https://github.com/adam-stripe/stripe-connect-managed-rails) to see what's happening behind the scenes.

<hr>

### __Express accounts__

[Express accounts](https://stripe.com/docs/connect/express-accounts) are Stripe's newest option and provide a lot of the benefits of Standard Connect while also allowing the platforms more control of the branding and funds flows of the connected account. This method also uses OAuth to connect your user to your platform and there are some [requirements for using Express accounts](https://stripe.com/docs/connect/express-accounts#requirements-for-creating-express-accounts) (like having an SMS-enabled phone number and presence in the US) that you should be aware of. 

So why would you choose Express accounts?

* You want to leave the onboarding components (identity verification) to Stripe.
* You want to get up and running quickly and are okay with Stripe managing communications with the user.
* Your platform only needs a lightweight dashboard and is okay with ultimately owning fraud and dispute liability.

<div class="row topspace-lg text-center text-muted image-area">
  <div class="col-md-8 col-md-offset-2">
    <img src="/images/express-connect-onboarding-example.png" class="img-responsive img-thumbnail">
    <small>The dashboard for Express Connect is controlled by Stripe, but can match your brand.</small>
  </div>
</div>

#### API examples

I won't cover separate API examples since you'll use many of the same APIs that you do with Custom accounts. That said, you won't need to be as concerned with the onboarding components (primarily the Accounts API). 

#### Express Connect example application

There's an excellent Express demo created in Node available at [Rocketrides.io](https://rocketrides.io). You can also find the code for this demo [on Github](https://github.com/stripe/stripe-connect-rocketrides).

<div class="row topspace-md">
  <div class="col-md-4 col-md-offset-4 text-center">
    <h4>See Stripe Connect Express in action</h4>
    <a href="https://rocketrides.io/pilots/signup" target="_blank" class="btn btn-lg btn-block btn-primary">
      Try a live demo 
      <i class="fa fa-arrow-right"></i>
    </a>
  </div>
</div>

<hr>

## Other thoughts 

The intent of this post is primarily to highlight the things to consider when building a payments platform. Although there's a lot to consider and building a platform is relatively involved, this process sucks considerably less than it did in the past. Connect is really good at this and exists specifically to reduce your overhead and abstract away a lot of this complexity so you can focus on the _really_ hard part (finding both buyers and sellers to use your service).

I have a goal to build a more full-featured Stripe Connect tutorial, so feel free to check back or <a href="https://twitter.com/adamjstevenson">bug me on Twitter</a> if this would be helpful!