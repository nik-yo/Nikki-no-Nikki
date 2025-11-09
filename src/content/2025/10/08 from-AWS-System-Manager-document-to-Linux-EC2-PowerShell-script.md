---
date: 2025-10-08
---

::post-title{:date="date"}
# From AWS System Manager Document to Linux EC2 PowerShell Script
::

::notes
This is a repost from my old blog. First posted in 10/25/2018.
::

<br/>

Let me start from what I'm trying to accomplished. Basically, I need to map partitions in Linux with EBS volumes. I first tried "df" command which works great. Through the following article, I found a way to retrieve corresponding volumes attached to the EC2 instance.

[https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2-windows-volumes.html]{.text-blue-600}

<br/>

Next, it is just a matter to marry both of them and output them as json. After many web searches and pages, I decided to install PowerShell Core to utilize its `ConvertTo-Json`{.bg-gray-200 .p-2 .rounded} function. All went great and I would like to create a new AWS System Manager Command Document so I can fire up an api call to execute the script.

<br/>

I first tried AWS System Manager's RunPowerShellScript document which claims to be able to execute PowerShell script on Linux. However, it somehow failed. I checked the requirements, update SSM Agent to no avail. Eventually, we submitted support ticket and waiting for the reply.

<br/>

While waiting for the support reply, I found a workaround. The RunShellScript document works fine and PowerShell supports running command as argument, so I tried:

::code-block
```
pwsh -Command "<the_command>"
```
::

And it failed. Through trial and error, I found out that I need to escape the $ sign on the document side. I then tried again. And of course, it failed again.

<br/>

Next, I remembered that double quotes needs to be escaped in the document. However, it can create confusion on the execution side, so it has to be escaped the second time for PowerShell argument.

<br/>

On the document, it becomes:

::code-block
```
" pwsh -Command \"\$PS_Variable=\\\"Intended String\\\"\""
```
::

<br/>

The double escape works for the double quotes, but it is troublesome, so I decided to change the internal double quotes to single quote because PowerShell can handle it too and no escape needed.

::code-block
```
" pwsh -Command \"\$PS_Variable='Intended String (cleaner, no?)'\""
```
::

<br/>

However, I found out another issue, single quote does not handle insert of variable and thus for my case, it still failed.

::code-block
```
" pwsh -Command \"\$PS_Variable='This does work'\""

" pwsh -Command \"\$PS_Variable='NOT' \$YetAnotherVariable='This does \$PS_Variable work'\""
```
::

<br/>

Well, it is easy, just return it to double-escaped double quotes.

<br/>

Next, I had another issue that it is unable to access AWS API. After another set of trials and errors, I found out that I need to import AWS Powershell module in the document, thus I have to add the following line:

::code-block
```
" Import-Module AWSPowerShell.NetCore"
```
::

or shorthand:

::code-block
```
" ipmo AWSPowerShell.NetCore"
```
::

And now it is 5 and works perfectly.

<br/>

**Edit 10/26/2018**: AWS support replied that there is indeed an issue with the RunPowerShell script command.

**Edit 11/01/2018**: AWS support said the internal team were able to replicate the issue and working on the fix. No ETA as of today.