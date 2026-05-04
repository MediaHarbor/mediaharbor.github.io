import { DISCORD_URL, GITHUB_URL } from '../data/links';

export function Footer() {
  return (
    <footer className="pt-8 mt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>© MediaHarbor · GPL-3.0</span>
      <div className="flex items-center gap-4">
        <a className="hover:text-foreground" href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          className="hover:text-foreground"
          href={`${GITHUB_URL}/issues`}
          target="_blank"
          rel="noreferrer"
        >
          Issues
        </a>
        <a className="hover:text-foreground" href={DISCORD_URL} target="_blank" rel="noreferrer">
          Discord
        </a>
      </div>
    </footer>
  );
}
