import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ đội ngũ Sumita để được tư vấn đầu tư, nhận tài liệu và đặt lịch khảo sát.",
};

export default function Page() {
  return <ContactView />;
}
