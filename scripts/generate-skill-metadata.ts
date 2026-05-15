#!/usr/bin/env bun
/**
 * Adds `license` and `metadata.version` to every SKILL.md frontmatter and
 * writes a sibling `metadata.json` with version, organization, date,
 * abstract, and references (URLs extracted from the SKILL.md body).
 *
 * Idempotent for frontmatter inserts. The `metadata.json` file is always
 * regenerated so the catalog stays in sync with SKILL.md content.
 *
 * Usage: bun run scripts/generate-skill-metadata.ts
 */

const ROOT = `${import.meta.dir}/..`
const SKILLS_DIR = `${ROOT}/skills`

const ORGANIZATION = 'Ali Torki'
const DATE = 'May 2026'
const VERSION = '1.0.0'
const LICENSE = 'MIT'

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/
const URL_RE = /https?:\/\/[^\s)>"'`\]]+/g
const TRAILING_PUNCT_RE = /[.,;:!?)\]>'"`]+$/

function parseFrontmatter(text: string) {
  const match = text.match(FRONTMATTER_RE)
  if (!match) return null
  const block = match[1]!
  const body = text.slice(match[0].length).replace(/^\r?\n/, '')
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? ''
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? ''
  return { block, body, name, description }
}

function ensureLicense(block: string): { block: string; added: boolean } {
  if (/^license\s*:/m.test(block)) return { block, added: false }
  const lines = block.split(/\r?\n/)
  const descIdx = lines.findIndex(l => /^description\s*:/.test(l))
  const nameIdx = lines.findIndex(l => /^name\s*:/.test(l))
  const insertAfter = descIdx !== -1 ? descIdx : nameIdx !== -1 ? nameIdx : 0
  lines.splice(insertAfter + 1, 0, `license: ${LICENSE}`)
  return { block: lines.join('\n'), added: true }
}

function ensureVersion(block: string): { block: string; added: boolean } {
  if (/^\s+version\s*:/m.test(block)) return { block, added: false }
  const lines = block.split(/\r?\n/)
  const metaIdx = lines.findIndex(l => /^metadata\s*:/.test(l))
  if (metaIdx === -1) {
    lines.push('metadata:', `  version: "${VERSION}"`)
    return { block: lines.join('\n'), added: true }
  }
  let insertAt = lines.length
  for (let i = metaIdx + 1; i < lines.length; i++) {
    const line = lines[i]!
    if (line.length > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
      insertAt = i
      break
    }
  }
  lines.splice(insertAt, 0, `  version: "${VERSION}"`)
  return { block: lines.join('\n'), added: true }
}

function extractFirstParagraph(body: string): string {
  const lines = body.split(/\r?\n/)
  let inCodeBlock = false
  const paraLines: string[] = []
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      if (paraLines.length > 0) break
      continue
    }
    if (inCodeBlock) continue
    if (line.startsWith('#')) {
      if (paraLines.length > 0) break
      continue
    }
    if (/^(\s*[-*]\s|\s*\d+\.\s|\s*>)/.test(line)) {
      if (paraLines.length > 0) break
      continue
    }
    if (line.trim() === '') {
      if (paraLines.length > 0) break
      continue
    }
    paraLines.push(line.trim())
  }
  return paraLines.join(' ').trim()
}

function buildAbstract(description: string, firstParagraph: string): string {
  if (!firstParagraph) return description
  const descHead = description.toLowerCase().slice(0, 30)
  if (descHead && firstParagraph.toLowerCase().startsWith(descHead)) {
    return firstParagraph
  }
  return `${description} ${firstParagraph}`.trim()
}

const PLACEHOLDER_HOSTS = new Set([
  'localhost',
  '0.0.0.0',
  '[::1]',
  'example.com',
  'example.org',
  'example.net',
])

function isPlaceholderHost(host: string): boolean {
  if (PLACEHOLDER_HOSTS.has(host)) return true
  if (/^127\.\d+\.\d+\.\d+$/.test(host)) return true
  if (
    host.endsWith('.example.com') ||
    host.endsWith('.example.org') ||
    host.endsWith('.example.net')
  ) {
    return true
  }
  return false
}

function extractReferences(text: string): string[] {
  const matches = text.match(URL_RE) ?? []
  const cleaned: string[] = []
  for (const raw of matches) {
    if (/\.{3,}$/.test(raw)) continue
    const stripped = raw.replace(TRAILING_PUNCT_RE, '')
    if (stripped.toLowerCase().endsWith('skill.md')) continue
    if (/^https?:\/\/(www\.)?github\.com\/ali-master(\/|$)/i.test(stripped)) continue
    try {
      const parsed = new URL(stripped)
      const host = parsed.hostname.toLowerCase()
      if (!host || isPlaceholderHost(host)) continue
    } catch {
      continue
    }
    cleaned.push(stripped)
  }
  return [...new Set(cleaned)].sort()
}

let frontmatterUpdated = 0
let metadataWritten = 0
let skipped = 0

const glob = new Bun.Glob('**/SKILL.md')

for await (const relPath of glob.scan({ cwd: SKILLS_DIR, onlyFiles: true })) {
  const filePath = `${SKILLS_DIR}/${relPath}`
  const original = await Bun.file(filePath).text()
  const parsed = parseFrontmatter(original)

  if (!parsed) {
    console.warn(`! skipped (no frontmatter): ${relPath}`)
    skipped++
    continue
  }

  let block = parsed.block
  const licenseResult = ensureLicense(block)
  block = licenseResult.block
  const versionResult = ensureVersion(block)
  block = versionResult.block

  if (licenseResult.added || versionResult.added) {
    const next = original.replace(FRONTMATTER_RE, `---\n${block}\n---`)
    await Bun.write(filePath, next)
    frontmatterUpdated++
  }

  const skillDir = filePath.replace(/\/SKILL\.md$/, '')
  const metadataPath = `${skillDir}/metadata.json`

  const abstract = buildAbstract(
    parsed.description,
    extractFirstParagraph(parsed.body),
  )
  const references = extractReferences(original)

  const payload = {
    version: VERSION,
    organization: ORGANIZATION,
    date: DATE,
    abstract,
    references,
  }

  await Bun.write(metadataPath, `${JSON.stringify(payload, null, 2)}\n`)
  metadataWritten++
}

console.log(`Frontmatter updated: ${frontmatterUpdated}`)
console.log(`metadata.json written: ${metadataWritten}`)
console.log(`Skipped: ${skipped}`)
