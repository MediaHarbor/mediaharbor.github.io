type Props = {
  src?: string;
  alt: string;
  caption?: string;
  eager?: boolean;
};

export function ScreenshotFrame({ src, alt, caption, eager = false }: Props) {
  return (
    <figure className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/40">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        {caption && (
          <span className="ml-3 text-xs text-muted-foreground truncate">{caption}</span>
        )}
      </div>
      <div className="shot-frame">
        {src && (
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).remove();
            }}
          />
        )}
      </div>
    </figure>
  );
}
