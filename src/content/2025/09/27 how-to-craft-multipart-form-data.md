---
date: 2025-09-27
---

::post-title{:date="date"}
# How to Craft Multipart Form Data
::

::notes
This is a repost from my old blog. First posted in 8/23/2018.
::

<br/>

Ok, it is all started from me trying to send image from android to my web service using Google Volley. By default, Volley doesn't have built-in request to send image, but allows you to extend the request class. So, I need to extend the request class and create a MultipartFormDataRequest kind of class.

<br/>

Reading after reading, I can't find the information I need to craft one. So I have to combine whatever I read with trial and error. The first one is the concept of boundary. It is a required information under Content-Type header. It acts as a separator between fields and can be any random string as long as it meets the requirements such as it can't exist in actual field data. More information such as length and size limit can be found under RFC 2046 Section 5.1.

<br/>

So, the content-type header will be:

::code-block
```
Content-Type: multipart/form-data; boundary=anyrandomstring
```
::

Next is how to use the boundary. The http body will start with two hyphens followed by the boundary. Underneath it is the Content-Disposition and Content-Type key value pair for each field. Between each field, it will be another two hyphens followed by the boundary as the separator. The one that caught me off guard was the closing boundary, it is two hyphens followed by the boundary and then followed by another two hyphens, so the http body will be:

::code-block
```
--anyrandomstring

Content-Disposition: form-data; name=textFieldName
Content-Type: text/plain

TextFieldValue

--anyrandomstring

Content-Disposition: form-data; name=imageFieldName; filename=imageFilename.jpg
Content-Type: image/jpeg

[ImageBytes]

--anyrandomstring--
```
::

And then it works wonderfully.