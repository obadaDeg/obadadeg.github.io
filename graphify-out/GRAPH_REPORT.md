# Graph Report - .  (2026-06-06)

## Corpus Check
- 212 files · ~202,869 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 861 nodes · 990 edges · 71 communities (47 shown, 24 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Skills & Technologies Data|Skills & Technologies Data]]
- [[_COMMUNITY_Spec Kit Workflows & Concepts|Spec Kit Workflows & Concepts]]
- [[_COMMUNITY_Portfolio Design & Requirements|Portfolio Design & Requirements]]
- [[_COMMUNITY_Portfolio Badges & Metadata|Portfolio Badges & Metadata]]
- [[_COMMUNITY_Security Certifications & Blog|Security Certifications & Blog]]
- [[_COMMUNITY_Agent Context Management|Agent Context Management]]
- [[_COMMUNITY_Graphify Knowledge Pipeline|Graphify Knowledge Pipeline]]
- [[_COMMUNITY_CTF & Security Learning|CTF & Security Learning]]
- [[_COMMUNITY_Social & External Links|Social & External Links]]
- [[_COMMUNITY_Media in Writeups Feature|Media in Writeups Feature]]
- [[_COMMUNITY_Agent Context Update Scripts|Agent Context Update Scripts]]
- [[_COMMUNITY_Portfolio Navigation Links|Portfolio Navigation Links]]
- [[_COMMUNITY_Astro Package Dependencies|Astro Package Dependencies]]
- [[_COMMUNITY_Blog Post Rendering|Blog Post Rendering]]
- [[_COMMUNITY_Content Routing Concepts|Content Routing Concepts]]
- [[_COMMUNITY_Redesign Animation System|Redesign Animation System]]
- [[_COMMUNITY_Claude Integration Manifest|Claude Integration Manifest]]
- [[_COMMUNITY_Spec Kit Manifest Files|Spec Kit Manifest Files]]
- [[_COMMUNITY_Bash Common Utilities|Bash Common Utilities]]
- [[_COMMUNITY_Blog Category Filtering|Blog Category Filtering]]
- [[_COMMUNITY_LeetCode DSA Blog Posts|LeetCode DSA Blog Posts]]
- [[_COMMUNITY_PS Feature Branch Creation|PS Feature Branch Creation]]
- [[_COMMUNITY_Series Navigator Data Model|Series Navigator Data Model]]
- [[_COMMUNITY_Git Extension Feature Scripts|Git Extension Feature Scripts]]
- [[_COMMUNITY_Core Page Layouts|Core Page Layouts]]
- [[_COMMUNITY_Certificate Display Components|Certificate Display Components]]
- [[_COMMUNITY_Site Navigation & Transitions|Site Navigation & Transitions]]
- [[_COMMUNITY_Content Collections Config|Content Collections Config]]
- [[_COMMUNITY_Spec Kit Feature Scripts|Spec Kit Feature Scripts]]
- [[_COMMUNITY_Spec Kit Init Options|Spec Kit Init Options]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Agent & Claude Settings|Agent & Claude Settings]]
- [[_COMMUNITY_Certificates Index Page|Certificates Index Page]]
- [[_COMMUNITY_Spec Kit Templates|Spec Kit Templates]]
- [[_COMMUNITY_Build-Time Asset Pipeline|Build-Time Asset Pipeline]]
- [[_COMMUNITY_Algorithm Blog Posts|Algorithm Blog Posts]]
- [[_COMMUNITY_Spec Kit Integration Config|Spec Kit Integration Config]]
- [[_COMMUNITY_Certificates Schema Spec|Certificates Schema Spec]]
- [[_COMMUNITY_Git Extension Common Utils|Git Extension Common Utils]]
- [[_COMMUNITY_Certificate Detail Page|Certificate Detail Page]]
- [[_COMMUNITY_Content Draft Flag|Content Draft Flag]]
- [[_COMMUNITY_Git Auto-Commit Script|Git Auto-Commit Script]]
- [[_COMMUNITY_Git Init Script|Git Init Script]]
- [[_COMMUNITY_Git GitHub Certificate|Git GitHub Certificate]]
- [[_COMMUNITY_Video Embed Feature|Video Embed Feature]]
- [[_COMMUNITY_Prerequisites Check Script|Prerequisites Check Script]]
- [[_COMMUNITY_Plan Setup Script|Plan Setup Script]]
- [[_COMMUNITY_Claude Context Update Script|Claude Context Update Script]]
- [[_COMMUNITY_AI Fundamentals Certificate|AI Fundamentals Certificate]]
- [[_COMMUNITY_Git GitHub Cert Docs|Git GitHub Cert Docs]]
- [[_COMMUNITY_Titan Shield Cert Docs|Titan Shield Cert Docs]]
- [[_COMMUNITY_Cybersecurity Resume|Cybersecurity Resume]]
- [[_COMMUNITY_Portfolio README|Portfolio README]]
- [[_COMMUNITY_Spec Kit Feature Config|Spec Kit Feature Config]]
- [[_COMMUNITY_Dark Color Palette|Dark Color Palette]]
- [[_COMMUNITY_Media Requirements Checklist|Media Requirements Checklist]]
- [[_COMMUNITY_Series Requirements Checklist|Series Requirements Checklist]]
- [[_COMMUNITY_Certificates Requirements|Certificates Requirements]]
- [[_COMMUNITY_Home Lab Blog Post|Home Lab Blog Post]]
- [[_COMMUNITY_Contact Page|Contact Page]]
- [[_COMMUNITY_Tax Calculator Project|Tax Calculator Project]]
- [[_COMMUNITY_Site Favicon|Site Favicon]]
- [[_COMMUNITY_Google Site Verification|Google Site Verification]]
- [[_COMMUNITY_Root Data File|Root Data File]]

## God Nodes (most connected - your core abstractions)
1. `skills` - 150 edges
2. `social` - 24 edges
3. `graphify Skill (Knowledge Graph Builder)` - 15 edges
4. `files` - 12 edges
5. `files` - 12 edges
6. `prefix` - 12 edges
7. `Portfolio Site Feature Specification` - 12 edges
8. `Spec-Driven Development Workflow (Spec Kit)` - 11 edges
9. `log_info()` - 10 edges
10. `main()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Practical Web Hacking Certificate` --semantically_similar_to--> `Practical API Hacking Series`  [INFERRED] [semantically similar]
  docs/certificates/certificate-of-completion-for-practical-web-hacking.pdf → src/content/series/practical-api-hacking.md
- `AI Hacking 101 Certificate` --semantically_similar_to--> `API Security / API Hacking`  [INFERRED] [semantically similar]
  docs/certificates/certificate-of-completion-for-ai-hacking-101.pdf → src/content/series/practical-api-hacking.md
- `Speckit Checklist Skill` --implements--> `Spec-Driven Development Workflow (Spec Kit)`  [EXTRACTED]
  .agent/workflows/speckit-checklist/SKILL.md → .specify/scripts/bash/check-prerequisites.sh
- `Speckit Clarify Skill` --implements--> `Spec-Driven Development Workflow (Spec Kit)`  [EXTRACTED]
  .agent/workflows/speckit-clarify/SKILL.md → .specify/scripts/bash/check-prerequisites.sh
- `Speckit Constitution Skill` --implements--> `Spec-Driven Development Workflow (Spec Kit)`  [EXTRACTED]
  .agent/workflows/speckit-constitution/SKILL.md → .specify/scripts/bash/check-prerequisites.sh

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Spec-Kit Core Bash Script Pipeline (common.sh -> check-prerequisites, create-new-feature, setup-plan, update-agent-context)** — scripts_common_sh, scripts_check_prerequisites_sh, scripts_create_new_feature_sh, scripts_setup_plan_sh, scripts_update_agent_context_sh [EXTRACTED 0.95]
- **Git Extension Cross-Platform Parity (bash + PowerShell implementations of auto-commit, create-feature, git-common, initialize-repo)** — git_ext_auto_commit_sh, git_ext_auto_commit_ps1, git_ext_create_feature_sh, git_ext_create_feature_ps1, git_ext_git_common_sh, git_ext_git_common_ps1, git_ext_initialize_repo_sh, git_ext_initialize_repo_ps1 [INFERRED 0.95]
- **Claude Integration Dispatch Chain (integration.json -> update-context.sh/ps1 -> update-agent-context.sh)** — specify_integration_json, claude_update_context_sh, claude_update_context_ps1, scripts_update_agent_context_sh [EXTRACTED 1.00]
- **TCM Security Web Hacking Certifications held by Obada Daghlas** — concept_tcm_security, practical_web_hacking_certificate_pdf, ai_hacking_101_certificate_pdf [EXTRACTED 1.00]
- **Web Security Certification Cluster (Practical Web Hacking + TSCWA + AI Hacking)** — practical_web_hacking_certificate_pdf, titan_shield_web_assessor_certificate_pdf, ai_hacking_101_certificate_pdf [INFERRED 0.85]
- **Blog and Writeups Templates sharing Client-Server diagram** — blog_template_diagram_png, writeups_template_diagram_png, concept_client_server_communication [EXTRACTED 1.00]
- **Card Components Share TagPill for Taxonomy Display** — components_blogcard, components_projectcard, components_writeupcard, components_tagpill [EXTRACTED 1.00]
- **Post Layout + CertificateBadge + Content Config form Certificate Reference Flow** — layouts_post, components_certificatebadge, content_config [INFERRED 0.85]
- **Blog Detail Page Uses SeriesNavigator and Content Collections for Series-Aware Rendering** — pages_blog_slug, components_seriesnavigator, content_config [EXTRACTED 1.00]
- **Detail Pages Sharing Series Navigation Pattern** — pages_writeups_slug_page, pages_projects_slug_page, concept_series_context [EXTRACTED 0.95]
- **All Listing Pages Using getCollection + getStaticPaths** — pages_certificates_slug_page, pages_projects_slug_page, pages_writeups_slug_page, concept_static_paths_pattern [EXTRACTED 0.95]
- **Speckit Git Workflow Commands** — speckit_git_commit_skill, speckit_git_feature_skill, speckit_git_initialize_skill, speckit_git_remote_skill [INFERRED 0.90]
- **Spec Kit Feature Workflow Pipeline** — speckit_specify_skill_speckit_specify, speckit_plan_skill_speckit_plan, speckit_tasks_skill_speckit_tasks, speckit_implement_skill_speckit_implement [INFERRED 0.95]
- **graphify Extraction Pipeline (AST + Semantic + Merge)** — graphify_skill_ast_extraction, graphify_skill_semantic_extraction, references_extraction_spec_extraction_subagent_prompt [EXTRACTED 1.00]
- **Spec Kit Git Integration (Branch + Validate + Commit)** — speckit_git_feature_skill_speckit_git_feature, speckit_git_validate_skill_speckit_git_validate, speckit_git_commit_skill_speckit_git_commit [INFERRED 0.85]
- **Git Extension Commands Provided by Extension Manifest** — specify_extensions_git_extension_yml_extension_manifest, specify_extensions_git_commands_feature_cmd, specify_extensions_git_commands_validate_cmd, specify_extensions_git_commands_remote_cmd, specify_extensions_git_commands_initialize_cmd, specify_extensions_git_commands_commit_cmd [EXTRACTED 1.00]
- **Spec Kit Core Feature Development Workflow (specify → plan → tasks → implement)** — speckit_specify_skill_speckit_specify, speckit_plan_skill_speckit_plan, speckit_tasks_skill_speckit_tasks, speckit_implement_skill_speckit_implement [EXTRACTED 1.00]
- **Extension Hook System Integrating Git Commands into Spec Kit Lifecycle** — concept_speckit_hook_system, specify_extensions_yml_extensions_config, specify_extensions_git_extension_yml_extension_manifest [EXTRACTED 1.00]
- **Speckit Template System (spec, plan, tasks, checklist, constitution)** — specify_templates_spec_template_spec_template, specify_templates_plan_template_plan_template, specify_templates_tasks_template_tasks_template, specify_templates_checklist_template_checklist_template, specify_templates_constitution_template_constitution_template [INFERRED 0.90]
- **Portfolio Site Spec & Planning Artifacts** — specs_001_portfolio_site_spec_portfolio_spec, specs_001_portfolio_site_plan_portfolio_plan, specs_001_portfolio_site_tasks_portfolio_tasks, specs_001_portfolio_site_data_model_data_model, specs_001_portfolio_site_research_research [EXTRACTED 0.95]
- **Content Schema, Data Model and Contract Documents** — specs_001_portfolio_site_contracts_content_schema_content_schema, specs_001_portfolio_site_data_model_data_model, specs_001_portfolio_site_contracts_routes_route_contracts [EXTRACTED 0.95]
- **Animation System: CSS Keyframes + IntersectionObserver + prefers-reduced-motion** — 002_plan_animation_system, 002_plan_intersection_observer, 002_plan_prefers_reduced_motion, 002_plan_view_transitions [EXTRACTED 1.00]
- **Series Build-Time Pipeline: Collection Schema + Context Lookup + Navigator Component** — 004_datamodel_series_collection, 004_datamodel_series_context, 004_plan_series_navigator_component [EXTRACTED 0.95]
- **Certificates Cross-Linking: Schema + reference() API + Bi-Directional Field** — 005_datamodel_certificates_schema, 005_research_astro_reference, 005_datamodel_related_certificates_field, 005_plan_bidirectional_crosslinking [EXTRACTED 0.95]
- **LeetCode Quest DSA Blog Series Posts** — blog_lc_quest_dsa_array_i_post, blog_lc_quest_dsa_array_ii_post, blog_lc_quest_dsa_heap_post, blog_lc_quest_dsa_stack_post, blog_lc_quest_dsa_series [EXTRACTED 1.00]
- **TCM Security Certificates Collection** — certificates_ai_100_fundamentals_index_certificate, certificates_ai_hacking_101_index_certificate, certificates_practical_web_hacking_index_certificate, concept_tcm_security_issuer [EXTRACTED 1.00]
- **Certificates Integration Feature Implementation Flow** — specs_005_certificates_integration_tasks_phase2_foundational, specs_005_certificates_integration_tasks_phase3_us1, specs_005_certificates_integration_tasks_phase4_us2, specs_005_certificates_integration_tasks_phase5_us3 [EXTRACTED 1.00]
- **TryHackMe CTF Writeups Cluster** — writeups_c4ptur3_th3_fl4g_writeup, writeups_crack_the_hash_writeup, concept_tryhackme_platform [EXTRACTED 1.00]
- **Series Content Collections** — series_template_series_template, series_leetcode_quest_dsa_series, series_learn_problem_solving_series, series_backend_journey_bootdev_series, series_practical_api_hacking_series, series_system_design_learning_journey_series [INFERRED 0.95]
- **Docs and Public Certificates Mirror** — docs_cert_titan_shield_web_assessor, public_cert_titan_shield_web_assessor, docs_cert_practical_web_hacking, public_cert_practical_web_hacking, docs_cert_ai_hacking_101, public_cert_ai_hacking_101 [INFERRED 0.95]

## Communities (71 total, 24 thin omitted)

### Community 0 - "Skills & Technologies Data"
Cohesion: 0.01
Nodes (149): skills, 11ty, amplify, android, angular, angularjs, apachecordova, appwrite (+141 more)

### Community 1 - "Spec Kit Workflows & Concepts"
Cohesion: 0.05
Nodes (59): Feature Branch Naming Workflow, GitHub Pages Deployment Pipeline, Portfolio Constitution Core Principles, Spec Kit Extension Hook System, Spec Kit Specification Workflow, Spec Kit Git Commit Command, Spec Kit Git Feature Command, Spec Kit Git Initialize Command (+51 more)

### Community 2 - "Portfolio Design & Requirements"
Cohesion: 0.06
Nodes (51): Color Palette, Design System, GitHub Actions Workflow, GitHub Pages Deployment, Portfolio Website Specification, Typography System, Astro 4.x Framework, Astro Content Collections (+43 more)

### Community 3 - "Portfolio Badges & Metadata"
Cohesion: 0.05
Nodes (40): data, ama, badgeColor, badgeLabel, badgeStyle, collaborateOn, contact, currentLearn (+32 more)

### Community 4 - "Security Certifications & Blog"
Cohesion: 0.07
Nodes (35): AI 100: Fundamentals Certificate PDF, AI Hacking 101 Certificate PDF, Backend Development as Security Advantage, Business Logic Bugs in Security Testing, The Backend Developer's Edge in Security (Blog Post), Blog Template Diagram (Client-Server Communication), What is API Hacking (Blog Post, draft), Certificate Content Template (+27 more)

### Community 5 - "Agent Context Management"
Cohesion: 0.11
Nodes (31): Claude Integration Manifest (installed files + hashes), update-context.ps1 (Claude integration wrapper), update-context.sh (Claude integration wrapper), Multi-Agent Context File Management, Feature Branch Naming Convention (sequential or timestamp), Spec-Driven Development Workflow (Spec Kit), Template Resolution Priority Stack (overrides > presets > extensions > core), auto-commit.ps1 (git extension, PowerShell) (+23 more)

### Community 6 - "Graphify Knowledge Pipeline"
Cohesion: 0.08
Nodes (27): Graphify Skill Trigger (CLAUDE.md), graphify AST Extraction (Part A), graphify Community Detection & Clustering, graphify Fast Path (Existing Graph Query), graphify Full Build Pipeline, graphify God Nodes Analysis, graphify Skill (Knowledge Graph Builder), graphify Semantic Extraction (Part B, Subagents) (+19 more)

### Community 7 - "CTF & Security Learning"
Cohesion: 0.09
Nodes (25): API Security / API Hacking, Boot.dev Backend Developer Path, CTF Forensics, CyberChef Encoding Tool, Hash Cracking, Hashcat Password Cracking Tool, LeetCode DSA Quest, Astro Series Content Collection (+17 more)

### Community 8 - "Social & External Links"
Cohesion: 0.08
Nodes (24): social, behance, codechef, codeforces, codepen, codesandbox, dev, discord (+16 more)

### Community 9 - "Media in Writeups Feature"
Cohesion: 0.09
Nodes (23): Page Bundle Content Structure, Media Writeups Content Collection Schema, Astro Image Optimization Pipeline, Media Support in Writeups Implementation Plan, Astro Collocated Images Research, FR-001 Markdown Image Syntax Support, FR-003 Page Bundle Structure Support, Media Asset Entity (+15 more)

### Community 10 - "Agent Context Update Scripts"
Cohesion: 0.21
Nodes (15): create_new_agent_file(), log_error(), log_info(), log_success(), log_warning(), main(), parse_plan_data(), print_summary() (+7 more)

### Community 11 - "Portfolio Navigation Links"
Cohesion: 0.09
Nodes (21): link, blog, collaborateOn, currentWork, helpWith, portfolio, resume, prefix (+13 more)

### Community 12 - "Astro Package Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, astro, astro-icon, @astrojs/sitemap, @astrojs/tailwind, @iconify-json/ph, pdf-to-img, sharp (+13 more)

### Community 13 - "Blog Post Rendering"
Cohesion: 0.16
Nodes (12): base, formattedDate, @components/CopyButton.astro, @components/SeriesNavigator.astro, Series Navigation Pattern, @layouts/Post.astro, Blog Post Detail Page, base (+4 more)

### Community 14 - "Content Routing Concepts"
Cohesion: 0.19
Nodes (18): relatedCertificates Cross-Reference Concept, SeriesContext Navigation State, getStaticPaths Pattern, Tailwind Design Tokens (colors, fonts), TypeScript Path Aliases, Certificates Index Page, Certificate Detail Page ([slug].astro), Home Page (index.astro) (+10 more)

### Community 15 - "Redesign Animation System"
Cohesion: 0.15
Nodes (16): Animation System Design, Card Hover Micro-interactions, Hero Section Entrance Stagger, IntersectionObserver Scroll Engine, prefers-reduced-motion Compliance, Astro ViewTransitions Page Fade, Visual Redesign Implementation Plan, Visual Redesign Quickstart Testing Guide (+8 more)

### Community 16 - "Claude Integration Manifest"
Cohesion: 0.12
Nodes (15): files, .claude/skills/speckit-analyze/SKILL.md, .claude/skills/speckit-checklist/SKILL.md, .claude/skills/speckit-clarify/SKILL.md, .claude/skills/speckit-constitution/SKILL.md, .claude/skills/speckit-implement/SKILL.md, .claude/skills/speckit-plan/SKILL.md, .claude/skills/speckit-specify/SKILL.md (+7 more)

### Community 17 - "Spec Kit Manifest Files"
Cohesion: 0.12
Nodes (15): files, .specify/scripts/bash/check-prerequisites.sh, .specify/scripts/bash/common.sh, .specify/scripts/bash/create-new-feature.sh, .specify/scripts/bash/setup-plan.sh, .specify/scripts/bash/update-agent-context.sh, .specify/templates/agent-file-template.md, .specify/templates/checklist-template.md (+7 more)

### Community 18 - "Bash Common Utilities"
Cohesion: 0.15
Nodes (4): get_current_branch(), get_feature_paths(), has_git(), common.sh script

### Community 19 - "Blog Category Filtering"
Cohesion: 0.19
Nodes (11): allCategories, @components/BlogCard.astro, formattedDate, @components/ProjectCard.astro, @components/TagPill.astro, @components/WriteupCard.astro, formattedDate, string (+3 more)

### Community 20 - "LeetCode DSA Blog Posts"
Cohesion: 0.21
Nodes (13): Blog Post Template, LeetCode Quest DSA: Array I (Blog Post), In-Place Negation Trick (O(1) Space), LeetCode Quest DSA: Array II (Blog Post), Prefix Sum for Count Smaller Queries, Custom Max-Heap TypeScript Implementation, LeetCode Quest DSA: Heap (Blog Post), LeetCode Quest DSA: Monotonic Stack / Queue (Blog Post, draft) (+5 more)

### Community 21 - "PS Feature Branch Creation"
Cohesion: 0.26
Nodes (9): git, ConvertTo-CleanBranchName(), Get-BranchName(), Get-HighestNumberFromBranches(), Get-HighestNumberFromNames(), Get-HighestNumberFromRemoteRefs(), Get-HighestNumberFromSpecs(), Get-NextBranchNumber() (+1 more)

### Community 22 - "Series Navigator Data Model"
Cohesion: 0.17
Nodes (12): Series Feature Route Map, Build-Time Series Context Shape, SeriesNavigator Component Props Interface, Individual Project Detail Pages, SeriesNavigator Astro Component, Post Series Playlists Implementation Plan, Project Route Conflict Resolution, FR-005 Series Navigator Display Requirement (+4 more)

### Community 23 - "Git Extension Feature Scripts"
Cohesion: 0.20
Nodes (3): create-new-feature.sh script, _extract_highest_number(), get_highest_from_branches()

### Community 24 - "Core Page Layouts"
Cohesion: 0.27
Nodes (4): posts, @layouts/Page.astro, base, projects

### Community 25 - "Certificate Display Components"
Cohesion: 0.22
Nodes (6): @components/CertificateBadge.astro, base, @components/CertificateCard.astro, PDF-to-PNG Thumbnail Pipeline, Astro Config, Package JSON

### Community 26 - "Site Navigation & Transitions"
Cohesion: 0.22
Nodes (6): @components/Footer.astro, @components/Nav.astro, baseTrimmed, navLinks, @styles/global.css, @layouts/Base.astro

### Community 27 - "Content Collections Config"
Cohesion: 0.22
Nodes (8): Astro Content Collections Pattern, blog, certificates, collections, projects, series, seriesItem, writeups

### Community 28 - "Spec Kit Feature Scripts"
Cohesion: 0.25
Nodes (3): create-new-feature.sh script, _extract_highest_number(), get_highest_from_branches()

### Community 29 - "Spec Kit Init Options"
Cohesion: 0.22
Nodes (8): ai, ai_skills, branch_numbering, here, integration, preset, script, speckit_version

### Community 30 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, baseUrl, paths, extends, @components/*, @content/*, @layouts/*, @styles/*

### Community 31 - "Agent & Claude Settings"
Cohesion: 0.25
Nodes (6): enabledPlugins, frontend-design@claude-plugins-official, enabledPlugins, frontend-design@claude-plugins-official, hooks, PreToolUse

### Community 32 - "Certificates Index Page"
Cohesion: 0.25
Nodes (6): activeGroups, CATEGORY_ORDER, certificates, dates, earliest, latest

### Community 33 - "Spec Kit Templates"
Cohesion: 0.33
Nodes (6): Checklist Template, Constitution Template, Plan Template, Spec Template, Speckit Workflow System, Tasks Template

### Community 34 - "Build-Time Asset Pipeline"
Cohesion: 0.50
Nodes (5): Build-Time Series Lookup Strategy, FR-009 Build-Time Data Resolution, PDF Thumbnail Generator Integration, Automated PDF Thumbnail Generation Research, FR-007 Automated PDF Thumbnail Generation Requirement

### Community 35 - "Algorithm Blog Posts"
Cohesion: 0.40
Nodes (5): Median Minimizes Absolute Deviations, Modular Arithmetic Feasibility Check, Grid Equalization: Median, Modular Arithmetic, and Quickselect (Blog Post), Quickselect Algorithm, Series: learn-problem-solving

### Community 36 - "Spec Kit Integration Config"
Cohesion: 0.40
Nodes (4): integration, scripts, update-context, version

### Community 37 - "Certificates Schema Spec"
Cohesion: 0.50
Nodes (4): Certificates Collection Schema, Certificates Collection Structure Research, Certificate Entity, FR-001 Certificate Content Type

### Community 41 - "Content Draft Flag"
Cohesion: 0.67
Nodes (3): Draft Filtering in Series Items, FR-014 Projects Draft Field Requirement, FR-008 Certificate Draft Flag Requirement

### Community 44 - "Git GitHub Certificate"
Cohesion: 0.67
Nodes (3): Git & GitHub Practical Guide Certificate Image, Academind (Issuer), Git & GitHub - The Practical Guide Certificate PDF

## Knowledge Gaps
- **479 isolated node(s):** `frontend-design@claude-plugins-official`, `frontend-design@claude-plugins-official`, `PreToolUse`, `auto-commit.sh script`, `create-new-feature.sh script` (+474 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `skills` connect `Skills & Technologies Data` to `Portfolio Navigation Links`, `PS Feature Branch Creation`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `data` connect `Portfolio Badges & Metadata` to `Portfolio Navigation Links`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `social` connect `Social & External Links` to `Portfolio Navigation Links`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `frontend-design@claude-plugins-official`, `frontend-design@claude-plugins-official`, `PreToolUse` to the rest of the system?**
  _490 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Skills & Technologies Data` be split into smaller, more focused modules?**
  _Cohesion score 0.013422818791946308 - nodes in this community are weakly interconnected._
- **Should `Spec Kit Workflows & Concepts` be split into smaller, more focused modules?**
  _Cohesion score 0.05143191116306254 - nodes in this community are weakly interconnected._
- **Should `Portfolio Design & Requirements` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._