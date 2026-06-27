'use client';

import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
    ssr: false,
    loading: () => null,
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
    ssr: false,
    loading: () => null,
});

const ScrollProgressIndicator = dynamic(() => import('@/components/ScrollProgressIndicator'), {
    ssr: false,
    loading: () => null,
});

export default function ClientLayout() {
    return (
        <>
            <CustomCursor />
            <ScrollProgressIndicator />
            <ParticleBackground />
        </>
    );
}
