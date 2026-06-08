import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('should navigate to project detail page', async ({ page }) => {
        await page.goto('/');

        // Scroll to projects section
        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();

        // Find and click on a project link
        const projectLink = page.getByText('Fitrack Application').first();
        await expect(projectLink).toBeVisible();
        
        // Get the parent link element
        const linkElement = page.locator('a').filter({ has: projectLink }).first();
        await linkElement.click();

        // Should navigate to project detail page
        await expect(page).toHaveURL(/\/projects\/.+/);
    });

    test('should display project details on project page', async ({ page }) => {
        await page.goto('/');
        
        // Navigate to projects section and click first project
        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();
        const projectLink = page.locator('a').filter({ hasText: 'Fitrack Application' }).first();
        await projectLink.click();

        // Wait for navigation
        await page.waitForURL(/\/projects\/.+/);

        // Project details should be visible
        await expect(page.getByText('Fitrack Application')).toBeVisible();
    });

    test('should navigate back to homepage from project page', async ({ page }) => {
        // Start from a project page
        await page.goto('/projects/fitrack-application');
        
        // Click back/home navigation
        const homeLink = page.locator('nav a[href="/"]').first();
        if (await homeLink.isVisible()) {
            await homeLink.click();
            await expect(page).toHaveURL('/');
        } else {
            // Use browser back button
            await page.goBack();
            await expect(page).toHaveURL('/');
        }
    });

    test('should handle navigation between sections on homepage', async ({ page }) => {
        await page.goto('/');

        // Scroll to different sections
        await page.locator('section#banner').scrollIntoViewIfNeeded();
        await expect(page.locator('section#banner')).toBeInViewport();

        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();
        await expect(page.locator('section#selected-projects')).toBeInViewport();
    });
});

test.describe('External Links', () => {
    test('should have external links with proper attributes', async ({ page }) => {
        await page.goto('/');

        const hireButton = page.getByRole('link', { name: /hire me/i });
        await expect(hireButton).toHaveAttribute('target', '_blank');
        await expect(hireButton).toHaveAttribute('rel', /noopener/);
    });

    test('should have LinkedIn profile link', async ({ page }) => {
        await page.goto('/');

        const linkedInLink = page.getByRole('link', { name: /hire me/i });
        const href = await linkedInLink.getAttribute('href');
        expect(href).toContain('linkedin.com');
    });
});

test.describe('Scroll Behavior', () => {
    test('should scroll smoothly through sections', async ({ page }) => {
        await page.goto('/');

        // Get initial scroll position
        const initialScrollY = await page.evaluate(() => window.scrollY);

        // Scroll down
        await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
        await page.waitForTimeout(500);

        // Check scroll position changed
        const newScrollY = await page.evaluate(() => window.scrollY);
        expect(newScrollY).toBeGreaterThan(initialScrollY);
    });

    test('should show scroll indicator if present', async ({ page }) => {
        await page.goto('/');

        // Check for scroll progress indicator
        const scrollIndicator = page.locator('[class*="scroll"]').first();
        
        // If it exists, it should be visible or appear on scroll
        const exists = await scrollIndicator.count();
        if (exists > 0) {
            await page.evaluate(() => window.scrollTo({ top: 100 }));
            await page.waitForTimeout(100);
        }
    });
});

test.describe('Project Interactions', () => {
    test('should display project on hover (desktop)', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');

        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();

        // Hover over a project
        const project = page.getByText('Fitrack Application').first();
        await project.hover();

        // Project should remain visible after hover
        await expect(project).toBeVisible();
    });

    test('should display project tech stack', async ({ page }) => {
        await page.goto('/');
        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();

        // Look for common tech stack items
        const techItems = ['React', 'Django', 'MongoDB', 'JWT'];
        
        for (const tech of techItems) {
            const techElement = page.getByText(tech, { exact: false }).first();
            await expect(techElement).toBeVisible();
        }
    });
});
