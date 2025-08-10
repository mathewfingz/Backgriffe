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

    // Navigate to stores page and verify UI present
    await page.goto('/admin/stores')
    await expect(page.getByText('Tiendas')).toBeVisible()
    // The rest of the flow (create store, create content) would require UI forms; placeholder for now
  })
})

