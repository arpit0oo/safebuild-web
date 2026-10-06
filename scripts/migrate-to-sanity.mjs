// Migrate local JSON content (safebuild-categories/, safebuild-products/) to Sanity.
//
//   node scripts/migrate-to-sanity.mjs          -> DRY RUN (default, writes nothing)
//   node scripts/migrate-to-sanity.mjs --live   -> creates documents in Sanity
//
// Categories are migrated first, then products.
// All products/categories are created with isPublished: false.

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const LIVE = process.argv.includes('--live');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CATEGORIES_DIR = path.join(ROOT, 'safebuild-categories');
const PRODUCTS_DIR = path.join(ROOT, 'safebuild-products');

const PROJECT_ID = '5vqxh570';
const DATASET = 'production';

// Fields that are intentionally NOT migrated
const SKIP_FIELDS = new Set(['skyhawkImageUrl', 'contentStatus', 'imageStatus', 'productCount']);

// ── 1. Load env vars from .env.local (manual parse, no dotenv dependency) ──
function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  const env = {};
  if (!existsSync(envPath)) return env;
  for (const rawLine of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const env = loadEnvLocal();
const token = env.SANITY_API_TOKEN;
const hasRealToken = Boolean(token) && !token.startsWith('placeholder');

if (LIVE && !hasRealToken) {
  console.error('❌ --live requires a real SANITY_API_TOKEN in .env.local');
  process.exit(1);
}

// ── 2. Init Sanity client ───────────────────────────────────
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: hasRealToken ? token : undefined,
});

// ── Helpers ─────────────────────────────────────────────────

// Remove keys whose value is undefined (JSON would drop them anyway; this keeps logs clean)
function stripUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

// Sanity requires a unique _key on every object inside an array
function withKeys(items, prefix) {
  return items.map((item, i) => ({ _key: `${prefix}-${i}`, ...item }));
}

// Record<string,string> -> [{ key, value }]
function recordToPairs(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return [];
  return Object.entries(record).map(([key, value]) => ({ key, value: String(value) }));
}

function convertSections(sections, slug) {
  if (!Array.isArray(sections)) return [];
  return sections.map((section, i) => {
    const base = { _key: `section-${i}`, title: section.title, type: section.type };
    switch (section.type) {
      case 'bullets':
        return stripUndefined({
          ...base,
          bullets: Array.isArray(section.content) ? section.content : [],
          text: undefined,
          tableRows: undefined,
        });
      case 'text':
        return stripUndefined({
          ...base,
          bullets: undefined,
          text: typeof section.content === 'string' ? section.content : '',
          tableRows: undefined,
        });
      case 'table': {
        // content is Record<string,string>; tolerate an already-paired array too
        const pairs = Array.isArray(section.content)
          ? section.content.map(({ key, value }) => ({ key, value: String(value) }))
          : recordToPairs(section.content);
        return stripUndefined({
          ...base,
          bullets: undefined,
          text: undefined,
          tableRows: withKeys(pairs, `section-${i}-row`),
        });
      }
      default:
        console.warn(`  ⚠️  ${slug}: unknown section type "${section.type}" ("${section.title}") — kept title/type only`);
        return base;
    }
  });
}

function toSlug(slug) {
  return { _type: 'slug', current: slug };
}

function convertCategory(data) {
  const doc = {
    _type: 'category',
    name: data.name,
    slug: toSlug(data.slug),
    description: data.description,
    features: data.features ?? [],
    isPublished: false,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    seoKeywords: data.seoKeywords,
    // image: skipped — added via Studio later
  };
  return stripUndefined(doc);
}

function convertProduct(data) {
  const specsPairs = recordToPairs(data.specs);
  const doc = {
    _type: 'product',
    name: data.name,
    slug: toSlug(data.slug),
    category: data.category,
    categoryName: data.categoryName,
    tagline: data.tagline,
    description: data.description,
    shortDescription: data.shortDescription || (data.description ? data.description.slice(0, 100) : undefined),
    order: typeof data.order === 'number' ? data.order : 0,
    isFeatured: Boolean(data.isFeatured),
    isPublished: false,
    skyhawkUrl: data.skyhawkUrl || undefined,
    features: data.features ?? [],
    specs: withKeys(specsPairs, 'spec'),
    sections: convertSections(data.sections, data.slug),
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    seoKeywords: data.seoKeywords,
    // image: skipped — added via Studio later
  };
  return stripUndefined(doc);
}

// Fetch all existing slugs of a type in one read-only query
async function fetchExistingSlugs(type) {
  if (!hasRealToken) {
    console.warn(`  ⚠️  No real token — cannot check existing "${type}" documents (duplicate check skipped)`);
    return new Set();
  }
  const slugs = await client.fetch(`*[_type == $type].slug.current`, { type });
  return new Set(slugs.filter(Boolean));
}

function readJsonDir(dir, { excludeIndex = false } = {}) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.json'))
    .filter((e) => !(excludeIndex && e.name === '_index.json'))
    .map((e) => ({
      file: e.name,
      data: JSON.parse(readFileSync(path.join(dir, e.name), 'utf8')),
    }));
}

// Generic migrate loop for one document type
async function migrate(label, type, files, convert) {
  console.log(`\n── ${label} (${files.length}) ${'─'.repeat(40)}`);
  const existing = await fetchExistingSlugs(type);
  const result = { succeeded: 0, skipped: 0, failed: 0 };

  for (const { file, data } of files) {
    const slug = data.slug;
    try {
      if (!slug) throw new Error(`missing slug in ${file}`);

      if (existing.has(slug)) {
        console.log(`  ⏭️  SKIP (already exists): ${slug}`);
        result.skipped++;
        continue;
      }

      const doc = convert(data);

      if (!LIVE) {
        console.log(`  🔍 WOULD CREATE ${type}: ${slug}`);
        result.succeeded++;
        continue;
      }

      await client.create(doc);
      existing.add(slug);
      console.log(`  ✅ Created ${type}: ${slug}`);
      result.succeeded++;
    } catch (err) {
      console.error(`  ❌ FAILED ${type}: ${slug ?? file} — ${err.message}`);
      result.failed++;
    }
  }
  return result;
}

// ── Main ────────────────────────────────────────────────────
console.log(LIVE ? '🚀 LIVE MODE — documents WILL be created in Sanity' : '🧪 DRY RUN — nothing will be written to Sanity');
console.log(`   Project: ${PROJECT_ID}  Dataset: ${DATASET}`);

// 3 & 4. Read local JSON
const categoryFiles = readJsonDir(CATEGORIES_DIR);
const productFiles = readJsonDir(PRODUCTS_DIR, { excludeIndex: true });
console.log(`   Found ${categoryFiles.length} categories, ${productFiles.length} products`);

// 5 & 6. Categories first, then products
const catResult = await migrate('Categories', 'category', categoryFiles, convertCategory);
const prodResult = await migrate('Products', 'product', productFiles, convertProduct);

// 7. Summary
const verb = LIVE ? 'succeeded' : 'would succeed';
console.log('\n══════════════ SUMMARY ══════════════');
console.log(`Categories: ${catResult.succeeded} ${verb}, ${catResult.skipped} skipped, ${catResult.failed} failed`);
console.log(`Products:   ${prodResult.succeeded} ${verb}, ${prodResult.skipped} skipped, ${prodResult.failed} failed`);
console.log(
  `TOTAL:      ${catResult.succeeded + prodResult.succeeded} ${verb}, ` +
    `${catResult.skipped + prodResult.skipped} skipped, ` +
    `${catResult.failed + prodResult.failed} failed`
);
if (!LIVE) console.log('\nThis was a dry run. Re-run with --live to create documents.');

if (catResult.failed + prodResult.failed > 0) process.exit(1);
