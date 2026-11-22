const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(process.env.SITE_ROOT || 'public');
const siteBase = new URL(process.env.SITE_BASE_URL || 'https://fellowshipoftheflux.com/');
const allowedHosts = new Set([siteBase.host, 'localhost', '127.0.0.1']);
const htmlFiles = [];
const anchorCache = new Map();

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (entry.isFile() && filename.endsWith('.html')) htmlFiles.push(filename);
  }
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function attributeValue(match) {
  return decodeEntities(match[1] ?? match[2] ?? match[3] ?? '');
}

function pageUrl(filename) {
  let relative = path.relative(siteRoot, filename).split(path.sep).join('/');
  if (relative === 'index.html') relative = '';
  else if (relative.endsWith('/index.html')) relative = relative.slice(0, -'index.html'.length);
  return new URL(relative, siteBase);
}

function candidatesFor(url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { pathname = url.pathname; }
  const target = path.resolve(siteRoot, `.${pathname}`);
  if (target !== siteRoot && !target.startsWith(`${siteRoot}${path.sep}`)) return [];
  if (pathname.endsWith('/')) return [path.join(target, 'index.html')];
  if (path.extname(pathname)) return [target];
  return [path.join(target, 'index.html'), `${target}.html`];
}

function anchorsIn(filename) {
  if (anchorCache.has(filename)) return anchorCache.get(filename);
  const source = fs.readFileSync(filename, 'utf8');
  const anchors = new Set();
  const pattern = /\b(?:id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of source.matchAll(pattern)) anchors.add(decodeEntities(attributeValue(match)));
  anchorCache.set(filename, anchors);
  return anchors;
}

if (!fs.existsSync(siteRoot)) {
  console.error(`Site directory not found: ${siteRoot}`);
  process.exit(1);
}

walk(siteRoot);
const failures = [];
const referencePattern = /\b(href|src|action|poster|data|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

for (const filename of htmlFiles) {
  const source = fs.readFileSync(filename, 'utf8');
  const owner = pageUrl(filename);
  for (const match of source.matchAll(referencePattern)) {
    const attribute = match[1].toLowerCase();
    const raw = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
    const values = attribute === 'srcset' ? raw.split(',').map(item => item.trim().split(/\s+/)[0]) : [raw];
    for (const value of values) {
      if (!value || value.startsWith('#')) {
        if (value.length > 1) {
          const fragment = decodeURIComponent(value.slice(1));
          if (!anchorsIn(filename).has(fragment)) failures.push(`${path.relative(siteRoot, filename)} -> #${fragment} (missing fragment)`);
        }
        continue;
      }
      let url;
      try { url = new URL(value, owner); } catch {
        failures.push(`${path.relative(siteRoot, filename)} -> ${value} (invalid URL)`);
        continue;
      }
      if (!['http:', 'https:'].includes(url.protocol) || !allowedHosts.has(url.host)) continue;
      const candidates = candidatesFor(url);
      const target = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (!target) {
        failures.push(`${path.relative(siteRoot, filename)} -> ${url.pathname} (missing file)`);
      } else if (url.hash && target.endsWith('.html')) {
        let fragment;
        try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { fragment = url.hash.slice(1); }
        if (fragment && !anchorsIn(target).has(fragment)) {
          failures.push(`${path.relative(siteRoot, filename)} -> ${url.pathname}#${fragment} (missing fragment)`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal reference(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files: all local links, assets and fragments resolve.`);
