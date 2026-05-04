import type { ComponentType, MouseEvent } from 'react';
import { findAsset, type ReleaseInfo } from '../hooks/useLatestRelease';
import { RELEASES_FALLBACK, type AssetSpec } from '../data/releaseAssets';

type Props = {
  spec: AssetSpec;
  release: ReleaseInfo | null;
  primary?: boolean;
  detected?: boolean;
  icon?: ComponentType<{ className?: string }>;
  onBeforeDownload?: (href: string) => boolean;
};

function fmtSize(bytes?: number) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 100) return `${mb.toFixed(0)} MB`;
  return `${mb.toFixed(1)} MB`;
}

export function OSDownloadCard({
  spec,
  release,
  primary,
  detected,
  icon: Icon,
  onBeforeDownload,
}: Props) {
  const asset = findAsset(release, spec.suffix);
  const href = asset?.browser_download_url ?? RELEASES_FALLBACK;
  const size = fmtSize(asset?.size);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onBeforeDownload && !onBeforeDownload(href)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`rounded-xl border bg-card p-5 flex flex-col gap-3 ${
        detected ? 'border-primary/50 ring-1 ring-primary/30' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <h4 className="font-semibold text-sm">{spec.label}</h4>
        {detected && (
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-primary">
            Detected
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{spec.hint}</p>
      <a
        href={href}
        rel="noreferrer"
        onClick={handleClick}
        className={`mt-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
          primary
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-border bg-card text-foreground hover:bg-muted'
        }`}
        style={{ minHeight: 44, padding: '0 14px' }}
      >
        Download {spec.suffix} {size && <span className="ml-2 text-xs opacity-70">{size}</span>}
      </a>
    </div>
  );
}
