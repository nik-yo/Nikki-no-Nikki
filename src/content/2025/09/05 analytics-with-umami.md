---
date: 2025-09-05
---

::post-title{:date="date"}
# Analytics with Umami
::

<br />

I'm thinking of using third party to check how many visitors to my new blog. Of course, the first thing that came to mind is Google Analytics. But I'm wondered if there's a good alternative. In online forum, some suggested Umami, so I decided to sign up.

The process from sign up to integration was smooth. It took me less than 5 minutes from zero to running. One thing that I need to adjust is because I used Nuxt, I had to configure Umami's script tag from:

::code-block
```
<script defer src="https://cloud.umami.is/script.js" data-website-id="..."></script>
```
::

to the following, which is to be placed under app.vue:

::code-block
```
<script setup lang="ts">
useHead({
  ...
  script: [ 
    { 
      defer: true,
      src: 'https://cloud.umami.is/script.js', 
      'data-website-id': '...'
    }
  ]
})
</script>
```
::

<br />

For more information:

- **Nuxt `useHead`**: [https://nuxt.com/docs/4.x/getting-started/seo-meta#usehead]{.text-blue-600}
- **Umami**: [https://umami.is/]{.text-blue-600}

<br />

::section-title
## GitHub Repository
::

[https://github.com/nik-yo/Nikki-no-Nikki]{.text-blue-600}