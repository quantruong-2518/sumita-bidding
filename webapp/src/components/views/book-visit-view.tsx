"use client";

import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LeadForm } from "@/components/lead/lead-form";

/* F3 Đặt lịch khảo sát — đoạn giá trị ngắn + form khảo sát. */
export function BookVisitView() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Đặt lịch khảo sát" }]}
        title="Đặt lịch khảo sát"
        description="Tham quan thực địa cùng đội ngũ Sumita."
      />

      <Section contentClassName="max-w-xl space-y-6">
        <p className="text-muted-foreground">
          Đăng ký một buổi khảo sát thực địa để trực tiếp xem quỹ đất, hạ tầng và tiến độ dự án.
          Đội ngũ Sumita sẽ đón tiếp, giới thiệu quy hoạch và giải đáp mọi thắc mắc về thủ tục đầu tư.
          Vui lòng để lại thông tin, chúng tôi sẽ liên hệ xác nhận lịch hẹn phù hợp.
        </p>
        <LeadForm variant="khao-sat" source="book-visit-page" />
      </Section>
    </>
  );
}
