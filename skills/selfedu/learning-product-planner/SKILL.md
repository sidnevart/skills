---
name: learning-product-planner
description: Use this skill to create a concise product spec and a 3-7 day build plan for a selected AI learning mini-product. Step 3 of the selfedu workflow.
---

# Learning Product Planner

## Purpose

Turn a selected AI mini-product idea into a concrete product spec and a day-by-day build plan that produces a publishable artifact.

## When To Use

- As Step 3 of `learning-ai-product` (after `learning-idea-generator`)
- Standalone: "составь план для проекта X"
- When the user already has an idea and needs a structured plan

## Input

```
Project name: <name>
Core question: <from topic clarifier>
What it does: <one-liner>
User's stack: <optional>
Days available: <3-7, default 5>
```

## Output Format

```md
## Product Spec: [Project Name]

### Target user
[who uses this tool — be specific: "backend engineer debugging Kafka lag in production"]

### User problem
[the real engineering pain this solves]

### User scenario
[how the user actually opens and uses this tool]

### Example input
[concrete example — real, not generic]

### Example output
[concrete example — real, not generic]

---

## MVP Scope

What is in:
- ...

What is NOT in (save for later):
- ...

---

## Core Knowledge I Must Learn (do this myself)

- ...

## Core Logic I Must Build Myself

- ...

## AI-Assisted Packaging (AI can help here)

- ...

---

## [N]-Day Build Plan

### Day 1 — Understand

**Goal:** [what to understand]
**Task:** [what to do]
**Output:** [artifact — file, doc, diagram]
**DoD:** [how to know you're done]

### Day 2 — Core Model

**Goal:**
**Task:**
**Output:**
**DoD:**

### Day 3 — Core Logic

**Goal:**
**Task:**
**Output:**
**DoD:**

### Day 4 — AI Layer

**Goal:**
**Task:**
**Output:**
**DoD:**

### Day 5 — Packaging

**Goal:**
**Task:**
**Output:**
**DoD:**

[Day 6 — Polish / Day 7 — Publish if days > 5]
```

## Planning Rules

- Day 1 is always pure learning — no code.
- The core logic day must produce something the user wrote and understands.
- The AI layer day builds on top of the core, not instead of it.
- Every day has one concrete output artifact.
- The final day produces something publishable: README + demo + post.
- Keep scope small enough that a single engineer can ship it in the allotted days.

## Style Rules

- Write in Russian by default.
- Be specific: example inputs and outputs must be realistic, not placeholders.
- If the plan is too ambitious for the days available, cut scope explicitly.
