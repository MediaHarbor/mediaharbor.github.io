export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ: FaqGroup[] = [
  {
    id: 'credentials',
    title: 'Credentials & Sign-in',
    items: [
      {
        q: 'Unable to download: Invalid credentials',
        a: 'MediaHarbor uses your own account to download from every platform other than YouTube. Apple Music & Spotify: install a cookies.txt browser extension, export your cookies on the platform page, and paste them in Settings → Credentials. Deezer: copy the "arl" cookie value from DevTools → Application → Cookies. Qobuz: sign in with email and password, or paste your User ID and app token in Settings.',
      },
      {
        q: 'Do I need a paid subscription?',
        a: 'Yes, for lossless quality. Free-tier Spotify, Deezer and Tidal accounts can only download lower-quality streams. Qobuz and Apple Music require an active paid subscription for Hi-Res downloads.',
      },
    ],
  },
  {
    id: 'downloads',
    title: 'Downloads',
    items: [
      {
        q: 'Downloads get stuck — what do I do?',
        a: 'Open your task manager and check whether the download process is still running. If it is not using the network, kill it, copy the error from Logs, and open a new GitHub issue with your logs attached.',
      },
      {
        q: 'Deleted files still appear in the download list',
        a: 'The downloads list tracks history, not file presence. Clearing individual entries removes them from history. A future update will automatically clean entries whose files no longer exist.',
      },
      {
        q: 'Which video sites can I download from?',
        a: 'MediaHarbor uses yt-dlp for generic video downloads. yt-dlp supports over 1,000 sites including YouTube, Vimeo, Twitch clips, Twitter/X, Instagram, and more. Full list at github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md.',
      },
      {
        q: 'Which formats are available?',
        a: 'FLAC and FLAC 24-bit (Tidal HiFi, Qobuz, Deezer HQ), AAC 256 kbps (Apple Music), MP3 320 kbps (widely compatible), and OGG Vorbis (Spotify). Not all formats are available for every track — try another if one fails.',
      },
    ],
  },
  {
    id: 'project',
    title: 'Project',
    items: [
      {
        q: 'How do I report a bug or request a feature?',
        a: 'Visit github.com/MediaHarbor/mediaharbor/issues and open a new issue. Use the Bug Report template for bugs and the Feature Request template for ideas.',
      },
      {
        q: 'How can I support the project?',
        a: 'Use the Sponsor button on the GitHub project page. All contributions help keep the project active.',
      },
      {
        q: 'How can I contribute code?',
        a: 'Fork the repository, make your changes on a new branch, and open a Pull Request. Look for issues labeled "good first issue" if you need a starting point.',
      },
    ],
  },
  {
    id: 'library',
    title: 'Library & playback',
    items: [
      {
        q: 'How does library scanning work?',
        a: 'Library scans a folder you choose and indexes all audio files it finds. Press Rescan to refresh. Library also watches for new files automatically every time you download. Supported formats: FLAC, MP3, AAC, OGG, WAV, AIFF, M4A.',
      },
      {
        q: 'Keyboard shortcuts',
        a: 'Space — toggle play/pause (only when no text input is focused). ↑/↓ — navigate autocomplete suggestions in the search bar. Enter — accept suggestion or submit search. Esc — dismiss the autocomplete dropdown.',
      },
    ],
  },
];
