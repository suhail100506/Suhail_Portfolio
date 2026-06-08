'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP((context, contextSafe) => {
        // Only run on desktop
        if (window.innerWidth < 768) return;

        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
            if (!svgRef.current) return;

            const { clientX, clientY } = e;

            gsap.to(svgRef.current, {
                x: clientX - 13.5,
                y: clientY - 15,
                ease: 'power2.out',
                duration: 0.1,
                opacity: 1,
            });
        }) as any;

        // Show cursor immediately when component mounts
        if (svgRef.current) {
            gsap.set(svgRef.current, { opacity: 1 });
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });

    // Fallback for immediate visibility
    useEffect(() => {
        if (svgRef.current && window.innerWidth >= 768) {
            gsap.set(svgRef.current, { opacity: 1 });
        }
    }, []);

    return (
        <svg
            width="27"
            height="30"
            viewBox="0 0 27 30"
            className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
            fill="none"
            id="cursor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            ref={svgRef}
            style={{ opacity: 0 }} // Start with opacity 0, will be animated by GSAP
        >
            <path
                d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                className="fill-foreground stroke-background/50"
            />
        </svg>
    );
};

export default CustomCursor;
