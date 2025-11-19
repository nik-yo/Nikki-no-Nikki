---
date: 2025-11-15
---

::post-title{:date="date"}
# OpenAPI and .NET Web API Minimal Api to Download File
::

<br/>

I have an endpoint to download file in my .NET Web API application. When I tried to generate client-side code to download file based on the OpenAPI document, I'm suprised to find that it returns void instead of blob or byte array. So, I checked the OpenAPI document and found out that the response is indeed without type, hence void like the following:

::code-block
```
"responses": {
  "200": {
    "description": "OK"
  }
}
```
::

<br/>

I'm using .NET 9 with built-in OpenAPI support and one of the suggestions is to use `TypedResults.File()`{.bg-gray-200 .p-2 .rounded} similar to:

::code-block
```
TypedResults.File(fileStream, contentType: "application/octet-stream", fileDownloadName: "file.txt");
```
::

<br/>

However, it didn't pick up the type as well. I remember in .NET 8, I had to use `IOperationFilter`{.bg-gray-200 .p-2 .rounded} to generate the expected OpenAPI document response which, at least, should look like:

::code-block
```
"responses": {
  "200": {
    "description": "OK",
    "content": {
      "application/octet-stream": {
        "schema": {
          "type": "string",
          "format": "binary"
        }
      }
    }
  }
}
```
::

<br/>

Perhaps there's .NET 9 equivalent to `IOperationFilter`{.bg-gray-200 .p-2 .rounded} and I found `AddOperationTransformer`{.bg-gray-200 .p-2 .rounded} from [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/customize-openapi?view=aspnetcore-9.0#use-operation-transformers]{.text-blue-600}. However, it needs to be applied globally and requires more code to filter it if we want it only for a certain endpoint. 

<br/>

Fortunately, per endpoint application is addressed in .NET 10: [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/customize-openapi?view=aspnetcore-10.0#use-operation-transformers]{.text-blue-600} and in .NET 10, I can then apply it for a specific endpoint:

::code-block
```
app.MapGet(...)
    .AddOpenApiOperationTransformer((operation, context, cancellationToken) =>
    {
        if (operation.Responses?.TryGetValue(StatusCodes.Status200OK.ToString(), out var okResponse) ?? false)
        {
            okResponse.Content?.TryAdd("application/octet-stream", 
                new OpenApiMediaType
                {
                    Schema = new OpenApiSchema
                    {
                        Type = JsonSchemaType.String,
                        Format = "binary"
                    }
                });
        }
        return Task.CompletedTask;
    });
```
::

<br/>

Alternatively, we can clear existing generated response:

::code-block
```
app.MapGet(...)
    .AddOpenApiOperationTransformer((operation, context, cancellationToken) =>
    {
        var binaryOkResponse = new OpenApiResponse
        {
            Content = new Dictionary<string, OpenApiMediaType>() {
                {
                    "application/octet-stream",
                    new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = JsonSchemaType.String,
                            Format = "binary"
                        }
                    }
                }
            }
        };

        operation.Responses?.Clear();
        operation.Responses?.Add(StatusCodes.Status200OK.ToString(), binaryOkResponse);

        return Task.CompletedTask;
    });
```
::

<br/>

Although it produces the expected response in the OpenAPI document, it feels like forced/hardcoded instead of generating it from the actual response type. So another option is to use `Produces()`{.bg-gray-200 .p-2 .rounded}. This should work with .NET 9 as well:

::code-block
```
app.MapGet(...)
    .Produces<byte[]>(StatusCodes.Status200OK, contentType: "application/octet-stream");
```
::

And the above will produces the following response:

::code-block
```
"responses": {
  "200": {
    "description": "OK",
    "content": {
      "application/octet-stream": {
        "schema": {
          "type": "string",
          "format": "byte"
        }
      }
    }
  }
}
```
::

Notice that the format is byte instead of binary. Basically, **byte** is used when we want to return json along with the file content. To return only the file itself without json, use **binary**. To read more on binary vs byte, please check [https://swagger.io/docs/specification/v3_0/describing-responses/#response-that-returns-a-file:~:text=The%20user%20name.-,Response%20That%20Returns%20a%20File,-An%20API%20operation]{.text-blue-600}.

<br/>

Unfortunately, I can't find a way to generate response with format set to binary using `Produces()`{.bg-gray-200 .p-2 .rounded}.

- .NET 9 type and format: [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/include-metadata?view=aspnetcore-9.0&tabs=minimal-apis#type-and-format]{.text-blue-600}.
- .NET 10 type and format: [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/include-metadata?view=aspnetcore-10.0&tabs=minimal-apis#type-and-format]{.text-blue-600}.

<br/>

Since I still return `TypedResults.File()`{.bg-gray-200 .p-2 .rounded}, I tried to return the same type with:

::code-block
```
app.MapGet(...)
    .Produces<FileStreamHttpResult>(StatusCodes.Status200OK, contentType: "application/octet-stream");
```
::

<br/>

Problem with the above is my client-side code generator creates a lot of unnecessary code, so I tried the following:

::code-block
```
app.MapGet(...)
    .Produces<byte[]>(StatusCodes.Status200OK, contentType: "application/octet-stream");
```
::

<br/>

It produces a better client-side code but somehow, the return value on the client-side code is string instead of blob. Apparently, I need the response format to be binary instead of byte. Since there's no way to do that with Produces, I revert to using `AddOpenApiOperationTransformer`{.bg-gray-200 .p-2 .rounded} which works for my case where generated code returns blob.

<br/>

Although the server returns `FileStreamHttpResult`{.bg-gray-200 .p-2 .rounded} which is a complex object, Scalar correctly return binary in the body and thus the client correctly extracts blob from the call. One final note is the generated OpenAPI document response can be different from the actual working of the endpoint and in this case, it's our responsibility to keep them in sync.
