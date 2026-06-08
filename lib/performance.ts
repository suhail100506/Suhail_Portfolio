/**
 * Performance optimization utilities
 * 
 * This module provides utilities for optimizing web performance across:
 * - Maintainability: Centralized configuration and utilities
 * - Performance: Asset loading optimization
 * - Scalability: Easy to extend with new optimizations
 * - Testability: All functions are pure and mockable
 */

/**
 * Critical resources that should be preloaded for fast initial render
 */
export const CRITICAL_RESOURCES = {
    fonts: [
        // Preload critical font weights only
        { family: 'Anton', weight: '400' },
        { family: 'Roboto Flex', weight: '400' },
    ],
    images: [
        // Above-the-fold images that need immediate loading
        '/projects/thumbnail/fitrack.png',
    ],
} as const;

/**
 * Resources that can be deferred until after initial render
 */
export const DEFERRED_RESOURCES = {
    components: [
        'ParticleBackground',
        'CustomCursor',
        'ScrollProgressIndicator',
    ],
    scripts: [
        // Analytics and non-critical third-party scripts
        'googletagmanager',
    ],
} as const;

/**
 * Image optimization configuration
 * Reduces HTTP requests by defining optimal loading strategies
 */
export const IMAGE_OPTIMIZATION = {
    // Use blur placeholder for images above the fold
    usePlaceholder: true,
    // Lazy load images below the fold
    lazyLoadThreshold: '200px',
    // Preferred formats in order of preference
    formats: ['avif', 'webp', 'png'] as const,
} as const;

/**
 * Checks if the client is on a slow connection
 * Helps with adaptive loading strategies
 */
export function isSlowConnection(): boolean {
    if (typeof navigator === 'undefined') return false;
    
    const connection = (navigator as any).connection;
    if (!connection) return false;
    
    return connection.effectiveType === '2g' || 
           connection.effectiveType === 'slow-2g' ||
           connection.saveData === true;
}

/**
 * Checks if reduced motion is preferred
 * Important for accessibility and performance
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Generates optimized structured data JSON
 * Minifies the output to reduce HTML size
 */
export function generateStructuredData(data: Record<string, unknown>): string {
    // Minify by removing unnecessary whitespace
    return JSON.stringify(data);
}

/**
 * Resource hints configuration for better loading performance
 */
export const RESOURCE_HINTS = {
    preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
    ],
    dnsPrefetch: [
        'https://www.googletagmanager.com',
    ],
} as const;

/**
 * Particle configuration based on device performance
 * Reduces particles on mobile/slow devices
 */
export function getOptimalParticleCount(): number {
    if (typeof window === 'undefined') return 50;
    
    const isMobile = window.innerWidth < 768;
    const isSlowDevice = isSlowConnection() || prefersReducedMotion();
    
    if (isSlowDevice) return 20;
    if (isMobile) return 30;
    return 50; // Reduced from 100 for better performance
}
