---
date: 2025-11-08
---

::post-title{:date="date"}
# useEffect is Executed Twice
::

<br/>

I had a case in which my react app calls the same api endpoint twice. The call is wrapped inside the useEffect hook. At first, I thought the page was rendered twice, but that was not the case.

::code-block
```
useEffect(() => {
  callEndpoint();
}, []);
```
::

After further investigation, apparently the useEffect is executed twice even though the trigger is an empty array. I found out later on that it is due to `React.StrictMode`{.bg-gray-200 .p-2 .rounded}. In my App.tsx:

::code-block
```
<React.StrictMode>
  <App />
</React.StrictMode>
```
::

Removing it removed the duplicate execution.

::code-block
```
//<React.StrictMode>
  <App />
//</React.StrictMode>
```
::
