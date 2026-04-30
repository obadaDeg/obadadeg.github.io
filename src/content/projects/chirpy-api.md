---
title: "Chirpy API"
description: "Microblogging REST API with JWT authentication, refresh token rotation, and ownership-enforced authorization."
tech: ["TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "JWT"]
github: "https://github.com/obadaDeg/chirpy-api"
featured: true
date: 2025-11-01
draft: false
---

A RESTful HTTP server with full user authentication: JWT access tokens (1-hour expiry), 60-day refresh tokens stored in PostgreSQL, and token revocation endpoints. Implements Argon2id password hashing, ownership-enforced authorization (users can only delete their own content), and webhook security using API key authentication.

Type-safe, migration-driven schema management via Drizzle ORM with structured error handling using custom error classes and a centralized async wrapper middleware.
