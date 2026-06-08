"use client";

import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLeadStore } from "@/lib/store/lead-store";
import type { LeadVariant } from "@/lib/schema";
import { LeadForm } from "./lead-form";

/* Modal LeadForm toàn cục — mount 1 lần trong layout, điều khiển qua Zustand (lead-store). */

const TITLES: Record<LeadVariant, string> = {
  brochure: "Nhận brochure",
  "khao-sat": "Đặt lịch khảo sát",
  "tu-van": "Đăng ký tư vấn đầu tư",
  "lien-he": "Liên hệ",
  "ung-tuyen": "Ứng tuyển",
};

const DESCS: Record<LeadVariant, string> = {
  brochure: "Để lại thông tin để nhận tài liệu qua email.",
  "khao-sat": "Đặt lịch tham quan thực địa cùng đội ngũ Sumita.",
  "tu-van": "Đội ngũ tư vấn sẽ liên hệ theo nhu cầu đầu tư của bạn.",
  "lien-he": "Gửi câu hỏi, chúng tôi phản hồi sớm nhất.",
  "ung-tuyen": "Gửi thông tin ứng tuyển vị trí bạn quan tâm.",
};

export function LeadFormDialog() {
  const open = useLeadStore((s) => s.open);
  const context = useLeadStore((s) => s.context);
  const close = useLeadStore((s) => s.close);
  const { variant, ccnInterest, source, doc, title } = context;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title ?? TITLES[variant]}</DialogTitle>
          <DialogDescription>{doc ? `Điền thông tin để tải: ${doc.title}` : DESCS[variant]}</DialogDescription>
        </DialogHeader>
        <LeadForm
          key={`${variant}-${doc?.id ?? ""}-${ccnInterest ?? ""}`}
          variant={variant}
          defaultCcnInterest={ccnInterest}
          source={source ?? "dialog"}
          onSuccess={() => {
            if (doc) toast.info(`Đang chuẩn bị tải: ${doc.title}`);
          }}
          successExtra={
            doc ? (
              <a href={doc.href} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
                Tải xuống: {doc.title}
              </a>
            ) : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
}
