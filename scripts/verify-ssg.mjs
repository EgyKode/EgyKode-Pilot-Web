import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

async function verify() {
  console.log('[TEST] Starting automated verification for PILOT SSG build...');
  let failed = false;

  function assert(condition, message) {
    if (!condition) {
      console.error(`[TEST FAIL] ${message}`);
      failed = true;
    } else {
      console.log(`[TEST PASS] ${message}`);
    }
  }

  // 1. Production HTML file checks
  const htmlPath = resolve('dist/index.html');
  await access(htmlPath);
  const html = await readFile(htmlPath, 'utf8');

  assert(html.length > 25000, `Production HTML output is substantial (${html.length.toLocaleString()} bytes > 25KB)`);
  assert(html.includes('lang="en"'), 'HTML specifies lang="en"');
  assert(html.includes('dir="ltr"'), 'HTML specifies dir="ltr"');
  assert(html.includes('<title>EgyKode Pilot — From Code to Cloud | The Intelligent Cloud DevOps Generator</title>'), 'HTML contains correct English title');
  assert(html.includes('<link rel="canonical" href="https://pilot.egykode.com/" />'), 'HTML has canonical URL pointing to https://pilot.egykode.com/');
  assert(!html.includes('hreflang="ar"'), 'HTML correctly does NOT include Arabic hreflang (English-first product)');

  // 2. Component Tree Inside #root
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<noscript>/);
  assert(rootMatch && rootMatch[1].length > 20000, `#root contains authentic pre-rendered React component markup (${rootMatch?.[1]?.length?.toLocaleString()} bytes)`);

  // 3. Technical Engineering Content Assertions
  assert(html.includes('FROM CODE') && html.includes('TO CLOUD'), 'HTML contains primary H1 "FROM CODE TO CLOUD."');
  assert(html.includes('The Intelligent Cloud DevOps Generator'), 'HTML contains category pill "The Intelligent Cloud DevOps Generator"');
  assert(html.includes('Give Pilot your code. It figures out the cloud.'), 'HTML contains core value proposition');
  assert(html.includes('Local by default') && html.includes('Deterministic rules'), 'HTML contains architectural invariants');
  assert(html.includes('id="magic-moment"') || html.includes('id="story"'), 'HTML contains continuous narrative section anchors');

  // 4. Anti-Cloaking & Anti-Crawler-Shell Verification
  assert(!rootMatch?.[1]?.includes('class="sr-only"'), '#root does NOT contain hidden sr-only crawler shells');

  // 5. Sitemap Validation
  const sitemapPath = resolve('dist/sitemap.xml');
  await access(sitemapPath);
  const sitemap = await readFile(sitemapPath, 'utf8');
  assert(sitemap.includes('<loc>https://pilot.egykode.com/</loc>'), 'Sitemap contains canonical URL https://pilot.egykode.com/');
  assert(sitemap.includes('<lastmod>2026-10-21</lastmod>'), 'Sitemap preserves substantive lastmod date (2026-10-21)');
  assert(!sitemap.includes('/ar/'), 'Sitemap does not include nonexistent Arabic routes');

  // 6. Robots.txt Validation
  const robotsPath = resolve('dist/robots.txt');
  await access(robotsPath);
  const robots = await readFile(robotsPath, 'utf8');
  assert(robots.includes('Sitemap: https://pilot.egykode.com/sitemap.xml'), 'robots.txt references sitemap correctly');

  if (failed) {
    console.error('\n[TEST FAILED] One or more PILOT SSG verification assertions failed.');
    process.exit(1);
  } else {
    console.log('\n[TEST PASS] All PILOT SSG verification checks passed successfully!');
  }
}

verify().catch((err) => {
  console.error('[TEST ERROR]', err);
  process.exit(1);
});
