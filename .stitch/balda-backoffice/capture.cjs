const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { chromium } = createRequire(path.resolve(process.argv[2], 'package.json'))('playwright');
const root = __dirname;
const rows = JSON.parse(fs.readFileSync(path.join(root, 'qa/routes.json')));
const pages = new Map(rows.map(row => [row.Route, row]));
const origin = 'http://balda-qa.local';
async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      if (pages.has(url.pathname)) {
        const row = pages.get(url.pathname);
        return route.fulfill({ path: path.join(root, 'qa', row.File), contentType: 'text/html', status: row.Status });
      }
      const file = path.join(root, url.pathname);
      if (url.pathname.startsWith('/assets/') && fs.existsSync(file)) return route.fulfill({path:file});
      return route.abort();
    });
    fs.mkdirSync(path.join(root, 'screens'), { recursive: true });
    for (const row of rows) {
      await page.goto(origin + row.Route, {waitUntil:'load'});
      await page.locator('main').first().waitFor({state:'attached'});
      const html = await page.evaluate(async () => {
        await document.fonts.ready;
        const copy = document.documentElement.cloneNode(true);
        for (const link of copy.querySelectorAll('link[rel="stylesheet"]')) {
          const res = await fetch(link.href);
          if (!res.ok) throw Error(link.href);
          const style = document.createElement('style');
          style.textContent = await res.text();
          link.replaceWith(style);
        }
        for (const node of copy.querySelectorAll('img[src],link[rel="icon"]')) {
          const key = node.tagName === 'IMG' ? 'src' : 'href';
          const blob = await (await fetch(node[key])).blob();
          node[key] = await new Promise((resolve, reject) => {
            const reader = new FileReader(); reader.onload = () => resolve(reader.result);
            reader.onerror = reject; reader.readAsDataURL(blob);
          });
        }
        copy.querySelectorAll('script').forEach(s => s.remove());
        return '<!doctype html>\n'+copy.outerHTML;
      });
      fs.writeFileSync(path.join(root, 'screens', row.File), html);
    }
    console.log('Captured', rows.length, 'QA routes with Playwright');
  } finally { await browser.close(); }
}
main().catch(err => { console.error(err); process.exitCode = 1; });
