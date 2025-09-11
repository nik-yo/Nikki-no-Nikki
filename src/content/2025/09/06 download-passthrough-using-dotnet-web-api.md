---
date: 2025-09-06
---

::post-title{:date="date"}
# Download Passthrough using .NET Web API
::

<br />

In one of my projects, one of the feature is to be able to upload to and download from existing service/API. Basically, the backend will act as a middle man. The first approach is for the backend to download the file, store it as byte array and then send it down to the frontend like the following:

::code-block
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
::

But the method above means the file is retained in the memory on the backend before being sent down to the frontend, thus the server needs to have enough memory to hold the full file size. It gets worse when there are multiple downloads at the same time. The file is then returned to the frontend similar to the following:

::code-block
```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var byteArray = await DownloadFromServiceAsync(request);

  return Ok(new CustomResponse() { ByteArray = byteArray });
}
```
::

Another issue with the method above is the download time. It means frontend has to wait longer since backend has to fully download the file from the existing service before sending it. To solve the issues, the content has to be streamed end-to-end. From existing file service to backend and backend to frontend.

<br />

::section-title
## Backend to Frontend
::

Apparently the reason why it was done that way is we can't get MemoryStream to work with download. I decided to play with it to try understanding the issues and hopefully find a solution. I started with tackling backend to frontend piece and take care of existing service to backend later. My first try didn't work.

::code-block
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
::

And it immediately threw an error when I tried it through Swagger UI. Part of the error message said: `Timeouts are not supported on this stream`. I found out later that by default, web api will serialize the content as json. I happened to read about `FileContentResult` but it suffers from the same problem. So I decided to experiment a little and finally got it to work by removing the Ok() method, so it becomes:

::code-block
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
::

Alternatively:

::code-block
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
::

<br />

::section-title
## File Service to Backend
::

The other half of the solution has something to do with getting the file streamed from existing file service. The `httpClient.GetAsync` has to be replaced with `httpClient.GetStreamAsync`. I ended up just passing the stream all the way to the backend endpoint. So instead of:

::code-block
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
::

It becomes:

::code-block
```
public async Task<Stream> DownloadFromServiceAsync(CustomRequest request) {
  ...

  return await httpClient.GetStreamAsync(url);
}
```
::

And the endpoint code has to be updated:

::code-block
```
[HttpGet]
public async Task<IActionResult> DownloadFile(CustomRequest request)
{
  var stream = await DownloadFromServiceAsync(request);

  return new FileStreamResult(stream, "application/octet-stream");
}
```
::

<br />

::section-title
## Testing
::

Sadly I can't attach a screenshot at the moment, but I tested with 150 MB of text file. Without streaming, the memory used started from 160 MB, shot up to 380 MB after getting the file from file service, and then to 549 MB when Swagger UI finally got hold of the file. With streaming code, since we passed the stream, the memory usage only went from 160 MB to 218 MB for the same file.

<br />

This is my first attempt to passthrough stream to download file using ASP.NET Web API.

<br />

::section-title
## GitHub Repository
::

(TBA)