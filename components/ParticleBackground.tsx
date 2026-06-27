'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { getOptimalParticleCount, prefersReducedMotion } from '@/lib/performance';

gsap.registerPlugin(useGSAP);

/**
 * Optimized particle background component
 * - Reduces particles based on device capability
 * - Respects reduced motion preferences
 * - Uses memoization for better performance
 */
const ParticleBackground = memo(() => {
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const [particleCount, setParticleCount] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    // Determine optimal particle count on mount (client-side only)
    useEffect(() => {
        setParticleCount(getOptimalParticleCount());
        setShouldAnimate(!prefersReducedMotion());
    }, []);

    // Create particle array only when count is determined
    const particles = useMemo(() => 
        Array.from({ length: particleCount }, (_, i) => i), 
        [particleCount]
    );

    useGSAP(() => {
        if (!shouldAnimate || particleCount === 0) return;

        particlesRef.current.forEach((particle) => {
            if (!particle) return;
            
            gsap.set(particle, {
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.6, // Reduced opacity for subtler effect
                left: Math.random() * window.innerWidth,
                top: Math.random() * (window.innerHeight + 1),
            });

            gsap.to(particle, {
                y: window.innerHeight,
                duration: Math.random() * 10 + 10,
                opacity: 0,
                repeat: -1,
                ease: 'none',
            });
        });
    }, [particleCount, shouldAnimate]);

    // Don't render anything until we know the particle count
    if (particleCount === 0) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            {particles.map((i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) particlesRef.current[i] = el;
                    }}
                    className="absolute rounded-full bg-white"
                />
            ))}
        </div>
    );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;

