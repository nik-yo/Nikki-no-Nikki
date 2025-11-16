---
date: 2025-11-16
---

::post-title{:date="date"}
# .NET 10, Revert OpenAPI 3.1 to OpenAPI 3.0
::


I recently upgraded my web api to .NET 10 and .NET 10 supports OpenAPI version 3.1 schema. When I generate the code based on the new document, I noticed a lot of code change, so I wanted to revert back to OpenAPI version 3.0. The following article helps to get me started: [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-10.0&tabs=visual-studio%2Cvisual-studio-code]{.text-blue-600}

<br/>

In my `Program.cs`, I modified from:

::code-block
```
builder.Services.AddOpenApi();
```
::

to:

::code-block
```
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;
});
```
::

And for generated document, I need to update from:

::code-block
```
<OpenApiGenerateDocumentsOptions>--file-name api</OpenApiGenerateDocumentsOptions>
```
::

to:

::code-block
```
<OpenApiGenerateDocumentsOptions>--file-name api --openapi-version OpenApi3_0</OpenApiGenerateDocumentsOptions>
```
::