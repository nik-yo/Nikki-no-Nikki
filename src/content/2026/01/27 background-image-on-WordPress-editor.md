---
date: 2026-01-27
---

::post-title{:date="date"}
# Background Image on WordPress Editor
::

::notes
This is a repost from my old blog. First posted in 9/12/2024.
::

<br/>

I realized that I don't have the Layout option under Styles menu in the Editor. I found out later that I have a bare minimum theme.json. And adding appearanceTools: true field cause it to show up. My theme.json became:

::code-block
```
{
	"version": 3,
	"$schema": "https://schemas.wp.org/wp/6.6/theme.json",
	"settings": {
		"appearanceTools": true
	}	
}
```
::