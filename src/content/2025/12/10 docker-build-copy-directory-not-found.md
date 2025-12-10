---
date: 2025-12-10
---

::post-title{:date="date"}
# Docker Build Copy Directory Not Found
::

<br/>

So, I tried to provide parameter to Dockerfile since my CI/CD pipeline runs in Azure DevOps and the artifact staging directory is provided as variable and I don't want to hard code the value inside Dockerfile.

<br/>

Enter Build variables [https://docs.docker.com/build/building/variables/]{.text-blue-600}. It seems simple. All I need in my dockerfile is:

::code-block
```
FROM ...
ARG SRC="./app"
COPY ${SRC} .
```
::

<br/>

Then I can pass the value:

::code-block
```
docker build --build-arg SRC=$(Build.ArtifactStagingDirectory) .
```
::

<br/>

Well, it throws an error:

::code-block
```
ERROR: failed to build: failed to solve: failed to compute cache key: failed to calculate checksum of ref 4ce6fa60-2f23-4ac2-b56a-0440c85af90a::qzmaj2vppe2uy3akiebhn7od1: "/home/vsts/work/1/a": not found
```
::

<br/>

The path is correct, but somehow Docker can't find the directory. Apparently, it has something to do with build context [https://docs.docker.com/build/concepts/context/]{.text-blue-600} because the following works:

::code-block
```
cd $(Build.ArtifactStagingDirectory)
docker build --build-arg SRC=. .
```
::

<br/>

Which means only the directory on which the Dockerfile is being executed from and its subdirectories are accessible inside Dockerfile.


