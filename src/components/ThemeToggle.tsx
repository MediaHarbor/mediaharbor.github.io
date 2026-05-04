import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, cycle } = useTheme();
  const Icon = mode === 'system' ? Monitor : mode === 'light' ? Sun : Moon;
  const label = `Theme: ${mode}`;

  return (
    <button
      type="button"
      onClick={cycle}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      style={{ minWidth: 44, minHeight: 44, padding: compact ? 10 : '10px 12px' }}
    >
      <Icon className="h-4 w-4" />
      {!compact && <span className="text-xs capitalize">{mode}</span>}
    </button>
  );
}
