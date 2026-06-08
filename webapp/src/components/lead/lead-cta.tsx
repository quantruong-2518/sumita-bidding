"use client";

import { Button } from "@/components/ui/button";
import { useLeadStore, type LeadContext } from "@/lib/store/lead-store";
import { useTt } from "@/lib/i18n/use-tx";
import { cn } from "@/lib/utils";

/* Nút mở form chuyển đổi. Kế thừa mọi prop của Button + `lead` (context prefill). */
type LeadButtonProps = React.ComponentProps<typeof Button> & { lead?: Partial<LeadContext> };

export function LeadButton({ lead, onClick, ...props }: LeadButtonProps) {
  const openLead = useLeadStore((s) => s.openLead);
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openLead(lead);
      }}
    />
  );
}

/* Bộ 3 CTA chuẩn (brochure · khảo sát · tư vấn) — dùng lại ở hero, list, CCN detail… */
export function ConversionCtas({
  ccnInterest,
  source,
  className,
  size = "lg",
}: {
  ccnInterest?: string;
  source?: string;
  className?: string;
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  const tt = useTt();
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <LeadButton size={size} variant="cta" lead={{ variant: "brochure", title: tt("Nhận brochure", "Get brochure"), ccnInterest, source }}>
        {tt("Nhận brochure", "Get brochure")}
      </LeadButton>
      <LeadButton size={size} lead={{ variant: "khao-sat", title: tt("Đặt lịch khảo sát", "Book a site visit"), ccnInterest, source }}>
        {tt("Đặt lịch khảo sát", "Book a site visit")}
      </LeadButton>
      <LeadButton size={size} variant="ghost" lead={{ variant: "tu-van", title: tt("Tư vấn đầu tư", "Investment consulting"), ccnInterest, source }}>
        {tt("Tư vấn đầu tư", "Investment consulting")}
      </LeadButton>
    </div>
  );
}
