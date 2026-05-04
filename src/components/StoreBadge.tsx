import { useTheme } from '../hooks/useTheme';
import { useBrowserLocale } from '../hooks/useBrowserLocale';
import { FLATHUB_URL, SNAPCRAFT_URL } from '../data/links';

const SNAP_BADGE_LOCALES = new Set(['en', 'ar', 'bg', 'de', 'es', 'fr', 'pl']);

const FLATHUB_BADGE_LOCALES = new Set([
  'en', 'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'es', 'et', 'fa', 'fi',
  'fr', 'gl', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'nl',
  'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'uk', 'vi',
]);

type Props = {
  store: 'flathub' | 'snap';
  className?: string;
};

export function StoreBadge({ store, className }: Props) {
  const { resolved } = useTheme();
  const locale = useBrowserLocale();

  if (store === 'flathub') {
    const lang = FLATHUB_BADGE_LOCALES.has(locale) ? locale : 'en';
    const variant = resolved === 'light' ? 'light.svg' : 'dark.svg';
    const src = `/badges/flathub/${lang}/${variant}`;
    return (
      <a
        href={FLATHUB_URL}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label="Get it on Flathub"
      >
        <img src={src} alt="Download on Flathub" loading="lazy" className="h-14 w-auto" />
      </a>
    );
  }

  const lang = SNAP_BADGE_LOCALES.has(locale) ? locale : 'en';
  const variant = resolved === 'dark' ? 'snap-store-white.svg' : 'snap-store-black.svg';
  const src = `/badges/snap/${lang}/${variant}`;
  return (
    <a
      href={SNAPCRAFT_URL}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label="Get it from the Snap Store"
    >
      <img src={src} alt="Get it from the Snap Store" loading="lazy" className="h-14 w-auto" />
    </a>
  );
}
