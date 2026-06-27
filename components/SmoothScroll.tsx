'use client';

import { ReactLenis as ReactLenisActual } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenisActual
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenisActual>
    );
}
