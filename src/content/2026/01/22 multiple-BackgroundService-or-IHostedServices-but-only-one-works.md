---
date: 2026-01-22
---

::post-title{:date="date"}
# Multiple BackgroundService or IHostedServices but Only One Works
::

::notes
This is a repost from my old blog. First posted in 9/2/2024.
::

<br/>

In my worker app, I attempted to add multiple hosted services as follow:

::code-block
```
builder.Services
    .addSingleton(HostedService1)
	.addSingleton(HostedService2)
	.addSingleton(HostedService3);
```
::

<br/>

All the hosted services are added, but when the application run, only 1 is executing.

<br/>

Thanks to Stephen Cleary, apparently issue with synchronous call. [https://blog.stephencleary.com/2020/05/backgroundservice-gotcha-startup.html]{.text-blue-600}.

<br/>

I ended up using Task.Run for code that executes for a long time. Inside the ExecuteAsync:

::code-block
```
await Task.Run(async () => await LongRunningProcess());
```
::
