import { pageMeta } from "@/lib/seo";
import { ServicesView } from "@/components/views/services-view";

export const metadata = pageMeta({
  title: "Dịch vụ & hỗ trợ đầu tư",
  description: "Tư vấn pháp lý, xây dựng nhà xưởng, hỗ trợ vốn, tuyển dụng và vận hành cho nhà đầu tư.",
  path: "/investment-services",
});

export default function Page() {
  return <ServicesView />;
}
