# Authoring Guide

Use this guide when adding, reviewing, or updating skills.

## Skill shape

Every skill lives in its own directory and exposes one entry file:

```text
skills/example-skill/
└── SKILL.md
```

The file starts with frontmatter:

```md
---
name: Example Skill
description: Short task-focused description of when to use this skill.
---
```

## Naming rules

- The `name` field must be 64 characters or fewer.
- Use names that agents can match from natural user requests.
- Prefer product-first naming, such as `oRPC Next.js Adapter` or `better-notify/setup`.
- Keep folder names lowercase and hyphenated unless a nested package convention is clearer.

## Writing style

- Start with what the skill helps the agent do.
- Include exact package names, imports, commands, and integration names.
- Keep examples copy-ready and minimal.
- Link to sibling skills when the task naturally branches.
- Avoid broad background material that does not change the agent's next action.

## Scope

A good skill answers one focused class of task. Split a skill when:

- It mixes setup, troubleshooting, and advanced best practices.
- It covers unrelated adapters or integrations.
- Loading it would add a lot of context that many requests do not need.

Keep a skill together when:

- The concepts are almost always needed in one workflow.
- Splitting would force agents to chase links for basic usage.
- The skill remains readable and task-oriented.

## Maintenance checklist

Before opening a change:

- Confirm every edited `SKILL.md` has `name` and `description` frontmatter.
- Confirm every `name` is 64 characters or fewer.
- Check links to sibling skills and docs.
- Make examples match current package names and APIs.
- Keep unrelated formatting churn out of the diff.

Use this local check for name length:

```sh
node - <<'NODE'
const fs = require('fs')
const path = require('path')
const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name === 'SKILL.md') files.push(full)
  }
}
walk('skills')
let failed = false
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const name = text.match(/^name:\s*(.+)$/m)?.[1]?.trim()
  const description = text.match(/^description:\s*(.+)$/m)?.[1]?.trim()
  if (!name || !description) {
    failed = true
    console.error(`Missing frontmatter in ${file}`)
  }
  if (name && name.length > 64) {
    failed = true
    console.error(`Name too long (${name.length}): ${file}`)
  }
}
process.exit(failed ? 1 : 0)
NODE
```

## Documentation updates

When adding capabilities, update:

- [`README.md`](../README.md) if the top-level positioning changes.
- [`docs/skill-catalog.md`](skill-catalog.md) when a skill is added, removed, or renamed.
- [`docs/usage.md`](usage.md) when install, discovery, or workflow guidance changes.
