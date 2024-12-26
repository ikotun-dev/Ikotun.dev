---
title: "Single Threaded Real-Time Saga"
pubDate: 2024-12-25
author: "Ikotun Collins"
tags: ['files']
slug: 'single-threaded-saga'
---
## A short story 

<br/>
<b>This is a rant!</b> I've been building a real time system in Python for some time now, and it has been an adventure, considering the simplicity of the python language. It's necessary for the system to be efficient with very little downtime.

The project - written in FastAPI ❤️ utilizes the good ol' python <u>[Websockets]('https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API')</u> library for real time communication. 

Ideally, when a client accesses the system, they initiate a process, and a unique WebSocket connection is established. This WebSocket connection can be intercepted, allowing a new client to join the same connection.


The system enforces a rule that prevents processing any client requests until the client’s connection to the server has been fully established.
<br/>
At the initial stages of development, when it was just 1/2/3 concurrent requests, the connection time was insane but I overlooked it (12-19seconds)
<br/>
<br/>

## Skill Issue or Not? 👤

<br/>
Recently, The connection time increased significantly, rising from 12-19 seconds to 50 seconds to over 1 minute as the number of connected clients grew.<br/>
This renders the system unusable. I really do not think anyone would want to use a system that slow. I personally would not 

I honestly couldn't take this anymore, had to find a way out to make this as fast as possible (<7s).
That's like an  `86%` performance improvement. 

<br/>

![rant](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1735158375/Screenshot_2024-12-25_at_9.22.19_PM_acoz1m.png)

Rewriting this in Go or any other high-performance language could result in better performance as suggested by [`@lanreadelowo`]('https://x.com/lanreadelowo'). They have superior concurrency handling and handle asynchronous operations more efficiently, but time constraints do exists. 

<br/> 
[`Ayodeji`]('https://github.com/aosasona') and I were casually talking about this problem the other day and he said this <br/> 

![saga](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1735160445/Screenshot_2024-12-25_at_9.48.44_PM_zsekzx.png)

I accepted the reality and decided to try centrifugo. 

> 
> <u>[Centrifugo]('https://centrifugal.dev/') </u> is a real-time messaging server that helps you build scalable and efficient real time systems.
> It manages the connections and handling of messages between the backend application and the connected clients 
> Your backend application mainly handles the business logic while all real time processes are on a different server entirely - centrifugo server.

<br/>

I intended to list the steps on how to setup centrifugo and get it running in a python environment but that would come in the next post. 


Adopting centrifugo reduced the overall Websocket connection time to (2-3seconds). An unbelievable speed up in my opinion. It handles all edge cases that you would be required to handle if you had a custom Websocket setup 

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
