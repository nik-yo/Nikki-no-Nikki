---
date: 2026-03-18
---

::post-title{:date="date"}
# IIS Express Has Exited with Code 4294967295
::

This happens out of a sudden. It's been working great for a while and suddenly I can't debug the web application, which is still using .NET Framework 4.8. The error message is:

::code-block
```
The program '[19000] iisexpress.exe' has exited with code 4294967295
```
::

Visual studio will launch the browser but before the browser loads, the application exited. 

Thanks to the following article, I manage to fix it. 

[https://stackoverflow.com/questions/72171694/iis-express-in-visual-studio-2017-crashes-when-debugging-app-and-selecting-file]{.text-blue-600}

But I follow a slightly different steps:

1. I uncheck the option `Stop debugger when browser window is closed, close browser when debugging stops`{.bg-gray-200 .p-2 .rounded}.
2. Close the browser instances.
3. Launch my application. At this point, iisexpress will not exit for no reason.
4. Stop debugging.
5. Check the option `Stop debugger when browser window is closed, close browser when debugging stops`{.bg-gray-200 .p-2 .rounded} since this option was initially checked.

