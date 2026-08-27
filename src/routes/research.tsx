import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";

import { AiOutput, Disclaimer } from "@/components/AiOutput";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorNotice, useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      { name: "description", content: "Explore a topic or question and get a clear summary with key insights and recommendations." },
      { property: "og:title", content: "AI Research Assistant" },
      { property: "og:description", content: "Structured summaries, insights and recommendations for any work topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const { generate, loading, error } = useAi();

  async function run() {
    if (!topic.trim()) return;
    const content = await generate(
      "You are a workplace research assistant working only from your own general knowledge. You cannot browse the web, so never cite URLs, articles, studies or statistics as if you looked them up, and never fabricate sources. Respond with these sections: Summary, Key Insights, Considerations & Trade-offs, Recommendations, and Open Questions to Verify. Be explicit about uncertainty where it exists.",
      [{ role: "user", content: topic }],
    );
    if (content) setOutput(content);
  }

  return (
    <AppLayout title="AI Research Assistant" description="Summaries, insights and recommendations">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft space-y-4 p-5">
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic or question</Label>
            <Textarea
              id="topic"
              rows={10}
              placeholder="e.g. What are effective practices for running async standups across time zones?"
              className="min-h-[220px] rounded-xl"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <p className="rounded-2xl bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            This assistant answers from the model's general knowledge only. It does not search the web
            and will not provide sources or live data.
          </p>
          <ErrorNotice message={error} />
          <Button className="w-full rounded-full" size="lg" disabled={loading || !topic.trim()} onClick={run}>
            <Wand2 className="h-4 w-4" />
            {loading ? "Researching…" : "Generate research brief"}
          </Button>
        </div>

        <AiOutput
          value={output}
          loading={loading}
          onChange={setOutput}
          onRegenerate={run}
          onClear={() => setOutput("")}
          emptyHint="Enter a topic or question to get a structured brief with insights and recommendations."
        />
      </div>
      <Disclaimer />
    </AppLayout>
  );
}
