import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Download, CircleHelp, Search, Library, Settings } from 'lucide-react';
import { SiGithub, SiDiscord } from 'react-icons/si';
import { ThemeToggle } from './ThemeToggle';
import { DISCORD_URL, GITHUB_URL } from '../data/links';

type NavItem = { to: string; icon: React.ComponentType<{ className?: string }>; label: string };

const TOP: NavItem[] = [
  { to: '/',         icon: Home,       label: 'Home' },
  { to: '/download', icon: Download,   label: 'Download' },
  { to: '/faq',      icon: CircleHelp, label: 'FAQ' },
];

const PREVIEW: NavItem[] = [
  { to: '/search',   icon: Search,   label: 'Search' },
  { to: '/library',  icon: Library,  label: 'Library' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

function Item({ to, icon: Icon, label }: NavItem) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 min-h-11 ${
          isActive
            ? 'text-accent-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 rounded-lg bg-accent"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
            />
          )}
          <Icon className="relative z-10 h-4 w-4 shrink-0" />
          <span className="relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside
      className="flex flex-col w-56 shrink-0 border-r border-border bg-card/40 select-none h-full"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('a')) onNavigate?.();
      }}
    >
      <div className="flex items-center h-14 px-3 gap-2.5 shrink-0 border-b border-border/40">
        <img src="/icon.png" alt="" className="h-7 w-7 rounded-lg shrink-0" />
        <span className="font-semibold text-sm tracking-tight flex-1">MediaHarbor</span>
      </div>

      <nav className="py-3 px-2 space-y-0.5">
        {TOP.map((item) => <Item key={item.to} {...item} />)}
      </nav>

      <div className="px-4 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">App preview</p>
      </div>
      <nav className="py-2 px-2 space-y-0.5">
        {PREVIEW.map((item) => <Item key={item.to} {...item} />)}
      </nav>

      <div className="flex-1" />

      <nav className="border-t border-border/40 py-3 px-2 space-y-0.5">
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors min-h-11"
        >
          <SiDiscord className="h-4 w-4 shrink-0" />
          <span>Discord</span>
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors min-h-11"
        >
          <SiGithub className="h-4 w-4 shrink-0" />
          <span>GitHub</span>
        </a>
        <div className="px-3 pt-2">
          <ThemeToggle />
        </div>
      </nav>
    </aside>
  );
}
