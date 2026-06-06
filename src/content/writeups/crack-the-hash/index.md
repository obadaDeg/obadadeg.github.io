---
title: "TryHackMe — Crack the Hash"
ctf: "TryHackMe"
category: "Crypto"
difficulty: "Medium"
date: 2026-06-06
tags: ["hash-cracking", "hashcat", "md5", "sha1", "sha256", "bcrypt", "ntlm", "rockyou"]
excerpt: "A two-level hash cracking challenge covering MD5, SHA-1, SHA-256, bcrypt, NTLM, and salted variants — using online tools for the simple ones and Hashcat with rockyou.txt for the rest."
draft: false
---

## Introduction

Hash cracking is the process of recovering a plaintext value from its hashed representation. It's a core skill in CTFs and real-world assessments — password dumps, leaked databases, and forgotten credentials all share one thing: they're almost always hashed, and that hash is only as strong as the algorithm and the password behind it.

This room — [Crack the Hash](https://tryhackme.com/room/crackthehash) — has two levels. Level 1 tests whether you can identify hash types and crack common passwords using online tools. Level 2 introduces salted hashes and weaker algorithms that require local cracking with Hashcat and a wordlist.

---

## Identifying Hash Types

Before cracking anything, you need to know what you're dealing with. Hash algorithms produce fixed-length outputs, and that length — combined with any prefix format — tells you most of what you need.

| Algorithm | Output Length | Hashcat Mode | Notes |
|---|---|---|---|
| MD5 | 32 hex chars | `-m 0` | Most common, least secure |
| MD4 | 32 hex chars | `-m 900` | Often misidentified as MD5 |
| NTLM | 32 hex chars | `-m 1000` | Windows password hashes |
| SHA-1 | 40 hex chars | `-m 100` | Deprecated but still common |
| SHA-1 + salt | 40 hex chars | `-m 110` | sha1($pass.$salt) |
| SHA-256 | 64 hex chars | `-m 1400` | Current standard |
| SHA-512crypt | Starts with `$6$` | `-m 1800` | Linux `/etc/shadow` format |
| bcrypt | Starts with `$2y$` or `$2b$` | `-m 3200` | Adaptive, intentionally slow |

When format alone isn't enough, `hash-identifier` (Linux) or [Hashcat's example hashes page](https://hashcat.net/wiki/doku.php?id=example_hashes) are the fastest references.

```bash
# Install and run hash-identifier
sudo apt install hash-identifier
hash-identifier
```

Paste the hash in and it will rank the most likely algorithm. For anything with a `$` prefix, the format is self-describing. NTLM is the most common trap — it produces 32 hex chars like MD5 and MD4, but requires its own Hashcat mode and won't crack under `-m 0`.

> **GPU vs CPU**: Hashcat runs dramatically faster on a GPU (`-D 2`). If you're on a VM (TryHackMe AttackBox, Kali in VirtualBox), you won't have GPU access — Hashcat will fall back to CPU. For most Level 1 hashes this won't matter, but bcrypt and SHA-512crypt are orders of magnitude slower without GPU acceleration.

---

## Level 1

Level 1 hashes are all unsalted and map to common passwords. An online lookup service like [CrackStation](https://crackstation.net) or [hashes.com](https://hashes.com/en/decrypt/hash) will resolve most of them instantly — they compare your hash against pre-computed rainbow tables of billions of known passwords.

---

### Hash 1 — MD5

```
48bb6e862e54f2a795ffc4e541caed4d
```

32 hex characters → **MD5**.

CrackStation finds this immediately. The plaintext is `easy` — as advertised.

MD5 was designed in 1992 and is completely broken for security purposes. It's still everywhere in legacy systems, which is why cracking it is trivially fast.

---

### Hash 2 — SHA-1

```
CBFDAC6008F9CAB4083784CBD1874F76618D2A97
```

40 hex characters → **SHA-1**.

Also found instantly via CrackStation. Plaintext: `password123`.

SHA-1 has been cryptographically broken since 2017 (full collision demonstrated). Like MD5, it's fast to compute which makes brute-force and rainbow table attacks practical.

---

### Hash 3 — SHA-256

```
1C8BFE8F801D79745C4631D09FFF36C82AA37FC4CCE4FC946683D7B336B63032
```

64 hex characters → **SHA-256**.

Plaintext: `letmein`. Still crackable via CrackStation because `letmein` is one of the most common passwords in existence — it's in every major wordlist and therefore every rainbow table.

SHA-256 is secure as an algorithm. The weakness here is the password, not the hash.

---

### Hash 4 — bcrypt

```
$2y$12$Dwt1BZj6pcyc3Dy1FWZ5ieeUznr71EeNkJkUlypTsgbX1H68wsRom
```

The `$2y$` prefix identifies this as **bcrypt**. The `12` is the cost factor — each increment doubles the computation time. At cost 12, a single hash takes roughly 250ms to compute, which means an attacker testing one million passwords needs weeks on consumer hardware.

CrackStation will not help here — bcrypt was specifically designed to defeat rainbow tables (it includes a per-hash salt) and to be slow (so bulk cracking is impractical).

For a short password against a known wordlist, Hashcat can still find it:

```bash
hashcat -m 3200 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `bleh`. bcrypt's protection comes from slowing down the attacker, not from hiding the password — short or common passwords are still vulnerable, just slower to find.

---

### Hash 5 — MD4

```
279412f945939ba78ce0758d3fd83daa
```

32 hex characters — looks like MD5, but CrackStation doesn't find it under MD5. Running it through `hash-identifier` flags it as **MD4**, the predecessor to MD5 (even weaker, almost never used in modern systems).

Try hashes.com with MD4 selected, or crack it locally:

```bash
hashcat -m 900 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `Eternity22`.

The lesson: two hashes can be the same length but different algorithms. If an online tool returns nothing, try a different algorithm — don't assume the tool tried all of them.

---

## Level 2

Level 2 raises the bar. All answers come from rockyou.txt, but online rainbow tables won't help — these hashes are either from algorithms with no public lookup tables (NTLM, SHA-512crypt) or are salted. You'll need Hashcat running locally.

Save each hash to a file before running the commands below.

---

### Hash 1 — SHA-256

```
F09EDCB1FCEFC6DFB23DC3505A882655FF77375ED8AA2D1C13F640FCCC2D0C85
```

64 hex chars → **SHA-256**. Hashcat mode `-m 1400`.

```bash
echo "F09EDCB1FCEFC6DFB23DC3505A882655FF77375ED8AA2D1C13F640FCCC2D0C85" > hash.txt
hashcat -m 1400 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `paule`. A name, short, directly in rockyou — cracks in seconds.

---

### Hash 2 — NTLM

```
1DFECA0C002AE40B8619ECF94819CC1B
```

32 hex chars that CrackStation doesn't recognise → **NTLM** (Windows NT LAN Manager hash). NTLM uses MD4 internally but with a different encoding that rainbow tables for plain MD5/MD4 won't match.

Hashcat mode `-m 1000`.

```bash
echo "1DFECA0C002AE40B8619ECF94819CC1B" > hash.txt
hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `n63umy8lkf4i`. A seemingly random string — but it's in rockyou.txt, which is why the challenge tells you to use it.

NTLM hashes are what you extract from Windows systems using tools like Mimikatz or from SAM database dumps. Cracking them is a staple of post-exploitation.

---

### Hash 3 — SHA-512crypt (Salted)

```
$6$aReallyHardSalt$6WKUTqzq.UQQmrm0p/T7MPpMbGNnzXPMAXi4bJMl9be.cfi3/qxIf.hsGpS41BqMhSrHVXgMpdjS6xeKZAs02.
```

The `$6$` prefix is **SHA-512crypt** — the format used in Linux `/etc/shadow` files. The salt (`aReallyHardSalt`) is embedded in the hash string itself, between the second and third `$`.

Hashcat mode `-m 1800`. The full hash string (including the salt) goes directly into the hash file — Hashcat parses the salt out automatically.

```bash
echo '$6$aReallyHardSalt$6WKUTqzq.UQQmrm0p/T7MPpMbGNnzXPMAXi4bJMl9be.cfi3/qxIf.hsGpS41BqMhSrHVXgMpdjS6xeKZAs02.' > hash.txt
hashcat -m 1800 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `waka99`.

> Use single quotes around the hash string to prevent the shell from interpreting the `$` signs as variable expansions.

---

### Hash 4 — HMAC-SHA1 (Salted)

```
e5d8870e5bdd26602cab8dbe07a942c8669e56d6
Salt: tryhackme
```

40 hex chars → SHA-1 family. The provided salt means this is a salted SHA-1 variant. Hashcat's mode `-m 110` handles `sha1($pass.$salt)`. The hash file uses a colon separator: `hash:salt`.

```bash
echo "e5d8870e5bdd26602cab8dbe07a942c8669e56d6:tryhackme" > hash.txt
hashcat -m 110 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
```

Plaintext: `481616481616`.

If mode `110` returns nothing, try mode `120` (`sha1($salt.$pass)`) — the order of concatenation changes the output hash entirely, and the challenge may use either.

---

## Conclusion

Hash cracking follows a simple decision tree: identify the algorithm, check whether it's salted, then choose your tool accordingly.

**Online tools** (CrackStation, hashes.com) are fast for unsalted MD5, SHA-1, and SHA-256 against common passwords — use them first. They fail against salted hashes (the salt breaks rainbow table lookups) and against bcrypt (designed to be too slow for bulk lookup).

**Hashcat** handles everything else. The critical skill is picking the right mode — the [Hashcat example hashes page](https://hashcat.net/wiki/doku.php?id=example_hashes) is the fastest reference for matching a format to a mode number.

**Key takeaways:**

- Hash length alone doesn't identify the algorithm — MD5, MD4, and NTLM all produce 32 hex characters.
- Salts don't make weak passwords strong; they make rainbow tables useless. Hashcat with rockyou.txt will still find short or common passwords.
- bcrypt and SHA-512crypt are the hashes that actually slow attackers down — not because they're uncrackable, but because each guess takes real time.
- When a hash doesn't crack, suspect the wrong mode before suspecting the wrong wordlist.
