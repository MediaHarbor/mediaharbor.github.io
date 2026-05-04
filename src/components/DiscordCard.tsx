import { useEffect, useState } from 'react';
import { SiDiscord } from 'react-icons/si';
import { ArrowRight } from 'lucide-react';
import { DISCORD_GUILD_ID, DISCORD_URL } from '../data/links';

interface WidgetMember {
  id: string;
  username: string;
  avatar_url: string;
}

interface WidgetData {
  presence_count: number;
  members: WidgetMember[];
}

const CACHE_KEY = 'mh-discord-widget';
const CACHE_TTL_MS = 5 * 60 * 1000;

function readCache(): WidgetData | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: WidgetData };
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: WidgetData) {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    return;
  }
}

export function DiscordCard() {
  const [data, setData] = useState<WidgetData | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setData(cached);
      return;
    }
    const ctrl = new AbortController();
    fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<WidgetData>) : null))
      .then((d) => {
        if (!d) return;
        setData(d);
        writeCache(d);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const avatars = (data?.members ?? []).slice(0, 5);

  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted/60 text-muted-foreground shrink-0">
          <SiDiscord className="h-4 w-4" />
        </span>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="font-semibold text-sm">Join the community</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get help, share what you’re building, follow release notes, and chat with the
            MediaHarbor team and other users on Discord.
          </p>
          {data && (
            <div className="flex items-center gap-3 pt-1.5 flex-wrap">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>
                  <span className="font-semibold text-foreground">{data.presence_count}</span>{' '}
                  online now
                </span>
              </span>
              {avatars.length > 0 && (
                <div className="flex -space-x-2">
                  {avatars.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar_url}
                      alt={m.username}
                      loading="lazy"
                      className="h-5 w-5 rounded-full border-2 border-card bg-muted"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-medium hover:bg-muted transition-colors shrink-0"
          style={{ minHeight: 44, padding: '0 14px' }}
        >
          Open Discord <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
