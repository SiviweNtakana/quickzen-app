import { useEffect, useState } from "react";
import { Check, Monitor, Moon, Sun, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  emptyProfile,
  getInitials,
  usePreferences,
  type ThemeChoice,
  type WorkProfile,
} from "@/lib/preferences";

const themeOptions: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function AppearanceSection() {
  const { theme, setTheme, resolvedTheme, hydrated } = usePreferences();

  return (
    <section className="card-soft p-5">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Sun className="h-4 w-4 text-primary" /> Appearance
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose how AI Workplace looks. System follows your device setting
        {hydrated ? ` (currently ${resolvedTheme})` : ""}.
      </p>

      <div
        role="radiogroup"
        aria-label="Theme"
        className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-muted/70 p-1.5"
      >
        {themeOptions.map((opt) => {
          const active = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-xs font-semibold transition-colors",
                active
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function WorkProfileSection() {
  const { profile, setProfile, hydrated } = usePreferences();
  const [draft, setDraft] = useState<WorkProfile>(emptyProfile);

  useEffect(() => {
    setDraft(profile);
  }, [profile, hydrated]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(profile);

  const field = (key: keyof WorkProfile, label: string, placeholder: string, type = "text") => (
    <div className="space-y-1.5">
      <Label htmlFor={`profile-${key}`}>{label}</Label>
      <Input
        id={`profile-${key}`}
        type={type}
        value={draft[key]}
        placeholder={placeholder}
        onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <section className="card-soft p-5">
      <div className="flex items-center gap-2 text-sm font-bold">
        <UserRound className="h-4 w-4 text-primary" /> Work profile
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lilac text-base font-bold text-lilac-foreground"
        >
          {getInitials(draft.fullName)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{draft.fullName || "Your name"}</p>
          <p className="truncate text-sm text-muted-foreground">
            {[draft.jobTitle, draft.company].filter(Boolean).join(" · ") || "Add your role and company"}
          </p>
        </div>
      </div>

      <form
        className="mt-5 grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setProfile(draft);
          toast.success("Profile saved");
        }}
      >
        {field("fullName", "Full name", "Alex Morgan")}
        {field("jobTitle", "Job title", "Product Manager")}
        {field("company", "Company", "Northwind Studio")}
        {field("email", "Work email", "alex@company.com", "email")}

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <Button type="submit" disabled={!dirty}>
            <Check className="h-4 w-4" /> Save profile
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setDraft(profile)}
            disabled={!dirty}
          >
            Cancel
          </Button>
        </div>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">
        Saved on this device only — no account required.
      </p>
    </section>
  );
}
