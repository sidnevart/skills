---
name: learning-topic-clarifier
description: Use this skill to narrow a raw engineering learning topic into one concrete core question suitable for building a focused AI mini-product. First step in the selfedu workflow.
---

# Learning Topic Clarifier

## Purpose

Turn a vague or broad topic into one precise engineering question that a mini-product can actually answer.

## When To Use

- As Step 1 of `learning-ai-product`
- When the user has a topic but it's too broad to build something from
- Standalone: "сузь тему", "уточни что именно я хочу изучить"

## Input

```
Topic: <raw topic name>
```

## Process

1. Identify whether the topic is a concept, a problem, a tool, or a pattern.
2. If it's a broad category (e.g. "Kafka"), ask: what specific failure mode or behavior is confusing?
3. Reframe as one core question: "Why does X happen even when Y?"
4. Confirm: can this question be answered by a small AI tool?

## Output Format

```md
## Topic Clarification

**Raw topic:** [input]

**Problem category:** [concept / failure mode / trade-off / operational pattern]

**Core question:**
> [One concrete question the learning project should answer]

**Why this framing:**
[1-2 sentences explaining why this framing is better than the raw topic]

**Too broad — narrowed by:**
[what was cut to get here, if anything]
```

## Examples

| Raw | Core Question |
|-----|--------------|
| Kafka | Why does Kafka consumer lag grow even when the consumer service is alive and has no obvious errors? |
| PostgreSQL | Why does a VACUUM not shrink the physical table file even after deleting 90% of rows? |
| Kubernetes | Why do pods get OOMKilled even when the container uses less memory than the limit? |
| ClickHouse | Why do ClickHouse queries slow down after a large bulk insert? |

## Style Rules

- Write in Russian by default.
- One sentence for the core question — no sub-questions.
- The question must be answerable by an engineer who studied the topic for 2-3 days.
