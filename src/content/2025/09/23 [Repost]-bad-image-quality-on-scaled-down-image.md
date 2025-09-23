---
date: 2025-09-23
---

::post-title{:date="date"}
# Bad Image Quality on Scaled Down Image
::

::notes
This is a repost from my old blog. First posted in 1/18/2017.
::

<br />

The image in `<canvas>` appears to be bad quality when we scale it down. Apparently it is due to linear interpolation algorithm used by the browser because it is fast.

I also learn that scaling down requires resampling while scaling up requires interpolation.

Searching online, I found pixel perfect resampling algorithm.

http://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality

I thus ran the image over the algorithm before having the canvas redraw it. It is a good stuff and improve the quality of the image.