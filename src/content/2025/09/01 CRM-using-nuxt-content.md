---
date: 2025-09-01
---

::post-title{:date="date"}
# CRM using Nuxt Content
::

<br />

I was looking for an alternative to existing blogging technology. Preferrably without database backing, support static side generator (SSG) so I can host it cheaply, and less painful to update content. I have used Next.js with json on my other site, but json isn't easy to write post on. When I read on Nuxt content, I decided to give it a try.

<br />

::section-title
## Installation
::

It didn't go very smooth as of this writing. First, I created a Nuxt project. It prompted for additional tools that I would like to install. One of the tools is Nuxt Content. Well, it's a convenient start. Sadly, that's also when the inconvenient starts.

Nuxt Content failed to install on my Windows machine due to missing better-sqlite3. Based on the error, better-sqlite3 failed to install due to missing VC++ toolset. After few failed tries, I stumble upon this: https://github.com/WiseLibs/better-sqlite3/blob/HEAD/docs/troubleshooting.md. 

Basically, I need to make sure my Node JS is supported and then run the script in `C:\Program Files\nodejs\install_tools.bat`. It will install Chocolatey, Python, and Visual Studio Build Tools 2019. Both Chocolatey and Python installations went smoothly, but Visual Studio Build Tools 2019 installation failed. I ended up finishing the installation through Visual Studio Installer. Then, re-installing better-sqlite3 finally completed.

<br />

::section-title
## Contents
::

On how to add posts as contents are pretty easy. I have to define a collection, add my posts to content folder, and render it with a slug page and queryCollection() method. As expected, Nuxt will use folder path as url path which makes it easy to track down the location of a content.

<br />

::section-title
## Navigation Tree
::

So, I tried to create a list of posts. This is when `queryCollectionNavigation()` is useful. One thing that's not documented is the result is to be rendered one level at a time. I use `children` property to get to the next level. 

<br />

::section-title
## Frontmatter
::

This is a great way to add metadata to the markdown. Also, I bind it to the component, so I can render some properties without having to write them twice. Just one thing to note, it has to be on the top of the markdown. For more details: https://content.nuxt.com/docs/files/markdown#frontmatter

<br />

::section-title
## Custom Style with MDC
::

MDC syntax is what I used to customize the style of some part of the markdown. In my case, the title, date, and the code block. Basically it allows the content to be wrapped in a Vue component with styling included. The content is wrapped with double colon `::`. For more details: https://content.nuxt.com/docs/files/markdown#frontmatter

<br />

::section-title
## Date Formatting
::

This is the most painful case. For somewhat reason, formatting date is not easy. First, I tried to format it in the markdown itself and it didn't work even with MDC syntax data binding. I ended up using a Vue component to enhance the rendering, so I can format it using Javascript. Refer to [GitHub repo](https://github.com/nik-yo/Nikki-no-Nikki){.text-blue-600} for more details. Check the top of the markdown under content and the `PostTitle` components.

<br />

::section-title
## Data Binding
::

In order not to duplicate metadata, I utilize data binding. I tried binding data in markdown itself using the supported: 

::code-block
`{{ $doc.variable || 'defaultValue' }}`
::

But it doesn't support much formatting when I tried to render the data. So, I bind the metadata to a prop to Vue component instead. For more details: https://content.nuxt.com/docs/files/markdown#props

<br />

::section-title
## Custom Font
::

As for custom font, I used Nuxt Fonts + Google Fonts. Once Nuxt Fonts is installed, the rest is just css and Nuxt font will pull the font from built-in repository, in my case, it is Google font. For more details:

- **Nuxt Fonts**: [https://nuxt.com/modules/fonts]{.text-blue-600}
- **Google Fonts**: [https://fonts.google.com/]{.text-blue-600}

<br />

::section-title
## Attribute Styling
::

This is a powerful feature. It allows me to use tailwind class in markdown for styling. For more details: https://content.nuxt.com/docs/files/markdown#attributes

<br />

::section-title
## Conclusion
::

Finally, this blog is done. I learned a lot and can share what I learn with the world.

<br />

::section-title
## GitHub Repository
::

[https://github.com/nik-yo/Nikki-no-Nikki]{.text-blue-600}