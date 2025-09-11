---
date: 2025-09-10
---

::post-title{:date="date"}
# Adding Search to Nuxt Content
::

<br />

In this blog, finding a post that contains a certain word can be hard. So, I was looking for a way to easily implement a search feature.Nuxt content doc has a nice write up on [full-text search](https://content.nuxt.com/docs/advanced/fulltext-search){.text-blue-600}, so I started from there.

<br />

The example in the doc uses Nuxt UI, but I managed to use just a simple input tag:

::code-block
```
<input v-model="query" type="text" placeholder="Search..." />  
```
::

<br />

For the search package, I decided to use [minisearch](https://lucaong.github.io/minisearch/){.text-blue-600} which is very easy to use. Just on the implementation side, I need to add check on the `data.value` to pass typescript null check.

::code-block
```
if (data.value) {
  miniSearch.addAll(toValue(data.value))
}
```
::

<br />

One additional thing is the example will display whole content of the page. However, I wanted to limit it to few rows. One option is to use textarea and set it to readonly, but it's not quite the purpose of text area. Tailwind has `truncate` class but it doesn't limit based on number of lines. Tailwind v3.3, however, has [line-clamp](https://tailwindcss.com/docs/line-clamp){.text-blue-600} class built-in which works perfectly in my case.

::code-block
```
<p class="text-gray-600 text-xs line-clamp-3">{{ link.content }}</p>
```
::

<br />

Check it out by clicking the search button above.