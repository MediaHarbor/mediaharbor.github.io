import { FAQ } from '../data/faq';
import { Seo } from '../components/Seo';

export default function Faq() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
      <Seo
        title="FAQ — MediaHarbor"
        description="Answers to common questions about MediaHarbor: supported services, account requirements, output formats, and troubleshooting."
        path="/faq"
      />
      <aside className="hidden lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Contents</p>
        <nav className="flex flex-col gap-1 sticky top-6">
          {FAQ.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="text-sm text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 hover:bg-muted/60 transition-colors"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Help & FAQ</h1>
          <p className="text-muted-foreground">
            Quick answers about credentials, downloads, and the project.
          </p>
        </header>

        {FAQ.map((g) => (
          <section key={g.id} id={g.id} className="rounded-xl border border-border bg-card overflow-hidden">
            <header className="px-5 py-3 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold">{g.title}</h2>
            </header>
            <div className="divide-y divide-border">
              {g.items.map((item) => (
                <details key={item.q} className="group">
                  <summary
                    className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-sm font-medium select-none"
                    style={{ minHeight: 44 }}
                  >
                    <span>{item.q}</span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-90">›</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
