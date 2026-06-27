import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the homepage successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Suhail/i);
    });

    test('should display the banner section', async ({ page }) => {
        const banner = page.locator('section#banner');
        await expect(banner).toBeVisible();
    });

    test('should display main title with Full Stack Developer', async ({ page }) => {
        await expect(page.getByText('FULL STACK')).toBeVisible();
        await expect(page.getByText('DEVELOPER')).toBeVisible();
    });

    test('should display developer name in greeting', async ({ page }) => {
        await expect(page.getByText('MOHAMMED SUHAIL')).toBeVisible();
    });

    test('should have working Hire Me button link', async ({ page }) => {
        const hireButton = page.getByRole('link', { name: /hire me/i });
        await expect(hireButton).toBeVisible();
        await expect(hireButton).toHaveAttribute('href', /linkedin.com/);
        await expect(hireButton).toHaveAttribute('target', '_blank');
    });

    test('should have working Download CV button', async ({ page }) => {
        const cvButton = page.getByRole('link', { name: /download cv/i });
        await expect(cvButton).toBeVisible();
        await expect(cvButton).toHaveAttribute('href', /cv.*\.pdf/);
    });

    test('should display experience metrics', async ({ page }) => {
        await expect(page.getByText('Years of Experience')).toBeVisible();
        await expect(page.getByText('Completed Projects')).toBeVisible();
    });

    test('should display selected projects section', async ({ page }) => {
        const projectsSection = page.locator('section#selected-projects');
        await expect(projectsSection).toBeVisible();
        
        const sectionTitle = projectsSection.getByText('Selected Projects');
        await expect(sectionTitle).toBeVisible();
    });

    test('should display at least one project', async ({ page }) => {
        await page.locator('section#selected-projects').scrollIntoViewIfNeeded();
        
        // Wait for projects to be visible
        const projectTitle = page.getByText('AI Language Translator').first();
        await expect(projectTitle).toBeVisible();
    });

    test('should have navigation menu', async ({ page }) => {
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
    });

    test('should have footer', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
    });
});

test.describe('Responsive Design', () => {
    test('should render correctly on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Banner should still be visible
        await expect(page.getByText('FULL STACK')).toBeVisible();
        await expect(page.getByText('DEVELOPER')).toBeVisible();
    });

    test('should render correctly on tablet viewport', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        await expect(page.getByText('MOHAMMED SUHAIL')).toBeVisible();
    });

    test('should render correctly on desktop viewport', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');

        await expect(page.locator('section#banner')).toBeVisible();
    });
});

test.describe('Page Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - startTime;

        // Page should load within 5 seconds
        expect(loadTime).toBeLessThan(5000);
    });

    test('should not have console errors', async ({ page }) => {
        const consoleErrors: string[] = [];
        
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Should not have any console errors
        expect(consoleErrors.length).toBe(0);
    });
});
