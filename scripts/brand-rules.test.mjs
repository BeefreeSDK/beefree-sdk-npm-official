import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { generateBrandRules } from './generate-brand-rules.mjs'

const schemaPath = new URL('../schemas/brandRules.schema.json', import.meta.url)
const committedTypes = new URL('../src/types/brandRules.ts', import.meta.url)

test('generates the existing public types from the bundled schema', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'brand-rules-'))
  try {
    const outputPath = join(directory, 'brandRules.ts')
    await generateBrandRules({ schemaPath, outputPath })
    assert.equal(await readFile(outputPath, 'utf8'), await readFile(committedTypes, 'utf8'))
    await generateBrandRules({ schemaPath, outputPath, check: true })
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('check rejects stale types without overwriting them', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'brand-rules-'))
  try {
    const outputPath = join(directory, 'brandRules.ts')
    await writeFile(outputPath, 'stale types\n')
    await assert.rejects(generateBrandRules({ schemaPath, outputPath, check: true }), /out of date/)
    assert.equal(await readFile(outputPath, 'utf8'), 'stale types\n')
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('package includes the public schema', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.ok(manifest.files.includes('schemas/brandRules.schema.json'))
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'))
  assert.equal(schema.type, 'object')
})
