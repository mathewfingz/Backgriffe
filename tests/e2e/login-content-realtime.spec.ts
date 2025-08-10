import { test, expect } from '@playwright/test'

test.describe('Login → create store → create content → realtime', () => {
  test('flow', async ({ page }) => {
    // Go to login
    await page.goto('/login')
    // Fill credentials (assumes seed admin exists)
    await page.getByLabel('Email').fill(process.env.SEED_ADMIN_EMAIL || 'admin@example.com')
    await page.getByLabel('Password').fill(process.env.SEED_ADMIN_PASSWORD || 'admin123')
    await Promise.all([
      page.waitForURL('**/admin'),
      page.getByRole('button', { name: 'Entrar' }).click(),
    ])

    await expect(page).toHaveURL(/.*\/admin$/)

    // Create a store via test seed endpoint (returns storeId for current admin)
    await page.goto('/admin')
    const seedResp = await page.request.post('/api/test/seed')
    const seedJson = await seedResp.json()
    const storeId = seedJson.storeId as string

    // Go to admin content and observe realtime
    await page.goto('/admin/content')
    // In parallel, open store content in a new tab and create content
    const storePage = await page.context().newPage()
    await storePage.goto(`/stores/${storeId}/content`)
    await storePage.getByLabel('Título').fill('Hello World')
    await storePage.getByRole('button', { name: 'Crear' }).click()
    // Back in admin, wait for event row to appear
    await expect(page.getByText('Hello World')).toBeVisible({ timeout: 10000 })
  })
})

