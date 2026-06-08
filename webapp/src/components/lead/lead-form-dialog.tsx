"use client";

import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLeadStore } from "@/lib/store/lead-store";
import { useTt } from "@/lib/i18n/use-tx";
import type { LeadVariant } from "@/lib/schema";
import { LeadForm } from "./lead-form";

/* Modal LeadForm toàn cục — mount 1 lần trong layout, điều khiển qua Zustand (lead-store). */

export function LeadFormDialog() {
  const tt = useTt();
  const open = useLeadStore((s) => s.open);
  const context = useLeadStore((s) => s.context);
  const close = useLeadStore((s) => s.close);
  const { variant, ccnInterest, source, doc, title } = context;

  const titles: Record<LeadVariant, string> = {
    brochure: tt("Nhận brochure", "Get brochure"),
    "khao-sat": tt("Đặt lịch khảo sát", "Book a site visit"),
    "tu-van": tt("Đăng ký tư vấn đầu tư", "Register for investment consulting"),
    "lien-he": tt("Liên hệ", "Contact"),
    "ung-tuyen": tt("Ứng tuyển", "Apply"),
  };

  const descs: Record<LeadVariant, string> = {
    brochure: tt("Để lại thông tin để nhận tài liệu qua email.", "Leave your details to receive the documents by email."),
    "khao-sat": tt("Đặt lịch tham quan thực địa cùng đội ngũ Sumita.", "Schedule a site visit with the Sumita team."),
    "tu-van": tt("Đội ngũ tư vấn sẽ liên hệ theo nhu cầu đầu tư của bạn.", "Our advisory team will reach out based on your investment needs."),
    "lien-he": tt("Gửi câu hỏi, chúng tôi phản hồi sớm nhất.", "Send us your question and we'll respond as soon as possible."),
    "ung-tuyen": tt("Gửi thông tin ứng tuyển vị trí bạn quan tâm.", "Submit your application for the position you're interested in."),
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title ?? titles[variant]}</DialogTitle>
          <DialogDescription>
            {doc ? `${tt("Điền thông tin để tải", "Fill in your details to download")}: ${doc.title}` : descs[variant]}
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          key={`${variant}-${doc?.id ?? ""}-${ccnInterest ?? ""}`}
          variant={variant}
          defaultCcnInterest={ccnInterest}
          source={source ?? "dialog"}
          onSuccess={() => {
            if (doc) toast.info(`${tt("Đang chuẩn bị tải", "Preparing your download")}: ${doc.title}`);
          }}
          successExtra={
            doc ? (
              <a href={doc.href} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
                {tt("Tải xuống", "Download")}: {doc.title}
              </a>
            ) : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
}
