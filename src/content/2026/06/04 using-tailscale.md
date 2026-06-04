---
date: 2026-06-04
---

::post-title{:date="date"}
# Using Tailscale
::

<br/>

I have been wondering if there's a way to connect to my machines in my home network securely from outside of my home network. Until now, I just rely on Remote Desktop and Team Viewer to make that connection.

<br/>

Today, I happened to read about Tailscale and Wireguard. I used AI to get a better understanding how it works. Tailscale basically make it easy to use Wireguard and it connects two or more devices so that they can send network traffic to each other from anywhere in the world. It handles network discovery, encryption and routing. Devices connect to Tailscale will behave as they are in the same network.

<br/>

Regarding the internet traffic, the fact that it uses split-tunnel, that means the internet can be routed without going through Tailscale (internet traffic can be routed through Tailscale using exit node if needed). This will improve performance.

<br/>

On top of that, I have Beryl AX router which is supported by Tailscale. That will make it easy if I need multiple devices connected.

<br/>

However, because it is not an actual network, I won't be able to connect to devices in my home network that's not registered to Tailscale. So, that means the device itself needs Tailscale app installed.

<br/>

So far, it works great for my use case. With Tailscale, you can create VLAN between registered devices.