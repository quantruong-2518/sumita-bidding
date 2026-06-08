import { pageMeta } from "@/lib/seo";
import { UtilitiesView } from "@/components/views/utilities-view";

export const metadata = pageMeta({
  title: "Tiện ích & hạ tầng",
  description: "Hạ tầng kỹ thuật, an toàn môi trường và khu dịch vụ tại cụm công nghiệp Sumita.",
  path: "/infrastructure",
});

export default function Page() {
  return <UtilitiesView />;
}
