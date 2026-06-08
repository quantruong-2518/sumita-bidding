import type { Metadata } from "next";
import { ServicesView } from "@/components/views/services-view";

export const metadata: Metadata = {
  title: "Dịch vụ & hỗ trợ đầu tư",
  description: "Tư vấn pháp lý, xây dựng nhà xưởng, hỗ trợ vốn, tuyển dụng và vận hành cho nhà đầu tư.",
};

export default function Page() {
  return <ServicesView />;
}
