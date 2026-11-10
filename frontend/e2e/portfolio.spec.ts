import { expect, test } from '@playwright/test';

test('terminal simulates a registered Linux command', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'df -h' }).click();
  await expect(page.locator('.terminal-history')).toContainText('Filesystem');
});

test('architecture explains the private database on selection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /RDS MySQL/ }).click();
  await expect(page.locator('.arch-detail')).toContainText('private MySQL');
});

test('assistant answers with verified Linux facts', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Ask Prathmesh/ }).click();
  await expect(page.locator('.ask-panel')).toContainText('DEMO MODE');
  await page.getByRole('button', { name: 'Linux skills' }).click();
  await expect(page.locator('.ask-messages')).toContainText('Bash toolkit for RHEL', { timeout: 10_000 });
});
