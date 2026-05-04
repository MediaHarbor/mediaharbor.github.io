import { useMemo } from 'react';

export function useBrowserLocale(): string {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return 'en';
    const raw = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const short = raw.toLowerCase().split('-')[0];
    return short || 'en';
  }, []);
}
