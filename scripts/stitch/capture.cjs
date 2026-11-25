const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { createInterface } = require('node:readline');
const { createRequire } = require('node:module');
const { chromium } = createRequire(path.resolve(process.argv[2], 'package.json'))('playwright');
const workspace = path.resolve(__dirname, '../../.stitch/balda-backoffice');

async function capture(gallery) {
  await fs.mkdir(workspace, { recursive: true });
  const output = await fs.mkdtemp(path.join(workspace, 'capture-'));
  const screens = path.join(output, 'screens');
  await fs.mkdir(screens);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.route('**/*', route => new URL(route.request().url()).origin === gallery.origin
      ? route.continue() : route.abort());
    await page.goto(gallery.href);
    const links = await page.locator('.qa-screen-card a').evaluateAll(nodes => nodes.map(a => a.href));
    if (!links.length) throw new Error('QA gallery has no screen links');
    const rows = [];
    const routes = new Set([gallery.href, ...links]);
    const listed = new Set(routes);
    for (const href of routes) {
      const url = new URL(href);
      if (url.origin !== gallery.origin || !url.pathname.startsWith(gallery.pathname)) {
        throw new Error('Unexpected route in QA gallery: ' + url.pathname);
      }
      const response = await page.goto(href);
      if (!listed.has(href) && response.status() === 404) continue;
      await page.locator('main').first().waitFor({ state: 'attached' });
      // Detail screens may be linked from a gallery example rather than the index.
      for (const target of await page.locator('main a[href]').evaluateAll(nodes => nodes.map(a => a.href))) {
        const detail = new URL(target);
        if (detail.origin === gallery.origin && detail.pathname.startsWith(gallery.pathname)) {
          routes.add(detail.origin + detail.pathname);
        }
      }
      const html = await page.evaluate(async () => {
        await document.fonts.ready;
        const copy = document.documentElement.cloneNode(true);
        async function dataURL(url) {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Missing QA asset: ' + url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
        for (const link of copy.querySelectorAll('link[rel="stylesheet"]')) {
          const response = await fetch(link.href);
          if (!response.ok) throw new Error('Missing QA stylesheet: ' + link.href);
          let css = await response.text();
          for (const match of [...css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)]) {
            if (/^(data:|#)/.test(match[1])) continue;
            css = css.replace(match[0], 'url("' + await dataURL(new URL(match[1], link.href)) + '")');
          }
          const style = document.createElement('style');
          style.textContent = css;
          link.replaceWith(style);
        }
        for (const node of copy.querySelectorAll('img[src],link[rel="icon"]')) {
          const key = node.tagName === 'IMG' ? 'src' : 'href';
          node[key] = await dataURL(node[key]);
        }
        copy.querySelectorAll('script').forEach(s => s.remove());
        return '<!doctype html>\n' + copy.outerHTML;
      });
      const file = String(rows.length).padStart(3, '0') + '.html';
      await fs.writeFile(path.join(screens, file), html);
      rows.push({ Route: url.pathname + url.search, File: file, Status: response.status() });
    }
    await fs.writeFile(path.join(output, 'routes.json'), JSON.stringify(rows, null, 2));
    const pointer = path.join(output, 'current.tmp');
    await fs.writeFile(pointer, path.basename(output));
    await fs.rename(pointer, path.join(workspace, 'current'));
    console.log('Captured', rows.length, 'QA routes in', output);
  } finally {
    await browser.close();
  }
}

async function main() {
  const server = spawn(process.argv[3], ['backoffice', 'qa', 'serve', '--listen', '127.0.0.1:0'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  try {
    for await (const line of createInterface({ input: server.stdout })) {
      const match = /^Backoffice QA: (http:\/\/127\.0\.0\.1:\d+\/qa\/ui\/)$/u.exec(line);
      if (match) return await capture(new URL(match[1]));
    }
    throw new Error('Balda stopped before announcing its QA gallery');
  } finally {
    server.kill();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
