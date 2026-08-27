import { createFileRoute } from "@tanstack/react-router";
import { Info, ShieldCheck } from "lucide-react";

import { AppLayout } from "@/components/AppLayout";
import { featureItems } from "@/lib/features";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace" },
      { name: "description", content: "About the AI Workplace Productivity Assistant and its responsible AI guidelines." },
      { property: "og:title", content: "Settings — AI Workplace" },
      { property: "og:description", content: "What this assistant can and cannot do, and how to use it responsibly." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppLayout title="Settings" description="About this assistant and how to use it responsibly">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card-soft p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="h-4 w-4 text-primary" /> Responsible AI
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            AI-generated content may contain errors, outdated information or omissions. Always review
            and verify outputs before using them for important workplace decisions, external
            communication or anything with legal, financial or HR consequences.
          </p>
        </section>

        <section className="card-soft p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Info className="h-4 w-4 text-primary" /> What this app cannot do
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>• It does not browse the web or cite live sources.</li>
            <li>• It does not send emails or access your inbox, files or calendar.</li>
            <li>• It does not store your content — everything stays in the current session.</li>
          </ul>
        </section>

        <section className="card-soft p-5 lg:col-span-2">
          <p className="text-sm font-bold">Included tools</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {featureItems.map((f) => (
              <li key={f.to} className="flex items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${f.tint}`}>
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{f.title}</span>
                  <span className="block text-sm text-muted-foreground">{f.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
