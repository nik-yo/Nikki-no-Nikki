---
date: 2026-07-26
---

::post-title{:date="date"}
# Plex Remote Access
::

<br/>

Today, I'm trying to improve security of my Plex server remote access. As far as I'm aware, there are various alternatives to allow remote access to privately hosted Plex server:

- Cloudflare Tunnel
- Plex relay
- Port forwarding
- Tailscale

<br/>

Cloudflare tunnel doesn't allow media streaming based on TOS, so no video streaming. It doesn't require inbound connection, so it is pretty secure. However, it requires a domain. Setup is easy and require a daemon to be installed and run on the server.

<br/>

Plex relay relies on Plex hosted server and it has strict speed limitation, so not suitable to high definition video streaming. This method also doesn't require inbound connection.

<br/>

Port forwarding provides true remote access at full speed, but prone to port scanning and inbound attack, especially on well-known port such as plex default port.

<br/>

Tailscale will also provide full speed access and probably the most secure, but the client needs to be added to the network by installing Tailscale on the client.

<br/>

After trying various methods, I ended up with my initial setup. So, depending on your use case, one of the above might work.


