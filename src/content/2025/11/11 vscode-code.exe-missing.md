---
date: 2025-11-11
---

::post-title{:date="date"}
# VS Code Code.exe Missing
::

<br/>

I had a case where the VS Code shortcut suddenly stopped working. It turns out that it can't find the Code.exe code. I didn't install new version or manually upgraded it. Visiting the directory, Code.exe is just gone.

But eventually found couple of suggestions on how to fix the problem in the following post:

[https://stackoverflow.com/questions/76187272/issues-with-vscode-cannot-open-code-exe-file-missing-and-failed-download]{.text-blue-600}

Couple of suggestions are:

1. Copy the content of `_` folder/directory to parent directory `C:\Users\<User>\AppData\Local\Programs\Microsoft VS Code`{.bg-gray-200 .p-2 .rounded}

2. Create a shortcut to the Code.exe in `_` folder/directory.

3. What I did is update the current shortcut from `C:\Users\<User>\AppData\Local\Programs\Microsoft VS Code\Code.exe`{.bg-gray-200 .p-2 .rounded} to `C:\Users\<User>\AppData\Local\Programs\Microsoft VS Code\_\Code.exe`{.bg-gray-200 .p-2 .rounded}