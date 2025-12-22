---
date: 2025-12-21
---

::post-title{:date="date"}
# Signing Certificate is None in Xcode
::

::notes
This is a repost from my old blog. First posted in 9/11/2020.
::

<br/>

Xcode has this capability to manage certificates, app ID and provisioning profile which makes is very convenient. However, this time, I would like to manage my own.

<br/>

I manage to get Xcode to recognize the provisioning profile that I have created in developer.apple.com. However, under `.xcodeproj (project file) > Signing & Capabilities > Signing Certificate`{.bg-gray-200 .p-2 .rounded}, the value is none. It also comes with an error that it the provisioning profile is not associated with its own developer certificate. I have made sure that the certificate associated with the provisioning profile is stored in my Keychain, but it seems like Xcode is still trying to use a different certificate for signing.

<br/>

My guess was right, I went to `.xcodeproj (project file) > Build Settings > Code Signing Identity`{.bg-gray-200 .p-2 .rounded} and found out that it is set to iOS Developer under "Automatic" section. Switching it to the right (associated with provisioning profile) certificate on the Keychain solves the issue.
