import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShieldCheck, Sparkle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { navItems, settingsItem } from "@/lib/features";
import { cn } from "@/lib/utils";

function SidebarLink({ to, title, icon: Icon }: { to: string; title: string; icon: typeof Sparkle }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
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

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
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
            <SidebarLink key={item.to} to={item.to} title={item.title} icon={item.icon} />
          ))}
          <div className="my-3 h-px bg-sidebar-border" />
          <SidebarLink {...settingsItem} icon={settingsItem.icon} />
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
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
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

        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="flex items-stretch justify-between">
          {navItems.slice(0, 5).map((item) => (
            <MobileTab key={item.to} to={item.to} label={item.short} icon={item.icon} />
          ))}
          <MobileTab to="/chat" label="Chat" icon={MessageCircle} />

        </div>
      </nav>
    </div>
  );
}

function MobileTab({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Sparkle }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
