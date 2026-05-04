import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] md:hidden bg-card border-r border-border flex flex-col"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="absolute right-2 top-2 z-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 inline-flex items-center justify-center"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
