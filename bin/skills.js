#!/usr/bin/env node

const { program } = require('commander');
const { getAllSkills, getSkillsInGroup, getGroups } = require('../src/registry');
const { install } = require('../src/install');
const { version } = require('../package.json');

program
  .name('skills')
  .description('Install Claude Code and Codex skills from sidnevart/skills')
  .version(version);

// ─── list ────────────────────────────────────────────────────────────────────

program
  .command('list [group]')
  .description('List available skills')
  .action((group) => {
    if (group) {
      const names = getSkillsInGroup(group);
      if (names.length === 0) {
        console.log(`No skills found in group "${group}".`);
        return;
      }
      console.log(`\nGroup: ${group}\n`);
      for (const name of names) {
        console.log(`  ${group}/${name}`);
      }
    } else {
      const skills = getAllSkills();
      if (skills.length === 0) {
        console.log('No skills found.');
        return;
      }
      const groups = {};
      for (const s of skills) {
        groups[s.group] = groups[s.group] || [];
        groups[s.group].push(s.name);
      }
      console.log(`\nAvailable skills (${skills.length} total):\n`);
      for (const [g, names] of Object.entries(groups)) {
        console.log(`  ${g}/`);
        for (const n of names) {
          console.log(`    ${n}`);
        }
      }
      console.log(`\nInstall: skills install <group/name>`);
      console.log(`         skills install --group <group>`);
    }
  });

// ─── install ─────────────────────────────────────────────────────────────────

program
  .command('install [skills...]')
  .description('Install skills into .claude/skills/ (and optionally AGENTS.md for Codex)')
  .option('-g, --global', 'Install globally into ~/.claude/skills/ instead of ./.claude/skills/')
  .option('--group <group>', 'Install all skills in a group (e.g. --group selfedu)')
  .option('--codex', 'Also write to AGENTS.md for Codex (in addition to Claude)')
  .option('--codex-only', 'Write to AGENTS.md only, skip Claude install')
  .addHelpText(
    'after',
    `
Examples:
  skills install selfedu/learning-ai-product
  skills install selfedu/learning-ai-product --global
  skills install --group selfedu
  skills install --group selfedu --codex
  skills install selfedu/learning-product-reviewer --codex-only
  skills install  # installs everything
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
  .description('Show description and first lines of a skill')
  .action((id) => {
    const { getSkillContent } = require('../src/registry');
    const skill = getSkillContent(id);
    if (!skill) {
      console.error(`Skill "${id}" not found. Run "skills list" to see available skills.`);
      process.exit(1);
    }
    // Extract frontmatter description
    const match = skill.content.match(/^---\n([\s\S]*?)\n---/);
    if (match) {
      console.log(`\n[${skill.id}]\n`);
      console.log(match[1].trim());
    } else {
      console.log(skill.content.slice(0, 500));
    }
  });

program.parse(process.argv);
