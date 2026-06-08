import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mohammedsuhail.vercel.app';

    // Homepage
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];

    // Project pages
    PROJECTS.forEach((project) => {
        routes.push({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    });

    return routes;
}

