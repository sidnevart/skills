# sidnevart/skills

Personal collection of Claude Code and Codex skills. Install any skill into your project in one command.

## Install

```bash
# one skill into current project (.claude/skills/)
npx sidnevart-skills install selfedu/learning-ai-product

# whole group
npx sidnevart-skills install --group selfedu

# globally (~/.claude/skills/)
npx sidnevart-skills install --group selfedu --global

# claude + codex (also writes to AGENTS.md)
npx sidnevart-skills install --group selfedu --codex

# codex only
npx sidnevart-skills install selfedu/learning-product-reviewer --codex-only
```

## Commands

| Command | Description |
|---------|-------------|
| `skills list` | List all skills |
| `skills list <group>` | List skills in a group |
| `skills install <id>` | Install a skill |
| `skills install --group <g>` | Install all skills in a group |
| `skills info <id>` | Show skill description |

## Skills

### selfedu/

Learning-to-AI-Product system. Turns any engineering topic into a small publishable AI mini-product.

| Skill | Role |
|-------|------|
| `learning-ai-product` | Main orchestrator — runs the full workflow |
| `learning-topic-clarifier` | Step 1: narrow raw topic → one core question |
| `learning-idea-generator` | Step 2: generate + score 5-7 AI tool ideas |
| `learning-product-planner` | Step 3: product spec + day-by-day build plan |
| `learning-knowledge-gate` | Step 4: self-check questions + definition of done |
| `learning-product-reviewer` | Review before publishing |
| `learning-publish-pack` | Package for GitHub, Twitter, Telegram |

#### Workflow

```
Topic
→ [topic-clarifier]   → core question
→ [idea-generator]    → scored ideas + pick
→ [product-planner]   → spec + 3-7 day plan
→ [knowledge-gate]    → self-check + DoD
→ build
→ [product-reviewer]  → review
→ [publish-pack]      → GitHub + post
```

You can run `learning-ai-product` to do all four planning steps at once, or call each skill separately for more control.

## Where skills are installed

**Claude Code:** `.claude/skills/<name>/SKILL.md` (project) or `~/.claude/skills/<name>/SKILL.md` (global)

**Codex:** appended to `AGENTS.md` in the current directory, wrapped in `<!-- skill:group/name -->` markers so re-installing updates in place.

## Add to PATH (optional)

```bash
npm install -g sidnevart-skills
skills list
```
