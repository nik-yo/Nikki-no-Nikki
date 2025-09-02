---
date: 2025-06-15
---

# CRM using Nuxt Content

This project started when I was looking for an alternative to blogger and WordPress and other blogging technology. Preferrably without database backing, support static side generator (SSG) so I can host it cheaply, and less painful to update content. I have been using Next.js with json to host my data for a while, but json isn't easy to write post on. I happened to read on Nuxt content, so I decided to give it a try.

## Installation

It didn't go very smooth as of this writing. First, I created a Nuxt project. It prompted for additional tools that I would like to install. One of the tools is Nuxt Content. Well, it's a convenient start to be able to add to a new project. Sadly, that's also when the inconvenient starts.

Nuxt Content failed to install due to missing better-sqlite3. Based on the error, better-sqlite3 is required, but better-sqlite3 failed to install due to missing VC++ toolset. After trying few failed recommendations, I stumble upon this: https://github.com/WiseLibs/better-sqlite3/blob/HEAD/docs/troubleshooting.md. 

Basically, I need to make sure my Node JS is supported and then run the script in `C:\Program Files\nodejs\install_tools.bat`. It will install Chocolatey, Python, and Visual Studio Build Tools 2019. Both Chocolatey and Python installations went smoothly, but Visual Studio Build Tools 2019 installation failed. I ended up finishing the installation through Visual Studio Installer. Then, re-installing better-sqlite3 finally completed.

## Contents

The rest are pretty well documented in [Nuxt Content](https://content.nuxt.com/) site. I had to create a content folder and then writing my first page in markdown was easy.