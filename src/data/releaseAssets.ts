export type AssetSpec = {
  suffix: string;
  label: string;
  hint: string;
};

export const WINDOWS_ASSETS: AssetSpec[] = [
  { suffix: '-setup.exe', label: 'Installer (.exe)', hint: 'Recommended. NSIS installer with shortcuts and uninstaller.' },
  { suffix: '.msi',       label: 'MSI (.msi)',       hint: 'For enterprise / Group Policy deployments.' },
  { suffix: '_x64.msix',  label: 'MSIX (.msix)',     hint: 'Microsoft Store package format.' },
];

export const MAC_ARM_ASSET: AssetSpec = {
  suffix: '_aarch64.dmg',
  label: 'Apple Silicon (.dmg)',
  hint: 'For M1, M2, M3, M4 Macs. Open the DMG and drag MediaHarbor to Applications.',
};

export const MAC_INTEL_ASSET: AssetSpec = {
  suffix: '_x64.dmg',
  label: 'Intel (.dmg)',
  hint: 'For Intel-based Macs (pre-2020).',
};

export const LINUX_ASSETS: AssetSpec[] = [
  { suffix: '.deb',      label: 'Debian / Ubuntu (.deb)', hint: 'sudo dpkg -i MediaHarbor_*.deb' },
  { suffix: '.rpm',      label: 'Fedora / RHEL (.rpm)',   hint: 'sudo rpm -i MediaHarbor_*.rpm' },
  { suffix: '.AppImage', label: 'AppImage',               hint: 'Universal Linux binary. chmod +x to run.' },
];

export const RELEASES_FALLBACK = 'https://github.com/MediaHarbor/mediaharbor/releases/latest';
