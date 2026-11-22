// Run against a local production build with a locally installed Playwright.
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const { firefox } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function waitForServer(url, server) {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server?.exitCode !== null && server?.exitCode !== undefined) {
      throw new Error(`Local preview server exited with code ${server.exitCode}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

async function run() {
  const baseURL = process.env.SITE_URL || 'http://127.0.0.1:1313';
  const server = process.env.SITE_URL ? null : spawn(process.execPath, [
    require.resolve('http-server/bin/http-server'), 'public', '-a', '127.0.0.1', '-p', '1313', '-c-1'
  ], { stdio: 'ignore' });
  let browser;
  const errors = [];
  try {
    await waitForServer(baseURL, server);
    browser = await firefox.launch({ headless: true });
    const page = await browser.newPage({ baseURL, viewport: { width: 390, height: 844 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.__layoutShifts = [];
      new PerformanceObserver(entries => {
        for (const entry of entries.getEntries()) {
          if (!entry.hadRecentInput) window.__layoutShifts.push(entry.value);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);
    const cls = await page.evaluate(() => window.__layoutShifts.reduce((total, value) => total + value, 0));
    assert.ok(cls < 0.1, `Mobile cumulative layout shift was ${cls}`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'main-content');
    const menu = page.locator('.menu-switch');
    await menu.focus();
    await page.keyboard.press('Enter');
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'theme-toggle');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Learn to solder');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator(':focus').textContent(), 'Menu');
    await menu.click();
    await page.setViewportSize({ width: 1024, height: 900 });
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    await page.setViewportSize({ width: 390, height: 844 });
    await menu.click();
    await page.locator('header .brand').click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    await menu.click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Workshop info').click();
    assert.equal(await page.locator('h1').textContent(), 'Host a workshop');
    assert.ok(await page.getByText('Availability, format and travel are confirmed for each event.').isVisible());
    assert.match(await page.getByRole('link', { name: /Ask about hosting a workshop/ }).getAttribute('href'), /^mailto:carlfugate@gmail\.com\?/);
    await page.goto('/');
    await page.getByText('Start your first lesson').click();
    await page.locator('.kit summary').click();
    assert.ok(await page.getByText('Safety glasses', { exact: true }).first().isVisible());
    await page.locator('.bookmark-btn').click();
    await page.locator('.progress-btn').click();
    assert.match(await page.locator('.progress-feedback').textContent(), /Great job/);
    await page.locator('.progress-feedback').click();
    assert.equal(await page.locator('.progress-btn').getAttribute('aria-pressed'), 'true');
    await page.reload();
    assert.equal(await page.locator('.bookmark-btn').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.progress-btn').getAttribute('aria-pressed'), 'true');
    await page.locator('.start-assessment').click();
    assert.ok(await page.getByRole('dialog').isVisible());
    assert.equal(await page.locator(':focus').textContent(), 'Question 1 of 3');
    assert.equal(await page.locator('.question p').textContent(), 'What should determine the station setting for a soldering task?');
    assert.match(await page.locator('.option span').nth(1).textContent(), /station, tip, solder and component instructions/);
    const dialogBounds = await page.locator('dialog').boundingBox();
    const questionTextBounds = await page.locator('.question p').boundingBox();
    await page.mouse.move(questionTextBounds.x + 4, questionTextBounds.y + 4);
    await page.mouse.down();
    await page.mouse.move(dialogBounds.x - 2, dialogBounds.y - 2);
    await page.mouse.up();
    assert.equal(await page.getByRole('dialog').count(), 1, 'Dragging from quiz content to the backdrop must not close it');
    await page.mouse.click(dialogBounds.x - 2, dialogBounds.y - 2);
    assert.equal(await page.getByRole('dialog').count(), 0, 'Clicking the backdrop must close the quiz');
    assert.equal(await page.locator('.start-assessment').evaluate(el => el === document.activeElement), true);
    await page.locator('.start-assessment').click();
    for (let question = 0; question < 3; question++) {
      if (question === 2) {
        assert.equal(await page.locator('.question p').textContent(), 'What is a useful first visual check of a through-hole joint?');
        assert.match(await page.locator('.option span').nth(1).textContent(), /visible wetting on the pad and lead/);
      }
      await page.locator('.option input').nth(1).check();
      await page.locator(question === 2 ? '.submit-assessment' : '.next-question').click();
      if (question < 2) assert.equal(await page.locator(':focus').textContent(), `Question ${question + 2} of 3`);
    }
    assert.ok(await page.locator('.results-details').isVisible());
    assert.equal(await page.locator('.score').textContent(), '100%');
    assert.equal(await page.locator('.score-circle .label').textContent(), '3/3');
    assert.equal(await page.locator(':focus').textContent(), 'Assessment Complete!');
    await page.locator('.retake-assessment').click();
    assert.ok(await page.getByText('Question 1 of 3').isVisible());
    assert.equal(await page.locator(':focus').textContent(), 'Question 1 of 3');
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await page.locator('.start-assessment').evaluate(el => el === document.activeElement), true);
    await page.goto('/learn/tutorials/smd-soldering-basics/');
    assert.equal(await page.locator('.start-assessment').count(), 0);
    assert.equal((await page.goto('/learn/guides/soldering-safety/'))?.status(), 404);
    assert.equal((await page.goto('/learn/projects/simple-led-flasher/'))?.status(), 404);
    assert.equal((await page.goto('/learn/projects/audio-amplifier/'))?.status(), 404);
    await page.goto('/community/');
    assert.equal(await page.locator('.event-history > li').count(), 3);
    await page.goto('/learn/');
    assert.equal(await page.locator('.entry:visible').count(), 3);
    await page.getByLabel('Search resources').fill('no-such-tool');
    await page.locator('#no-results').waitFor({ state: 'visible' });
    assert.doesNotMatch(await page.locator('#no-results').textContent(), /safety/i);
    await page.getByLabel('Search resources').fill('safety');
    await page.locator('#no-results').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.entry:visible').count(), 0);
    await page.getByLabel('Search resources').fill('flasher');
    await page.locator('#no-results').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.entry:visible').count(), 0);
    await page.goto('/learn/tutorials/?level=beginner');
    assert.equal(await page.locator('.entry:visible').count(), 1);
    await page.getByRole('button', { name: 'Dark mode' }).click();
    await page.reload();
    assert.ok(await page.locator('html').evaluate(el => el.classList.contains('dark')));
    if (process.argv.includes('--capture-community')) {
      const screenshotDir = path.join(__dirname, '..', 'docs', 'redesign');
      await page.evaluate(() => localStorage.removeItem('color-theme'));
      await page.reload();
      await page.goto('/community/');
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.screenshot({ path: path.join(screenshotDir, 'after-community-desktop.jpg'), type: 'jpeg', quality: 84, fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: path.join(screenshotDir, 'after-community-mobile.jpg'), type: 'jpeg', quality: 84, fullPage: true });
    }
    if (process.argv.includes('--capture-lessons')) {
      const screenshotDir = path.join(__dirname, '..', 'docs', 'redesign');
      await page.goto('/');
      await page.evaluate(() => localStorage.removeItem('color-theme'));
      await page.reload();
      for (const [route, slug] of [
        ['/learn/tutorials/basic-through-hole-soldering/', 'lesson'],
        ['/learn/tutorials/smd-soldering-basics/', 'smd-lesson']
      ]) {
        for (const [size, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
          await page.setViewportSize({ width, height });
          await page.goto(route, { waitUntil: 'networkidle' });
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: path.join(screenshotDir, `after-${slug}-${size}.jpg`), type: 'jpeg', quality: 84, fullPage: true });
        }
      }
    }
    await page.goto('/get-involved/');
    assert.ok(await page.getByText('Current roles, training, safety procedures and eligibility are confirmed individually.').isVisible());
    assert.match(await page.getByRole('link', { name: /Ask about volunteering/ }).getAttribute('href'), /^mailto:carlfugate@gmail\.com\?/);
    await page.goto('/contact/');
    assert.ok(await page.getByText('Use the email link above for workshop, volunteer and general inquiries.').isVisible());
    assert.match(await page.getByRole('link', { name: /Email the Fellowship/ }).getAttribute('href'), /^mailto:carlfugate@gmail\.com\?/);
    const noJS = await browser.newPage({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await noJS.goto('/');
    assert.ok(await noJS.getByRole('navigation', { name: 'Main navigation' }).getByText('Learn to solder').isVisible());
    assert.deepEqual(errors, []);
    const routes = [
      '/', '/learn/', '/services/', '/community/', '/about/', '/contact/', '/get-involved/',
      '/learn/tutorials/basic-through-hole-soldering/', '/learn/tutorials/smd-soldering-basics/', '/learn/guides/soldering-tools-guide/',
      '/learn/tutorials/', '/learn/guides/', '/learn/projects/', '/projects/', '/posts/', '/lab-setup/'
    ];
    const viewports = [{ width: 1440, height: 900 }, { width: 820, height: 1024 }, { width: 390, height: 844 }];
    const axePath = require.resolve('axe-core/axe.min.js');
    const violations = new Map();
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        const response = await page.goto(route);
        assert.equal(response?.status(), 200, `Expected ${route} to load at ${viewport.width}px`);
        const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth);
        assert.equal(overflows, false, `Expected ${route} not to overflow at ${viewport.width}px`);
        const mailtoHrefs = await page.locator('a[href^="mailto:"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
        assert.ok(mailtoHrefs.every(href => href.startsWith('mailto:carlfugate@gmail.com')), `Expected ${route} to use only the confirmed public inbox`);
        if (['/services/', '/community/', '/contact/', '/get-involved/'].includes(route)) {
          assert.ok(mailtoHrefs.length > 0, `Expected a direct contact path at ${route}`);
        }
        await page.addScriptTag({ path: axePath });
        const results = await page.evaluate(async () => axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
        }));
        for (const item of results.violations) {
          for (const node of item.nodes) {
            const key = `${item.id} ${node.target.join(' ')} ${node.failureSummary || ''}`;
            violations.set(key, (violations.get(key) || 0) + 1);
          }
        }
      }
    }
    assert.deepEqual([...violations.keys()], [], `axe-core reported violations:\n${[...violations].map(([key, count]) => `${key} (${count} scans)`).join('\n')}`);
    console.log(`Keyboard navigation, workshop info, lesson supplies, saved learning state, supported quiz, unpublished unsafe content, catalog filters, confirmed contact inbox, theme persistence, script-free navigation, axe-core (${routes.length * viewports.length} route/view checks), mobile overflow and homepage CLS ${cls.toFixed(3)} passed.`);
  } finally {
    await browser?.close();
    server?.kill('SIGTERM');
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
