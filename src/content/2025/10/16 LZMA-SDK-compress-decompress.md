---
date: 2025-10-16
---

::post-title{:date="date"}
# LZMA SDK Compress Decompress
::

::notes
This is a repost from my old blog. First posted in 2/27/2019.
::

<br/>

7z is one of the best if not the best file compression available. Best of all, it is open source. The engine behind it is the LZMA compression method. I was integrating the sdk ([https://www.7-zip.org/sdk.html]{.text-blue-600}) in my project, but however, can't get a quick start on the compress decompress process. After searching the internet, I figured out on a surface level how it all works. Partially thanks to the question in [https://stackoverflow.com/questions/7646328/how-to-use-the-7z-sdk-to-compress-and-decompress-a-file]{.text-blue-600}. So, below, I write down my basic understanding.

<br/>

::section-title
## Compress
::

Basically, the compressed file will contain 3 things with the first 2 are metadata:

The first 5 bytes are compression properties
The next 8 bytes are file size before compression
The compressed bytes

::code-block
```
var encoder = New Encoder();
encoder.WriteCoderProperties(outStream); // Write properties
encoder.Write(BitConverter.GetBytes(inputFileSize), 0, 8); // Write uncompressed file size
encoder.Code(inStream, outSteam, inStream.Length, -1, null); // Actual compress
```
::

<br/>

::section-title
## Decompress
::

To decompress the file, the metadata needs to be provided to the decoder. My code initially threw an error because there is no metadata.

::code-block
```
var properties = new byte[5];
inStream.Read(properties, 0, 5); // Read properties

var fileSizeBytes = new byte[8];
inStream.Read(fileSizeBytes, 0, 8); // Read uncompressed file size
var fileSize = BitConverter.ToInt64(fileSizeBytes, 0);

var decoder = New Decoder();
decoder.SetDecoderProperties(properties); // Provide the properties to decoder
decoder.Code(inStream, outStream, inStream.Length, fileSize, null); // Actual decompress
```
::