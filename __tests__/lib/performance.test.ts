/**
 * Performance Utilities Test Suite
 * 
 * Tests for lib/performance.ts utility functions
 * Ensures reliability, testability, and maintainability of performance optimizations
 */

import {
    CRITICAL_RESOURCES,
    DEFERRED_RESOURCES,
    IMAGE_OPTIMIZATION,
    RESOURCE_HINTS,
    isSlowConnection,
    prefersReducedMotion,
    generateStructuredData,
    getOptimalParticleCount,
} from '@/lib/performance';

describe('Performance Utilities', () => {
    // Store original window properties for restoration
    const originalNavigator = global.navigator;
    const originalWindow = global.window;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Restore original properties
        Object.defineProperty(global, 'navigator', {
            value: originalNavigator,
            writable: true,
        });
    });

    describe('CRITICAL_RESOURCES', () => {
        it('should define critical fonts for preloading', () => {
            expect(CRITICAL_RESOURCES.fonts).toBeDefined();
            expect(Array.isArray(CRITICAL_RESOURCES.fonts)).toBe(true);
            expect(CRITICAL_RESOURCES.fonts.length).toBeGreaterThan(0);
        });

        it('should include Anton font as critical', () => {
            const antonFont = CRITICAL_RESOURCES.fonts.find(
                (f) => f.family === 'Anton'
            );
            expect(antonFont).toBeDefined();
            expect(antonFont?.weight).toBe('400');
        });

        it('should include Roboto Flex as critical', () => {
            const robotoFont = CRITICAL_RESOURCES.fonts.find(
                (f) => f.family === 'Roboto Flex'
            );
            expect(robotoFont).toBeDefined();
        });

        it('should define critical images for preloading', () => {
            expect(CRITICAL_RESOURCES.images).toBeDefined();
            expect(Array.isArray(CRITICAL_RESOURCES.images)).toBe(true);
        });
    });

    describe('DEFERRED_RESOURCES', () => {
        it('should list components for lazy loading', () => {
            expect(DEFERRED_RESOURCES.components).toBeDefined();
            expect(Array.isArray(DEFERRED_RESOURCES.components)).toBe(true);
        });

        it('should include ParticleBackground as deferred', () => {
            expect(DEFERRED_RESOURCES.components).toContain('ParticleBackground');
        });

        it('should include CustomCursor as deferred', () => {
            expect(DEFERRED_RESOURCES.components).toContain('CustomCursor');
        });

        it('should include ScrollProgressIndicator as deferred', () => {
            expect(DEFERRED_RESOURCES.components).toContain('ScrollProgressIndicator');
        });

        it('should list scripts for deferred loading', () => {
            expect(DEFERRED_RESOURCES.scripts).toBeDefined();
            expect(DEFERRED_RESOURCES.scripts).toContain('googletagmanager');
        });
    });

    describe('IMAGE_OPTIMIZATION', () => {
        it('should have placeholder enabled', () => {
            expect(IMAGE_OPTIMIZATION.usePlaceholder).toBe(true);
        });

        it('should define lazy load threshold', () => {
            expect(IMAGE_OPTIMIZATION.lazyLoadThreshold).toBeDefined();
            expect(typeof IMAGE_OPTIMIZATION.lazyLoadThreshold).toBe('string');
        });

        it('should prefer modern image formats', () => {
            expect(IMAGE_OPTIMIZATION.formats).toContain('avif');
            expect(IMAGE_OPTIMIZATION.formats).toContain('webp');
        });

        it('should have avif as highest priority format', () => {
            expect(IMAGE_OPTIMIZATION.formats[0]).toBe('avif');
        });
    });

    describe('RESOURCE_HINTS', () => {
        it('should define preconnect URLs', () => {
            expect(RESOURCE_HINTS.preconnect).toBeDefined();
            expect(Array.isArray(RESOURCE_HINTS.preconnect)).toBe(true);
        });

        it('should preconnect to Google Fonts', () => {
            expect(RESOURCE_HINTS.preconnect).toContain('https://fonts.googleapis.com');
            expect(RESOURCE_HINTS.preconnect).toContain('https://fonts.gstatic.com');
        });

        it('should define dns-prefetch URLs', () => {
            expect(RESOURCE_HINTS.dnsPrefetch).toBeDefined();
            expect(Array.isArray(RESOURCE_HINTS.dnsPrefetch)).toBe(true);
        });

        it('should dns-prefetch Google Tag Manager', () => {
            expect(RESOURCE_HINTS.dnsPrefetch).toContain('https://www.googletagmanager.com');
        });
    });

    describe('isSlowConnection', () => {
        it('should return false when navigator is undefined', () => {
            Object.defineProperty(global, 'navigator', {
                value: undefined,
                writable: true,
            });
            expect(isSlowConnection()).toBe(false);
        });

        it('should return false when connection API is not available', () => {
            Object.defineProperty(global, 'navigator', {
                value: {},
                writable: true,
            });
            expect(isSlowConnection()).toBe(false);
        });

        it('should return true for 2g connection', () => {
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: '2g' },
                },
                writable: true,
            });
            expect(isSlowConnection()).toBe(true);
        });

        it('should return true for slow-2g connection', () => {
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: 'slow-2g' },
                },
                writable: true,
            });
            expect(isSlowConnection()).toBe(true);
        });

        it('should return true when saveData is enabled', () => {
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: '4g', saveData: true },
                },
                writable: true,
            });
            expect(isSlowConnection()).toBe(true);
        });

        it('should return false for fast connections', () => {
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: '4g', saveData: false },
                },
                writable: true,
            });
            expect(isSlowConnection()).toBe(false);
        });
    });

    describe('prefersReducedMotion', () => {
        it('should return false when window is undefined', () => {
            const originalWindow = global.window;
            // @ts-ignore
            delete global.window;
            expect(prefersReducedMotion()).toBe(false);
            global.window = originalWindow;
        });

        it('should return true when reduced motion is preferred', () => {
            Object.defineProperty(window, 'matchMedia', {
                value: jest.fn().mockReturnValue({ matches: true }),
                writable: true,
            });
            expect(prefersReducedMotion()).toBe(true);
        });

        it('should return false when reduced motion is not preferred', () => {
            Object.defineProperty(window, 'matchMedia', {
                value: jest.fn().mockReturnValue({ matches: false }),
                writable: true,
            });
            expect(prefersReducedMotion()).toBe(false);
        });
    });

    describe('generateStructuredData', () => {
        it('should return minified JSON string', () => {
            const data = { name: 'Test', value: 123 };
            const result = generateStructuredData(data);
            
            expect(typeof result).toBe('string');
            expect(result).toBe('{"name":"Test","value":123}');
        });

        it('should handle nested objects', () => {
            const data = {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Mohammed Suhail',
            };
            const result = generateStructuredData(data);
            
            expect(result).not.toContain('\n');
            expect(result).not.toContain('  ');
        });

        it('should handle arrays', () => {
            const data = { items: [1, 2, 3] };
            const result = generateStructuredData(data);
            
            expect(result).toBe('{"items":[1,2,3]}');
        });

        it('should handle empty objects', () => {
            expect(generateStructuredData({})).toBe('{}');
        });
    });

    describe('getOptimalParticleCount', () => {
        beforeEach(() => {
            // Reset window properties
            Object.defineProperty(window, 'innerWidth', {
                value: 1920,
                writable: true,
            });
            Object.defineProperty(window, 'matchMedia', {
                value: jest.fn().mockReturnValue({ matches: false }),
                writable: true,
            });
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: '4g', saveData: false },
                },
                writable: true,
            });
        });

        it('should return 50 for desktop on fast connection', () => {
            expect(getOptimalParticleCount()).toBe(50);
        });

        it('should return 30 for mobile devices', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 375,
                writable: true,
            });
            expect(getOptimalParticleCount()).toBe(30);
        });

        it('should return 20 for slow connections', () => {
            Object.defineProperty(global, 'navigator', {
                value: {
                    connection: { effectiveType: '2g' },
                },
                writable: true,
            });
            expect(getOptimalParticleCount()).toBe(20);
        });

        it('should return 20 when reduced motion is preferred', () => {
            Object.defineProperty(window, 'matchMedia', {
                value: jest.fn().mockReturnValue({ matches: true }),
                writable: true,
            });
            expect(getOptimalParticleCount()).toBe(20);
        });
    });
});

describe('Performance Configuration Consistency', () => {
    it('should have all deferred components listed correctly', () => {
        // Ensure deferred components match what we lazy load in layout.tsx
        const expectedDeferred = ['ParticleBackground', 'CustomCursor', 'ScrollProgressIndicator'];
        expectedDeferred.forEach((component) => {
            expect(DEFERRED_RESOURCES.components).toContain(component);
        });
    });

    it('should have valid font configurations', () => {
        CRITICAL_RESOURCES.fonts.forEach((font) => {
            expect(font.family).toBeDefined();
            expect(font.weight).toBeDefined();
        });
    });

    it('should have valid URL formats for resource hints', () => {
        const urlPattern = /^https?:\/\//;
        
        RESOURCE_HINTS.preconnect.forEach((url) => {
            expect(url).toMatch(urlPattern);
        });
        
        RESOURCE_HINTS.dnsPrefetch.forEach((url) => {
            expect(url).toMatch(urlPattern);
        });
    });
});
