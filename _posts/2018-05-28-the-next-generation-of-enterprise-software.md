---
layout: post
title: "The Next Generation of Enterprise Software"
category: cryptocurrency
img: /images/header-enterprise-software.jpg
---
<div class="row">
  <div class="col-md-8">
    <h2>Local man weirdly excited about enterprise software</h2>
    <p>
      I've spent my career working across all kinds of companies since I got out of school over 10 years ago (ugh), ranging from solo endeavors I ran myself to large Fortune 500 enterprises. I'm also about 3.5 years into my time at a high-growth tech company, so at this point I've had the chance to do the (very) small, medium, and large company thing.
    </p>
    <p>
      I'm grateful to have this background because it's given me perspective on how different types of companies work, along which tools they use. With that in mind, I believe the segment that we'll see change the most, and where there's the most opportunity for ambitious upstarts, is the enterprise. The way large companies work, along with the kind of software they require, is evolving rapidly: we'll continue to see operations improve for these businesses through adoption of better tools and infrastructure.
    </p>
    <p>
      Large enterprises also employ <a href="https://www.census.gov/content/dam/Census/library/publications/2015/econ/g12-susb.pdf" target="_blank"> more than half</a> of the American workforce, so firms providing tools in this space can make a serious impact on a large number of users by improving the work lives of millions of people. (Ask someone working for a large company how they feel about the software they use every day.)
    </p>
    <p>
      In this post I'll outline some of the areas where I think enterprises will continue to benefit in no particular order. It's business time.
    </p>
  </div>
  <div class="col-md-4 text-center topspace-lg">
    <img src="/images/bizniz.jpg" class="img-responsive shadow-lg img-center">
    <p>
      <small>Me.</small>
    </p>
  </div>
</div>
<hr>

## Cloud infrastructure

This is probably the most obvious one, and an area where we've already seen a seismic shift in the way large companies manage their systems. Enterprise adoption of cloud computing has ballooned over the past few years, with Amazon Web Services, Google Cloud Platform, and Microsoft Azure capturing <a href="https://www.forbes.com/sites/louiscolumbus/2017/11/07/forresters-10-cloud-computing-predictions-for-2018/" target="_blank">about 76%</a> of all cloud platform revenue in 2018 and growing to 80% by 2020. The total global public cloud market sits at about **$178 billion dollars** today. 😳

For Amazon in particular, growth of AWS has been *staggering*, accounting for <a href="https://www.geekwire.com/2018/aws-grows-48-percent-q1-2018-hit-5-4b-revenue/">$5.4B in revenue</a> for the first quarter of 2018 alone and growing over 40% year-on-year at a $20B annual run rate. Here's what that growth looks like over the last 5 years.

<div class="row topspace-lg">
  <div class="col-md-12">
    <div class="chart-container">
      <canvas id="aws-chart"></canvas>
    </div>
  </div>
  <script type="text/javascript" src="/js/aws-revenue-by-year.js"></script>
</div>

<p class="text-muted text-center bottomspace">
  Holy cannoli.
</p>

If Amazon were to spin off AWS into its own separate business, given it's current growth trajectory and a 10x forward revenues valuation, **AWS alone would have a market cap of at least $200B**, making it the 5th most valuable tech company in the world at the time of this writing.

The same study by <a href="https://www.forrester.com/report/Predictions+2018+Cloud+Computing+Accelerates+Enterprise+Transformation+Everywhere/-/E-RES139611" target="_blank">Forrester</a> mentioned above shows that in 2018 we'll see more than 50% of enterprises adopting public cloud platforms. Whereas leaders of these large companies have traditionally been apprehensive about moving their sensitive data to the cloud, adoption is increasing as these services prove themselves more reliable and secure than many on-premise alternatives. Stanford and the Cleveland Clinic store and access sensitive health records <a href="https://cloud.google.com/customers/">on GCP</a>. AWS developed a <a href="https://aws.amazon.com/blogs/publicsector/announcing-the-new-aws-secret-region/" target="_blank">Secret Region</a> and now works with the Central Intelligence Agency.

**Bottom line:** expect this trend to continue and the total addressable market, and share of enterprise customers leveraging cloud infrastructure, to stay up and to the right for years to come.

<hr>

## APIs

I work for [a company](https://stripe.com) whose product *is* a set of APIs and focus my time working with large companies to design API-driven solutions, so I get to see the opportunity here first hand. I expect that we'll continue to see significant growth and adoption in this area as larger firms accelerate development and offload complexity from their existing operations by integrating with powerful third-party APIs.

Just as every business used to rack and manage their own servers before shifting to cloud hosting platforms, there's a growing ecosystem of APIs which allow businesses to focus on their core competencies and leave the heavy lifting to someone else. In practice, this often results in lowering OPEX, reducing downtime and maintenance, and providing a better customer experience.

TechCrunch wrote a great article titled <a href="https://techcrunch.com/2016/05/21/the-rise-of-apis/" target="_blank">The Rise of the APIs</a>, which is well worth the read and includes the sweet infographic below.

<div class="text-center topspace-lg text-muted image-area">
  <img src="/images/tc-apis.jpg" class="img-responsive shadow-lg img-center">
  <p>
    <small>Dang that's a bunch of APIs. Photo credit: TechCrunch</small>
  </p>
</div>

<h3 class="text-center">How might an enterprise might benefit from one of these services?</h3>

<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x dark-blue"></i>
      <i class="fa fa-user-check fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <a href="https://checkr.com" target="_blank">Checkr</a> makes management of background checks possible via a <a href="https://docs.checkr.com/" target="_blank">their API</a>. I know nothing useful about the world of background checks, but this seems like a particularly powerful alternative to spinning up an in-house team to manage an otherwise arduous process.
  </div>
</div>
<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x red"></i>
      <i class="fa fa-phone fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <a href="https://twilio.com" target="_blank">Twilio</a> offers a set of easy to use services that some of the <a href="https://customers.twilio.com" target="_blank">largest companies in the world</a> leverage to build voice, video, and SMS messaging into their applications. I can't imagine how difficult it is to create and manage this internally, but I've integrated Twilio into applications in a few minutes.
  </div>
</div>
<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x blue"></i>
      <i class="fa fa-search fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <a href="https://www.algolia.com" target="_blank">Algolia</a> provides search as a service, and is used by large companies <a href="https://www.algolia.com/customers" target="_blank">like Under Armour and Twitch</a>. Though it's certainly possible for enterprise users to build and maintain their own search service directly, it's pretty challenging to do so and Algolia is just going to do a better job than you are.
  </div>
</div>

<div class="topspace-md"></div>
**Bottom line:** by integrating with third-party APIs, enterprises are able to accelerate their speed to market, reduce their costs, and build better product experiences.

<hr>

## Automation

Automation is sometimes a scary word, with concerns in the near term around what automation means particularly for workers completing low-skilled and repetitive tasks. Check out this cheery finding from a recent <a href="https://www.mckinsey.com/~/media/McKinsey/Global%20Themes/Digital%20Disruption/Harnessing%20automation%20for%20a%20future%20that%20works/MGI-A-future-that-works_Full-report.ashx" target="_blank">McKinsey piece</a>:

<blockquote>
  <strong>About half the activities people are paid almost $15 trillion in wages to do in the global economy have the potential to be automated by adapting currently demonstrated technology</strong>, according to our analysis of more than 2,000 work activities across 800 occupations. While less than 5 percent of all occupations can be automated entirely using demonstrated technologies, about 60 percent of all occupations have at least 30 percent of constituent activities that could be automated.
</blockquote>

The report goes on to say:

<blockquote>
  People will need to continue working alongside machines to produce the growth in per capita GDP to which countries around the world aspire.
</blockquote>

I for one welcome our new robot overlords™️. The report also calls out that "our productivity estimates assume that people displaced by automation will find other employment," which... sounds more positive? In any case, we should assume that (1) work is likely to shift and (2) automation is here to stay regardless of your views around it. Since I'm primarily talking about software, I'll avoid discussion of robotics/jobs and instead focus on benefits of automation as it relates to enterprise software.

<h3 class="text-center topspace-lg">So how will enterprises benefit from automation?</h3>

<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x purple"></i>
      <i class="fa fa-project-diagram fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <strong>Process automation</strong> to reduce toil and provide a better workflow for enterprise employees. <a href="https://community.box.com/t5/How-to-Guides-for-Admins/Creating-Automated-Processes/ta-p/196" target="_blank">Box automated processes</a> are a neat example of this; built-in settings in the Box admin console make it easy for administrators to configure triggers directly in the application to automate assignment of tasks.
  </div>
</div>
<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x gray"></i>
      <i class="fa fa-lock fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <strong>Security automation</strong> will become increasingly important to companies large and small, but enterprises will see particular benefit as they manage a large number of users and endpoints. <a href="https://www.crowdstrike.com/products/falcon-x/" target="_blank">CrowdStrike</a> for instance offers automatic threat analysis and automated protection workflows.
  </div>
</div>
<div class="row topspace-md">
  <div class="col-md-1">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x pink"></i>
      <i class="fa fa-code fa-stack-1x fa-inverse"></i>
    </span>
  </div>
  <div class="col-md-11">
    <strong>Application Automation</strong> with better, more accessible tools. A quick example of this is Google's <a href="https://gsuite.google.com/" target="_blank">G Suite</a>, which enterprise customers are increasingly utilizing. Tools like Google Forms empower employees to conduct easy polling and feedback collection, and <a href="https://developers.google.com/apps-script/" target="_blank">Google Apps Script</a> provides a mechanism to write JavaScript snippets in the cloud.
  </div>
</div>

<div class="topspace-md"></div>
**Bottom line:** There are more opportunities for automation than ever before as enterprise software providers build automation opportunities directly into their applications.

<hr>

## Conclusion

Enterprise software is improving significantly in the past decade or so and large organizations are more likely (and eager) than ever before to integrate new applications and services.

I never expected to be genuinely excited about the world of enterprise software when I was *working* at enterprises, but see major advances happening in the space and think there's an opportunity to bring better solutions to these organizations and improve the lives of their employees (who spend 5 days a week working with these products). Let's help get them off Lotus Notes. If you're starting a software company or developing an application, there's no bigger or better market to target right now.

<div class="text-center topspace-lg text-muted image-area">
  <img src="/images/enterprise-folks.jpg" class="img-responsive shadow-lg img-center">
  <p>
    <small>Enterprise solutions... extemely my shit.</small>
  </p>
</div>