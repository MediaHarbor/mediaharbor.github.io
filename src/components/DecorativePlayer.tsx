import { Play, SkipBack, SkipForward, Volume2, Music2, Shuffle, Repeat } from 'lucide-react';

export function DecorativePlayer() {
  return (
    <div
      aria-hidden="true"
      className="hidden sm:flex h-[88px] border-t border-border bg-card shrink-0 items-center px-4 gap-4 select-none pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 w-[28%] min-w-0">
        <div className="relative shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center" style={{ width: 56, height: 56 }}>
          <Music2 className="h-6 w-6 text-muted-foreground/40" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate leading-snug">Sample Track</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">Sample Artist · MediaHarbor demo</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground/60"><Shuffle className="h-3.5 w-3.5" /></button>
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground/60"><SkipBack className="h-4 w-4" /></button>
          <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center mx-1">
            <Play className="h-[18px] w-[18px] fill-current translate-x-px" />
          </div>
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground/60"><SkipForward className="h-4 w-4" /></button>
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground/60"><Repeat className="h-3.5 w-3.5" /></button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-[480px]">
          <span className="text-[11px] text-muted-foreground tabular-nums w-8 text-right">0:42</span>
          <div className="flex-1 h-1 bg-muted-foreground/15 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60" style={{ width: '32%' }} />
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums w-8">2:14</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 w-[28%]">
        <Volume2 className="h-4 w-4 text-muted-foreground/60" />
        <div className="w-24 h-1 bg-muted-foreground/15 rounded-full overflow-hidden">
          <div className="h-full bg-muted-foreground/40" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  );
}
