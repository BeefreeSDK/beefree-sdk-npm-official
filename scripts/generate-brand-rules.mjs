import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { compile, DEFAULT_OPTIONS } from 'json-schema-to-typescript'

export async function generateBrandRules({
  schemaPath = new URL('../schemas/brandRules.schema.json', import.meta.url),
  outputPath = new URL('../src/types/brandRules.ts', import.meta.url),
  check = false,
} = {}) {
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'))
  const types = await compile({ ...schema, title: 'BrandRules' }, 'BrandRules', {
    bannerComment: '/* ---- brandRules.schema.json ---- */\n',
    style: { singleQuote: true, semi: false },
  })
  const generated = `${DEFAULT_OPTIONS.bannerComment}\n\n${types}`
  if (check) {
    if (await readFile(outputPath, 'utf8') !== generated) {
      throw new Error('Brand Rules types are out of date. Run yarn generate:brand-rules.')
    }
  } else {
    await writeFile(outputPath, generated)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateBrandRules({ check: process.argv.includes('--check') }).catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}
