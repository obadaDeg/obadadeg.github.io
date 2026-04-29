---
title: "Setting Up a Secure Home Lab on a Budget"
date: 2025-11-20
tags: ["homelab", "linux", "security", "networking"]
excerpt: "A practical guide to building a home security lab using a repurposed laptop, Proxmox, and pfSense — without breaking the bank."
draft: true
---

## Why a Home Lab?

If you're serious about cybersecurity, a home lab is one of the best investments you can make. It gives you a sandboxed environment to experiment with attack techniques, practice system hardening, and test tools without touching production systems.

> "The best way to learn security is to break things — in a controlled environment."

Here's how I built mine for under $100.

## Hardware

I repurposed an old ThinkPad T480 with 16GB RAM and a 512GB SSD. That's plenty for running 3–4 VMs simultaneously.

If you don't have spare hardware, look at:
- eBay for used ThinkPad/Dell Latitude business laptops
- Raspberry Pi 4 (8GB) for lightweight services
- An old desktop or NUC

## Installing Proxmox

Proxmox VE is a free, open-source hypervisor that lets you run multiple VMs and containers on one machine.

```bash
# Download the Proxmox VE ISO from proxmox.com
# Flash to USB:
dd if=proxmox-ve_*.iso of=/dev/sdX bs=4M status=progress

# Boot from USB and follow the installer
# Proxmox web UI will be accessible at:
# https://<your-ip>:8006
```

## pfSense for Network Segmentation

pfSense acts as a firewall and router, letting you isolate your lab network from your home network.

```bash
# Key pfSense configuration steps:
# 1. Add a virtual network interface in Proxmox (vmbr1)
# 2. Install pfSense VM, assign WAN to vmbr0, LAN to vmbr1
# 3. Configure DHCP on LAN for 192.168.10.0/24
# 4. Add firewall rules to block lab → home traffic
```

## Basic Hardening

Once your VMs are running, apply these baseline hardening steps:

```bash
# Disable root SSH login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Allow only key-based auth
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Restart SSH
systemctl restart sshd

# Enable UFW firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw enable
```

## Conclusion

A home lab doesn't need to be expensive. With a repurposed machine, Proxmox, and pfSense, you can build a realistic environment for practicing CTF skills, malware analysis, and network security.

Start small, add VMs as you need them, and keep your lab network isolated from your home network from day one.
