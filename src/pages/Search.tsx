import { ScreenshotFrame } from '../components/ScreenshotFrame';
import { PreviewBanner } from '../components/PreviewBanner';
import { FeatureCard } from '../components/FeatureCard';
import { Search as SearchIcon, Filter, Play } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function Search() {
  return (
    <div className="space-y-10">
      <Seo
        title="Search — MediaHarbor"
        description="Search across Spotify, Tidal, Deezer, Qobuz, Apple Music, YouTube, and YouTube Music side-by-side from a single bar."
        path="/search"
        noindex
      />
      <PreviewBanner name="Search" />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Search 7 platforms at once.</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          One bar, one click. Results from Spotify, Tidal, Deezer, Qobuz, Apple Music, YouTube, and YT Music — side
          by side. Queue or download in one click.
        </p>
      </header>

      <ScreenshotFrame
        src="/screenshots/search.png"
        alt="MediaHarbor Search page"
        caption="MediaHarbor — Search"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FeatureCard
          icon={SearchIcon}
          title="Type, get suggestions"
          body="As you type, the bar pulls live music-aware suggestions from the iTunes catalog, grouped by Artist, Track, and Album. Use ↑/↓, hit Enter."
        />
        <FeatureCard
          icon={Filter}
          title="Pick a platform"
          body="Each platform gets its own colored chip. Click to filter — chip color follows the brand, so the UI tells you which library you're looking at."
        />
        <FeatureCard
          icon={Play}
          title="Play or download"
          body="Every result has a play button and a download button. Playing auto-enqueues all current results; downloading prompts a quality selector."
        />
      </section>
    </div>
  );
}
