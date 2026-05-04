import type { ComponentType } from 'react';

type Props = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

export function FeatureCard({ icon: Icon, title, body }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary/15 text-primary mb-3">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-base font-semibold mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
