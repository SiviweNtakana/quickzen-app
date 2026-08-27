import { Check, Copy, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AiOutput({
  value,
  onChange,
  onRegenerate,
  onClear,
  loading,
  emptyHint,
  rows = 14,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  onClear?: () => void;
  loading?: boolean;
  emptyHint: string;
  rows?: number;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  if (loading) {
    return (
      <div className="card-soft space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-muted" />
        <p className="pt-2 text-sm text-muted-foreground">Generating with AI…</p>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="card-soft grid place-items-center px-6 py-14 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">AI output — editable</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={async () => {
              await navigator.clipboard.writeText(value);
              setCopied(true);
            }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          {onRegenerate ? (
            <Button type="button" size="sm" variant="secondary" className="rounded-full" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          ) : null}
          {onClear ? (
            <Button type="button" size="sm" variant="ghost" className="rounded-full" onClick={onClear}>
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>
      <Textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[280px] resize-y rounded-none border-0 bg-transparent font-medium leading-relaxed shadow-none focus-visible:ring-0"
      />
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
      AI-generated content may contain errors or omissions. Review and verify it before using it for
      important workplace decisions. This assistant does not browse the web or access your accounts.
    </p>
  );
}
