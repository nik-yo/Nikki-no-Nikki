---
date: 2026-01-21
---

::post-title{:date="date"}
# Use Multiple Git Accounts on One Computer
::

::notes
This is a repost from my old blog. First posted in 9/2/2024.
::

<br/>

I was looking for a way to use two git accounts in a single machine. Apparently, there are multiple ways to do that:

- Use different protocols for different accounts. One account can use HTTP, another account uses SSH.
- Use different SSH keys. One per account.
- Use HTTP and PAT. This might be GitHub specific but per my experience with PAT in Azure DevOps, this is not feasible as PAT has expiration and needs to be renewed. [https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-personal-account/managing-multiple-accounts]{.text-blue-600}

<br/>

I ended up using different protocols since that will save me effort in configuring one of the accounts.

<br/>

First, I need to create an ssh key. [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key]{.text-blue-600}.

<br/>

Since I'm in Windows, I can use Git Bash.

1. Launch Git Bash
2. Run: `ssh-keygen -t ed25519 -C "your_email@example.com"`{.bg-gray-200 .p-2 .rounded}
3. If prompted to enter passphrase, make sure you note it somewhere (I saved mine in password manager).
4. If you need to change the passphrase, follow the steps in this link: [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases#adding-or-changing-a-passphrase]{.text-blue-600}
5. Also note the location of the generated key. In my case, it is `~/.ssh/id_ed25519 or %USERPROFILE%/.ssh/id_ed25519`{.bg-gray-200 .p-2 .rounded}
Once the key is generated, we need to add it to ssh_agent. This way, local git will know to use the key. [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent]{.text-blue-600}

<br/>

1. Launch PowerShell in elevated admin mode.
2. Make sure the ssh-agent is running:
    - `Get-Service -Name ssh-agent | Set-Service -StartupType Manual`{.bg-gray-200 .p-2 .rounded}
    - `Start-Service ssh-agent`{.bg-gray-200 .p-2 .rounded}
3. Launch a separate PowerShell terminal without admin mode.
4. Run the following command: `ssh-add c:/Users/{your_user}/.ssh/id_ed25519`{.bg-gray-200 .p-2 .rounded}

<br/>

After that, we need to add the key to GitHub: [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account]{.text-blue-600}.

<br/>

1. In GitHub, under your profile menu on the top right of the page, select Settings.
2. Then on the left menu, select **SSH and GPG keys**.
3. Add a new key and use a descriptive name it under Title box. In my case, I use the name of my machine since the key resides in my machine.
4. Go to the key location. In my case: `%USERPROFILE%/.ssh`{.bg-gray-200 .p-2 .rounded}
5. Copy the content of the `{key}.pub`{.bg-gray-200 .p-2 .rounded} (note the .pub extension for public key, don't copy the one without it as it is the private key). In my case, it is `id_ed25519.pub`{.bg-gray-200 .p-2 .rounded}
6. Paste the content of the key to GitHub and click **Add SSH key**.

<br/>

Then I added ssh config as follow:

1. In the key location, create file with name config. In my case, the file path will be: `%USERPROFILE%/.ssh/config`{.bg-gray-200 .p-2 .rounded}
2. For the content, it will be:
::code-block
```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```
::
3. If there are multiple ssh keys for multiple accounts, it will contain multiple entries where the Host can be different while the HostName can stay the same.

<br/>

Afterwards, I had to configure global .gitconfig in `%USERPROFILE%`{.bg-gray-200 .p-2 .rounded} by adding the includeIf section. This is so that I can use different user name and email for different accounts. The content looks like the following:

::code-block
```
[user]
   name = {username}
   email = {email}

[includeIf "gitdir:~/{other_folder}/"]
    path = ~/{other_folder}/.gitconfig
```
::

<br/>

As you noticed, the includeIf will need a separate directory with its own .gitconfig file. It works for me as I have a separate directory for repositories that use a separate git account. The content of the other .gitconfig file will be:

::code-block
```
[user]
   name = {other_username}
   email = {other_email}
```
::

<br/>

By now, it is pretty much done. If I do a git clone on ssh path, it will prompt for my passphrase and it will work.

::code-block
```
git clone git@github.com:{account}/{repo}.git
```
::

But in my case, I have existing repositories that needs to be updated to use ssh, so for each repo, I had to run:

::code-block
```
git remote set-url origin git@github.com:{account}/{repo}.git
```
::

Thus, that's the end of my multi accounts journey.
