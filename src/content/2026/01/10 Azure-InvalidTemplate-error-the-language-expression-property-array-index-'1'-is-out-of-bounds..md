---
date: 2026-01-10
---

::post-title{:date="date"}
# Azure InvalidTemplate Error: The language expression property array index '1' is out of bounds.
::

::notes
This is a repost from my old blog. First posted in 6/20/2024.
::

<br/>

I'm trying to spin up a Redis Cache in Azure and placed it in my Virtual Network. However, it threw an error and the error message was not helping but I eventually figured it out.

<br/>

Here's my Bicep template which threw an error:

::code-block
```
resource cacheSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-11-01' existing = {
  name: 'mySubnet'
}

resource redis 'Microsoft.Cache/redis@2023-08-01' = {
  name: 'myRedis'
  location: resourceGroup().location
  properties: {
    enableNonSslPort: true
    publicNetworkAccess: 'Disabled'
    sku: {
      capacity: 1
      family: 'P'
      name: 'Premium'
    }
  subnetId: cacheSubnet.id
}
```
::

<br/>

Apparently, I needed the parent field on the subnet reference, so I ended with the following template which successfully launched my Redis cache.

::code-block
```
resource vNet 'Microsoft.Network/virtualNetworks@2023-11-01' existing = {
  name: 'myVNet'
}

resource cacheSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-11-01' existing = {
  name: 'mySubnet'
  parent: vNet
}

resource redis 'Microsoft.Cache/redis@2023-08-01' = {
  name: 'myRedis'
  location: resourceGroup().location
  properties: {
    enableNonSslPort: true
    publicNetworkAccess: 'Disabled'
    sku: {
      capacity: 1
      family: 'P'
      name: 'Premium'
    }
  subnetId: cacheSubnet.id
}
```
::
