import { useEffect, useState } from 'react';

export type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

export type ReleaseInfo = {
  version: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
};

const REPO_API = 'https://api.github.com/repos/MediaHarbor/mediaharbor/releases/latest';
let cached: Promise<ReleaseInfo> | null = null;

function fetchRelease(): Promise<ReleaseInfo> {
  if (!cached) {
    cached = fetch(REPO_API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => ({
        version: (data.tag_name || data.name || '').replace(/^v/, ''),
        htmlUrl: data.html_url || 'https://github.com/MediaHarbor/mediaharbor/releases/latest',
        assets: Array.isArray(data.assets)
          ? data.assets.map((a: ReleaseAsset) => ({
              name: a.name,
              browser_download_url: a.browser_download_url,
              size: a.size,
            }))
          : [],
      }))
      .catch((e) => {
        cached = null;
        throw e;
      });
  }
  return cached;
}

export function useLatestRelease() {
  const [info, setInfo] = useState<ReleaseInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchRelease()
      .then((r) => { if (alive) setInfo(r); })
      .catch((e) => { if (alive) setError(e.message || 'Failed to load releases'); });
    return () => { alive = false; };
  }, []);

  return { info, error };
}

export function findAsset(info: ReleaseInfo | null, suffix: string): ReleaseAsset | undefined {
  return info?.assets.find((a) => a.name.endsWith(suffix));
}
