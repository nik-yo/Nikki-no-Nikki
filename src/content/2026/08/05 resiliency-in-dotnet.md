---
date: 2026-08-05
---

::post-title{:date="date"}
# Resiliency in .NET
::

<br/>

Today, I decided to add resiliency to our NuGet package, so it's able to better handle intermittent network connection issues by retrying or having exponential back-off.

<br/>

In the past, I would use Polly or write a lot of code myself. Today, I discover an easier way to do it. Thanks to the Microsoft team. Simply install `Microsoft.Extensions.Http.Resilience`{.bg-gray-200 .p-2 .rounded} NuGet package and call `AddStandardResilienceHandler`{.bg-gray-200 .p-2 .rounded} for default configuration. The standard resiliency comes with the following defaults: [https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience?tabs=dotnet-cli#standard-resilience-handler-defaults]{.text-blue-600}.

<br/>

The standard resiliency is also configurable. For example:

::code-block
```
services.AddHttpClient<ExampleClient>()
    .AddStandardResilienceHandler(options => {
        options.Retry.MaxRetryAttempts = 5;
        options.Retry.Delay = TimeSpan.FromSeconds(2);
        options.AttemptTimeout.Timeout = TimeSpan.FromSeconds(3);
        options.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(30);
    });
```
::

For more information: [https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience?tabs=dotnet-cli]{.text-blue-600}