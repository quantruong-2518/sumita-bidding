"use client";

import { Button } from "@/components/ui/button";
import { useLeadStore, type LeadContext } from "@/lib/store/lead-store";
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
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <LeadButton size={size} lead={{ variant: "brochure", title: "Nhận brochure", ccnInterest, source }}>
        Nhận brochure
      </LeadButton>
      <LeadButton size={size} variant="outline" lead={{ variant: "khao-sat", title: "Đặt lịch khảo sát", ccnInterest, source }}>
        Đặt lịch khảo sát
      </LeadButton>
      <LeadButton size={size} variant="ghost" lead={{ variant: "tu-van", title: "Tư vấn đầu tư", ccnInterest, source }}>
        Tư vấn đầu tư
      </LeadButton>
    </div>
  );
}
