import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.NODE_ENV = 'production';

async function prerender() {
  console.log('[SSG] Starting static generation for PILOT (https://pilot.egykode.com/)...');

  const distHtmlPath = resolve('dist/index.html');
  const ssrBundleUrl = pathToFileURL(resolve('dist-ssr/entry-server.js')).href;

  const template = await readFile(distHtmlPath, 'utf8');
  const { render } = await import(ssrBundleUrl);

  const appHtml = render();

  if (!appHtml || typeof appHtml !== 'string' || appHtml.length < 5000) {
    throw new Error(`[SSG] Generated markup is suspiciously small or empty (length: ${appHtml?.length})`);
  }

  // Ensure primary technical engineering marketing content is genuinely present
  const requiredSnippets = [
    'FROM CODE',
    'TO CLOUD',
    'The Intelligent Cloud DevOps Compiler',
    'Give Pilot your code. It figures out the cloud.',
    'Architectural Invariants'
  ];

  for (const snippet of requiredSnippets) {
    if (!appHtml.includes(snippet)) {
      throw new Error(`[SSG] Generated markup is missing expected primary marketing content: "${snippet}"`);
    }
  }

  const finalHtml = template.replace('<!--app-html-->', appHtml);

  await writeFile(distHtmlPath, finalHtml, 'utf8');
  console.log(`[SSG] Successfully pre-rendered dist/index.html (rendered markup: ${appHtml.length.toLocaleString()} bytes, final HTML: ${finalHtml.length.toLocaleString()} bytes).`);

  // Update sitemap.xml with canonical English-first route and substantive lastmod date
  const substantiveDate = '2026-10-21';
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pilot.egykode.com/</loc>
    <lastmod>${substantiveDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  await writeFile(resolve('dist/sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(resolve('public/sitemap.xml'), sitemapXml, 'utf8');
  console.log(`[SSG] Preserved canonical sitemap with substantive lastmod (${substantiveDate}).`);
}

prerender().catch((err) => {
  console.error('[SSG] Prerendering failed:', err);
  process.exit(1);
});
