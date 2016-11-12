---
layout: post
title: Understanding Pagination with the Stripe Api
category: stripe
---

<div class="alert alert-warning">
  <h4>Updated 11/2016</h4>
  Stripe now provides <a href="https://stripe.com/docs/api#auto-pagination">auto-pagination</a> for several libraries as well, which makes retrieving entire lists trivial. <a href="#auto-pagination">See some examples</a>.
</div>

There are lots of reasons you might need to paginate through your [Stripe](https://stripe.com) data. Maybe you're building some custom reports using the API and want to obtain additional fields that aren't included in the dashboard exports. Maybe you're creating a sweet internal dashboard with your data. Maybe you just like long-running scripts that look all matrixy and cool. Whatever the reason, all of the top-level API resources inlude built-in "list" methods and use [cursor-based pagination](https://stripe.com/docs/api#pagination) to make this process pretty painless. 

In this post, we'll run through some different pagination examples using the list methods. Since there are Stripe bindings available for many popular languages, I've rotated through examples in Ruby, PHP, Python, and Node to make everyone happy. Unless you aren't using one of these libraries. But almost everyone. *Close enough*.

## A brief overview on pagination

Whenever you use one of the list methods, you'll be able to specify a few different arguments in your API call to filter your results. 

* `limit` defines a limit on the number of objects you'd like to return. This ranges from 1 to 100, and if you omit this argument you'll get 3 results back by default. 
* `starting_after` is the ID of the object to begin your list with and would return objects in the order they were created after this object. 
* `ending_before` is an object ID you'd specify to return objects created before this object. 

Most of these methods also include some built-in filtering that you can leverage as well, like the `created` parameter. This is an array that you can use to further limit your results without needing to iterate through your entire list of objects and handle this logic on your end. There's much more detail about all of this in the API docs, so you should also [go explore](https://stripe.com/docs/api) there as well.

Now that you know everything there is to know about pagination, let's look at some examples.

## Paginating through Stripe charges (Ruby)
<script src="https://gist.github.com/adamjstevenson/8eef9a2ef0499cec715c.js"></script>

So what's happening here? To start, we're grabbing the first 100 charges and looping through them. In this example, you're just printing the charge ID.

```
charges = Stripe::Charge.all(:limit => 100)

charges.each do |charge|
  puts charge.id
end
```

The response you receive contains a `has_more` boolean indicating whether there are more results available. This also simplifies things for you; if there are more than 100 results available, you'll know you want to keep going. Add a while loop to handle iterating through the results while we have more available. 

```
while charges.has_more do 
  charges = Stripe::Charge.all(:limit => 100, :starting_after => charges.data.last.id)

  charges.each do |charge|
    puts charge.id
  end
end
```

Pretty easy, right? Ok, let's fancy it up a bit. 

## Paginating through Stripe customers created in the last month (PHP)
<script src="https://gist.github.com/adamjstevenson/1832de416338e0fe579a.js"></script>

Pretty similar, but in this example we're using the `created` array to filter results to customers who were created in the last month.

## Finding failed payments (Python)
<script src="https://gist.github.com/adamjstevenson/2fcfb7f9344f5c121f85.js"></script>

You'll notice in this example we're adding `include[]=total_count` to find the total number of failed charges. Neato.

## List all invoice.payment_succeeded events (Node)
<script src="https://gist.github.com/adamjstevenson/e7ebf64a44cc88e8c0ec.js"></script>

Some list methods have additional arguments as well. Here, you're using `type` to specify which events you'd like to retrieve.

## <a name="auto-pagination"></a>Auto-pagination

Most of Stripe's official libraries now support auto-pagination, which is particularly helpful for scripting things like custom reports or ad hoc API queries. I've added a few examples below. 

## List all charges using auto-pagination (Python)

<script src="https://gist.github.com/adamjstevenson/d40abd2659f83f900771a7fdc82cb494.js"></script>

Just calling the `auto_paging_iter()` method on the list paginates through the charges, 100 at a time.

## List all balance transactions for a transfer with auto-pagination (Ruby)

<script src="https://gist.github.com/adamjstevenson/4de54bd08fe5f97eade10c1300c0ebd1.js"></script>

By swapping the `each` method with the `auto_paging_each` method, you can leverage auto-pagination to reduce the number of API calls you're making manually and the lines of code in your script. 