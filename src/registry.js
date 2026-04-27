const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.join(__dirname, '..', 'skills');

function getGroups() {
  if (!fs.existsSync(SKILLS_ROOT)) return [];
  return fs.readdirSync(SKILLS_ROOT).filter((f) => {
    return fs.statSync(path.join(SKILLS_ROOT, f)).isDirectory();
  });
}

function getSkillsInGroup(group) {
  const groupDir = path.join(SKILLS_ROOT, group);
  if (!fs.existsSync(groupDir)) return [];
  return fs.readdirSync(groupDir).filter((f) => {
    return fs.statSync(path.join(groupDir, f)).isDirectory();
  });
}

function getAllSkills() {
  const result = [];
  for (const group of getGroups()) {
    for (const name of getSkillsInGroup(group)) {
      result.push({ group, name, id: `${group}/${name}` });
    }
  }
  return result;
}

function resolveSkill(id) {
  const parts = id.split('/');
  if (parts.length === 2) {
    const [group, name] = parts;
    const skillPath = path.join(SKILLS_ROOT, group, name, 'SKILL.md');
    if (fs.existsSync(skillPath)) return { group, name, skillPath };
    return null;
  }
  // bare name — search all groups
  for (const group of getGroups()) {
    const skillPath = path.join(SKILLS_ROOT, group, id, 'SKILL.md');
    if (fs.existsSync(skillPath)) return { group, name: id, skillPath };
  }
  return null;
}

function getSkillContent(id) {
  const skill = resolveSkill(id);
  if (!skill) return null;
  return { ...skill, id: `${skill.group}/${skill.name}`, content: fs.readFileSync(skill.skillPath, 'utf8') };
}

module.exports = { getGroups, getSkillsInGroup, getAllSkills, resolveSkill, getSkillContent };
