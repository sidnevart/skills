const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..', 'skills');

// Walk the skills tree recursively.
// A directory is a skill if it directly contains SKILL.md.
// Otherwise descend into subdirectories.
function findSkills(dir, prefix) {
  const result = [];
  if (!fs.existsSync(dir)) return result;

  for (const entry of fs.readdirSync(dir).sort()) {
    const entryPath = path.join(dir, entry);
    if (!fs.statSync(entryPath).isDirectory()) continue;

    const skillFile = path.join(entryPath, 'SKILL.md');
    const id = prefix ? `${prefix}/${entry}` : entry;

    if (fs.existsSync(skillFile)) {
      result.push({ name: entry, group: prefix || '', id, skillPath: skillFile });
    } else {
      result.push(...findSkills(entryPath, id));
    }
  }
  return result;
}

function getAllSkills() {
  return findSkills(SKILLS_ROOT, '');
}

// Resolve a skill by full ID (e.g. "superpowers/planning/brainstorming")
// or by bare name (e.g. "brainstorming") — returns first match.
function resolveSkill(id) {
  const all = getAllSkills();
  return all.find((s) => s.id === id || s.name === id) || null;
}

function getSkillContent(id) {
  const skill = resolveSkill(id);
  if (!skill) return null;
  return { ...skill, content: fs.readFileSync(skill.skillPath, 'utf8') };
}

// Return all skills whose ID starts with the given prefix (group/subgroup support).
function getSkillsByPrefix(prefix) {
  return getAllSkills().filter((s) => s.id === prefix || s.id.startsWith(prefix + '/'));
}

// Return all top-level group names (first path segment).
function getTopGroups() {
  const groups = new Set(getAllSkills().map((s) => s.id.split('/')[0]));
  return [...groups].sort();
}

module.exports = { getAllSkills, resolveSkill, getSkillContent, getSkillsByPrefix, getTopGroups };
