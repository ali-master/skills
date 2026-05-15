#!/usr/bin/env bun

const ROOT = `${import.meta.dir}/..`
const SKILLS_DIR = `${ROOT}/skills`
const README_PATH = `${ROOT}/README.md`
const START_MARKER = '<!-- skills:start -->'
const END_MARKER = '<!-- skills:end -->'

type Skill = {
  slug: string
  name: string
  description: string
  path: string
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  const out: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[m[1]] = value
  }
  return out
}

function escapeCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

async function collectSkills(): Promise<Skill[]> {
  // Recursive: matches `<skill>/SKILL.md` and nested sub-skills
  // like `<skill>/<sub>/SKILL.md`, `<skill>/<sub>/<deeper>/SKILL.md`, etc.
  const glob = new Bun.Glob('**/SKILL.md')
  const skills: Skill[] = []

  for await (const relPath of glob.scan({ cwd: SKILLS_DIR, onlyFiles: true })) {
    // slug is the directory path of this SKILL.md, e.g.:
    //   better-notify/SKILL.md           -> better-notify
    //   better-notify/setup/SKILL.md     -> better-notify/setup
    const slug = relPath.slice(0, -'/SKILL.md'.length)
    const content = await Bun.file(`${SKILLS_DIR}/${relPath}`).text()
    const fm = parseFrontmatter(content)
    skills.push({
      slug,
      name: fm.name || slug,
      description: fm.description || '',
      path: `skills/${relPath}`,
    })
  }

  return skills.sort((a, b) => a.slug.localeCompare(b.slug))
}

function renderTable(skills: Skill[]): string {
  const rows = skills.map((s) => {
    const link = `[\`${s.slug}\`](${s.path})`
    return `| ${link} | ${escapeCell(s.name)} | ${escapeCell(s.description)} |`
  })

  return [
    `> ${skills.length} skills available. Run \`bun run scripts/generate-skills-table.ts\` to regenerate.`,
    '',
    '| Skill | Name | Description |',
    '| ----- | ---- | ----------- |',
    ...rows,
  ].join('\n')
}

async function updateReadme(table: string): Promise<void> {
  const readme = await Bun.file(README_PATH).text()
  const startIdx = readme.indexOf(START_MARKER)
  const endIdx = readme.indexOf(END_MARKER)

  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`README.md is missing ${START_MARKER} / ${END_MARKER} markers.`)
  }

  const before = readme.slice(0, startIdx + START_MARKER.length)
  const after = readme.slice(endIdx)
  const next = `${before}\n\n${table}\n\n${after}`

  if (next !== readme) {
    await Bun.write(README_PATH, next)
  }
}

const skills = await collectSkills()
const table = renderTable(skills)
await updateReadme(table)

console.log(`Updated README with ${skills.length} skills.`)
