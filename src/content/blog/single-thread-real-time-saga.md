---
title: "Single Threaded Real-Time Saga"
pubDate: 2024-12-25
author: "Ikotun Collins"
tags: ['files']
slug: 'single-threaded-saga'
---
## A short story 

<br/>
<b>This is a rant!</b> I've been building a real time system in Python for some time now, and it has been an adventure, considering the simplicity of the python language.

It's necessary for the system to be efficient with very little downtime.

The project - written in FastAPI ❤️ utilizes the good ol' python Websockets library for real time communication. 

Ideally, when a client goes to the system - they initiate a process and a unique Websocket connection is established.
This Websocket connection can be intercepted and a new client can join that connection. 

<br/>
The system does not allow a client's request until the connection is established. 
At the initial stages of development, when it was just 1/2/3 concurrent requests, the connection time was insane but I overlooked it (12-19seconds)
<br/>
<br/>

## Skill Issue or Not? 👤

<br/>
Recently, the connection time drastically increased from the (12-19seconds) to (50seconds-1+minutes) - when we have more connected clients.<br/>
This renders the system unusable!!! I really do not think anyone would want to use a system that slow. `I personally would not `

I honestly couldn't take this anymore, had to find a way out to make this as efficient as possible (<7s).
That's like an  `86%` decrease. 

<br/>

![rant](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1735158375/Screenshot_2024-12-25_at_9.22.19_PM_acoz1m.png)

Rewriting this in Go or any other concurrency-oriented language could result in better performance as suggested by [`@lanreadelowo`]('https://x.com/lanreadelowo'). They both have superior concurrency handling and handle asynchronous operations more efficiently, but time constraints do exists. 

<br/> 
Ayodeji and I were casually talking about this saga the other day and he said this <br/> 

![saga](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1735160445/Screenshot_2024-12-25_at_9.48.44_PM_zsekzx.png)

I accepted my reality and decided to try centrifugo. 

> 
> <u>[Centrifugo]('https://centrifugal.dev/') </u> is a real-time messaging server that helps you build scalable and efficient real time systems.
> It manages the connections and handling of messages between the backend application and the connected clients 
> Your backend application mainly handles the business logic while all real time processes are on a different server entirely - centrifugo server.


<br/>

I intended to list the steps on how to setup centrifugo and get it running in a python environment. That would come in the next post. 


However, adopting centrifugo reduced the overall Websocket connection time to (2-3seconds). An unbelievable upgrade in my opinion. It handles all edge cases that you would be required to handle if you had a custom Websocket setup 

> 1. A client’s internet connection is interrupted or becomes unstable, causing the Websocket connection to drop unexpectedly. Centrifugo automatically handles reconnection and publishes missed messages upon reconnection. 
> 2. Automatically broadcasts to all connected clients with zero setup
> 3. Inbuilt message queuing preventing data loss 
> 4. Centrifugo is designed to handle high-scale systems with distributed nodes, making it easier to scale horizontally without need for any extra configuration from you. 

## My key takeway

If you’re constrained to a specific language because of time or familiarity, focus on optimizing your use of that language. Explore libraries, tools, or external services that enhance its capabilities and help you achieve your goal efficiently.


It’s not about loyalty to a specific tool or language; it’s about pragmatism and efficiency.

These takeaways align with the views of Rob Pike and Linus Torvalds.

Have an amazing day & Merry Christmas ✨
</br>
