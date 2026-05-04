import { Menu } from 'lucide-react';

export function MobileTopbar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="flex items-center gap-3 h-14 px-3 border-b border-border bg-card/60 backdrop-blur md:hidden shrink-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open navigation menu"
        className="inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2">
        <img src="/icon.png" alt="" className="h-7 w-7 rounded-lg" />
        <span className="font-semibold text-sm tracking-tight">MediaHarbor</span>
      </div>
    </header>
  );
}
