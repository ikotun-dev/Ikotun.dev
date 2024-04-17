---
title: "200 products in 3 days to 200 products in 30 minutes!"
pubDate: 2024-04-13
author: "Ikotun Collins"
tags: ['me']
slug: 'internship-product-optimization'
---

Heyy!

My internship has been fun so far, battling new tools and stuff I've never never worked with before, major stuff I worked on was a web scraper that scrapes🥷 Instagram 😄. Yeah, Illegal I know. I would love to be in the news for it! 😇

The goal was to :

> scrape Products on IG and save to a database. 

At first, It seemed like an insane idea that would not suffice but I decided to take up the challenge.

I went online, researched and of course I planned to write it in python, I found libraries like 
> Selenium, BeautifulSoup and Scrapy!

The first thing I did was to understand the aim of the project, `why do they want this?` <br>
Prior to this, a team manually went to IG to check for products and fill up an excel sheet with the URLs and product details.
This made things really slow and they could only get about 200 valid products in 3 days
> NOTE ----  A product is an IG post literally but - An item that is listed for sale.

So next in thought was, what did I need to do to automate this process?<br>
A script that can go to IG, search for posts..scrape them. I filter to see if their description ( caption ) matches that of an Item for sale. <br>
I built a flow diagram for this with Lucid-Chart.

I started writing code. Initially I started building the scraper with Scrapy ( a web crawling framework ) in python, very similar to django. Also comes with a lot of batteries included, i figured what i need was a scraper and not a crawler ( for now ). <br>

I set up another project. The plan was to work with selenium and beautifulSoup. Selenium is a great library if you want to build anything that has to do with scraping to be honest.<br>
> To use the scraper, you had to input the usernames(igHandle) of the account you want to fetch products from. I figured how to find vendors myself later😄

First on the plate was to retrieve the inputted usernames, It iterates so you can input multiple usernames 😉. Then I go to the Instagram profile of the user

> This way  : ```www.instagram.com/{username}```

Next up, I had to check if the user exists & is a vendor(sells product) or a regular user; just to avoid wasting time incase a username was wrongly inputed.

I picked up the css tags containing the users bio/every text description they put on their profile. I checked if any of these keywords were present

> keywords = [
    "business",
    "entrepreneur",
    "affordable",
    "sales",
    "order",
    "shop",
    "gift",
    "service",
    "jewelry",
    "watches",
    "nationwide",
    "...." + many more..
]

I know its not an entirely 100% valid check :)  but it works 90% of the time.
If the username passes, I push to an array that holds successful usernames otherwise failed usernames.

After the whole check is done, next thing is to scrape their posts.

I couldn't do this manually for some reason. I had to use an external tool called `APIFY`. They provide scraping services ( No idea why they haven't been flagged 😂😂).

I integrated their API and it worked fine! only down side was the 30 posts limit for every account and the scraping time could get really long sometimes. 

APIFY returned the posts in JSON format which is cool. Made it easy for me to filter.
Also We didn't want products posted more than a month ago

So after the filtering and validating the time stamp. 
Next up - was constructing a json object for the product.<br>
Before that, I had to generate a proper description for the product's image, but the question was - HOW? 


## GPT!

So yeah, I got this suggestion from my CTO, to create an assitant AI on chatGPT and using that to get proper descriptions for the items. That worked better than I imagined. 
> If you wanna make any product that needs some ML stuff, consider using GPT or META. However I'm not against learning how the internals work and building a model yourself

Later, I discovered that the ImageUrls for the instagram posts expires after some time. That's insane IMO and as far as I know, there wasn't a specific time specified for it's expiry. 

This was a big problem, what could I do?!!

An option was to download every image and upload to our own cloud provider. 
`Thats an expensive process` - as said by my CTO, then he mentioned base64 images, 

To be honest, that was the first time I would be working with base64 images. 

There was a base64 library to help, that converted the images to strings

>  I had to make a temporary download of the image  - tempfile in python helped me!

So, Yeah..This is getting really long and I think I should conclude now.

I was able to get the base64 strings for the images, a proper description and tag and that was it! 

ALL YOU NEED TO DO NOW IS INPUT USERNAMES AND WAIT! 
> 90 valid products were generated in 11 minutes! 


I would drop another article soon explaining how I was able to get vendor usernames myself. 


Have a nice day :) 


