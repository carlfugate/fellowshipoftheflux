// Run against a local production build with a locally installed Playwright.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function run() {
  const baseURL = process.env.SITE_URL || 'http://127.0.0.1:1313';
  const browser = await chromium.launch({ chromiumSandbox: true, executablePath: chromium.executablePath() });
  const errors = [];
  try {
    const page = await browser.newPage({ baseURL, viewport: { width: 390, height: 844 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'main-content');
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.focus();
    await page.keyboard.press('Enter');
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    await menu.click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Host a workshop').click();
    assert.equal(await page.locator('h1').textContent(), 'Host a workshop');
    assert.equal(await page.getByText('Email the workshop team').getAttribute('href'), 'mailto:services@fellowshipoftheflux.com');
    await page.goto('/');
    await page.getByText('Start your first lesson').click();
    await page.locator('.kit summary').click();
    assert.ok(await page.getByText('Safety glasses', { exact: true }).first().isVisible());
    await page.locator('.bookmark-btn').click();
    await page.locator('.progress-btn').click();
    await page.reload();
    assert.equal(await page.locator('.bookmark-btn').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.progress-btn').getAttribute('aria-pressed'), 'true');
    await page.locator('.start-assessment').click();
    assert.ok(await page.getByRole('dialog').isVisible());
    for (let question = 0; question < 3; question++) {
      await page.locator('.option input').nth(1).check();
      await page.locator(question === 2 ? '.submit-assessment' : '.next-question').click();
    }
    assert.ok(await page.locator('.results-details').isVisible());
    await page.locator('.retake-assessment').click();
    assert.ok(await page.getByText('Question 1 of 3').isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    await page.goto('/learn/');
    assert.equal(await page.locator('.entry:visible').count(), 6);
    await page.getByLabel('Search resources').fill('no-such-tool');
    await page.locator('#no-results').waitFor({ state: 'visible' });
    await page.getByLabel('Search resources').fill('flasher');
    await page.getByRole('link', { name: /Simple LED Flasher Circuit/ }).waitFor();
    assert.equal(await page.locator('.entry:visible').count(), 1);
    await page.goto('/learn/tutorials/?level=beginner');
    assert.equal(await page.locator('.entry:visible').count(), 1);
    await page.getByRole('button', { name: 'Dark mode' }).click();
    await page.reload();
    assert.ok(await page.locator('html').evaluate(el => el.classList.contains('dark')));
    await page.goto('/get-involved/');
    assert.equal(await page.getByText('Email the volunteer team').getAttribute('href'), 'mailto:volunteers@fellowshipoftheflux.com');
    const noJS = await browser.newPage({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await noJS.goto('/');
    assert.ok(await noJS.getByRole('navigation', { name: 'Main navigation' }).getByText('Learn to solder').isVisible());
    assert.deepEqual(errors, []);
    console.log('Keyboard navigation, email handoffs, lesson supplies, saved learning state, quiz, catalog filters, theme persistence and script-free navigation passed.');
  } finally {
    await browser.close();
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
