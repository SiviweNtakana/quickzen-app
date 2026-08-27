import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ShieldCheck, Sparkle } from "lucide-react";

import { AppLayout } from "@/components/AppLayout";
import { featureItems } from "@/lib/features";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "One workspace to draft emails, summarize meetings, plan tasks, research topics and chat with an AI assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Automate everyday workplace tasks with five focused AI tools in one dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const activity = [
  { label: "Draft an email to the client about the project update", time: "Example prompt" },
  { label: "Summarize the Monday standup notes", time: "Example prompt" },
  { label: "Plan my week around three deadlines", time: "Example prompt" },
  { label: "Research best practices for async team communication", time: "Example prompt" },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard" description="Your AI-powered workplace productivity assistant">
      <section className="hero-gradient relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-12">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkle className="h-3.5 w-3.5" /> AI Workplace
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Do your everyday work in a fraction of the time
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:text-base">
            Write emails, distil meeting notes, plan your week, explore a topic and ask questions —
            all from a single, consistent workspace.
          </p>
          <Link
            to="/email"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Start with an email <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-base font-bold tracking-tight">Quick actions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featureItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="card-soft group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${item.tint}`}>
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold">{item.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{item.description}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                Open <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-soft p-5">
          <h3 className="text-base font-bold tracking-tight">Recent activity</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Nothing saved yet — this session starts fresh. Here are some ways to begin.
          </p>
          <ul className="mt-4 divide-y divide-border">
            {activity.map((a) => (
              <li key={a.label} className="flex items-center justify-between gap-4 py-3">
                <span className="min-w-0 truncate text-sm">{a.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-soft p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="h-4 w-4 text-primary" /> Responsible AI
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            AI-generated content may contain errors. Always review important information before using
            it for workplace decisions. This assistant cannot browse the web, send emails or access
            your calendar — it only drafts content you can edit.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
