---
date: 2025-12-01
---

::post-title{:date="date"}
# Configure Port on ASP.NET Web API
::

<br/>

I have a ASP.NET Web API using Minimal that's integrated with ASP.NET Aspire. It's great that a single command will start the application along with the supporting resources, but when I need to modify the code, I have to first stop it in Aspire, build, and then restart it in Aspire. It is a hassle compare to just click "Start Debugging" in Visual Studio.

<br/>

So, I did just that, stop it in ASP.NET Aspire and start it through Visual Studio. But I noticed that the port launched through ASP.NET Aspire and Visual Studio are different although both are supposed to use `launchSettings.json`{.bg-gray-200 .p-2 .rounded}. Through Visual Studio, it defaults to `http://localhost:5000`{.bg-gray-200 .p-2 .rounded} no matter http or https profiles used to launch it, while ASP.NET Aspire use ports specified in launchSettings.json. That prompts me to find a way to match the port so it doesn't change when I launch from either Aspire or Visual Studio.

<br/>

Further investigation, launchSettings.json is meant to be used by Visual Studio. So the profiles are visible in Visual Studio, but apparently the applicationUrl field is not picked up in my case although it is running using Kestrel indicated by `"commandName": "Project"`{.bg-gray-200 .p-2 .rounded}. In this case, my application is running .NET 10 and I use Visual Studio 2026 community.

<br/>

Visual Studio has a built-in Debug UI under `<your-project> > Right click > Properties > Debug > General > Open debug launch profiles UI`{.bg-gray-200 .p-2 .rounded}. If I provide the following command line arguments, then it will use the specified port and add that argument to launchSettings.json.

::code-block
```
--urls http://localhost:5123
```
::

<br/>

As of this point, I can't find a way to get Visual Studio to use the applicationUrl in the launchSettings.json, so I temporarily use the command line arguments.

<br/>

Other things that I learned is `WebApplication.CreateSlimBuilder()`{.bg-gray-200 .p-2 .rounded} will only support http as https termination is usually done on the ingress which I can relate since I built a whole environment from scratch in AWS before.

<br/>

For more information: [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/native-aot?view=aspnetcore-10.0#the-web-api-native-aot-template]{.text-blue-600}

<br/>

Other things to mention is since we are planning to use the same port, we need to remove the code to launch the application in Aspire to prevent port conflict.

<br/>

In my case, my Aspire solution also include the application projects, so Aspire needs to run first so it can copy the project files before running the application through different instance of Visual Studio.