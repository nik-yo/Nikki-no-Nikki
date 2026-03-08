---
date: 2026-02-07
---

::post-title{:date="date"}
# Sentinel One Strikes Again. No internet connection. Uninstall Sentinel One Agent.
::

::notes
This is a repost from my old blog. First posted in 11/19/2024.
::

<br/>

This happened to a co-worker of mine a while back when his test application file was marked as suspicious by Sentinel One antivirus and had his internet on his laptop disabled. Today, it happened to me without any suspicious file. Probably suspicious activity, who knows. On Microsoft Edge, it says "Hmmm... your Internet access is blocked.", "Firewall or antivirus software may have blocked the connection", and "ERR_NETWORK_ACCESS_DENIED".

<br/>

So, I worked with my IT to uninstall the agent, but uninstalling is not without a fight. Here are the steps that I took:

1. Since it is a Windows 11 machine with Bitlocker, I have to first get the Bitlocker key. From command prompt run: `manage-bde -protectors -get C:`{.bg-gray-200 .p-2 .rounded}
2. After I verified it is the same key that the IT has, I saved the key outside of the machine.
3. Then go to system configuration by searching for "sysconfig" or run msconfig. Under "boot" tab, check the "Safe boot" option, then click "Apply" and then "OK". In my case, it alerts about Bitlocker after clicking "Apply", so I just agree to it since I already have the key.
4. Restart/reboot the machine and it will run in safe mode.
5. Rename "C:\ProgramData\Sentinel" to something else. Then go to "C:\Program Files\Sentinel One\Sentinel Agent {Version}\config". We are supposed to delete files here, but the files are owned and managed by SentinelHelperService, so I wasn't able to delete them, and the service can't start in safe mode.
6. Since I'm local admin, on a privileged (administrator mode) command prompt, I can change ownership of the files by running: `takeown /F "C:\Program Files\Sentinel One\Sentinel Agent {Version}\config\*"`{.bg-gray-200 .p-2 .rounded}. Replace {Version} with the version of the agent on your machine.
7. Then we need to change the permissions of the files by running: ` icacls "C:\Program Files\Sentinel One\Sentinel Agent {Version}\config\*" /grant {YourUserName}:F /t`{.bg-gray-200 .p-2 .rounded}
8. Go back to "C:\Program Files\Sentinel One\Sentinel Agent {Version}\config" and delete the files. You can also run the command: rm "C:\Program Files\Sentinel One\Sentinel Agent {Version}\config\*".
9. Once that's done, go back to system configuration, either search for sysconfig or run msconfig, under "boot" tab, uncheck the "Safe boot" option, "Apply", "OK", and restart/reboot. This should launch in normal mode.
10. After login, I just uninstall the agent as usual, then restart/reboot once more and the issue is fixed.

<br/>

Ref: [https://justinshafer.blogspot.com/2022/08/how-to-uninstall-sentinel-one-without.html]{.text-blue-600}


