---
name: learning-knowledge-gate
description: Use this skill to generate self-check questions and a definition of done that verify the user actually understood the learning topic — not just vibe-coded the packaging. Step 4 of the selfedu workflow.
---

# Learning Knowledge Gate

## Purpose

Create a quality gate that verifies real understanding of the topic, separate from the ability to ship a demo.

The goal is to prevent the user from outsourcing core understanding to AI and shipping a wrapper they cannot explain.

## When To Use

- As Step 4 of `learning-ai-product` (final step before building)
- Standalone: "проверь понял ли я тему", "создай самопроверку"
- Before a review: check if the project reflects real knowledge

## Input

```
Topic: <learning topic>
Core question: <from topic clarifier>
Core logic the user plans to build: <from product planner>
```

## Output Format

```md
## Knowledge Gate: [Topic]

### What you must be able to explain without AI

Answer these questions before you write a single line of code.
If you cannot answer them, read more first.

1. [Fundamental concept question — "what is X and why does it work this way?"]
2. [Failure mode question — "what breaks when Y happens?"]
3. [Trade-off question — "why would you choose X over Z?"]
4. [Operational question — "how do you diagnose this in production?"]
5. [Edge case question — "what happens when both X and Y are true at the same time?"]

---

### Core Logic Checklist (must be written by you, not AI)

- [ ] [specific rule or decision the user must implement themselves]
- [ ] [specific example or test case the user must write themselves]
- [ ] [specific failure scenario the user must model themselves]

---

### Final Definition of Done

The project is done when:

- [ ] You can answer all 5 knowledge questions without looking them up.
- [ ] The core logic was written by you and you can walk through it line by line.
- [ ] A colleague who knows the stack could use the tool and get useful output.
- [ ] The README explains what the tool does and why without buzzwords.
- [ ] [topic-specific criterion 1]
- [ ] [topic-specific criterion 2]

---

### Red Flags (these mean you outsourced the learning)

- The system prompt contains your entire domain logic.
- You cannot explain why the AI output is correct or wrong.
- You cannot reproduce the tool's reasoning without the AI.
- The README describes the UI but not the engineering insight.
```

## Style Rules

- Write in Russian by default.
- Questions must require real knowledge — not Googleable in 10 seconds.
- The checklist must be specific to the topic, not generic.
- Be strict: if the user cannot answer these, they should learn more before building.
