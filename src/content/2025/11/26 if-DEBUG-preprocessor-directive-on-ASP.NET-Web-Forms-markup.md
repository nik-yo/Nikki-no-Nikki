---
date: 2025-11-26
---

::post-title{:date="date"}
# #if DEBUG Preprocessor Directive on ASP.NET Web Forms Markup
::

::notes
This is a repost from my old blog. First posted in 4/21/2020.
::

<br/>

I have a JavaScript that I want to include only on Release mode of my ASP.NET Web Forms app. The script will reside in the markup. To do that I will need to use #if DEBUG. But to have it working in the markup takes me a while to figure out.

<br/>

First, I tried wrapping my script with the following code on the markup under <head> tag and it doesn't work.

::code-block
```
<% #if !DEBUG %>
    <script>
         alert('Hello World!');
    </script>
<% #endif %>
```
::

<br/>

Next, after reading some articles online, I tried to wrap my code using the following code and it still doesn't work.

::code-block
```
<% if (!Debugger.IsAttached) { %>
    <script>
        alert('Hello World!');
    </script>
<% } %>
```
::

<br/>

Finally, the one that works for me is when I wrap the whole thing with `<asp:PlaceHolder>`{.bg-gray-200 .p-2 .rounded} tag:

::code-block
```
<asp:PlaceHolder runat="server"> 
    <% #if !DEBUG %>
        <script>
            alert('Hello World!');
        </script>
    <% #endif %>
</asp:PlaceHolder>
```
::