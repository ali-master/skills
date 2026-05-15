#!/usr/bin/env bun
/**
 * Adds the standard `metadata` block (author + homepage) to every
 * `skills/*\/SKILL.md` frontmatter. Files that already have a
 * `metadata:` key are left untouched so existing values are preserved.
 *
 * Usage: bun run scripts/add-skill-metadata.ts
 */

const ROOT = `${import.meta.dir}/..`
const SKILLS_DIR = `${ROOT}/skills`

const METADATA_BLOCK = [
  'metadata:',
  '  author: Ali Torki',
  '  homepage: https://github.com/ali-master',
].join('\n')

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/

let updated = 0
let skipped = 0

// Recursive — also walks into nested sub-skills like `<skill>/<sub>/SKILL.md`.
const glob = new Bun.Glob('**/SKILL.md')

for await (const relPath of glob.scan({ cwd: SKILLS_DIR, onlyFiles: true })) {
  const filePath = `${SKILLS_DIR}/${relPath}`
  const original = await Bun.file(filePath).text()
  const match = original.match(FRONTMATTER_RE)

  if (!match) {
    console.warn(`! skipped (no frontmatter): ${relPath}`)
    skipped++
    continue
  }

  const block = match[1]!
  if (/^metadata\s*:/m.test(block)) {
    skipped++
    continue
  }

  const newBlock = `${block.replace(/\s+$/, '')}\n${METADATA_BLOCK}`
  const next = original.replace(FRONTMATTER_RE, `---\n${newBlock}\n---`)

  await Bun.write(filePath, next)
  updated++
}

console.log(`Updated ${updated} files. Skipped ${skipped}.`)
