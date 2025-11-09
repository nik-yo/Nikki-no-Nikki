---
date: 2025-09-22
---

::post-title{:date="date"}
# Black Background on Combined Images
::

::notes
This is a repost from my old blog. First posted in 11/30/2016.
::

<br />

I was asked to research about a strange behavior when we combine two images, each image becomes small and the rest of the extra space is filled with black color. After doing a bit of research and making sample applications, I found out that it has something to do with image dpi.

Each image is scanned with 240 dpi while Windows default to 96 dpi. That means, the image is scaled down, so I simply get the least dpi and set it as dpi for the combined image. It works for now, though I can see the potential problem if somehow the horizontal and vertical dpi are different.

::code-block
```
Dim image1 As Bitmap = ...(code to get image) --> has 240 dpi
Dim image2 As Bitmap = ...(code to get image) --> has 240 dpi

Dim combinedImage As New Bitmap(...) --> default to 96 dpi

Dim horizontalResolution As Single = Math.Min(image1.HorizontalResolution, image2.HorizontalResolution)
Dim verticalResolution As Single = Math.Min(image1.VerticalResolution, image2.VerticalResolution)

combinedImage.SetResolution(horizontalResolution, verticalResolution)
```
::