import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { MobileTopbar } from './MobileTopbar';
import { MobileDrawer } from './MobileDrawer';
import { DecorativePlayer } from './DecorativePlayer';
import { Footer } from './Footer';

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="h-full flex flex-col">
        <MobileTopbar onOpen={() => setDrawerOpen(true)} />
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <div className="flex flex-1 min-h-0">
          <div className="hidden md:block h-full">
            <Sidebar />
          </div>

          <main className="flex-1 min-w-0 overflow-y-auto" key={location.pathname}>
            <div className="mx-auto max-w-[1080px] px-5 py-8 sm:px-8 sm:py-12">
              <Outlet />
              <Footer />
            </div>
          </main>
        </div>

        <DecorativePlayer />
      </div>
    </MotionConfig>
  );
}
