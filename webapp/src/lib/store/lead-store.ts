import { create } from "zustand";
import type { LeadVariant } from "@/lib/schema";

/* Trạng thái modal LeadForm toàn cục (engine chuyển đổi).
   Mọi nút "nhận brochure / đặt lịch / tư vấn / tải tài liệu" gọi openLead(...). */
export type PendingDoc = { id: string; title: string; href: string };

export type LeadContext = {
  variant: LeadVariant;
  title?: string; // tiêu đề modal (ghi đè mặc định theo variant)
  source?: string; // nơi phát sinh (tracking)
  ccnInterest?: string; // prefill trường "CCN quan tâm"
  doc?: PendingDoc; // tài liệu chờ tải sau khi submit (lead-gate O-02)
};

type LeadStore = {
  open: boolean;
  context: LeadContext;
  openLead: (ctx?: Partial<LeadContext>) => void;
  close: () => void;
};

const DEFAULT_CONTEXT: LeadContext = { variant: "tu-van" };

export const useLeadStore = create<LeadStore>((set) => ({
  open: false,
  context: DEFAULT_CONTEXT,
  openLead: (ctx) => set({ open: true, context: { ...DEFAULT_CONTEXT, ...ctx } }),
  close: () => set({ open: false }),
}));
