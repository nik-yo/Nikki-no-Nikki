---
date: 2025-09-04
---

::post-title{:date="date"}
# Handle CORS with Proxy Config
::

I was trying to run application that serves MFE (Micro Front-End) component locally. This application, let's call it parent MFE, in turn, retrieves MFE component from a different application, let's call this child MFE.

<br />

Primary application -> Parent MFE -> Child MFE

<br />

I managed to get the child MFE application running, but parent MFE application has trouble retrieving from child MFE application due to CORS (Cross-Origin Resource Sharing) policy.

Since all applications are Angular based, I learned a neat feature of proxy.conf.json. With proxy, instead of doing direct call to the child MFE, the parent will call itself and Angular will translate the call by changing the origin to the child MFE origin.

<br />

Parent MFE -> self -- translate origin --> Child MFE

<br />

This requires a few steps:

<br />

1. Create proxy.conf.json if not already exists on the project. This file can reside anywhere in the project.
2. Add the following entry to proxy.conf.json:

::code-block
```
{
  "/call-path-on-parent-mfe": {
    "target": "https://child-mfe-url",
    "secure": false,
    "changeOrigin": true
  }
}
```
::

3. Add the following into angular.json:

::code-block
```
...
"serve": {
  "options": {
    "proxyConfig": "path/to/proxy.conf.json"
  }
}
```
::

4. Change the call on parent MFE to call itself. For example:

From
::code-block
```
http.get("https://child-mfe-url/path-to-resource");
```
::

To
::code-block
```
http.get("/path-to-resource");
```
::

This will work in the case of frontend tried to call backend but was blocked by CORS as well.

::section-title
## GitHub Repository
::

(TBA)