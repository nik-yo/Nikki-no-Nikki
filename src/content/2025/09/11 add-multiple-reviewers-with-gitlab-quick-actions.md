---
date: 2025-09-11
---

::post-title{:date="date"}
# Add Multiple Reviewers with GitLab Quick Actions
::

<br />

At one point, I was moved to a new team at work. Since the team number increased and we were required to add everyone as reviewers when we made merge request (or pull request), clicking got tedious.

<br />

So, we were looking for a way to create a group and hope we can just add the group as reviewers. GitLab does support that but we didn't have the permission. Asking and waiting for the permission can take a long time and might not be granted.

<br />

As we look around for solution, we happened to bump into [GitLab Quick Actions](https://docs.gitlab.com/user/project/quick_actions/){.text-blue-600}. And it's a great workaround. By simply add the following text into the description box, it automatically adds everyone as reviewers when the merge request is created.

::code-block
```
/reviewer @user1 @user2 @user3
```
::