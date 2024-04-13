---
title: "Documentation for WeHeard Web crawler"
pubDate: 2024-04-12
author: "Ikotun Collins"
tags: ['crawler']
slug: 'internship-web-crawler'
---



# WH web-crawler 

## Installation 

### Crawler 

#### Ensure you have the required `.env` file 

```bash
git clone git@github.com:hoshistech/weheard-crawler.git ( This way because I use SSH :) ) 
cd weheard-crawler
source venv/bin/activate ( this is to activate dependency environment in MacOS/Linux )


pip install -r requirements.txt 

```

### Input desired usernames into `usernames.py` file 

#### After External Dependency is installed : You can go ahead with this. 
#### Check last section for external dependencies

> In current working directory

```bash

cd main
python main.py 

```

#### crawler should automatically add products to the database || give a response on account validity/error. 

#### NOTE : API needs to be running to save the scraped products to the database.

### API 
#### Built with fastAPI - why? ( minimalistic: models and api routes all in a single file. ) 

```bash

cd main/api
source apienv/bin/activate
pip install -r requirements.txt 

uvicorn main:app --reload ( API launches with hot-reload)

```
##### Docs : `http://127.0.0.1:8000/docs`

## What's left ?
### Future Features/Extensions

#### Feeding the API usernames - `social handles` directly and crawler is immediately called ( signal triggered )
##### Notifications on Issues/Failures
  ###### Crawler would be running for lengthy times so this is neccessary. 
##### Passing Tokens either VIA API or VIA ENVS dynamically 
##### Support for other socials. 
##### Automatic Expiration of products. 
##### Strict Duplicate data check ( Implemented but not strict enough. )
##### Live Deployment ( Docker - Recommended )

## External Dependencies
### chromedriver 
   ##### Helps simulate the whole process of accessing the browser ( crawling and scraping )
   ##### This was built using `chromedriver-arm64_2`








### Built with ❤️ 