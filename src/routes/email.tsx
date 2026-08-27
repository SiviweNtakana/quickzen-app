import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";

import { AiOutput, Disclaimer } from "@/components/AiOutput";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorNotice, useAi } from "@/lib/use-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace" },
      { name: "description", content: "Generate professional emails in a formal, friendly or persuasive tone." },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Draft polished workplace emails in seconds and edit them inline." },
    ],
  }),
  component: EmailPage,
});

const tones = ["Formal", "Friendly", "Persuasive"] as const;

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Formal");
  const [output, setOutput] = useState("");
  const { generate, loading, error } = useAi();

  async function run() {
    if (!details.trim()) return;
    const content = await generate(
      "You are a professional workplace email writer. Write a complete, ready-to-send email. Output only the email: a Subject line, then the body with a greeting, clear paragraphs and a sign-off. Never invent facts, names, figures or commitments that were not provided; use neutral placeholders like [Name] or [Date] when information is missing.",
      [
        {
          role: "user",
          content: `Tone: ${tone}\nRecipient: ${recipient || "not specified"}\nSubject hint: ${subject || "not specified"}\nWhat the email must say:\n${details}`,
        },
      ],
    );
    if (content) setOutput(content);
  }

  return (
    <AppLayout title="Smart Email Generator" description="Professional emails, written in your tone">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft space-y-4 p-5">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient (optional)</Label>
            <Input
              id="recipient"
              placeholder="e.g. Sarah, our client at Northwind"
              className="rounded-xl"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject hint (optional)</Label>
            <Input
              id="subject"
              placeholder="e.g. Project update"
              className="rounded-xl"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">What should the email say?</Label>
            <Textarea
              id="details"
              rows={7}
              placeholder="Key points, context, and anything that must be included…"
              className="rounded-xl"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Tone</Label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    tone === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ErrorNotice message={error} />
          <Button
            className="w-full rounded-full"
            size="lg"
            disabled={loading || !details.trim()}
            onClick={run}
          >
            <Wand2 className="h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
        </div>

        <AiOutput
          value={output}
          loading={loading}
          onChange={setOutput}
          onRegenerate={run}
          onClear={() => setOutput("")}
          emptyHint="Describe the email you need and generate a draft. It will appear here, fully editable."
        />
      </div>
      <Disclaimer />
    </AppLayout>
  );
}
