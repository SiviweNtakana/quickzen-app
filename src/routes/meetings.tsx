import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";

import { AiOutput, Disclaimer } from "@/components/AiOutput";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorNotice, useAi } from "@/lib/use-ai";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace" },
      { name: "description", content: "Turn raw meeting notes into a summary with key points, decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      { property: "og:description", content: "Paste your notes and get a structured, editable meeting summary." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const { generate, loading, error } = useAi();

  async function run() {
    if (!notes.trim()) return;
    const content = await generate(
      "You summarize workplace meeting notes. Use only information present in the notes — never invent attendees, decisions, owners or dates. Respond in markdown-style plain text with these exact sections: Summary, Key Points, Decisions, Action Items (with owner and deadline where stated), Deadlines. If a section has nothing in the notes, write 'None stated'.",
      [{ role: "user", content: notes }],
    );
    if (content) setOutput(content);
  }

  return (
    <AppLayout title="Meeting Notes Summarizer" description="Key points, decisions, action items and deadlines">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft space-y-4 p-5">
          <div className="grid gap-2">
            <Label htmlFor="notes">Paste your meeting notes</Label>
            <Textarea
              id="notes"
              rows={16}
              placeholder="Paste the raw notes or transcript here…"
              className="min-h-[320px] rounded-xl"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <ErrorNotice message={error} />
          <div className="flex flex-wrap gap-2">
            <Button className="flex-1 rounded-full" size="lg" disabled={loading || !notes.trim()} onClick={run}>
              <Wand2 className="h-4 w-4" />
              {loading ? "Summarizing…" : "Summarize notes"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full"
              onClick={() => {
                setNotes("");
                setOutput("");
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <AiOutput
          value={output}
          loading={loading}
          onChange={setOutput}
          onRegenerate={run}
          onClear={() => setOutput("")}
          emptyHint="Paste meeting notes on the left to get a structured summary with decisions and action items."
        />
      </div>
      <Disclaimer />
    </AppLayout>
  );
}
