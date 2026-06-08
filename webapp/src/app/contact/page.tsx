import { pageMeta } from "@/lib/seo";
import { ContactView } from "@/components/views/contact-view";

export const metadata = pageMeta({
  title: "Liên hệ",
  description: "Liên hệ đội ngũ Sumita để được tư vấn đầu tư, nhận tài liệu và đặt lịch khảo sát.",
  path: "/contact",
});

export default function Page() {
  return <ContactView />;
}
