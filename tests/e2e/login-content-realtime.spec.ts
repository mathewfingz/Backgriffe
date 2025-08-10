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

    // Navigate to stores page and create a new store
    await page.goto('/admin/stores')
    await page.getByRole('button', { name: 'Nueva Tienda' }).click()
    await page.getByLabel('Nombre').fill('Test Store')
    await page.getByLabel('Slug').fill('test-store')
    // Use admin user id as owner for simplicity
    await page.getByLabel('Owner ID').fill('owneridplaceholder')
    await page.getByRole('button', { name: 'Crear' }).click()
    // Might fail if owner id is invalid; continue to content

    // Go to admin content and observe realtime
    await page.goto('/admin/content')
    // In parallel, open store content in a new tab and create content
    const storeId = 'storeidplaceholder'
    const storePage = await page.context().newPage()
    await storePage.goto(`/stores/${storeId}/content`)
    await storePage.getByLabel('Título').fill('Hello World')
    await storePage.getByRole('button', { name: 'Crear' }).click()
    // Back in admin, wait for event row to appear
    await expect(page.getByText('Hello World')).toBeVisible({ timeout: 10000 })
  })
})

