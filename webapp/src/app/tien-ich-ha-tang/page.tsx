import type { Metadata } from "next";
import { UtilitiesView } from "@/components/views/utilities-view";

export const metadata: Metadata = {
  title: "Tiện ích & hạ tầng",
  description: "Hạ tầng kỹ thuật, an toàn môi trường và khu dịch vụ tại cụm công nghiệp Sumita.",
};

export default function Page() {
  return <UtilitiesView />;
}
