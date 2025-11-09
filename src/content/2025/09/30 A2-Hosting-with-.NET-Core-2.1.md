---
date: 2025-09-30
---

::post-title{:date="date"}
# A2 Hosting with .NET Core 2.1
::

::notes
This is a repost from my old blog. First posted in 9/5/2018.
::

<br/>

Technology advances so fast and I have a new web application which I built using .NET Core 2.1. However, my current web hosting provider does not support .NET Core and I have to look for a new web hosting.

<br/>

Reading some forums, found out that A2 Hosting plans to install .NET Core 2.1 in their shared hosting on August 2018. So on September 5th, 2018, I signed up for a new account with them. The coupon HOSTINGFACTS that I found from a web hosting review website still works and gave me 53% one-time discount.

<br/>

Everything went smoothly until I found out that in my Plesk, I was unable to go higher than .NET 4.6.2. So, I decided to chat with their customer support. It took a while to get in touch with an agent, which makes sense because they have lots of customers and it was during busy hour.

<br/>

From the chat with their customer support, I found out that .NET Core 2.1 has indeed been installed and what is weird is I don't have to flip the .NET version in Plesk. With that information, I decided to try deploy my web application using web deploy mechanism. I had to enable this on the domain level and Plesk will add a link to download the .publishsettings file which can then be imported to Visual Studio.

<br/>

Deploying my application using web deploy mechanism has a small issue too. A2 Hosting apparently uses self-signed certificate and Visual Studio rejects the deployment because it can't trust it. To workaround it, I found many solutions. One of them is to trust the certificate. However, I don't think it is a good idea to trust untrusted certificate, so I decided to add `<AllowUntrustedCertificate>True</AllowUntrustedCertificate>`{.bg-gray-200 .p-2 .rounded} tag on the publish profile xml file.

<br/>

To add the tag, I can't find the UI in VS2017, so I have to go to my project folder, under Properties > PublishProfiles and manually add it to the `.pubxml`{.bg-gray-200 .p-2 .rounded} file.

<br/>

At last I managed to deploy my application and it worked great.