"use client";

import { useCallback } from "react";
import { useUiStore } from "@/lib/store/ui-store";
import { tx } from "@/lib/i18n";
import type { LocalizedText } from "@/lib/schema";

/** Hook: trả về hàm t() đã gắn locale hiện tại. `const t = useTx(); t(item.title)`. */
export function useTx() {
  const locale = useUiStore((s) => s.locale);
  return useCallback((value: LocalizedText | undefined | null) => tx(value, locale), [locale]);
}

export function useLocale() {
  return useUiStore((s) => s.locale);
}
