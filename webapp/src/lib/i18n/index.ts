import type { LocalizedText } from "@/lib/schema";

/* i18n nền (VI-only giờ, data i18n-ready). Wire next-intl sau = thay locale nguồn. */
export type Locale = "vi" | "en";
export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALES: Locale[] = ["vi", "en"];

export const LOCALE_LABEL: Record<Locale, string> = { vi: "VI", en: "EN" };

/** Lấy chuỗi theo locale, thiếu bản dịch → fallback VI. */
export function tx(value: LocalizedText | undefined | null, locale: Locale = DEFAULT_LOCALE): string {
  if (!value) return "";
  if (locale === "en") return value.en ?? value.vi;
  return value.vi;
}
