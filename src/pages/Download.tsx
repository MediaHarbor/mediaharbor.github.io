import { useState } from 'react';
import { Disc, ChevronDown } from 'lucide-react';
import { SiApple, SiLinux } from 'react-icons/si';
import { WindowsIcon } from '../components/WindowsIcon';
import { useDetectOS } from '../hooks/useDetectOS';
import { useLatestRelease } from '../hooks/useLatestRelease';
import { OSDownloadCard } from '../components/OSDownloadCard';
import { StoreBadgeCard } from '../components/StoreBadgeCard';
import { MacQuarantineDialog } from '../components/MacQuarantineDialog';
import {
  WINDOWS_ASSETS,
  MAC_ARM_ASSET,
  MAC_INTEL_ASSET,
  LINUX_ASSETS,
} from '../data/releaseAssets';
import { FLATHUB_URL, SNAPCRAFT_URL, AUR_URL } from '../data/links';
import { Seo } from '../components/Seo';

export default function Download() {
  const os = useDetectOS();
  const { info, error } = useLatestRelease();

  const [macDialogOpen, setMacDialogOpen] = useState(false);
  const [pendingMacHref, setPendingMacHref] = useState<string>('');

  const handleMacArmClick = (href: string) => {
    setPendingMacHref(href);
    setMacDialogOpen(true);
    return false;
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Download — MediaHarbor"
        description="Free and open source music downloader for Linux (Flatpak, Snap, AUR, deb, rpm, AppImage), Windows (msi, nsis), and macOS (Apple Silicon and Intel)."
        path="/download"
      />
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Download MediaHarbor</h1>
        <p className="text-muted-foreground max-w-2xl">
          Free and open source under GPL-3.0. No account required. Runs locally on your machine.
        </p>
        {info?.version && (
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Latest version: <span className="font-mono ml-1.5 text-foreground">v{info.version}</span>
          </div>
        )}
        {error && (
          <p className="text-xs text-muted-foreground">
            Could not load latest release info — buttons fall back to the GitHub releases page.
          </p>
        )}
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <WindowsIcon className="h-5 w-5 text-muted-foreground" /> Windows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {WINDOWS_ASSETS.map((spec, i) => (
            <OSDownloadCard
              key={spec.suffix}
              spec={spec}
              release={info}
              primary={i === 0}
              detected={os === 'windows' && i === 0}
              icon={WindowsIcon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <SiApple className="h-5 w-5 text-muted-foreground" /> macOS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <OSDownloadCard
            spec={MAC_ARM_ASSET}
            release={info}
            primary
            detected={os === 'mac-arm'}
            onBeforeDownload={handleMacArmClick}
            icon={SiApple}
          />
          <OSDownloadCard
            spec={MAC_INTEL_ASSET}
            release={info}
            primary
            detected={os === 'mac-intel'}
            icon={SiApple}
          />
        </div>
        <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
          Apple Silicon users: macOS marks unsigned DMGs as quarantined. Click the Apple Silicon
          download for one-time setup instructions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <SiLinux className="h-5 w-5 text-muted-foreground" /> Linux
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Flatpak is the recommended way to install MediaHarbor on any Linux distribution — it
          stays current automatically and runs in a sandbox.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StoreBadgeCard
            store="flathub"
            title="Flathub"
            description="Universal Linux package. Auto-updates and works on every major distribution."
            command="flatpak install flathub net.mediaharbor.MediaHarbor"
            href={FLATHUB_URL}
            recommended
            detected={os === 'linux'}
          />
          <StoreBadgeCard
            store="snap"
            title="Snap Store"
            description="Pre-installed on Ubuntu and many derivatives. Snap connects automatically on supported systems."
            command="sudo snap install mediaharbor"
            href={SNAPCRAFT_URL}
          />
        </div>

        <details className="group rounded-xl border border-border bg-card/40">
          <summary className="cursor-pointer list-none p-4 flex items-center gap-2 text-sm font-medium select-none">
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            Other Linux downloads (AUR, .deb, .rpm, AppImage)
          </summary>
          <div className="p-4 pt-0 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <Disc className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Arch (AUR)</h4>
              </div>
              <code className="rounded-md bg-muted/60 px-3 py-2 text-xs font-mono text-foreground break-all">
                yay -S mediaharbor-bin
              </code>
              <a
                href={AUR_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                View on AUR →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LINUX_ASSETS.map((spec) => (
                <OSDownloadCard key={spec.suffix} spec={spec} release={info} icon={SiLinux} />
              ))}
            </div>
          </div>
        </details>
      </section>

      <p className="text-center text-sm">
        <a
          href="https://github.com/MediaHarbor/mediaharbor/releases"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          See all releases on GitHub →
        </a>
      </p>

      <MacQuarantineDialog
        open={macDialogOpen}
        onOpenChange={setMacDialogOpen}
        version={info?.version ?? null}
        downloadHref={pendingMacHref}
      />
    </div>
  );
}
