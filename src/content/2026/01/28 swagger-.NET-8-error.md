---
date: 2026-01-28
---

::post-title{:date="date"}
# Swagger .NET 8 Error
::

::notes
This is a repost from my old blog. First posted in 9/13/2024.
::

<br/>

Swashbuckle CLI was able to output schema of my API before, but this time, it throws this error message:

::code-block
```
System.InvalidOperationException: A type named 'StartupProduction' or 'Startup' could not be found in assembly
```
::

<br/>

I used top level statement with minimal API on .NET 8 and nothing is changed on that, so I was not able to find anything to do with Startup type.

<br/>

After I investigate further by commenting line by line, I found out that the issue is on my switch statement.

<br/>

So it looks like the following:

::code-block
```
return config.Section?.Key switch
{
  Value1 => services.AddSingleton<Handler1>(),
  Value2 => services.AddSingleton<Handler2>(),
  _ => throw new InvalidOperationException();
}
```
::

<br/>

Problem is the Section is pulled from appsettings.json and when the CLI runs, it doesn't have value, so it never returned the services object.

<br/>

Changing the above to the following fixed the issue:

::code-block
```
return config.Section == null ? services : config.Section.Key switch
{
  Value1 => services.AddSingleton<Handler1>(),
  Value2 => services.AddSingleton<Handler2>(),
  _ => throw new InvalidOperationException();
}
```
::
