---
date: 2025-11-18
---

::post-title{:date="date"}
# JsonSerializerOptions NumberHandling AllowReadingFromString and Strict
::

<br/>

After all the attempts to fix OpenAPI document, I noticed that Orval intepreted one of the property as **unknown** type which is supposed to be integer, thus **number** type. I checked the OpenAPI document and it has the following type and format:

::code-block
```
type: "^-?(?:0|[1-9]\d*)$",
format: "int32"
```
::

For Orval to intepret it properly as number, I need it to be:

::code-block
```
type: "integer",
format: "int32"
```
::

So, I check the backend and found out that it is due to JsonSerializeOptions.NumberHandling is set to AllowReadingFromString by default. [https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/configure-options#web-defaults-for-jsonserializeroptions]{.text-blue-600}

<br/>

I want to set NumberHandling to Strict globally. Since I use minimal api, this article helps [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/responses?view=aspnetcore-10.0#configure-json-serialization-options-globally]{.text-blue-600}. I just need to add the following on my backend code:

::code-block
```
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, HttpApiJsonSerializerContext.Default);
});
```
::