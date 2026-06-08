import { create } from "zustand";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/* UI/client state thuần (không phải server data → không để trong React Query). */
type UiStore = {
  locale: Locale; // i18n-ready: chuyển VI/EN (phần thiếu EN sẽ fallback VI)
  setLocale: (l: Locale) => void;
  mobileNavOpen: boolean;
  setMobileNav: (v: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  locale: DEFAULT_LOCALE,
  setLocale: (locale) => set({ locale }),
  mobileNavOpen: false,
  setMobileNav: (mobileNavOpen) => set({ mobileNavOpen }),
}));
