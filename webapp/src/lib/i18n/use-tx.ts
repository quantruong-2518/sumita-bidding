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

/** Hook cho chuỗi UI inline (không phải data): `const tt = useTt(); tt("Trang chủ", "Home")`.
   Dùng cho mọi text cứng trong view/shell/lead để EN switch dịch được. Thiếu `en` → fallback VI. */
export function useTt() {
  const locale = useUiStore((s) => s.locale);
  return useCallback((vi: string, en?: string) => (locale === "en" && en ? en : vi), [locale]);
}

export function useLocale() {
  return useUiStore((s) => s.locale);
}
