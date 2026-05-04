import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from './components/Layout';

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const m = await import('./pages/Home');
          return { Component: m.default };
        },
      },
      {
        path: 'download',
        lazy: async () => {
          const m = await import('./pages/Download');
          return { Component: m.default };
        },
      },
      {
        path: 'faq',
        lazy: async () => {
          const m = await import('./pages/Faq');
          return { Component: m.default };
        },
      },
      {
        path: 'search',
        lazy: async () => {
          const m = await import('./pages/Search');
          return { Component: m.default };
        },
      },
      {
        path: 'library',
        lazy: async () => {
          const m = await import('./pages/Library');
          return { Component: m.default };
        },
      },
      {
        path: 'settings',
        lazy: async () => {
          const m = await import('./pages/Settings');
          return { Component: m.default };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const m = await import('./pages/NotFound');
          return { Component: m.default };
        },
      },
    ],
  },
];
