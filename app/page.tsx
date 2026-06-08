import dynamic from 'next/dynamic';
import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Skills from './_components/Skills';

// Lazy load below-fold components for better performance
const Experiences = dynamic(() => import('./_components/Experiences'), {
    loading: () => null,
});
const ProjectList = dynamic(() => import('./_components/ProjectList'), {
    loading: () => null,
});

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
        </div>
    );
}
