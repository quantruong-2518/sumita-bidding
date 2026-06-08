"use client";

import { useUiStore } from "@/lib/store/ui-store";
import { LOCALES, LOCALE_LABEL } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* G5 — chuyển VI/EN (i18n-ready). Nội dung thiếu EN sẽ fallback VI. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useUiStore((s) => s.locale);
  const setLocale = useUiStore((s) => s.setLocale);

  return (
    <div className={cn("inline-flex border border-border", className)} role="group" aria-label="Ngôn ngữ">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "px-2 py-1 text-xs font-medium transition-colors",
            locale === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LOCALE_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
