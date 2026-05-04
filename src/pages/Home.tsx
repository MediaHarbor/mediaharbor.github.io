import { Link } from 'react-router-dom';
import { Download, Library, Settings } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { ScreenshotFrame } from '../components/ScreenshotFrame';
import { FeatureCard } from '../components/FeatureCard';
import { DiscordCard } from '../components/DiscordCard';
import { PlatformIcon } from '../components/PlatformIcon';
import { Seo } from '../components/Seo';
import { GITHUB_URL } from '../data/links';

const SERVICES: { id: string; label: string; color: string }[] = [
  { id: 'spotify', label: 'Spotify', color: '#1DB954' },
  { id: 'tidal', label: 'Tidal', color: 'currentColor' },
  { id: 'deezer', label: 'Deezer', color: '#A238FF' },
  { id: 'qobuz', label: 'Qobuz', color: 'currentColor' },
  { id: 'applemusic', label: 'Apple Music', color: '#FA243C' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'youtubemusic', label: 'YT Music', color: '#FF0000' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <Seo
        title="MediaHarbor"
        description="Search, stream, and download music from Spotify, Tidal, Deezer, Qobuz, Apple Music, YouTube and YouTube Music — all from one cross-platform desktop app."
        path="/"
      />

      <section className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
          Your music downloader.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Search seven music platforms from one bar. Stream tracks with crossfade and synced lyrics.
          Download to FLAC, AAC, MP3, or OGG straight to a folder you own.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/download"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
            style={{ minHeight: 44, padding: '0 18px' }}
          >
            <Download className="h-4 w-4" /> Download
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card hover:bg-muted transition-colors text-sm font-medium"
            style={{ minHeight: 44, padding: '0 18px' }}
          >
            <SiGithub className="h-4 w-4" /> View on GitHub
          </a>
        </div>
      </section>

      <ScreenshotFrame
        src="/screenshots/home.png"
        alt="MediaHarbor app — search results across seven platforms"
        caption="MediaHarbor — Search"
        eager
      />

      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What it does.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={Download}
            title="Download anything"
            body="Pull tracks, albums, and playlists from Spotify, Tidal, Deezer, Qobuz, Apple Music, YouTube, and YT Music — at the highest quality your account allows."
          />
          <FeatureCard
            icon={Library}
            title="Own your library"
            body="Point at any folder, rescan, and MediaHarbor builds a real library — tags, covers, search, and a player with crossfade and synced lyrics."
          />
          <FeatureCard
            icon={Settings}
            title="Configure once"
            body="Sign in with your own credentials, set output paths, choose formats, and let MediaHarbor stay out of your way."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Supported services.</h2>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
            >
              <PlatformIcon platform={s.id} size={14} color={s.color} />
              {s.label}
            </span>
          ))}
        </div>
      </section>

      <DiscordCard />
    </div>
  );
}
