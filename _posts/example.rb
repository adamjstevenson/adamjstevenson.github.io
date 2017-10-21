subscription = Stripe::Subscription.create(
  {
    customer: "cus_BcNDyG0NuHZn4i", # The ID of the customer on the connected account to charge
    items: [
      {
        plan: "29_monthly" # The ID of the plan to which the customer will be subscribed
      }
    ],
    application_fee_percent: 10
  }, 
  { 
    stripe_account: "acct_1BF8VRBAxruRdpTq" # The ID of the Stripe account connected to your platform
  }
)