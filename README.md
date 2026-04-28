# sidnevart/skills

Personal collection of Claude Code and Codex skills. Install any skill into your project in one command.

**Package not on npm registry — install directly from GitHub.**

## Install CLI

### Option 1 — Global install (recommended)

```bash
npm install -g github:sidnevart/skills
```

After this `skills` is available everywhere:

```bash
skills list
skills install --group selfedu --global
```

### Option 2 — npx without installing

No installation needed. Downloads the package on the fly each run:

```bash
npx github:sidnevart/skills install --group selfedu --global
npx github:sidnevart/skills list
```

### Option 3 — Clone and link

```bash
git clone git@github.com:sidnevart/skills.git ~/skills
npm install -g ~/skills
skills list
```

Use this option when you want to edit skills locally and see changes immediately.

---

## Usage

```bash
# install one skill into current project (.claude/skills/)
skills install selfedu/learning-ai-product

# install all skills in a group
skills install --group selfedu

# install globally (~/.claude/skills/) — available in every project
skills install --group selfedu --global

# also write to AGENTS.md for Codex
skills install --group selfedu --codex

# Codex only
skills install selfedu/learning-product-reviewer --codex-only

# superpowers by category
skills install --group superpowers/quality --global
```

## Commands

| Command | Description |
|---------|-------------|
| `skills list` | Tree of all skills |
| `skills list <prefix>` | Filter by group prefix |
| `skills groups` | Top-level groups with counts |
| `skills install <id>` | Install a skill by full ID |
| `skills install --group <prefix>` | Install all skills under a prefix |
| `skills info <id>` | Show skill frontmatter |

---

## Skills

### selfedu/ — 8 skills

Learning-to-AI-Product system. Turns any engineering topic into a small publishable AI mini-product.

| Skill | Role |
|-------|------|
| `learning-setup` | One-time setup: folder structure, templates, workflow, first projects |
| `learning-ai-product` | Main orchestrator — runs the full workflow |
| `learning-topic-clarifier` | Step 1: narrow raw topic → one core question |
| `learning-idea-generator` | Step 2: generate + score 5-7 AI tool ideas |
| `learning-product-planner` | Step 3: product spec + day-by-day build plan |
| `learning-knowledge-gate` | Step 4: self-check questions + definition of done |
| `learning-product-reviewer` | Review before publishing |
| `learning-publish-pack` | Package for GitHub, Twitter, Telegram |

```
[learning-setup]      → folder structure + templates + first projects (once)
→ Topic
→ [topic-clarifier]   → core question
→ [idea-generator]    → scored ideas + pick
→ [product-planner]   → spec + 3-7 day plan
→ [knowledge-gate]    → self-check + DoD
→ build
→ [product-reviewer]  → review
→ [publish-pack]      → GitHub + post
```

### superpowers/ — 14 skills (from github.com/obra/superpowers)

| Category | Skills |
|----------|--------|
| `planning/` | brainstorming, writing-plans |
| `development/` | test-driven-development, subagent-driven-development, dispatching-parallel-agents, executing-plans, using-git-worktrees |
| `quality/` | systematic-debugging, verification-before-completion, requesting-code-review, receiving-code-review, finishing-a-development-branch |
| `meta/` | writing-skills, using-superpowers |

### writing/ — 1 skill

| Skill | Role |
|-------|------|
| `engineering-article` | Write technical articles for Habr, dev.to, Medium |

### meta/ — 1 skill

| Skill | Role |
|-------|------|
| `skill-evaluator` | Create evals (test suites) for Claude Code skills |

---

## Running Evals

```bash
# requires ANTHROPIC_API_KEY
npm run eval -- evals/selfedu/learning-ai-product.yaml
npm run eval -- evals/selfedu/  # run all evals in a directory
```

See `evals/` for eval definitions, `scripts/run-eval.js` for the runner.

---

## Usage Examples

### Start a new topic

```
Я хочу изучить тему: Kafka consumer lag.

Используй skill learning-ai-product.

Сначала предложи 5-7 идей маленьких AI-инструментов по этой теме.

Важно:
- не просто красивая визуализация
- инструмент должен решать маленькую реальную инженерную проблему
- core-понимание и основные правила я должен сделать сам
- AI можно использовать для упаковки, UI, README, prompt, demo
- проект должен быть реалистичен на 3-7 дней
- итог должен подходить для GitHub/Twitter/Telegram

После идей выбери лучший первый проект и сделай краткий план.
```

### Review before publishing

```
проведи ревью проекта

Topic: Kafka consumer lag
Product idea: AI tool that analyzes lag metrics
Core logic: decision tree with 6 root causes
What I learned: consumer group protocol, poll interval, rebalance triggers
```

### Package for publication

```
упакуй проект

Project name: Kafka Lag Debugger
Topic: Kafka consumer lag
What it does: analyzes metrics, explains root causes
What I learned: poll interval mechanics, rebalance triggers
Limitations: only standard Kafka metrics
```

---

## Where skills are installed

**Claude Code:** `.claude/skills/<name>/SKILL.md` (project) or `~/.claude/skills/<name>/SKILL.md` (global)

**Codex:** appended to `AGENTS.md` in the current directory, wrapped in `<!-- skill:id -->` markers so re-installing updates in place.
