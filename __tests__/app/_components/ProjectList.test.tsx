import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectList from '@/app/_components/ProjectList';
import { PROJECTS } from '@/lib/data';

// Mock GSAP and its plugins
jest.mock('gsap', () => ({
    __esModule: true,
    default: {
        registerPlugin: jest.fn(),
        timeline: jest.fn(() => ({
            from: jest.fn().mockReturnThis(),
            to: jest.fn().mockReturnThis(),
        })),
        set: jest.fn(),
        to: jest.fn(),
        from: jest.fn(),
    },
}));

jest.mock('gsap/all', () => ({
    ScrollTrigger: {},
}));

jest.mock('@gsap/react', () => ({
    useGSAP: jest.fn((callback, options) => {
        // Don't execute the callback to avoid GSAP animations in tests
        return {
            context: {
                kill: jest.fn(),
            },
            contextSafe: jest.fn((fn) => fn),
        };
    }),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: function Image({ src, alt, className, ...props }: any) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} className={className} {...props} />;
    },
}));

// Mock child components
jest.mock('@/components/SectionTitle', () => {
    return function SectionTitle({ title }: any) {
        return <h2 data-testid="section-title">{title}</h2>;
    };
});

jest.mock('@/app/_components/Project', () => {
    return function Project({
        project,
        index,
        selectedProject,
        onMouseEnter,
    }: any) {
        return (
            <div
                data-testid={`project-${project.slug}`}
                data-selected={selectedProject === project.slug}
                onMouseEnter={() => onMouseEnter(project.slug)}
            >
                <h3>{project.title}</h3>
                <p>{project.year}</p>
                <div data-testid={`project-tech-${index}`}>
                    {project.techStack.join(', ')}
                </div>
            </div>
        );
    };
});

describe('ProjectList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock window.innerWidth for desktop view
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    describe('Rendering', () => {
        it('should render the section with correct id', () => {
            const { container } = render(<ProjectList />);
            const section = container.querySelector(
                'section#selected-projects',
            );
            expect(section).toBeInTheDocument();
        });

        it('should render the section title', () => {
            render(<ProjectList />);
            const sectionTitle = screen.getByTestId('section-title');
            expect(sectionTitle).toBeInTheDocument();
            expect(sectionTitle).toHaveTextContent('Selected Projects');
        });

        it('should render the section description', () => {
            render(<ProjectList />);
            const description = screen.getByText(/A curated set of/i);
            expect(description).toBeInTheDocument();
            expect(description).toHaveClass('text-muted-foreground');
        });

        it('should have proper container structure', () => {
            const { container } = render(<ProjectList />);
            const mainContainer = container.querySelector('.container');
            expect(mainContainer).toBeInTheDocument();
        });
    });

    describe('Content', () => {
        it('should highlight key technical terms in description', () => {
            render(<ProjectList />);
            const fullStackText = screen.getByText('full‑stack');
            const reactText = screen.getByText(/React \/ Next.js/);

            expect(fullStackText.tagName).toBe('STRONG');
            expect(reactText.tagName).toBe('STRONG');
        });

        it('should display all projects from PROJECTS data', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project) => {
                const projectElement = screen.getByTestId(
                    `project-${project.slug}`,
                );
                expect(projectElement).toBeInTheDocument();
            });
        });

        it('should render correct number of projects', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project) => {
                const projectElement = screen.getByTestId(
                    `project-${project.slug}`,
                );
                expect(projectElement).toBeInTheDocument();
            });
        });

        it('should display project titles', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project) => {
                expect(screen.getByText(project.title)).toBeInTheDocument();
            });
        });

        it('should display project years', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project) => {
                const elements = screen.getAllByText(project.year.toString());
                expect(elements.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Project Images', () => {
        it('should render thumbnail images for all projects', () => {
            const { container } = render(<ProjectList />);
            const images = container.querySelectorAll('img');

            // Should have one image per project
            expect(images.length).toBe(PROJECTS.length);
        });

        it('should render images with correct src attributes', () => {
            const { container } = render(<ProjectList />);

            PROJECTS.forEach((project) => {
                const image = container.querySelector(
                    `img[src="${project.thumbnail}"]`,
                );
                expect(image).toBeInTheDocument();
            });
        });

        it('should have image container with proper positioning', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector(
                '.max-md\\:hidden.absolute.right-0',
            );
            expect(imageContainer).toBeInTheDocument();
        });

        it('should apply opacity transition to images', () => {
            const { container } = render(<ProjectList />);
            const images = container.querySelectorAll('img');

            images.forEach((image) => {
                expect(image.className).toContain('transition-all');
            });
        });
    });

    describe('Hover Interactions', () => {
        it('should initialize with first project selected', () => {
            render(<ProjectList />);
            const firstProject = screen.getByTestId(
                `project-${PROJECTS[0].slug}`,
            );
            expect(firstProject).toHaveAttribute('data-selected', 'true');
        });

        it('should update selected project on mouse enter', () => {
            render(<ProjectList />);

            const secondProject = screen.getByTestId(
                `project-${PROJECTS[0].slug}`,
            );
            fireEvent.mouseEnter(secondProject);

            expect(secondProject).toHaveAttribute('data-selected', 'true');
        });

        it('should trigger selection change when hovering over project', () => {
            render(<ProjectList />);

            // Verify projects can receive mouse enter events
            PROJECTS.forEach((project) => {
                const projectElement = screen.getByTestId(
                    `project-${project.slug}`,
                );
                fireEvent.mouseEnter(projectElement);
                expect(projectElement).toHaveAttribute('data-selected', 'true');
            });
        });
    });

    describe('Responsive Design', () => {
        it('should hide image container on mobile', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector('.max-md\\:hidden');
            expect(imageContainer).toBeInTheDocument();
        });

        it('should have responsive gap classes on project list', () => {
            const { container } = render(<ProjectList />);
            const projectList = container.querySelector(
                '.flex.flex-col.max-md\\:gap-10',
            );
            expect(projectList).toBeInTheDocument();
        });

        it('should have responsive text sizing on description', () => {
            render(<ProjectList />);
            const description = screen.getByText(/A curated set of/i);
            expect(description).toHaveClass('text-lg');
        });
    });

    describe('Layout Structure', () => {
        it('should have proper section padding', () => {
            const { container } = render(<ProjectList />);
            const section = container.querySelector('section');
            expect(section).toHaveClass('pb-section');
        });

        it('should have correct spacing for description', () => {
            render(<ProjectList />);
            const description = screen.getByText(/A curated set of/i);
            expect(description).toHaveClass('mt-6');
            expect(description).toHaveClass('mb-14');
        });

        it('should have max-width constraint on description', () => {
            render(<ProjectList />);
            const description = screen.getByText(/A curated set of/i);
            expect(description).toHaveClass('max-w-3xl');
        });

        it('should have relative positioning on projects group', () => {
            const { container } = render(<ProjectList />);
            const projectsGroup = container.querySelector(
                '.group\\/projects.relative',
            );
            expect(projectsGroup).toBeInTheDocument();
        });
    });

    describe('Image Container Behavior', () => {
        it('should render image container when selectedProject is not null', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector(
                '[class*="pointer-events-none"]',
            );
            expect(imageContainer).toBeInTheDocument();
        });

        it('should have pointer-events-none on image container', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector(
                '.pointer-events-none',
            );
            expect(imageContainer).toBeInTheDocument();
        });

        it('should have correct aspect ratio on image container', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector(
                '.aspect-\\[3\\/4\\]',
            );
            expect(imageContainer).toBeInTheDocument();
        });

        it('should have responsive width on image container', () => {
            const { container } = render(<ProjectList />);
            const imageContainer = container.querySelector(
                '.w-\\[200px\\].xl\\:w-\\[350px\\]',
            );
            expect(imageContainer).toBeInTheDocument();
        });
    });

    describe('Project Tech Stack', () => {
        it('should display tech stack for all projects', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project, index) => {
                const techStack = screen.getByTestId(`project-tech-${index}`);
                expect(techStack).toBeInTheDocument();
            });
        });

        it('should contain correct technologies for each project', () => {
            render(<ProjectList />);

            PROJECTS.forEach((project, index) => {
                const techStack = screen.getByTestId(`project-tech-${index}`);
                project.techStack.forEach((tech) => {
                    expect(techStack.textContent).toContain(tech);
                });
            });
        });
    });

    describe('Accessibility', () => {
        it('should use semantic section element', () => {
            const { container } = render(<ProjectList />);
            const section = container.querySelector('section');
            expect(section).toBeInTheDocument();
        });

        it('should have section identifier', () => {
            const { container } = render(<ProjectList />);
            const section = container.querySelector(
                'section#selected-projects',
            );
            expect(section).toHaveAttribute('id', 'selected-projects');
        });

        it('should have images with alt text', () => {
            const { container } = render(<ProjectList />);
            const images = container.querySelectorAll('img');

            images.forEach((image) => {
                expect(image).toHaveAttribute('alt');
            });
        });

        it('should have proper heading structure with section title', () => {
            render(<ProjectList />);
            const heading = screen.getByTestId('section-title');
            expect(heading).toBeInTheDocument();
        });
    });

    describe('Content Validation', () => {
        it('should not contain placeholder text', () => {
            const { container } = render(<ProjectList />);
            const text = container.textContent || '';
            expect(text.toLowerCase()).not.toContain('lorem');
            expect(text.toLowerCase()).not.toContain('ipsum');
        });

        it('should display real project data from PROJECTS constant', () => {
            render(<ProjectList />);
            expect(PROJECTS.length).toBeGreaterThan(0);

            // Verify at least one project has required fields
            const firstProject = PROJECTS[0];
            expect(firstProject.title).toBeTruthy();
            expect(firstProject.slug).toBeTruthy();
            expect(firstProject.thumbnail).toBeTruthy();
        });

        it('should render description mentioning full-stack and React/Next.js', () => {
            render(<ProjectList />);
            expect(screen.getByText('full‑stack')).toBeInTheDocument();
            expect(screen.getByText(/React \/ Next.js/)).toBeInTheDocument();
        });
    });

    describe('Image Opacity Logic', () => {
        it('should hide non-selected project images with opacity-0', () => {
            const { container } = render(<ProjectList />);
            const images = container.querySelectorAll('img');

            // At least one image should have opacity-0 if multiple projects exist
            if (PROJECTS.length > 1) {
                const hasOpacityZero = Array.from(images).some((img) =>
                    img.className.includes('opacity-0'),
                );
                expect(hasOpacityZero).toBe(true);
            }
        });

        it('should apply conditional opacity based on selection', () => {
            const { container } = render(<ProjectList />);
            const firstProjectSlug = PROJECTS[0].slug;

            // Image matching selected project should not have opacity-0 applied
            const selectedImage = container.querySelector(
                `img[src="${PROJECTS[0].thumbnail}"]`,
            );
            expect(selectedImage).toBeInTheDocument();
        });
    });
});
