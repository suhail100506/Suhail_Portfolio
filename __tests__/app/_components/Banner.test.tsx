import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '@/app/_components/Banner';
import { GENERAL_INFO } from '@/lib/data';

// Mock GSAP and its plugins
jest.mock('gsap', () => ({
    __esModule: true,
    default: {
        registerPlugin: jest.fn(),
        timeline: jest.fn(() => ({
            fromTo: jest.fn(),
            to: jest.fn(),
        })),
        set: jest.fn(),
        to: jest.fn(),
    },
}));

jest.mock('gsap/all', () => ({
    ScrollTrigger: {},
}));

jest.mock('@gsap/react', () => ({
    useGSAP: jest.fn((callback) => {
        // Don't execute the callback to avoid GSAP animations in tests
    }),
}));

// Mock child components
jest.mock('@/components/ArrowAnimation', () => {
    return function ArrowAnimation() {
        return <div data-testid="arrow-animation" />;
    };
});

jest.mock('@/components/Button', () => {
    return function Button({
        children,
        as,
        href,
        variant,
        className,
        ...rest
    }: any) {
        const Component = as === 'link' ? 'a' : 'button';
        return (
            <Component
                href={href}
                className={className}
                data-variant={variant}
                {...rest}
            >
                {children}
            </Component>
        );
    };
});

describe('Banner Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render the banner section', () => {
            const { container } = render(<Banner />);
            const section = container.querySelector('section#banner');
            expect(section).toBeInTheDocument();
            expect(section).toHaveAttribute('id', 'banner');
        });

        it('should render the arrow animation component', () => {
            render(<Banner />);
            expect(screen.getByTestId('arrow-animation')).toBeInTheDocument();
        });

        it('should have proper container structure', () => {
            const { container } = render(<Banner />);
            const mainContainer = container.querySelector('.container');
            expect(mainContainer).toBeInTheDocument();
            expect(mainContainer).toHaveClass('h-[100svh]');
        });
    });

    describe('Content', () => {
        it('should render the main title with correct text', () => {
            render(<Banner />);
            expect(screen.getByText('FULL STACK')).toBeInTheDocument();
            expect(screen.getByText('DEVELOPER')).toBeInTheDocument();
        });

        it('should render the greeting with developer name', () => {
            render(<Banner />);
            expect(screen.getByText(/Hi! I'm/i)).toBeInTheDocument();
            expect(screen.getByText('MOHAMMED SUHAIL')).toBeInTheDocument();
        });

        it('should render the description text', () => {
            render(<Banner />);
            const description = screen.getByText(
                /A passionate Full Stack Developer with experience in React.js/i,
            );
            expect(description).toBeInTheDocument();
        });

        it('should display experience metrics', () => {
            render(<Banner />);
            expect(screen.getByText('1+')).toBeInTheDocument();
            expect(screen.getByText('Years of Experience')).toBeInTheDocument();
        });

        it('should display projects completed metric', () => {
            render(<Banner />);
            expect(screen.getByText('3+')).toBeInTheDocument();
            expect(screen.getByText('Completed Projects')).toBeInTheDocument();
        });
    });

    describe('Call-to-Action Buttons', () => {
        it('should render "Hire Me" button with correct link', () => {
            render(<Banner />);
            const hireButton = screen.getByRole('link', { name: /hire me/i });
            expect(hireButton).toBeInTheDocument();
            expect(hireButton).toHaveAttribute(
                'href',
                'https://www.linkedin.com/in/mohammed-suhail-m-52a847333/',
            );
            expect(hireButton).toHaveAttribute('target', '_blank');
            expect(hireButton).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('should render "Download CV" button with correct link', () => {
            render(<Banner />);
            const cvButton = screen.getByRole('link', { name: /download cv/i });
            expect(cvButton).toBeInTheDocument();
            expect(cvButton).toHaveAttribute('href', GENERAL_INFO.cvDownload);
            expect(cvButton).toHaveAttribute('target', '_blank');
            expect(cvButton).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('should render buttons with correct variants', () => {
            render(<Banner />);
            const hireButton = screen.getByRole('link', { name: /hire me/i });
            const cvButton = screen.getByRole('link', { name: /download cv/i });

            expect(hireButton).toHaveAttribute('data-variant', 'primary');
            expect(cvButton).toHaveAttribute('data-variant', 'light');
        });

        it('should have slide-up-and-fade class on CTA buttons', () => {
            render(<Banner />);
            const hireButton = screen.getByRole('link', { name: /hire me/i });
            const cvButton = screen.getByRole('link', { name: /download cv/i });

            expect(hireButton).toHaveClass('slide-up-and-fade');
            expect(cvButton).toHaveClass('slide-up-and-fade');
        });
    });

    describe('Styling & Animation Classes', () => {
        it('should apply slide-up-and-fade class to animated elements', () => {
            const { container } = render(<Banner />);
            const animatedElements =
                container.querySelectorAll('.slide-up-and-fade');

            // Title, description, 2 buttons, 2 stats = 6 elements
            expect(animatedElements.length).toBeGreaterThanOrEqual(5);
        });

        it('should have primary color class on title text', () => {
            const { container } = render(<Banner />);
            const primaryText = container.querySelector('.text-primary');
            expect(primaryText).toBeInTheDocument();
            expect(primaryText?.textContent).toBe('FULL STACK');
        });

        it('should apply proper typography classes to title', () => {
            render(<Banner />);
            const { container } = render(<Banner />);
            const title = container.querySelector('.banner-title');
            expect(title).toHaveClass('font-anton');
            expect(title).toHaveClass('leading-[.95]');
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic HTML structure', () => {
            const { container } = render(<Banner />);
            const section = container.querySelector('section');
            expect(section).toBeInTheDocument();
            expect(section?.tagName).toBe('SECTION');
        });

        it('should have accessible heading hierarchy', () => {
            render(<Banner />);
            const mainHeading = screen.getByRole('heading', { level: 1 });
            expect(mainHeading).toBeInTheDocument();
            expect(mainHeading.textContent).toContain('FULL STACK');
        });

        it('should use proper apostrophe entity in greeting', () => {
            const { container } = render(<Banner />);
            // The component uses &apos; which should render correctly
            expect(screen.getByText(/Hi! I'm/i)).toBeInTheDocument();
        });

        it('should have external links with security attributes', () => {
            render(<Banner />);
            const externalLinks = screen.getAllByRole('link');

            externalLinks.forEach((link) => {
                expect(link).toHaveAttribute('target', '_blank');
                expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
        });
    });

    describe('Responsive Design Classes', () => {
        it('should have responsive classes on main container', () => {
            const { container } = render(<Banner />);
            const mainContainer = container.querySelector('.container');
            expect(mainContainer?.className).toMatch(/max-md:/);
        });

        it('should have responsive text sizing on title', () => {
            const { container } = render(<Banner />);
            const title = container.querySelector('.banner-title');
            expect(title?.className).toContain('text-6xl');
            expect(title?.className).toContain('sm:text-[80px]');
        });

        it('should have responsive layout for stats section', () => {
            const { container } = render(<Banner />);
            const statsContainer = container.querySelector('.md\\:absolute');
            expect(statsContainer).toBeInTheDocument();
        });
    });

    describe('Layout Structure', () => {
        it('should position stats absolutely on desktop', () => {
            const { container } = render(<Banner />);
            const statsSection = container.querySelector(
                '.md\\:absolute.bottom-\\[10\\%\\]',
            );
            expect(statsSection).toBeInTheDocument();
        });

        it('should have proper gap spacing between buttons', () => {
            const { container } = render(<Banner />);
            const buttonContainer = container.querySelector('.flex.gap-4.mt-9');
            expect(buttonContainer).toBeInTheDocument();
        });

        it('should render all metrics in stats section', () => {
            const { container } = render(<Banner />);
            const statsSection = container.querySelector(
                '.md\\:flex-col.gap-4',
            );
            const metrics = statsSection?.querySelectorAll(
                'div.slide-up-and-fade',
            );

            // There are 3 divs, but one is commented out (hours worked)
            expect(metrics?.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('Content Validation', () => {
        it('should not contain placeholder or lorem ipsum text', () => {
            const { container } = render(<Banner />);
            const text = container.textContent || '';
            expect(text.toLowerCase()).not.toContain('lorem');
            expect(text.toLowerCase()).not.toContain('ipsum');
        });

        it('should display actual experience and project numbers', () => {
            render(<Banner />);
            expect(screen.getByText('1+')).toBeInTheDocument();
            expect(screen.getByText('3+')).toBeInTheDocument();
        });
        it('should have valid CV download path from data config', () => {
            render(<Banner />);
            const cvButton = screen.getByRole('link', { name: /download cv/i });
            expect(cvButton.getAttribute('href')).toBe(
                GENERAL_INFO.cvDownload,
            );
        });
    });
});
