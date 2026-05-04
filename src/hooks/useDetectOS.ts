import { useEffect, useState } from 'react';

export type OS = 'windows' | 'mac-arm' | 'mac-intel' | 'linux' | 'unknown';

type UAData = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; platform?: string }>;
};

function fromUA(): OS {
  const ua = navigator.userAgent || '';
  if (/Windows/i.test(ua)) return 'windows';
  if (/Mac OS X|Macintosh/i.test(ua)) return 'mac-intel';
  if (/Linux|X11/i.test(ua)) return 'linux';
  return 'unknown';
}

export function useDetectOS(): OS {
  const [os, setOs] = useState<OS>('unknown');

  useEffect(() => {
    let alive = true;
    const data: UAData | undefined = (navigator as unknown as { userAgentData?: UAData }).userAgentData;

    const fallback = fromUA();
    setOs(fallback);

    if (data?.getHighEntropyValues) {
      data.getHighEntropyValues(['architecture', 'platform']).then((info) => {
        if (!alive) return;
        const platform = (info.platform || data.platform || '').toLowerCase();
        const arch = (info.architecture || '').toLowerCase();
        if (platform.includes('mac')) {
          setOs(arch.includes('arm') ? 'mac-arm' : 'mac-intel');
        } else if (platform.includes('win')) {
          setOs('windows');
        } else if (platform.includes('linux')) {
          setOs('linux');
        }
      }).catch(() => {});
    }

    return () => { alive = false; };
  }, []);

  return os;
}
