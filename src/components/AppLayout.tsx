import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShieldCheck, Sparkle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { navItems, settingsItem } from "@/lib/features";
import { cn } from "@/lib/utils";

function SidebarLink({
  to,
  title,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  title: string;
  icon: typeof Sparkle;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="truncate">{title}</span>
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight">AI Workplace</p>
          <p className="truncate text-xs text-muted-foreground">Productivity Assistant</p>
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            title={item.title}
            icon={item.icon}
            onNavigate={onNavigate}
          />
        ))}
        <div className="my-3 h-px bg-sidebar-border" />
        <SidebarLink {...settingsItem} icon={settingsItem.icon} onNavigate={onNavigate} />
      </nav>

      <div className="mt-auto rounded-2xl border border-border bg-muted/60 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Responsible AI
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          AI-generated content may contain errors. Review important information before using it.
        </p>
      </div>
    </>
  );
}

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop: fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile: slide-in sidebar drawer */}
      {open ? (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-sidebar-border bg-sidebar p-4 transition-transform duration-200 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-5 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
            <button
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground lg:hidden">
              <Sparkle className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">{title}</h1>
              {description ? (
                <p className="hidden truncate text-sm text-muted-foreground sm:block">{description}</p>
              ) : null}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
