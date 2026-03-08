---
date: 2026-01-06
---

::post-title{:date="date"}
# Retain Web.Config Transformation Files in Azure DevOps
::

::notes
This is a repost from my old blog. First posted in 2/15/2021.
::

<br/>

Documentation is never enough and it will never be able to keep up with the change. The only way to really find answer to a problem is to experiment.

<br/>

I have a simple task. Keep the web.config transformation files during build pipeline in Azure DevOps so I can use them to transform the web.config during release pipeline to customize by environment. By transformation files, I mean files such as web.Release.config. 

<br/>

I had it working by adding a copy task in Azure DevOps but it was just a workaround, so I'm trying to find a more elegant way on doing the same thing.

<br/>

At first, I only set the Build Action of each transformation file to Content. It is supposed to be included during deployment. However, after build is done, I noticed the transformation files were discarded and thus not included.

<br/>

After few trial and error, the steps that work for me are:

- Setting the Build Action to Content for each transformation file
- Remove `<DependentUpon>`{.bg-gray-200 .p-2 .rounded} tag of each transformation file in project file

<br/>

The following thread triggered my removal of `<DependentUpon>`{.bg-gray-200 .p-2 .rounded} tag
[https://github.com/microsoft/azure-pipelines-tasks/issues/4372#issuecomment-303298798]{.text-blue-600}


**Update Feb 16, 2021**

My transformation task threw a NullReferenceException. It happened because during build, there was a transformation that took place and removed the tag that supposedly exists. To fix this, I have to disable the transformation during build and I manage to do that by providing the following MSBuild argument:

::code-block
```
/p:TransformWebConfigEnabled=False
```
::

<br/>

In my case, I built a .NET Framework app using VS2017. There are cases online which the tag above doesn't work and it might not work on .NET Core app. Some people manage to suppress transformation using the following MSBuild argument which sadly didn't work for me:

::code-block
```
/p:IsTransformWebConfigDisabled=True
```
::


