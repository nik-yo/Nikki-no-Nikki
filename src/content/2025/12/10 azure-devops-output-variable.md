---
date: 2025-12-10
---

::post-title{:date="date"}
# Azure DevOps Output Variable
::

<br/>

It is supposed to be a simple task. I need the image uri that was pushed by ECRPushImage task in Azure DevOps on the next task. ECRPushImage task has outputVariable variable, so let say I set that to ImageUri on my azure-pipelines.yml

::code-block
```
- task: ECRPushImage@1
  inputs:
    ...
    outputVariable: 'ImageUri'
```
::

<br/>

According to this article [https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#use-output-variables-from-tasks]{.text-blue-600}, I also need to set name on the task:

::code-block
```
- task: ECRPushImage@1
  name: ECR
  inputs:
    ...
    outputVariable: 'ImageUri'
```
::

<br/>

So, I can use the variable like following:

::code-block
```
- script: echo $(ECR.ImageUri) 
```
::

<br/>

But it doesn't work, the variable was not replaced. I also tried other runtime syntax in [https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#understand-variable-syntax]{.text-blue-600}.

<br/>

So, I went to the GitHub [https://github.com/aws/aws-toolkit-azure-devops/blob/master/src/tasks/ECRPushImage/TaskOperations.ts#L81]{.text-blue-600} and it does a simple `task.setVariable()`.

<br/>

According to the setVariable documentation [https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-variables-scripts?view=azure-devops&tabs=bash#about-tasksetvariable]{.text-blue-600}, we can access the variable without the name, so it becomes:

::code-block
```
- task: ECRPushImage@1
  inputs:
    ...
    outputVariable: 'ImageUri'
- script: echo $(ImageUri)
```
::

<br/>

And it works! That's after 10 iterations of trials and errors.