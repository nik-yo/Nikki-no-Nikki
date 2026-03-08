---
date: 2026-01-23
---

::post-title{:date="date"}
# Connecting Pod in Minikube to Kafka or any Services Running in Docker Desktop
::

::notes
This is a repost from my old blog. First posted in 9/3/2024.
::

<br/>

I'm working on a demo where I need to subscribe my application to Kafka locally in Docker Desktop. I have 3 use cases:

1. Connecting from a different container in Docker desktop, so in the same network as the Kafka container.
2. Connecting from the application running on the host, so outside of Docker desktop for debugging purposes.
3. Connecting from a pod inside Minikube running in Docker Desktop.

<br/>

**Same Docker Network**

On the first case, I actually need to connect AKHQ container to Kafka, my Kafka container env variable for advertised listeners looks like the following:

::code-block
```
environment:
    KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092, ... (removed for brevity)
```
::

<br/>

Since AKHQ running in Docker desktop as well, it can use kafka:29092.

<br/>

**From the Host (my computer) Outside of Docker Network**

Next is my application that runs outside of Docker desktop, since it won't resolve the kafka host, it has to use the 2nd entry of the advertised listener. In my case, I had to change the port from 9092 to prevent conflict with other Kafka instance, but for it to work, I had to change the port mapping, so the Kafka container configuration looks like the following:

::code-block
```
ports:
   - 19092:19092
environment:
    KAFKA_BROKER_ID: 1
    KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:19092, ...
```
::

<br/>

To prevent conflict, the port mapping on the host and container has to be modified, so my application connects using localhost:19092

<br/>

**From Pod Inside Minikube**

This one is confusing me, but I found out that kube-dns is installed by default and Minikube provides a convenient hostname. For more details: [https://minikube.sigs.k8s.io/docs/handbook/host-access/]{.text-blue-600}

::code-block
```
host.minikube.internal
```
::

<br/>

So updating my configuration a little, I can connect from the pod using host.minikube.internal:19094

::code-block
```
ports:
    - 19092:19092
    - 19094:19094
environment:
    KAFKA_BROKER_ID: 1
    KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    KAFKA_ADVERTISED_LISTENERS: ...,PLAINTEXT_POD://host.minikube.internal:19094
    KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: ...,PLAINTEXT_POD:PLAINTEXT
```
::