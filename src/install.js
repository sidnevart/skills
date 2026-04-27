const fs = require('fs');
const path = require('path');
const os = require('os');
const { getSkillContent, getSkillsByPrefix, getAllSkills } = require('./registry');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function installClaude(skill, skillsDir) {
  const dest = path.join(skillsDir, skill.name, 'SKILL.md');
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, skill.content, 'utf8');
  return dest;
}

function installCodex(skill, projectDir) {
  const agentsFile = path.join(projectDir, 'AGENTS.md');
  const marker = `<!-- skill:${skill.id} -->`;
  const block = `\n\n${marker}\n${skill.content}`;

  if (fs.existsSync(agentsFile)) {
    let content = fs.readFileSync(agentsFile, 'utf8');
    if (content.includes(marker)) {
      const start = content.indexOf(marker);
      const nextMarker = content.indexOf('\n<!-- skill:', start + marker.length);
      const before = content.slice(0, start - 2);
      const after = nextMarker === -1 ? '' : content.slice(nextMarker);
      content = before + block + after;
    } else {
      content += block;
    }
    fs.writeFileSync(agentsFile, content, 'utf8');
  } else {
    fs.writeFileSync(agentsFile, `# Agent Skills\n${block}`, 'utf8');
  }

  return agentsFile;
}

function resolveSkills({ ids, group }) {
  if (group) {
    const skills = getSkillsByPrefix(group);
    if (skills.length === 0) {
      console.error(`No skills found for group/prefix "${group}". Run "skills list" to see available skills.`);
      process.exit(1);
    }
    return skills.map((s) => getSkillContent(s.id)).filter(Boolean);
  }
  if (ids && ids.length > 0) {
    return ids.map((id) => {
      const s = getSkillContent(id);
      if (!s) {
        console.error(`Skill "${id}" not found. Run "skills list" to see available skills.`);
        process.exit(1);
      }
      return s;
    });
  }
  return getAllSkills()
    .map((s) => getSkillContent(s.id))
    .filter(Boolean);
}

function install(opts) {
  const { ids, group, global: isGlobal, codex, codexOnly } = opts;
  const projectDir = process.cwd();

  const claudeDir = isGlobal
    ? path.join(os.homedir(), '.claude', 'skills')
    : path.join(projectDir, '.claude', 'skills');

  const skills = resolveSkills({ ids, group });

  if (skills.length === 0) {
    console.error('No skills matched. Run "skills list" to see available skills.');
    process.exit(1);
  }

  for (const skill of skills) {
    if (!codexOnly) {
      const dest = installClaude(skill, claudeDir);
      const scope = isGlobal ? 'global' : 'project';
      console.log(`[claude/${scope}] ${skill.id}  →  ${dest}`);
    }

    if (codex || codexOnly) {
      const dest = installCodex(skill, projectDir);
      console.log(`[codex]           ${skill.id}  →  ${dest}`);
    }
  }

  console.log(`\nInstalled ${skills.length} skill(s).`);
}

module.exports = { install };
