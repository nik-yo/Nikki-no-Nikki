---
date: 2026-02-10
---

::post-title{:date="date"}
# Playwright Intermittent Connection Refused Error
::

::notes
This is a repost from my old blog. First posted in 2/26/2025.
::

<br/>

As I have more tests in Playwright, the number of workers required grow and I happened to encounter the following error:

::code-block
```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
```
::

<br/>

And the tests that failed changes every time playwright test is run.

<br/>

To solve this, I reduce the workers in playwright.config.ts.

from:

::code-block
```
workers: process.env.CI ? 1 : undefined,
```
::

<br/>

to:

::code-block
```
workers: process.env.CI ? 1 : 8, //8 works fine for me. I will go smaller like 4 or 5 if the issue persists. This defines the max workers
```
::

<br/>

Alternatively, workers can be set when running the test.

::code-block
```
npx playwright test --workers 8
```
::

For more information:

[https://playwright.dev/docs/test-parallel#limit-workers]{.text-blue-600}

