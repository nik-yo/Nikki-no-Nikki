---
date: 2025-12-16
---

::post-title{:date="date"}
# Xcode CodeSign Incorrectly States Password is Incorrect
::

::notes
This is a repost from my old blog. First posted in 9/11/2020.
::

<br/>

I was trying to create an archive in Xcode to prepare the app for testing. It requires a code signing certificate and Xcode tried to reach out to Keychain to obtain it, so it prompted me for a password to my Keychain.

<br/>

My first thought is since the Keychain lives in my Mac, it has to be my Mac's password, so I entered it and it failed. I re-checked the characters, re-entered and it still failed. That is odd considering I did that before without issue.

<br/>

I found out that my Keychain Access app was still active. I have to quit the app and then it proceeds properly. So, the solution is quit the Keychain Access app before entering password for signing.
