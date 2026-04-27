---
name: learning-idea-generator
description: Use this skill to generate 5-7 AI mini-product ideas for a clarified engineering learning topic, score them across 5 dimensions, and recommend the best first project. Step 2 of the selfedu workflow.
---

# Learning Idea Generator

## Purpose

Generate concrete AI tool ideas for an engineering learning topic, score them, and recommend the best first project to build.

## When To Use

- As Step 2 of `learning-ai-product` (after `learning-topic-clarifier`)
- Standalone: "придумай идеи для проекта по теме X"
- When the user wants to pick the best learning project from options

## Input

```
Core question: <output from learning-topic-clarifier or user's own formulation>
Stack context (optional): <user's tech stack>
```

## Preferred Product Types

Score higher if the idea fits one of these archetypes:

| Type | Description |
|------|-------------|
| AI Debug Tutor | Walks through a failure scenario step by step |
| AI Incident Simulator | Generates realistic on-call scenarios |
| AI Architecture Reviewer | Reviews a design against known trade-offs |
| AI Runbook Generator | Turns knowledge into actionable runbooks |
| AI Code Review Coach | Reviews code for topic-specific antipatterns |
| AI Docs-to-Diagram | Converts docs/config to diagrams |
| AI Trade-off Explainer | Explains why X beats Y in context Z |
| AI Interview Drill | Generates and evaluates interview questions |
| AI Failure Mode Analyzer | Lists failure modes for a given system |
| AI Checklist Generator | Produces topic-specific checklists |

Avoid pure visualizers unless the visualization solves a real problem.

## Scoring Dimensions

Score each idea 1-5:

- **Learning value** — does building this force deep understanding of the topic?
- **Usefulness** — would a real engineer actually use this at work?
- **Public value** — would this get stars on GitHub or engagement on Twitter?
- **Difficulty** — how hard to build in 3-7 days? (5 = easiest)
- **Career relevance** — does this show backend/SRE expertise?

## Output Format

```md
## AI Mini-Product Ideas for: [core question]

| # | Idea | What it does | Learn | Useful | Public | Easy | Career | Total |
|---|------|-------------|------:|-------:|-------:|-----:|-------:|------:|
| 1 | ... | ... | /5 | /5 | /5 | /5 | /5 | /25 |
...

## Recommended First Project

**Name:** [name]

**One-liner:** [short description]

**Why this project:**
[2-3 sentences — why it scores highest and fits the user's goals]

**What makes it buildable in 3-7 days:**
[specific constraints that keep it small]
```

## Style Rules

- Write in Russian by default.
- Be direct: pick a winner and explain why.
- Do not recommend a SaaS, platform, or anything that needs a backend unless the user has one running.
- Prefer tools that work via CLI, API, or a simple web UI.
