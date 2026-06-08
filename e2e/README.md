# E2E Testing with Playwright

This directory contains end-to-end tests for the portfolio website using Playwright.

## Test Files

-   **homepage.spec.ts**: Tests for homepage functionality, responsive design, and performance
-   **navigation.spec.ts**: Tests for navigation between pages, external links, scroll behavior, and project interactions
-   **project-page.spec.ts**: Tests for project detail pages, SEO, accessibility, and images

## Running Tests

### Prerequisites

Make sure the development server can be started. Playwright will automatically start it for you.

### Commands

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI mode (interactive debugging)
pnpm test:e2e:ui

# Run tests in headed mode (see the browser)
pnpm test:e2e:headed

# View test report
pnpm test:e2e:report
```

### Running Specific Tests

```bash
# Run only homepage tests
pnpm test:e2e e2e/homepage.spec.ts

# Run only navigation tests
pnpm test:e2e e2e/navigation.spec.ts

# Run only project page tests
pnpm test:e2e e2e/project-page.spec.ts
```

## Test Coverage

### Homepage Tests (11 tests)

-   ✅ Page loads successfully
-   ✅ Banner section displays
-   ✅ Title and developer name visible
-   ✅ CTA buttons work correctly
-   ✅ Experience metrics display
-   ✅ Projects section visible
-   ✅ Navigation and footer present
-   ✅ Responsive design (mobile/tablet/desktop)
-   ✅ Performance metrics
-   ✅ No console errors

### Navigation Tests (10 tests)

-   ✅ Navigate to project detail page
-   ✅ Display project details
-   ✅ Navigate back to homepage
-   ✅ Section navigation
-   ✅ External links with proper attributes
-   ✅ LinkedIn profile link
-   ✅ Smooth scroll behavior
-   ✅ Scroll indicator
-   ✅ Project hover interactions (desktop)
-   ✅ Tech stack display

### Project Page Tests (9 tests)

-   ✅ Load project detail page
-   ✅ Display project title
-   ✅ Page metadata present
-   ✅ Content displays correctly
-   ✅ Handle non-existent projects
-   ✅ Proper meta tags (SEO)
-   ✅ Open Graph tags
-   ✅ Heading structure
-   ✅ Keyboard navigation
-   ✅ Images load with alt text

## Configuration

Configuration is in `playwright.config.ts`:

-   **Browser**: Chromium (Desktop Chrome)
-   **Base URL**: http://localhost:3000
-   **Timeout**: 120 seconds for server start
-   **Retries**: 2 on CI, 0 locally
-   **Traces**: Captured on first retry
-   **Screenshots**: Captured on failure

## Writing New Tests

Follow the existing patterns:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should do something', async ({ page }) => {
        const element = page.locator('selector');
        await expect(element).toBeVisible();
    });
});
```

## Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Wait for elements** before interacting
3. **Use meaningful test descriptions**
4. **Group related tests** with describe blocks
5. **Clean up state** with beforeEach/afterEach
6. **Test user flows**, not implementation details
7. **Keep tests independent** (can run in any order)

## Debugging

### UI Mode (Recommended)

```bash
pnpm test:e2e:ui
```

Interactive mode with time-travel debugging, watch mode, and step-through.

### Headed Mode

```bash
pnpm test:e2e:headed
```

See the browser as tests run.

### Debug Specific Test

```bash
pnpm test:e2e --debug e2e/homepage.spec.ts
```

### View Traces

If a test fails, traces are automatically captured. View them with:

```bash
pnpm test:e2e:report
```

## CI/CD Integration

Tests automatically:

-   Start dev server before running
-   Run in headless mode
-   Retry failed tests twice
-   Capture screenshots on failure
-   Generate HTML report

## Troubleshooting

### Port already in use

If port 3000 is busy, update `playwright.config.ts` baseURL and webServer.url

### Tests timing out

Increase timeout in `playwright.config.ts`:

```typescript
timeout: 30000, // 30 seconds
```

### Flaky tests

Add explicit waits:

```typescript
await page.waitForLoadState('networkidle');
await page.locator('selector').waitFor({ state: 'visible' });
```
