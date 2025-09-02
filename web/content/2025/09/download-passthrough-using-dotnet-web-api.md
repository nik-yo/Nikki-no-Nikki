---
date: 2025-06-16
tag: .NET, Web API, Download
---

# Download Passthrough using .NET Web API

In one of my projects, I am in charge of frontend, while my co-worker works on the backend. One of the feature is to be able to upload to and download from existing service/API. Basically, our backend will act as a middle man. 

The backend is working but the way it is implemented will use a lot of memory during download. To download a file, the backend will download the read the file as byte array like the following:

```
public async Task<byte[]> DownloadFromServiceAsync(CustomRequest request) {
  ...

  using (var response = await httpClient.GetAsync(url)) 
  {
    var byteArray = await response.Content.ReadAsByteArrayAsync();

    return byteArray;
  }
}
```

But the method above means the whole file size is retained in the memory, thus the server needs to have enough memory to hold the whole file. It gets worse when there are multiple downloads at the same time.

To make things worse, the whole file is returned to the client at the backend endpoint similar to the following:

```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var byteArray = await DownloadFromServiceAsync(request);

  return Ok(new CustomResponse() { ByteArray = byteArray });
}
```

The frontend, thus, suffers from the same problem as the backend where it needs to have enough memory to store all the file before it even saves the file to the disk. To solve the issue, the content has to be streamed end-to-end. From existing file service to backend and backend to frontend.

## Backend to Frontend

Apparently the reason why it was done that way is because my co-worker can't get MemoryStream to work with download. I decided to play with it to try understanding the issues and hopefully find a solution. I started with tackling backend to frontend piece and take care of existing service to backend later. My first tried didn't work.

```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var byteArray = await DownloadFromServiceAsync(request);

  var memoryStream = new MemoryStream(byteArray);
  memoryStream.Position = 0;

  return Ok(new FileStreamResult(memoryStream, "application/octet-stream"));
}
```

And it immediately threw an error when I tried it through Swagger UI. Part of the error message said: "Timeouts are not supported on this stream". I found out later that by default, web api will serialize the content as json. I happened to read about `FileContentResult` but it suffers from the same problem. So I decided to experiment a little and finally got it to work by removing the Ok() method, so it becomes:

```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var byteArray = await DownloadFromServiceAsync(request);

  var memoryStream = new MemoryStream(byteArray);
  memoryStream.Position = 0;

  return new FileStreamResult(memoryStream, "application/octet-stream");
}
```

Alternatively:

```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var byteArray = await DownloadFromServiceAsync(request);

  var memoryStream = new MemoryStream(byteArray);
  memoryStream.Position = 0;

  return File(memoryStream, "application/octet-stream"));
}
```

## File Service to Backend

The other half of the solution has something to do with getting the file streamed from existing file service. The `httpClient.GetAsync` has to be replaced with `httpClient.GetStreamAsync`. I ended up just passing the stream all the way to the backend endpoint. So instead of:

```
public async Task<byte[]> DownloadFromServiceAsync(CustomRequest request) {
  ...

  using (var response = await httpClient.GetAsync(url)) 
  {
    var byteArray = await response.Content.ReadAsByteArrayAsync();

    return byteArray;
  }
}
```

It becomes:

```
public async Task<Stream> DownloadFromServiceAsync(CustomRequest request) {
  ...

  return await httpClient.GetStreamAsync(url);
}
```

And the endpoint code has to be updated:

```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var stream = await DownloadFromServiceAsync(request);

  return new FileStreamResult(stream, "application/octet-stream");
}
```

## Testing

Sadly I can't attach a screenshot at the moment, but I tested with 150 MB of text file. Without streaming, it started from 160 MB, shot up to 380 MB after getting the file from file service, and then to 549 MB when Swagger UI finally got hold of the file.

With streaming code, since we pass the stream, the memory usage only went from 160 MB to 218 MB for the same file.

This became my first attempt to passthrough stream to download file using ASP.NET Web API.