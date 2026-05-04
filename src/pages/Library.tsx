import { ScreenshotFrame } from '../components/ScreenshotFrame';
import { PreviewBanner } from '../components/PreviewBanner';
import { FeatureCard } from '../components/FeatureCard';
import { Music2, FileText, Disc3 } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function Library() {
  return (
    <div className="space-y-10">
      <Seo
        title="Library — MediaHarbor"
        description="Point MediaHarbor at any folder and get a real local library: tags, covers, search, sort, and a player with crossfade and synced lyrics."
        path="/library"
        noindex
      />
      <PreviewBanner name="Library" />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The library you actually own.</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Point at any folder and MediaHarbor builds a real library — tags, covers, search, sort, and a player with
          crossfade and synced lyrics.
        </p>
      </header>

      <ScreenshotFrame
        src="/screenshots/library.png"
        alt="MediaHarbor Library page"
        caption="MediaHarbor — Library"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FeatureCard
          icon={Music2}
          title="Crossfade & gapless"
          body="The Web Audio engine handles crossfade between any two tracks. No stutter, no awkward silence — continuous playback the way the album was meant to flow."
        />
        <FeatureCard
          icon={FileText}
          title="Synced lyrics"
          body="Word-level and line-level synced lyrics, displayed in a dedicated panel that highlights as the song plays."
        />
        <FeatureCard
          icon={Disc3}
          title="Full-screen now-playing"
          body="A vinyl-style spinning disc, ambient backdrops drawn from cover art, and OS media controls so headphone buttons just work."
        />
      </section>
    </div>
  );
}
