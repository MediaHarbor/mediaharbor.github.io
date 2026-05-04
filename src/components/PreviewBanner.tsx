import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

export function PreviewBanner({ name }: { name: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
      <Info className="h-4 w-4 text-primary shrink-0" />
      <span>
        This is a preview of the in-app <strong>{name}</strong> screen.
      </span>
      <Link to="/download" className="underline decoration-primary/60 underline-offset-2 hover:text-primary">
        Download MediaHarbor →
      </Link>
    </div>
  );
}
