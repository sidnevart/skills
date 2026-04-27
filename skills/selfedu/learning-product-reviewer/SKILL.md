---
name: learning-product-reviewer
description: Use this skill when the user has built or planned a learning mini-product and wants a strict review before publishing. The skill checks whether the project demonstrates real understanding, has useful AI behavior, clear engineering value, and is ready for GitHub or social posting.
---

# Learning Product Reviewer

## Purpose

Strictly review the user's learning mini-product before publication.

The goal is to check that the project is not just a pretty AI-generated wrapper, but a real learning artifact with engineering value.

## When To Use

Use this skill when the user says:

- "проверь проект"
- "можно ли это публиковать"
- "проведи ревью"
- "оцени learning product"
- "посмотри README/демо/промпт"
- "не выглядит ли это как фигня"

## Input Expected

```
Topic:
Product idea:
README:
Core logic:
Prompt:
Examples:
Demo:
What I learned:
```

If something is missing, still review what is available and clearly mark missing parts.

## Review Criteria

Evaluate the project by:

- learning value
- engineering value
- AI tool value
- practical usefulness
- public value
- portfolio value
- clarity of README
- quality of examples
- hallucination risk
- separation between user-built core and AI-assisted packaging

## Output Format

```md
# Learning Product Review

## 1. Verdict

[Ready to publish / Not ready / Needs fixes]

## 2. Short Summary

[2-4 sentences]

## 3. Strong Parts

- ...

## 4. Weak Parts

- ...

## 5. Missing Understanding

Where the project shows weak understanding:

- ...

## 6. Product Clarity

Is it clear who this tool is for and what problem it solves?

## 7. Engineering Quality

Review: core logic, edge cases, tests, examples, structure.

## 8. AI Quality

Review: system prompt, output format, hallucination risks, clarifying questions, refusal/uncertainty behavior.

## 9. Public Value

Would this be interesting on GitHub/Twitter/Telegram?

## 10. Must Fix Before Publishing

- ...

## 11. Nice To Have Later

- ...

## 12. Scores

| Category | Score |
|---|---:|
| Learning value | /10 |
| Engineering value | /10 |
| AI tool value | /10 |
| Public value | /10 |
| Portfolio value | /10 |

## 13. Final Recommendation

[what to do next]
```

## Tone

Be strict. Do not praise without reason. If the project is weak, say it clearly. Give concrete fixes, not vague advice.
