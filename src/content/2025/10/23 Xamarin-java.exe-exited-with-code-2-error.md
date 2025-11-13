---
date: 2025-10-23
---

::post-title{:date="date"}
# Xamarin "java.exe exited with code 2" Error
::

::notes
This is a repost from my old blog. First posted in 5/11/2019.
::

<br/>

Bumped into the following error  "java.exe exited with code 2" when building Xamarin app today. The only thing change is I added a Syncfusion NuGet package. I managed to solve it by enabling `MultiDex`{.bg-gray-200 .p-2 .rounded}.

Reference:

- [https://forums.xamarin.com/discussion/97803/getting-error-java-exe-exited-with-code-2]{.text-blue-600}
- [https://developer.android.com/studio/build/multidex]{.text-blue-600}