import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-4">
      <Seo
        title="Not found — MediaHarbor"
        description="The page you tried to open does not exist."
        path="/404"
        noindex
      />
      <p className="text-6xl font-extrabold tracking-tight">404</p>
      <h1 className="text-xl font-semibold">Track not found.</h1>
      <p className="text-muted-foreground">The page you tried to open does not exist.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
        style={{ minHeight: 44, padding: '0 18px' }}
      >
        Back to home
      </Link>
    </div>
  );
}
