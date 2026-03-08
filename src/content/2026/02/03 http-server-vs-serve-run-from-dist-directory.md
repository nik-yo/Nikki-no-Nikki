---
date: 2026-02-03
---

::post-title{:date="date"}
# Http-server vs Serve: Run from dist directory
::

My team had to test an MFE repository locally. However, it's meant to be run from "dist" folder after build and package steps. I saw some recommendation online to use `http-server`{.bg-gray-200 .p-2 .rounded} (https://www.npmjs.com/package/http-server). So, I gave it a try and I managed to get it running really quick. And I quickly found issues too. After installation, I just need to run:

::code-block
```
http-server dist
```
::

<br/>

Accessing from the client, browser threw CORS error. Fixing that was quick with `--cors`{.bg-gray-200 .p-2 .rounded} option.

::code-block
```
http-server --cors dist
```
::

<br/>

Then, for somewhat reason, it didn't send Content-Type response header, so the client got it wrong when parsing the js file. I had to add `-e js` to set the default Content-Type to `application/javascript`{.bg-gray-200 .p-2 .rounded}.

::code-block
```
http-server -e js --cors dist
```
::

<br/>

It's not too bad, but I'm looking for a little simpler solution and I had good experience with `serve`{.bg-gray-200 .p-2 .rounded} (https://www.npmjs.com/package/serve). With serve, after installation, I just need to run:

::code-block
```
serve dist
```
::

<br/>

Same case with http-server, I need to enable CORS by adding `--cors`{.bg-gray-200 .p-2 .rounded} option, so it becomes:

::code-block
```
serve --cors dist
```
::

<br/>

However, it automatically sends the right Content-Type response header.