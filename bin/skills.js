#!/usr/bin/env node

const { program } = require('commander');
const { getAllSkills, getSkillsByPrefix, getTopGroups } = require('../src/registry');
const { install } = require('../src/install');
const { version } = require('../package.json');

program
  .name('skills')
  .description('Install Claude Code and Codex skills from sidnevart/skills')
  .version(version);

// ─── list ────────────────────────────────────────────────────────────────────

program
  .command('list [prefix]')
  .description('List available skills (optionally filtered by group prefix)')
  .action((prefix) => {
    const skills = prefix ? getSkillsByPrefix(prefix) : getAllSkills();

    if (skills.length === 0) {
      console.log(prefix ? `No skills found under "${prefix}".` : 'No skills found.');
      return;
    }

    // Build a nested tree for display
    const tree = {};
    for (const s of skills) {
      const parts = s.id.split('/');
      let node = tree;
      for (let i = 0; i < parts.length - 1; i++) {
        node[parts[i]] = node[parts[i]] || {};
        node = node[parts[i]];
      }
      node[`__skill__${parts[parts.length - 1]}`] = s.id;
    }

    console.log(`\nAvailable skills (${skills.length}):\n`);
    printTree(tree, '');
    console.log(`\nInstall: skills install <id>      e.g. skills install superpowers/planning/brainstorming`);
    console.log(`         skills install --group <prefix>  e.g. skills install --group superpowers`);
  });

function printTree(node, indent) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('__skill__')) {
      const name = key.replace('__skill__', '');
      console.log(`${indent}  ${name}`);
    } else {
      console.log(`${indent}${key}/`);
      printTree(val, indent + '  ');
    }
  }
}

// ─── install ─────────────────────────────────────────────────────────────────

program
  .command('install [skills...]')
  .description('Install skills into .claude/skills/ and/or AGENTS.md')
  .option('-g, --global', 'Install globally into ~/.claude/skills/')
  .option('--group <prefix>', 'Install all skills under a prefix (e.g. --group superpowers/planning)')
  .option('--codex', 'Also write to AGENTS.md for Codex')
  .option('--codex-only', 'Write to AGENTS.md only, skip Claude install')
  .addHelpText(
    'after',
    `
Examples:
  skills install superpowers/planning/brainstorming
  skills install superpowers/planning/brainstorming --global
  skills install --group superpowers
  skills install --group superpowers/quality
  skills install --group selfedu --codex
  skills install selfedu/learning-ai-product --codex-only
  skills install   # installs everything
`
  )
  .action((ids, opts) => {
    install({
      ids: ids.length > 0 ? ids : null,
      group: opts.group,
      global: opts.global,
      codex: opts.codex,
      codexOnly: opts.codexOnly,
    });
  });

// ─── info ─────────────────────────────────────────────────────────────────────

program
  .command('info <skill>')
  .description('Show description of a skill (by id or bare name)')
  .action((id) => {
    const { getSkillContent } = require('../src/registry');
    const skill = getSkillContent(id);
    if (!skill) {
      console.error(`Skill "${id}" not found. Run "skills list" to see available skills.`);
      process.exit(1);
    }
    const match = skill.content.match(/^---\n([\s\S]*?)\n---/);
    console.log(`\n[${skill.id}]\n`);
    if (match) {
      console.log(match[1].trim());
    } else {
      console.log(skill.content.slice(0, 400));
    }
  });

// ─── groups ───────────────────────────────────────────────────────────────────

program
  .command('groups')
  .description('List top-level groups')
  .action(() => {
    const groups = getTopGroups();
    console.log('\nGroups:\n');
    for (const g of groups) {
      const count = getSkillsByPrefix(g).length;
      console.log(`  ${g}  (${count} skills)`);
    }
  });

program.parse(process.argv);
