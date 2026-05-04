import { ScreenshotFrame } from '../components/ScreenshotFrame';
import { PreviewBanner } from '../components/PreviewBanner';
import { FeatureCard } from '../components/FeatureCard';
import { KeyRound, FolderCog, SlidersHorizontal } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function Settings() {
  return (
    <div className="space-y-10">
      <Seo
        title="Settings — MediaHarbor"
        description="Sign in with your own credentials, set output paths, choose default formats, and tune crossfade."
        path="/settings"
        noindex
      />
      <PreviewBanner name="Settings" />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Configure once.</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Sign in with your own credentials, set output paths, choose default formats, tune crossfade,
          and stay in control of where every file lands.
        </p>
      </header>

      <ScreenshotFrame
        src="/screenshots/settings.png"
        alt="MediaHarbor Settings page"
        caption="MediaHarbor — Settings"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FeatureCard
          icon={KeyRound}
          title="Credentials"
          body="Paste cookies.txt for Spotify and Apple Music, your Deezer arl, or your Qobuz email/token. Stored locally on your machine."
        />
        <FeatureCard
          icon={FolderCog}
          title="Output paths"
          body="Pick a download folder per service, or one folder for everything. Library auto-scans the folders you point at."
        />
        <FeatureCard
          icon={SlidersHorizontal}
          title="Player tuning"
          body="Toggle crossfade and choose its duration, set default formats and quality, and decide whether downloads start automatically."
        />
      </section>
    </div>
  );
}
