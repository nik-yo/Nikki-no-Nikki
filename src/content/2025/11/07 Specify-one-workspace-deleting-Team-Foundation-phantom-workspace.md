---
date: 2025-11-07
---

::post-title{:date="date"}
# "Specify one workspace" - Deleting Team Foundation Phantom Workspace
::

::notes
This is a repost from my old blog. First posted in 12/3/2019.
::

<br/>

One day, my colleague somehow discovered a duplicate team foundation workspace in his computer after rebooting his PC.

<br/>

The duplicates make him unable to find the projects tied to remote repository that he is working on. The duplicated workspace has exactly the same name, owner and computer name as the other one except no existing mapping. Worse, Visual Studio detected only one workspace and deleting it doesn't seem to work.

<br/>

We started with tf.exe command after we figure out that we can manage workspaces using command line. Using the following command, we manage to get a list of all workspaces:

::code-block
```
tf workspaces /collection:<domain>.visualstudio.com\<organization> /owner:*
```
::

<br/>

But our attempt to delete the particular workspace using the following command failed with the message "Specify one workspace":

::code-block
```
tf workspace /delete <workspace_name>;<domain>\<owner_name>
```
::

After browsing more, we found this thread: [https://developercommunity.visualstudio.com/content/problem/267507/cant-delete-an-abandoned-vsts-workspace.html]{.text-blue-600}

<br/>

Basically, we can get a certain ID to differentiate the two workspaces. But to manage workspaces, we need "Administer workspaces" permission. It took us a while to figure out how to give ourselves the permission. To do that we did the following steps:

<br/>

1. Log in to Azure DevOps console.
2. Select the organization to go to the organization level page.
3. On the bottom left of the console, click on the "Organization settings".
4. Under Security > Permissions, select "Project Collection Administrators" group.
5. Add ourselves (users) as member of that group.
6. Once permission was setup, we can then run the following command to get a list of all workspaces in xml format:

<br/>

::code-block
```
tf workspaces /collection:<domain>.visualstudio.com\<organization> /owner:* /format:xml
```
::

<br/>

However, we bumped into another issue. My colleague's tf.exe somehow doesn't support the /format:xml option. And I found out that mine does. It turns out that his tf.exe was located at:

::code-block
```
C:\Program Files (x86)\Microsoft Visual Studio 15.0\Common7\IDE\
```
::

while mine was located at:

::code-block
```
C:\Program Files (x86)\Microsoft Visual Studio\<year>\<edition>\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\
```
::

<br/>

So, I managed to retrieved the xml format and the owner alias of both workspaces. I deleted both of them using the following command:

::code-block
```
tf workspace /delete <workspace_name>;<owner_alias> /collection:<domain>.visualstudio.com\<organization>
```
::

<br/>

We also found out that the difference between both of them are two different email addresses, so we deleted one of the accounts from Visual Studio (on the top right) to make sure only one of them remained.

<br/>

Other thing that didn't work for us initially was trying to rename the visible workspace in Visual Studio. We are hoping by renaming one of them, we can differentiate them and delete one of them. But seems like there is a cache that got in our way that the delete command still didn't work even after we managed to rename it.

<br/>

Other reference links:

[https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/workspace-command?view=azure-devops]{.text-blue-600}
[https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/workspaces-command?view=azure-devops]{.text-blue-600}
[https://stackoverflow.com/questions/5503858/how-to-get-tf-exe-tfs-command-line-client]{.text-blue-600}
