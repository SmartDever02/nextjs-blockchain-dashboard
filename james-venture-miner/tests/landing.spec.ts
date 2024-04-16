import { test, expect } from '@playwright/test'

test('landing page has ethereum and optimism dashboards', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Venture Miner/)

  // statboard checks for both Eth and Opt
  await expect(page.getByTestId('statboard-eth')).toBeVisible()
  await expect(page.getByTestId('statboard-opt')).toBeVisible()

  // quick search form exists
  await expect(page.getByTestId("quick-search-form-lg")).toBeVisible();
})

test('able to go to ethereum dashboard', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('select-chain-eth').click()

  await expect(
    page.getByRole('heading', { name: 'The Ethereum Blockchain Explorer' })
  ).toBeVisible()
})

test('able to go to optimism page and get 404', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('select-chain-opt').click()

  // coming soon image
  await expect(page.getByAltText('coming soon')).toBeVisible()

  // return to home link exists
  await expect(page.getByTestId('return-home-link')).toBeVisible()
})

test('transactions and blocks link in the statboard should work', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('txs-link-eth').click()

  await expect(
    page.getByRole('heading', { name: 'Transactions' })
  ).toBeVisible()

  await page.goto('/')

  await page.getByTestId('txs-link-opt').click()

  // coming soon image
  await expect(page.getByAltText('not found')).toBeVisible()

  // return to home link exists
  await expect(page.getByTestId('return-home-link')).toBeVisible()
})

test('quick search form in the landing page', async ({ page }) => {
  await page.goto('/')

  // quick search form exists
  await expect(page.getByTestId("quick-search-form-lg")).toBeVisible();

  // search for a block and go to block detail page
  const input = page.getByTestId('quick-search-input');

  await input.focus();
  await input.type('19665611');

  await page.keyboard.press("Enter");

  await expect(page.getByTestId('quick-search-result-wrapper')).toBeVisible();

  await page.getByTestId('quick-search-result-0').click();

  // reach block detail page
  await expect(
    page.getByRole('heading', { name: 'Block' })
  ).toBeVisible()

  await page.goto('/');

  await input.focus();

  // result should be kept
  await expect(page.getByTestId('quick-search-result-wrapper')).toBeVisible();

  await input.type('0x34e2b7fb12a1aa372708224bc8af266d6736e15bebe682ce9f06106cf5a774f1');

  await page.keyboard.press("Enter");

  await page.waitForTimeout(1000); // manual timeout for new result comes

  await expect(page.getByTestId('quick-search-result-wrapper')).toBeVisible();

  await page.getByTestId('quick-search-result-0').click();

  // reach block detail page
  await expect(
    page.getByRole('heading', { name: 'Transaction Detail' })
  ).toBeVisible()
})
