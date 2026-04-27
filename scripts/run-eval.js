#!/usr/bin/env node

/**
 * Eval runner for Claude Code skills.
 *
 * Usage:
 *   node scripts/run-eval.js evals/selfedu/learning-ai-product.yaml
 *   node scripts/run-eval.js evals/selfedu/
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const yaml = require('js-yaml');
const { getSkillContent } = require('../src/registry');

const client = new Anthropic();

// ─── Graders ─────────────────────────────────────────────────────────────────

async function runGrader(grader, output) {
  const input = grader.input.replace('{{ output }}', output);

  switch (grader.type) {
    case 'contains':
      return { pass: input.includes(grader.value), reason: grader.value };

    case 'not_contains':
      return { pass: !input.includes(grader.value), reason: `must not contain: ${grader.value}` };

    case 'regex': {
      const re = new RegExp(grader.pattern, 'i');
      return { pass: re.test(input), reason: grader.pattern };
    }

    case 'llm_judge': {
      const judgePrompt = `You are an eval judge. Answer YES or NO only.

Criterion: ${grader.criteria}

Output to evaluate:
---
${input}
---

Does the output satisfy the criterion? Answer with exactly YES or NO.`;

      const msg = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 10,
        messages: [{ role: 'user', content: judgePrompt }],
      });
      const answer = msg.content[0].text.trim().toUpperCase();
      return { pass: answer.startsWith('YES'), reason: grader.criteria };
    }

    default:
      return { pass: false, reason: `unknown grader type: ${grader.type}` };
  }
}

// ─── Run one test case ────────────────────────────────────────────────────────

async function runTestCase(testCase, evalConfig, skillContent) {
  const activeGraderNames = testCase.graders || evalConfig.graders.map((g) => g.name);
  const activeGraders = evalConfig.graders.filter((g) => activeGraderNames.includes(g.name));

  // Call the model with skill as system prompt
  const msg = await client.messages.create({
    model: evalConfig.model || 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: skillContent,
    messages: [{ role: 'user', content: testCase.user_message }],
  });

  const output = msg.content[0].text;

  // Run all graders
  const results = await Promise.all(
    activeGraders.map(async (grader) => {
      const result = await runGrader(grader, output);
      return { name: grader.name, ...result };
    })
  );

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass);
  const allPass = failed.length === 0;

  return { id: testCase.id, allPass, passed, total: results.length, failed, output };
}

// ─── Run one eval file ────────────────────────────────────────────────────────

async function runEval(evalPath) {
  const raw = fs.readFileSync(evalPath, 'utf8');
  const config = yaml.load(raw);

  const skill = getSkillContent(config.skill_id);
  if (!skill) {
    console.error(`  Skill "${config.skill_id}" not found in registry.`);
    process.exit(1);
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Eval: ${config.name}`);
  console.log(`Skill: ${config.skill_id}`);
  console.log(`Cases: ${config.test_cases.length}`);
  console.log(`${'─'.repeat(60)}`);

  let totalPass = 0;
  let totalFail = 0;

  for (const testCase of config.test_cases) {
    process.stdout.write(`  ${testCase.id.padEnd(40)} `);
    try {
      const result = await runTestCase(testCase, config, skill.content);
      if (result.allPass) {
        console.log(`PASS (${result.passed}/${result.total})`);
        totalPass++;
      } else {
        console.log(`FAIL (${result.passed}/${result.total})`);
        for (const f of result.failed) {
          console.log(`    ✗ ${f.name}: ${f.reason}`);
        }
        totalFail++;
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      totalFail++;
    }
  }

  console.log(`\nResult: ${totalPass} passed, ${totalFail} failed`);
  return { name: config.name, totalPass, totalFail };
}

// ─── Entry point ─────────────────────────────────────────────────────────────

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node scripts/run-eval.js <eval.yaml | evals/dir/>');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY env var is required');
    process.exit(1);
  }

  let evalFiles = [];

  if (fs.statSync(target).isDirectory()) {
    evalFiles = fs.readdirSync(target)
      .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map((f) => path.join(target, f));
  } else {
    evalFiles = [target];
  }

  const summary = [];
  for (const file of evalFiles) {
    const result = await runEval(file);
    summary.push(result);
  }

  if (summary.length > 1) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log('Summary');
    console.log(`${'═'.repeat(60)}`);
    for (const s of summary) {
      const status = s.totalFail === 0 ? 'PASS' : 'FAIL';
      console.log(`  ${status}  ${s.name.padEnd(40)} ${s.totalPass}/${s.totalPass + s.totalFail}`);
    }
  }

  const anyFailed = summary.some((s) => s.totalFail > 0);
  process.exit(anyFailed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
