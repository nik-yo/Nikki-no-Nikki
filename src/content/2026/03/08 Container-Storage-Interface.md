---
date: 2026-03-08
---

::post-title{:date="date"}
# Container Storage Interface (CSI)
::

<br/>

I was investigating how to get a secret from Hashicorp Vault down to a Kubernetes pod and encountered an interesting concept called Container Storage Interface (CSI).

<br/>

Basically, using CSI driver, providing the secret name and key, a SecretProviderClass object can pull each secret value as a file in the filesystem in the pod.

<br/>

Then, use entrypoint script of the pod to pull each file and set environment variable using the file name as key and content as value.

<br/>

The application can then pull the secret from the environment variables without additional package/library.

<br/>

For more information: [https://developer.hashicorp.com/vault/docs/deploy/kubernetes/csi]{.text-blue-600}