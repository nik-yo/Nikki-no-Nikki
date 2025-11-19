---
date: 2025-11-17
---

::post-title{:date="date"}
# Managing Package Version in .NET
::

<br/>

One of the issues I helped a client troubleshoot was an error related to package versioning. The project has the following dependency:

Services project depends on package A (v2)
API project depends on package A (v1)
Services project depends on API project

So, package A on Services project has been upgraded to v2, but it was still in the previous version in API project. Code is in Services project calls a method of package A but implemented in API project.

Let say, in package A:

::code-block
```
public class SomePackageClass()
{
  public void DoWorkInPackage()
  {
    ...
  }
}
```

Then in API:

::code-block
```
public class SomeApiClass()
{
  public void DoWorkInApi()
  {
    instanceOfSomePackageClass.DoWorkInPackage();
  }
}

public interface ISomeApiClass
{
  public void DoWorkInApi()
}
```

And in Services:

::code-block
```
public class SomeClassInServices()
{
  public void DoWorkInServices()
  {
    instanceOfSomeApiClass.DoWorkInApi();
  }
}
```

<br/>

As far as Services project is concern, instanceOfSomePackageClass.DoWorkInPackage() is based on v2 of package A, but since the actual call is in API, only v1 package is accessible and thus, it throws an error. As we tried to fix the package version conflict, I learned a few applicable dependency resolution rules from [https://learn.microsoft.com/en-us/nuget/concepts/dependency-resolution]{.text-blue-600}

The first one is (Lowest applicable version)[https://learn.microsoft.com/en-us/nuget/concepts/dependency-resolution#lowest-applicable-version]{.text-blue-600}. In our case, since API requires v1 of package A, even if feed has v2, it will still use v1 of package A. In this case, even if API project specifies >= v1, it will not use v2.
   
<br/>

Another one is [Direct dependency wins](https://learn.microsoft.com/en-us/nuget/concepts/dependency-resolution#direct-dependency-wins){.text-blue-600}. With this rule, Services project has v2 and it initiates the call, so it tried to use v2 of package A. But since the actual method call is implemented in API and API depends on v1, API can't access v2 of package A.

<br/>

So, our solution is removing dependency on package A in Services and upgrade the package A in API to v2. That way, Services which depends on API will transitively depends on package A. This will provide single place to update and reduce future package version conflict.

Services project depends on API project
API project depends on package A (v2)
Services transitively depends on package A in API project (v2)