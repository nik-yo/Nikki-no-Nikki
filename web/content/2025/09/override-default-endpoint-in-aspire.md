::post-title
---
date: 2025-08-08
---

# Override Default Endpoint in .NET Aspire
::

<br/>

I have been using .NET Aspire for a while now, but this is still not something that's obvious to me. One thing that's great about Aspire is it will launch resources, generate endpoint, and pass it to the application. In my case, I want to launch a Mongo DB container and pass the connection string to my application. However, I want it in the format that's easy for me to maintain.

In [.NET Aspire MongoDB database integration](https://learn.microsoft.com/en-us/dotnet/aspire/database/mongodb-integration?tabs=dotnet-cli) article, the supported connection string format doesn't meet my requirements, so my first attempt is to retrieve the data, format them and pass it as environment variable. Something along the line:

::code-block
```
var mongodb = ...; // for brevity

var username = mongoDB.Resource.UserNameParameter?.Value;
var password = mongoDB.Resource.PasswordParameter?.Value;
var port = mongoDB.Resource.PrimaryEndpoint.Port.ToString();

builder.AddProject<Projects.AsyloSoft_Market_Api>("market-api")
       .WithEnvironment("Database__ConnectionString", $"mongodb://{username}:{password}@localhost:{port}")
       .WaitFor(mongoDB);
```
::

<br/>

However, that didn't work with an error because some data are generated at runtime.

::code-block
```
System.InvalidOperationException: 'The endpoint `tcp` is not allocated for the resource `mongo`.'
```
::

<br/>

My second attempt is to override the generated connection string particularly the host port because, by default, .NET Aspire will randomly use unused port which is great, but it becomes unpredictable. By doing this, the connection string is static, and it doesn't have to be passed to the application every time they are launched.

::code-block
```
var mongodb = builder.AddMongoDB("mongo")
                .WithEndpoint(27017, 27017, "tcp")
                .WithLifetime(ContainerLifetime.Persistent);
```
::

<br/>

For somewhat reason, this overload tried to create a new endpoint that's mapped to the same target port, which caused conflict and thus error.

::code-block
```
Aspire.Hosting.DistributedApplicationException: 'Endpoint with name 'tcp' already exists. ...
```
::

<br/>

After multiple trials and errors, I managed to override the default generated endpoint using a different overload.

::code-block
```
var mongodb = builder.AddMongoDB("mongo")
                .WithEndpoint("tcp", (endpointAnnotation) =>
                {
                    endpointAnnotation.Port = 27017;
                    endpointAnnotation.TargetPort = 27017;
                    endpointAnnotation.Protocol = ProtocolType.Tcp;
                })
                .WithLifetime(ContainerLifetime.Persistent);
```
::

<br/>

It is strange to me that two overloads of a method work differently at its core.