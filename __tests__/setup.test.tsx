/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

describe('Testing Infrastructure', () => {
    it('should run basic test', () => {
        expect(true).toBe(true);
    });

    it('should render a simple React component', () => {
        const TestComponent = () => <div>Hello Test</div>;
        render(<TestComponent />);

        expect(screen.getByText('Hello Test')).toBeInTheDocument();
    });

    it('should have access to Next.js mocks', () => {
        const { useRouter } = require('next/navigation');
        const router = useRouter();

        expect(router.push).toBeDefined();
        expect(router.back).toBeDefined();
    });

    it('should have IntersectionObserver mock', () => {
        expect(global.IntersectionObserver).toBeDefined();

        const observer = new IntersectionObserver(() => {});
        expect(observer.observe).toBeDefined();
        expect(observer.disconnect).toBeDefined();
    });

    it('should have matchMedia mock', () => {
        expect(window.matchMedia).toBeDefined();

        const mediaQuery = window.matchMedia('(min-width: 768px)');
        expect(mediaQuery.matches).toBeDefined();
        expect(mediaQuery.addEventListener).toBeDefined();
    });
});
