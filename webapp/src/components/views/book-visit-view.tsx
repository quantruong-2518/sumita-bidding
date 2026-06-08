"use client";

import { useTt } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LeadForm } from "@/components/lead/lead-form";

/* F3 Đặt lịch khảo sát — đoạn giá trị ngắn + form khảo sát. */
export function BookVisitView() {
  const tt = useTt();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Đặt lịch khảo sát", "Book a site visit") },
        ]}
        title={tt("Đặt lịch khảo sát", "Book a site visit")}
        description={tt("Tham quan thực địa cùng đội ngũ Sumita.", "Tour the site with the Sumita team.")}
      />

      <Section contentClassName="max-w-xl space-y-6">
        <p className="text-muted-foreground">
          {tt(
            "Đăng ký một buổi khảo sát thực địa để trực tiếp xem quỹ đất, hạ tầng và tiến độ dự án. Đội ngũ Sumita sẽ đón tiếp, giới thiệu quy hoạch và giải đáp mọi thắc mắc về thủ tục đầu tư. Vui lòng để lại thông tin, chúng tôi sẽ liên hệ xác nhận lịch hẹn phù hợp.",
            "Register for an on-site visit to see the land bank, infrastructure and project progress first-hand. The Sumita team will welcome you, present the master plan and answer any questions about investment procedures. Please leave your details and we will get in touch to confirm a suitable appointment.",
          )}
        </p>
        <LeadForm variant="khao-sat" source="book-visit-page" />
      </Section>
    </>
  );
}
