---
name: learning-setup
description: Use this skill once to set up a complete Learning-to-AI-Product system in the user's project. Creates folder structure, templates, workflow, and suggests automation integrations (Claude, Codex, GitHub, n8n, Telegram, Notion/Obsidian).
---

# Learning Setup Skill

## Purpose

Create a working Learning-to-AI-Product system in the user's project.

This is a one-time setup skill. Run it once per project. After that, the user uses `learning-ai-product` for each new topic.

## When To Use

- "настрой систему для обучения"
- "создай структуру для learning-to-product"
- "я хочу начать — что мне нужно"
- "setup learning system"
- First time the user mentions the selfedu workflow

## What It Produces

1. **Folder structure** for topic intake, specs, plans, logs, reviews, publish packs
2. **Templates** — reusable markdown files for each stage
3. **Weekly workflow** — day-by-day schedule with goals and outputs
4. **Automation suggestions** — how to wire up Claude, Codex, GitHub, n8n, Telegram, Notion/Obsidian
5. **First projects** — 5 concrete AI mini-product ideas for the user's stack

## User Context

Backend engineer. Stack: Kotlin, Java, Go, Spring Boot, Kafka, PostgreSQL, ClickHouse, Kubernetes, Grafana, Prometheus, OpenTelemetry, n8n, Qdrant, AI agents.

Interests: backend engineering, distributed systems, databases, SRE, observability, production debugging, architecture, AI engineering, developer tools, agent systems.

## Important Rule

The core understanding must be the user's.

User does personally: core concepts, domain model, diagnostic rules, failure modes, trade-offs, examples, self-check questions, core logic.

AI helps with: UI, README, prompt design, demo script, examples, packaging, deployment, Twitter/Telegram posts, boilerplate.

## Output Format

```md
# Learning-to-AI-Product System Setup

## 1. Folder Structure

```
learning/
  topics/
    topic-intake.md
  ideas/
    idea-selection.md
  specs/
    product-spec.md
  plans/
    weekly-plan.md
    daily-log.md
  reviews/
    review.md
  publish/
    publish-pack.md
```

## 2. Templates

### topic-intake.md

```md
# Topic Intake

**Raw topic:**
**Platform:** Habr / dev.to / Medium / internal
**Why this topic:**
**Real pain encountered:**
**Stack context:**
**Estimated days:** 3-7
```

### idea-selection.md

```md
# Idea Selection

**Core question:**

| # | Idea | What it does | Learn | Useful | Public | Easy | Career | Total |
|---|------|-------------|------:|-------:|-------:|-----:|-------:|------:|
| 1 |      |             |       |        |        |      |        |       |

**Recommended:**
**Why:**
```

### product-spec.md

```md
# Product Spec

**Name:**
**One-liner:**

### Target user
### User problem
### User scenario
### Example input
### Example output
```

### weekly-plan.md

```md
# Weekly Plan

**Topic:**
**Project:**
**Start date:**
**End date:**

| Day | Goal | Task | Output | DoD |
|-----|------|------|--------|-----|
| 1   |      |      |        |     |
| 2   |      |      |        |     |
| 3   |      |      |        |     |
| 4   |      |      |        |     |
| 5   |      |      |        |     |
| 6   |      |      |        |     |
| 7   |      |      |        |     |
```

### daily-log.md

```md
# Daily Log — YYYY-MM-DD

**Day:** N of 7
**Goal:**
**What I did:**
**What I learned:**
**Blockers:**
**Tomorrow:**
```

### review.md

```md
# Review

**Project:**
**Date:**

## Verdict
## Strong Parts
## Weak Parts
## Missing Understanding
## Scores
```

### publish-pack.md

```md
# Publish Pack

**Project:**
**Date:**

## README
## Twitter Thread
## Telegram Post
## Demo Script
```

## 3. Weekly Workflow

**Day 1 — Understand**
- Goal: deeply understand the topic
- Task: read docs, run experiments, trace code
- Output: notes + core question
- DoD: can answer "why does X happen" without looking up

**Day 2 — Choose AI Product Idea**
- Goal: pick the best mini-product to build
- Task: generate 5-7 ideas, score, select
- Output: idea-selection.md
- DoD: one idea chosen with clear justification

**Day 3 — Build Core Model**
- Goal: create the domain model / decision tree
- Task: write rules, failure modes, trade-offs
- Output: product-spec.md with core logic section
- DoD: core logic exists and is understood by the user

**Day 4 — Build Core Logic**
- Goal: implement the tool's brain
- Task: write the diagnostic / decision / generation logic
- Output: working code (CLI, script, or function)
- DoD: tool produces correct output on test inputs

**Day 5 — Build AI Layer**
- Goal: add AI packaging around the core
- Task: system prompt, output formatting, examples
- Output: AI-enhanced version of the tool
- DoD: AI produces structured, useful output

**Day 6 — Package and Test**
- Goal: make it shareable
- Task: README, demo script, examples, tests
- Output: publish-pack.md + working repo
- DoD: a colleague can clone and use it

**Day 7 — Publish and Review**
- Goal: share and reflect
- Task: GitHub push, social post, self-review
- Output: public post + review.md
- DoD: project is visible, review is honest

## 4. Automation Ideas

### Claude / OpenClaw
- Load `learning-ai-product` skill for each new topic
- Use `learning-topic-clarifier`, `learning-idea-generator`, `learning-product-planner`, `learning-knowledge-gate` for detailed steps

### Codex
- Add skills to `AGENTS.md` for Codex agent context
- Use Codex for implementation (Day 4) with skills as guardrails

### GitHub
- One repo per project (or monorepo with subfolders)
- Use PRs for review checkpoint (Day 6)
- GitHub Actions for simple CI (test on push)

### n8n
- Auto-post Telegram message when publish-pack is ready
- GitHub webhook → Telegram notification

### Telegram
- Bot posts daily progress reminder
- Channel for finished projects

### Notion / Obsidian
- Notion database for tracking all topics and statuses
- Obsidian vault with templates for each project
- Daily notes linked to weekly plans

## 5. First Projects

### 1. Kafka Lag Debugger
- **Topic:** Kafka consumer lag
- **What it does:** analyzes lag metrics, explains root causes via decision tree
- **Why useful:** saves hours of manual log diving
- **User builds:** decision tree with 6 root causes
- **AI helps:** README, prompt design, demo script
- **MVP:** CLI tool that takes lag metrics → outputs probable cause
- **Public hook:** "We spent 3 hours debugging lag. This tool finds the cause in 10 seconds."

### 2. MVCC Bloat Detector
- **Topic:** PostgreSQL MVCC / dead tuples
- **What it does:** scans pg_stat, warns about bloat, suggests VACUUM strategy
- **Why useful:** prevents table bloat before it becomes a problem
- **User builds:** bloat threshold rules and VACUUM recommendations
- **AI helps:** output formatting, runbook generation
- **MVP:** SQL query + decision tree → bloat report
- **Public hook:** "Our table was 50GB after deleting 90% of rows. Here's why."

### 3. SLO Burn Advisor
- **Topic:** SLO burn rate
- **What it does:** calculates burn rate, generates alert runbook
- **Why useful:** prevents budget exhaustion before it happens
- **User builds:** burn rate formula and severity classification
- **AI helps:** runbook template, Telegram alert formatting
- **MVP:** script that reads SLO state → outputs runbook snippet
- **Public hook:** "Burn rate alerted us 4 hours before budget exhaustion."

### 4. OOMKill Root Cause Tracer
- **Topic:** Kubernetes OOMKilled
- **What it does:** correlates pod events, memory metrics, and limits
- **Why useful:** OOMKilled is often misdiagnosed as application bug
- **User builds:** correlation logic between events and metrics
- **AI helps:** visualization suggestions, incident report template
- **MVP:** kubectl plugin that traces OOM events
- **Public hook:** "Your pod was killed by the kernel, not your app."

### 5. ClickHouse Query Profiler
- **Topic:** ClickHouse query performance
- **What it does:** analyzes slow queries, suggests index/partition fixes
- **Why useful:** ClickHouse performance tuning is non-obvious
- **User builds:** query pattern classifier and fix suggestions
- **AI helps:** README with examples, demo video script
- **MVP:** script that takes EXPLAIN output → optimization tips
- **Public hook:** "One index change reduced query time from 30s to 200ms."

## Style Rules

- Write in Russian by default.
- Be direct and practical.
- Do not create a huge platform.
- One project = one topic = one real engineering problem.
- Prefer useful AI tools over beautiful but useless demos.
- Keep each project realistic for 3-7 days.
