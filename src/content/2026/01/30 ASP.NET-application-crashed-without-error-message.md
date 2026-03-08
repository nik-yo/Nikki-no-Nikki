---
date: 2026-01-30
---

::post-title{:date="date"}
# ASP.NET Application Crashed without Error Message
::

::notes
This is a repost from my old blog. First posted in 9/27/2024.
::

<br/>

I encountered a strange error with ASP.NET Web API application. It runs fine locally, but when we deployed to Kubernetes cluster, it crashed as soon as it starts. And no error message was thrown.

<br/>

So, I pulled the application to my local and it crashed as well no matter how I run it, dotnet cli, Docker Desktop, Visual Studio debug. The only one that runs fine is the version from the repo. At this point, there are only two possibilities, either the environment is the issue or the application is the issue, so I decided to deploy it to a different environment and it's still not working, so it must be something with the application.

<br/>

Since it is the application, I tried to change the log level to Trace to get more information but no new error message that provides a hint on what's going on. Memory dump didn't work as the collector didn't have enough time to collect before the application crashed.

<br/>

At the end, I decided to approach this the hard way. So, in my local, there are two versions. One is freshly pulled from the environment which is not working. The other one is from the source control repository which works. The most obvious difference between the two is the configuration, in this case, we use appsettings.json. But it looks fine.

<br/>

My next guess is one of the dlls is probably the issue, so I started to try to break the one that works by substituting the file with different size one-by-one from the broken application. However, all the suspicious dlls don't seem to cause a problem.

<br/>

As I run out of dlls, I start substituting the appsettings.json. It has different size, why not. And that's when the working version stops working. To zero in on the cause, I start removing fields in the appsettings.json file to see if I can make it to work. Finally, there's one field that's the cause. It looks similar to the following:

::code-block
```
{
  "Settings": {
     "Key": "Value"
  }
}
```
::

<br/>

Looking into the code that read that field, it is immediately obvious. In ASP.NET, there's a way to deserialize the field to an object and we can use enum for the value. Let say:

::code-block
```
{
  "Settings": {
     "Pet": "Dog"
  }
}
```
::

<br/>

The code to retrieve the setting will be similar to the following:

::code-block
```
public enum Pets {Cat, Fish}

public class TheSettings {
  public Pets Pet { get; set; }
}

TheSettings settings = configuration.GetSection("Settings").Get<TheSettings>();
```
::

<br/>

All looks great, except, the enum doesn't have the value specified in the appsettings.json file. In the example above, Dog is not an enum of Pets.  So, when it tries to deserialize the config, it breaks and somehow it didn't throw an error.

<br/>

Fix either the enum or the value in the field in appsettings.json finally fixed the issue and the application can start without crashing.