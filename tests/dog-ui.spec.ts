import { test, expect } from '@playwright/test';

test('dog image loads', async ({ page }) => {

  await page.goto('http://localhost:5173');

  const image = page.locator('img');

  await expect(image).toBeVisible();

});
test('click button loads new dog image', async ({ page }) => {

  await page.goto('http://localhost:5173');

  const image = page.locator('img');
  const button = page.locator('button');

  const firstSrc = await image.getAttribute('src');

  await button.click();

  await page.waitForTimeout(1000);

  const secondSrc = await image.getAttribute('src');

  expect(secondSrc).not.toBe(firstSrc);

});
test('get another dog button is visible', async ({ page }) => {

  await page.goto('http://localhost:5173');

  const button = page.locator('button');

  await expect(button).toBeVisible();

});