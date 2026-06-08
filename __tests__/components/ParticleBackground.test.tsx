/**
 * ParticleBackground Component Tests
 * 
 * Tests for the optimized ParticleBackground component
 * Ensures performance optimizations work correctly
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ParticleBackground from '@/components/ParticleBackground';
import * as performance from '@/lib/performance';

// Mock the performance utilities
jest.mock('@/lib/performance', () => ({
    getOptimalParticleCount: jest.fn(),
    prefersReducedMotion: jest.fn(),
}));

// Mock GSAP
jest.mock('gsap', () => ({
    registerPlugin: jest.fn(),
    set: jest.fn(),
    to: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
    useGSAP: jest.fn((callback) => {
        // Execute the callback to test the logic
        if (typeof callback === 'function') {
            callback();
        }
    }),
}));

describe('ParticleBackground', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default mocks
        (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(50);
        (performance.prefersReducedMotion as jest.Mock).mockReturnValue(false);
    });

    describe('Rendering', () => {
        it('should not render until particle count is determined', () => {
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(0);
            
            const { container } = render(<ParticleBackground />);
            
            // Initially returns null when particle count is 0
            expect(container.firstChild).toBeNull();
        });

        it('should render with correct number of particles', async () => {
            const particleCount = 30;
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(particleCount);
            
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const particles = container.querySelectorAll('.absolute.rounded-full.bg-white');
                expect(particles.length).toBe(particleCount);
            });
        });

        it('should have aria-hidden for accessibility', async () => {
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(10);
            
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const wrapper = container.querySelector('[aria-hidden="true"]');
                expect(wrapper).toBeInTheDocument();
            });
        });

        it('should have pointer-events-none to not interfere with user interaction', async () => {
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(10);
            
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const wrapper = container.querySelector('.pointer-events-none');
                expect(wrapper).toBeInTheDocument();
            });
        });
    });

    describe('Performance Optimizations', () => {
        it('should call getOptimalParticleCount on mount', async () => {
            render(<ParticleBackground />);
            
            await waitFor(() => {
                expect(performance.getOptimalParticleCount).toHaveBeenCalled();
            });
        });

        it('should call prefersReducedMotion on mount', async () => {
            render(<ParticleBackground />);
            
            await waitFor(() => {
                expect(performance.prefersReducedMotion).toHaveBeenCalled();
            });
        });

        it('should render fewer particles on mobile', async () => {
            const mobileParticleCount = 30;
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(mobileParticleCount);
            
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const particles = container.querySelectorAll('.absolute.rounded-full');
                expect(particles.length).toBe(mobileParticleCount);
            });
        });

        it('should render even fewer particles on slow connections', async () => {
            const slowConnectionParticleCount = 20;
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(slowConnectionParticleCount);
            
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const particles = container.querySelectorAll('.absolute.rounded-full');
                expect(particles.length).toBe(slowConnectionParticleCount);
            });
        });
    });

    describe('Accessibility', () => {
        it('should respect reduced motion preference', async () => {
            (performance.prefersReducedMotion as jest.Mock).mockReturnValue(true);
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(20);
            
            // Component should still render but with reduced particles
            const { container } = render(<ParticleBackground />);
            
            await waitFor(() => {
                expect(performance.prefersReducedMotion).toHaveBeenCalled();
            });
        });
    });

    describe('Memo Optimization', () => {
        it('should have displayName set for debugging', () => {
            expect(ParticleBackground.displayName).toBe('ParticleBackground');
        });
    });
});

describe('ParticleBackground Quality Attributes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(50);
        (performance.prefersReducedMotion as jest.Mock).mockReturnValue(false);
    });

    describe('Maintainability', () => {
        it('should use centralized performance configuration', () => {
            render(<ParticleBackground />);
            
            // Verifies that the component uses the centralized performance module
            expect(performance.getOptimalParticleCount).toHaveBeenCalled();
            expect(performance.prefersReducedMotion).toHaveBeenCalled();
        });
    });

    describe('Scalability', () => {
        it('should handle different particle counts correctly', async () => {
            const counts = [10, 30, 50, 100];
            
            for (const count of counts) {
                (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(count);
                
                const { container, unmount } = render(<ParticleBackground />);
                
                await waitFor(() => {
                    const particles = container.querySelectorAll('.absolute.rounded-full');
                    expect(particles.length).toBe(count);
                });
                
                unmount();
            }
        });
    });

    describe('Flexibility', () => {
        it('should adapt to device capabilities through performance module', async () => {
            // Test that changing the mock affects the output
            (performance.getOptimalParticleCount as jest.Mock).mockReturnValue(20);
            
            const { container, rerender } = render(<ParticleBackground />);
            
            await waitFor(() => {
                const particles = container.querySelectorAll('.absolute.rounded-full');
                expect(particles.length).toBe(20);
            });
        });
    });
});
