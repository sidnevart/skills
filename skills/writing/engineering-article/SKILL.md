---
name: engineering-article
description: Use this skill when the user wants to write a technical engineering article for Habr, dev.to, or Medium. Guides structure, platform tone, depth calibration, and produces a publication-ready draft without hype or surface-level content.
---

# Engineering Article Skill

## Purpose

Turn the user's real engineering experience into a publication-ready technical article.

The goal is not to produce generic content that sounds technical.
The goal is to write something a senior engineer would read and learn from — concrete, honest, based on real experience.

## When To Use

- "напиши статью про X для Хабра"
- "помоги написать пост на dev.to"
- "хочу написать Medium статью про тему X"
- "оформи мой опыт в статью"
- "напиши черновик технической статьи"

<HARD-GATE>
Do NOT start writing the article until you know:
1. The platform (Habr / dev.to / Medium)
2. The core insight — one real thing the user learned or built
3. The target reader (junior / mid / senior, specific domain)

If any of these is missing, ask. One question at a time.
</HARD-GATE>

## User Context

Backend engineer. Stack: Kotlin, Java, Go, Spring Boot, Kafka, PostgreSQL, ClickHouse, Kubernetes, Grafana, Prometheus, OpenTelemetry, n8n, Qdrant, AI agents.

Topics: distributed systems, databases, SRE, observability, production debugging, architecture, AI engineering, developer tools.

## Platform Guide

### Habr

- **Language:** Russian
- **Audience:** Senior Russian-speaking engineers, skeptical, pattern-match for bullshit fast
- **Tone:** Direct, technical, no marketing language. Допускается лёгкий сарказм.
- **Length:** 1500–4000 слов. Короче — не берут всерьёз. Длиннее — дочитывают единицы.
- **Structure:** заголовок → проблема → контекст → решение → детали реализации → выводы
- **Code:** обязателен, реальный, с комментариями на русском
- **What works:** "мы столкнулись с X в проде", реальные цифры, честные ограничения, антипаттерны
- **What kills:** "В этой статье мы рассмотрим...", маркетинговые заголовки, очевидные вещи
- **Tags:** до 8 тегов, русские и английские

### dev.to

- **Language:** English
- **Audience:** Mid-level engineers globally, learning-oriented, like practicality
- **Tone:** Conversational but technical. First person. Approachable.
- **Length:** 800–2000 words. Scannable. Headers every 300–400 words.
- **Structure:** hook (1 paragraph) → what you'll learn → the problem → the solution → code → takeaways
- **Code:** required, with syntax highlighting (use fenced blocks with language)
- **Front matter:** title, tags (max 4), cover image suggestion
- **What works:** "I spent 3 days debugging this", TIL format, diagrams as ASCII or description
- **What kills:** walls of text, no code, abstract theory with no examples

### Medium

- **Language:** English (or Russian for Russian publications)
- **Audience:** Mixed — engineers and tech-adjacent readers. Less code-heavy than the others.
- **Tone:** Narrative, slightly story-driven. Can start with an anecdote.
- **Length:** 1200–3000 words
- **Structure:** story hook → problem framing → insight → explanation → implications
- **Code:** optional but useful; keep snippets short and explained
- **What works:** "here's what I wish I knew", unique perspective, connecting dots between ideas
- **What kills:** listicles without depth, buzzword density, no original insight

## Article Quality Criteria

A good engineering article has:

- **One concrete insight** — not "X is important" but "X behaves this way under condition Y, and here's why"
- **Real numbers** — latency, throughput, error rates, team size, time spent
- **Honest limitations** — what the solution doesn't handle, where it breaks
- **Code that runs** — not pseudocode unless explicitly explaining concepts
- **No obvious facts** — don't explain what Kafka is to an audience that uses Kafka
- **An opinion** — the author has a point of view, not just a description

## Workflow

### Step 1 — Extract the insight

Ask: *"Что именно ты узнал или сделал, что удивило тебя или было неочевидным?"*

If the user says a topic name, dig deeper:
- What specific problem did you hit?
- What was the non-obvious part?
- What would you tell a colleague before they hit the same issue?

### Step 2 — Identify the reader

Who benefits from this? Junior learning the basics? Senior debugging production? Architect choosing tools?
The answer changes the depth and assumed knowledge level.

### Step 3 — Write the outline

Present a 5–7 point outline and get approval before writing the full draft.
If the user explicitly skips this step, write the draft directly — the outline is for alignment, not a gate.

### Step 4 — Write the draft

Follow platform-specific structure. Include:
- Real code examples (ask user to provide if needed)
- Concrete numbers (ask if user has them)
- One honest "limitations / when not to use this" section

### Step 5 — Self-review

Check before presenting:
- Does the intro avoid "В этой статье мы рассмотрим..." / "In this article we will..."?
- Is there at least one concrete number?
- Is there code (or a clear reason there isn't)?
- Does it have a limitations section?
- Is the first paragraph interesting enough to continue reading?

## Output Format

```md
# [Article Title]

**Platform:** Habr / dev.to / Medium
**Estimated read time:** X min
**Target reader:** [description]

---

[Full article draft]

---

## Meta

**Tags:** [platform-appropriate tags]
**Cover image suggestion:** [description]
**One-line summary for social:** [tweet/post text]
```

## Style Rules

- Never start the article body with "В этой статье..." or "In this article...".
- Never use "революционный", "game-changing", "ultimate guide".
- Be honest about limitations — it builds credibility, not weakens it.
- If the user doesn't have real numbers, say so and use placeholders they should fill in.
- Write the article the user could have written — don't invent experience they don't have.
