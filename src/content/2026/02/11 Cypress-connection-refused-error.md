---
date: 2026-02-11
---

::post-title{:date="date"}
# Cypress Connection Refused Error
::

::notes
This is a repost from my old blog. First posted in 2/26/2025.
::

<br/>

I had a case where I need to call an api then visit the app in Cypress and it turns out to be causing an issue with the following error message:

::code-block
```
Error: connect ECONNREFUSED 127.0.0.1:4200
```
::

<br/>

It turns out to be Cypress' origin safety issue. I wrapped the cy.request() with cy.origin() and that solves the issue with a catch.

<br/>

If I call cy.origin() before I call cy.visit() then it doesn't work somehow.

<br/>

If I call cy.visit() first and then cy.origin() then it works fine.

<br/>

Also, if after code change, it doesn't appear to work, restart cypress app (or test runner if using older version). 

<br/>

I had the case where I call cy.origin() first, then cy.visit() which doesn't work, make the change to call cy.visit() first without restarting the app and it still doesn't work. But it works after I restarted cypress app.
