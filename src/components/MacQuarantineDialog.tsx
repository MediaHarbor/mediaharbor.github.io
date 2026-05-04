import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Copy, Check, Apple } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  version: string | null;
  downloadHref: string;
};

export function MacQuarantineDialog({ open, onOpenChange, version, downloadHref }: Props) {
  const [copied, setCopied] = useState(false);
  const filename = version
    ? `MediaHarbor-${version}-arm64.dmg`
    : 'MediaHarbor-<version>-arm64.dmg';
  const command = `xattr -d com.apple.quarantine ~/Downloads/${filename}`;

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-2xl focus:outline-none"
              >
                <div className="flex items-start gap-3 p-5 border-b border-border/60">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted/60 text-muted-foreground shrink-0">
                    <Apple className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <Dialog.Title className="font-semibold text-sm">
                      Note for Apple Silicon Macs
                    </Dialog.Title>
                    <Dialog.Description className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Because MediaHarbor isn’t signed with an Apple Developer ID, macOS marks the
                      DMG as quarantined and shows a “damaged” error. Removing the quarantine flag
                      lets the DMG mount normally.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close"
                      className="rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 inline-flex items-center justify-center"
                      style={{ minWidth: 36, minHeight: 36 }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-5 space-y-4">
                  <ol className="space-y-2 text-sm leading-relaxed list-decimal list-inside text-foreground">
                    <li>
                      Download <span className="font-mono text-xs">{filename}</span> — but
                      don’t mount it yet.
                    </li>
                    <li>Open Terminal.</li>
                    <li>
                      <span>Run </span>
                      <span className="font-mono text-xs">cd ~/Downloads</span>
                    </li>
                    <li>Run the command below.</li>
                    <li>Now you can open the DMG and drag MediaHarbor to Applications.</li>
                  </ol>

                  <div className="flex items-stretch gap-2">
                    <code className="flex-1 rounded-md bg-muted/60 px-3 py-2 text-xs font-mono text-foreground break-all">
                      {command}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="rounded-md border border-border bg-card text-xs font-medium hover:bg-muted transition-colors inline-flex items-center gap-1.5 px-3 shrink-0"
                      aria-label="Copy command"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-5 pt-0">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="rounded-md border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
                      style={{ minHeight: 44, padding: '0 14px' }}
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <a
                    href={downloadHref}
                    rel="noreferrer"
                    onClick={() => onOpenChange(false)}
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
                    style={{ minHeight: 44, padding: '0 18px' }}
                  >
                    Continue to download
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
