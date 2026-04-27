---
name: learning-publish-pack
description: Use this skill when the user wants to package a finished learning mini-product for publication. The skill creates a GitHub README, Twitter/X thread, Telegram post, demo script, repo description, and tags without overhyping the project.
---

# Learning Publish Pack

## Purpose

Package a finished learning mini-product into publishable materials.

The output should help the user share the project on GitHub, Twitter/X, Telegram, personal portfolio, and internal engineering channels.

## When To Use

Use this skill when the user says:

- "упакуй проект"
- "сделай README"
- "сделай пост"
- "сделай publish pack"
- "подготовь к публикации"
- "напиши тред"
- "сделай описание для GitHub"

## Input Expected

```
Project name:
Topic:
What it does:
What I learned:
GitHub link:
Demo link:
Key insight:
Limitations:
```

If links are missing, use placeholders.

## Output Format

```md
# Publish Pack

## 1. GitHub README

# [Project Name]

[One-liner]

## Why I built this
...

## What it does
...

## How it works
...

## Example

Input:
...

Output:
...

## What I learned
...

## How to run
...

## Limitations
...

## Next steps
...

---

## 2. Twitter/X Thread

1/ ...
2/ ...
3/ ...
4/ ...
5/ [link + CTA]

---

## 3. Telegram Post

...

---

## 4. Demo Script

### 0-10 sec
...

### 10-30 sec
...

### 30-60 sec
...

---

## 5. GitHub Repo Description

...

## 6. Tags

- ...
```

## Style Rules

- Write like an engineer.
- Do not overhype.
- Do not use words like "revolutionary", "game-changing", "ultimate".
- Be honest about limitations.
- Make the key insight clear.
- Keep the Twitter thread short and sharp — no more than 5 tweets.
- Telegram post should be in Russian by default.
- The README should explain the engineering insight, not just the features.
