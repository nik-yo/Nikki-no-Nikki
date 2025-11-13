---
date: 2025-10-26
---

::post-title{:date="date"}
# AWS Code Deploy Error: Make sure your AppSpec file specifies "0.0" as the version
::

::notes
This is a repost from my old blog. First posted in 6/19/2019.
::

<br/>

I got this error when attempting to deploy using AWS Code Deploy. Checking the appspec.yml, it does have: version: 0.0. One of the suggestions in StackOverflow was the line ending has to Linux. However that did not help in my case. Since I'm deploying to Windows, the line ending has to be Windows.

<br/>

After couple trial and error. I found out that Visual Studio save my appspec.yml with UTF-8 encoding, so I proceed to change it to "Western European (Windows) - Codepage 1252" encoding and code deploy works flawlessly.

<br/>

To change the encoding, I use the following steps in VS2017:
1. Select the file in Solution Explorer.
2. Click File menu on Visual Studio
3. Select Save <filename> As...
4. On the pop up, click the tiny arrow next to the Save button
5. Select Save with Encoding...
6. I select Western European (Windows) - Codepage 1252 for the Encoding and Current Setting for the Line endings.

