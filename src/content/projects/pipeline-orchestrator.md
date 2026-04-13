---
title: "Pipeline Orchestrator"
description: "Webhook-driven task processing platform with async queuing, exponential backoff delivery, and full audit logging."
tech: ["TypeScript", "Node.js", "BullMQ", "Redis", "PostgreSQL", "Docker", "GitHub Actions"]
github: "https://github.com/obadaDeg/pipeline-orchestrator"
featured: true
date: 2026-01-15
---

A backend service that receives incoming webhooks, queues them asynchronously via BullMQ + Redis, and fans out processed payloads to subscriber endpoints with exponential backoff and delivery tracking.

Key security features include API key authentication with Argon2id hashing, HMAC-SHA256 webhook signature verification with replay-attack prevention, and multi-tenant team workspaces with enumeration-safe 404 responses. The full stack is containerized with Docker Compose and tested with Vitest + Playwright.
