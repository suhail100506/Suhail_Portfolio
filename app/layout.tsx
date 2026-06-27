import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Preloader from '../components/Preloader';
import StickyEmail from './_components/StickyEmail';
import ClientLayout from '@/components/ClientLayout';
import SmoothScroll from '@/components/SmoothScroll';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { RESOURCE_HINTS } from '@/lib/performance';


// Optimized font loading with display: swap for better performance
const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
    display: 'swap', // Prevents FOIT (Flash of Invisible Text)
});

const robotoFlex = Roboto_Flex({
    weight: ['400', '500', '700'], // Reduced weights for smaller bundle
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://mohammedsuhail.vercel.app'),
    title: 'Mohammed Suhail - Full Stack MERN Developer Portfolio',
    description: 'Full Stack MERN Developer building scalable web solutions using React, Node.js, MongoDB, Express, and TypeScript. Explore my projects and skills.',
    keywords: ['Full Stack Developer', 'React Developer', 'MERN Stack Developer', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'Portfolio'],
    authors: [{ name: 'Mohammed Suhail' }],
    creator: 'Mohammed Suhail',
    publisher: 'Mohammed Suhail',
    robots: 'index, follow',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Mohammed Suhail - Full Stack MERN Developer Portfolio',
        description: 'Full Stack MERN Developer building scalable web solutions using React, Node.js, MongoDB, Express, and TypeScript.',
        url: 'https://mohammedsuhail.vercel.app',
        type: 'website',
        locale: 'en_US',
        siteName: 'Mohammed Suhail Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mohammed Suhail - Full Stack MERN Developer Portfolio',
        description: 'Full Stack MERN Developer building scalable web solutions using React, Node.js, MongoDB, Express, and TypeScript.',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const themeColor = '#000000';

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammed Suhail',
    jobTitle: 'Full Stack Developer',
    url: 'https://mohammedsuhail.vercel.app',
    sameAs: SOCIAL_LINKS.map(link => link.url),
    knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Express',
        'Tailwind CSS',
        'JavaScript',
        'Full Stack Development',
        'MERN Stack'
    ],
    email: GENERAL_INFO.email,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <head>
                {/* Resource hints for faster external resource loading */}
                {RESOURCE_HINTS.preconnect.map((url) => (
                    <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
                ))}
                {RESOURCE_HINTS.dnsPrefetch.map((url) => (
                    <link key={url} rel="dns-prefetch" href={url} />
                ))}
            </head>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
                suppressHydrationWarning
            >
                {/* Minified structured data for reduced HTML size */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <SmoothScroll>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />

                    <ClientLayout />
                    <Preloader />
                    <StickyEmail />
                </SmoothScroll>
            </body>
            <GoogleAnalytics gaId="G-MBGQG95ZVK" />
            <Analytics />
        </html>
    );
}
