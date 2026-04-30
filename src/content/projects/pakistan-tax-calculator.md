---
title: "Pakistan Tax Calculator"
description: "Full-stack web app for calculating Pakistani income tax — containerized Node.js/Express backend with a React frontend and PostgreSQL tax data storage."
tech: ["TypeScript", "Node.js", "Express", "React", "PostgreSQL", "Docker", "Docker Compose"]
github: "https://github.com/obadaDeg/pakistan-tax-calculator"
featured: false
date: 2025-06-01
draft: false
---

A containerized full-stack application for computing Pakistani income tax based on multiple parameters. The Node.js/Express backend implements the business logic for tax calculation rules and persists tax data in PostgreSQL. The React frontend provides the user-facing interface. Both services are orchestrated with Docker Compose for streamlined local development.

Key design decisions: modular architecture with clear separation between calculation logic and data access, PostgreSQL schema designed around tax brackets and user inputs, and Docker Compose for reproducible environment setup.
