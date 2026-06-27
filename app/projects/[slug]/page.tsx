import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { PROJECTS } from '@/lib/data';
import type { Metadata } from 'next';

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) {
        return {
            title: 'Project Not Found',
            robots: { index: false, follow: false },
        };
    }
    const title = `${project.title} | ${project.techStack
        .slice(0, 3)
        .join(', ')} Full-Stack Project`;
    const description =
        project.description?.slice(0, 160) ||
        `${project.title} project built with ${project.techStack.join(', ')}`;
    const url = `https://mohammedsuhail.vercel.app/projects/${project.slug}`;
    const ogImage = '/og.png';
    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Portfolio of Mohammed Suhail',
            type: 'article',
            locale: 'en_IN',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} preview`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
        keywords: [
            project.title,
            'full-stack project',
            'react project',
            'next.js portfolio',
            ...project.techStack,
        ],
    };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetails project={project} />;
};

export default Page;
