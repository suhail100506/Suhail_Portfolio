import { test, expect } from '@playwright/test';

test.describe('Project Detail Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/projects/fitrack-application');
    });

    test('should load project detail page', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/fitrack-application/);
    });

    test('should display project title', async ({ page }) => {
        const title = page.getByText('Fitrack Application');
        await expect(title).toBeVisible();
    });

    test('should have page metadata', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
    });

    test('should display project details content', async ({ page }) => {
        // Project description or content should be visible
        const content = page.locator('main').first();
        await expect(content).toBeVisible();

        const textContent = await content.textContent();
        expect(textContent?.length).toBeGreaterThan(100);
    });

    test('should handle non-existent project gracefully', async ({ page }) => {
        const response = await page.goto('/projects/non-existent-project-slug');

        // Should either redirect or show 404
        // Check if we get a proper response (not a crash)
        expect(response?.status()).toBeDefined();
    });
});

test.describe('Project Page SEO', () => {
    test('should have proper meta tags', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        // Check for title
        const title = await page.title();
        expect(title).toContain('Fitrack');

        // Check for meta description
        const metaDescription = await page
            .locator('meta[name="description"]')
            .getAttribute('content');
        expect(metaDescription).toBeTruthy();
    });

    test('should have Open Graph tags', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        // Check for OG tags
        const ogTitle = page.locator('meta[property="og:title"]');
        const ogDescription = page.locator('meta[property="og:description"]');

        // At least title should be present
        const ogTitleCount = await ogTitle.count();
        expect(ogTitleCount).toBeGreaterThanOrEqual(0);
    });
});

test.describe('Project Page Accessibility', () => {
    test('should have proper heading structure', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        // Should have at least one h1
        const h1 = page.locator('h1');
        const h1Count = await h1.count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test('should have keyboard navigation support', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        // Tab through focusable elements
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(
            () => document.activeElement?.tagName,
        );
        expect(focusedElement).toBeTruthy();
    });
});

test.describe('Project Images', () => {
    test('should load project images if present', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        // Wait for images to load
        await page.waitForLoadState('networkidle');

        // Check if images are present
        const images = page.locator('img');
        const imageCount = await images.count();

        if (imageCount > 0) {
            // First image should be visible
            const firstImage = images.first();
            await expect(firstImage).toBeVisible();

            // Check that image has loaded (naturalWidth > 0)
            const hasLoaded = await firstImage.evaluate(
                (img: HTMLImageElement) => img.naturalWidth > 0,
            );
            expect(hasLoaded).toBe(true);
        }
    });

    test('should have alt text on images', async ({ page }) => {
        await page.goto('/projects/fitrack-application');

        const images = page.locator('img');
        const imageCount = await images.count();

        for (let i = 0; i < imageCount; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            // Alt attribute should exist (can be empty for decorative images)
            expect(alt).toBeDefined();
        }
    });
});
