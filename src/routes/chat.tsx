import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, SendHorizonal, Sparkle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ErrorNotice, useAi } from "@/lib/use-ai";
import type { AiMessage } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace" },
      { name: "description", content: "Chat with your workplace AI assistant about tasks, writing, planning and ideas." },
      { property: "og:title", content: "AI Chatbot" },
      { property: "og:description", content: "An interactive workplace assistant that keeps context within your session." },
    ],
  }),
  component: ChatPage,
});

const SYSTEM =
  "You are a helpful workplace productivity assistant. Be concise, practical and professional. You cannot browse the web, send emails, or access the user's files or calendar — say so plainly if asked. Never fabricate facts, sources or statistics; state uncertainty instead.";

const suggestions = [
  "Help me phrase a polite deadline extension request",
  "How should I structure a project kickoff meeting?",
  "Rewrite this update to be clearer and shorter",
];

function ChatPage() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const { generate, loading, error } = useAi();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: AiMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    const content = await generate(SYSTEM, next);
    if (content) setMessages([...next, { role: "assistant", content }]);
  }

  return (
    <AppLayout title="AI Chatbot" description="Your workplace assistant, in one conversation">
      <div className="card-soft flex min-h-[60vh] flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-lilac text-lilac-foreground">
              <Sparkle className="h-4 w-4" />
            </span>
            <p className="truncate text-sm font-semibold">Session conversation</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => setMessages([])}
            disabled={!messages.length}
          >
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {!messages.length ? (
            <div className="grid place-items-center py-12 text-center">
              <p className="max-w-sm text-sm text-muted-foreground">
                Start a conversation. Messages are kept for this session only.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] space-y-1", m.role === "user" && "text-right")}>
                <div
                  className={cn(
                    "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-foreground",
                  )}
                >
                  {m.content}
                </div>
                {m.role === "assistant" ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    onClick={async () => {
                      await navigator.clipboard.writeText(m.content);
                      setCopied(i);
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === i ? "Copied" : "Copy"}
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
              Thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="space-y-3 border-t border-border p-4">
          <ErrorNotice message={error} />
          <div className="flex items-end gap-2">
            <Textarea
              rows={1}
              value={input}
              placeholder="Ask your workplace assistant…"
              className="max-h-40 min-h-[48px] resize-none rounded-2xl"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <Button
              size="icon"
              className="h-12 w-12 shrink-0 rounded-2xl"
              disabled={loading || !input.trim()}
              onClick={() => void send(input)}
              aria-label="Send message"
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-generated content may contain errors — review it before acting on it.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
