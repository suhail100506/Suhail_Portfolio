import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                404 - Page Not Found
            </h1>
            <p style={{ marginBottom: '2rem' }}>
                Sorry, the page you are looking for does not exist.
                <br />
                Please check the URL or return to the homepage.
            </p>
            <Link
                href="/"
                style={{ color: '#0070f3', textDecoration: 'underline' }}
            >
                Go to Homepage
            </Link>
        </div>
    );
}
