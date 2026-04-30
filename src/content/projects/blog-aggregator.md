---
title: "BlogAggregator"
description: "Multi-user CLI RSS feed aggregator with a configurable polling loop, auth-gated commands, and PostgreSQL persistence."
tech: ["TypeScript", "PostgreSQL", "Drizzle ORM"]
github: "https://github.com/obadaDeg/blog-aggregator"
featured: true
date: 2025-09-15
draft: false
---

A command-line RSS aggregator backed by PostgreSQL and Drizzle ORM. Features a configurable polling loop with graceful SIGINT shutdown, a command registry pattern with auth-gated middleware, many-to-many feed follow relationships, and duplicate-URL deduplication using ON CONFLICT DO NOTHING.
