import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { runAi, type AiMessage } from "@/lib/ai.functions";

export function useAi() {
  const call = useServerFn(runAi);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(system: string, messages: AiMessage[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await call({ data: { system, messages } });
      return res.content;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, error, setError };
}

export function ErrorNotice({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {message}
    </div>
  );
}
