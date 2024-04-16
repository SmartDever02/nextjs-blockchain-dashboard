import { test, expect } from '@playwright/test'

test('landing page has ethereum and optimism dashboards', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Venture Miner/)

  await expect(page.getByTestId('statboard-eth')).toBeVisible()
  await expect(page.getByTestId('statboard-opt')).toBeVisible()
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
