---
title: "TryHackMe — C4ptur3 Th3 Fl4g"
ctf: "TryHackMe"
category: "Misc"
difficulty: "Easy"
date: 2026-06-06
tags: ["encoding", "steganography", "forensics", "cyberchef", "binwalk", "steghide", "spectrogram", "morse", "base64", "rot13"]
excerpt: "A beginner-friendly variety room covering ten encoding schemes, audio spectrograms, image steganography, and file carving — the perfect toolkit primer for CTF forensics."
draft: false
---

## Introduction

[C4ptur3 Th3 Fl4g](https://tryhackme.com/room/c4ptur3th3fl4g) is a beginner-friendly TryHackMe room that packs four distinct challenge categories into one: encoding and ciphers, audio spectrograms, image steganography, and file-in-file extraction. None of the individual tasks are difficult, but together they introduce the core toolkit every CTF player needs before attempting anything harder.

The primary tool for Task 1 is [CyberChef](https://gchq.github.io/CyberChef/) — a browser-based Swiss Army knife for encoding, decoding, and chaining transformations. Keep it open.

---

## Task 1 — Translation & Shifting

Ten encodings, increasing in complexity. The last one chains five layers.

---

### 1. Leet Speak

```
c4n y0u c4p7u23 7h3 f149?
```

Leet speak (l33tspeak) substitutes letters with visually similar numbers and symbols — `4` for `a`, `0` for `o`, `7` for `t`, `3` for `e`, `1` for `i`. Reading it aloud helps: `c4n` → `can`, `c4p7u23` → `capture`, `f149` → `flag`.

**Answer:** `can you capture the flag?`

---

### 2. Binary

```
01101100 01100101 01110100 01110011 00100000 01110100 01110010 01111001 ...
```

Each 8-bit group maps to one ASCII character. In CyberChef, use **From Binary** with a space delimiter.

**Answer:** `lets try some binary out!`

---

### 3. Base32

```
MJQXGZJTGIQGS4ZAON2XAZLSEBRW63LNN5XCA2LOEBBVIRRHOM======
```

Base32 uses a 32-character alphabet (A–Z and 2–7) with `=` padding. The all-uppercase characters and `======` tail are the giveaways. In CyberChef: **From Base32**.

**Answer:** `base32 is super common in CTF's`

---

### 4. Base64

```
RWFjaCBCYXNlNjQgZGlnaXQgcmVwcmVzZW50cyBleGFjdGx5IDYgYml0cyBvZiBkYXRhLg==
```

Base64 encodes binary data as printable ASCII using 64 characters (A–Z, a–z, 0–9, `+`, `/`). The `==` padding marks a standard Base64 string. In CyberChef: **From Base64**.

**Answer:** `Each Base64 digit represents exactly 6 bits of data.`

---

### 5. Hexadecimal

```
68 65 78 61 64 65 63 69 6d 61 6c 20 6f 72 20 62 61 73 65 31 36 3f
```

Space-separated hex pairs, each representing one byte. `68` = `h`, `65` = `e`, `78` = `x`, and so on. In CyberChef: **From Hex** (delimiter: Space).

**Answer:** `hexadecimal or base16?`

---

### 6. ROT13

```
Ebgngr zr 13 cynprf!
```

ROT13 shifts every letter 13 positions in the alphabet. Because there are 26 letters, applying it twice returns the original — encoding and decoding are the same operation. In CyberChef: **ROT13**, or just use [rot13.com](https://rot13.com).

**Answer:** `Rotate me 13 places!`

---

### 7. ROT47

```
*@F DA:? >6 C:89E C@F?5 323J C:89E C@F?5 Wcf E:>6DX
```

ROT47 extends the rotation concept to all 94 printable ASCII characters (codes 33–126), shifting each by 47. Unlike ROT13 it can encode symbols, digits, and punctuation — making it harder to spot visually. In CyberChef: **ROT47**.

**Answer:** `You spin me right round baby right round (47 times)`

---

### 8. Morse Code

```
- . .-.. . -.-. --- -- -- ..- -. .. -.-. .- - .. --- -.
. -. -.-. --- -.. .. -. --.
```

Dots and dashes encoding letters, with spaces separating letters and line breaks separating words. In CyberChef: **From Morse Code** (letter delimiter: Space, word delimiter: Line Feed).

**Answer:** `telecommunication encoding`

---

### 9. BCD / Decimal

```
85 110 112 97 99 107 32 116 104 105 115 32 66 67 68
```

Despite the "BCD" label, these are plain decimal ASCII values: `85` = `U`, `110` = `n`, `112` = `p`, `97` = `a`, and so on. In CyberChef: **From Decimal** (delimiter: Space).

**Answer:** `Unpack this BCD`

---

### 10. Multi-Layer (Base64 → Morse → Binary → ROT47 → Decimal)

```
LS0tLS0gLi0tLS0gLi0tLS0gLS0tLS0g...
```

This is a five-layer onion. Each layer strips one encoding to reveal the next:

1. **From Base64** → produces a long block of Morse code (`----- .----` style)
2. **From Morse Code** → produces a binary string
3. **From Binary** → produces ROT47-encoded text
4. **ROT47** → produces space-separated decimal values
5. **From Decimal** → final plaintext

In CyberChef, chain all five operations in sequence. The recipe runs top to bottom automatically.

**Answer:** `Let's make this a bit trickier...`

---

## Task 2 — Spectrograms

A spectrogram displays the frequency content of an audio signal over time. Hidden text or images can be encoded into specific frequency bands, invisible to the ear but visible when the signal is analysed visually.

**Tool:** [Sonic Visualiser](https://www.sonicvisualiser.org/) (free, cross-platform)

1. Open the downloaded WAV file in Sonic Visualiser.
2. Go to **Layer → Add Spectrogram**.
3. Adjust the colour scheme and frequency range until the hidden content becomes readable in the spectrogram view.

The flag appears embedded in the frequency bands as visible text.

**Answer:** `Super Secret Message`

---

## Task 3 — Steganography

Steganography hides data inside another file — commonly an image. The carrier looks completely normal; the payload is invisible without the right tool and, optionally, a passphrase.

**Tool:** `steghide`

```bash
steghide extract -sf stegosteg.jpg
```

`steghide` prompts for a passphrase. For this challenge, leave it blank and press Enter — no passphrase is required. It extracts the hidden payload to a file in the current directory.

**Answer:** `SpaghettiSteg`

---

## Task 4 — Security through Obscurity

Security through obscurity means hiding something by concealing it inside another file rather than securing it with real cryptography. This task demonstrates exactly why that's not security.

**Tool:** `binwalk`, `strings`

### Step 1 — Detect the embedded archive

```bash
binwalk meme.jpg
```

`binwalk` scans the file for known magic bytes and reports everything it finds embedded inside. The output will show the JPEG header at offset `0x0` and a RAR archive starting at a later offset.

### Step 2 — Extract the contents

```bash
binwalk -e meme.jpg
```

This extracts all detected files into a `_meme.jpg.extracted/` directory. Inside you'll find a PNG file.

**First answer (first filename & extension):** `hackerchat.png`

### Step 3 — Find the hidden text

```bash
strings hackerchat.png
```

`strings` scans a binary file for sequences of printable characters. The hidden message is embedded in the file's data and surfaces as a readable string in the output.

**Second answer:** `AHH_YOU_FOUND_ME!`

---

## Conclusion

This room is a fast tour of the forensics and encoding fundamentals that appear repeatedly across CTFs.

**Key takeaways:**

- **CyberChef is your first stop** for any encoding challenge. Chain operations sequentially — the output of one feeds directly into the next. Identifying the encoding is half the work; CyberChef handles the rest.
- **Spectrograms** reveal hidden data in audio that is completely imperceptible to the ear. Sonic Visualiser is the standard tool; the spectrogram layer is what you're after.
- **steghide** extracts hidden payloads from images. Always try an empty passphrase first.
- **binwalk** can see inside files. A JPEG, ZIP, or PDF can silently contain an entirely separate archive — binwalk finds it, `-e` extracts it, and `strings` finds readable content inside.
- **Security through obscurity is not security.** If the only protection is "hidden inside another file", `binwalk` defeats it in one command.
