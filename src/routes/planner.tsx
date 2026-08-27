import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Wand2 } from "lucide-react";
import { useState } from "react";

import { AiOutput, Disclaimer } from "@/components/AiOutput";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorNotice, useAi } from "@/lib/use-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace" },
      { name: "description", content: "Enter tasks with priorities and deadlines and get an organised daily or weekly schedule." },
      { property: "og:title", content: "AI Task Planner" },
      { property: "og:description", content: "Turn a task list into a prioritised, realistic plan." },
    ],
  }),
  component: PlannerPage,
});

type Priority = "High" | "Medium" | "Low";
type Task = { id: string; title: string; priority: Priority; deadline: string };

const priorities: Priority[] = ["High", "Medium", "Low"];

function newTask(): Task {
  return { id: crypto.randomUUID(), title: "", priority: "Medium", deadline: "" };
}

function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([newTask()]);
  const [horizon, setHorizon] = useState<"Daily" | "Weekly">("Daily");
  const [output, setOutput] = useState("");
  const { generate, loading, error } = useAi();

  const filled = tasks.filter((t) => t.title.trim());

  function update(id: string, patch: Partial<Task>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  async function run() {
    if (!filled.length) return;
    const list = filled
      .map((t) => `- ${t.title} | priority: ${t.priority} | deadline: ${t.deadline || "none given"}`)
      .join("\n");
    const content = await generate(
      "You are a workplace planning assistant. Build a realistic schedule from the given tasks only — never add tasks that were not provided, and never assume dates that were not given. Order work by priority and deadline, group it into clear time blocks, and end with a short 'Prioritised order' list and any risks or conflicts you noticed.",
      [{ role: "user", content: `Plan type: ${horizon}\nTasks:\n${list}` }],
    );
    if (content) setOutput(content);
  }

  return (
    <AppLayout title="AI Task Planner" description="Turn your task list into a prioritised plan">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft space-y-4 p-5">
          <div className="grid gap-2">
            <Label>Plan type</Label>
            <div className="flex gap-2">
              {(["Daily", "Weekly"] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    horizon === h
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tasks</Label>
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-border bg-surface p-3">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Task description"
                    className="rounded-xl"
                    value={task.title}
                    onChange={(e) => update(task.id, { title: e.target.value })}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full text-muted-foreground"
                    onClick={() => setTasks((prev) => (prev.length > 1 ? prev.filter((t) => t.id !== task.id) : prev))}
                    aria-label="Remove task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => update(task.id, { priority: p })}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                        task.priority === p
                          ? "border-transparent bg-accent text-accent-foreground"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <Input
                    type="date"
                    className="ml-auto w-[160px] rounded-xl"
                    value={task.deadline}
                    onChange={(e) => update(task.id, { deadline: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <Button
              variant="secondary"
              className="w-full rounded-full"
              onClick={() => setTasks((prev) => [...prev, newTask()])}
            >
              <Plus className="h-4 w-4" /> Add task
            </Button>
          </div>

          <ErrorNotice message={error} />
          <Button className="w-full rounded-full" size="lg" disabled={loading || !filled.length} onClick={run}>
            <Wand2 className="h-4 w-4" />
            {loading ? "Planning…" : "Generate schedule"}
          </Button>
        </div>

        <AiOutput
          value={output}
          loading={loading}
          onChange={setOutput}
          onRegenerate={run}
          onClear={() => setOutput("")}
          emptyHint="Add a few tasks with priorities and deadlines, then generate a schedule you can edit."
        />
      </div>
      <Disclaimer />
    </AppLayout>
  );
}
