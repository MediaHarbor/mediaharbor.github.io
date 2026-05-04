import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'mh-theme';

function readStored(): ThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {}
  return 'system';
}

function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  let resolved: 'light' | 'dark';
  if (mode === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.removeAttribute('data-theme');
  } else {
    resolved = mode;
    root.setAttribute('data-theme', mode);
  }
  root.classList.toggle('dark', resolved === 'dark');
}

function computeResolved(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'light' || mode === 'dark') return mode;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => readStored());
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => computeResolved(readStored()));

  useEffect(() => {
    applyMode(mode);
    setResolved(computeResolved(mode));
    try {
      if (mode === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      applyMode('system');
      setResolved(computeResolved('system'));
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const cycle = useCallback(() => {
    setMode((m) => (m === 'system' ? 'light' : m === 'light' ? 'dark' : 'system'));
  }, []);

  return { mode, setMode, cycle, resolved };
}
