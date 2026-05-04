import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { StoreBadge } from './StoreBadge';

type Props = {
  store: 'flathub' | 'snap';
  title: string;
  description: ReactNode;
  command: string;
  href: string;
  detected?: boolean;
  recommended?: boolean;
};

export function StoreBadgeCard({
  store,
  title,
  description,
  command,
  href,
  detected,
  recommended,
}: Props) {
  return (
    <div
      className={`rounded-xl border bg-card p-5 flex flex-col gap-4 ${
        detected ? 'border-primary/50 ring-1 ring-primary/30' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        {recommended && !detected && (
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-primary">
            Recommended
          </span>
        )}
        {detected && (
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-primary">
            Detected
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      <StoreBadge store={store} className="inline-flex" />
      <code className="rounded-md bg-muted/60 px-3 py-2 text-xs font-mono text-foreground break-all">
        {command}
      </code>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
        style={{ minHeight: 44, padding: '0 14px' }}
      >
        Open store <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
